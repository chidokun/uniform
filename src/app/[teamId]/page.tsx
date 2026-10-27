import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Showcase } from '@/components/Showcase';
import { designHref, getTeam, getTeams } from '@/lib/catalog';

type Params = Promise<{ teamId: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return getTeams().map((team) => ({ teamId: team.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const team = getTeam((await params).teamId);
  return { title: team?.name };
}

/** /<đội> → mẫu đầu tiên của đội */
export default async function TeamPage({ params }: { params: Params }) {
  const { teamId } = await params;
  const team = getTeam(teamId);
  if (!team) notFound();
  if (team.designs.length) redirect(designHref(team, team.designs[0]));
  return <Showcase teamId={team.id} designId={null} />;
}
