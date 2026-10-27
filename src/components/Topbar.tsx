'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { designHref, getTeam, getTeams } from '@/lib/catalog';
import type { Team } from '@/types/uniform';
import { BackgroundPicker } from './BackgroundPicker';
import { ChevronDownIcon } from './icons';
import { ThemeToggle } from './ThemeToggle';

function BrandMark() {
  return (
    <span className="brand-mark">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <defs>
          <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
            <stop offset="1" style={{ stopColor: 'var(--accent-2)' }} />
          </linearGradient>
        </defs>
        <path d="M18 9c1.6 2.4 3.6 3.6 6 3.6S28.4 11.4 30 9l9 4.2 4 8.6-6 3-2-3.4V39H13V21.4l-2 3.4-6-3 4-8.6Z"
              fill="url(#brand-grad)" />
        <path d="M18 9c1.6 2.4 3.6 3.6 6 3.6S28.4 11.4 30 9" fill="none" stroke="#fff" strokeOpacity=".7"
              strokeWidth="1.6" strokeLinecap="round" />
        <path d="M17 16 26 30" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Topbar({ team }: { team: Team }) {
  const router = useRouter();

  return (
    <header className="topbar glass glass--refract">
      <Link className="brand" href="/" aria-label="Team Uniform — trang chủ">
        <BrandMark />
        <span className="brand-text">
          <strong>Team Uniform</strong>
          <small>Showcase áo đội</small>
        </span>
      </Link>

      <div className="topbar-actions">
        <label className="team-picker glass glass--refract">
          <span className="team-picker-label">Đội</span>
          <select
            aria-label="Chọn đội"
            value={team.id}
            onChange={(e) => {
              const next = getTeam(e.target.value);
              if (next) router.push(designHref(next, next.designs[0]));
            }}
          >
            {getTeams().map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <span className="team-picker-chevron"><ChevronDownIcon /></span>
        </label>
        <BackgroundPicker />
        <ThemeToggle />
      </div>
    </header>
  );
}
