# Team Uniform

Website showcase áo đồng phục đội — Next.js 16 (App Router) + React 19 + TypeScript.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # xuất site tĩnh ra out/
```

URL: `/<đội>/<mẫu>/?color=<hex>` — vd `/gaap/blank/?color=2F80ED`. Mở `/` sẽ tự chuyển tới mẫu đầu tiên của đội đầu tiên.

## Deploy GitHub Pages

`npm run build` xuất site tĩnh ra `out/`. Workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
build và deploy mỗi lần push lên `main` (hoặc chạy tay ở tab Actions → *Deploy GitHub Pages* → *Run workflow*).

Thiết lập một lần:

1. Push code lên repo GitHub, nhánh `main`.
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Site chạy ở `https://<user>.github.io/<tên-repo>/`. Đường dẫn con `/<tên-repo>` được lấy tự động
(`actions/configure-pages` → biến `PAGES_BASE_PATH` → `basePath` trong `next.config.ts`), không cần sửa code
khi đổi tên repo.

### Tên miền riêng (vd `uniform.nguyentuan.dev`)

1. DNS của `nguyentuan.dev`: thêm bản ghi **CNAME** `uniform` → `<user>.github.io`
   (chỉ tên miền gốc, không kèm tên repo).
2. Repo → **Settings → Pages → Custom domain**: nhập `uniform.nguyentuan.dev` → Save, đợi kiểm tra DNS xong
   rồi bật **Enforce HTTPS**.
3. Chạy lại workflow (push mới hoặc *Run workflow*).

Khi đã có tên miền riêng, `configure-pages` trả về đường dẫn gốc rỗng nên site tự build chạy ở `/` —
cùng một workflow dùng được cho cả hai kiểu. Không cần file `CNAME` trong repo: deploy bằng GitHub Actions
lấy tên miền từ phần Settings. Nên xác minh tên miền ở **Settings (tài khoản) → Pages → Verified domains**
để không ai khác dùng được subdomain của bạn.

Thử bản build giống GitHub Pages ở máy:

```bash
PAGES_BASE_PATH=/team-uniform npm run build   # như project page; bỏ biến này để thử kiểu tên miền riêng
```

Ảnh trong `public/` (logo, ảnh thiết kế) khai báo bằng đường dẫn tuyệt đối như `/teams/gaap/logo.png` —
`asset()` trong `src/lib/asset.ts` tự thêm đường dẫn con khi cần.

## Cấu trúc

```
src/
  app/                       Route: / → /[teamId] → /[teamId]/[designId]
  data/teams/index.ts        Danh sách đội (đội đầu tiên được chọn sẵn)
  data/teams/gaap.tsx        Cấu hình đội GaaP và các mẫu của đội
  garments/                  Template áo SVG: tshirt-front, tshirt-back, sleeve
  components/                Giao diện (không cần sửa khi thêm đội/mẫu)
  lib/catalog.ts             Truy vấn đội/mẫu/màu
  types/uniform.ts           Kiểu dữ liệu Team, Design, DesignView
```

## Thêm mẫu thiết kế

Thêm một object vào `designs` trong `src/data/teams/<đội>.tsx`:

```tsx
{
  id: 'classic-10',                 // dùng trên URL, không trùng trong đội
  name: 'Classic số 10',
  description: 'Logo ngực trái, số lớn sau lưng.',
  tags: ['Mùa 2026'],
  defaultColor: '#2F80ED',          // tuỳ chọn, mặc định = màu đầu tiên của bảng màu
  colors: [ ... ],                  // tuỳ chọn, mặc định = palette của đội
  views: {
    front: {
      template: 'tshirt-front',
      overlay: <text className="ink" x="250" y="130" fontSize="22" fontWeight="800">GaaP</text>,
    },
    back: {
      template: 'tshirt-back',
      overlay: <text className="ink" x="200" y="260" textAnchor="middle" fontSize="120" fontWeight="800">10</text>,
    },
    shoulder: { template: 'sleeve', overlay: <circle className="ink" cx="200" cy="220" r="40" /> },
    // không khai báo shoulder → khung Vai tự ẩn
  },
}
```

