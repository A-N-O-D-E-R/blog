import rss from '@astrojs/rss';
import { getPosts } from '@/lib/utils';

export async function GET(context: any) {
  const posts = await getPosts();
  return rss({
    title: 'anoder',
    description: 'Your blog description',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `${import.meta.env.BASE_URL}/blog/${post.id}/`
    }))
  });
}
