import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import backgroundImage from '../assets/start/background.png';
import { getSectionZLayers } from '../constants/zIndex';
import { Z_LAYERS } from '../constants/zIndex';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';
import Boat from '../components/Boat';
import {
  resolveStartAssetUrl,
  startBirdsConfig,
} from './startBirdsConfig';

const Z = getSectionZLayers();
/** 介于 BACKGROUND 与 BOAT 之间，与背景同坐标系 */
const START_BIRDS_Z = 15;

const START_WIDTH = '100vw';

const START_TEXTS: SectionTextProps[] = [
  {
    justify: false,
    title:
      '一叶小舟入大潮\n一个普通人与中国现代化七十年',
    style: {
      left: '5vw',
      top: '10% ',
    },
  },
  {
    body: [
      '过去七十余载，中国历经了从积贫积弱到世界强国的漫长征程。世界满怀好奇地\n注视着这片土地，却往往对这场漫长、激荡的现代化远航知之甚少———这不仅是一段\n由政策和数据编织的宏大叙事，更是由无数普通人的人生所铸就的真实历史。',
      ' ',
      '机缘巧合之下，我们读到了这样一位老人家的自传文章：赵大春，一个生于1934年的\n平凡中国人。在协助将其记忆数字化的过程中，我们愈发意识到个体与国家的命运\n正如江河上的一叶小舟——同呼吸，共起落，共同被时间的洪流推向前方。他的故事，\n是一个平凡生命与国家命运默默共鸣的静谧写照。',
    ],
    style: {
      left: '5vw',
      bottom: '15% ',
    },
  },
];

export default function Start() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { width: designW, height: designH, imgs: birdImgs } = startBirdsConfig;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const birds = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll('.start-bird'),
      );
      if (birds.length === 0) return;

      gsap.set(birds, {
        opacity: 0,
        y: 20,
        scale: 0.94,
        transformOrigin: '50% 50%',
      });

      const enterDur = 1.15;
      const staggerGap = 0.26;
      const breathScale = 1.045;
      const breathInOutDur = 1.35;
      const breathPulses = 2;

      const tl = gsap.timeline({ paused: true });
      birds.forEach((bird, i) => {
        const one = gsap.timeline();
        one
          .fromTo(
            bird,
            { opacity: 0, y: 22, scale: 0.93 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: enterDur,
              ease: 'power3.out',
            },
          )
          .to(bird, {
            scale: breathScale,
            duration: breathInOutDur,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: breathPulses,
          });
        tl.add(one, i * staggerGap);
      });

      const resetBirds = () => {
        tl.pause(0);
        gsap.set(birds, {
          opacity: 0,
          y: 20,
          scale: 0.94,
        });
      };

      const playWhenVisible = (visible: boolean) => {
        if (visible) {
          tl.restart();
        } else {
          resetBirds();
        }
      };

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          playWhenVisible(entry.isIntersecting);
        },
        { root: null, threshold: 0.08 },
      );
      io.observe(root);

      return () => {
        io.disconnect();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative shrink-0 h-full"
      style={{ width: START_WIDTH, maxWidth: START_WIDTH }}
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
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
            style={{ zIndex: START_BIRDS_Z }}
            aria-hidden
          >
            {birdImgs.map((bird, i) => (
              <div
                key={`${bird.url}-${i}`}
                className="start-bird absolute"
                style={{
                  left: `${(bird.x / designW) * 100}%`,
                  top: `${(bird.y / designH) * 100}%`,
                  width: `${(bird.width / designW) * 100}%`,
                  height: `${(bird.height / designH) * 100}%`,
                }}
              >
                <img
                  src={resolveStartAssetUrl(bird.url)}
                  alt=""
                  className="max-w-none w-full h-full object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
          <Boat
            className="absolute pointer-events-none"
            style={{
              left: '5vw',
              bottom: '45%',
              zIndex: Z_LAYERS.BOAT,
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: Z.CONTENT }}
          >
            {START_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
