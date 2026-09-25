<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AURA clone

Next.js 16 + Tailwind v4 rebuild of auracambodia.asia (originally Tailwind v3 CDN + Alpine.js). See README.md.

- Match the live site 1:1; `src/app/globals.css` pins Tailwind v3 behavior. Keep those shims.
- After adding classes with a base `leading-*` plus responsive `text-*`, run `node scripts/v3-leading-fix.mjs`.
- Use `[&>:not([hidden])~:not([hidden])]:mt-*` instead of `space-y-*` (v3 margin semantics).
- Content lives in `src/data/*.json`; photos in `public/images/` (originals in `assets-original/`).
- `npm run check` = lint + typecheck + build.
