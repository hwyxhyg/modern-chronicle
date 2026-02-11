/**
 * 首屏加载动画，在静态资源预加载期间展示。
 */
export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black"
      aria-hidden
      role="presentation"
    >
      <div className="flex flex-col items-center gap-10">
        <p
          className="font-serif text-[clamp(1.25rem,3vw,1.75rem)] tracking-[0.4em] text-white/90"
          style={{ fontFamily: "'Huiwen-mincho', serif" }}
        >
          Loading
        </p>
        <div className="h-px w-40 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full w-1/3 rounded-full bg-white/70"
            style={{
              animation: 'loading-bar 1.6s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
