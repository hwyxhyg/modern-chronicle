import backgroundImage from '../assets/section7/background.png';
import frontendImage from '../assets/section7/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION7_WIDTH = '300vw';

const SECTION7_TEXTS: SectionTextProps[] = [
  {
    title: '1978-Now',
    body: [
      `In 1978, China officially implemented the [[Reform and Opening-up|The policies of domestic reform and opening to the outside world initiated after the Third Plenary Session of the 11th Central Committee in December 1978. Widely regarded as a pivotal turning point in China's modern trajectory.]] policy, adopting a market economy\nand actively integrating into the world. `,
      `From the 1980s onward, China entered a phase of rapid, development-oriented urbanization.Urban\nconstruction land expanded continuously, supporting industrial production, housing, and infrastructure,\nwhile absorbing growing population mobility. Cities became not only sites of production but also\nprimary spaces for personal careers and daily life.`,
    ],
    style: {
      left: '10vw',
      top: '10% ',
    },
  },
  {
    body: `This progression is most visible in land-use patterns.\nSince the 1980s, China's urban construction land has\nexpanded rapidly. At the same time, the actual amount\nof land acquired each year has stayed at a high level\nwith some fluctuations, highlighting the intense demand\nfor land driven by rapid urbanization.`,
    style: {
      left: '210vw',
      top: '10% ',
      color: '#fff',
    },
  },
  {
    body: `The tide of rapid urbanization has directly channeled the flow of people and talent unleashed\nby the [[Reform and Opening-up|The policies of domestic reform and opening to the outside world initiated after the Third Plenary Session of the 11th Central Committee in December 1978. Widely regarded as a pivotal turning point in China's modern trajectory.]]. This expansion of urban land does more than house industries\nand infrastructure; it serves as a foundation for those who migrated via the Gaokao to build their\ncareers and lives. Returning to his birthplace with childhood friends, Zhao Dachun marveled at\nthe new concrete avenues, the rising apartment blocks, and the rows of phoenix trees. His hometown\nhad shed its identity as a traditional rural settlement, transforming into a modern township.`,
    style: {
      left: '245vw',
      top: '10% ',
      color: '#fff',
    },
  },
];

export default function Section7() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION7_WIDTH, maxWidth: SECTION7_WIDTH }}
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
            {SECTION7_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
