import { GaapLogo } from '@/data/artwork/gaap';
import { PeekingPenguin } from '@/data/artwork/peeking-penguin';
import { asset } from '@/lib/asset';
import { defineTeam } from '@/lib/define-team';

const TSHIRT_TAGS = [{ vi: 'Cổ tròn', ko: '라운드넥' }, { vi: 'Tay ngắn', ko: '반팔' }];

/**
 * Đội GaaP
 *
 * Thêm mẫu mới: thêm 1 object vào `designs` (mẫu đầu tiên được chọn sẵn).
 * Xem README.md để biết các tuỳ chọn của view (template / overlay / image).
 * Chữ hiển thị (tên, mô tả, tag, tên màu) viết dạng `{ vi, ko }` để có bản tiếng Hàn.
 */
export default defineTeam({
  id: 'gaap',
  name: 'GaaP',
  shortName: 'GaaP',
  // logo: '/teams/gaap/logo.png',
  accent: '#6C5CE7',
  accent2: '#00B8FF',

  palette: [
    { name: { vi: 'Trắng', ko: '화이트' }, hex: '#F4F5F7' },
    { name: { vi: 'Đen', ko: '블랙' }, hex: '#1E2126' },
    { name: { vi: 'Xanh navy', ko: '네이비' }, hex: '#1F3A68' },
    { name: { vi: 'Xanh dương', ko: '블루' }, hex: '#2F80ED' },
    { name: { vi: 'Xanh ngọc', ko: '틸' }, hex: '#14B8A6' },
    { name: { vi: 'Xanh lá', ko: '그린' }, hex: '#27AE60' },
    { name: { vi: 'Vàng', ko: '옐로' }, hex: '#F2C94C' },
    { name: { vi: 'Cam', ko: '오렌지' }, hex: '#F2994A' },
    { name: { vi: 'Đỏ', ko: '레드' }, hex: '#E5484D' },
    { name: { vi: 'Hồng', ko: '핑크' }, hex: '#F78FB3' },
    { name: { vi: 'Tím', ko: '퍼플' }, hex: '#7B61FF' },
    { name: { vi: 'Xám', ko: '그레이' }, hex: '#9AA5B1' },
  ],

  designs: [
    {
      id: 'cut-met',
      name: { vi: 'Cụt Mệt', ko: '풋풋' },
      description: {
        vi: 'Áo thun cổ tròn trắng — logo GaaP ngực trái, sau lưng in lớn cánh cụt đội mũ chóp quàng khăn hồng chạy thở hồng hộc.',
        ko: '흰색 라운드넥 티셔츠 — 왼쪽 가슴에 GaaP 로고, 등에는 실크햇에 핑크 목도리를 두르고 헐떡이며 달리는 큰 펭귄.',
      },
      tags: TSHIRT_TAGS,
      designColor: '#F4F5F7', // trắng
      views: {
        front: {
          template: 'tshirt-front',
          // trái/phải tính theo người mặc: ngực trái = bên phải khi nhìn mặt trước
          overlay: <GaapLogo transform="translate(256 126) scale(.18) translate(-181.5 -80.5)" />,
        },
        back: {
          template: 'tshirt-back',
          // cánh cụt chạy mệt: ảnh đã cắt sát hình 1191×973, giữ đúng tỉ lệ, căn giữa x 200, đỉnh mũ cách bo cổ ~45
          overlay: <image href={asset('/teams/gaap/penguin-tired.webp')} x="141.5" y="95" width="117" height="95.58" />,
        },
        // shoulder: { template: 'sleeve' },  // mẫu nào có thiết kế ở vai thì khai báo thêm
      },
    },
    {
      id: 'cut-mung',
      name: { vi: 'Cụt Mừng', ko: '청춘' },
      featured: true,
      description: {
        vi: 'Áo thun cổ tròn đen — ngực trái là chữ GaaP trắng viền hồng với cánh cụt đội mũ chóp, quàng khăn hồng chạy theo sau; sau lưng là chữ Gấp nha em... viền hồng (lòng chữ lộ màu áo) kèm chú cánh cụt hồng nhỏ.',
        ko: '블랙 라운드넥 티셔츠 — 왼쪽 가슴에는 핑크 테두리의 흰색 GaaP 로고와 그 뒤를 달려오는 실크햇에 핑크 목도리를 두른 펭귄, 등에는 셔츠 색이 비치는 핑크 테두리 글자 Gấp nha em...과 작은 핑크 펭귄.',
      },
      tags: TSHIRT_TAGS,
      designColor: '#1E2126', // đen
      views: {
        front: {
          template: 'tshirt-front',
          // ngực trái: logo GaaP hồng #FF006E (cùng màu mặt sau) + cánh cụt chạy tung bụi, SVG đã cắt sát hình 1776×613, giữ đúng tỉ lệ, tâm (256 126)
          overlay: <image href={asset('/teams/gaap/gaap-pink.svg')} x="214" y="111.49" width="84" height="29.01" />,
        },
        back: {
          template: 'tshirt-back',
          // chữ GấP nha em... với cánh cụt hồng, phần trắng trong suốt (lộ màu áo), SVG đã cắt sát hình 1473×714, giữ đúng tỉ lệ, căn giữa x 200
          // → đỉnh chữ cách bo cổ ~60
          overlay: <image href={asset('/teams/gaap/gap-nha-em-penguin-transparent.svg')} x="120" y="111" width="160" height="77.51" />,
        },
      },
    },
    {
      id: 'cut-lo',
      name: { vi: 'Cụt Lỏ', ko: '펭귄' },
      description: {
        vi: 'Áo thun cổ tròn trắng — logo GaaP ngực trái, cánh cụt vẫy tay ló nửa người từ gấu áo bên phải, sau lưng để trơn.',
        ko: '흰색 라운드넥 티셔츠 — 왼쪽 가슴에 GaaP 로고, 오른쪽 밑단에서 상반신을 내밀고 손을 흔드는 펭귄, 등은 무지.',
      },
      tags: TSHIRT_TAGS,
      designColor: '#F4F5F7', // trắng
      views: {
        front: {
          template: 'tshirt-front',
          overlay: (
            <>
              <GaapLogo transform="translate(256 126) scale(.18) translate(-181.5 -80.5)" />
              {/* sát gấu áo: dáng áo cắt phần dưới thắt lưng (và bàn chân); x đủ xa sườn áo để không cụt tay đang vẫy */}
              <PeekingPenguin transform="translate(146 418) scale(1.4)" />
            </>
          ),
        },
        back: { template: 'tshirt-back' },
      },
    },
    {
      id: 'cut-buh',
      name: { vi: 'Cụt Bủh', ko: '헥헥' },
      description: {
        vi: 'Áo thun cổ tròn đen — giữa ngực in cánh cụt đội mũ chóp quàng khăn hồng chạy rạp người, lè lưỡi thở hồng hộc; sau lưng để trơn.',
        ko: '블랙 라운드넥 티셔츠 — 가슴 가운데에 실크햇에 핑크 목도리를 두르고 몸을 숙인 채 혀를 내밀고 헐떡이며 달리는 펭귄, 등은 무지.',
      },
      tags: TSHIRT_TAGS,
      designColor: '#1E2126', // đen
      views: {
        front: {
          template: 'tshirt-front',
          // cánh cụt chạy rạp người: ảnh đã cắt sát hình 1432×821, giữ đúng tỉ lệ, căn giữa x 200
          overlay: <image href={asset('/teams/gaap/penguin-exhausted.webp')} x="115" y="120" width="170" height="97.47" />,
        },
        back: { template: 'tshirt-back' },
      },
    },
  ],
});
