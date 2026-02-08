import backgroundImage from '../assets/section5/background.png';
import frontendImage from '../assets/section5/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers(5);
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION5_WIDTH = '100vw';

/** Section5 文字内容配置，统一在此修改。样式用 vw/vh/%，以 2K 为基准 */
const SECTION5_TEXTS: SectionTextProps[] = [];

/** Section5 图表/图片内容配置，统一在此修改 */
const SECTION5_CHARTS: SectionChartProps[] = [];

/**
 * Section5：宽度 200vw。结构与 Section1～Section4 一致，背景/前景/内容层。
 */
export default function Section5() {
  return (
    <div className="relative shrink-0 h-full" style={{ width: SECTION5_WIDTH, maxWidth: SECTION5_WIDTH }}>
      {/* 背景层 */}
      <div
        aria-hidden
        className="absolute top-0 left-0 min-h-full pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          zIndex: Z.BACKGROUND,
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'left center',
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* 前景层 */}
      <img
        src={frontendImage}
        alt=""
        role="presentation"
        aria-hidden
        className="absolute top-0 h-full pointer-events-none"
        style={{
          right: '0',
          width: '100%',
          height: 'auto',
          zIndex: Z.FRONTEND,
        }}
      />
      {/* 内容层 */}
      <div
        className="absolute top-0 left-0 min-h-full w-full"
        style={{ zIndex: Z.CONTENT }}
      >
        {SECTION5_TEXTS.map((item, i) => (
          <SectionText key={i} {...item} />
        ))}
        {SECTION5_CHARTS.map((item, i) => (
          <SectionChart key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
