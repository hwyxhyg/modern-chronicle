import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HorizontalScroll from './components/HorizontalScroll';
import LoadingScreen from './components/LoadingScreen';
import Start from './sections/start';
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import Section5 from './sections/Section5';
import Section6 from './sections/Section6';
import Section7 from './sections/Section7';
import Section8 from './sections/Section8';
import End from './sections/End';
import { preloadImages, preloadUrls } from './preloadAssets';
import {
  getViewportHeight,
  subscribeViewportResize,
} from './utils/viewport';

const MIN_LOADING_MS = 1200;

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [ready, setReady] = useState(false);
  const startRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      preloadImages(preloadUrls),
      new Promise((r) => setTimeout(r, MIN_LOADING_MS)),
    ]).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const startEl = startRef.current;
    if (!startEl) return;

    if (!getViewportHeight()) return;

    const tween = gsap.fromTo(
      startEl,
      { y: 0, opacity: 1 },
      {
        y: () => -getViewportHeight(),
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: startEl,
          start: 'top top',
          end: () => `+=${getViewportHeight()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      },
    );

    let rafId = 0;
    const handleViewportChange = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        ScrollTrigger.refresh();
      });
    };

    const unsubscribe = subscribeViewportResize(handleViewportChange);

    return () => {
      unsubscribe();
      if (rafId) cancelAnimationFrame(rafId);
      tween.kill();
    };
  }, []);

  if (!ready) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-dvh bg-black overflow-x-hidden">
      <div
        ref={startRef}
        className="w-screen h-dvh min-h-dvh flex items-center justify-center overflow-hidden"
      >
        <Start />
      </div>
      <HorizontalScroll>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
      </HorizontalScroll>
      <End />
    </div>
  );
}

export default App;
