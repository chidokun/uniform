import { TEMPLATES } from '@/garments';
import { asset } from '@/lib/asset';
import type { DesignView } from '@/types/uniform';

/** Vẽ một mặt áo: template SVG (đổi màu được) hoặc ảnh có sẵn. */
export function GarmentView({ view, label }: { view: DesignView; label: string }) {
  if ('image' in view) {
    // eslint-disable-next-line @next/next/no-img-element -- ảnh thiết kế tự do kích thước, không cần tối ưu
    return <img className="garment garment--image" src={asset(view.image)} alt={label} />;
  }
  const Template = TEMPLATES[view.template];
  return <Template label={label} overlay={view.overlay} />;
}
