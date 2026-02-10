import backgroundImage from '../assets/section6/background.png';
import frontendImage from '../assets/section6/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers(6);
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION6_WIDTH = '200vw';

const SECTION6_TEXTS: SectionTextProps[] = [];

const SECTION6_CHARTS: SectionChartProps[] = [];

export default function Section6() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION6_WIDTH, maxWidth: SECTION6_WIDTH }}
    >
      <div
        aria-hidden
        className="absolute top-0 left-0 min-h-full pointer-events-none section-bg"
        style={{
          width: '100%',
          height: 'auto',
          zIndex: Z.BACKGROUND,
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <img
        src={frontendImage}
        alt=""
        role="presentation"
        aria-hidden
        className="absolute pointer-events-none section-frontend"
        style={{
          width: '100%',
          height: 'auto',
          zIndex: Z.FRONTEND,
        }}
      />
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
