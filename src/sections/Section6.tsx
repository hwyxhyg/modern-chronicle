import backgroundImage from '../assets/section6/background.png';
import frontendImage from '../assets/section6/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers(6);
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION6_WIDTH = '300vw';

/** Section6 文字内容配置，统一在此修改。样式用 vw/vh/%，以 2K 为基准 */
const SECTION6_TEXTS: SectionTextProps[] = [
  {
    title: '1958-1977',
    body: '当三年自然灾害的阴霾逐渐散去，中国大地上\n另一场深刻的改变正在发生。在经历了身体上\n的饥饿与失去之后，人们开始被一种新的渴望\n驱动——对知识的渴望。',
    style: {
      left: '120px',
      top: '60px',
    },
  },
  {
    body: '1960年左右，全国各地掀起“学万荣、赶万荣”的注音识字运动\n高潮。大规模的注音扫盲运动取得了很好的效果。至1964年，\n我国15岁以上人口的文盲率，已经由解放初期的80%下降到了\n52%;1亿多人摘除了文盲的帽子。这片土地逐渐被知识照亮。',
    style: {
      left: 'calc(100vw - 1000px)',
      bottom: '200px',
    },
  },
  {
    body: '1950年代后期至1970年代，中国社会经历了一场大规模的人口流动——知\n识青年上山下乡运动。 \n\n1969年，上山下乡人数达到顶峰，当年共267.38万知识青年下乡。这一运\n动在政策层面被赋予“接受贫下中农再教育”“建设社会主义新农村”的理想\n色彩，数以千万计的城市青年被组织或动员前往农村和边疆。',
    style: {
      left: 'calc(100vw + 220px)',
      top: '60px',
    },
  },
  {
    body: '然而在现实层面，个人的去向与命运，往往并不取决于自身志趣或专\n业。家庭出身、人际关系乃至地方执行政策的具体方式，都在事实上主\n导着每一个青年的安置地点与生活轨迹。 \n\n赵大春担任卫生局革委会委员，负责起草具体的医疗人员改革和下放方\n案，面对许多人不愿下放而四处托关系、求情的情况，他依然坚持按原\n则办事，确保方案的公正执行。他的工作能力和魄力得到了当时下放的\n高级干部的高度评价。',
    style: {
      left: 'calc(200vw + 220px)',
      top: '60px',
    },
  },
];

/** Section6 图表/图片内容配置，统一在此修改 */
const SECTION6_CHARTS: SectionChartProps[] = [];

/**
 * Section6：结构与 Section1～Section5 一致，背景/前景/内容层。
 */
export default function Section6() {
  return (
    <div className="relative shrink-0 h-full" style={{ width: SECTION6_WIDTH, maxWidth: SECTION6_WIDTH }}>
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
          bottom: '0',
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
        {SECTION6_TEXTS.map((item, i) => (
          <SectionText key={i} {...item} />
        ))}
        {SECTION6_CHARTS.map((item, i) => (
          <SectionChart key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
