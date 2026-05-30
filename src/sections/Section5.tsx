import backgroundImage from '../assets/section5/background.png';
import frontendImage from '../assets/section5/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION5_WIDTH = '300vw';

const SECTION5_TEXTS: SectionTextProps[] = [
  {
    title: '1961-1977',
    body: `然而，即便是身处最灰暗的岁月，人们也未曾放弃过对知识的渴求。\n随着三年自然灾害的阴霾渐渐散去，另一场深刻的变革正在神州大地上\n悄然发生——在熬过了肉体的饥饿与失去的痛苦之后，一种新的渴望开始\n驱动着人们，那是对知识的饥渴。1961年，识字率已经高达90.52%，\n这片土地逐渐被知识的微光照亮。`, 
    style: {
      left: '8vw',
      top: '10% ',
    },
  }, {
    body: [
      `与此同时，“上山下乡”运动在全国轰轰烈烈地展开，受当时政治运动的\n激荡，中国社会依然处于剧烈的动荡与宏大的人口迁徙之中。`, 
      ` `, 
      `在政策层面上，这场运动被赋予了“接受贫下中农再教育”和“建设社会主义\n新农村”的理想主义色彩。数以千万计的城市青年被组织、动员起来，奔赴边疆\n与广阔天地。1969年，下乡人数达到历史顶峰，仅那一年便有267.38万知识\n青年奔赴乡村。`, 
    ], style: {
      left: '110vw',
      top: '10% ',
    },
  }, {
    body: [
      `然而回到现实中，个体的去向与命运，往往并不取决于自身的志趣。家庭背景、\n人脉关系，乃至地方政策执行过程中的细微偏差，都在实质上决定着每一个年轻人\n的安置地点与人生轨迹。`, 
      ` `, 
      `彼时，赵大春在卫生局革命委员会任职，负责起草医疗人员改革与下乡的具体方案。\n面对许多不愿下乡、四处托关系求情的人，他依然选择坚守原则，确保方案的公正执行。\n他的工作能力与果断作风，得到了当时被下放的老干部们的高度赞誉。`, 
    ], style: {
      left: '210vw',
      top: '10% ',
    },
  }];

export default function Section5() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION5_WIDTH,  maxWidth: SECTION5_WIDTH }}
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
