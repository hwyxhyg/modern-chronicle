import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import WeatheredOverlay from '../components/WeatheredOverlay';
import SectionText,  { type SectionTextProps } from '../components/SectionText';
import { Z_LAYERS } from '../constants/zIndex';

import img1 from '../assets/end/img1.jpg';
import img2 from '../assets/end/img2.jpg';
import img3 from '../assets/end/img3.jpg';
import img4 from '../assets/end/img4.jpg';
import img5 from '../assets/end/img5.jpg';
import img6 from '../assets/end/img6.jpg';
import titleImg from '../assets/end/title.png';

const END_IMAGES = [img1,  img2,  img3,  img4,  img5,  img6];

// 文案占位:后续由文案填充 title/body
const END_TEXT_PROPS: SectionTextProps = {
  body: [
    `后记：赵大春老人如今已期颐之年(九十二岁)，他的人生如同中国大地上的\n一抹微光——平凡，却也极其不凡。`, 
    ` `, 
    `一次偶然的际遇，让我们读到了他亲笔写下的回忆录。那厚厚的一页页纸张，\n记录了八十多载风雨兼程与坚忍不拔，也如同一面镜子，严丝合缝地映照出\n中国现代化的漫长弧线。`, 
    ` `, 
    `承蒙老人嘱托，也深感这些文字早已超越了个人自传的范畴，我们倾注心力，\n开启了这项将第一人称珍贵叙事数字化的旅程。因为这不仅是一个人的私密记忆，\n更是一部关于国家转型期鲜活、细腻的时代侧写。`, 
    ` `, 
    `他的故事，从来都不只属于他一个人，它折射出的，是整整一代中国人的\n情感图景。`, 
    ` `, 
    `我们由衷地感谢赵大春先生、他的家人及亲属所给予的信任。同时，也向为本\n项目提供技术支持的媒体与合作单位致以诚挚的谢意。正如赵老自己在文章中\n所写的那样：`, 
    `"人间温暖是真情"。`, 
  ], style: {
    color: '#f5f5f5',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
  },
};

export default function End() {
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const setupAnimation = () => {
      const groups = Array.from(strip.children) as HTMLElement[];
      if (!groups.length) return;

      const firstGroup = groups[0];
      const groupHeight = firstGroup.getBoundingClientRect().height;
      if (!groupHeight) return;

      // 一轮纵向滚动时长（秒）, 数值越小越快
      const duration = 20;

      const tween = gsap.to(strip,  {
        y: -groupHeight,
        duration, 
        ease: 'none',
        repeat: -1, modifiers: {
          y: (value) => {
            const v = parseFloat(value);
            if (!Number.isFinite(v)) return value;
            // 将位移始终限制在 [-groupHeight,  0) 区间, 确保两组内容首尾无缝衔接且不会出现整块空白
            const wrapped = ((v + groupHeight) % groupHeight) - groupHeight;
            return `${wrapped}px`;
          },
        },
      });

      return tween;
    };

    const images = Array.from(strip.querySelectorAll('img'));
    let tween: gsap.core.Tween | undefined;

    const init = () => {
      if (tween) {
        tween.kill();
      }
      tween = setupAnimation();
    };

    if (!images.length) {
      init();
    } else if (images.every((img) => img.complete)) {
      init();
    } else {
      let loadedCount = 0;
      const handleLoad = () => {
        loadedCount += 1;
        if (loadedCount >= images.length) {
          images.forEach((img) => {
            img.removeEventListener('load', handleLoad);
          });
          init();
        }
      };

      images.forEach((img) => {
        img.addEventListener('load', handleLoad);
      });
    }

    return () => {
      if (tween) {
        tween.kill();
      }
      images.forEach((img) => {
        // 清理事件监听, 防止内存泄漏
        img.replaceWith(img.cloneNode(true) as HTMLImageElement);
      });
    };
  }, []);

  return (
    <div
      className="relative w-screen h-dvh min-h-dvh overflow-hidden flex"
      style={{ backgroundColor: '#01417c' }}
    >
      <div
        className="relative flex w-full h-full"
        style={{ zIndex: Z_LAYERS.CONTENT }}
      >
        {/* 左侧 40%:纵向平铺照片并缓慢向上循环滚动 */}
        <div
          className="relative h-full overflow-hidden"
          style={{
            flexBasis: '40%',
            maxWidth: '40%',
            backgroundColor: '#000',
          }}
        >
          <div
            ref={stripRef}
            className="end-photo-strip end-photo-strip-animated"
          >
            {[0, 1].map((repeatIndex) => (
              <div key={repeatIndex} className="end-photo-strip-group">
                {END_IMAGES.map((src, index) => (
                  <div
                    key={`${repeatIndex}-${index}`}
                    className="end-photo-frame"
                  >
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 右侧 60%:上 40% 为 title 图片, 下 60% 为文字区域（带 WeatheredOverlay） */}
        <div
          className="relative h-full"
          style={{ flexBasis: '60%', maxWidth: '60%' }}
        >
          <WeatheredOverlay />
          <div
            className="h-full flex flex-col items-center justify-center"
            style={{ zIndex: Z_LAYERS.CONTENT }}
          >
            <div
              style={{
                flexBasis: '40%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                className="flex flex-col items-center"
                style={{ width: '100%' }}
              >
                <img
                  src={titleImg}
                  alt=""
                  className="block h-auto"
                  style={{ maxWidth: '80%' }}
                />
                <p
                  className="text-center mt-2"
                  style={{
                    color: '#f5f5f5',
                    fontSize: '0.9rem',
                    maxWidth: '80%',
                    marginBottom: '2rem',
                  }}
                >
                  赵老亲笔题字："人间温暖是真情"
                </p>
              </div>
            </div>

            <div
              className="relative"
              style={{
                flexBasis: '60%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SectionText {...END_TEXT_PROPS} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
