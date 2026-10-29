import { GaapLogo } from '@/data/artwork/gaap';
import { JemiBusLogo } from '@/data/artwork/jemi-bus';
import { PeekingPenguin } from '@/data/artwork/peeking-penguin';
import { ZammyVerse } from '@/data/artwork/zammy-verse';
import { asset } from '@/lib/asset';
import { defineTeam } from '@/lib/define-team';

/** Hồng của logo trên áo đen */
const PINK = '#FF006E';

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
      id: 'tre-trung-trang',
      name: { vi: 'Tươi Trẻ', ko: '풋풋' },
      description: {
        vi: 'Áo thun cổ tròn trắng — logo GaaP ngực trái, chim cánh cụt bụng phải, logo Zammy Verse sau lưng.',
        ko: '흰색 라운드넥 티셔츠 — 왼쪽 가슴에 GaaP 로고, 오른쪽 배 부분에 펭귄, 등에 Zammy Verse 로고.',
      },
      tags: TSHIRT_TAGS,
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
      name: { vi: 'Trẻ Trung', ko: '청춘' },
      description: {
        vi: 'Áo thun cổ tròn đen — ngực trái là chữ GaaP có cánh cụt quàng khăn sau chữ P, sau lưng là cánh cụt 3D vẫy tay ló lên sau logo Zammy Verse; chữ in hồng #FF006E, mặt chữ để trống lộ màu áo.',
        ko: '블랙 라운드넥 티셔츠 — 왼쪽 가슴에는 P 뒤로 목도리를 두른 펭귄이 숨은 GaaP 로고, 등에는 Zammy Verse 로고 뒤로 고개를 내밀고 손을 흔드는 3D 펭귄; 글자는 핑크 #FF006E로 인쇄하고 글자 안쪽은 비워 셔츠 색이 드러납니다.',
      },
      tags: TSHIRT_TAGS,
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
      name: { vi: 'Cánh Cụt', ko: '펭귄' },
      description: {
        vi: 'Áo thun cổ tròn trắng — logo GaaP ngực trái, cánh cụt 3D vẫy tay ló nửa người từ gấu áo bên phải, logo chữ Hàn 재미 / 버스 in hồng #FF006E sau lưng.',
        ko: '흰색 라운드넥 티셔츠 — 왼쪽 가슴에 GaaP 로고, 오른쪽 밑단에서 상반신을 내밀고 손을 흔드는 3D 펭귄, 등에는 핑크 #FF006E로 인쇄한 한글 로고 재미 / 버스.',
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
        back: {
          template: 'tshirt-back',
          overlay: <JemiBusLogo ink={PINK} transform="translate(200 165) scale(.52) translate(-108.5 -103.5)" />,
        },
      },
    },
    {
      id: 'cot-nha-den',
      name: { vi: 'Cợt Nhã', ko: '장난꾸러기' },
      description: {
        vi: 'Áo đen in hồng #FF006E — logo Zammy Verse ngực trái, logo chữ Hàn 재미 / 버스 kiểu sticker sau lưng, mặt chữ để trống lộ màu áo.',
        ko: '핑크 #FF006E로 인쇄한 블랙 티셔츠 — 왼쪽 가슴에 Zammy Verse 로고, 등에는 스티커 스타일의 한글 로고 재미 / 버스, 글자 안쪽은 비워 셔츠 색이 드러납니다.',
      },
      tags: TSHIRT_TAGS,
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
    {
      id: 'trung-tre',
      name: { vi: 'Trủng Tre', ko: '춘청' },
      description: {
        vi: 'Trẻ Trung đảo mặt trên áo trắng — mặt trước in lớn cánh cụt 3D vẫy tay ló lên sau logo Zammy Verse, sau lưng là chữ GaaP nhỏ có cánh cụt quàng khăn sau chữ P, căn giữa; chữ in hồng #FF006E, mặt chữ để trống lộ màu áo.',
        ko: '청춘의 앞뒤를 바꾼 화이트 버전 — 앞면에는 Zammy Verse 로고 뒤로 고개를 내밀고 손을 흔드는 3D 펭귄을 크게, 등 가운데에는 P 뒤로 목도리를 두른 펭귄이 숨은 작은 GaaP 로고; 글자는 핑크 #FF006E로 인쇄하고 글자 안쪽은 비워 셔츠 색이 드러납니다.',
      },
      tags: TSHIRT_TAGS,
      designColor: '#F4F5F7', // trắng
      views: {
        front: {
          template: 'tshirt-front',
          // cụm cánh cụt + chữ cùng cỡ với mặt sau của Trẻ Trung, căn giữa tại (200 170): bo cổ trước sâu hơn
          // bo cổ sau ~20 nên hạ xuống 20 để đỉnh đầu cánh cụt vẫn cách bo cổ ~30
          overlay: <image href={asset('/teams/gaap/zammyverse-penguin.svg')} x="113.96" y="90.35" width="175.5" height="175.5" />,
        },
        back: {
          template: 'tshirt-back',
          // logo GaaP + cánh cụt cùng cỡ và độ cao với ngực trái của Trẻ Trung, căn giữa theo phần có nét
          // (viewBox 1400×580, phần có nét: x 6.6…90.9% → tâm 48.7%)
          overlay: <image href={asset('/teams/gaap/gaap-penguin.svg')} x="156.16" y="109.35" width="90" height="37.3" />,
        },
      },
    },
  ],
});
