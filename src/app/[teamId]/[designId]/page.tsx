import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Showcase } from '@/components/Showcase';
import { getDesign, getTeam, getTeams } from '@/lib/catalog';
import { tx } from '@/lib/i18n';
import { SITE_OPEN_GRAPH, openGraphImages } from '@/lib/site';

type Params = Promise<{ teamId: string; designId: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getTeams().flatMap((team) => team.designs.map((design) => ({ teamId: team.id, designId: design.id })));
}

function lookup(teamId: string, designId: string) {
  const team = getTeam(teamId);
  const design = team && getDesign(team, designId);
  return team && design ? { team, design } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { teamId, designId } = await params;
  const found = lookup(teamId, designId);
  if (!found) return {};
  // HTML tĩnh dựng bằng tiếng Việt — thẻ meta cũng vậy
  const title = `${tx(found.design.name, 'vi')} — ${found.team.name}`;
  const description = found.design.description && tx(found.design.description, 'vi');
  // ảnh xem trước dùng ảnh của đội
  const images = openGraphImages(`/${teamId}/og.png`, `Đồng phục đội ${found.team.name}`);
  return { title, description, openGraph: { ...SITE_OPEN_GRAPH, title, description, images } };
}

export default async function DesignPage({ params }: { params: Params }) {
  const { teamId, designId } = await params;
  if (!lookup(teamId, designId)) notFound();
  // key: đổi mẫu thì khởi tạo lại trạng thái (màu, hiệu ứng xuất hiện)
  return <Showcase key={`${teamId}/${designId}`} teamId={teamId} designId={designId} />;
}
