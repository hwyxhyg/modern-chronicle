import backgroundImage from '../assets/section8/background.png';
import frontendImage from '../assets/section8/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION8_WIDTH = '200vw';

const SECTION8_TEXTS: SectionTextProps[] = [
  {
    title: '1978-Now',
    style: {
      left: '10vw',
      top: '10% ',
    },
  },
  {
    body: `Zhao Dachun’s life is like a tree passing through the seasons—taking root in the\nchill of early spring,stretching through the heat of summer,and bearing fruit in\nautumn.He endured famine,misdiagnosis, separation, and an unjust marriage. He once\nfell into spiritual winter.Yet again and again—through collective movements, through\ncracks in institutions, through the kindness of others—he rediscovered warmth, held\nfast to conscience, and carved his own path.`,
    style: {
      left: '150vw',
      top: '10% ',
      color: '#fff',
    },
  },
  {
    body: `Time will change. Systems will shift. Landscapes will transform. But the genuine bonds\nbetween people remain the softest anchor across time. This world is worth cherishing,\nultimately because— there are still people like Zhao Dachun, and because there remains\na light of warmth that has not been extinguished.`,
    style: {
      left: '150vw',
      bottom: '15% ',
      color: '#fff',
    },
  },
];

export default function Section8() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION8_WIDTH, maxWidth: SECTION8_WIDTH }}
    >
      <div className="relative w-full h-full flex items-center">
        <div className="relative w-full">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="block w-full h-auto pointer-events-none invisible"
          />
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="absolute pointer-events-none section-frontend"
            style={{
              width: '100%',
              height: 'auto',
              zIndex: Z.BACKGROUND,
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
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: Z.CONTENT }}
          >
            {SECTION8_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
