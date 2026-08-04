import Parser from 'rss-parser';

export interface ExternalPost {
  title: string;
  link: string;
  pubDate: Date;
  description?: string;
  source: string;
}

const parser = new Parser({
  customFields: {
    item: ['description', 'content:encoded'],
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
  },
});

export async function fetchExternalFeed(name: string, url: string, limit?: number): Promise<ExternalPost[]> {
  try {
    const feed = await parser.parseURL(url);
    const items = feed.items || [];
    const sliced = limit ? items.slice(0, limit) : items;
    return sliced.map(item => ({
      title: item.title || 'Untitled',
      link: item.link || '#',
      pubDate: new Date(item.pubDate || Date.now()),
      description: item.contentSnippet || item.description,
      source: name,
    }));
  } catch {
    return [];
  }
}

export async function fetchAllExternalFeeds(feeds: Record<string, string>): Promise<ExternalPost[]> {
  const results = await Promise.all(
    Object.entries(feeds).map(([name, url]) => fetchExternalFeed(name, url))
  );
  return results.flat().sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}
