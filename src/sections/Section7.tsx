import backgroundImage from '../assets/section7/background.png';
import frontendImage from '../assets/section7/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers(7);
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION7_WIDTH = '200vw';

/** Section7 文字内容配置，统一在此修改。样式用 vw/vh/%，以 2K 为基准 */
const SECTION7_TEXTS: SectionTextProps[] = [
  {
    title: '1958-1977',
    body: '1950年代后期至1970年代，中国社会经历了\n一场大规模的人口流动——知识青年上山下\n乡运动。 1969年，上山下乡人数达到顶峰，\n当年共267.38万知识青年下乡。',
    style: {
      left: '60px',
      top: '60px',
    },
  },
];

/** Section7 图表/图片内容配置，统一在此修改 */
const SECTION7_CHARTS: SectionChartProps[] = [];

/**
 * Section7：结构与 Section1～Section6 一致，背景/前景/内容层。
 */
export default function Section7() {
  return (
    <div className="relative shrink-0 h-full" style={{ width: SECTION7_WIDTH, maxWidth: SECTION7_WIDTH }}>
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
        className="absolute bottom-0 h-full pointer-events-none"
        style={{
          left: '65vw',
          width: '80vw',
          height: 'auto',
          zIndex: Z.FRONTEND,
        }}
      />
      {/* 内容层 */}
      <div
        className="absolute top-0 left-0 min-h-full w-full"
        style={{ zIndex: Z.CONTENT }}
      >
        {SECTION7_TEXTS.map((item, i) => (
          <SectionText key={i} {...item} />
        ))}
        {SECTION7_CHARTS.map((item, i) => (
          <SectionChart key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
