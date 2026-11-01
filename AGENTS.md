<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AURA website

Redesign of the AURA Phnom Penh restaurant site, inspired by the editorial, motion-led layout of Amazónico. Next.js 16 + Tailwind v4, exported as static files and hosted on Cloudflare Workers static assets. See README.md.

- **Stage: photos going in, page by page.** The home page shows photos (except the hero, still a video wireframe); other pages are still wireframes. Each slot's photo is its `photo` field, a path inside `assets/photos/`. `<Photo>` renders it once `npm run photos` has published it (WebP in `public/images/photos/`, listed in `src/content/photos.json`), otherwise a `<Placeholder>`. Only publish photos for pages the user has asked for.
- **Frontend only.** No server code, API routes or Worker script. Forms show a local confirmation (`fakeSubmit` in `components/features/forms/Field.tsx`).
- **Content lives in `src/content/`.** Pages read from it; components never hard-code copy, links or contact details.
- **Design tokens live in `src/app/globals.css` (`@theme`).** Use the token names (`bg-jungle`, `text-cream`, `font-display`, `ease-out-expo`), not raw hex values.
- **Motion:** scroll effects subscribe to the shared loop in `src/lib/scroll.ts` and write styles directly (no React state per frame). Entrances use `<Reveal>` / `<RevealText>`. Everything must respect `prefers-reduced-motion`.
- `npm run check` = lint + typecheck + build. `npm run preview` serves the export through Wrangler locally.
