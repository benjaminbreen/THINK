# THINK Website - Project Documentation

## Overview

THINK is a collaborative clearinghouse website for experimental AI tools in humanities education. Built at UC Santa Cruz, it showcases AI-enabled historical simulations, pedagogical resources, and community-driven projects.

**Live Site**: TBD (Vercel deployment pending)
**Repository**: benjaminbreen/THINK
**Branch**: `claude/clearing-house-website-011YAB7R6JcC3hwQX9RFEvn7`

## Technology Stack

### Core Framework
- **Next.js 16.0.3** - App Router with static site generation
- **React 19.2.0** - Latest stable with TypeScript
- **TypeScript** - Full type safety throughout
- **Tailwind CSS 3.4.0** - Utility-first styling with custom design system

### Content Management
- **Decap CMS 3.9.0** (formerly Netlify CMS)
  - Git-based workflow
  - GitHub authentication (OAuth setup pending deployment)
  - MDX support for blog posts
  - Editorial workflow enabled

### UI Libraries
- **Shadcn/ui patterns** - Accessible component architecture
- **Framer Motion** - Animation library (minimal usage currently)
- **Lucide React** - Icon system
- **Radix UI** - Accessible primitives

### Development
- **Turbopack** - Next.js experimental bundler
- **ESLint** - Code quality
- **System fonts** - No Google Fonts for performance

## Site Architecture

### Page Structure (21 pages)

```
/                           # Homepage with hero, project gallery, guides
/about                      # About THINK initiative
/team                       # Principal investigators
/projects                   # Projects overview
  /historylens             # Flagship project
  /young-darwin            # Darwin simulation
  /history-simulator       # Historical scenarios
  /apothecary-simulator    # 18th century pharmacy
  /historical-figure-generator
/pedagogy                   # Teaching resources
/resources                  # General resources
/blog                       # Team blog (Decap CMS)
  /welcome-to-think        # First post
/guides                     # How-to guides (stubs)
  /claude-code-basics
  /building-simulations
  /ai-assignments
  /research-workflows
  /prompt-engineering
  /critical-pedagogy
```

### Design System

