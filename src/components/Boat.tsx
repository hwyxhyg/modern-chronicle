import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Z_LAYERS } from '../constants/zIndex';
import boatSvg from '../assets/boat.svg?url';

gsap.registerPlugin(ScrollTrigger);

const BOAT_LEFT_STABLE = 40; // vw
const BOAT_EXIT_START_PROGRESS = 0.9; // 滚动进度超过此值时开始右移出
const BOAT_WIDTH_PX = 240;

interface BoatProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const Boat: React.FC<BoatProps> = ({ containerRef, contentRef }) => {
  const boatRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);
  const entranceRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const boat = boatRef.current;
    const container = containerRef.current;
    const content = contentRef.current;

    if (!boat || !container || !content) return;

    const getScrollWidth = () => {
      const contentWidth = content.offsetWidth;
      const viewportWidth = window.innerWidth;
      return Math.max(0, contentWidth - viewportWidth);
    };

    // 小船在 contentRef 内用 absolute，通过 left = 视口目标(40vw) + 已滚动距离 补偿父级 translateX，从而在视口中保持不动
    const viewportW = window.innerWidth;
    const stableLeftPx = (BOAT_LEFT_STABLE / 100) * viewportW;

    gsap.set(boat, { left: -0.3 * viewportW, bottom: '25vh' }); // 初始在左侧外

    // 入场：从左到 40vw（即 stableLeftPx），只播一次；可被用户滚动中断
    const entrance = gsap.to(boat, {
      left: stableLeftPx,
      duration: 2.2,
      ease: 'power2.out',
      onComplete: () => {
        hasEnteredRef.current = true;
      },
    });
    entranceRef.current = entrance;

    // 晃晃悠悠：循环摇摆，从挂载就开始（绕底部中心左右 ±3°、上下 ±4px）
    const sway = gsap.fromTo(
      boat,
      { rotation: -3, y: -4, transformOrigin: '50% 100%' },
      {
        rotation: 3,
        y: 4,
        duration: 1.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }
    );

    // 与横向滚动同步：用户滚动可中断入场，并立即由滚动驱动位置，保持运动连续
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${getScrollWidth()}`,
      onUpdate: (self) => {
        // 用户发生滚动时中断入场，交由滚动驱动
        if (!hasEnteredRef.current && self.direction !== 0) {
          entranceRef.current?.kill();
          entranceRef.current = null;
          hasEnteredRef.current = true;
        }
        if (!hasEnteredRef.current) return;

        const p = self.progress;
        const sw = getScrollWidth();
        const vw = window.innerWidth;
        const stablePx = (BOAT_LEFT_STABLE / 100) * vw;
        if (p < BOAT_EXIT_START_PROGRESS) {
          gsap.set(boat, { left: stablePx + p * sw });
        } else {
          const t = (p - BOAT_EXIT_START_PROGRESS) / (1 - BOAT_EXIT_START_PROGRESS);
          const leftAt09 = stablePx + BOAT_EXIT_START_PROGRESS * sw;
          const leftAt1 = sw + vw + BOAT_WIDTH_PX;
          gsap.set(boat, { left: leftAt09 + t * (leftAt1 - leftAt09) });
        }
      },
    });

    return () => {
      entranceRef.current?.kill();
      entranceRef.current = null;
      sway.kill();
      st.kill();
    };
  }, [containerRef, contentRef]);

  return (
    <div
      ref={boatRef}
      className="pointer-events-none absolute flex items-end justify-center"
      style={{
        bottom: '25vh',
        left: 0,
        zIndex: Z_LAYERS.BOAT,
      }}
    >
      <img
        src={boatSvg}
        alt=""
        className="h-auto max-h-[35vh] w-[240px] object-contain object-bottom"
        draggable={false}
      />
    </div>
  );
};

export default Boat;
