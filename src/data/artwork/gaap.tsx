import { useId, type SVGProps } from 'react';

/**
 * Logo chữ "GaaP" theo style sticker của logo Zammy Verse:
 * - chữ không chân rất đậm, mặt trắng, lòng chữ đen, mép hơi run như cắt tay;
 * - mỗi chữ xoay / lệch / to nhỏ một chút, cả cụm nghiêng lên bên phải;
 * - viền đen ≈ 11% chiều cao chữ hoa, khối đổ bóng đen ≈ 13% chủ yếu xuống dưới, liền thành một khối;
 * - khoảng cách giữa các mặt chữ chỉ bằng khoảng một lần độ dày viền.
 *
 * Hệ toạ độ riêng: chữ hoa cao 100; cả logo (kể cả viền) nằm trong x -13…376, y 7…154, tâm (181.5, 80.5).
 * Đặt lên áo bằng transform, vd `<GaapLogo transform="translate(200 150) scale(.45) translate(-181.5 -80.5)" />`.
 * Đổi màu: `ink` (viền, bóng, lòng chữ) và `paper` (mặt chữ); `paper="none"` thì mặt chữ trong suốt (khoét lỗ).
 * Bản SVG rời: public/teams/gaap/logo.svg.
 */

const INK = '#000000';
const PAPER = '#FFFFFF';

/** Nét chữ đã đặt vị trí. `hole` là lòng chữ, tô đen đè lên mặt trắng. */
const LETTERS: { transform: string; d: string; hole?: string }[] = [
  {
    // G
    transform: 'translate(0,8) rotate(-8,49.5,55) scale(1.1)',
    d: 'M86.7,30.1C80.5,9.2 66.6,0.1 45.6,0.7C18.7,0.1 0.5,20.4 0.8,49.3C-0.3,80.5 18.5,98.8 46.5,99.9C65.1,100.8 78.0,93.0 90.1,80.5L89.4,43.2H48.4V65.1H63.0V69.1C60.1,75.1 53.7,75.6 47.9,75.6C34.1,75.5 26.8,65.5 28.1,50.1C27.6,35.0 33.9,23.4 46.2,24.0C53.8,23.2 60.1,26.8 61.7,33.6Z',
    hole: 'M32.8,49.4C32.6,36.8 38.6,30.1 46.3,29.3C51.1,29.9 53.9,31.4 55.3,34.0L42.0,38.5V69.6C38.1,67.7 33.5,60.4 33.2,49.6Z',
  },
  {
    // a
    transform: 'translate(104,22) rotate(-3,38,50) scale(1)',
    d: 'M50.7,26.8H74.7V100.3H50.3V94.6C48.0,97.0 41.8,98.9 33.8,99.1C12.9,101.3 -0.7,84.3 -0.9,61.9C0.2,39.1 15.1,25.0 35.0,25.0C42.1,24.7 46.4,25.7 50.3,29.9Z',
    hole: 'M38.0,46.5C30.3,47.0 25.3,52.7 27.0,61.0C26.0,69.7 32.1,78.4 39.1,76.8C46.0,77.2 51.2,71.2 50.5,61.4C49.3,52.2 45.2,44.8 38.7,46.5Z',
  },
  {
    // a
    transform: 'translate(188,26) rotate(5,38,50) scale(1)',
    d: 'M51.6,26.0H75.6V100.6H50.8V93.2C45.8,97.0 42.1,99.0 34.5,101.0C12.8,101.0 0.9,85.3 1.2,62.7C-0.2,39.3 14.6,25.0 33.7,23.3C40.8,25.0 47.2,26.6 51.3,31.6Z',
    hole: 'M37.5,47.3C32.3,46.3 27.0,54.1 25.2,62.4C25.1,71.0 31.1,78.7 39.2,78.0C44.2,77.9 49.1,71.4 50.1,62.2C50.0,53.7 44.6,46.7 36.8,45.5Z',
  },
  {
    // P
    transform: 'translate(272,34) rotate(6,41.34,53) scale(1.06)',
    d: 'M0.1,-0.8H43.8C65.6,-0.5 77.3,13.4 77.8,32.9C78.7,55.8 66.1,69.1 45.5,69.2H29.7V100.3H0.6Z',
    hole: 'M30.0,21.8H40.9C46.1,21.9 49.0,26.9 48.7,34.3C51.2,39.2 46.0,44.2 41.5,44.3H30.3Z',
  },
];

const BODY = LETTERS.map((l, i) => <path key={i} transform={l.transform} d={l.d} />);
const HOLES = LETTERS.map((l, i) => l.hole && <path key={i} transform={l.transform} d={l.hole} />);

export function GaapLogo({
  ink = INK,
  paper = PAPER,
  ...props
}: SVGProps<SVGGElement> & { ink?: string; paper?: string }) {
  const cutId = useId();
  const transparent = paper === 'none';
  return (
    <g {...props}>
      <g transform="rotate(-5,180,50)" strokeLinejoin="round">
        {transparent && (
          // khoét mặt chữ khỏi phần mực, chừa lại lòng chữ
          <mask id={cutId} maskUnits="userSpaceOnUse" x="-100" y="-100" width="600" height="400">
            <rect x="-100" y="-100" width="600" height="400" fill="#FFFFFF" />
            <g fill="#000000">{BODY}</g>
            <g fill="#FFFFFF">{HOLES}</g>
          </mask>
        )}
        <g mask={transparent ? `url(#${cutId})` : undefined}>
          {/* khối đổ bóng */}
          <g transform="translate(4,13)" fill={ink} stroke={ink} strokeWidth="22">{BODY}</g>
          {/* lấp khe giữa các chữ để viền liền một khối */}
          <g transform="translate(2,6.5)" fill={ink} stroke={ink} strokeWidth="30">{BODY}</g>
          {/* viền */}
          <g fill={ink} stroke={ink} strokeWidth="22">{BODY}</g>
        </g>
        {!transparent && (
          <>
            <g fill={paper}>{BODY}</g>
            <g fill={ink}>{HOLES}</g>
          </>
        )}
      </g>
    </g>
  );
}
