import type { NextConfig } from 'next';

/**
 * Đường dẫn gốc khi site chạy dưới thư mục con, vd GitHub Pages dạng project: /<tên-repo>.
 * Workflow deploy truyền vào qua PAGES_BASE_PATH; chạy local để trống.
 */
const basePath = process.env.PAGES_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  // Xuất site tĩnh ra ./out để host trên GitHub Pages
  output: 'export',
  // /gaap/blank/ → gaap/blank/index.html, khớp cách GitHub Pages phục vụ file
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
