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
      `这场政治运动导致自1961年起，全国在校大学生的数量持续下滑。\n尽管中国人在这段时期逐步告别了文盲，但对绝大多数人而言，\n接受高等教育的机会依然遥不可及。`, 
    ], style: {
      left: '10vw',
      top: '10% ',
    },
  }, {
    body: [
      '1977年，中断了十载之久的全国统一高考正式恢复。那一年，全国约有272,971名\n学子被大学录取。这道窄窄的校门，永远改变了他们的人生，也重塑了中国的整个\n高等教育格局。',
      '高考的恢复，在法律与制度层面上，重新赋予了每一位公民通过公平竞争接受教育\n的权利。'
    ],
    style: {
      left: '145vw',
      bottom: '25% ',
      color: '#fff',
    },
  }];

export default function Section6() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION6_WIDTH,  maxWidth: SECTION6_WIDTH }}
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
