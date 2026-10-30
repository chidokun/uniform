import type { SVGProps } from 'react';
import { asset } from '@/lib/asset';

/**
 * Chim cánh cụt vẫy tay, đứng thẳng, không khung.
 *
 * Gốc toạ độ = tâm thắt lưng. Đặt gốc sát gấu áo để nửa dưới bị dáng áo cắt mất, chỉ còn
 * từ thắt lưng trở lên, vd `<PeekingPenguin transform="translate(140 418)" />`.
 * Cao ≈ 82 từ thắt lưng tới đỉnh đầu, tay vẫy chìa sang trái ≈ 41; đổi cỡ bằng thêm `scale(...)` vào transform.
 */

/** public/teams/gaap/penguin-wave.webp — cánh cụt nguyên con vẫy tay, nền trong suốt, 1254×1254, hình thật x 155…1084, y 38…1216 */
const SRC = { x: 0, y: 0, width: 1254, height: 1254 };
/** Tâm thắt lưng trong hệ toạ độ của ảnh (ngay trên bàn chân, giữa thân không tính cánh) */
const WAIST = { x: 636, y: 1000 };
const SCALE = 0.085;

export function PeekingPenguin(props: SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <g transform={`scale(${SCALE}) translate(${-WAIST.x} ${-WAIST.y})`}>
        <image href={asset('/teams/gaap/penguin-wave.webp')} {...SRC} />
      </g>
    </g>
  );
}
