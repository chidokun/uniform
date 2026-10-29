'use client';

import { useSyncExternalStore } from 'react';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, MESSAGES, isLocale, tx, type Locale, type Text } from './i18n';

/*
 * Ngôn ngữ đang dùng lưu ở <html lang>; script trong layout áp dụng lựa chọn đã lưu (hoặc ngôn ngữ trình duyệt)
 * trước khi vẽ trang. HTML tĩnh luôn là ngôn ngữ mặc định, sau khi hydrate mới đổi sang ngôn ngữ đã chọn.
 */

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const read = (): Locale => {
  const lang = document.documentElement.lang;
  return isLocale(lang) ? lang : DEFAULT_LOCALE;
};

export function setLocale(locale: Locale) {
  document.documentElement.lang = locale;
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* storage bị chặn — chỉ áp dụng cho phiên này */
  }
  listeners.forEach((listener) => listener());
}

export const useLocale = () => useSyncExternalStore(subscribe, read, () => DEFAULT_LOCALE);

/** `t`: chữ giao diện theo ngôn ngữ đang dùng, `tx`: dịch chữ trong dữ liệu đội/mẫu */
export function useI18n() {
  const locale = useLocale();
  return { locale, t: MESSAGES[locale], tx: (text: Text) => tx(text, locale) };
}
