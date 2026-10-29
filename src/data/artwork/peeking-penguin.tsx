import type { SVGProps } from 'react';
import { asset } from '@/lib/asset';

/**
 * Chim cánh cụt 3D vẫy tay, đứng thẳng, không khung.
 *
 * Gốc toạ độ = tâm thắt lưng. Đặt gốc sát gấu áo để nửa dưới bị dáng áo cắt mất, chỉ còn
 * từ thắt lưng trở lên, vd `<PeekingPenguin transform="translate(140 418)" />`.
 * Cao ≈ 82 từ thắt lưng tới đỉnh đầu, tay vẫy chìa sang trái ≈ 47; đổi cỡ bằng thêm `scale(...)` vào transform.
 */

/** public/teams/gaap/penguin-gaap-colors.svg — cánh cụt nguyên con vẫy tay, tông màu GaaP, viewBox 1163×1352, hình thật x 71…1116, y 83…1300 */
const SRC = { x: 0, y: 0, width: 1163, height: 1352 };
/** Tâm thắt lưng trong hệ toạ độ của ảnh (ngay trên bàn chân, giữa thân không tính cánh) */
const WAIST = { x: 600, y: 1000 };
const SCALE = 0.089;

export function PeekingPenguin(props: SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <g transform={`scale(${SCALE}) translate(${-WAIST.x} ${-WAIST.y})`}>
        <image href={asset('/teams/gaap/penguin-gaap-colors.svg')} {...SRC} />
      </g>
    </g>
  );
}
