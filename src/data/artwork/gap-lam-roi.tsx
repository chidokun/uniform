import { useId, type SVGProps } from 'react';

/**
 * Logo chữ "GẤP / LẮM / RỒI!!!" — mỗi chữ một dòng, theo style sticker của logo Zammy Verse / GaaP:
 * - nét chữ lấy từ font Kanit Black (Cadson Demak, SIL OFL 1.1) — chữ không chân rất đậm;
 * - mỗi chữ cái xoay ngả nghiêng ±5…16°, nhấp nhô, to nhỏ khác nhau như cắt tay (giống Zammy Verse), cả cụm nghiêng lên bên phải;
 * - viền đen ≈ 11% chiều cao chữ hoa, khối đổ bóng ≈ 13% chủ yếu xuống dưới, liền thành một khối.
 *
 * Hệ toạ độ riêng: chữ hoa cao 100; cả logo (kể cả viền) nằm trong x -215…261, y -19…608, tâm (23, 294.5).
 * Đặt lên áo bằng transform, vd `<GapLamRoiLogo transform="translate(200 200) scale(.4) translate(-23 -294.5)" />`.
 * Đổi màu: `ink` (viền, bóng) và `paper` (mặt chữ); `paper="none"` thì mặt chữ trong suốt (khoét lỗ).
 */

const INK = '#000000';
const PAPER = '#FFFFFF';

