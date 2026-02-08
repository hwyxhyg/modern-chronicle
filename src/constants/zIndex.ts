/**
 * Z-index for scroll layers (back to front).
 * 与 section 同层叠上下文时：背景 → cotton → 各 section 前景/内容 → weathered
 */
export const Z_LAYERS = {
  /** SectionText/SectionChart 等组件内部用 */
  CONTENT: 4,
  /** 全局棉纹层：高于所有 section 的 background，低于所有 section 的 frontend */
  COTTON: 79,
  /** 全局老旧滤镜层：始终最上层 */
  WEATHERED: 100,
} as const;

/** 每个 section 的层级基数，用于保证「前一个 section 的 frontend 比后一个 section 的层级高」 */
const SECTION_BASE = 80;

/**
 * 按 section 序号（1-based）返回该 section 内各层的 z-index。
 * 同一 section 内：content > frontend > background；
 * 跨 section：Section N 的 frontend 高于 Section N+1 的全部层。
 */
export function getSectionZLayers(sectionIndex: number) {
  const offset = (sectionIndex - 1) * 2;
  return {
    BACKGROUND: SECTION_BASE - offset - 2,
    FRONTEND: SECTION_BASE + 18 - offset,
    CONTENT: SECTION_BASE + 19 - offset,
  };
}
