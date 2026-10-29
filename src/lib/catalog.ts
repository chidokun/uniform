import { TEAMS } from '@/data/teams';
import type { ColorOption, Design, Team, ViewKey } from '@/types/uniform';

/** Các mặt áo có thể hiển thị, theo thứ tự. Tên mặt áo theo ngôn ngữ ở `views` trong lib/i18n.ts. */
export const VIEW_SLOTS: { key: ViewKey; chip: string }[] = [
  { key: 'front', chip: 'FRONT' },
  { key: 'back', chip: 'BACK' },
  { key: 'shoulder', chip: 'SLEEVE' },
];

export const getTeams = () => TEAMS;
export const getTeam = (id: string) => TEAMS.find((t) => t.id === id);
export const getDefaultTeam = () => TEAMS[0];
export const getDesign = (team: Team, id: string) => team.designs.find((d) => d.id === id);

/** Bảng màu của mẫu — màu của mẫu (nếu có) luôn đứng đầu */
export function colorsOf(design: Design, team: Team): ColorOption[] {
  const colors = design.colors ?? team.palette;
  const own = design.designColor;
  if (!own) return colors;
  return [colors.find((c) => c.hex === own) ?? { name: { vi: 'Màu mẫu', ko: '디자인 색상' }, hex: own }, ...colors.filter((c) => c.hex !== own)];
}

export const defaultColorOf = (design: Design, team: Team) =>
  design.defaultColor ?? design.designColor ?? colorsOf(design, team)[0].hex;

/** Các mặt mà mẫu có khai báo */
export const viewsOf = (design: Design) => VIEW_SLOTS.filter((slot) => design.views[slot.key]);

export function designHref(team: Team, design?: Design, color?: string) {
  if (!design) return `/${team.id}`;
  return `/${team.id}/${design.id}` + (color ? `?color=${color.slice(1)}` : '');
}
