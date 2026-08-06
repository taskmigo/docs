import { use } from 'react';
import type { Route } from './+types/docs';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsBody, DocsDescription, DocsPage, DocsTitle, MarkdownCopyButton, ViewOptionsPopover } from 'fumadocs-ui/layouts/docs/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { docs, getPageImageUrl, getPageMarkdownUrl, source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { gitConfig } from '@/lib/shared';
import { useMDXComponents } from '@/components/mdx';

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter(Boolean);
  const page = source.getPage(slugs);
  if (!page) throw new Response('Not found', { status: 404 });
  return { path: page.path, markdownUrl: getPageMarkdownUrl(page).url, pageTree: await source.serializePageTree(source.getPageTree()) };
}

export const meta: Route.MetaFunction = ({ params }) => {
  const page = source.getPage(params['*'].split('/').filter(Boolean));
  if (!page) return [];
  return [{ title: `${page.data.title} | System Docs` }, { name: 'description', content: page.data.description }, { property: 'og:image', content: getPageImageUrl(page).url }];
};

function Content({ path, markdownUrl }: { path: string; markdownUrl: string }) {
  const page = docs.getPage(path);
  if (!page) throw new Error(`Unknown documentation page: ${path}`);
  const data = use(page.load());
  const MDX = page.body;
  const sourcePage = source.getPages().find((candidate) => candidate.path === path);
  return <DocsPage toc={data.toc}><DocsTitle>{page.title}</DocsTitle><DocsDescription className="mb-0">{page.description}</DocsDescription><div className="flex flex-row items-center gap-2 border-b pb-6"><MarkdownCopyButton markdownUrl={markdownUrl} /><ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${path}`} /></div><DocsBody><MDX components={useMDXComponents(sourcePage ? { a: createRelativeLink(source, sourcePage) } : undefined)} /></DocsBody></DocsPage>;
}

export default function Docs({ loaderData }: Route.ComponentProps) {
  const { pageTree, path, markdownUrl } = useFumadocsLoader(loaderData);
  return <DocsLayout {...baseOptions()} tree={pageTree}><Content path={path} markdownUrl={markdownUrl} /></DocsLayout>;
}