/** Chữ cái đã đặt vị trí */
const LETTERS: { transform: string; d: string }[] = [
  {
    // G
    transform: 'translate(-203.5,190.8) scale(1.2) rotate(-12,51.5,-50.0) translate(51.5,-50.0) scale(1.12) translate(-51.5,50.0)',
    d: 'M60.6 1.6Q32.3 1.6 17.3 -11.5Q2.3 -24.5 2.3 -50Q2.3 -75.5 18 -88.5Q33.7 -101.6 63.2 -101.6Q72.8 -101.6 80.5 -100.5Q88.2 -99.5 95.3 -97V-65.1Q88.2 -67.9 80.8 -68.9Q73.4 -69.9 65.7 -69.9Q54.8 -69.9 47.7 -65.6Q40.7 -61.3 40.7 -50Q40.7 -38.7 45.7 -34.4Q50.8 -30.1 60.2 -30.1Q65.2 -30.1 69.6 -31.2V-37.3H53V-59.9H100.6V-8.2Q94.3 -4.3 84.3 -1.4Q74.4 1.6 60.6 1.6Z',
  },
  {
    // Ấ
    transform: 'translate(-76.9,174.8) scale(1.2) rotate(8,61.4,-77.0) translate(61.4,-77.0) scale(0.98) translate(-61.4,77.0)',
    d: 'M81.5 -127.3 93.2 -154H120.5L107.6 -127.3ZM21.1 -106.8 45.7 -132.9H72.8L97.4 -106.8H68L59.3 -118.6L51.1 -106.8ZM2.3 0 40.8 -100H79.8L118.3 0H79.2L72 -18.6H48.6L41.5 0ZM52.6 -44.3H67.9L60.2 -63.4Z',
  },
  {
    // P
    transform: 'translate(69.0,184.8) scale(1.2) rotate(-7,52.5,-50.0) translate(52.5,-50.0) scale(1.14) translate(-52.5,50.0)',
    d: 'M5.4 0V-100H61.6Q74.5 -100 82.9 -94.7Q91.3 -89.4 95.4 -80.6Q99.5 -71.7 99.5 -61Q99.5 -50.2 94.8 -41.4Q90.1 -32.6 81.4 -27.5Q72.8 -22.4 61 -22.4H43V0ZM43 -51.7H52.2Q56.7 -51.7 59 -54.2Q61.3 -56.7 61.3 -61Q61.3 -70.7 52.8 -70.7H43Z',
  },
  {
    // L
    transform: 'translate(-167.8,385.6) scale(1.08) rotate(10,44.6,-50.0) translate(44.6,-50.0) scale(0.96) translate(-44.6,50.0)',
    d: 'M5.4 0V-100H43V-28.6H83.9V0Z',
  },
  {
    // Ắ
    transform: 'translate(-63.2,371.6) scale(1.08) rotate(-5,60.3,-82.8) translate(60.3,-82.8) scale(1.1) translate(-60.3,82.8)',
    d: 'M49.7 -139 61.3 -165.7H85.6L72.7 -139ZM60.2 -106.8Q46.3 -106.8 37.9 -113.9Q29.5 -121 29.5 -136H50.3Q50.3 -131.4 52.6 -128.2Q55 -125 60.2 -125Q65.7 -125 68 -128.2Q70.3 -131.4 70.3 -136H91.1Q91.1 -121 82.8 -113.9Q74.4 -106.8 60.2 -106.8ZM2.3 0 40.8 -100H79.8L118.3 0H79.2L72 -18.6H48.6L41.5 0ZM52.6 -44.3H67.9L60.2 -63.4Z',
  },
  {
    // M
    transform: 'translate(70.3,387.6) scale(1.08) rotate(8,61.4,-50.0) translate(61.4,-50.0) scale(1.02) translate(-61.4,50.0)',
    d: 'M5.4 0V-100H41.1L61.5 -58.7L81.7 -100H117.4V0H79.8V-35.1L71 -17.1H51.9L43 -35.1V0Z',
  },
  {
    // R
    transform: 'translate(-198.8,558.4) scale(0.94) rotate(-10,52.5,-50.0) translate(52.5,-50.0) scale(1.1) translate(-52.5,50.0)',
    d: 'M5.4 0V-100H61.6Q74.5 -100 82.9 -95.1Q91.3 -90.2 95.4 -81.8Q99.5 -73.3 99.5 -62.6Q99.5 -52.5 94.3 -44.9Q89.1 -37.3 81.8 -32.3Q83.5 -31.2 84.5 -29.9Q85.4 -28.6 86 -27.2L97.8 0H58.7L48.9 -22.2Q48.1 -24.1 47.2 -24.8Q46.3 -25.5 44.6 -25.5H43V0ZM43 -54.8H52.2Q61.3 -54.8 61.3 -62.6Q61.3 -66.9 59.2 -68.8Q57.1 -70.7 52.8 -70.7H43Z',
  },
  {
    // Ồ
    transform: 'translate(-102.2,548.4) scale(0.94) rotate(9,52.0,-76.2) translate(52.0,-76.2) scale(0.98) translate(-52.0,76.2)',
    d: 'M7.5 -127.3 -5.4 -154H21.9L33.5 -127.3ZM17.7 -106.8 42.2 -132.9H69.4L93.9 -106.8H64L55.7 -118.6L47 -106.8ZM55.9 1.6Q39 1.6 27 -3.5Q15.1 -8.5 8.7 -19.9Q2.3 -31.2 2.3 -50Q2.3 -68.9 8.7 -80.2Q15.1 -91.5 27 -96.5Q39 -101.6 55.9 -101.6Q72.8 -101.6 84.8 -96.5Q96.7 -91.5 103.1 -80.2Q109.5 -68.9 109.5 -50Q109.5 -31.2 103.1 -19.9Q96.7 -8.5 84.8 -3.5Q72.8 1.6 55.9 1.6ZM55.9 -30.3Q64.1 -30.3 67.6 -34.7Q71.1 -39.1 71.1 -50Q71.1 -60.9 67.6 -65.3Q64.1 -69.7 55.9 -69.7Q47.7 -69.7 44.2 -65.3Q40.7 -60.9 40.7 -50Q40.7 -39.1 44.2 -34.7Q47.7 -30.3 55.9 -30.3Z',
  },
  {
    // I
    transform: 'translate(3.9,560.4) scale(0.94) rotate(-6,24.2,-50.0) translate(24.2,-50.0) scale(1.08) translate(-24.2,50.0)',
    d: 'M5.4 0V-100H43V0Z',
  },
  {
    // !
    transform: 'translate(59.8,552.4) scale(0.94) rotate(14,21.7,-50.0) translate(21.7,-50.0) scale(0.94) translate(-21.7,50.0)',
    d: 'M4 -30.9 3 -72V-100H40.5V-72L39.4 -30.9ZM2.3 0V-25.9H41.1V0Z',
  },
  {
    // !
    transform: 'translate(109.1,561.4) scale(0.94) rotate(-10,21.7,-50.0) translate(21.7,-50.0) scale(1.04) translate(-21.7,50.0)',
    d: 'M4 -30.9 3 -72V-100H40.5V-72L39.4 -30.9ZM2.3 0V-25.9H41.1V0Z',
  },
  {
    // !
    transform: 'translate(158.4,555.4) scale(0.94) rotate(16,21.7,-50.0) translate(21.7,-50.0) scale(0.9) translate(-21.7,50.0)',
    d: 'M4 -30.9 3 -72V-100H40.5V-72L39.4 -30.9ZM2.3 0V-25.9H41.1V0Z',
  },
];

const BODY = LETTERS.map((l, i) => <path key={i} transform={l.transform} d={l.d} />);

export function GapLamRoiLogo({
  ink = INK,
  paper = PAPER,
  ...props
}: SVGProps<SVGGElement> & { ink?: string; paper?: string }) {
  const cutId = useId();
  const transparent = paper === 'none';
  return (
    <g {...props}>
      <g transform="rotate(-5)" strokeLinejoin="round">
        {transparent && (
          // khoét mặt chữ khỏi phần mực
          <mask id={cutId} maskUnits="userSpaceOnUse" x="-400" y="-200" width="800" height="900">
            <rect x="-400" y="-200" width="800" height="900" fill="#FFFFFF" />
            <g fill="#000000">{BODY}</g>
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
        {!transparent && <g fill={paper}>{BODY}</g>}
      </g>
    </g>
  );
}
