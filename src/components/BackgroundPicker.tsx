'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckIcon, PaletteIcon } from './icons';

/** Kiểu nền — CSS tương ứng ở mục "Hình nền" trong globals.css. Phần tử đầu tiên là mặc định. */
export const BACKGROUNDS = [
  { id: 'ambient', name: 'Ambient', desc: 'Studio, ánh theo màu áo' },
  { id: 'studio', name: 'Studio', desc: 'Trung tính, đèn rọi' },
  { id: 'mono', name: 'Đơn sắc', desc: 'Tông màu của đội' },
  { id: 'pitch', name: 'Sân cỏ', desc: 'Mặt sân & đèn sân vận động' },
] as const;

type BackgroundId = (typeof BACKGROUNDS)[number]['id'];

export const BACKGROUND_STORAGE_KEY = 'tu-bg';

function currentBackground(): BackgroundId {
  const set = document.documentElement.dataset.bg;
  return BACKGROUNDS.find((b) => b.id === set)?.id ?? BACKGROUNDS[0].id;
}

/** Nền lưu ở <html data-bg>; script trong layout áp dụng lựa chọn đã lưu trước khi vẽ trang. */
export function BackgroundPicker() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<BackgroundId | null>(null);

  useEffect(() => setActive(currentBackground()), []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (id: BackgroundId) => {
    document.documentElement.dataset.bg = id;
    try {
      localStorage.setItem(BACKGROUND_STORAGE_KEY, id);
    } catch {
      /* storage bị chặn — chỉ áp dụng cho phiên này */
    }
    setActive(id);
  };

  return (
    <div ref={rootRef} className="bg-picker">
      <button
        className="icon-btn glass glass--refract"
        type="button"
        aria-label="Đổi hình nền"
        title="Hình nền"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <PaletteIcon />
      </button>

      {open && (
        <div className="bg-menu glass glass--strong" role="menu" aria-label="Hình nền">
          <p className="bg-menu-title">Hình nền</p>
          {BACKGROUNDS.map((bg) => (
            <button
              key={bg.id}
              type="button"
              role="menuitemradio"
              aria-checked={bg.id === active}
              className={`bg-option${bg.id === active ? ' is-active' : ''}`}
              onClick={() => choose(bg.id)}
            >
              <span className={`bg-thumb bg-thumb--${bg.id}`} />
              <span className="bg-option-text">
                <strong>{bg.name}</strong>
                <small>{bg.desc}</small>
              </span>
              <span className="bg-option-check"><CheckIcon /></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
