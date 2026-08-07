import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fumadocsMdx } from 'fumadocs-mdx/vite';
import { fileURLToPath, URL } from 'node:url';

function githubBasePath() {
  if (process.env.GITHUB_ACTIONS !== 'true') return '/';
  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
  return repository && !repository.endsWith('.github.io') ? `/${repository}/` : '/';
}

export default defineConfig({
  base: githubBasePath(),
  // GitHub Pages is also opened from older iOS devices. Vite's default
  // Baseline target can emit syntax that those Safari versions cannot parse;
  // a rejected route-chunk import is then rendered by the root error boundary.
  build: { target: 'safari15' },
  plugins: [fumadocsMdx(), tailwindcss(), reactRouter()],
  resolve: { alias: { '@': fileURLToPath(new URL('./app', import.meta.url)) } },
});
