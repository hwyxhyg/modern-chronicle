import weatheredLayer from '../assets/weathered-layer.png';
import { Z_LAYERS } from '../constants/zIndex';

/** 与滚动内容同宽，repeat-x，随内容滚动的肌理层 */
export default function WeatheredOverlay() {
  return (
    <div
      aria-hidden
      className="absolute pointer-events-none section-frontend"
      style={{
        width: '100%',
        height: 'var(--section-height, 100%)',
        zIndex: Z_LAYERS.WEATHERED,
        backgroundImage: `url(${weatheredLayer})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto 100%',
      }}
    />
  );
}
