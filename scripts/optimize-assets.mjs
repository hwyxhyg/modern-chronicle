#!/usr/bin/env node
/**
 * Static assets optimizer: backup → PNG compression → OTF subset → overwrite originals.
 * Reset: restore from assets-backup to original paths.
 * Usage: node scripts/optimize-assets.mjs [--images] [--fonts] [--dry-run] [--root <path>] [--aggressive]
 *        node scripts/optimize-assets.mjs reset
 */

import { readFile, writeFile, stat, mkdir, copyFile, readdir, rm } from 'fs/promises';
import { join, dirname, basename, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';
import sharp from 'sharp';
import subsetFont from 'subset-font';
import { optimise as oxipngOptimise } from '@jsquash/oxipng';
import {
  FONT_CHARSET,
  DEFAULT_IMAGE_ROOTS,
  DEFAULT_FONT_ROOTS,
  BACKUP_DIR,
  IGNORE_IMAGE_PATTERNS,
  IGNORE_FONT_PATTERNS,
} from './font-charset.config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

function parseArgs() {
  const argv = process.argv.slice(2);
  const isReset = argv[0] === 'reset' || argv.includes('--reset');
  const flags = {
    reset: isReset,
    images: argv.includes('--images'),
    fonts: argv.includes('--fonts'),
    dryRun: argv.includes('--dry-run'),
    aggressive: argv.includes('--no-aggressive') ? false : argv.includes('--aggressive') || true,
  };
  const rootIdx = argv.indexOf('--root');
  const root = rootIdx >= 0 && argv[rootIdx + 1] ? [argv[rootIdx + 1]] : null;
  if (!isReset && !flags.images && !flags.fonts) {
    flags.images = true;
    flags.fonts = true;
  }
  return { ...flags, root };
}

function resolveRoots(rootOverride, defaultRoots) {
  const roots = rootOverride || defaultRoots;
  return roots.map((r) => (r.startsWith('/') ? r : join(PROJECT_ROOT, r)));
}

function getRelativePath(absolutePath) {
  return relative(PROJECT_ROOT, absolutePath).replace(/\\/g, '/');
}

async function findPngs(roots) {
  const all = await Promise.all(
    roots.map((root) =>
      fg('**/*.png', {
        cwd: root,
        absolute: true,
        ignore: ['**/node_modules/**', '**/dist/**', ...IGNORE_IMAGE_PATTERNS],
      })
    )
  );
  return [...new Set(all.flat())];
}

async function findOtfs(roots) {
  const all = await Promise.all(
    roots.map((root) =>
      fg('**/*.otf', {
        cwd: root,
        absolute: true,
        ignore: ['**/node_modules/**', '**/dist/**', '**/*-subset.otf', ...IGNORE_FONT_PATTERNS],
      })
    )
  );
  return [...new Set(all.flat())];
}

async function getSize(path) {
  const s = await stat(path);
  return s.size;
}

const backupRoot = () => join(PROJECT_ROOT, BACKUP_DIR);

async function clearBackup() {
  const root = backupRoot();
  try {
    await rm(root, { recursive: true, force: true });
  } catch (_) {}
}

async function backupFiles(filePaths) {
  if (filePaths.length === 0) return;
  await clearBackup();
  const root = backupRoot();
  for (const p of filePaths) {
    const rel = getRelativePath(p);
    const dest = join(root, rel);
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(p, dest);
  }
  console.log(`Backed up ${filePaths.length} file(s) to ${BACKUP_DIR}/\n`);
}

async function listFilesRecursive(dir, base = '') {
  const names = await readdir(join(dir, base), { withFileTypes: true });
  const out = [];
  for (const e of names) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      out.push(...(await listFilesRecursive(dir, rel)));
    } else {
      out.push(rel);
    }
  }
  return out;
}

async function restoreFromBackup() {
  const root = backupRoot();
  let relPaths;
  try {
    relPaths = await listFilesRecursive(root);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('No backup found. Run optimize first.');
      return;
    }
    throw e;
  }
  if (relPaths.length === 0) {
    console.log('Backup folder is empty. Nothing to restore.');
    return;
  }
  for (const rel of relPaths) {
    const backupPath = join(root, rel);
    const dest = join(PROJECT_ROOT, rel);
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(backupPath, dest);
  }
  console.log(`Restored ${relPaths.length} file(s) from ${BACKUP_DIR}/ to original locations.`);
}

