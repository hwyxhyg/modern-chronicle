import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Z_LAYERS } from '../constants/zIndex';
import boatSvg from '../assets/boat.svg?url';

gsap.registerPlugin(ScrollTrigger);

const BOAT_LEFT_STABLE = 40; // vw
const BOAT_EXIT_START_PROGRESS = 0.9; // 滚动进度超过此值时开始右移出
const BOAT_WIDTH_PX = 200;
const AUTO_SCROLL_DURATION = 120;

interface BoatProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const Boat: React.FC<BoatProps> = ({ containerRef, contentRef }) => {
  const boatRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);
  const entranceRef = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const autoScrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const shouldAutoScrollWhenEntranceDoneRef = useRef(false);

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

    const viewportW = window.innerWidth;
    const stableLeftPx = (BOAT_LEFT_STABLE / 100) * viewportW;

    const startAutoScroll = () => {
      const st = scrollTriggerRef.current;
      if (!st) return;
      autoScrollTweenRef.current?.kill();
      const startScroll = st.start;
      const endScroll = st.end;
      window.scrollTo({ top: startScroll, behavior: 'auto' });
      const proxy = { y: startScroll };
      const tween = gsap.to(proxy, {
        y: endScroll,
        duration: AUTO_SCROLL_DURATION,
        ease: 'none',
        onUpdate: () => {
          window.scrollTo({ top: proxy.y, behavior: 'auto' });
        },
      });
      autoScrollTweenRef.current = tween;
    };

    const createEntrance = () => {
      entranceRef.current?.kill();
      gsap.set(boat, { left: -0.3 * viewportW });
      const entrance = gsap.to(boat, {
        left: stableLeftPx,
        duration: 2.2,
        ease: 'power2.out',
        onComplete: () => {
          hasEnteredRef.current = true;
          if (shouldAutoScrollWhenEntranceDoneRef.current) {
            shouldAutoScrollWhenEntranceDoneRef.current = false;
            startAutoScroll();
          }
        },
      });
      entranceRef.current = entrance;
    };

    gsap.set(boat, { left: -0.3 * viewportW, bottom: '25vh' });
    createEntrance();

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

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${getScrollWidth()}`,
      onUpdate: (self) => {
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
          const t =
            (p - BOAT_EXIT_START_PROGRESS) / (1 - BOAT_EXIT_START_PROGRESS);
          const leftAt09 = stablePx + BOAT_EXIT_START_PROGRESS * sw;
          const leftAt1 = sw + vw + BOAT_WIDTH_PX;
          gsap.set(boat, { left: leftAt09 + t * (leftAt1 - leftAt09) });
        }
      },
    });
    scrollTriggerRef.current = st;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 's' && e.key !== 'S') return;
      e.preventDefault();
      const tween = autoScrollTweenRef.current;
      if (tween && tween.isActive()) {
        if (tween.paused()) tween.play();
        else tween.pause();
        return;
      }
      shouldAutoScrollWhenEntranceDoneRef.current = true;
      if (hasEnteredRef.current) {
        shouldAutoScrollWhenEntranceDoneRef.current = false;
        startAutoScroll();
      } else if (!entranceRef.current) {
        createEntrance();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      entranceRef.current?.kill();
      entranceRef.current = null;
      autoScrollTweenRef.current?.kill();
      autoScrollTweenRef.current = null;
      scrollTriggerRef.current = null;
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
