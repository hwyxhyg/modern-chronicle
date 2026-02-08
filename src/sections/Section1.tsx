import backgroundImage from '../assets/section1/background.png';
import chartImage from '../assets/section1/chart.png';
import frontendImage from '../assets/section1/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers(1);
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION1_WIDTH = '300vw';

/** Section1 文字内容配置，统一在此修改。样式用 vw/vh/%，以 2K(2560×1440) 为基准换算 */
const SECTION1_TEXTS: SectionTextProps[] = [
  {
    title: '1949-1957',
    body: '时代初定，万物待苏。个体的命运在制度与乏之\n间悄然成形，爱、健康与婚姻，皆不由己',
    style: {
      left: '60px',
      top: '60px',
    },
  },
  {
    body: '1950年前后，世界正进入战后重建与工业扩张的新阶段，而中国，也刚刚走出长期战争，站在发\n展的起点。 但相比起欧美各国，彼时，中国的人均收入、医疗资源和基础设施仍处在极低水平。\n 城乡差距明显，公共服务覆盖有限，个体的生活选择往往被生存条件和制度结构深刻制约。\n\n 1934年，赵大春出生，个体的小船在时代的汪洋中沉浮，启航。',
    style: {
      left: 'calc(2 * 100vw + 400px)',
      top: '60px',
    },
  },
];

/** Section1 图表/图片内容配置，统一在此修改。样式用 vw/vh/%，以 2K 为基准 */
const SECTION1_CHARTS: SectionChartProps[] = [
  {
    src: chartImage,
    style: {
      left: 'calc(2 * 100vw + 400px)',
      bottom: '60px',
      width: '70vw',
    },
  },
];

/**
 * Section1：宽度 300vw。背景高度 84% 垂直居中、水平 left；前景同宽高规格。
 */
export default function Section1() {
  return (
    <div className="relative shrink-0 h-full" style={{ width: SECTION1_WIDTH, maxWidth: SECTION1_WIDTH }}>
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
          right: '-2%',
          width: 'auto',
          height: '100%',
          zIndex: Z.FRONTEND,
        }}
      />
      {/* 内容层 */}
      <div
        className="absolute top-0 left-0 min-h-full w-full"
        style={{ zIndex: Z.CONTENT }}
      >
        {SECTION1_TEXTS.map((item, i) => (
          <SectionText key={i} {...item} />
        ))}
        {SECTION1_CHARTS.map((item, i) => (
          <SectionChart key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
