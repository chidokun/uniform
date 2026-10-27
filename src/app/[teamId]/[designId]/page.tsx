import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Showcase } from '@/components/Showcase';
import { getDesign, getTeam, getTeams } from '@/lib/catalog';

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
  return found ? { title: `${found.design.name} — ${found.team.name}`, description: found.design.description } : {};
}

export default async function DesignPage({ params }: { params: Params }) {
  const { teamId, designId } = await params;
  if (!lookup(teamId, designId)) notFound();
  // key: đổi mẫu thì khởi tạo lại trạng thái (màu, hiệu ứng xuất hiện)
  return <Showcase key={`${teamId}/${designId}`} teamId={teamId} designId={designId} />;
}
