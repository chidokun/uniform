'use client';

import { useEffect, type RefObject } from 'react';

/** Đóng menu thả xuống khi bấm ra ngoài `rootRef` hoặc nhấn Esc */
export function useMenuDismiss(rootRef: RefObject<HTMLElement | null>, open: boolean, setOpen: (open: boolean) => void) {
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
  }, [rootRef, open, setOpen]);
}
