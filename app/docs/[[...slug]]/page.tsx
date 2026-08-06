import { getPageImageUrl, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/components/mdx';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { isRouteErrorResponse, useRouteError, type MetaFunction } from 'react-router';

function findPage(params: Record<string, string | undefined>) {
  const page = source.getPage(params['*']?.split('/').filter(Boolean));
  if (!page) throw new Response('Không tìm thấy trang', { status: 404 });
  return page;
}

export default function Page({ params }: { params: Record<string, string | undefined> }) {
  const page = findPage(params);

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return <main className="mx-auto max-w-3xl px-6 py-24"><h1 className="text-3xl font-bold">{isRouteErrorResponse(error) && error.status === 404 ? 'Không tìm thấy trang' : 'Đã xảy ra lỗi'}</h1></main>;
}

export const meta: MetaFunction = ({ params }) => {
  const page = source.getPage(params['*']?.split('/').filter(Boolean));
  if (!page) return [{ title: 'Không tìm thấy | System Docs' }];
  return [
    { title: `${page.data.title} | System Docs` },
    { name: 'description', content: page.data.description },
    { property: 'og:image', content: getPageImageUrl(page).url },
  ];
};
