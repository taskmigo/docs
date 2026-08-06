import { Link } from 'react-router';

export default function NotFound() {
  return <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-24 text-center"><h1 className="text-4xl font-bold">Không tìm thấy trang</h1><p className="mt-4 text-fd-muted-foreground">URL này không tương ứng với một trang tài liệu.</p><Link className="mt-8 rounded-lg border px-5 py-3" to="/docs">Quay lại tài liệu</Link></main>;
}