- **overlay**: JSX SVG trên hệ toạ độ `0 0 400 460`, tự cắt theo dáng áo và được phủ nếp vải, đổ bóng.
  `className="ink"` (hoặc `ink-stroke`) tô bằng màu tương phản, tự đổi trắng/đen theo màu áo;
  `style={{ fill: 'var(--shirt)' }}` để dùng chính màu áo.
- **image**: thay cho template nếu đã có ảnh thiết kế. Đặt ảnh trong `public/` rồi khai báo
  `front: { image: '/teams/gaap/classic/front.png' }`. Ảnh không đổi màu theo ô chọn màu.
- Sidebar dùng mặt trước làm ảnh thu nhỏ.

## Thêm đội

1. Copy `src/data/teams/gaap.tsx` thành `src/data/teams/<id>.tsx`, sửa `id`, `name`, `accent` (màu nhấn
   giao diện khi chọn đội), `palette`, `designs`. Logo đặt trong `public/` rồi khai báo `logo: '/teams/<id>/logo.png'`.
2. Thêm vào `src/data/teams/index.ts`:
   ```ts
   import phoenix from './phoenix';
   export const TEAMS: Team[] = [gaap, phoenix];
   ```

`defineTeam()` sẽ báo lỗi ngay khi build nếu trùng id mẫu hoặc sai mã màu.

## Thêm kiểu áo mới (polo, jersey, hoodie…)

Tạo component trong `src/garments/` dùng `<Garment>` (đã lo sẵn tô màu, đổ bóng, bóng loáng, cắt overlay),
rồi khai báo trong `TEMPLATES` ở `src/garments/index.ts`. Tên template mới sẽ tự có gợi ý kiểu trong TypeScript.

```tsx
export function PoloFront(props: GarmentProps) {
  return <Garment {...props} body="M…Z" ground={{ cx: 200, cy: 440, rx: 125, ry: 9 }} details={…} seams={…} />;
}
```

Trong template: phần tô màu áo dùng `className="g-fill"`, đường may dùng `g-line` / `g-stitch`.

## Giao diện Liquid Glass

Mọi bề mặt dùng chung vật liệu kính trong `src/app/globals.css`:

- `glass` — kính mờ + bão hoà màu nền phía sau, viền bắt sáng, vệt sáng chạy theo con trỏ
  (component `GlassLight`), nhấn có độ nảy đàn hồi. Bo góc đặt bằng biến `--r`.
- `glass--refract` — thêm khúc xạ: nền phía sau bị bẻ cong qua kính (SVG filter `#lg-distort` trong
  `layout.tsx`). Chỉ bật trên trình duyệt Chromium; Safari/Firefox vẫn có kính mờ thường. Nên dùng cho
  phần tử nhỏ và vừa (nút, chip, thanh trên) vì bộ lọc tốn GPU.
- `glass--strong` / `is-active` — kính đậm hơn cho trạng thái được chọn.
- `well` — vùng lõm đặt áo, ánh màu áo đang chọn hắt lên nền.

### Hình nền

Nút bảng màu trên thanh trên đổi hình nền; lựa chọn lưu trong trình duyệt (`localStorage` key `tu-bg`).

| id | Mô tả |
|---|---|
| `ambient` (mặc định) | Studio trung tính, ánh theo màu áo đang chọn |
| `studio` | Trung tính, đèn rọi từ trên + tối viền |
| `mono` | Đơn sắc theo `accent` của đội |
| `pitch` | Mặt sân cỏ, vạch sân, đèn sân vận động |

Thêm kiểu nền mới:
1. Khai báo trong `BACKGROUNDS` ở `src/components/BackgroundPicker.tsx` (phần tử đầu tiên là mặc định).
2. Viết CSS `:root[data-bg="<id>"] .aurora { … }` và ảnh thu nhỏ `.bg-thumb--<id>` trong `globals.css`.
3. Thêm `<id>` vào biểu thức `/^(ambient|studio|mono|pitch)$/` của `BOOT_SCRIPT` trong `src/app/layout.tsx`.

## Xem toàn màn hình

Bấm vào áo (hoặc nút ⤢ ở góc) để mở khung lớn: tab / nút ‹ › / phím ← → / vuốt để đổi mặt,
bấm vào áo hoặc phím Z để phóng to tại điểm bấm (rê chuột để di chuyển), đổi màu ngay trong khung,
nút ⛶ để bật fullscreen của trình duyệt, Esc để đóng.
