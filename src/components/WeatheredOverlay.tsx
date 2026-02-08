import weatheredLayer from '../assets/weathered-layer.png';
import { Z_LAYERS } from '../constants/zIndex';

/** 与滚动内容同宽，repeat-x，随内容滚动的肌理层 */
export default function WeatheredOverlay() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 min-h-full pointer-events-none"
      style={{
        zIndex: Z_LAYERS.WEATHERED,
        backgroundImage: `url(${weatheredLayer})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto 100%',
      }}
    />
  );
}
