import backgroundImage from '../assets/section5/background.png';
import frontendImage from '../assets/section5/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION5_WIDTH = '300vw';

const SECTION5_TEXTS: SectionTextProps[] = [
  {
    title: '1957-1961',
    body: `But even during those dark times, people did not abandon their thirst for\nknowledge. As the shadow of the disasters gradually lifted, another profound\ntransformation was taking place across the land of China -- Having endured\nphysical hunger and loss, people began to be driven by a new kind of yearning\n—a hunger for knowledge.`,
    style: {
      left: '8vw',
      top: '10% ',
    },
  },
  {
    body: [
      `However, despite this, Chinese society remained highly unstable due to the influence of political\nmovements. From the late 1950s to the 1970s, China experienced a massive population movement\n—the [[Up to the Mountains and Down to the Countryside|The movement began in 1955 and peaked in the late 1960s, when national directives called for urban youth to be relocated to rural and frontier areas. Over 16 million young people were sent down, involving roughly one-tenth of China's urban population — one of the largest urban-to-rural migrations in modern history.]] Movement.`,
      ` `,
      `In 1969, the number of people going to the countryside reached its peak, with 2.6738 million\neducated youth [[sent down|Refers to the policy of transferring urban professionals, cadres, or intellectuals to rural areas for labor and ideological remolding — a common practice during political campaigns in Mao-era China.]] that year alone. At the policy level, this movement was imbued with\nidealistic undertones of "[[receiving re-education from the poor and lower-middle peasants|A core ideological expression of the Down to the Countryside Movement, emphasizing that urban youth should learn socialist values and labor discipline through working alongside poor and lower-middle peasants.]]" and \n"[[building new socialist rural areas|A policy-oriented expression used at the time to describe an ideal vision of transforming rural society and its economic structure through collective labor, production organization, and political mobilization.]]". Tens of millions of urban youth were organized or mobilized\nto go to the countryside and frontier regions.`,
    ],
    style: {
      left: '110vw',
      top: '10% ',
    },
  },
  {
    body: [
      `However, in reality, an individual's destination and fate often did not depend on\ntheir own interests or expertise. Family background, personal connections, and\neven the specific ways local policies were implemented all factually determined\neach young person's placement location and life trajectory.`,
      ` `,
      `Zhao Dachun served as a committee member of the Health Bureau's Revolutionary\nCommittee, responsible for drafting specific plans for medical personnel reform\nand rustication. Faced with many people who were unwilling to be sent down and\nsought connections or pleaded for favors, he still insisted on handling matters\naccording to principles, ensuring the fair implementation of the plan. His work\ncapability and decisiveness earned high praise from senior cadres who were sent\ndown at the time.`,
    ],
    style: {
      left: '210vw',
      top: '10% ',
    },
  },
];

export default function Section5() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION5_WIDTH, maxWidth: SECTION5_WIDTH }}
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
            {SECTION5_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
