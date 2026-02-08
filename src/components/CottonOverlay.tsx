import cottonLayer from '../assets/cotton-layer.png';
import { Z_LAYERS } from '../constants/zIndex';

/** 全局背景纹理层：与滚动内容同宽，repeat-x，随内容滚动 */
export default function CottonOverlay() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 min-h-full pointer-events-none"
      style={{
        zIndex: Z_LAYERS.COTTON,
        backgroundImage: `url(${cottonLayer})`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto 100%',
        opacity: 0.5,
      }}
    />
  );
}
