'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedSection } from '@/components/ui/animated-section'
import Link from 'next/link'
import Image from 'next/image'
import {
  Code, Sparkles, GraduationCap, Microscope, FileText, BookOpen,
  Grid3x3, List, ArrowUpDown, Lightbulb, ArrowRight
} from 'lucide-react'
import { GuidesBackground } from '@/components/ui/guides-background'
import { PageHeader } from '@/components/ui/page-header'
import { pageThemes } from '@/lib/page-themes'
import { cn } from '@/lib/utils'

const theme = pageThemes.guides

type ViewMode = 'cards' | 'list'
type SortBy = 'default' | 'title' | 'category'

interface Guide {
  id: string
  title: string
  description: string
  href: string
  category: 'Technical' | 'Pedagogical' | 'Research' | 'Best Practices'
  icon: any
  status: 'available' | 'coming-soon'
  thumbnail?: string // Optional thumbnail path in /public folder
}

const guides: Guide[] = [
  {
    id: 'claude-code-basics',
    title: 'Getting Started with Claude Code',
    description: 'Learn how to use Claude Code in the terminal to build custom AI tools—no technical background required',
    href: '/guides/claude-code-basics',
    category: 'Technical',
    icon: Code,
    status: 'available',
    thumbnail: '/thumbnails/claude-code-basics.png'
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering for Humanities',
    description: 'How to communicate effectively with AI when building educational tools and augmenting research workflows',
    href: '/guides/prompt-engineering',
    category: 'Technical',
    icon: FileText,
    status: 'available',
    thumbnail: '/thumbnails/prompt-engineering.png'
  },
  {
    id: 'history-machine-intelligence',
    title: 'History of Machine Intelligence',
    description: 'From 18th-century mechanist philosophy to contemporary AI—a humanities perspective on thinking machines',
    href: '/guides/history-machine-intelligence',
    category: 'Research',
    icon: BookOpen,
    status: 'available',
    thumbnail: '/thumbnails/history-machine-intelligence.png'
  },
  {
    id: 'building-simulations',
    title: 'Building Historical Simulations',
    description: 'Step-by-step guide to creating AI-powered historical simulations with HistoryLens',
    href: '/guides/building-simulations',
    category: 'Pedagogical',
    icon: Sparkles,
    status: 'coming-soon',
    thumbnail: '/thumbnails/building-simulations.png'
  },
  {
    id: 'ai-assignments',
    title: 'Designing AI Assignments',
    description: 'Best practices for creating effective AI-enhanced assignments that promote critical thinking',
    href: '/guides/ai-assignments',
    category: 'Pedagogical',
    icon: GraduationCap,
    status: 'coming-soon',
    thumbnail: '/thumbnails/ai-assignments.png'
  },
  {
    id: 'ai-historical-research',
    title: 'AI for Historical Research',
    description: 'NotebookLM, Elicit, Consensus, and other AI tools for augmenting scholarly research—from OCR to synthesis',
    href: '/guides/ai-historical-research',
    category: 'Research',
    icon: Microscope,
    status: 'available',
    thumbnail: '/thumbnails/ai-historical-research.png'
  },
  {
    id: 'critical-pedagogy',
    title: 'Critical AI Pedagogy',
    description: 'Teaching students to think critically about AI outputs, limitations, and biases',
    href: '/guides/critical-pedagogy',
    category: 'Pedagogical',
    icon: BookOpen,
    status: 'coming-soon',
    thumbnail: '/thumbnails/critical-pedagogy.png'
  },
  {
    id: 'responsible-ai-classroom',
    title: 'Responsible AI Use in the Classroom',
    description: 'How humanities faculty are approaching AI integration in 2025—policies, practices, and principles',
    href: '/guides/responsible-ai-classroom',
    category: 'Best Practices',
    icon: Lightbulb,
    status: 'available',
    thumbnail: '/thumbnails/responsible-ai-classroom.png'
  }
]

/** Wraps a guide card in a link only when the guide is actually published. */
function GuideShell({
  href,
  available,
  children,
}: {
  href: string
  available: boolean
  children: React.ReactNode
}) {
  if (!available) return <div className="group block">{children}</div>
  return (
    <Link href={href} className="group block">
      {children}
    </Link>
  )
}

