import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { RootProvider } from 'fumadocs-ui/provider/react-router';
import type { Route } from './+types/root';
import SearchDialog from '@/components/search';
import NotFound from './routes/not-found';
import './app.css';

export const meta: Route.MetaFunction = () => [
  { title: 'System Docs' },
  { name: 'description', content: 'Trang tài liệu hệ thống được xây dựng bằng Fumadocs, React Router và Vite.' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="vi" suppressHydrationWarning><head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><Meta /><Links /></head><body className="flex min-h-screen flex-col"><RootProvider search={{ SearchDialog }}>{children}</RootProvider><ScrollRestoration /><Scripts /></body></html>;
}

export default function App() { return <Outlet />; }

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />;
  const details = import.meta.env.DEV && error instanceof Error ? error.message : 'Đã xảy ra lỗi không mong muốn.';
  return <main className="mx-auto w-full max-w-4xl p-6 pt-24"><h1 className="text-3xl font-bold">Đã xảy ra lỗi</h1><p className="mt-4 text-fd-muted-foreground">{details}</p></main>;
}
