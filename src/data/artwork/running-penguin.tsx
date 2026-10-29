import { useId, type SVGProps } from 'react';
import { GaapLogo } from '@/data/artwork/gaap';
import { asset } from '@/lib/asset';

/**
 * Cụm logo ngực: chim cánh cụt đang chạy sang phải, đằng sau là mấy vệt gạch ngang kiểu nhoè chuyển động
 * (đậm dần về phía con chim, vệt trên ngắn nhất, càng xuống càng dài, vệt dưới cùng chạy từ chân trước), chữ GaaP nằm bên trái
 * đè lên các vệt — vệt bị khoét theo dáng chữ nên chữ luôn nổi lên trên, kể cả khi `paper="none"`.
 *
 * Hệ toạ độ riêng: chữ cao 43, chim cao 73.1; cả cụm nằm trong x -3…168, y -26…47.2, tâm (82.5, 10.6).
 * Đặt lên áo bằng transform, vd `<RunningPenguin transform="translate(256 128) scale(.5) translate(-82.5 -10.6)" />`.
 * Đổi màu: `ink` (vệt, viền chữ) và `paper` (mặt chữ) — truyền thẳng cho GaapLogo. `streaks={false}` bỏ hết vệt.
 */

const INK = '#000000';
const PAPER = '#FFFFFF';

/** Chữ GaaP (viền ngoài cao 147 trong hệ của GaapLogo) thu về cao 43, nằm trong y -7.5…35.5 */
const GAAP_TRANSFORM = 'translate(56.5 14) scale(.2925) translate(-181.5 -80.5)';
/** public/teams/gaap/penguin.svg — viewBox 842×1162, cao gấp 1.7 chữ, nhích lên trên giữa chữ một chút, cánh gần chạm chữ */
const PENGUIN = { x: 115, y: -25.95, width: 53, height: 73.1 };

/**
 * Vệt nhoè, từ trên xuống, dàn đều theo chiều cao chim: `at` = vị trí dọc, `tuck` = chỗ đầu phải chui vào sau
 * dáng chim, cả hai tính theo tỉ lệ khung ảnh (đo từ clipPath #silhouette của penguin.svg).
 * Vệt dưới cùng sát mép dưới, chạy tới chân trước; vệt trên cùng dài bằng một nửa vệt dưới cùng.
 */
const STREAK_SPOTS = [
  { at: 0.2, tuck: 0.43 }, // vành mũ
  { at: 0.45, tuck: 0.1 }, // cánh
  { at: 0.7, tuck: 0.18 }, // bụng
  { at: 0.955, tuck: 0.6 }, // chân trước
];
const STREAK_MAX = 136;
const STREAK_WIDTH = 3;
const STREAK_OPACITY = 0.6;
const STREAKS = STREAK_SPOTS.map(({ at, tuck }, i) => {
  const length = STREAK_MAX * (0.5 + (0.5 * i) / (STREAK_SPOTS.length - 1));
  const end = PENGUIN.x + PENGUIN.width * tuck;
  return { x: end - length, y: PENGUIN.y + PENGUIN.height * at, length };
});

export function RunningPenguin({
  ink = INK,
  paper = PAPER,
  streaks = true,
  ...props
}: SVGProps<SVGGElement> & { ink?: string; paper?: string; streaks?: boolean }) {
  const fadeId = useId();
  const cutId = useId();
  return (
    <g {...props}>
      {streaks && (
        <>
          <defs>
            {/* mỗi vệt mờ dần từ đầu phải sang đầu trái của chính nó */}
            <linearGradient id={fadeId}>
              <stop offset="0" stopColor={ink} stopOpacity="0" />
              <stop offset=".55" stopColor={ink} stopOpacity=".85" />
              <stop offset="1" stopColor={ink} />
            </linearGradient>
            {/* khoét vệt theo dáng chữ để chữ nổi lên trên */}
            <mask id={cutId} maskUnits="userSpaceOnUse" x="-40" y="-40" width="240" height="100">
              <rect x="-40" y="-40" width="240" height="100" fill="#FFFFFF" />
              <GaapLogo ink="#000000" paper="#000000" transform={GAAP_TRANSFORM} />
            </mask>
          </defs>
          <g mask={`url(#${cutId})`} opacity={STREAK_OPACITY} fill={`url(#${fadeId})`}>
            {STREAKS.map(({ x, y, length }) => (
              <rect key={y} x={x} y={y - STREAK_WIDTH / 2} width={length} height={STREAK_WIDTH} rx={STREAK_WIDTH / 2} />
            ))}
          </g>
        </>
      )}
      <image href={asset('/teams/gaap/penguin.svg')} {...PENGUIN} />
      <GaapLogo ink={ink} paper={paper} transform={GAAP_TRANSFORM} />
    </g>
  );
}
