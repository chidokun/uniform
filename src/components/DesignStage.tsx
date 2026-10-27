'use client';

import { useRef, type CSSProperties } from 'react';
import { colorsOf, viewsOf } from '@/lib/catalog';
import type { Design, Team, ViewKey } from '@/types/uniform';
import { ColorCurrent, ColorSwatches } from './ColorSwatches';
import { GarmentView } from './GarmentView';
import { ExpandIcon } from './icons';
import { Sparkles } from './Sparkles';
import { TeamLogo } from './TeamLogo';

interface Props {
  team: Team;
  design: Design;
  color: string;
  onColorChange: (hex: string) => void;
  /** Mở chế độ toàn màn hình; `trigger` nhận lại focus khi đóng */
  onOpenView: (key: ViewKey, trigger: HTMLElement | null) => void;
}

function ViewCard({ index, label, chip, design, viewKey, onOpen }: {
  index: number;
  label: string;
  chip: string;
  design: Design;
  viewKey: ViewKey;
  onOpen: (trigger: HTMLElement | null) => void;
}) {
  const expandRef = useRef<HTMLButtonElement>(null);

  return (
    <figure className="view-card glass" style={{ '--i': index } as CSSProperties}>
      <div className="view-canvas well" title="Xem toàn màn hình" onClick={() => onOpen(expandRef.current)}>
        <Sparkles offset={index * 0.4} />
        <GarmentView view={design.views[viewKey]!} label={`${design.name} — ${label}`} />
        <button ref={expandRef} className="view-expand glass glass--refract" type="button" aria-label={`Xem ${label.toLowerCase()} toàn màn hình`}>
          <ExpandIcon />
        </button>
      </div>
      <figcaption>
        <span className="view-label">{label}</span>
        <span className="view-chip">{chip}</span>
      </figcaption>
    </figure>
  );
}

export function DesignStage({ team, design, color, onColorChange, onOpenView }: Props) {
  const index = team.designs.indexOf(design) + 1;
  const slots = viewsOf(design);
  const colors = colorsOf(design, team);

  return (
    <section className="stage glass" aria-live="polite">
      <header className="stage-head">
        <div className="stage-title">
          <span className="eyebrow">{team.name} · Mẫu {String(index).padStart(2, '0')}</span>
          <h1>{design.name}</h1>
          {design.description && <p>{design.description}</p>}
          {!!design.tags?.length && (
            <div className="tags">{design.tags.map((t) => <span key={t} className="tag glass glass--refract">{t}</span>)}</div>
          )}
        </div>
        <div className="team-badge glass glass--refract">
          <TeamLogo team={team} />
          <span className="team-badge-text"><small>Đội</small><strong>{team.name}</strong></span>
        </div>
      </header>

      <div className={`views views--${slots.length}`}>
        {slots.map((slot, i) => (
          <ViewCard
            key={slot.key}
            index={i}
            label={slot.label}
            chip={slot.chip}
            design={design}
            viewKey={slot.key}
            onOpen={(trigger) => onOpenView(slot.key, trigger)}
          />
        ))}
      </div>

      <section className="color-panel glass" aria-label="Chọn màu áo">
        <div className="color-head">
          <h3>Màu áo</h3>
          <ColorCurrent colors={colors} value={color} />
        </div>
        <ColorSwatches colors={colors} value={color} onChange={onColorChange} />
      </section>
    </section>
  );
}
