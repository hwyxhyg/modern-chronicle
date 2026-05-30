import backgroundImage from '../assets/section7/background.png';
import frontendImage from '../assets/section7/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION7_WIDTH = '300vw';

const SECTION7_TEXTS: SectionTextProps[] = [
  {
    title: '1978-至今',
    body: [
      `1978年，中国正式确立了改革开放政策，转向市场经济体制，\n以积极的姿态融入世界大势。`, 
      `自20世纪80年代起，中国步入了以发展为导向的快速城市化阶段。\n城市建设用地持续扩张，支撑起工业生产、住宅居所与基础设施的营建，\n同时也容纳了日益增长的流动人口。`, 
    ], style: {
      left: '10vw',
      top: '10% ',
    },
  }, {
    body: `这种时代的演进，在土地利用格局的变化中表现得最为直观。\n自80年代以来，中国的城市建设用地迎来了爆发式增长。\n尽管历年实际征地面积略有波动，但整体始终保持在高位，\n这也凸显出快速城市化进程对土地资源的强烈需求。`, 
    style: {
      left: '210vw',
      top: '10% ',
      color: '#fff',
    },
  }, {
    body: [
      `快速城市化的浪潮，直接承接了因改革开放而释放出来的人口与人才洪流。\n城市土地的扩张，不仅筑起了厂房与基建，更成为了那些通过高考迁徙而来的\n人们成家立业、扎根生活的坚实基石。`,
      `当赵大春与儿时玩伴一同回到老家时，他由衷地惊叹于眼前的景象：崭新的柏油\n马路纵横交错，高楼如雨后春笋般拔地而起，一排排法国梧桐郁郁葱葱。他的故乡，\n早已褪去了传统村落的旧貌，蜕变成为一座现代化的城镇。`
    ], 
    style: {
      left: '245vw',
      top: '10% ',
      color: '#fff',
    },
  }];

export default function Section7() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION7_WIDTH,  maxWidth: SECTION7_WIDTH }}
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
