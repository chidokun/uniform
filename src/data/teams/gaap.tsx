import { GaapLogo } from '@/data/artwork/gaap';
import { ZammyVerse } from '@/data/artwork/zammy-verse';
import { asset } from '@/lib/asset';
import { defineTeam } from '@/lib/define-team';

/** Hồng của logo trên áo đen */
const PINK = '#FF006E';

/**
 * Đội GaaP
 *
 * Thêm mẫu mới: thêm 1 object vào `designs` (mẫu đầu tiên được chọn sẵn).
 * Xem README.md để biết các tuỳ chọn của view (template / overlay / image).
 */
export default defineTeam({
  id: 'gaap',
  name: 'GaaP',
  shortName: 'GaaP',
  // logo: '/teams/gaap/logo.png',
  accent: '#6C5CE7',
  accent2: '#00B8FF',

  palette: [
    { name: 'Trắng', hex: '#F4F5F7' },
    { name: 'Đen', hex: '#1E2126' },
    { name: 'Xanh navy', hex: '#1F3A68' },
    { name: 'Xanh dương', hex: '#2F80ED' },
    { name: 'Xanh ngọc', hex: '#14B8A6' },
    { name: 'Xanh lá', hex: '#27AE60' },
    { name: 'Vàng', hex: '#F2C94C' },
    { name: 'Cam', hex: '#F2994A' },
    { name: 'Đỏ', hex: '#E5484D' },
    { name: 'Hồng', hex: '#F78FB3' },
    { name: 'Tím', hex: '#7B61FF' },
    { name: 'Xám', hex: '#9AA5B1' },
  ],

  designs: [
    {
      id: 'tre-trung-trang',
      name: 'Trẻ Trung - Trắng',
      description: 'Áo thun cổ tròn trắng — logo GaaP ngực trái, chim cánh cụt bụng phải, logo Zammy Verse sau lưng.',
      tags: ['Cổ tròn', 'Tay ngắn'],
      designColor: '#F4F5F7', // trắng
      views: {
        front: {
          template: 'tshirt-front',
          // trái/phải tính theo người mặc: ngực trái = bên phải khi nhìn mặt trước, bụng phải = bên trái
          overlay: (
            <>
              <GaapLogo transform="translate(256 126) scale(.18) translate(-181.5 -80.5)" />
              {/* chim cánh cụt: SVG trace từ ảnh 842×1162, giữ đúng tỉ lệ */}
              <image href={asset('/teams/gaap/penguin.svg')} x="96" y="248" width="102" height="141" />
            </>
          ),
        },
        back: {
          template: 'tshirt-back',
          overlay: <ZammyVerse transform="translate(200 150) scale(.92) translate(-95.5 -56)" />,
        },
        // shoulder: { template: 'sleeve' },  // mẫu nào có thiết kế ở vai thì khai báo thêm
      },
    },
    {
      id: 'tre-trung-den',
      name: 'Trẻ Trung - Đen',
      description: 'Bản áo đen của Trẻ Trung — logo GaaP và Zammy Verse in hồng #FF006E, mặt chữ để trống lộ màu áo.',
      tags: ['Cổ tròn', 'Tay ngắn'],
      designColor: '#1E2126', // đen
      views: {
        front: {
          template: 'tshirt-front',
          overlay: (
            <>
              <GaapLogo ink={PINK} paper="none" transform="translate(256 126) scale(.18) translate(-181.5 -80.5)" />
              <image href={asset('/teams/gaap/penguin.svg')} x="96" y="248" width="102" height="141" />
            </>
          ),
        },
        back: {
          template: 'tshirt-back',
          overlay: <ZammyVerse ink={PINK} paper="none" transform="translate(200 150) scale(.92) translate(-95.5 -56)" />,
        },
      },
    },
  ],
});
