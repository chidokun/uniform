import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import type { ReactNode } from 'react';
import { GlassLight } from '@/components/GlassLight';
import './globals.css';

const font = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Team Uniform', template: '%s · Team Uniform' },
  description: 'Showcase mẫu áo đồng phục đội',
};

/**
 * Chạy trước khi vẽ trang:
 * - áp dụng theme và hình nền đã lưu (chưa chọn thì dùng nền mặc định "sky"), tránh nháy
 * - bật khúc xạ kính (SVG filter trên backdrop) chỉ với Chromium — trình duyệt khác giữ kính mờ thường
 */
const BOOT_SCRIPT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('tu-theme');if(t==='light'||t==='dark')d.dataset.theme=t;var g=localStorage.getItem('tu-bg');if(/^(sky|ambient|studio|mono|pitch)$/.test(g))d.dataset.bg=g}catch(e){}if(!d.dataset.bg)d.dataset.bg='sky';var b=navigator.userAgentData&&navigator.userAgentData.brands;if(b&&b.some(function(x){return /Chrom/.test(x.brand)}))d.dataset.refract='on'})()`;

/** Bản đồ lệch cho hiệu ứng khúc xạ của .glass--refract */
function GlassFilters() {
  return (
    <svg className="lg-defs" aria-hidden="true" focusable="false">
      <filter id="lg-distort" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.011 0.015" numOctaves="2" seed="4" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
        <feDisplacementMap in="SourceGraphic" in2="soft" scale="46" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={font.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        <GlassFilters />
        <GlassLight />
        {children}
      </body>
    </html>
  );
}
