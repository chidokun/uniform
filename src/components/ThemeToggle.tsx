'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/locale';
import { MoonIcon, SunIcon } from './icons';

type Theme = 'light' | 'dark';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === 'light' || set === 'dark') return set;
  return matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

/** Theme lưu ở <html data-theme>; script trong layout áp dụng lựa chọn đã lưu trước khi vẽ trang. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const { t } = useI18n();

  useEffect(() => {
    const sync = () => setTheme(currentTheme());
    sync();
    const media = matchMedia(DARK_QUERY);
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const toggle = () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('tu-theme', next);
    } catch {
      /* storage bị chặn — chỉ áp dụng cho phiên này */
    }
    setTheme(next);
  };

  return (
    <button className="icon-btn glass glass--refract" type="button" onClick={toggle} aria-label={t.toggleTheme} title={t.toggleTheme}>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
