import { asset } from '@/lib/asset';

export const SITE_NAME = 'Team Uniform';
export const SITE_DESCRIPTION = 'Showcase mẫu áo đồng phục đội';

/**
 * Origin của site, để ghép URL tuyệt đối cho og:image (mạng xã hội không nhận đường dẫn tương đối).
 * Workflow deploy truyền vào qua SITE_URL (= base_url của GitHub Pages); chạy local dùng localhost.
 * Chỉ lấy origin: đường dẫn con (basePath) đã nằm trong URL ảnh, giữ lại sẽ bị lặp.
 */
export const SITE_URL = new URL(new URL(process.env.SITE_URL || 'http://localhost:3000').origin);

/** Kích thước ảnh og:image chuẩn (Facebook, Zalo, X, Slack…) */
export const OG_SIZE = { width: 1200, height: 630 };

/** Phần chung của openGraph — trang con khai báo openGraph sẽ thay cả object của layout nên phải gộp lại cái này */
export const SITE_OPEN_GRAPH = { type: 'website', siteName: SITE_NAME, locale: 'vi_VN' } as const;

/** og:image dựng sẵn bởi route og.png — trang chủ: '/og.png', đội: '/<đội>/og.png' */
export const openGraphImages = (path: string, alt: string) => [{ url: asset(path), ...OG_SIZE, alt, type: 'image/png' }];
