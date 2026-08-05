import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-3 rounded-full border bg-fd-muted px-4 py-1 text-sm text-fd-muted-foreground">
        Fumadocs + GitHub Pages
      </p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">System Docs</h1>
      <p className="mb-8 max-w-2xl text-lg text-fd-muted-foreground">
        Trang tài liệu tĩnh cho hệ thống, hỗ trợ MDX, sidebar, bảng mục lục, dark mode và tìm kiếm.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/docs"
          className="rounded-lg bg-fd-primary px-5 py-3 font-medium text-fd-primary-foreground transition hover:opacity-90"
        >
          Mở tài liệu
        </Link>
        <Link
          href="/docs/deployment"
          className="rounded-lg border px-5 py-3 font-medium transition hover:bg-fd-accent"
        >
          Xem triển khai
        </Link>
      </div>
    </main>
  );
}
