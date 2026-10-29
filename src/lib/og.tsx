import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { ReactElement } from 'react';
import { ImageResponse } from 'next/og';
import { FRONT_NECK, TSHIRT_BODY } from '@/garments/tshirt';
import { defaultColorOf } from '@/lib/catalog';
import { isLight } from '@/lib/color';
import { OG_SIZE } from '@/lib/site';
import type { Team } from '@/types/uniform';

/* Ảnh og:image (xem trước khi share link) — dựng lúc build bằng next/og, xuất thành file tĩnh */

const FONT = 'Be Vietnam Pro';

/** Tải font từ Google Fonts, chỉ gồm các ký tự cần vẽ — font mặc định của next/og thiếu dấu tiếng Việt. */
async function googleFont(weight: number, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`[team-uniform] Không tải được font ${FONT} ${weight} cho og:image.`);
  return fetch(url).then((res) => res.arrayBuffer());
}

/** `text`: mọi chữ xuất hiện trong ảnh, để tải đúng phần font cần dùng */
export async function ogImage(element: ReactElement, text: string) {
  const [medium, bold] = await Promise.all([googleFont(500, text), googleFont(800, text)]);
  return new ImageResponse(element, {
    ...OG_SIZE,
    fonts: [
      { name: FONT, data: medium, weight: 500, style: 'normal' },
      { name: FONT, data: bold, weight: 800, style: 'normal' },
    ],
  });
}

const MIME: Record<string, string> = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };

/** File trong /public dạng data URI (ảnh trong og:image phải nhúng thẳng), không có file thì null */
async function publicDataUri(file: string) {
  const full = path.join(process.cwd(), 'public', file);
  try {
    await access(full);
  } catch {
    return null;
  }
  const mime = MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
  return `data:${mime};base64,${(await readFile(full)).toString('base64')}`;
}

/** Logo của đội: `team.logo`, chưa khai báo thì thử /teams/<id>/logo.svg */
export async function teamLogo(team: Team) {
  return (team.logo && (await publicDataUri(team.logo))) ?? publicDataUri(`/teams/${team.id}/logo.svg`);
}

/** Màu áo đại diện: màu của từng mẫu (không trùng), thiếu thì lấy thêm từ bảng màu của đội */
export function shirtColors(team: Team, count: number) {
  const colors = new Set(team.designs.map((design) => defaultColorOf(design, team)));
  for (const color of team.palette) colors.add(color.hex);
  return [...colors].slice(0, count);
}

/**
 * Áo thun mặt trước — dáng thân dùng chung với template tshirt-front, logo ở ngực trái.
 * Logo là <img> đè lên chứ không phải <image> trong SVG: satori lỗi khi ảnh chỉ xuất hiện bên trong SVG.
 */
function Shirt({ color, logo, width }: { color: string; logo: string | null; width: number }) {
  const light = isLight(color);
  const k = width / 400;
  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <svg width={width} height={460 * k} viewBox="0 0 400 460">
        <defs>
          <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity={light ? 0.35 : 0.14} />
            <stop offset="1" stopColor="#000" stopOpacity={light ? 0.16 : 0.3} />
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="436" rx="140" ry="9" fill="#000" fillOpacity="0.22" />
        <path d={TSHIRT_BODY} fill={color} />
        <path d={TSHIRT_BODY} fill="url(#shade)" stroke={light ? '#141C2D' : '#fff'} strokeOpacity="0.2" strokeWidth="2" />
        <path d={FRONT_NECK} fill="#000" fillOpacity="0.38" />
      </svg>
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt="" width={70 * k} height={26.5 * k} style={{ position: 'absolute', left: 221 * k, top: 113 * k }} />
      )}
    </div>
  );
}

/** 2–3 áo xếp chồng, áo đầu tiên ở trước */
export function ShirtStack({ colors, logo }: { colors: string[]; logo: string | null }) {
  const slots = [
    { left: 150, top: 70, width: 400 },
    { left: 20, top: 30, width: 330 },
    { left: 250, top: 0, width: 300 },
  ].slice(0, colors.length);
  return (
    <div style={{ position: 'relative', display: 'flex', width: 560, height: 560 }}>
      {slots
        .map((slot, i) => (
          <div key={i} style={{ position: 'absolute', left: slot.left, top: slot.top, display: 'flex' }}>
            <Shirt color={colors[i]} logo={logo} width={slot.width} />
          </div>
        ))
        .reverse()}
    </div>
  );
}

export function Swatches({ team }: { team: Team }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {team.palette.slice(0, 12).map((color) => (
        <div
          key={color.hex}
          style={{ width: 30, height: 30, borderRadius: 15, background: color.hex, border: '2px solid rgba(20, 28, 45, .16)' }}
        />
      ))}
    </div>
  );
}
