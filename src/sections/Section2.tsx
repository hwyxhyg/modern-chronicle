import backgroundImage from '../assets/section2/background.png';
import frontendImage from '../assets/section2/frontend.png';
import chartImage from '../assets/section2/chart.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION2_WIDTH = '200vw';

const SECTION2_TEXTS: SectionTextProps[] = [
  {
    title: '1949-1957',
    body: 'In 1952, Zhao Dachun signed up to join the army. During the selection medical examination, he was\nmisdiagnosed with heart disease and declared physically unfit. Since the founding of the People’s\nRepublic of China, the number of medical institutions in China has been extremely limited. Moreover, although the number has been increasing, most of them are small clinics, which also contributes to a generally low standard of medical care.',
    src: chartImage,
    style: {
      left: '10vw',
      top: '10% ',
      width: '50vw',
    },
    bodyStyle: {
      marginBottom: '3vh',
    },
  },
];

export default function Section2() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION2_WIDTH, maxWidth: SECTION2_WIDTH }}
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
            {SECTION2_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
