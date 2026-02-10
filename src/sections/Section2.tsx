import backgroundImage from '../assets/section2/background.png';
import frontendImage from '../assets/section2/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION2_WIDTH = '200vw';

const SECTION2_TEXTS: SectionTextProps[] = [];

const SECTION2_CHARTS: SectionChartProps[] = [];

export default function Section2() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION2_WIDTH, maxWidth: SECTION2_WIDTH }}
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
