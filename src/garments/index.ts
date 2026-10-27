import type { ComponentType } from 'react';
import type { GarmentProps } from './Garment';
import { Sleeve } from './sleeve';
import { TshirtBack, TshirtFront } from './tshirt';

/**
 * Template áo dùng được trong `views` của mẫu thiết kế.
 * Thêm kiểu áo mới (polo, jersey…): tạo component dùng <Garment> rồi khai báo ở đây.
 */
export const TEMPLATES = {
  'tshirt-front': TshirtFront,
  'tshirt-back': TshirtBack,
  sleeve: Sleeve,
} satisfies Record<string, ComponentType<GarmentProps>>;

export type TemplateName = keyof typeof TEMPLATES;

export { Garment, type GarmentProps } from './Garment';
