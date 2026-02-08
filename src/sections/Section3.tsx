import backgroundImage from '../assets/section3/background.png';
import frontendImage from '../assets/section3/frontend.png';
import letterImage from '../assets/section3/letter.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers(3);
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION3_WIDTH = '300vw';

/** Section3 文字内容配置，统一在此修改。样式用 vw/vh/%，以 2K 为基准 */
const SECTION3_TEXTS: SectionTextProps[] = [
  {
    title: '1958-1977',
    body: '天灾人祸相继，生离死别无常。然而知识的星\n火未曾熄灭，一代人在迷茫与迁徙中，寻找着\n精神的出路。',
    style: {
      left: '120px',
      top: '60px',
    },
  },
  {
    title: '1958-1977',
    body: '',
    style: {
      left: 'calc(100vw + 200px)',
      top: '60px',
    },
  },
  {
    title: '',
    body: '20世纪50年代末，党内的政治斗争下，“大跃进”和“反右倾”错误为农业浮\n夸问题埋下伏笔。1959-1961年，三年自然灾害以及苏联政府背信弃义地\n撕毁合同，使得我国国民经济发生严重困难，国家和人民遭受重大损失',
    style: {
      left: 'calc(100vw + 1200px)',
      top: '60px',
    },
  },
];

/** Section3 图表/图片内容配置，统一在此修改 */
const SECTION3_CHARTS: SectionChartProps[] = [
  {
    src: letterImage,
    style: {
      left: 'calc(100vw + 400px)',
      bottom: '200px',
      width: '55vw',
    },
  },
];

/**
 * Section3：宽度 200vw。结构与 Section1/Section2 一致，背景/前景/内容层。
 */
export default function Section3() {
  return (
    <div className="relative shrink-0 h-full" style={{ width: SECTION3_WIDTH, maxWidth: SECTION3_WIDTH }}>
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
          bottom: '0',
          width: '100%',
          height: '100%',
          zIndex: Z.FRONTEND,
        }}
      />
      {/* 内容层 */}
      <div
        className="absolute top-0 left-0 min-h-full w-full"
        style={{ zIndex: Z.CONTENT }}
      >
        {SECTION3_TEXTS.map((item, i) => (
          <SectionText key={i} {...item} />
        ))}
        {SECTION3_CHARTS.map((item, i) => (
          <SectionChart key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
