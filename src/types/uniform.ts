import type { ReactNode } from 'react';
import type { TemplateName } from '@/garments';

export interface ColorOption {
  name: string;
  /** Mã hex, vd "#1F3A68" */
  hex: string;
}

export type ViewKey = 'front' | 'back' | 'shoulder';

/** Vẽ bằng template SVG — đổi màu được theo ô chọn màu. */
export interface TemplateView {
  template: TemplateName;
  /**
   * Họa tiết vẽ đè lên phôi áo, hệ toạ độ viewBox 0 0 400 460, tự cắt theo dáng áo.
   * Dùng className="ink" để tô bằng màu tương phản với màu áo.
   */
  overlay?: ReactNode;
}

/** Ảnh thiết kế có sẵn (png/jpg/svg trong /public) — không đổi màu. */
export interface ImageView {
  image: string;
}

export type DesignView = TemplateView | ImageView;

export interface Design {
  /** Dùng trên URL, không trùng trong đội */
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  /** Bảng màu riêng của mẫu (mặc định dùng palette của đội) */
  colors?: ColorOption[];
  /**
   * Màu gốc của mẫu (màu áo thật khi in). Bảng màu được chia 2 nhóm: màu của mẫu
   * và các màu còn lại để người xem thử. Nếu không có trong bảng màu sẽ được thêm vào.
   */
  designColor?: string;
  /** Màu chọn sẵn (mặc định là màu của mẫu, không có thì màu đầu tiên của bảng màu) */
  defaultColor?: string;
  /** Mặt nào không khai báo thì không hiển thị */
  views: {
    front: DesignView;
    back?: DesignView;
    shoulder?: DesignView;
  };
}

export interface Team {
  /** Dùng trên URL, vd "gaap" */
  id: string;
  name: string;
  /** Chữ viết tắt trong huy hiệu khi chưa có logo */
  shortName?: string;
  /** Đường dẫn ảnh logo trong /public, vd "/teams/gaap/logo.png" */
  logo?: string;
  /** Màu nhấn của giao diện khi chọn đội này */
  accent: string;
  accent2?: string;
  /** Bảng màu áo mặc định cho mọi mẫu của đội */
  palette: ColorOption[];
  /** Mẫu đầu tiên được chọn sẵn */
  designs: Design[];
}
