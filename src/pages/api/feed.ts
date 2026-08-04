import type { APIRoute } from 'astro';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['description', 'content:encoded'],
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
  },
});

export const GET: APIRoute = async ({ url }) => {
  const name = url.searchParams.get('name');
  const feedUrl = url.searchParams.get('url');

  if (!name || !feedUrl) {
    return new Response(JSON.stringify([]), { status: 400 });
  }

  try {
    const feed = await parser.parseURL(feedUrl);
    const items = (feed.items || []).slice(0, 3).map(item => ({
      title: item.title || 'Untitled',
      link: item.link || '#',
      pubDate: item.pubDate || new Date().toISOString(),
      description: item.contentSnippet || item.description,
      source: name,
    }));

    return new Response(JSON.stringify(items), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
