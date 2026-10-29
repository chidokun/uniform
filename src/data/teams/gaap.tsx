import { GaapLogo } from '@/data/artwork/gaap';
import { JemiBusLogo } from '@/data/artwork/jemi-bus';
import { TiltedPenguin } from '@/data/artwork/tilted-penguin';
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
      description: 'Bản áo đen của Trẻ Trung — ngực trái là chữ GaaP có cánh cụt quàng khăn sau chữ P, sau lưng là cánh cụt 3D vẫy tay ló lên sau logo Zammy Verse; chữ in hồng #FF006E, mặt chữ để trống lộ màu áo.',
      tags: ['Cổ tròn', 'Tay ngắn'],
      designColor: '#1E2126', // đen
      views: {
        front: {
          template: 'tshirt-front',
          // ngực trái: logo GaaP + cánh cụt, viewBox 1400×580, giữ đúng tỉ lệ
          overlay: <image href={asset('/teams/gaap/gaap-penguin.svg')} x="211" y="109.35" width="90" height="37.3" />,
        },
        back: {
          template: 'tshirt-back',
          // cụm cánh cụt + chữ (đo trong viewBox 105 30 195 195: x 113…288, y 42…195) thu .9, căn giữa tại (200 150)
          // → đỉnh đầu cánh cụt cách bo cổ ~30, chữ không xuống quá thấp
          overlay: <image href={asset('/teams/gaap/zammyverse-penguin.svg')} x="113.96" y="70.35" width="175.5" height="175.5" />,
        },
      },
    },
    {
      id: 'canh-cut-trang',
      name: 'Cánh Cụt - Trắng',
      description: 'Áo thun cổ tròn trắng — logo GaaP ngực trái, cánh cụt 3D nghiêng ló nửa người từ gấu áo bên phải, logo chữ Hàn 제미 / 버스 in hồng #FF006E sau lưng.',
      tags: ['Cổ tròn', 'Tay ngắn'],
      designColor: '#F4F5F7', // trắng
      views: {
        front: {
          template: 'tshirt-front',
          overlay: (
            <>
              <GaapLogo transform="translate(256 126) scale(.18) translate(-181.5 -80.5)" />
              {/* sát gấu áo: dáng áo cắt phần dưới thắt lưng (và bàn chân) */}
              <TiltedPenguin transform="translate(112 418) scale(1.4)" />
            </>
          ),
        },
        back: {
          template: 'tshirt-back',
          overlay: <JemiBusLogo ink={PINK} transform="translate(200 165) scale(.52) translate(-108.5 -103.5)" />,
        },
      },
    },
    {
      id: 'cot-nha-den',
      name: 'Cợt Nhã - Đen',
      description: 'Áo đen in hồng #FF006E — logo Zammy Verse ngực trái, logo chữ Hàn 제미 / 버스 kiểu sticker sau lưng, mặt chữ để trống lộ màu áo.',
      tags: ['Cổ tròn', 'Tay ngắn'],
      designColor: '#1E2126', // đen
      views: {
        front: {
          template: 'tshirt-front',
          overlay: <ZammyVerse ink={PINK} paper="none" transform="translate(256 128) scale(.34) translate(-95.5 -56)" />,
        },
        back: {
          template: 'tshirt-back',
          overlay: <JemiBusLogo ink={PINK} paper="none" transform="translate(200 165) scale(.52) translate(-108.5 -103.5)" />,
        },
      },
    },
  ],
});
