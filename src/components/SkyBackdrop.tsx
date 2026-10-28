'use client';

import { useEffect, useState } from 'react';

/** Video mây trôi cho nền "sky" — Pexels #6772137 */
const SKY_VIDEO = 'https://videos.pexels.com/video-files/6772137/6772137-hd_1920_1080_30fps.mp4';

/** Theo dõi <html data-bg> để chỉ tải video khi đang chọn nền "sky" */
function useIsSky() {
  const [sky, setSky] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setSky(root.dataset.bg === 'sky');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-bg'] });
    return () => observer.disconnect();
  }, []);

  return sky;
}

/**
 * Lớp trời mây của nền "sky", đặt ở layout gốc để video chạy liên tục khi đổi mẫu
 * (Showcase dựng lại theo từng mẫu). .aurora của trang trong suốt ở nền này để lộ lớp bên dưới.
 */
export function SkyBackdrop() {
  const sky = useIsSky();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => setReduceMotion(matchMedia('(prefers-reduced-motion: reduce)').matches), []);

  return (
    <div className="sky-backdrop" aria-hidden="true">
      {sky && (
        <video
          src={SKY_VIDEO}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
        />
      )}
    </div>
  );
}
