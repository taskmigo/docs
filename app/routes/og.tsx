import { source } from '@/lib/source';
import { appName } from '@/lib/shared';

export function loader({ params }: { params: Record<string, string | undefined> }) {
  const segments = params['*']?.split('/') ?? [];
  const page = source.getPage(segments.slice(0, -1));
  if (!page) throw new Response('Not found', { status: 404 });
  const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]!);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="100%" height="100%" fill="#09090b"/><text x="72" y="100" fill="#a1a1aa" font-family="sans-serif" font-size="28">${escape(appName)}</text><text x="72" y="310" fill="white" font-family="sans-serif" font-size="64" font-weight="700">${escape(page.data.title)}</text><text x="72" y="390" fill="#d4d4d8" font-family="sans-serif" font-size="28">${escape(page.data.description ?? '')}</text></svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
