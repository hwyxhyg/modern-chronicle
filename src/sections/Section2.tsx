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
      '1952年，赵大春报名参军。然而在体检中，他被误诊为心脏病，并被判定为\n身体不合格。',
      '新中国成立初期，全国的医疗机构凤毛麟角。1949年，中国有5.42亿人口，而全国\n的卫生机构却仅仅只有3670所。这意味着，平均每接近15万中国人\n才拥有一家卫生机构。真正具备系统诊疗能力、能做严谨复核的医院\n\n更是凤毛麟角。1952年，虽然中国基层的医疗机构正在逐步发展，但专业的医疗保障增长仍然\n相当有限。',
    ],
    style: {
      left: '10vw',
      top: '5% ',
      width: '60vw',
    },
  },
  {
    body: [
      '这一纸轻飘飘却重逾千斤的诊断书，猝然改写了他的人生轨迹。',
      '参军无望，他陷入了漫长的消沉与低谷。而在那段灰暗的日子里，\n命运的捉弄接踵而至，他也与自己的初恋女友——芳芳，\n最终走到了缘分的尽头。',
    ],
    style: {
      left: '120vw',
      top: '18% ',
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
