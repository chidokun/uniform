import type { ColorOption, Team } from '@/types/uniform';
import { normalizeHex } from './color';

function normalizePalette(colors: ColorOption[], owner: string): ColorOption[] {
  return colors.map((color) => {
    const hex = normalizeHex(color.hex);
    if (!hex) throw new Error(`[team-uniform] Màu "${color.name}" của ${owner} có mã hex không hợp lệ: ${color.hex}`);
    return { ...color, hex };
  });
}

/**
 * Khai báo một đội: kiểm tra id trùng, chuẩn hoá mã màu.
 * Dùng trong src/data/teams/<id>.tsx: `export default defineTeam({ ... })`.
 */
export function defineTeam(team: Team): Team {
  if (!team.palette.length) throw new Error(`[team-uniform] Đội "${team.id}" cần ít nhất 1 màu trong palette.`);
  const ids = new Set<string>();

  return {
    ...team,
    palette: normalizePalette(team.palette, `đội ${team.id}`),
    designs: team.designs.map((design) => {
      if (ids.has(design.id)) throw new Error(`[team-uniform] Mẫu "${design.id}" bị trùng trong đội "${team.id}".`);
      ids.add(design.id);
      return {
        ...design,
        colors: design.colors && normalizePalette(design.colors, `mẫu ${design.id}`),
        defaultColor: normalizeHex(design.defaultColor) ?? undefined,
      };
    }),
  };
}
