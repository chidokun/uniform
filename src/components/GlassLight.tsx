'use client';

import { useEffect } from 'react';

/**
 * Vệt sáng trên kính chạy theo con trỏ: ghi vị trí con trỏ (--mx, --my) lên mặt kính đang rê chuột
 * và các lớp kính bao ngoài nó. CSS của .glass::after dùng 2 biến này cho vệt sáng phản chiếu.
 */
export function GlassLight() {
  useEffect(() => {
    let frame = 0;
    let last: PointerEvent | null = null;

    const paint = () => {
      frame = 0;
      if (!last || !(last.target instanceof Element)) return;
      let el = last.target.closest<HTMLElement>('.glass');
      while (el) {
        const box = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${((last.clientX - box.left) / box.width) * 100}%`);
        el.style.setProperty('--my', `${((last.clientY - box.top) / box.height) * 100}%`);
        el = el.parentElement?.closest<HTMLElement>('.glass') ?? null;
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
