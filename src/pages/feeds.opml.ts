import { CATEGORIZED_FEEDS } from '@/lib/external-feeds';

export async function GET(context: any) {
  const myFeed = `    <outline type="rss" text="My Blog" xmlUrl="${context.site}rss.xml" />`;

  const categories = Object.entries(CATEGORIZED_FEEDS)
    .map(([category, feeds]) => {
      const feedOutlines = Object.entries(feeds)
        .filter(([_, url]) => url.startsWith('http'))
        .map(([name, url]) => `      <outline type="rss" text="${name}" title="${name}" xmlUrl="${url}" />`)
        .join('\n');
      return feedOutlines ? `    <outline text="${category}" title="${category}">\n${feedOutlines}\n    </outline>` : '';
    })
    .filter(Boolean)
    .join('\n');

  const opml = `<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
  <head>
    <title>Blog Feeds</title>
  </head>
  <body>
${myFeed}
${categories}
  </body>
</opml>`;

  return new Response(opml, {
    headers: {
      'Content-Type': 'application/xml',
      'Content-Disposition': 'attachment; filename="feeds.opml"'
    }
  });
}
