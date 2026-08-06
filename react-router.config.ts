import type { Config } from '@react-router/dev/config';
import { glob } from 'node:fs/promises';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';

const getDocsUrl = createGetUrl('/docs');

export default {
  ssr: false,
  basename: process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY?.split('/')[1] && !process.env.GITHUB_REPOSITORY.split('/')[1].endsWith('.github.io')
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
    : '/',
  async prerender({ getStaticPaths }) {
    const paths = [...getStaticPaths()];
    for await (const entry of glob('**/*.mdx', { cwd: 'content/docs' })) {
      const slugs = getSlugs(entry);
      paths.push(getDocsUrl(slugs), `/llms.mdx/docs/${[...slugs, 'content.md'].join('/')}`, `/og/docs/${[...slugs, 'image.svg'].join('/')}`);
    }
    return paths;
  },
} satisfies Config;
