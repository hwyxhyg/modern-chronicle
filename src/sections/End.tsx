import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import WeatheredOverlay from '../components/WeatheredOverlay';
import SectionText, { type SectionTextProps } from '../components/SectionText';
import { Z_LAYERS } from '../constants/zIndex';

import img1 from '../assets/end/img1.jpg';
import img2 from '../assets/end/img2.jpg';
import img3 from '../assets/end/img3.jpg';
import img4 from '../assets/end/img4.jpg';
import img5 from '../assets/end/img5.jpg';
import img6 from '../assets/end/img6.jpg';
import titleImg from '../assets/end/title.png';

const END_IMAGES = [img1, img2, img3, img4, img5, img6];

// 文案占位：后续由文案填充 title/body
const END_TEXT_PROPS: SectionTextProps = {
  body: [
    `Zhao Dachun is ninety-two years old now and his life was like that of the "Aguafiel"\nin China, ordinary yet extraordinary.`,
    ` `,
    `A chance encounter led us to his handwritten memoirs - pages that record more than\neighty years of trials and perseverance, mirroring the very arc of China’s modernization. `,
    ` `,
    `At his request, and driven by our own realization that these pages are far more than a\npersonal autobiography, we began the journey of digitizing this precious first-person\nnarrative, an intimate yet vivid record of a nation in transformation. `,
    ` `,
    `His story is never just the story of one individual; it reflects the emotional landscape of\nan entire generation of Chinese people. `,
    ` `,
    `Through this data visualization project, we revisited the path of China’s development over\nthe past eight decades, and presented before you a microcosm of Chinese modernization.`,
  ],
  style: {
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

      // 一轮纵向滚动时长（秒），数值越小越快
      const duration = 20;

      const tween = gsap.to(strip, {
        y: -groupHeight,
        duration,
        ease: 'none',
        repeat: -1,
        modifiers: {
          y: (value) => {
            const v = parseFloat(value);
            if (!Number.isFinite(v)) return value;
            // 将位移始终限制在 [-groupHeight, 0) 区间，确保两组内容首尾无缝衔接且不会出现整块空白
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
        // 清理事件监听，防止内存泄漏
        img.replaceWith(img.cloneNode(true) as HTMLImageElement);
      });
    };
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden flex"
      style={{ backgroundColor: '#01417c' }}
    >
      <div
        className="relative flex w-full h-full"
        style={{ zIndex: Z_LAYERS.CONTENT }}
      >
        {/* 左侧 40%：纵向平铺照片并缓慢向上循环滚动 */}
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

        {/* 右侧 60%：上 40% 为 title 图片，下 60% 为文字区域（带 WeatheredOverlay） */}
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
              <img
                src={titleImg}
                alt=""
                className="block h-auto"
                style={{ maxWidth: '80%' }}
              />
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
