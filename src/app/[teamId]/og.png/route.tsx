import { getTeam, getTeams } from '@/lib/catalog';
import { rgba } from '@/lib/color';
import { ShirtStack, Swatches, ogImage, shirtColors, teamLogo } from '@/lib/og';
import { SITE_NAME } from '@/lib/site';

/* og:image theo đội (/<đội>/og.png) — dùng cho /<đội> và mọi trang mẫu /<đội>/<mẫu> */

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getTeams().map((team) => ({ teamId: team.id }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const team = getTeam(teamId);
  if (!team) throw new Error(`[team-uniform] Không có đội "${teamId}".`);

  const logo = await teamLogo(team);
  const accent2 = team.accent2 ?? team.accent;
  const heading = `Đồng phục đội ${team.name}`;
  const names = team.designs.map((d) => d.name);
  const summary = `${names.length} mẫu áo · ${names.slice(0, 3).join(', ')}${names.length > 3 ? '…' : ''}`;

  return ogImage(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        fontFamily: 'Be Vietnam Pro',
        color: '#141529',
        backgroundColor: '#f7f6ff',
        // nền sáng, ánh màu nhấn của đội
        backgroundImage:
          `radial-gradient(circle at 82% 28%, ${rgba(accent2, 0.38)}, ${rgba(accent2, 0)} 52%), ` +
          `radial-gradient(circle at 6% 100%, ${rgba(team.accent, 0.34)}, ${rgba(team.accent, 0)} 55%), ` +
          'linear-gradient(135deg, #ffffff, #eef0fb)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 660, padding: '64px 0 64px 80px' }}>
        <div style={{ display: 'flex', fontSize: 24, fontWeight: 800, letterSpacing: 6, opacity: 0.55 }}>
          {SITE_NAME.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" height={140} style={{ alignSelf: 'flex-start', marginBottom: 28 }} />
          ) : (
            <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 1, marginBottom: 20 }}>{team.shortName ?? team.name}</div>
          )}
          <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1 }}>{heading}</div>
          <div style={{ marginTop: 18, fontSize: 28, fontWeight: 500, lineHeight: 1.4, opacity: 0.7 }}>{summary}</div>
        </div>
        <Swatches team={team} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: -40 }}>
        <ShirtStack colors={shirtColors(team, 2)} logo={logo} />
      </div>
    </div>,
    [SITE_NAME.toUpperCase(), team.shortName ?? '', heading, summary].join(''),
  );
}
