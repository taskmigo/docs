import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fumadocsMdx } from 'fumadocs-mdx/vite';

function githubBasePath() {
  if (process.env.GITHUB_ACTIONS !== 'true') return '/';
  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
  return repository && !repository.endsWith('.github.io') ? `/${repository}/` : '/';
}

export default defineConfig({
  base: githubBasePath(),
  plugins: [fumadocsMdx(), tsconfigPaths(), reactRouter()],
});
