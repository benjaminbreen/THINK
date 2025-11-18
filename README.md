# THINK - Teaching with AI in Humanities Classes

A clearing house for AI-enabled historical simulations, pedagogy materials, and educational resources. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Overview

THINK is a project at UC Santa Cruz funded by the National Endowment for the Humanities. Our mission is to create a web platform with freely available educational resources for teaching with and about AI in humanities classes.

## Features

- 🎨 **Modern Design**: Beautiful, responsive UI built with Tailwind CSS
- 🌓 **Dark Mode**: Full dark mode support with system preference detection
- 📝 **Content Management System**: Decap CMS for easy blog post creation (no subscription needed!)
- 📝 **MDX Blog**: Write blog posts in Markdown with embedded React components
- 🎭 **Historical Simulations**: Showcase for AI-powered educational tools
- 📚 **Pedagogy Materials**: Syllabi, assignments, and teaching guides
- 🔗 **Resource Directory**: Curated links to external tools and platforms
- ⚡ **Fast & Performant**: Built on Next.js 14 with App Router
- 🎬 **Smooth Animations**: Delightful micro-interactions with Framer Motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Decap CMS (free, open-source, Git-based)
- **Content**: MDX for blog posts and content pages
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theme**: next-themes for dark mode
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd THINK
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
THINK/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blog/              # Blog posts (MDX)
│   ├── pedagogy/          # Pedagogy materials
│   ├── projects/          # Project showcase
│   ├── resources/         # External resources
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Navigation, footer
│   ├── ui/               # Reusable UI components
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── content/              # MDX content files
│   ├── blog/
│   ├── pedagogy/
│   └── projects/
├── lib/                  # Utility functions
│   └── utils.ts
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration
```

## Adding Content

### Using the CMS (Recommended)

The easiest way to create blog posts is through the Content Management System:

1. **Access the CMS**: Visit `/admin` on your deployed site (e.g., `https://your-domain.com/admin`)
2. **Login**: Click "Login with GitHub" (you'll need write access to the repo)
3. **Create Post**: Click "Blog Posts" → "New Blog Post"
4. **Fill in details**: Title, description, author, date, and content
5. **Publish**: Click "Publish" to save and deploy

The CMS automatically creates the proper file structure and triggers deployment. **See [CMS-SETUP.md](CMS-SETUP.md) for complete setup instructions.**

### Creating a New Blog Post Manually

Create a new MDX file in `app/blog/[slug]/page.mdx`:

```mdx
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'

export const metadata = {
  title: 'Your Post Title',
  description: 'Post description',
  date: '2024-01-15',
  author: 'Your Name',
}

<Section className="pt-24 pb-16">
  <Container>
    <div className="mx-auto max-w-3xl prose">
      # Your Post Title

      Your content here...
    </div>
  </Container>
</Section>
```

### Adding a New Project

1. Create a new page in `app/projects/[project-name]/page.tsx`
2. Add the project to the projects array in `app/projects/page.tsx`
3. Update navigation links as needed

### Adding Pedagogy Materials

Add new materials to the materials object in `app/pedagogy/page.tsx` or create separate MDX files in the `content/pedagogy/` directory.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Click "Deploy"

Alternatively, use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Environment Variables

No environment variables are required for basic functionality. If you add features that need API keys or secrets, create a `.env.local` file:

```bash
# Add your environment variables here
# NEXT_PUBLIC_API_URL=https://api.example.com
```

## Customization

### Colors & Theme

Edit `tailwind.config.ts` and `app/globals.css` to customize the color scheme:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: 'hsl(var(--primary))',
      // ... customize colors
    }
  }
}
```

### Fonts

The project uses Inter (sans-serif) and Playfair Display (serif). To change fonts, edit `app/layout.tsx`:

```typescript
import { Your_Font } from 'next/font/google'

const yourFont = Your_Font({
  subsets: ['latin'],
  variable: '--font-your-font',
})
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

We welcome contributions from the community! If you've created AI-enabled humanities projects or teaching materials, please consider sharing them.

## License

MIT

## Acknowledgments

- Funded by the National Endowment for the Humanities
- Developed at UC Santa Cruz
- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)

## Contact

For questions, suggestions, or collaboration inquiries, please contact [your-email@example.com]

## Learn More

- [THINK Website](https://your-domain.com)
- [NEH Website](https://www.neh.gov)
- [UC Santa Cruz](https://www.ucsc.edu)
