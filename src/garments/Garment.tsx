import { useId, type ReactNode } from 'react';

/** Props mọi template nhận vào */
export interface GarmentProps {
  label: string;
  overlay?: ReactNode;
}

interface GarmentShape {
  /** Dáng áo — dùng để tô màu, cắt overlay và vẽ viền */
  body: string;
  /** Bóng đổ dưới áo */
  ground: { cx: number; cy: number; rx: number; ry: number };
  folds?: ReactNode;
  details?: ReactNode;
  seams?: ReactNode;
}

/**
 * Khung chung cho mọi template áo (viewBox 400×460).
 *
 * Màu áo đọc từ CSS variable --shirt (class g-fill), nên đổi màu không cần vẽ lại SVG.
 * Lớp vẽ: bóng nền → màu vải → overlay → nếp vải & đổ bóng → cổ áo → đường may → viền.
 */
export function Garment({ label, overlay, body, ground, folds, details, seams }: GarmentProps & GarmentShape) {
  const uid = 'g' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const ref = (name: string) => `url(#${uid}-${name})`;

  return (
    <svg className="garment" viewBox="0 0 400 460" role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={`${uid}-clip`}>
          <path d={body} />
        </clipPath>
        <linearGradient id={`${uid}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity=".30" />
          <stop offset=".22" stopColor="#000" stopOpacity=".05" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".10" />
          <stop offset=".78" stopColor="#000" stopOpacity=".05" />
          <stop offset="1" stopColor="#000" stopOpacity=".30" />
        </linearGradient>
        <linearGradient id={`${uid}-depth`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".16" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".20" />
        </linearGradient>
        <linearGradient id={`${uid}-gloss`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".32" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={`${uid}-drop`} x="-30%" y="-300%" width="160%" height="700%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      <ellipse className="g-ground" {...ground} filter={ref('drop')} />
      <path className="g-fill" d={body} />
      <g clipPath={ref('clip')}>
        <g className="g-print">{overlay}</g>
        <g filter={ref('soft')} fill="none">{folds}</g>
        <rect x="-20" y="-20" width="440" height="500" fill={ref('side')} />
        <rect x="-20" y="-20" width="440" height="500" fill={ref('depth')} />
        <rect className="g-gloss" x="-140" y="-60" width="120" height="600" fill={ref('gloss')} />
      </g>
      {details}
      <g className="g-seams" fill="none">{seams}</g>
      <path className="g-outline" d={body} />
    </svg>
  );
}
