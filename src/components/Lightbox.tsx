'use client';

import {
  useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent,
} from 'react';
import { viewsOf } from '@/lib/catalog';
import type { ColorOption, Design, Team, ViewKey } from '@/types/uniform';
import { Aurora } from './Aurora';
import { ColorCurrent, ColorSwatches } from './ColorSwatches';
import { GarmentView } from './GarmentView';
import {
  CloseIcon, ExitFullscreenIcon, FullscreenIcon, NextIcon, PrevIcon, ZoomInIcon, ZoomOutIcon,
} from './icons';
import { Sparkles } from './Sparkles';

interface Props {
  team: Team;
  design: Design;
  view: ViewKey;
  onViewChange: (key: ViewKey) => void;
  colors: ColorOption[];
  color: string;
  onColorChange: (hex: string) => void;
  onClose: () => void;
}

const SWIPE_PX = 60;
const clamp = (v: number) => Math.min(100, Math.max(0, v));

/**
 * Xem áo toàn màn hình: chuyển mặt (tab, nút, ← →, vuốt), phóng to theo vị trí con trỏ,
 * đổi màu ngay trong khung, và bật chế độ fullscreen của trình duyệt.
 */
export function Lightbox({ team, design, view, onViewChange, colors, color, onColorChange, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const gesture = useRef({ startX: 0, swiped: false });
  const [zoomed, setZoomed] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<CSSProperties>({ opacity: 0 });

  const slots = viewsOf(design);
  const slot = slots.find((s) => s.key === view) ?? slots[0];

  // Viên kính trượt tới tab đang chọn (đo lại khi đổi tab hoặc đổi kích thước)
  useLayoutEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;
    const measure = () => {
      const tab = tabs.querySelector<HTMLElement>(`[data-view="${view}"]`);
      if (tab) setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(tabs);
    return () => observer.disconnect();
  }, [view]);

  const goTo = (key: ViewKey) => {
    setZoomed(false);
    onViewChange(key);
  };

  const step = (dir: 1 | -1) => {
    const i = slots.findIndex((s) => s.key === view);
    goTo(slots[(i + dir + slots.length) % slots.length].key);
  };

  /** Đặt tâm phóng to tại vị trí con trỏ */
  const aim = (e: { clientX: number; clientY: number }) => {
    const el = zoomRef.current;
    const box = el?.parentElement?.getBoundingClientRect();
    if (!el || !box) return;
    const x = clamp(((e.clientX - box.left) / box.width) * 100);
    const y = clamp(((e.clientY - box.top) / box.height) * 100);
    el.style.transformOrigin = `${x}% ${y}%`;
  };

  const toggleZoom = () => {
    if (!zoomed && zoomRef.current) zoomRef.current.style.transformOrigin = '50% 40%';
    setZoomed((z) => !z);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else rootRef.current?.requestFullscreen().catch(() => {});
  };

  // Khoá cuộn trang nền + theo dõi fullscreen của trình duyệt
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    setCanFullscreen(document.fullscreenEnabled);
    const onFullscreen = () => setIsFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener('fullscreenchange', onFullscreen);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('fullscreenchange', onFullscreen);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  // Phím tắt: Esc đóng, ← → đổi mặt, Z phóng to
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && slots.length > 1) step(-1);
      else if (e.key === 'ArrowRight' && slots.length > 1) step(1);
      else if (e.key === 'z' || e.key === 'Z') toggleZoom();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const canvasHandlers = {
    onPointerDown: (e: PointerEvent) => {
      gesture.current = { startX: e.clientX, swiped: false };
    },
    onPointerMove: (e: PointerEvent) => {
      if (zoomed) aim(e);
    },
    onPointerUp: (e: PointerEvent) => {
      const dx = e.clientX - gesture.current.startX;
      if (!zoomed && slots.length > 1 && Math.abs(dx) > SWIPE_PX) {
        gesture.current.swiped = true;
        step(dx < 0 ? 1 : -1);
      }
    },
    onClick: (e: MouseEvent) => {
      if (gesture.current.swiped) {
        gesture.current.swiped = false;
        return;
      }
      if (!zoomed) aim(e);
      setZoomed((z) => !z);
    },
  };

  return (
    <div ref={rootRef} className="lightbox" role="dialog" aria-modal="true"
         aria-label={`${design.name} — xem toàn màn hình`}>
      <Aurora />
      <div className="lb-backdrop" />
      <div className="lb-panel glass">
        <header className="lb-bar">
          <div className="lb-title">
            <span className="eyebrow">{team.name} · {design.name}</span>
            <strong>{slot.label}</strong>
          </div>

          {slots.length > 1 && (
            <div ref={tabsRef} className="lb-tabs glass" role="tablist" aria-label="Mặt áo">
              <span className="lb-tab-indicator glass glass--refract glass--strong" style={indicator} aria-hidden="true" />
              {slots.map((s) => (
                <button
                  key={s.key}
                  data-view={s.key}
                  type="button"
                  role="tab"
                  aria-selected={s.key === view}
                  className={`lb-tab${s.key === view ? ' is-active' : ''}`}
                  onClick={() => goTo(s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <div className="lb-actions">
            <button className="icon-btn glass glass--refract" type="button" onClick={toggleZoom} aria-pressed={zoomed}
                    aria-label={zoomed ? 'Thu nhỏ' : 'Phóng to'} title={zoomed ? 'Thu nhỏ (Z)' : 'Phóng to (Z)'}>
              {zoomed ? <ZoomOutIcon /> : <ZoomInIcon />}
            </button>
            {canFullscreen && (
              <button className="icon-btn glass glass--refract" type="button" onClick={toggleFullscreen}
                      aria-label={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình trình duyệt'}
                      title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình trình duyệt'}>
                {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
              </button>
            )}
            <button className="icon-btn glass glass--refract" type="button" onClick={onClose} aria-label="Đóng" title="Đóng (Esc)" autoFocus>
              <CloseIcon />
            </button>
          </div>
        </header>

        <div className="lb-stage">
          {slots.length > 1 && (
            <button className="icon-btn lb-nav glass glass--refract" type="button" onClick={() => step(-1)} aria-label="Mặt áo trước đó">
              <PrevIcon />
            </button>
          )}

          <div className={`lb-canvas well${zoomed ? ' is-zoomed' : ''}`} {...canvasHandlers}>
            <Sparkles />
            <div ref={zoomRef} key={view} className="lb-zoom">
              <GarmentView view={design.views[view]!} label={`${design.name} — ${slot.label}`} />
            </div>
          </div>

          {slots.length > 1 && (
            <button className="icon-btn lb-nav glass glass--refract" type="button" onClick={() => step(1)} aria-label="Mặt áo tiếp theo">
              <NextIcon />
            </button>
          )}
        </div>

        <footer className="lb-footer">
          <ColorSwatches colors={colors} value={color} onChange={onColorChange} />
          <ColorCurrent colors={colors} value={color} />
          <span className="lb-hint">Nhấn vào áo để phóng to · ← → đổi mặt · Esc để đóng</span>
        </footer>
      </div>
    </div>
  );
}
