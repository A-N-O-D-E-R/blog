import rss from '@astrojs/rss';
import { getPosts, getUniqueTags } from '@/lib/utils';

export async function getStaticPaths() {
  const posts = await getPosts();
  const tags = getUniqueTags(posts);
  return tags.map(tag => ({ params: { tag } }));
}

export async function GET(context: any) {
  const { tag } = context.params;
  const posts = await getPosts();
  const taggedPosts = posts.filter(p => p.data.tags.includes(tag));

  return rss({
    title: `anoder - ${tag}`,
    description: `Posts tagged with ${tag}`,
    site: context.site,
    items: taggedPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`
    }))
  });
}
