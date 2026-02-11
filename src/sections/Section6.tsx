import backgroundImage from '../assets/section6/background.png';
import frontendImage from '../assets/section6/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION6_WIDTH = '200vw';

const SECTION6_TEXTS: SectionTextProps[] = [
  {
    title: '1961-1977',
    body: [
      `At the same time, the “Up to the Mountains and Down to the Countryside”\nmovement unfolded. In 1969, the number of sent-down youth reached its\npeak, with 2.67 million young people relocated that year alone.`,
      `This political movement led to a continuous decline in the number of college\nstudents since 1961. Although the Chinese people were lifted out of illiteracy,\nit remained difficult for them to access higher education.`,
      ` `,
      `In 1977, the national college entrance examination—suspended for a decade—\nwas restored, reaffirmed as the core mechanism for selecting talent and advancing\nmodernization. Its reinstatement legally and institutionally restored citizens’\nright to access education through fair competition.`,
    ],
    style: {
      left: '10vw',
      top: '10% ',
    },
  },
];

export default function Section6() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION6_WIDTH, maxWidth: SECTION6_WIDTH }}
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
            {SECTION6_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