**Color Palette** (HSL variables in globals.css):
- Primary: `hsl(221.2 83.2% 53.3%)` - Blue (#3b82f6)
- Background: `hsl(0 0% 100%)` - White
- Foreground: `hsl(222.2 84% 4.9%)` - Near black
- Muted: `hsl(210 40% 96.1%)` - Light gray
- Accent: `hsl(210 40% 96.1%)` - Subtle highlights

**Typography**:
- Headings: `font-serif` (system serif stack)
- Body: `font-sans` (system sans stack)
- Code: `font-mono` (system monospace)

**Layout Components**:
- `Container`: Max-width wrapper with responsive padding
- `Section`: Semantic section with consistent spacing
- `Badge`: Small labeled indicators
- `Button`: Accessible button with variants (default, outline, ghost, link)

## Key Features

### 1. Interactive Background Animations

Located: `/components/ui/interactive-background.tsx`

Six canvas-based backgrounds that cycle on click:

1. **ASCII Grid** - Mouse-responsive character grid
2. **Matrix Rain** - Falling code effect with Japanese characters
3. **Particle Field** - Physics-based particles with attraction and connections
4. **Terminal Simulator** - Interactive command-line interface
   - Commands: help, about, projects, clear, time, joke
   - Keyboard input with blinking cursor
   - Command history (20 lines max)
5. **Wave Ripples** - Click-to-create expanding ripples
6. **Constellation** - Twinkling stars with easter eggs
   - Type "THINK" to reveal connections
   - Konami code (↑↑↓↓←→←→) toggles effect

**Technical Details**:
- Canvas API with `requestAnimationFrame` for 60fps
- Blue-slate color theme: `rgba(15, 23, 42, ...)`
- Mouse tracking with `useRef`
- Keyboard event listeners
- 40% opacity for text readability

### 2. Project Gallery

Located: `/app/page.tsx` (homepage)

**Filter UI** (non-functional stubs):
- Type: All Projects, Classroom Assignment, Full Course, Research Tool
- Discipline: History, Literature, Linguistics

**Project Cards**:
- Type badge (Framework/Simulation/Generator)
- Date (2024)
- Tags (period, discipline, tools)
- Description
- CTA buttons

**Community Card**:
- "Share Your Project" placeholder
- Encourages contributions

### 3. Decap CMS Integration

Located: `/public/admin/config.yml`

**Configuration**:
```yaml
backend:
  name: github
  repo: benjaminbreen/THINK
  branch: main

collections:
  - name: blog
    folder: content/blog
    create: true
    fields: [title, date, author, description, tags, body]
```

**Status**: Configured but requires OAuth setup post-deployment

**Access**: `/admin` route (after deployment)

### 4. Content Pages

**About Page** (`/app/about/page.tsx`):
- Mission statement
- NEH grant context
- Community focus

**Team Page** (`/app/team/page.tsx`):
- Three PIs: Benjamin Breen, Kevin Waite, Jentery Sayers
- UC Santa Cruz affiliations
- Contact info (GitHub, email)

**Project Pages**:
- Individual pages for each tool
- Standardized structure
- Links to demos/repos

**Pedagogy/Resources**:
- Teaching materials
- Best practices
- Community guidelines

### 5. Guide Stubs

Six "how-to" guide pages with "Coming Soon" content:
- Structure in place for future content
- Consistent layout
- Navigation back to guides section

## Data Flow

### Static Generation
```
Build Time → MDX Processing → Static HTML
          → Type Checking
          → Asset Optimization
```

### Blog Posts
```
Content Editor → Decap CMS → Git Commit → Rebuild → Deploy
```

### Interactive Elements
```
Client Side → Canvas Rendering → 60fps Animation Loop
           → Event Handlers (mouse, keyboard, click)
```

## File Structure

```
/app                        # Next.js App Router
  /about/page.tsx
  /blog/
  /guides/
  /projects/
  /team/page.tsx
  layout.tsx               # Root layout
  page.tsx                 # Homepage
  globals.css              # Tailwind + CSS variables

/components/ui/            # Reusable components
  container.tsx
  section.tsx
  badge.tsx
  button.tsx
  interactive-background.tsx

/content/blog/             # MDX blog posts
  welcome-to-think.mdx

/public/
  /admin/config.yml        # Decap CMS config
  /images/                 # Static assets

package.json               # Dependencies
tsconfig.json              # TypeScript config
tailwind.config.ts         # Tailwind config
next.config.ts             # Next.js config
```

## Build & Deployment

### Development
```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
npm run lint    # ESLint check
```

### Production Build Stats
- 21 static pages
- All routes pre-rendered
- ~5s compile time
- Turbopack enabled

### Deployment Checklist
- [ ] Deploy to Vercel
- [ ] Configure environment variables
- [ ] Set up Decap CMS OAuth (GitHub)
- [ ] Configure custom domain
- [ ] Enable analytics (optional)
- [ ] Set up CI/CD for blog auto-rebuild

## Content Guidelines

### Tone & Voice
- **NOT**: Sales pitch, marketing language, promotional
- **YES**: Exploratory, intellectual, community-focused
- **Style**: Academic but accessible, detailed but concise
- **Reference**: Benjamin's Substack articles on AI in humanities

### Homepage Philosophy
- Gallery/database of projects, not feature showcase
- Community resource hub, not branded product
- Sortable/filterable (when implemented)
- Stats/metrics belong on individual project pages, NOT homepage

## Technical Decisions

### Why Static Site Generation?
- Fast performance
- Low hosting cost
- SEO friendly
- Git-based workflow matches academic collaboration

### Why Decap CMS?
- Open source
- Git-based (transparency, version control)
- No database required
- Team can edit via web UI
- Content stored in repo

### Why System Fonts?
- Performance (no external requests)
- Privacy
- Consistent with minimalist design
- Fast initial render

### Why Canvas for Backgrounds?
- 60fps smooth animations
- Full control over rendering
- No external dependencies
- Creative playground for easter eggs

## Known Issues

None currently - build passing, all features functional.

## Future Considerations

See "Next Steps" section below for planned improvements.

---

## Commit History Highlights

1. Initial scaffolding with Next.js + TypeScript + Tailwind
2. 15 pages built with project structure
3. Content fact-checked against NEH proposal
4. Decap CMS configured
5. **Reframe from sales pitch → community resource** (major restructure)
6. Added 6 how-to guide stubs
7. Interactive background (3 effects)
8. **Enhanced backgrounds: 6 modes, blue-slate theme, terminal, easter eggs**

---

*Last Updated: 2025-11-19*
*Maintained by: Claude Code*
