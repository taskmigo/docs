import { getLLMText, getPageMarkdownUrl, source } from '@/lib/source';
export async function loader({ params }: { params: Record<string, string | undefined> }) {
  const slug = params['*']?.split('/');
  // remove the appended "content.md"
  const page = source.getPage(slug?.slice(0, -1));
  if (!page) throw new Response('Not found', { status: 404 });

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}
