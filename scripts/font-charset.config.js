/**
 * Font subset character set and asset paths for optimize-assets script.
 * Only these characters will be kept in subset fonts (English + digits + basic punctuation).
 */

export const FONT_CHARSET =
  '0123456789' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  'abcdefghijklmnopqrstuvwxyz' +
  ' .,!?;:\'"-_/()[]{}@#&%+*=<>$€£¥©®™°•…–— \n\t';

/** Default roots (relative to project root) for scanning. */
export const DEFAULT_IMAGE_ROOTS = ['src/assets'];
export const DEFAULT_FONT_ROOTS = ['src/assets'];

/** Backup directory (relative to project root). Cleared and recreated on each optimize run. */
export const BACKUP_DIR = 'assets-backup';

/** Paths (glob patterns) to skip for images or fonts. */
export const IGNORE_IMAGE_PATTERNS = [];
export const IGNORE_FONT_PATTERNS = [];
