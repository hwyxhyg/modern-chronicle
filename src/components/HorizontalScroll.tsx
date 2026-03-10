import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Boat from './Boat';
import CottonOverlay from './CottonOverlay';
import WeatheredOverlay from './WeatheredOverlay';

gsap.registerPlugin(ScrollTrigger);

const BOAT_LEFT_STABLE = 40; // vw
// 小船垂直位置基于 section 实际高度的百分比：
// - 前 6 个 section：20%
// - 后 2 个 section：15%
const BOAT_BOTTOM_RATIO_SECTION_1_6 = 0.2;
const BOAT_BOTTOM_RATIO_SECTION_7_8 = 0.15;
const AUTO_SCROLL_DURATION = 120;

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  /** 仅包含 sections 的容器，用其宽度计算可滚动距离，避免黑屏 */
  const contentRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement | null>(null);

  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const autoScrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const verticalTweenRef = useRef<gsap.core.Tween | null>(null);
   // 控制小船在进入横向区域时的“弹出”动画，仅触发一次，返回顶部再进会重新触发
  const boatAppearedRef = useRef(false);
  const sectionElementsRef = useRef<HTMLElement[]>([]);
  const sectionBoundsRef = useRef<{ start: number; end: number }[]>([]);
  const currentSectionIndexRef = useRef(0);
  const currentBottomRatioRef = useRef(BOAT_BOTTOM_RATIO_SECTION_1_6);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!container || !wrapper || !content) return;

    const updateSectionHeight = () => {
      const firstFrontend =
        content.querySelector<HTMLElement>('.section-frontend');
      if (!firstFrontend) return;
      const rect = firstFrontend.getBoundingClientRect();
      if (rect.height > 0) {
        wrapper.style.setProperty('--section-height', `${rect.height}px`);
      }
    };

    /**
     * 根据前景/背景（以及 overlay）真实渲染高度与视口高度的关系，
     * 决定是垂直居中还是贴底对齐：
     * - 未超过视口：移除 .section-frontend--bottom，保持居中
     * - 超过视口：添加 .section-frontend--bottom，贴底，仅裁剪上方
     */
    const updateFrontendAlign = () => {
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;
      if (!viewportHeight) return;

      const frontends =
        content.querySelectorAll<HTMLElement>('.section-frontend');

      frontends.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (!rect.height) return;

        if (rect.height > viewportHeight) {
          el.classList.add('section-frontend--bottom');
        } else {
          el.classList.remove('section-frontend--bottom');
        }
      });
    };

    // 可滚动距离 = 内容总宽 - 视口宽（只用 content 的宽度，不包含 overlay）
    const getScrollWidth = () => {
      const contentWidth = content.offsetWidth;
      const viewportWidth = window.innerWidth;
      return Math.max(0, contentWidth - viewportWidth);
    };

    const recomputeSectionBounds = () => {
      const children = Array.from(content.children) as HTMLElement[];
      sectionElementsRef.current = children;
      sectionBoundsRef.current = children.map((section) => {
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

    const getBottomRatioForSection = (index: number) =>
      index < 6 ? BOAT_BOTTOM_RATIO_SECTION_1_6 : BOAT_BOTTOM_RATIO_SECTION_7_8;

    const updateBoatVerticalPosition = (
      sectionIndex: number,
      ratio: number,
      immediate = false,
    ) => {
      const boat = boatRef.current;
      if (!boat) return;

      const section = sectionElementsRef.current[sectionIndex];
      if (!section) return;

      const frontend = section.querySelector<HTMLElement>('.section-frontend');
      if (!frontend) return;

      const rect = frontend.getBoundingClientRect();
      if (!rect.height) return;

      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;
      if (!viewportHeight) return;

      const anchorY = rect.bottom - rect.height * ratio; // 距离视口顶部的像素
      const bottomPx = viewportHeight - anchorY; // 距离视口底部的像素

      verticalTweenRef.current?.kill();
      verticalTweenRef.current = gsap.to(boat, {
        bottom: bottomPx,
        duration: immediate ? 0 : 0.8,
        ease: 'power2.out',
      });
    };

    // 创建水平滚动动画（仅作用于 wrapper，船保持视口内水平固定）
    const horizontalScrollTween = gsap.to(wrapper, {
      x: () => -getScrollWidth(),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${getScrollWidth()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        markers: false,
      },
    });

    // 初始化 section 边界（不再在此时给小船做垂直定位）
    recomputeSectionBounds();

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

    const boatScrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: () => `+=${getScrollWidth()}`,
      onUpdate: (self) => {
        const boatEl = boatRef.current;
        if (!boatEl) return;

        const p = self.progress;
        if (p <= 0) {
          gsap.set(boatEl, { opacity: 0, scale: 0.8 });
          boatAppearedRef.current = false;
          return;
        }
        if (!boatAppearedRef.current) {
          boatAppearedRef.current = true;
          gsap.fromTo(
            boatEl,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.1,
              ease: 'back.out(1.7)',
            },
          );
        }

        const sw = getScrollWidth();
        const vw = window.innerWidth;
        const stablePx = (BOAT_LEFT_STABLE / 100) * vw;
        const boatContentX = stablePx + p * sw;

        // 根据小船当前所处的内容横向位置，计算 section，并调整垂直高度（前 6 段 20%，后 2 段 15%）
        const sectionIndex = findSectionIndexByX(boatContentX);
        const targetRatio = getBottomRatioForSection(sectionIndex);

        if (!verticalTweenRef.current) {
          // 首次进入横向区域时立即对齐一次高度
          currentSectionIndexRef.current = sectionIndex;
          currentBottomRatioRef.current = targetRatio;
          updateBoatVerticalPosition(sectionIndex, targetRatio, true);
        } else if (targetRatio !== currentBottomRatioRef.current) {
          currentSectionIndexRef.current = sectionIndex;
          currentBottomRatioRef.current = targetRatio;
          updateBoatVerticalPosition(sectionIndex, targetRatio, false);
        }
      },
    });
    scrollTriggerRef.current = boatScrollTrigger;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 's' && e.key !== 'S') return;
      e.preventDefault();
      const tween = autoScrollTweenRef.current;
      if (tween && tween.isActive()) {
        if (tween.paused()) tween.play();
        else tween.pause();
        return;
      }
      startAutoScroll();
    };

    // 窗口大小改变时刷新 ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
      updateSectionHeight();
      updateFrontendAlign();
      recomputeSectionBounds();
      const idx = currentSectionIndexRef.current;
      const ratio = currentBottomRatioRef.current;
      const st = scrollTriggerRef.current;
      if (st && st.progress > 0) {
        updateBoatVerticalPosition(idx, ratio, true);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    // 首帧与资源加载后用实际布局刷新
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      updateSectionHeight();
      updateFrontendAlign();
      recomputeSectionBounds();
    });
    const timeoutId = window.setTimeout(() => {
      ScrollTrigger.refresh();
      updateSectionHeight();
      updateFrontendAlign();
      recomputeSectionBounds();
    }, 300);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(refreshId);
      window.clearTimeout(timeoutId);
      autoScrollTweenRef.current?.kill();
      autoScrollTweenRef.current = null;
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
      verticalTweenRef.current?.kill();
      verticalTweenRef.current = null;
      horizontalScrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-screen h-screen overflow-hidden flex items-center justify-center ${className}`}
    >
      <div
        className="relative w-full min-w-0 overflow-hidden shrink-0"
        style={{ height: '100vh' }}
      >
        <div
          ref={wrapperRef}
          className="relative flex h-full will-change-transform"
          style={{ width: 'max-content' }}
        >
          {/* 仅内容区参与宽度计算，ref 用于精确计算可滚动距离；Boat 放在 container 层，避免参与水平 transform */}
          <div
            ref={contentRef}
            className="flex h-full shrink-0"
            style={{ width: 'max-content' }}
          >
            {children}
          </div>
          <CottonOverlay />
          <WeatheredOverlay />
        </div>
      </div>
      <Boat
        className="fixed left-[40vw] -translate-x-1/2 bottom-0 opacity-0"
        onMount={(el: HTMLDivElement | null) => {
          boatRef.current = el;
        }}
      />
    </div>
  );
};

export default HorizontalScroll;
