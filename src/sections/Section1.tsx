import backgroundImage from '../assets/section1/background.png';
import frontendImage from '../assets/section1/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION1_WIDTH = '300vw';

const SECTION1_TEXTS: SectionTextProps[] = [
  {
    title: '1949-1957',
    style: {
      left: '5vw',
      top: '10% ',
    },
  },
  {
    body: '这是一个时代的黎明，万物静待复苏。\n在这样的背景下，个体的爱情、健康与婚姻，\n往往由不得自己抉择。',
    style: {
      left: '5vw',
      top: '18% ',
    },
  },
  {
    body: '1949年，中华人民共和国刚刚成立。彼时，各项制度百废待兴，资源极度匮乏，一切都在\n艰难中走向重建。与欧美国家相比，当时中国的人均收入、医疗资源和基础设施都处于\n极低的水平。城乡鸿沟如一道天堑，公共服务捉襟见肘，个体的命运与生活选择，被深深\n地禁锢在匮乏的生存条件与刚性的体制结构之中。',
    style: {
      left: '40vw',
      top: '18% ',
    },
  },
  {
    body: '1934年，赵大春出生。像一艘小船，这个平凡的生命\n在时代的汪洋中沉浮、启航，驶入了波澜壮阔的历史洪流。',
    style: {
      left: '105vw',
      top: '18% ',
    },
  },
  {
    body: '彼时，中国的GDP总量虽位居全球第五，\n但庞大的人口基数，使得人均GDP依然定格在世界的尾部。',
    style: {
      right: '62vw',
      top: '18% ',
      width: '40vw',
    },
  },
];

export default function Section1() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION1_WIDTH, maxWidth: SECTION1_WIDTH }}
    >
      <div className="relative w-full h-full flex items-center">
        {/* 画面容器:尺寸与前景/背景图片一致 */}
        <div className="relative w-full">
          {/* 幽灵图:不可见, 但用于撑开容器高度, 使其与图片真实尺寸一致 */}
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="block w-full h-auto pointer-events-none invisible"
          />
          {/* 背景图层:与前景共用垂直对齐逻辑 */}
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
          {/* 内容层:文字 / 图表, 相对画面容器定位 */}
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: Z.CONTENT }}
          >
            {SECTION1_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
