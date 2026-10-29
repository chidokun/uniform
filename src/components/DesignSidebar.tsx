'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { defaultColorOf, designHref, viewsOf } from '@/lib/catalog';
import { shirtVars } from '@/lib/color';
import { useI18n } from '@/lib/locale';
import type { Team } from '@/types/uniform';
import { GarmentView } from './GarmentView';

interface Props {
  team: Team;
  activeId?: string;
}

/** Chuyển sang mẫu khác luôn mở với màu của mẫu đó (không giữ màu đang xem thử). */
export function DesignSidebar({ team, activeId }: Props) {
  const activeRef = useRef<HTMLAnchorElement>(null);
  const { t, tx } = useI18n();

  // Trên mobile danh sách cuộn ngang — đưa mẫu đang chọn vào tầm nhìn
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeId]);

  return (
    <aside className="sidebar glass">
      <div className="sidebar-head">
        <h2>{t.designs}</h2>
        <span className="pill">{team.designs.length}</span>
      </div>

      <nav className="design-list" aria-label={t.designList}>
        {team.designs.length === 0 && <p className="design-empty">{t.teamHasNoDesigns}</p>}
        {team.designs.map((design, i) => {
          const active = design.id === activeId;
          return (
            <Link
              key={design.id}
              ref={active ? activeRef : undefined}
              href={designHref(team, design)}
              scroll={false}
              className={`design-item glass${active ? ' is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="design-thumb well" style={shirtVars(defaultColorOf(design, team))}>
                <GarmentView view={design.views.front} label={tx(design.name)} />
              </span>
              <span className="design-info">
                <span className="design-index">{t.designIndex(i + 1)}</span>
                <span className="design-name">{tx(design.name)}</span>
                <span className="design-meta">{viewsOf(design).map((s) => t.views[s.key].toLowerCase()).join(' · ')}</span>
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
