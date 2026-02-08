/**
 * Z-index for scroll layers (back to front).
 * 背景 → 背景纹理(cotton) → 小船 → 前景 → 内容 → 滤镜(weathered)
 */
export const Z_LAYERS = {
  BACKGROUND: 0,
  COTTON: 1,
  BOAT: 2,
  FRONTEND: 3,
  CONTENT: 4,
  WEATHERED: 10,
} as const;
