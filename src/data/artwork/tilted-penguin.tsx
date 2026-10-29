import type { SVGProps } from 'react';
import { asset } from '@/lib/asset';

/**
 * Chim cánh cụt 3D nghiêng 15° theo chiều kim đồng hồ, không khung.
 *
 * Gốc toạ độ = tâm thắt lưng. Đặt gốc sát gấu áo để nửa dưới bị dáng áo cắt mất, chỉ còn
 * từ thắt lưng trở lên, vd `<TiltedPenguin transform="translate(140 418)" />`.
 * Cao ≈ 98 từ thắt lưng tới đỉnh đầu; đổi cỡ bằng thêm `scale(...)` vào transform.
 */

/** public/teams/gaap/penguin-3d.svg — trace từ ảnh render 1326×1539, viewBox "1 0 1323 1538" */
const SRC = { x: 1, y: 0, width: 1323, height: 1538 };
/** Tâm thắt lưng trong hệ toạ độ của ảnh */
const WAIST = { x: 662, y: 1150 };
const SCALE = 0.085;
const TILT = 15;

export function TiltedPenguin(props: SVGProps<SVGGElement>) {
  return (
    <g {...props}>
      <g transform={`rotate(${TILT}) scale(${SCALE}) translate(${-WAIST.x} ${-WAIST.y})`}>
        <image href={asset('/teams/gaap/penguin-3d.svg')} {...SRC} />
      </g>
    </g>
  );
}
