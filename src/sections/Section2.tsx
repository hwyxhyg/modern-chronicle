import backgroundImage from '../assets/section2/background.png';
import frontendImage from '../assets/section2/frontend.png';
import chartImage from '../assets/section2/chart.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers(2);
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION2_WIDTH = '200vw';

/** Section2 文字内容配置，统一在此修改。样式用 vw/vh/%，以 2K 为基准 */
const SECTION2_TEXTS: SectionTextProps[] = [
  {
    title: '1958-1977',
    body: '1952年赵大春报名参军，在选拔体检中，被误诊\n为心脏病，被判定为身体不合格。他因此失去当\n兵的机会，在郁郁寡欢中，同初恋方芳分手。',
    style: {
      left: '200px',
      top: '60px',
    },
  },
  {
    body: '在那个医疗资源尚未普及的年代，这样的诊断几乎没有复核的可能。\n 1949年，中国的卫生机构只有3670所，真正具备系统诊疗能力的医院\n寥寥无几。到了1952年，中国基层的医疗机构逐步发展，但专业的医\n疗机构增长仍然相当有限。',
    style: {
      left: '1000px',
      top: '170px',
    },
  },
  {
    body: '而先天性心脏病的诊断离不开心电图和超声波等仪器\n的检查，但是类似的技术在当时的中国还很不普及。',
    style: {
      left: 'calc(100vw + 300px)',
      top: '170px',
    },
  },
];

/** Section2 图表/图片内容配置，统一在此修改 */
const SECTION2_CHARTS: SectionChartProps[] = [
  {
    src: chartImage,
    style: {
      left: '200px',
      bottom: '60px',
      width: '800px',
    },
  },
];

/**
 * Section2：宽度 200vw。结构与 Section1 一致，背景/前景/内容层。
 */
export default function Section2() {
  return (
    <div className="relative shrink-0 h-full" style={{ width: SECTION2_WIDTH, maxWidth: SECTION2_WIDTH }}>
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
          right: '-1%',
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
        {SECTION2_TEXTS.map((item, i) => (
          <SectionText key={i} {...item} />
        ))}
        {SECTION2_CHARTS.map((item, i) => (
          <SectionChart key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
