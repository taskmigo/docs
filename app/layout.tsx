import { Provider } from '@/components/provider';
import './global.css';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: 'System Docs' },
  { name: 'description', content: 'Trang tài liệu hệ thống được xây dựng bằng Fumadocs, React Router và Vite.' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><Meta /><Links /></head>
      <body className="flex min-h-screen flex-col">
        <Provider>{children}</Provider><ScrollRestoration /><Scripts />
      </body>
    </html>
  );
}

export default function App() { return <Outlet />; }
