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
  }, {
    body: [
      '在这样的境遇下，消沉的赵大春回到了家乡。\n最终，他接受了父母之命、媒妁之言，与一位农村姑娘结了婚。'],
    justify: false,
    style: {
      left: '5vw',
      top: '20% ',
    },
  }, {
    body: '20世纪50年代初期，中国的婚姻选择深受家族结构与社会规范的裹挟。\n尽管《婚姻法》在法律层面上确立了婚姻自由与男女平等，但在日常生活的\n细节里，包办婚姻与媒妁之言依然根深蒂固。',
    style: {
      left: '5vw',
      bottom: '15% ',
    },
  }, {
    body: '在当时的择偶标准中，个人的情感往往要让位于“可靠性”与“稳定性”\n——是否老实本分、性格温和、是否符合家庭与社会的期待，往往更具\n决定性意义。“家庭成分好”、“政治上无风险”，成了人们心中秘而不宣、\n却决定生死的隐性硬标准。',
    style: {
      left: '80vw',
      top: '20% ',
    },
  }];

export default function Section3() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION3_WIDTH,  maxWidth: SECTION3_WIDTH }}
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