export default function GuidesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const [sortBy, setSortBy] = useState<SortBy>('default')
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)

  const sortedGuides = [...guides].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    }
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category)
    }
    return 0 // default order
  })

  const categoryColors = {
    'Technical': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Pedagogical': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Research': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Best Practices': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
  }

  return (
    <>
      <Section className="section-top relative pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GuidesBackground isHovered={isHeaderHovered} />
        </div>
        <Container className="relative">
          <AnimatedSection className="mb-10">
            <PageHeader
              title="How-to Guides"
              accent={theme.accent}
              onHoverChange={setIsHeaderHovered}
              description="Comprehensive guides for building AI tools, designing assignments, and integrating AI thoughtfully into humanities teaching and research"
            />
          </AnimatedSection>

          {/* View Controls */}
          <AnimatedSection
            delay={100}
            className="mb-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Segmented control for the two layouts */}
            <div className="inline-flex self-start rounded-full border border-border bg-muted/50 p-1">
              <button
                type="button"
                aria-pressed={viewMode === 'cards'}
                onClick={() => setViewMode('cards')}
                className={cn(
                  'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors',
                  viewMode === 'cards'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Grid3x3 className="h-4 w-4" />
                Cards
              </button>
              <button
                type="button"
                aria-pressed={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                className={cn(
                  'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors',
                  viewMode === 'list'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <List className="h-4 w-4" />
                List
              </button>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (sortBy === 'default') setSortBy('title')
                  else if (sortBy === 'title') setSortBy('category')
                  else setSortBy('default')
                }}
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortBy === 'default' && 'Default'}
                {sortBy === 'title' && 'Title'}
                {sortBy === 'category' && 'Category'}
              </Button>
            </div>
          </AnimatedSection>

          {/* Cards View */}
          {viewMode === 'cards' && (
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {sortedGuides.map((guide, index) => {
                const Icon = guide.icon
                const available = guide.status === 'available'

                return (
                  <GuideShell key={guide.id} href={guide.href} available={available}>
                    <Card
                      interactive={available}
                      className={cn(
                        'flex h-full flex-col overflow-hidden',
                        !available && 'opacity-70'
                      )}
                    >
                      {guide.thumbnail ? (
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/40">
                          <Image
                            src={guide.thumbnail}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            priority={index === 0}
                          />
                          <div className="absolute right-3 top-3">
                            <Badge className={cn('shadow-sm', categoryColors[guide.category])}>
                              {guide.category}
                            </Badge>
                          </div>
                        </div>
                      ) : null}
                      <CardHeader className="flex-1 gap-0 space-y-0 pb-4">
                        {!guide.thumbnail && (
                          <div className="mb-4 flex items-start justify-between gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/10">
                              <Icon className="h-5 w-5 text-amber-600" />
                            </div>
                            <Badge className={categoryColors[guide.category]}>
                              {guide.category}
                            </Badge>
                          </div>
                        )}
                        <CardTitle className="text-lg transition-colors duration-200 group-hover:text-primary">
                          {guide.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {available ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                            Read guide
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Coming soon
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  </GuideShell>
                )
              })}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-3">
              {sortedGuides.map((guide) => {
                const Icon = guide.icon
                const available = guide.status === 'available'

                return (
                  <GuideShell key={guide.id} href={guide.href} available={available}>
                    <Card
                      interactive={available}
                      className={cn('overflow-hidden', !available && 'opacity-70')}
                    >
                      <CardHeader className="p-4 sm:p-5">
                        <div className="flex items-start gap-4">
                          {guide.thumbnail ? (
                            <div className="relative aspect-[16/10] w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:w-32">
                              <Image
                                src={guide.thumbnail}
                                alt=""
                                fill
                                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                                sizes="128px"
                              />
                            </div>
                          ) : (
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-600/10">
                              <Icon className="h-6 w-6 text-amber-600" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="mb-1.5 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                              <CardTitle className="text-lg transition-colors duration-200 group-hover:text-primary sm:text-xl">
                                {guide.title}
                              </CardTitle>
                              <Badge className={cn('flex-shrink-0', categoryColors[guide.category])}>
                                {guide.category}
                              </Badge>
                            </div>
                            <CardDescription>{guide.description}</CardDescription>
                            <div className="mt-3">
                              {available ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                                  Read guide
                                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                                </span>
                              ) : (
                                <span className="text-sm text-muted-foreground">
                                  Coming soon
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </GuideShell>
                )
              })}
            </div>
          )}

          {/* Categories Legend */}
          <div className="mt-14 rounded-2xl border border-border/70 bg-muted/40 p-6 sm:p-7">
            <h3 className="eyebrow mb-5">Guide Categories</h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Badge className={categoryColors['Technical']}>Technical</Badge>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  Building tools and working with AI systems
                </p>
              </div>
              <div>
                <Badge className={categoryColors['Pedagogical']}>Pedagogical</Badge>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  Designing courses, assignments, and simulations
                </p>
              </div>
              <div>
                <Badge className={categoryColors['Research']}>Research</Badge>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  Augmenting scholarly research workflows
                </p>
              </div>
              <div>
                <Badge className={categoryColors['Best Practices']}>Best Practices</Badge>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  Ethical approaches and institutional guidelines
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Additional Resources */}
      <Section className="section-y border-t bg-muted/40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-title font-serif font-bold">Looking for More?</h2>
            <p className="mb-8 text-muted-foreground">
              Explore our project gallery to see these principles in action, or check out the pedagogy
              materials page for curriculum modules and sample assignments.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline">
                <Link href="/projects">
                  Browse Projects
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/pedagogy">
                  Pedagogy Materials
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/resources">
                  Historical Resources
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
