import type { Team } from '@/types/uniform';
import gaap from './gaap';

/**
 * Danh sách đội hiển thị trong ô chọn đội. Đội đầu tiên được chọn sẵn.
 * Thêm đội: tạo file ./<id>.tsx (copy từ gaap.tsx) rồi thêm vào mảng này.
 */
export const TEAMS: Team[] = [gaap];

const seen = new Set<string>();
for (const team of TEAMS) {
  if (seen.has(team.id)) throw new Error(`[team-uniform] Đội "${team.id}" bị khai báo trùng.`);
  seen.add(team.id);
}
