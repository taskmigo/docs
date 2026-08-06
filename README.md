# System Docs

Trang tài liệu tĩnh cho hệ thống, được xây dựng bằng [Fumadocs](https://www.fumadocs.dev/), React Router và Vite, rồi triển khai lên GitHub Pages.

## Phát triển cục bộ

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal (mặc định <http://localhost:5173>) để xem trang docs.

## Viết tài liệu

- Nội dung tài liệu nằm trong `content/docs`.
- Tạo file `.mdx` mới để thêm trang.
- Cập nhật `content/docs/meta.json` để điều chỉnh thứ tự/sidebar.

## Build tĩnh

```bash
npm run build
npm run start
```

React Router prerender mọi trang tài liệu và resource route khi build. Output tĩnh nằm trong `build/client/`; file `404.html` do workflow tạo cung cấp SPA fallback cho URL mở trực tiếp trên GitHub Pages.

## Triển khai GitHub Pages

Workflow `.github/workflows/pages.yml` tự động build và deploy khi push lên nhánh `main`. Trong repository GitHub, vào **Settings → Pages** và chọn nguồn deploy là **GitHub Actions**.
