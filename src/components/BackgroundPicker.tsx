'use client';

import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/locale';
import { CheckIcon, PaletteIcon } from './icons';
import { useMenuDismiss } from './useMenuDismiss';

/**
 * Kiểu nền — CSS tương ứng ở mục "Hình nền" trong globals.css. Phần tử đầu tiên là mặc định.
 * Tên và mô tả theo ngôn ngữ ở `backgrounds` trong lib/i18n.ts.
 */
export const BACKGROUNDS = [{ id: 'sky' }, { id: 'ambient' }, { id: 'studio' }, { id: 'mono' }, { id: 'pitch' }] as const;

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
  const { t } = useI18n();

  useEffect(() => setActive(currentBackground()), []);

  useMenuDismiss(rootRef, open, setOpen);

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
        aria-label={t.changeBackground}
        title={t.background}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <PaletteIcon />
      </button>

      {open && (
        <div className="bg-menu glass glass--strong" role="menu" aria-label={t.background}>
          <p className="bg-menu-title">{t.background}</p>
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
                <strong>{t.backgrounds[bg.id].name}</strong>
                <small>{t.backgrounds[bg.id].desc}</small>
              </span>
              <span className="bg-option-check"><CheckIcon /></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
