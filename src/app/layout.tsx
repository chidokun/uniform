import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Noto_Sans_KR } from 'next/font/google';
import type { ReactNode } from 'react';
import { GlassLight } from '@/components/GlassLight';
import { PrefsBoot } from '@/components/PrefsBoot';
import { SkyBackdrop } from '@/components/SkyBackdrop';
import { BOOT_SCRIPT } from '@/lib/boot';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { SITE_DESCRIPTION, SITE_NAME, SITE_OPEN_GRAPH, SITE_URL, openGraphImages } from '@/lib/site';
import './globals.css';

const font = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

/** Be Vietnam Pro không có chữ Hàn — trình duyệt lấy chữ Hàn từ font này (chỉ tải khi trang có chữ Hàn) */
const fontKo = Noto_Sans_KR({
  weight: ['400', '500', '700', '800'],
  variable: '--font-ko',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    ...SITE_OPEN_GRAPH,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: openGraphImages('/og.png', `${SITE_NAME} — ${SITE_DESCRIPTION}`),
  },
  twitter: { card: 'summary_large_image' },
};

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
    <html lang={DEFAULT_LOCALE} className={`${font.variable} ${fontKo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        <PrefsBoot />
        <GlassFilters />
        <GlassLight />
        <SkyBackdrop />
        {children}
      </body>
    </html>
  );
}
