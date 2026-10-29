'use client';

import { useLayoutEffect } from 'react';
import { applyStoredPrefs } from '@/lib/boot';

/**
 * Dự phòng cho BOOT_SCRIPT: trang chỉ redirect (/, /<đội>) được xuất tĩnh thành error shell không có <head>
 * của layout, React dựng lại trang ở client và script inline không chạy — thiếu data-bg thì CSS rơi về nền ambient.
 */
export function PrefsBoot() {
  useLayoutEffect(() => {
    if (!document.documentElement.dataset.bg) applyStoredPrefs();
  }, []);
  return null;
}
