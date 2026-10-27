const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Đường dẫn tới file trong /public (logo, ảnh thiết kế). Tự thêm basePath khi site chạy dưới
 * thư mục con như GitHub Pages — next/link tự làm việc này, còn <img src> thì không.
 */
export function asset(path: string): string {
  if (/^(https?:|data:|blob:)/.test(path) || !path.startsWith('/')) return path;
  return BASE_PATH + path;
}
