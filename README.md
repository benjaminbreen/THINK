# THINK — Teaching with AI in Humanities Classes

A clearing house for AI-enabled historical simulations, pedagogy materials, and
educational resources. THINK is an NEH-funded project at UC Santa Cruz building
freely available resources for teaching with and about AI in the humanities.

## Tech stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Content | MDX, parsed with `gray-matter` |
| CMS | [Keystatic](https://keystatic.com) — see [CMS-SETUP.md](./CMS-SETUP.md) |
| Icons | [Lucide](https://lucide.dev) |
| Fonts | Inter (UI), Source Serif 4 (headings and prose), Space Grotesk (wordmark) — all self-hosted via `next/font` |
| Theming | `next-themes`, class-based dark mode |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve a production build |
| `npm run lint` | ESLint (flat config in `eslint.config.mjs`) |
| `npm run lint:fix` | ESLint with `--fix` |

## Project structure

```
THINK/
├── app/                    # App Router pages
│   ├── about/  team/  contact/
│   ├── blog/               # Blog index + [slug] renderer
│   ├── guides/             # How-to guides (one directory per guide)
│   ├── pedagogy/           # Assignments and teaching materials
│   ├── projects/           # Project showcase pages
│   ├── resources/          # Curated reading list
│   ├── tags/               # Tag index and per-tag pages
│   ├── keystatic/          # CMS editor route (noindex)
│   ├── api/keystatic/      # Keystatic route handler
│   ├── icon.svg            # Favicon
│   ├── globals.css         # Design tokens + global styles
│   └── layout.tsx
├── components/
│   ├── layout/             # Navigation, footer, layout wrapper
│   └── ui/                 # Reusable UI components
├── content/blog/           # Blog posts as MDX
├── hooks/
├── lib/                    # blog parsing, config, tags, utils
├── public/                 # Static assets (thumbnails, images, PDFs)
├── keystatic.config.ts     # CMS schema
├── eslint.config.mjs
└── tailwind.config.ts
```

## Design system

The visual language is defined in two places:

- **`app/globals.css`** — colour tokens as HSL triples (light and `.dark`), a
  warm-tinted elevation scale, section rhythm helpers (`section-y`,
  `section-top`), and prose styles.
- **`tailwind.config.ts`** — maps those tokens to Tailwind, and defines fluid
  type sizes (`text-display-lg`, `text-display`, `text-title`, `text-headline`)
  that scale with the viewport.

Prefer these over ad-hoc values. Headings use `font-serif` (Source Serif 4);
body copy and UI use the default sans (Inter).

## Adding content

### Blog posts

Posts live in `content/blog/*.mdx`. Write one through the CMS at `/keystatic`,
or create the file by hand — see [CMS-SETUP.md](./CMS-SETUP.md) for the
frontmatter shape.

### Projects

1. Create `app/projects/<project-name>/page.tsx`.
2. Add an entry to the `projects` array in `app/projects/page.tsx`.
3. Drop a thumbnail at `public/thumbnails/<slug>.webp` — `ProjectCard` resolves
   it from the slug automatically.

### Guides

1. Create `app/guides/<guide-name>/page.tsx` using the `GuideLayout` component.
2. Add an entry to the `guides` array in `app/guides/page.tsx`.
3. Add a thumbnail at `public/thumbnails/<id>.webp`.

### Images

Thumbnails are WebP, capped at 1400px wide. Next/Image generates the responsive
variants, and `next.config.mjs` caps `deviceSizes` at 1200px, so sources wider
than ~1400px add repo weight without improving quality.

## Deployment

Push to GitHub and import the repository into [Vercel](https://vercel.com); it
detects Next.js and configures the build automatically.

### Environment variables

None are required. `NEXT_PUBLIC_SITE_URL` is optional and overrides the
canonical URL used in metadata and structured data (it defaults to
`https://think.ucsc.edu`). Site-wide values live in `lib/config.ts`.

## Contributing

We welcome contributions from educators across all fields. If you have built an
AI-enabled humanities project or teaching material you would like to share, get
in touch.

## Acknowledgments

Funded by the National Endowment for the Humanities and the Humanities
Institute at UC Santa Cruz. Built with [Next.js](https://nextjs.org) and
[Tailwind CSS](https://tailwindcss.com); icons by [Lucide](https://lucide.dev).

## Contact

<bbreen@ucsc.edu>

## License

MIT