async function optimizePng(filePath, { dryRun, aggressive }) {
  const before = await getSize(filePath);
  if (dryRun) return { filePath, before, after: before, skipped: true };
  const meta = await sharp(filePath).metadata();
  if (meta.format !== 'png') return { filePath, before, after: before, skipped: true, error: 'not PNG' };
  const sharpOptions = { compressionLevel: 9, adaptiveFiltering: true };
  if (aggressive) sharpOptions.palette = true;
  let buf = await sharp(filePath).png(sharpOptions).toBuffer();
  try {
    const oxipngBuffer = await oxipngOptimise(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), {
      level: 6,
      optimiseAlpha: true,
    });
    const afterBuf = Buffer.from(oxipngBuffer);
    if (afterBuf.length < buf.length) buf = afterBuf;
  } catch (_) {}
  const after = buf.length;
  if (after < before) await writeFile(filePath, buf);
  return { filePath, before, after: Math.min(before, after), skipped: false };
}

async function subsetOtf(filePath, { dryRun }) {
  const before = await getSize(filePath);
  if (dryRun) return { filePath, before, after: before, skipped: true };
  const fontBuffer = await readFile(filePath);
  let subsetBuffer;
  try {
    subsetBuffer = await subsetFont(fontBuffer, FONT_CHARSET, { targetFormat: 'sfnt' });
  } catch (err) {
    return { filePath, before, after: before, skipped: true, error: err.message };
  }
  const after = subsetBuffer.length;
  await writeFile(filePath, subsetBuffer);
  return { filePath, before, after, skipped: false };
}

function formatBytes(n) {
  if (n >= 1024 * 1024) return (n / (1024 * 1024)).toFixed(2) + ' MB';
  if (n >= 1024) return (n / 1024).toFixed(2) + ' KB';
  return n + ' B';
}

async function main() {
  const opts = parseArgs();

  if (opts.reset) {
    await restoreFromBackup();
    return;
  }

  const imageRoots = resolveRoots(opts.root, DEFAULT_IMAGE_ROOTS);
  const fontRoots = resolveRoots(opts.root, DEFAULT_FONT_ROOTS);

  const pngs = opts.images ? await findPngs(imageRoots) : [];
  const otfs = opts.fonts ? await findOtfs(fontRoots) : [];
  const toProcess = [...pngs, ...otfs];

  if (toProcess.length === 0) {
    console.log('No PNG or OTF files found to optimize.');
    return;
  }

  if (!opts.dryRun) {
    await backupFiles(toProcess);
  } else {
    console.log(' [dry-run] No backup or file changes.\n');
  }

  let totalSaved = 0;
  const results = { png: [], font: [] };

  if (opts.images && pngs.length) {
    console.log(`PNG: ${pngs.length} file(s)`);
    for (const p of pngs) {
      const r = await optimizePng(p, opts);
      results.png.push(r);
      if (!r.skipped && r.before > r.after) totalSaved += r.before - r.after;
    }
  }

  if (opts.fonts && otfs.length) {
    console.log(`OTF: ${otfs.length} file(s)`);
    for (const p of otfs) {
      const r = await subsetOtf(p, opts);
      results.font.push(r);
      if (!r.skipped && r.before > r.after) totalSaved += r.before - r.after;
    }
  }

  console.log('');
  results.png.forEach((r) => {
    if (r.skipped) return;
    const saved = r.before - r.after;
    console.log(`  ${getRelativePath(r.filePath)}: ${formatBytes(r.before)} -> ${formatBytes(r.after)}${saved > 0 ? ` (saved ${formatBytes(saved)})` : ''}`);
  });
  results.font.forEach((r) => {
    if (r.skipped) {
      if (r.error) console.log(`  ${getRelativePath(r.filePath)}: skip - ${r.error}`);
      return;
    }
    const saved = r.before - r.after;
    console.log(`  ${getRelativePath(r.filePath)}: ${formatBytes(r.before)} -> ${formatBytes(r.after)} (saved ${formatBytes(saved)})`);
  });

  console.log('\nTotal saved:', formatBytes(totalSaved));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
