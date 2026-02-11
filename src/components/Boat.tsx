import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Z_LAYERS } from '../constants/zIndex';
import boatSvg from '../assets/boat.svg?url';

gsap.registerPlugin(ScrollTrigger);

const BOAT_LEFT_STABLE = 40; // vw
const BOAT_EXIT_START_PROGRESS = 0.9; // 滚动进度超过此值时开始右移出
const BOAT_WIDTH_VW = 10;
// 小船垂直位置基于 section 实际高度的百分比：
// - 前 6 个 section：20%
// - 后 2 个 section：15%
const BOAT_BOTTOM_RATIO_SECTION_1_6 = 0.2;
const BOAT_BOTTOM_RATIO_SECTION_7_8 = 0.15;
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
  const verticalTweenRef = useRef<gsap.core.Tween | null>(null);
  const sectionBoundsRef = useRef<{ start: number; end: number }[]>([]);
  const currentSectionIndexRef = useRef(0);
  const currentBottomRatioRef = useRef(BOAT_BOTTOM_RATIO_SECTION_1_6);

  useEffect(() => {
    const boat = boatRef.current;
    const container = containerRef.current;
    const content = contentRef.current;

    if (!boat || !container || !content) return;

    // 仅包含各个 section（不含小船本身）的元素列表
    const sectionElements = Array.from(content.children).filter(
      (el) => el !== boat,
    ) as HTMLElement[];

    if (!sectionElements.length) return;

    const recomputeSectionBounds = () => {
      sectionBoundsRef.current = sectionElements.map((section) => {
        const start = section.offsetLeft;
        const width = section.offsetWidth;
        return { start, end: start + width };
      });
    };

    const findSectionIndexByX = (x: number) => {
      const bounds = sectionBoundsRef.current;
      for (let i = 0; i < bounds.length; i += 1) {
        const { start, end } = bounds[i];
        if (x >= start && x < end) return i;
      }
      return bounds.length ? bounds.length - 1 : 0;
    };

    const getBottomRatioForSection = (index: number) => {
      // 约定：前 6 个 section（索引 0-5）为 20%，后 2 个为 15%
      return index < 6
        ? BOAT_BOTTOM_RATIO_SECTION_1_6
        : BOAT_BOTTOM_RATIO_SECTION_7_8;
    };

    const updateBoatVerticalPosition = (
      sectionIndex: number,
      ratio: number,
      immediate = false,
    ) => {
      const section = sectionElements[sectionIndex];
      if (!section) return;

      const frontend =
        section.querySelector<HTMLElement>('.section-frontend');
      if (!frontend) return;

      const rect = frontend.getBoundingClientRect();
      if (!rect.height) return;

      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;
      if (!viewportHeight) return;

      // 在当前 section 内部，按高度百分比计算锚点位置：
      // ratio = 0 表示贴底，1 表示贴顶
      const anchorY = rect.bottom - rect.height * ratio; // 距离视口顶部的像素
      const bottomPx = viewportHeight - anchorY; // 距离视口底部的像素

      verticalTweenRef.current?.kill();
      verticalTweenRef.current = gsap.to(boat, {
        bottom: bottomPx,
        duration: immediate ? 0 : 0.8,
        ease: 'power2.out',
      });
    };

    // 初始计算各 section 的水平范围
    recomputeSectionBounds();

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

    // 初始位置：从左侧画面外进入，垂直位置基于第一个 section 的高度百分比
    gsap.set(boat, { left: -0.3 * viewportW, bottom: 0 });
    currentSectionIndexRef.current = 0;
    currentBottomRatioRef.current = getBottomRatioForSection(0);
    updateBoatVerticalPosition(
      currentSectionIndexRef.current,
      currentBottomRatioRef.current,
      true,
    );
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
      },
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
        const boatContentX = stablePx + p * sw;
        if (p < BOAT_EXIT_START_PROGRESS) {
          gsap.set(boat, { left: boatContentX });
        } else {
          const t =
            (p - BOAT_EXIT_START_PROGRESS) / (1 - BOAT_EXIT_START_PROGRESS);
          const leftAt09 = stablePx + BOAT_EXIT_START_PROGRESS * sw;
          const leftAt1 = sw + vw + (BOAT_WIDTH_VW / 100) * vw;
          gsap.set(boat, { left: leftAt09 + t * (leftAt1 - leftAt09) });
        }

        // 根据小船当前所处的 section，动态调整垂直高度（前 6 段 20%，后 2 段 15%）
        const sectionIndex = findSectionIndexByX(boatContentX);
        const targetRatio = getBottomRatioForSection(sectionIndex);

        if (targetRatio !== currentBottomRatioRef.current) {
          currentSectionIndexRef.current = sectionIndex;
          currentBottomRatioRef.current = targetRatio;
          updateBoatVerticalPosition(sectionIndex, targetRatio);
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

    const handleResize = () => {
      recomputeSectionBounds();
      const idx = currentSectionIndexRef.current;
      const ratio = currentBottomRatioRef.current;
      updateBoatVerticalPosition(idx, ratio, true);
    };

    window.addEventListener('resize', handleResize);

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      entranceRef.current?.kill();
      entranceRef.current = null;
      autoScrollTweenRef.current?.kill();
      autoScrollTweenRef.current = null;
      scrollTriggerRef.current = null;
      verticalTweenRef.current?.kill();
      verticalTweenRef.current = null;
      sway.kill();
      st.kill();
    };
  }, [containerRef, contentRef]);

  return (
    <div
      ref={boatRef}
      className="pointer-events-none absolute flex items-end justify-center"
      style={{
        bottom: 0,
        left: 0,
        zIndex: Z_LAYERS.BOAT,
      }}
    >
      <img
        src={boatSvg}
        alt=""
        className="h-auto max-h-[35vh] w-[10vw] object-contain object-bottom"
        draggable={false}
      />
    </div>
  );
};

export default Boat;
