import { Z_LAYERS } from '../constants/zIndex';

export interface SectionChartProps {
  /** 图片地址（import 或 url） */
  src: string;
  /** 定位与尺寸等样式，直接透传至根节点（可写 left/top/bottom/right/width 等，支持 vw/vh/%） */
  style?: React.CSSProperties;
}

/**
 * 全 section 通用图表/图片展示，样式通过 style 透传。
 * 父级需 position: relative 且与 section 同尺寸。
 */
export default function SectionChart({ src, style }: SectionChartProps) {
  return (
    <div
      className="absolute"
      style={{
        zIndex: Z_LAYERS.CONTENT,
        ...style,
      }}
    >
      <img
        src={src}
        alt=""
        role="presentation"
        className="block w-full h-auto"
      />
    </div>
  );
}
