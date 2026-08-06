import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <DocsLayout tree={source.getPageTree()} {...baseOptions()}>
      <Outlet />
    </DocsLayout>
  );
}
