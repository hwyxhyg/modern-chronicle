export const Z_LAYERS = {
  /** 纯黑底色之上的「绘制背景图」层（各 section 背景） */
  BACKGROUND: 10,
  /** 背景纹理层（cotton），盖在所有背景图之上 */
  COTTON: 20,
  /** 小船层：高于 cotton，低于前景/内容 */
  BOAT: 30,
  /** 各 section 前景图层（插画等） */
  FRONTEND: 40,
  /** 文本 / 图表等内容层 */
  CONTENT: 50,
  /** 全局老旧滤镜层（weathered）：始终最上层 */
  WEATHERED: 100,
} as const;

export function getSectionZLayers() {
  return {
    BACKGROUND: Z_LAYERS.BACKGROUND,
    FRONTEND: Z_LAYERS.FRONTEND,
    CONTENT: Z_LAYERS.CONTENT,
  };
}
