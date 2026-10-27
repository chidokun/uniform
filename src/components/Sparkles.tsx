import type { CSSProperties } from 'react';

/** Vị trí hạt lấp lánh: [x%, y%, delay s, size px] */
const SPARKLES = [[12, 14, 0, 12], [84, 10, 1.3, 9], [88, 72, 2.2, 13], [9, 80, 0.7, 8]];

export function Sparkles({ offset = 0 }: { offset?: number }) {
  return SPARKLES.map(([x, y, d, s]) => (
    <span
      key={`${x}-${y}`}
      className="sparkle"
      aria-hidden="true"
      style={{ '--x': `${x}%`, '--y': `${y}%`, '--d': `${d + offset}s`, '--s': `${s}px` } as CSSProperties}
    />
  ));
}
