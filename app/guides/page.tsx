'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import {
  Code, Sparkles, GraduationCap, Microscope, FileText, BookOpen,
  Grid3x3, List, ArrowUpDown, Lightbulb
} from 'lucide-react'
import { GuidesBackground } from '@/components/ui/guides-background'
import { pageThemes } from '@/lib/page-themes'

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
      <Section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GuidesBackground />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center mb-8">
            <div
              className="inline-block"
              onMouseEnter={() => setIsHeaderHovered(true)}
              onMouseLeave={() => setIsHeaderHovered(false)}
            >
              <h1 className="text-4xl font-serif font-bold mb-1">How-to Guides</h1>
              <div
                className="h-0.5 mx-auto transition-all duration-300"
                style={{
                  backgroundColor: theme.accent,
                  width: isHeaderHovered ? '100%' : '4rem'
                }}
              />
            </div>
            <p className="text-lg text-muted-foreground mt-3">
              Comprehensive guides for building AI tools, designing assignments, and integrating AI thoughtfully into humanities teaching and research
            </p>
          </div>

          {/* View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                <Grid3x3 className="h-4 w-4 mr-2" />
                Cards
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>

            <div className="flex gap-2 items-center">
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
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {sortBy === 'default' && 'Default'}
                {sortBy === 'title' && 'Title'}
                {sortBy === 'category' && 'Category'}
              </Button>
            </div>
          </div>

          {/* Cards View */}
          {viewMode === 'cards' && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedGuides.map((guide, index) => {
                const Icon = guide.icon
                return (
                  <Card
                    key={guide.id}
                    className={`group hover-lift-glow transition-all overflow-hidden ${guide.status === 'coming-soon' ? 'opacity-60' : ''}`}
                  >
                    {guide.thumbnail ? (
                      <div className="relative w-full h-48 bg-muted">
                        <Image
                          src={guide.thumbnail}
                          alt={guide.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className={categoryColors[guide.category]}>
                            {guide.category}
                          </Badge>
                        </div>
                      </div>
                    ) : null}
                    <CardHeader>
                      {!guide.thumbnail && (
                        <div className="flex items-start justify-between mb-3">
                          <div className="h-10 w-10 rounded-lg bg-amber-600/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-amber-600" />
                          </div>
                          <Badge className={categoryColors[guide.category]}>
                            {guide.category}
                          </Badge>
                        </div>
                      )}
                      <CardTitle className="text-lg mb-2">{guide.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {guide.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {guide.status === 'available' ? (
                        <Link
                          href={guide.href}
                          className="text-sm text-primary hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform"
                        >
                          Read guide →
                        </Link>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Coming soon
                        </span>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {sortedGuides.map((guide) => {
                const Icon = guide.icon
                return (
                  <Card
                    key={guide.id}
                    className={`hover:shadow-md transition-shadow overflow-hidden ${guide.status === 'coming-soon' ? 'opacity-60' : ''}`}
                  >
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        {guide.thumbnail ? (
                          <div className="relative w-32 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <Image
                              src={guide.thumbnail}
                              alt={guide.title}
                              fill
                              className="object-cover"
                              sizes="128px"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-amber-600/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-6 w-6 text-amber-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <CardTitle className="text-xl">{guide.title}</CardTitle>
                            <Badge className={`${categoryColors[guide.category]} flex-shrink-0`}>
                              {guide.category}
                            </Badge>
                          </div>
                          <CardDescription className="mb-3">
                            {guide.description}
                          </CardDescription>
                          {guide.status === 'available' ? (
                            <Button asChild variant="outline" size="sm">
                              <Link href={guide.href}>
                                Read guide →
                              </Link>
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              Coming soon
                            </span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Categories Legend */}
          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-4">Guide Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Badge className={categoryColors['Technical']}>Technical</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Building tools and working with AI systems
                </p>
              </div>
              <div>
                <Badge className={categoryColors['Pedagogical']}>Pedagogical</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Designing courses, assignments, and simulations
                </p>
              </div>
              <div>
                <Badge className={categoryColors['Research']}>Research</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Augmenting scholarly research workflows
                </p>
              </div>
              <div>
                <Badge className={categoryColors['Best Practices']}>Best Practices</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Ethical approaches and institutional guidelines
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Additional Resources */}
      <Section className="bg-muted/40 border-t">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Looking for More?</h2>
            <p className="text-muted-foreground mb-8">
              Explore our project gallery to see these principles in action, or check out the pedagogy
              materials page for curriculum modules and sample assignments.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
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
