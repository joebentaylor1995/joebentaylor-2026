# joebentaylor.com — 2026 Portfolio

Personal portfolio of **Joe Ben Taylor** — logo designer, web designer & developer.
Built on [Tackl 4](https://github.com/12-studio/tackl), the Next.js starter kit.

## Stack

- **Next.js 16** (App Router, React Server Components, Turbopack)
- **React 19** + **styled-components 6** (Tackl 4 engine: polymorphic `Div`, Waffl grid, CSS-variable design tokens)
- **GSAP** + **Lenis** — window-level smooth scroll with nested Lenis instances for the Profile and Contact drawers
- **DatoCMS** via the `@cms` adapter (`src/cms/dato`)
- **Biome** for linting/formatting, **Storybook** for component work
- Deployed on **Netlify** (`@netlify/plugin-nextjs`)

## Getting started

```bash
bun install
cp .env.example .env   # fill in real values
bun run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Dev server (Turbopack) |
| `bun run build` | Production build |
| `bun run type-check` | TypeScript check |
| `bun run lint` / `lint:fix` | Biome check / auto-fix |
| `bun run storybook` | Storybook on :6006 |
| `bun run lighthouse` | Lighthouse CI run |

## Environment

See `.env.example`. Required in production:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL (drives metadata, sitemap, robots)
- `NEXT_DATOCMS_API_TOKEN` — DatoCMS Content Delivery API token
- `DRIBBBLE_ACCESS_TOKEN` — powers the footer Dribbble grid

`.env` is git-ignored — never commit real tokens.

## Architecture notes

- `app/(site)/layout.tsx` — server root layout: metadata, fonts, global CMS data (Loader images, Header socials)
- `app/(site)/Providers.tsx` — client providers: styled-components registry, theme, contexts, Cursor, root Lenis + GSAP ticker, Contact drawer
- `src/theme/` — Tackl 4 engine; raw token values are emitted once as CSS custom properties, the theme object exposes `var()` references
- `src/cms/` — CMS seam; components import from `@cms` only, never from an adapter directly
- Docs for the engine live in `docs/` (grid, tokens, useAnimation, data flow)
