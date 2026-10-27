import { redirect } from 'next/navigation';
import { designHref, getDefaultTeam } from '@/lib/catalog';

export default function Home() {
  const team = getDefaultTeam();
  redirect(designHref(team, team.designs[0]));
}
