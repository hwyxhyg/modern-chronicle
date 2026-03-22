/**
 * 布局视口尺寸（与 offsetWidth/scroll、ScrollTrigger 一致，用于 resize 与滚动距离）。
 */
export function getViewportWidth(): number {
  if (typeof window === 'undefined') return 0;
  return window.innerWidth || document.documentElement.clientWidth || 0;
}

export function getViewportHeight(): number {
  if (typeof window === 'undefined') return 0;
  return window.innerHeight || document.documentElement.clientHeight || 0;
}

/**
 * PC resize、devtools、部分环境下 visualViewport 也会变，一并监听。
 */
export function subscribeViewportResize(cb: () => void): () => void {
  window.addEventListener('resize', cb);
  const vv = window.visualViewport;
  vv?.addEventListener('resize', cb);

  return () => {
    window.removeEventListener('resize', cb);
    vv?.removeEventListener('resize', cb);
  };
}
