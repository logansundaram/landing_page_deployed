# saturdayai.org

The website for [Saturday.ai](https://saturdayai.org): the landing page, docs, install guide, and blog for [Saturn](https://github.com/logansundaram/saturn), plus the status page for Eris.

Built with Next.js 16 (App Router), React 19, and Tailwind CSS v4. Every page is statically prerendered and deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build, then the receipts check
```

## Layout

```
src/app/
  page.tsx            landing page, assembled from components/*-chapter.tsx
  docs/               docs index and /docs/[slug]
  blog/               blog index and /blog/[slug]
  install/            install guide
  eris/               Eris status page
  components/         shared UI; components/docs/ renders typed content blocks
  lib/site.ts         site name, URL, nav, and the install command
  lib/docs/pages/     docs content
  lib/blog/posts/     blog posts
  lib/eris.ts         Eris page content
  lib/runs/           terminal captures (generated, do not edit)
  globals.css         design tokens and the type registers
scripts/
  receipts.mjs        postbuild check on the footer's first-paint figure
  run-to-capture.mjs  turns raw Saturn run exports into lib/runs modules
```

## Editing content

Docs pages and blog posts are TypeScript modules built from typed blocks (`p`, `h2`, `kv`, `code`, and so on, from `src/app/lib/docs/types.ts`), not Markdown.

- **Blog post:** add a module under `src/app/lib/blog/posts/` and register it in `src/app/lib/blog/index.ts`. The index page, sitemap, and static params all derive from that list.
- **Docs page:** add it to the relevant file in `src/app/lib/docs/pages/`.
- **Eris:** edit `src/app/lib/eris.ts`. The Eris repo's README is the source of truth for status wording.

## Terminal captures

The captures on the landing page are rendered from real Saturn runs. Raw run exports go in `runs-raw/`, which is git-ignored because exports can contain private workspace data. To regenerate the committed modules:

```bash
saturn -p "your prompt" --json --export runs-raw/run-hero.json
npm run captures
```

`run-to-capture.mjs` keeps only what the site renders: the query, the loop rows, metrics, and the recorded answer.

## Footer receipts

The footer prints a first-paint size for `/`. The declared figure lives in `src/app/lib/receipts.ts`, and `scripts/receipts.mjs` runs after every build to measure the real payload and fail the build if it exceeds that figure or the 300 kB budget.

## The installer URL

`saturdayai.org/install.sh` is a rewrite in `next.config.ts` that proxies the installer from the Saturn repo's `main` branch. This is why the site is not a static export.

## Environment

`GOOGLE_SITE_VERIFICATION` (optional) sets the Google Search Console verification tag.
