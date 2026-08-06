import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { Outlet } from 'react-router';

export default function Layout() {
  return <HomeLayout {...baseOptions()}><Outlet /></HomeLayout>;
}
