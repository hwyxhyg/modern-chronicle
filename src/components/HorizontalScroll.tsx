import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Boat from './Boat';
import CottonOverlay from './CottonOverlay';
import WeatheredOverlay from './WeatheredOverlay';

gsap.registerPlugin(ScrollTrigger);

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

    // 创建水平滚动动画
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

    // 窗口大小改变时刷新 ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
      updateSectionHeight();
      updateFrontendAlign();
    };

    window.addEventListener('resize', handleResize);

    // 首帧与资源加载后用实际布局刷新，避免初始计算不准导致多滚出黑屏
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      updateSectionHeight();
      updateFrontendAlign();
    });
    const timeoutId = window.setTimeout(() => {
      ScrollTrigger.refresh();
      updateSectionHeight();
      updateFrontendAlign();
    }, 300);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(refreshId);
      window.clearTimeout(timeoutId);
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
          {/* 仅内容区参与宽度计算，ref 用于精确计算可滚动距离；Boat 放此处与 section 各层同叠层上下文，保证 背景 < cotton < 小船 < 前景/内容 < weathered */}
          <div
            ref={contentRef}
            className="flex h-full shrink-0"
            style={{ width: 'max-content' }}
          >
            {children}
            <Boat containerRef={containerRef} contentRef={contentRef} />
          </div>
          <CottonOverlay />
          <WeatheredOverlay />
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
