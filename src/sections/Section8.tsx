import backgroundImage from '../assets/section8/background.png';
import frontendImage from '../assets/section8/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers(8);
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION8_WIDTH = '300vw';

/** Section8 文字内容配置，统一在此修改。样式用 vw/vh/%，以 2K 为基准 */
const SECTION8_TEXTS: SectionTextProps[] = [
  {
    title: '1958-1977',
    body: '20世纪80年代起，中国进入了以经济发展为导\n向的快速城市化阶段。这一进程深刻地改变了\n亿万普通家庭的生活轨迹。',
    style: {
      left: 'calc(100vw + 200px)',
      top: '60px',
    },
  },
  {
    body: '这一进程在土地形态上表现得尤为显著。自\n20世纪80年代以来，中国城市建设用地面积\n持续快速增长。与此同时，每年实际征用的\n土地面积在波动中维持较大规模，反映出城\n市化加速时期对土地资源的集中需求。',
    style: {
      left: 'calc(200vw + 200px)',
      top: '60px',
      color: '#fff',
    },
  },
  {
    body: '快速城市化直接承接了改革开放以来的人口与人才流动趋势。城市建设用地的扩\n展，不仅为工业发展、住房建设和基础设施扩容提供了物理空间，也为通过高考等\n渠道进入城市的各类人才提供了职业发展与生活安置的物质载体。赵大春与童年玩\n伴一起回故乡，发现故乡新添了水泥路大街，建起了很多楼房和梧桐树，已然从一\n个传统村镇演变成了一个现代化小城镇。',
    style: {
      left: 'calc(250vw + 100px)',
      top: '60px',
      color: '#fff',
    },
  },
];

/** Section8 图表/图片内容配置，统一在此修改 */
const SECTION8_CHARTS: SectionChartProps[] = [];

/**
 * Section8：结构与 Section1～Section7 一致，背景/前景/内容层。
 */
export default function Section8() {
  return (
    <div className="relative shrink-0 h-full" style={{ width: SECTION8_WIDTH, maxWidth: SECTION8_WIDTH }}>
      {/* 背景层 */}
      <div
        aria-hidden
        className="absolute top-0 left-0 min-h-full pointer-events-none"
        style={{
          width: '100%',
          height: 'auto',
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
        {SECTION8_TEXTS.map((item, i) => (
          <SectionText key={i} {...item} />
        ))}
        {SECTION8_CHARTS.map((item, i) => (
          <SectionChart key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
