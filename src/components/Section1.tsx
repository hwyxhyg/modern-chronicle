import backgroundImage from '../assets/section1/background.png';
import chartImage from '../assets/section1/chart.png';
import frontendImage from '../assets/section1/frontend.png';
import { Z_LAYERS } from '../constants/zIndex';
import SectionChart from './SectionChart';
import type { SectionChartProps } from './SectionChart';
import SectionText from './SectionText';
import type { SectionTextProps } from './SectionText';

const SECTION1_WIDTH = '300vw';

/** Section1 文字内容配置，统一在此修改。样式用 vw/vh/%，以 2K(2560×1440) 为基准换算 */
const SECTION1_TEXTS: SectionTextProps[] = [
  {
    title: '1949-1957',
    body: '时代初定，万物待苏。个体的命运在制度与乏之间悄然成形，爱、健康与婚姻，皆不由己',
    style: {
      left: 'calc(0 * 100vw + 2.34vw)',
      top: '4vh',
      maxWidth: '23.44vw',
    },
  },
  {
    body: '1950年前后，世界正进入战后重建与工业扩张的新阶段，而中国，也刚刚走出长期战争，站在发展的起点。 但相比起欧美各国，彼时，中国的人均收入、医疗资源和基础设施仍处在极低水平。\n 城乡差距明显，公共服务覆盖有限，个体的生活选择往往被生存条件和制度结构深刻制约。\n\n 1934年，赵大春出生，个体的小船在时代的汪洋中沉浮，启航。',
    style: {
      left: 'calc(2 * 100vw + 15vw)',
      top: '4vh',
      maxWidth: '46.48vw',
    },
  },
];

/** Section1 图表/图片内容配置，统一在此修改。样式用 vw/vh/%，以 2K 为基准 */
const SECTION1_CHARTS: SectionChartProps[] = [
  {
    src: chartImage,
    style: {
      left: 'calc(2 * 100vw + 15vw)',
      bottom: '7vh',
      width: '70vw',
    },
  },
];

/**
 * Section1：宽度 300vw。背景高度 84% 垂直居中、水平 left；前景同宽高规格。
 */
export default function Section1() {
  return (
    <>
      {/* 占位，撑开横向滚动宽度 */}
      <div
        className="shrink-0"
        style={{ width: SECTION1_WIDTH, minHeight: '100%' }}
        aria-hidden
      />
      {/* 背景层：高度 84%、垂直居中，水平 left 不变 */}
      <div
        aria-hidden
        className="absolute top-0 min-h-full pointer-events-none"
        style={{
          left: 0,
          width: SECTION1_WIDTH,
          height: '100%',
          zIndex: Z_LAYERS.BACKGROUND,
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'left center',
          backgroundSize: '111% auto',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* 前景层：img 绘制，高度 100%、宽度 auto，left 基于 section 的百分比 */}
      <img
        src={frontendImage}
        alt=""
        role="presentation"
        aria-hidden
        className="absolute top-0 h-full pointer-events-none"
        style={{
          left: '5.5%',
          width: 'auto',
          height: '100%',
          zIndex: Z_LAYERS.FRONTEND,
        }}
      />
      {/* 内容层 */}
      <div
        className="absolute top-0 min-h-full"
        style={{
          left: 0,
          width: SECTION1_WIDTH,
          height: '100%',
          zIndex: Z_LAYERS.CONTENT,
        }}
      >
        {SECTION1_TEXTS.map((item, i) => (
          <SectionText key={i} {...item} />
        ))}
        {SECTION1_CHARTS.map((item, i) => (
          <SectionChart key={i} {...item} />
        ))}
      </div>
    </>
  );
}
