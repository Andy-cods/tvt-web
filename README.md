# TVT — Website in 3D theo yêu cầu (POD)

**Web:** https://andy-cods.github.io/tvt-web/

Website tĩnh nhiều trang cho thương hiệu **TVT 3D Print Atelier**. Không cần framework, không cần cài thư viện: chỉ HTML, CSS, JS thuần. Upload thư mục `public/` lên bất kỳ hosting tĩnh nào là chạy.

## Cấu trúc

```
tvt-web/
├── src/
│   ├── data.mjs            ← nội dung tiếng Việt + thông tin liên hệ (site)
│   ├── data.en.mjs         ← nội dung tiếng Anh (cùng cấu trúc, cùng slug)
│   ├── build.mjs           ← sinh trang HTML vào public/ (VI) và public/en/ (EN); chữ giao diện nằm trong UI/P
│   └── render-images.mjs   ← (tuỳ chọn) render lại ảnh minh hoạ 3D
└── public/                 ← thư mục deploy
    ├── *.html              ← 35 trang tiếng Việt (được sinh ra, đừng sửa tay)
    ├── en/*.html           ← 35 trang tiếng Anh
    ├── sitemap.xml, robots.txt
    └── assets/
        ├── style.css, main.js, hero3d.js, favicon.svg
        └── img/*.png       ← ảnh sản phẩm (đang là ảnh render minh hoạ)
```

## Danh sách trang

| Nhóm | Trang |
|---|---|
| Chính | Trang chủ, Về chúng tôi, Quy trình, Tác phẩm (có bộ lọc), Vật liệu, Báo giá (công cụ ước tính + gói), Hỏi đáp, Liên hệ, 404 |
| Dịch vụ | Tổng quan + 6 trang: Print on Demand, In FDM, In resin, Thiết kế 3D, Hậu kỳ & sơn, Sản xuất loạt nhỏ |
| Giải pháp | Tổng quan + 5 trang: Seller TMĐT, Nghệ sĩ & Creator, Doanh nghiệp & quà tặng, Kỹ thuật & prototype, Kiến trúc & trưng bày |
| Chính sách | Tổng quan + 8 trang: Bảo mật & bản quyền, Đổi trả & bảo hành, Vận chuyển, Thanh toán, Thời gian & huỷ đơn, Cam kết chất lượng, Điều khoản sử dụng, Quyền riêng tư |
| Kiến thức | Tổng quan + 3 bài viết |

## Song ngữ

Bản tiếng Việt ở gốc, bản tiếng Anh ở `/en/`, cùng tên file. Nút **EN / VI** trên menu chuyển đúng trang tương ứng; mỗi trang khai báo `hreflang` để Google hiểu hai bản là một.
Khi sửa nội dung, sửa ở cả `data.mjs` và `data.en.mjs`.

## Thiết kế

- Font: **Fraunces** (tiêu đề), **Be Vietnam Pro** (nội dung), **JetBrains Mono** (thông số).
- Màu nhấn: **Molten #FF5A1F** (nền tối) và **Ember #C2410C** (nền sáng).
- Nút: cao cố định 48 px, ô icon 16 px luôn giữ chỗ, chỉ đổi màu và co 3% khi nhấn; có trạng thái focus, vô hiệu và đang tải.
- Bản thiết kế trên Claude Design: https://claude.ai/artifact/V7TuGDVnryoFC1B261kc7y

## Sửa nội dung

1. Mở `src/data.mjs`, sửa phần `site` (số điện thoại, Zalo, email, địa chỉ, tên miền, mức freeship, mạng xã hội). Mục nào để trống sẽ hiện ô gạch chân "chờ cập nhật" trên trang.
2. Sửa giá trong `materials[].rate` (đơn giá đồng/cm³ dùng cho công cụ ước tính), `plans`, và các chính sách cho đúng thực tế xưởng.
3. Chạy:
   ```bash
   cd tvt-web
   node src/build.mjs
   ```
4. Mở `public/index.html` trong trình duyệt để xem.

**Thay ảnh thật:** chép ảnh vào `public/assets/img/` với đúng tên file đang dùng (`vase.png`, `toy.png`, `gear.png`…). Ảnh vuông, nền tối hoặc trong suốt sẽ hợp với giao diện nhất.

**Thay logo:** logo hiện là chữ "TVT" trong `build.mjs` (hàm `header`) và `public/assets/favicon.svg`.

## Triển khai

**GitHub Pages (đang dùng):** mỗi lần push lên `main`, workflow `.github/workflows/pages.yml` tự build và đăng web tại https://andy-cods.github.io/tvt-web/. Lần đầu cần vào Settings → Pages → Source chọn **GitHub Actions**.

Hosting khác:

Upload nguyên thư mục `public/`. Một vài lựa chọn:

- **Netlify / Vercel / Cloudflare Pages:** trỏ thư mục publish là `public`, không cần lệnh build.
- **VPS có Caddy:**
  ```
  tvt3d.vn {
      root * /var/www/tvt-web/public
      file_server
      encode gzip zstd
      handle_errors {
          rewrite * /404.html
          file_server
      }
  }
  ```

Nhớ đổi `site.url` trong `data.mjs` thành tên miền thật rồi build lại để canonical, sitemap và Open Graph đúng.

## Ghi chú kỹ thuật

- Trang chủ dùng Three.js 0.149 (jsDelivr) để dựng cảnh bình đang in. Không có WebGL thì hiện ảnh `hero.png` tĩnh.
- Form liên hệ chưa có backend: nó tạo bản brief để khách sao chép rồi gửi qua Zalo/email. Muốn nhận đơn tự động cần thêm một endpoint (Google Apps Script, Formspree, hoặc API riêng).
- Render lại ảnh minh hoạ: `THREE_PATH=/đường/dẫn/three.min.js node src/render-images.mjs` (cần Playwright + Chromium).
