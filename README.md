# System Docs

Trang tài liệu tĩnh cho hệ thống, được xây dựng bằng [Fumadocs](https://www.fumadocs.dev/) trên Next.js và triển khai lên GitHub Pages.

## Phát triển cục bộ

```bash
npm install
npm run dev
```

Mở <http://localhost:3000> để xem trang docs.

## Viết tài liệu

- Nội dung tài liệu nằm trong `content/docs`.
- Tạo file `.mdx` mới để thêm trang.
- Cập nhật `content/docs/meta.json` để điều chỉnh thứ tự/sidebar.

## Build tĩnh

```bash
npm run build
npm run start
```

`next.config.mjs` bật `output: 'export'`, vì vậy output tĩnh nằm trong thư mục `out/` và có thể được GitHub Pages phục vụ trực tiếp.

## Triển khai GitHub Pages

Workflow `.github/workflows/pages.yml` tự động build và deploy khi push lên nhánh `main`. Trong repository GitHub, vào **Settings → Pages** và chọn nguồn deploy là **GitHub Actions**.
