export const appName = 'System Docs';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: import.meta.env.VITE_GITHUB_OWNER ?? 'your-org',
  repo: import.meta.env.VITE_GITHUB_REPO ?? 'docs',
  branch: import.meta.env.VITE_GITHUB_BRANCH ?? 'main',
};
