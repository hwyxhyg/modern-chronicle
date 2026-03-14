import { useEffect, useRef, useState } from 'react';
import backgroundImage from '../assets/section2/background.png';
import frontendImage from '../assets/section2/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';
import RainCanvas from '../components/RainCanvas';

const Z = getSectionZLayers();

const SECTION2_WIDTH = '200vw';

const SECTION2_TEXTS: SectionTextProps[] = [
  {
    title: '1949-1957',
    body: [
      'In 1952, Zhao Dachun signed up to join the army. During the selection medical examination,\nhe was misdiagnosed with heart disease and declared physically unfit. ',
      'Since the founding of the People’s Republic of China, the number of medical institutions in\nChina has been extremely limited. Moreover, although the number has been increasing, most\nof them are small clinics, which also contributes to a generally low standard of medical care.',
    ],
    style: {
      left: '10vw',
      top: '10% ',
      width: '50vw',
    },
  },
  {
    body: [
      'A single sheet of diagnosis paper suddenly altered the course of his life.',
      'His dream of joining the army was shattered. He fell into prolonged depression and, in\nthis despondency, parted ways with his first love, Fang Fang.',
    ],
    style: {
      left: '120vw',
      top: '15% ',
    },
  },
];

function useSectionInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(
            entry.isIntersecting && entry.intersectionRatio >= threshold,
          );
        });
      },
      {
        root: null,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, inView };
}

export default function Section2() {
  const { ref, inView } = useSectionInView(0.4);

  return (
    <div
      ref={ref}
      className="relative shrink-0 h-full"
      style={{ width: SECTION2_WIDTH, maxWidth: SECTION2_WIDTH }}
    >
      <div className="relative w-full h-full flex items-center">
        <div className="relative w-full">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="block w-full h-auto pointer-events-none invisible"
          />
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="absolute pointer-events-none section-frontend"
            style={{
              width: '100%',
              height: 'auto',
              zIndex: Z.BACKGROUND,
            }}
          />
          <RainCanvas
            active={inView}
            className="absolute inset-0 pointer-events-none"
          />
          <img
            src={frontendImage}
            alt=""
            role="presentation"
            aria-hidden
            className="absolute pointer-events-none section-frontend"
            style={{
              width: '100%',
              height: 'auto',
              zIndex: Z.FRONTEND,
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: Z.CONTENT }}
          >
            {SECTION2_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
