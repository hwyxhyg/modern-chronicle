import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Z_LAYERS } from '../constants/zIndex';
import boatSvg from '../assets/boat.svg?url';

interface BoatProps {
  style?: React.CSSProperties;
  className?: string;
  /**
   * 可选：用于将实际 DOM 节点暴露给外层容器（如 HorizontalScroll）。
   */
  onMount?: (el: HTMLDivElement | null) => void;
}

const Boat: React.FC<BoatProps> = ({ style, className, onMount }) => {
  const boatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boat = boatRef.current;
    if (!boat) return;

    const rafId = window.requestAnimationFrame(() => {
      if (onMount) {
        onMount(boatRef.current);
      }
    });

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

    return () => {
      sway.kill();
      window.cancelAnimationFrame(rafId);
    };
  }, [onMount]);

  return (
    <div
      ref={(el) => {
        boatRef.current = el;
      }}
      className={`pointer-events-none flex items-end justify-center ${
        className ?? ''
      }`}
      style={{
        zIndex: Z_LAYERS.BOAT,
        ...style,
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

