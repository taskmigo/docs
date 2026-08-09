# Taskmigo docs

This repository contains the documentation site for Taskmigo, built with
Next.js and Fumadocs.

Quick start
----------

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Project layout
--------------

- `src/` — Next.js app and components.
- `content/` — Documentation content and versioned docs.
- `lib/source.ts` — Content source adapter and collection definitions.
- `lib/layout.shared.tsx` — Shared layout utilities used across pages.

Useful routes
-------------

| Route                     | Description                                 |
| ------------------------- | ------------------------------------------- |
| `app/(home)`              | Landing page and home routes.               |
| `app/versions`            | Versioned documentation pages.              |
| `app/api/search/route.ts` | Search route handler used by the docs site. |

Notes
-----

- This site uses Fumadocs' MDX tooling and macros — see
  https://fumadocs.dev for docs and the Macro API.
- Content lives under `content/versions/`; update or add new versions there.

Learn more
----------

- Next.js docs: https://nextjs.org/docs
- Fumadocs: https://fumadocs.dev

If you'd like a different README structure or want me to add badges, CI instructions, or contributor guidance, tell me what to include and I'll update it.
