import backgroundImage from '../assets/section4/background.png';
import frontendImage from '../assets/section4/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers(4);
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION4_WIDTH = '100vw';

/** Section4 文字内容配置，统一在此修改。样式用 vw/vh/%，以 2K 为基准 */
const SECTION4_TEXTS: SectionTextProps[] = [
  {
    title: '1958-1977',
    body: '在此背景下，赵大春的父母过世。他在书中以第三人称写道：\n “在车站，他一再嘱咐母亲到家万一困难，一定再来。\n可是母亲回去才一个多月，噩耗就传来，父亲走了，见了\n坟，他嚎啕大哭起来，不知为什么这么快……\n他觉得自己父母在大食堂还能打到一点饭，加上这次带的食\n物回去，估计在短时期内，他们不会出问题的。”\n然而，这场天灾下，他也没有办法。',
    style: {
      left: '200px',
      top: '60px',
    },
  },
];

/** Section4 图表/图片内容配置，统一在此修改 */
const SECTION4_CHARTS: SectionChartProps[] = [];

/**
 * Section4：宽度 200vw。结构与 Section1/Section2/Section3 一致，背景/前景/内容层。
 */
export default function Section4() {
  return (
    <div className="relative shrink-0 h-full" style={{ width: SECTION4_WIDTH, maxWidth: SECTION4_WIDTH }}>
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
        {SECTION4_TEXTS.map((item, i) => (
          <SectionText key={i} {...item} />
        ))}
        {SECTION4_CHARTS.map((item, i) => (
          <SectionChart key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
