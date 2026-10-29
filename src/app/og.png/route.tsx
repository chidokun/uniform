import { getDefaultTeam, getTeams } from '@/lib/catalog';
import { ShirtStack, ogImage, shirtColors, teamLogo } from '@/lib/og';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

/* og:image của trang chủ (/og.png) — trang đội có ảnh riêng ở [teamId]/og.png */

export const dynamic = 'force-static';

export async function GET() {
  const teams = getTeams();
  const team = getDefaultTeam();
  const chips = teams.map((t) => `${t.name} · ${t.designs.length} mẫu`);

  return ogImage(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        fontFamily: 'Be Vietnam Pro',
        color: '#0b2545',
        backgroundColor: '#8cc4f5',
        // trời xanh như nền mặc định "sky"
        backgroundImage:
          'radial-gradient(circle at 78% 22%, rgba(255, 255, 255, .8), rgba(255, 255, 255, 0) 40%), ' +
          'radial-gradient(circle at 12% 92%, rgba(255, 255, 255, .7), rgba(255, 255, 255, 0) 45%), ' +
          'linear-gradient(180deg, #7dbcf3, #e3f2fd)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 660, padding: '0 0 0 80px' }}>
        <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>{SITE_NAME}</div>
        <div style={{ marginTop: 20, fontSize: 32, fontWeight: 500, opacity: 0.8 }}>{SITE_DESCRIPTION}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 44 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: 'flex',
                padding: '12px 26px',
                borderRadius: 40,
                fontSize: 28,
                fontWeight: 800,
                background: 'rgba(255, 255, 255, .6)',
                border: '2px solid rgba(255, 255, 255, .9)',
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: -40 }}>
        <ShirtStack colors={shirtColors(team, 3)} logo={await teamLogo(team)} />
      </div>
    </div>,
    [SITE_NAME, SITE_DESCRIPTION, ...chips].join(''),
  );
}
