import backgroundImage from '../assets/section3/background.png';
import frontendImage from '../assets/section3/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION3_WIDTH = '200vw';

const SECTION3_TEXTS: SectionTextProps[] = [
  {
    title: '1949-1957',
    style: {
      left: '5vw',
      top: '10% ',
    },
  },
  {
    body: [
      'Under such circumstances, after failing to enlist, Zhao returned home and accepted an\n[[arranged marriage|Refers to a marital arrangement primarily decided by parents or families rather than the individuals involved. Although freedom of marriage was legally established in China in the 1950s, arranged marriages remained common in practice for decades.]] arranged by his parents, marrying a rural woman.',
    ],
    justify: false,
    style: {
      left: '5vw',
      top: '20% ',
    },
  },
  {
    body: 'In China around the early 1950s, marriage choices were deeply shaped by family structures and\nsocial norms. Although [[the Marriage Law|The Marriage Law of 1950 was the first marriage legislation in the PRC, establishing freedom of marriage, monogamy, and gender equality, aiming to abolish arranged and feudal marriages.]] had legally established freedom of marriage and gender\nequality, arranged marriages and matchmakers remained widespread in everyday life.',
    style: {
      left: '5vw',
      bottom: '15% ',
    },
  },
  {
    body: "“Reliability” and “stability”—being honest, mild-mannered, and aligned with family and \nsocial expectations—often outweighed personal emotion. “[[Good family background|Refers to the political and social classification of one's family (e.g., worker, peasant, landlord, capitalist), which used to strongly affect individuals' life opportunities.]]” and \n“political safety” became crucial, if unspoken, criteria.",
    style: {
      left: '80vw',
      top: '20% ',
    },
  },
];

export default function Section3() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION3_WIDTH, maxWidth: SECTION3_WIDTH }}
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
            {SECTION3_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
