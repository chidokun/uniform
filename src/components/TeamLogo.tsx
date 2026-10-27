import { asset } from '@/lib/asset';
import type { Team } from '@/types/uniform';

export function TeamLogo({ team }: { team: Team }) {
  return (
    <span className="team-logo">
      {team.logo
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={asset(team.logo)} alt="" />
        : team.shortName ?? team.name.slice(0, 4)}
    </span>
  );
}
