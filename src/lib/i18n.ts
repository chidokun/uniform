/** Ngôn ngữ giao diện. Phần tử đầu tiên là mặc định (HTML tĩnh được dựng bằng ngôn ngữ này). */
export const LOCALES = [
  { id: 'vi', name: 'Tiếng Việt', short: 'VI' },
  { id: 'ko', name: '한국어', short: 'KO' },
] as const;

export type Locale = (typeof LOCALES)[number]['id'];

export const DEFAULT_LOCALE: Locale = LOCALES[0].id;
export const LOCALE_STORAGE_KEY = 'tu-lang';

export const isLocale = (value: unknown): value is Locale => LOCALES.some((l) => l.id === value);

/**
 * Chữ trong dữ liệu đội/mẫu: chuỗi thường (giống nhau ở mọi ngôn ngữ) hoặc bản dịch theo ngôn ngữ,
 * vd `{ vi: 'Trắng', ko: '화이트' }`. Thiếu bản dịch thì dùng tiếng Việt.
 */
export type Text = string | ({ vi: string } & Partial<Record<Locale, string>>);

export const tx = (text: Text, locale: Locale): string =>
  typeof text === 'string' ? text : text[locale] ?? text.vi;

const pad = (n: number) => String(n).padStart(2, '0');

const vi = {
  homeLabel: 'Team Uniform — trang chủ',
  tagline: 'Showcase áo đội',
  team: 'Đội',
  chooseTeam: 'Chọn đội',

  language: 'Ngôn ngữ',
  changeLanguage: 'Đổi ngôn ngữ',
  background: 'Hình nền',
  changeBackground: 'Đổi hình nền',
  toggleTheme: 'Đổi giao diện sáng / tối',
  backgrounds: {
    sky: { name: 'Bầu trời', desc: 'Mây trôi trên trời xanh' },
    ambient: { name: 'Ambient', desc: 'Studio, ánh theo màu áo' },
    studio: { name: 'Studio', desc: 'Trung tính, đèn rọi' },
    mono: { name: 'Đơn sắc', desc: 'Tông màu của đội' },
    pitch: { name: 'Sân cỏ', desc: 'Mặt sân & đèn sân vận động' },
  },

  views: { front: 'Mặt trước', back: 'Mặt sau', shoulder: 'Vai' },

  designs: 'Mẫu thiết kế',
  designList: 'Danh sách mẫu thiết kế',
  teamHasNoDesigns: 'Đội này chưa có mẫu thiết kế.',
  designIndex: (n: number) => `MẪU ${pad(n)}`,
  designEyebrow: (team: string, n: number) => `${team} · Mẫu ${pad(n)}`,
  noDesigns: 'Chưa có mẫu thiết kế',
  addDesignsHint: (team: string, file: string) => `Thêm mẫu cho đội ${team} trong ${file}`,

  viewFullscreen: 'Xem toàn màn hình',
  viewSideFullscreen: (side: string) => `Xem ${side.toLowerCase()} toàn màn hình`,

  chooseShirtColor: 'Chọn màu áo',
  shirtColor: 'Màu áo',
  customColor: 'Màu tùy chỉnh',
  chooseCustomColor: 'Chọn màu tùy chỉnh',
  custom: 'Tùy chỉnh',
  designColors: 'Màu của mẫu',
  previewOtherColors: 'Xem trước màu khác',
  designColor: 'Màu mẫu',
  preview: 'Xem trước',

  lightboxLabel: (design: string) => `${design} — xem toàn màn hình`,
  shirtSides: 'Mặt áo',
  zoomIn: 'Phóng to',
  zoomOut: 'Thu nhỏ',
  enterFullscreen: 'Toàn màn hình trình duyệt',
  exitFullscreen: 'Thoát toàn màn hình',
  close: 'Đóng',
  prevSide: 'Mặt áo trước đó',
  nextSide: 'Mặt áo tiếp theo',
  lightboxHint: 'Nhấn vào áo để phóng to · ← → đổi mặt · Esc để đóng',

  notFound: 'Không tìm thấy đội hoặc mẫu thiết kế',
  backHome: 'Về trang chủ',
};

export type Messages = typeof vi;

const ko: Messages = {
  homeLabel: 'Team Uniform — 홈',
  tagline: '팀 유니폼 쇼케이스',
  team: '팀',
  chooseTeam: '팀 선택',

  language: '언어',
  changeLanguage: '언어 변경',
  background: '배경',
  changeBackground: '배경 변경',
  toggleTheme: '라이트 / 다크 모드 전환',
  backgrounds: {
    sky: { name: '하늘', desc: '푸른 하늘에 떠가는 구름' },
    ambient: { name: '앰비언트', desc: '셔츠 색을 따라 빛나는 스튜디오' },
    studio: { name: '스튜디오', desc: '중립 톤, 스포트라이트' },
    mono: { name: '단색', desc: '팀 컬러 톤' },
    pitch: { name: '잔디 구장', desc: '그라운드와 경기장 조명' },
  },

  views: { front: '앞면', back: '뒷면', shoulder: '어깨' },

  designs: '디자인',
  designList: '디자인 목록',
  teamHasNoDesigns: '이 팀에는 아직 디자인이 없습니다.',
  designIndex: (n) => `디자인 ${pad(n)}`,
  designEyebrow: (team, n) => `${team} · 디자인 ${pad(n)}`,
  noDesigns: '아직 디자인이 없습니다',
  addDesignsHint: (team, file) => `${file}에서 ${team} 팀의 디자인을 추가하세요`,

  viewFullscreen: '전체 화면으로 보기',
  viewSideFullscreen: (side) => `${side} 전체 화면으로 보기`,

  chooseShirtColor: '셔츠 색상 선택',
  shirtColor: '셔츠 색상',
  customColor: '사용자 지정 색상',
  chooseCustomColor: '사용자 지정 색상 선택',
  custom: '사용자 지정',
  designColors: '디자인 색상',
  previewOtherColors: '다른 색상 미리보기',
  designColor: '디자인 색상',
  preview: '미리보기',

  lightboxLabel: (design) => `${design} — 전체 화면 보기`,
  shirtSides: '셔츠 면',
  zoomIn: '확대',
  zoomOut: '축소',
  enterFullscreen: '브라우저 전체 화면',
  exitFullscreen: '전체 화면 종료',
  close: '닫기',
  prevSide: '이전 면',
  nextSide: '다음 면',
  lightboxHint: '셔츠를 눌러 확대 · ← → 면 전환 · Esc 닫기',

  notFound: '팀 또는 디자인을 찾을 수 없습니다',
  backHome: '홈으로',
};

export const MESSAGES: Record<Locale, Messages> = { vi, ko };
