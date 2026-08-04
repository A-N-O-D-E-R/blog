import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getCollection, type CollectionEntry } from 'astro:content';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const readingTime = (content: string) => {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200); // ponytail: 200 wpm average
};

export const sortPosts = (posts: CollectionEntry<'blog'>[]) =>
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const getPosts = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return sortPosts(posts);
};

export const getUniqueTags = (posts: CollectionEntry<'blog'>[]) =>
  [...new Set(posts.flatMap(p => p.data.tags))].sort();
