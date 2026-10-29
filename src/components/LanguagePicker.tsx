'use client';

import { useRef, useState } from 'react';
import { LOCALES, type Locale } from '@/lib/i18n';
import { setLocale, useI18n } from '@/lib/locale';
import { CheckIcon } from './icons';
import { useMenuDismiss } from './useMenuDismiss';

/** Chọn ngôn ngữ giao diện — dùng chung kiểu menu với ô chọn hình nền */
export function LanguagePicker() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { locale, t } = useI18n();
  const current = LOCALES.find((l) => l.id === locale) ?? LOCALES[0];

  useMenuDismiss(rootRef, open, setOpen);

  const choose = (id: Locale) => {
    setLocale(id);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="bg-picker lang-picker">
      <button
        className="icon-btn lang-btn glass glass--refract"
        type="button"
        aria-label={t.changeLanguage}
        title={t.language}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {current.short}
      </button>

      {open && (
        <div className="bg-menu lang-menu glass glass--strong" role="menu" aria-label={t.language}>
          <p className="bg-menu-title">{t.language}</p>
          {LOCALES.map((l) => (
            <button
              key={l.id}
              type="button"
              role="menuitemradio"
              aria-checked={l.id === locale}
              lang={l.id}
              className={`bg-option${l.id === locale ? ' is-active' : ''}`}
              onClick={() => choose(l.id)}
            >
              <span className="lang-thumb">{l.short}</span>
              <span className="bg-option-text"><strong>{l.name}</strong></span>
              <span className="bg-option-check"><CheckIcon /></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
