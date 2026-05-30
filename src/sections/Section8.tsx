import backgroundImage from '../assets/section8/background.png';
import frontendImage from '../assets/section8/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION8_WIDTH = '200vw';

const SECTION8_TEXTS: SectionTextProps[] = [
  {
    title: '1978-至今',
    style: {
      left: '10vw',
      top: '10% ',
    },
  }, {
    body: `赵大春的一生，正如一棵经历四季更迭的树——在初春的微寒中扎根，\n在盛夏的酷暑里舒展，在金秋的时节里结果。他曾历经饥荒、遭遇误诊、\n承受离别，也曾向一段不合适的婚姻妥协。他曾一度陷入精神的寒冬，\n然而一次又一次，在集体的巨变中，在体制的缝隙里，在他人释放的善意中，\n他重新找到了温度。他始终坚守着良知，并在荆棘中蹚出了属于自己的路。`, 
    style: {
      left: '150vw',
      top: '10% ',
      color: '#fff',
    },
  }, {
    body: `时代在变迁，体制在更迭，山河在改貌。然而，人与人之间真挚的纽带，\n始终是跨越漫长岁月中那处最柔软的锚。这个世界终究值得我们去热爱，\n因为这里依然有像赵大春一样赤诚生活着的人，因为这里，依旧留存着\n一束未曾熄灭的、温暖的光。`, 
    style: {
      left: '150vw',
      bottom: '15% ',
      color: '#fff',
    },
  }];

export default function Section8() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION8_WIDTH,  maxWidth: SECTION8_WIDTH }}
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
