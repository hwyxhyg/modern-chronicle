/**
 * 将 导出0215 中的 PageN后景.png / PageN前景.png 复制覆盖到 sectionN/background.png 与 sectionN/frontend.png
 * 路径与文件名使用 Unicode 转义及动态查找，避免中文编码问题
 */
const fs = require('fs');
const path = require('path');

// Unicode 后缀，避免脚本文件编码影响匹配：后景 = \u540e\u666f, 前景 = \u524d\u666f
const SUFFIX_BG = '\u540e\u666f.png';   // 后景.png
const SUFFIX_FG = '\u524d\u666f.png';   // 前景.png

const assetsRoot = path.join(__dirname, '..', 'src', 'assets');

// 通过数字标识查找源目录，不依赖中文「导出」的编码
const dirs = fs.readdirSync(assetsRoot, { withFileTypes: true });
const exportDirEntry = dirs.find((d) => d.isDirectory() && d.name.includes('0215'));
if (!exportDirEntry) {
  console.error('未找到包含 0215 的源目录（如 导出0215）');
  process.exit(1);
}

const exportDirPath = path.join(assetsRoot, exportDirEntry.name);
console.log('源目录:', exportDirPath);

// 读取源目录下的文件名（使用系统返回的原始名称，不二次编码）
const sourceFiles = fs.readdirSync(exportDirPath);

function findSourceFile(suffix) {
  return sourceFiles.find((name) => name.endsWith(suffix));
}

function findSourceFileByNumber(num, suffix) {
  const prefix = 'Page' + num;
  return sourceFiles.find((name) => name.startsWith(prefix) && name.endsWith(suffix));
}

const results = { copied: [], skipped: [] };

for (let n = 1; n <= 8; n++) {
  const sectionName = 'section' + n;
  const sectionPath = path.join(assetsRoot, sectionName);

  const bgSource = findSourceFileByNumber(n, SUFFIX_BG);
  if (bgSource) {
    const src = path.join(exportDirPath, bgSource);
    const dest = path.join(sectionPath, 'background.png');
    fs.mkdirSync(sectionPath, { recursive: true });
    fs.copyFileSync(src, dest);
    results.copied.push(`${bgSource} -> ${sectionName}/background.png`);
  } else {
    results.skipped.push(`${sectionName}/background.png (无 Page${n}后景.png)`);
  }

  const fgSource = findSourceFileByNumber(n, SUFFIX_FG);
  if (fgSource) {
    const src = path.join(exportDirPath, fgSource);
    const dest = path.join(sectionPath, 'frontend.png');
    fs.mkdirSync(sectionPath, { recursive: true });
    fs.copyFileSync(src, dest);
    results.copied.push(`${fgSource} -> ${sectionName}/frontend.png`);
  } else {
    results.skipped.push(`${sectionName}/frontend.png (无 Page${n}前景.png)`);
  }
}

console.log('\n已覆盖:');
results.copied.forEach((line) => console.log('  ', line));
if (results.skipped.length) {
  console.log('\n未找到源文件跳过:');
  results.skipped.forEach((line) => console.log('  ', line));
}
console.log('\n完成.');
