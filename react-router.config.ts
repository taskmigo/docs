import type { Config } from '@react-router/dev/config';
import { readdirSync } from 'node:fs';
import { relative, resolve } from 'node:path';

const contentRoot = resolve('content/docs');
const docSlugs = readdirSync(contentRoot, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
  .map((entry) => relative(contentRoot, resolve(entry.parentPath, entry.name)).replace(/\\/g, '/').replace(/\.mdx$/, '').replace(/(^|\/)index$/, ''));

export default {
  ssr: false,
  basename: process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY?.split('/')[1] && !process.env.GITHUB_REPOSITORY.split('/')[1].endsWith('.github.io')
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
    : '/',
  async prerender() {
    return [
      '/',
      ...docSlugs.map((slug) => `/docs${slug ? `/${slug}` : ''}`),
      '/api/search',
      '/llms.txt',
      '/llms-full.txt',
      ...docSlugs.flatMap((slug) => [
        `/llms.mdx/docs/${slug ? `${slug}/` : ''}content.md`,
        `/og/docs/${slug ? `${slug}/` : ''}image.svg`,
      ]),
    ];
  },
} satisfies Config;
