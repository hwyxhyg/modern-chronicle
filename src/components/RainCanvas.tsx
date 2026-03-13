import React, { useEffect, useRef } from 'react';

interface RainCanvasProps {
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
}

type Drop = {
  x: number;
  y: number;
  length: number;
  speedX: number;
  speedY: number;
  opacity: number;
  lineWidth: number;
};

const MIN_DROPS = 120;
const MAX_DROPS = 520;

const RainCanvas: React.FC<RainCanvasProps> = ({ active, className, style }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dropsRef = useRef<Drop[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const sizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
  const isActiveRef = useRef(false);
  const isStoppingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (!width || !height) return;

      sizeRef.current = { width, height };

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxRef.current = ctx;

      // 提升整体密度：按宽度估算数量
      const areaFactor = 0.45;
      const estimated = Math.round(width * areaFactor);
      const count = Math.max(MIN_DROPS, Math.min(MAX_DROPS, estimated));

      const drops: Drop[] = [];
      for (let i = 0; i < count; i += 1) {
        // 垂直速度越快，雨滴越长、越亮（类似 geoffb 的深度感）
        const baseSpeedY = 420 + Math.random() * 880;
        const speedY = baseSpeedY * 1.5; // 1.5 倍整体加速
        const baseLength = 22 + (speedY / 1000) * 55; // 更长的雨滴
        const speedX = -speedY * 0.16; // 略微加大斜向
        drops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: baseLength,
          speedX,
          speedY,
          opacity: 0.22 + (speedY / 1000) * 0.45,
          // 全局再加粗一档
          lineWidth: 2.2 + (speedY / 1000) * 1.8,
        });
      }
      dropsRef.current = drops;
    };

    handleResize();

    let resizeObserver: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    // 更新当前可见状态与“正在收尾”的标记
    isActiveRef.current = active;
    if (!active && dropsRef.current.length > 0) {
      isStoppingRef.current = true;
    }
    if (active) {
      isStoppingRef.current = false;
      // 刚开始下雨时，把所有雨滴放到画布上方，营造“从天上开始下”的感觉
      const { height } = sizeRef.current;
      if (height > 0) {
        const drops = dropsRef.current;
        for (let i = 0; i < drops.length; i += 1) {
          drops[i].y = -Math.random() * height;
        }
      }
    }

    const ctx = ctxRef.current;
    if (!ctx) return;

    // 如果当前已经有动画在跑，只需要更新 active/stopping 状态即可
    if (animationFrameRef.current != null) {
      // 如果既不 active 也不在收尾，并且没有雨滴，则可以在后续帧中自动清理
      return;
    }

    let lastTime = performance.now();

    const loop = (time: number) => {
      const frameId = requestAnimationFrame(loop);
      animationFrameRef.current = frameId;

      const { width, height } = sizeRef.current;
      if (!width || !height) return;

      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const drops = dropsRef.current;
      const fallExtra = 40;
      let anyVisible = false;

      for (let i = 0; i < drops.length; i += 1) {
        const drop = drops[i];
        drop.x += drop.speedX * dt;
        drop.y += drop.speedY * dt;

        const outOfBounds =
          drop.y - drop.length > height + fallExtra ||
          drop.x < -fallExtra ||
          drop.x > width + fallExtra;

        if (outOfBounds) {
          if (isActiveRef.current) {
            // 正在下雨：离开视口则重生到上方，形成持续雨幕
            const baseSpeedY = 420 + Math.random() * 880;
            const speedY = baseSpeedY * 1.5;
            const baseLength = 22 + (speedY / 1000) * 55;
            const speedX = -speedY * 0.16;
            drop.y = -Math.random() * height;
            drop.x = Math.random() * width;
            drop.length = baseLength;
            drop.speedX = speedX;
            drop.speedY = speedY;
            drop.opacity = 0.22 + (speedY / 1000) * 0.45;
            drop.lineWidth = 2.2 + (speedY / 1000) * 1.8;
          } else if (isStoppingRef.current) {
            // 正在收尾：雨滴离开后不再重生
            continue;
          } else {
            continue;
          }
        }

        // 判断当前雨滴是否仍在可见范围内
        if (
          drop.y + drop.length >= -fallExtra &&
          drop.y - drop.length <= height + fallExtra &&
          drop.x >= -fallExtra &&
          drop.x <= width + fallExtra
        ) {
          anyVisible = true;
        }

        // 参考 demo 使用偏冷的雨色，整体偏暗一点
        ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`;
        ctx.lineWidth = drop.lineWidth;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.length * 0.3, drop.y + drop.length);
        ctx.stroke();
      }

      // 如果不再 active 且处于收尾阶段，且已经没有可见雨滴，则彻底停止动画并清空
      if (!isActiveRef.current && isStoppingRef.current && !anyVisible) {
        isStoppingRef.current = false;
        if (animationFrameRef.current != null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        ctx.clearRect(0, 0, width, height);
      }
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current != null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [active]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default RainCanvas;

