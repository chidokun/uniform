/**
 * Chạy trước khi vẽ trang:
 * - áp dụng theme và hình nền đã lưu (chưa chọn thì dùng nền mặc định "sky"), tránh nháy
 * - áp dụng ngôn ngữ đã lưu lên <html lang>; chưa chọn thì dùng tiếng Hàn nếu trình duyệt đang để tiếng Hàn
 * - bật khúc xạ kính (SVG filter trên backdrop) chỉ với Chromium — trình duyệt khác giữ kính mờ thường
 *
 * Hàm được nhúng nguyên văn vào <head> bằng toString() nên phải tự đứng một mình: không import, không biến ngoài.
 */
export function applyStoredPrefs() {
  const d = document.documentElement;
  let lang: string | null = null;
  try {
    lang = localStorage.getItem('tu-lang');
    const t = localStorage.getItem('tu-theme');
    if (t === 'light' || t === 'dark') d.dataset.theme = t;
    const g = localStorage.getItem('tu-bg');
    if (g && /^(sky|ambient|studio|mono|pitch)$/.test(g)) d.dataset.bg = g;
  } catch {
    /* storage bị chặn — dùng mặc định */
  }
  if (!d.dataset.bg) d.dataset.bg = 'sky';
  if (lang !== 'vi' && lang !== 'ko') lang = /^ko\b/i.test(navigator.language) ? 'ko' : null;
  if (lang) d.lang = lang;
  const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
  if (brands?.some((x) => /Chrom/.test(x.brand))) d.dataset.refract = 'on';
}

export const BOOT_SCRIPT = `(${applyStoredPrefs.toString()})()`;
