'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { defaultColorOf, designHref, viewsOf } from '@/lib/catalog';
import { shirtVars } from '@/lib/color';
import type { Team } from '@/types/uniform';
import { GarmentView } from './GarmentView';

interface Props {
  team: Team;
  activeId?: string;
}

/** Chuyển sang mẫu khác luôn mở với màu của mẫu đó (không giữ màu đang xem thử). */
export function DesignSidebar({ team, activeId }: Props) {
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Trên mobile danh sách cuộn ngang — đưa mẫu đang chọn vào tầm nhìn
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeId]);

  return (
    <aside className="sidebar glass">
      <div className="sidebar-head">
        <h2>Mẫu thiết kế</h2>
        <span className="pill">{team.designs.length}</span>
      </div>

      <nav className="design-list" aria-label="Danh sách mẫu thiết kế">
        {team.designs.length === 0 && <p className="design-empty">Đội này chưa có mẫu thiết kế.</p>}
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
                <GarmentView view={design.views.front} label={design.name} />
              </span>
              <span className="design-info">
                <span className="design-index">MẪU {String(i + 1).padStart(2, '0')}</span>
                <span className="design-name">{design.name}</span>
                <span className="design-meta">{viewsOf(design).map((s) => s.label.toLowerCase()).join(' · ')}</span>
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
