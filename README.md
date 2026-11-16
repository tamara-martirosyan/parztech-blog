# parztech.github.io

ParzTech — տեխնոլոգիաներ և ՍԻ պարզ լեզվով | Tech &amp; AI in Armenian

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript, hosted on [Vercel](https://vercel.com)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Base UI)
- [Drizzle ORM](https://orm.drizzle.team) + [Turso](https://turso.tech) (SQLite; a local file in development)
- [Auth.js](https://authjs.dev) with GitHub login for `/admin`

## Project structure

```
src/
  app/                 routes only (thin pages)
    (site)/            public blog: home, /blog, /blog/[slug], /about
    admin/             admin: posts list, editor, login
    api/auth/          Auth.js route handler
  features/
    blog/              post queries, markdown rendering, categories, blog UI
    admin/             server actions, editor, admin UI
    auth/              Auth.js config, requireAdmin()
  components/          shared: ui/ (shadcn), layout/, theme
  db/                  Drizzle schema + client
  lib/                 generic helpers
drizzle/               SQL migrations
```

### Component convention

Every component (outside `components/ui`, which the shadcn CLI manages) lives in
its own PascalCase folder:

```
PostCard/
  PostCard.tsx    export default function PostCard(...)
  index.ts        export { default as PostCard } from "./PostCard"; + public types/helpers
  types.ts        props and other types (when needed)
  constants.ts    constants (when needed)
  utils.ts        helpers (when needed)
```

Import components by name from the folder: `import { PostCard } from "@/features/blog/components/PostCard";`

## Development

```bash
npm install
cp .env.example .env.local   # then fill in values (AUTH_SECRET: `npx auth secret`)
npm run db:migrate           # creates ./local.db
npm run dev                  # http://localhost:3000, admin at /admin
```

With `AUTH_DEV_LOGIN=true` in `.env.local`, the login page shows a one-click
local login. It only works under `npm run dev`, never in production.

Git hooks ([Husky](https://typicode.github.io/husky)) are installed by `npm install`:
before each commit, ESLint and Prettier fix the staged files (lint-staged); before
each push, TypeScript is checked. Commit messages must follow
[Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`,
`refactor:`, `chore:`, `docs:`, ...), checked by commitlint.

Other scripts: `npm run lint`, `npm run typecheck`, `npm run format`,
`npm run db:generate` (after changing `src/db/schema.ts`), `npm run db:studio`.

## Deployment (Vercel)

Set these environment variables in Vercel: `TURSO_DATABASE_URL`,
`TURSO_AUTH_TOKEN`, `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`,
`ADMIN_GITHUB_LOGINS`. The build runs database migrations automatically.

Optional: `GOOGLE_SITE_VERIFICATION` (Search Console HTML-tag code) and
`NEXT_PUBLIC_SITE_URL` (overrides the default `https://www.parztech.am`).

Telegram: set `TELEGRAM_CHANNEL` (channel username) to show "Join" links, and
`TELEGRAM_BOT_TOKEN` (a bot that is an admin of the channel) to post each new
article to the channel on its first publish (skipped in local development).

## SEO

- `/sitemap.xml`, `/robots.txt` and `/rss.xml` are generated from published posts
  and refreshed on publish.
- Every page has a canonical URL, Open Graph/Twitter tags and a preview image
  (`/og.png`, or `/blog/<slug>/og.png` for posts).
- Structured data: `WebSite` + `Organization` (with alternate names from
  `src/config/site.ts`) on the home page, `BlogPosting` + breadcrumbs on posts.

Categories live in `src/features/blog/config/categories.ts`; site name and nav in
`src/config/site.ts`.
