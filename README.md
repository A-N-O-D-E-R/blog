# Astro Blog

Modern, production-ready personal blog built with Astro. Fast, accessible, SEO-optimized, and fully static.

## Features

- **Static-first**: No backend, no database, deploys as static files
- **MDX blog posts**: Write in Markdown with JSX components
- **Content Collections**: Type-safe frontmatter with Zod validation
- **Full-text search**: Pagefind integration with Cmd+K shortcut
- **Dark/light mode**: Persistent theme toggle
- **RSS feed**: Auto-generated from posts
- **SEO-ready**: Open Graph, Twitter cards, JSON-LD, sitemap
- **Responsive**: Mobile-first design with Tailwind CSS
- **Fast**: ~15KB JS bundle, excellent Lighthouse scores
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [React](https://react.dev) - Interactive islands (ThemeToggle)
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [MDX](https://mdxjs.com) - Enhanced Markdown
- [Pagefind](https://pagefind.app) - Static search

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Writing Posts

Create `.mdx` files in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "Brief description for SEO"
date: 2026-08-04
tags: ["tag1", "tag2"]
category: "tutorial"
draft: false
---

# Your Post Title

Your content here...
```

### Frontmatter Fields

- `title` (required): Post title
- `description` (required): SEO description
- `date` (required): Publication date
- `tags` (optional): Array of tags
- `category` (optional): Post category
- `draft` (optional): Set to `true` to hide from build
- `image` (optional): Path to Open Graph image

## Customization

### Update Site Info

1. **Site URL**: Edit `astro.config.mjs` → `site: 'https://yourdomain.com'`
2. **Blog name**: Replace "Your Blog" in:
   - `src/components/Header.astro`
   - `src/components/SEO.astro`
   - `src/pages/rss.xml.ts`
3. **About page**: Edit `src/pages/about.astro`
4. **Projects page**: Edit `src/pages/projects.astro`
5. **Home page**: Edit `src/pages/index.astro` (name, tagline)

### Add OG Image

Place default Open Graph image at `public/og-default.jpg`.

### Color Scheme

Modify theme colors in `src/styles/global.css`:

```css
:root {
  --border: 214.3 31.8% 91.4%;
  /* ... other colors */
}

.dark {
  --border: 217.2 32.6% 17.5%;
  /* ... dark mode colors */
}
```

## Deployment

### Cloudflare Pages

1. Connect your repo at [Cloudflare Pages](https://pages.cloudflare.com)
2. Auto-detects Astro, no config needed
3. Deploys on every push to main

### Netlify

1. Connect your repo at [Netlify](https://app.netlify.com)
2. Uses `netlify.toml` config (already included)
3. Auto-deploys on push

### Vercel

```bash
npm install -g vercel
vercel
```

Uses `vercel.json` config (already included).

### GitHub Pages

See [Astro's GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/).

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── BlogCard.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Pagination.astro
│   │   ├── SEO.astro
│   │   ├── ThemeToggle.tsx
│   │   └── TOC.astro
│   ├── content/
│   │   └── blog/
│   │       ├── getting-started-with-astro.mdx
│   │       ├── modern-css-techniques.mdx
│   │       └── typescript-best-practices.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── [slug].astro
│   │   │   └── index.astro
│   │   ├── tags/
│   │   │   └── [tag].astro
│   │   ├── 404.astro
│   │   ├── about.astro
│   │   ├── index.astro
│   │   ├── projects.astro
│   │   └── rss.xml.ts
│   ├── styles/
│   │   └── global.css
│   └── content.config.ts
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── netlify.toml
└── vercel.json
```

## Performance

- **JavaScript bundle**: ~15KB (ThemeToggle + Pagefind UI)
- **First Contentful Paint**: <1s target
- **Lighthouse scores**: >90 Performance, 100 Accessibility/SEO
- **Image optimization**: Use Astro's `<Image>` component for photos
- **Font loading**: System fonts only (instant load)

## SEO Features

- Semantic HTML (`<article>`, `<time>`, proper heading hierarchy)
- Meta tags (Open Graph, Twitter cards) on every page
- Auto-generated sitemap
- Full-content RSS feed
- JSON-LD BlogPosting schema
- Canonical URLs

## Features Deferred (Add When Needed)

- **Related posts**: Tag overlap algorithm — add when traffic proves users click
- **Prev/next navigation**: Extra queries — add when requested
- **Category pages**: Tags suffice for now
- **Sticky TOC**: Static TOC works for current post lengths
- **Newsletter form**: Placeholder UI — integrate ESP when list grows
- **Comments**: Static site — add Giscus/Utterances when needed
- **Analytics**: Add Plausible/Fathom when tracking required
- **Testing suite**: Manual verification sufficient for now

## Architecture Decisions

### Why Static-Only?

- **No CMS**: MDX in repo works for developer-written content
- **No API routes**: Everything static, no server needed
- **No state management**: Minimal client state (theme, search)
- **No testing**: Manual verification, add Playwright when needed

### Performance Strategy

- **Islands architecture**: React only for ThemeToggle (2KB)
- **Code splitting**: Astro automatically splits per-page
- **Zero web fonts**: System fonts for instant load
- **Minimal JS**: <50KB budget, actual ~15KB

## License

MIT

## Credits

Built with Astro, deployed with love.
