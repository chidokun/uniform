import { TEAMS } from '@/data/teams';
import type { Design, Team, ViewKey } from '@/types/uniform';

/** Các mặt áo có thể hiển thị, theo thứ tự. */
export const VIEW_SLOTS: { key: ViewKey; label: string; chip: string }[] = [
  { key: 'front', label: 'Mặt trước', chip: 'FRONT' },
  { key: 'back', label: 'Mặt sau', chip: 'BACK' },
  { key: 'shoulder', label: 'Vai', chip: 'SLEEVE' },
];

export const getTeams = () => TEAMS;
export const getTeam = (id: string) => TEAMS.find((t) => t.id === id);
export const getDefaultTeam = () => TEAMS[0];
export const getDesign = (team: Team, id: string) => team.designs.find((d) => d.id === id);

export const colorsOf = (design: Design, team: Team) => design.colors ?? team.palette;
export const defaultColorOf = (design: Design, team: Team) => design.defaultColor ?? colorsOf(design, team)[0].hex;

/** Các mặt mà mẫu có khai báo */
export const viewsOf = (design: Design) => VIEW_SLOTS.filter((slot) => design.views[slot.key]);

export function designHref(team: Team, design?: Design, color?: string) {
  if (!design) return `/${team.id}`;
  return `/${team.id}/${design.id}` + (color ? `?color=${color.slice(1)}` : '');
}
