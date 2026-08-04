import { useState, useEffect, useRef, useMemo } from 'react';
import type { CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'blog'>;

interface Props {
  initialPosts: Post[];
  postsPerPage?: number;
}

export default function BlogList({ initialPosts, postsPerPage = 12 }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(postsPerPage);
  const loaderRef = useRef<HTMLDivElement>(null);

  const allTags = useMemo(
    () => [...new Set(initialPosts.flatMap(p => p.data.tags))].sort(),
    [initialPosts]
  );

  const filteredPosts = useMemo(
    () => selectedTag ? initialPosts.filter(p => p.data.tags.includes(selectedTag)) : initialPosts,
    [selectedTag, initialPosts]
  );

  const displayedPosts = useMemo(
    () => filteredPosts.slice(0, displayCount),
    [filteredPosts, displayCount]
  );

  const hasMore = displayedPosts.length < filteredPosts.length;

  useEffect(() => {
    setDisplayCount(postsPerPage);
  }, [selectedTag, postsPerPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setDisplayCount(prev => prev + postsPerPage);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, postsPerPage]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            !selectedTag
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
              : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTag === tag
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
                : 'bg-zinc-100 dark:bg-zinc-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedPosts.map(post => (
          <article key={post.id} className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:shadow-lg transition">
            <a href={`/blog/${post.id}`}>
              <h3 className="text-xl font-bold mb-2">{post.data.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">{post.data.description}</p>
              <div className="text-sm text-zinc-500">
                <time dateTime={post.data.date.toISOString()}>{formatDate(post.data.date)}</time>
              </div>
              {post.data.tags.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {post.data.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
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
