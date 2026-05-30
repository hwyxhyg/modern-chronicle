import backgroundImage from '../assets/section4/background.png';
import frontendImage from '../assets/section4/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION4_WIDTH = '300vw';

const SECTION4_TEXTS: SectionTextProps[] = [
  {
    title: '1957-1961',
    body: '天灾与人祸接踵而至，生离死别变得毫无预兆。',
    style: {
      left: '8vw',
      top: '10% ',
    },
  }, {
    title: '1957-1961',
    style: {
      left: '110vw',
      top: '10% ',
    },
  }, {
    body: `50年代末，受当时政治环境的影响，“大跃进”的失误与“反右倾”\n运动的蔓延，为农业产值的虚报浮夸埋下了伏笔。1959至1961年间，\n三年困难时期骤至，加之苏联政府突然撕毁经济合同，多重不利因素\n交织在一起，让国民经济一度陷入了严重困难的境地。`, 
    style: {
      left: '140vw',
      top: '10% ',
    },
  }, {
    body: `赵大春先生亲笔信`,
    style: {
      left: '140vw',
      bottom: '25% ',
    },
  }, {
    body: [
      `在那段日子里，赵大春的双亲相继离世。他以第三人称在回忆录中这样写道：`,
      `“在火车站，他反复叮嘱母亲，如果回乡后日子实在过不下去，就一定要再搬过来。\n然而短短一个多月后，噩耗传来——父亲已经撒手人寰。站在坟前，他失声痛哭，\n无论如何也想不通为什么一切会发生得这么快……他原本以为，既然公共食堂能吃上\n饭，再加上自己这次带回来的物资，家里总能勉强支撑一阵子。”`,
      `然而，面对时代灾厄，个体的努力终究如螳臂当车。`, 
    ], style: {
      left: '240vw',
      top: '10% ',
    },
  }];

export default function Section4() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION4_WIDTH,  maxWidth: SECTION4_WIDTH }}
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
            {SECTION4_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
