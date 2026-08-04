import { useState, useEffect, useRef } from 'react';

interface ExternalPost {
  title: string;
  link: string;
  pubDate: Date;
  description?: string;
  source: string;
}

interface Props {
  initialPosts: ExternalPost[];
  postsPerPage?: number;
}

export default function ExternalFeedList({ initialPosts, postsPerPage = 12 }: Props) {
  const [displayedPosts, setDisplayedPosts] = useState<ExternalPost[]>(initialPosts.slice(0, postsPerPage));
  const [hasMore, setHasMore] = useState(initialPosts.length > postsPerPage);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          const nextBatch = initialPosts.slice(
            displayedPosts.length,
            displayedPosts.length + postsPerPage
          );
          setDisplayedPosts(prev => [...prev, ...nextBatch]);
          setHasMore(displayedPosts.length + nextBatch.length < initialPosts.length);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [displayedPosts.length, initialPosts, hasMore, postsPerPage]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedPosts.map((post, idx) => (
          <article key={`${post.source}-${idx}`} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:shadow-lg transition">
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">{post.source}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              {post.description && (
                <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">{post.description}</p>
              )}
              <div className="text-sm text-zinc-500">
                <time dateTime={post.pubDate.toISOString()}>{formatDate(post.pubDate)}</time>
              </div>
            </a>
          </article>
        ))}
      </div>

      {hasMore && <div ref={loaderRef} className="h-20 flex items-center justify-center mt-8">
        <span className="text-zinc-500">Loading...</span>
      </div>}
    </>
  );
}
