import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('(home)/layout.tsx', [index('(home)/page.tsx')]),
  layout('docs/layout.tsx', [route('docs/*', 'docs/[[...slug]]/page.tsx')]),
  route('api/search', 'api/search/route.ts'),
  route('llms.txt', 'llms.txt/route.ts'),
  route('llms-full.txt', 'llms-full.txt/route.ts'),
  route('llms.mdx/docs/*', 'llms.mdx/docs/[[...slug]]/route.ts'),
  route('og/docs/*', 'og/docs/[...slug]/route.tsx'),
] satisfies RouteConfig;
