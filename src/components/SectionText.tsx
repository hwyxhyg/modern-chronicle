import { Z_LAYERS } from '../constants/zIndex';

/** 2K 基准宽度，用于相对字号：2560px 下 1rem ≈ 10px → 88px = 3.4375vw, 28px = 1.09375vw */
const BASE_VIEWPORT_WIDTH = 2560;

export interface SectionTextProps {
  /** 可选标题，纯文本 */
  title?: string;
  /** 正文，纯文本，必传 */
  body: string;
  /** 定位与尺寸等样式，直接透传至根节点（可写 left/top/maxWidth 等，支持 vw/vh/%） */
  style?: React.CSSProperties;
}

/** 以 2K 为基准的 vw 字号：px 值在 2560 宽下等效 */
function pxToVw(px: number): string {
  return `${(px / BASE_VIEWPORT_WIDTH) * 100}vw`;
}

/**
 * 全 section 通用文字展示：可选 title + 必填 body，样式通过 style 透传。
 * 字号为相对单位（以 2K 屏为基准）。
 */
export default function SectionText({
  title,
  body,
  style,
}: SectionTextProps) {
  return (
    <article
      className="absolute w-full max-w-full"
      style={{
        zIndex: Z_LAYERS.CONTENT,
        fontFamily: "'Huiwen-mincho', serif",
        color: '#000', // 默认黑色，可被 style 中的 color 覆盖
        ...style,
      }}
    >
      {title != null && title !== '' && (
        <h2
          style={{
            fontSize: pxToVw(88),
            lineHeight: 1.2,
            marginBottom: pxToVw(12),
          }}
        >
          {title}
        </h2>
      )}
      <p
        style={{
          fontSize: pxToVw(28),
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
        }}
      >
        {body}
      </p>
    </article>
  );
}
