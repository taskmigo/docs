export const appName = 'System Docs';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: process.env.NEXT_PUBLIC_GITHUB_OWNER ?? 'your-org',
  repo: process.env.NEXT_PUBLIC_GITHUB_REPO ?? 'docs',
  branch: process.env.NEXT_PUBLIC_GITHUB_BRANCH ?? 'main',
};
