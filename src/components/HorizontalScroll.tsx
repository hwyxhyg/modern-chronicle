import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    if (!container || !wrapper) return;

    // 计算总宽度（所有子元素的宽度减去视口宽度）
    const getScrollWidth = () => {
      return wrapper.scrollWidth - window.innerWidth;
    };

    // 创建水平滚动动画
    // 使用 ease: "none" 确保线性动画，这对于 ScrollTrigger 很重要
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
        markers: false, // 设置为 true 可以显示调试标记
      },
    });

    // 窗口大小改变时刷新 ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
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
      className={`relative w-screen h-screen overflow-hidden ${className}`}
    >
      <div
        ref={wrapperRef}
        className="flex h-full will-change-transform"
        style={{ width: 'max-content' }}
      >
        {children}
      </div>
    </div>
  );
};

export default HorizontalScroll;
