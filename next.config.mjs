import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isUserOrOrgPage = repoName?.endsWith('.github.io');
const basePath = isGithubPages && repoName && !isUserOrOrgPage ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_GITHUB_OWNER: process.env.GITHUB_REPOSITORY_OWNER ?? '',
    NEXT_PUBLIC_GITHUB_REPO: repoName ?? '',
    NEXT_PUBLIC_GITHUB_BRANCH: process.env.GITHUB_REF_NAME ?? 'main',
  },
};

export default withMDX(config);
