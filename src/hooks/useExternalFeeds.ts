import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

export interface ExternalPost {
  title: string;
  link: string;
  pubDate: Date;
  description?: string;
  source: string;
}

async function fetchFeed(name: string, url: string): Promise<ExternalPost[]> {
  try {
    const data = await ky.get('/api/feed', {
      searchParams: { name, url },
    }).json<any[]>();
    return data.map(item => ({
      ...item,
      pubDate: new Date(item.pubDate),
    }));
  } catch {
    return [];
  }
}

export function useExternalFeed(name: string, url: string) {
  return useQuery({
    queryKey: ['external-feed', name, url],
    queryFn: () => fetchFeed(name, url),
  });
}

export function useExternalFeeds(feeds: Record<string, string>) {
  const queries = Object.entries(feeds).map(([name, url]) => ({
    queryKey: ['external-feed', name, url],
    queryFn: () => fetchFeed(name, url),
  }));

  return useQuery({
    queryKey: ['all-external-feeds', Object.keys(feeds).sort()],
    queryFn: async () => {
      const results = await Promise.all(
        Object.entries(feeds).map(([name, url]) => fetchFeed(name, url))
      );
      return results.flat().sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
    },
  });
}
