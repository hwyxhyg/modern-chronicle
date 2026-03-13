import backgroundImage from '../assets/section4/background.png';
import frontendImage from '../assets/section4/frontend.png';
import { getSectionZLayers } from '../constants/zIndex';

const Z = getSectionZLayers();
import SectionText from '../components/SectionText';
import type { SectionTextProps } from '../components/SectionText';

const SECTION4_WIDTH = '300vw';

const SECTION4_TEXTS: SectionTextProps[] = [
  {
    title: '1957-1961',
    body: 'Natural disasters and human calamities followed one\nafter another; separations by life and death were\nunpredictable. During this dark period, a large number\nof Chinese people died from starvation.',
    style: {
      left: '8vw',
      top: '10% ',
    },
  },
  {
    title: '1957-1961',
    style: {
      left: '110vw',
      top: '10% ',
    },
  },
  {
    body: `In the late 1950s, amid political struggles within the Party, the errors of the\n"[[Great Leap Forward|An economic campaign (1958–1960) aimed at rapid industrialization and agricultural collectivization. Unrealistic targets and exaggerated reporting led to severe economic difficulties.]]" and the "[[Anti-Rightist Deviation|A political campaign (1959) against "right opportunism" that interrupted efforts to correct existing leftist errors in economic terms, allowing those mistakes to persist for a longer period.]]" campaign laid the\ngroundwork for exaggerated agricultural production claims. From 1959 to 1961,\n[[the Three Years of Natural Disasters|Refers to a period of hardship experienced by China from 1959 to 1961.During this time, the country was affected by consecutive natural disasters such as droughts and floods, and suffered from severe food shortages and economic difficulties.]] combined with the Soviet government's\nperfidious tearing up of contracts, caused severe difficulties in China's national\neconomy, inflicting major losses on thecountry and its people.`,
    style: {
      left: '140vw',
      top: '10% ',
    },
  },
  {
    body: `Hand-writing letter by Zhao Dachun`,
    style: {
      left: '140vw',
      bottom: '25% ',
    },
  },
  {
    body: [
      `During this period, Zhao Dachun lost both of his parents. In his memoir, written in the third person, \nhe recalls:“At the train station, he repeatedly urged his mother that if things became difficult after\nreturning home, she must come again.`,
      `But just over a month later, the bad news arrived—his father had passed away. When he saw the grave,\nhe broke down in tears, unable to understand why it had happened so quickly…He had thought that with\naccess to food at the [[communal canteen|Refers to the collective dining system established in rural People's Communes in the late 1950s. Food was prepared and distributed through public mess halls, reflecting the highly collectivized mode of production and daily life at the time.]], and with the supplies he had brought this time, they would be\nfine for a while.”`,
      `Yet in the face of such calamity, there was nothing he could do.`,
    ],
    style: {
      left: '240vw',
      top: '10% ',
    },
  },
];

export default function Section4() {
  return (
    <div
      className="relative shrink-0 h-full"
      style={{ width: SECTION4_WIDTH, maxWidth: SECTION4_WIDTH }}
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
            {SECTION4_TEXTS.map((item, i) => (
              <SectionText key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
