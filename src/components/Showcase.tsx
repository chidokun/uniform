'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState, type CSSProperties } from 'react';
import { colorsOf, defaultColorOf, getDesign, getTeam } from '@/lib/catalog';
import { normalizeHex, rgba, shirtVars } from '@/lib/color';
import type { ViewKey } from '@/types/uniform';
import { Aurora } from './Aurora';
import { DesignSidebar } from './DesignSidebar';
import { DesignStage } from './DesignStage';
import { Lightbox } from './Lightbox';
import { Topbar } from './Topbar';

interface Props {
  teamId: string;
  designId: string | null;
}

/**
 * Toàn bộ trang showcase của một đội/mẫu. Màu đang xem được ghi lên URL (?color=1F3A68)
 * để chia sẻ link xem trước.
 */
function ShowcaseView({ teamId, designId, initialColor }: Props & { initialColor: string | null }) {
  const team = getTeam(teamId)!;
  const design = designId ? getDesign(team, designId) ?? null : null;
  const colors = design ? colorsOf(design, team) : team.palette;

  const [color, setColorState] = useState(
    () => normalizeHex(initialColor) ?? (design ? defaultColorOf(design, team) : colors[0].hex),
  );
  const [openView, setOpenView] = useState<ViewKey | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const setColor = (hex: string) => {
    setColorState(hex);
    const url = new URL(window.location.href);
    url.searchParams.set('color', hex.slice(1));
    window.history.replaceState(null, '', url);
  };

  // Trả focus về nút đã mở khi đóng chế độ toàn màn hình
  useEffect(() => {
    if (!openView && triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [openView]);

  const accent = normalizeHex(team.accent) ?? '#6C5CE7';
  const style = {
    '--accent': accent,
    '--accent-2': normalizeHex(team.accent2) ?? accent,
    '--glow': rgba(accent, 0.35),
    ...shirtVars(color),
  } as CSSProperties;

  return (
    <div className="app" style={style}>
      <Aurora />

      <div className="app-shell" inert={!!openView}>
        <Topbar team={team} />
        <main className="layout">
          <DesignSidebar team={team} activeId={design?.id} />
          {design ? (
            <DesignStage
              team={team}
              design={design}
              color={color}
              onColorChange={setColor}
              onOpenView={(key, trigger) => {
                triggerRef.current = trigger;
                setOpenView(key);
              }}
            />
          ) : (
            <section className="stage glass">
              <div className="empty">
                <strong>Chưa có mẫu thiết kế</strong>
                <span>Thêm mẫu cho đội {team.name} trong src/data/teams/{team.id}.tsx</span>
              </div>
            </section>
          )}
        </main>
      </div>

      {design && openView && (
        <Lightbox
          team={team}
          design={design}
          view={openView}
          onViewChange={setOpenView}
          colors={colors}
          color={color}
          onColorChange={setColor}
          onClose={() => setOpenView(null)}
        />
      )}
    </div>
  );
}

function ShowcaseWithParams(props: Props) {
  const color = useSearchParams().get('color');
  return <ShowcaseView {...props} initialColor={color} />;
}

/** HTML tĩnh vẽ với màu mặc định; khi chạy trên trình duyệt sẽ đọc ?color= từ URL. */
export function Showcase(props: Props) {
  return (
    <Suspense fallback={<ShowcaseView {...props} initialColor={null} />}>
      <ShowcaseWithParams {...props} />
    </Suspense>
  );
}
