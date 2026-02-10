import backgroundImage from '../assets/section1/background.png';
import frontendImage from '../assets/section1/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionChart from '../components/SectionChart';
import type { SectionChartProps } from '../components/SectionChart';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION1_WIDTH = '300vw';

const SECTION1_TEXTS: SectionTextProps[] = [];

const SECTION1_CHARTS: SectionChartProps[] = [];

export default function Section1() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION1_WIDTH, maxWidth: SECTION1_WIDTH }}
    >
      <div className="relative w-full h-full flex items-center">
        {/* 画面容器：尺寸与前景/背景图片一致 */}
        <div className="relative w-full">
          {/* 幽灵图：不可见，但用于撑开容器高度，使其与图片真实尺寸一致 */}
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="block w-full h-auto pointer-events-none invisible"
          />
          {/* 背景图层：与前景共用垂直对齐逻辑 */}
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
          {/* 前景图层 */}
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
          {/* 内容层：文字 / 图表，相对画面容器定位 */}
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: Z.CONTENT }}
          >
            {SECTION1_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
            {SECTION1_CHARTS.map((item, i) => (
              <SectionChart key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
