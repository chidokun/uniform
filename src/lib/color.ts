import type { CSSProperties } from 'react';

export function normalizeHex(value: string | null | undefined): string | null {
  if (!value) return null;
  let hex = value.trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(hex)) hex = hex.split('').map((c) => c + c).join('');
  return /^[0-9a-f]{6}$/i.test(hex) ? '#' + hex.toUpperCase() : null;
}

function toRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export const isLight = (hex: string) => luminance(hex) > 0.4;

export function rgba(hex: string, alpha: number): string {
  return `rgba(${toRgb(hex).join(', ')}, ${alpha})`;
}

/** Màu chữ/họa tiết tương phản với màu áo */
export const inkOf = (hex: string) => (isLight(hex) ? '#1B2233' : '#FFFFFF');

/** CSS variables tô màu áo — mọi garment SVG bên trong phần tử sẽ đổi màu theo. */
export function shirtVars(hex: string): CSSProperties {
  return {
    '--shirt': hex,
    '--shirt-ink': inkOf(hex),
    '--shirt-seam': isLight(hex) ? 'rgba(20, 28, 45, .24)' : 'rgba(255, 255, 255, .22)',
  } as CSSProperties;
}
