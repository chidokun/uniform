import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Showcase } from '@/components/Showcase';
import { designHref, getTeam, getTeams } from '@/lib/catalog';
import { SITE_OPEN_GRAPH, openGraphImages } from '@/lib/site';

type Params = Promise<{ teamId: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getTeams().map((team) => ({ teamId: team.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const team = getTeam((await params).teamId);
  if (!team) return {};
  const title = `Đồng phục đội ${team.name}`;
  const description = `${team.designs.length} mẫu áo đồng phục của đội ${team.name}`;
  return {
    title: team.name,
    description,
    openGraph: { ...SITE_OPEN_GRAPH, title, description, images: openGraphImages(`/${team.id}/og.png`, title) },
  };
}

/** /<đội> → mẫu đầu tiên của đội */
export default async function TeamPage({ params }: { params: Params }) {
  const { teamId } = await params;
  const team = getTeam(teamId);
  if (!team) notFound();
  if (team.designs.length) redirect(designHref(team, team.designs[0]));
  return <Showcase teamId={team.id} designId={null} />;
}
