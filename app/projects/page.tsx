'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectCard } from '@/components/ui/project-card'
import { AnimatedSection } from '@/components/ui/animated-section'
import Link from 'next/link'
import { Filter, Code } from 'lucide-react'
import { ProjectsBackground } from '@/components/ui/projects-background'
import { PageHeader } from '@/components/ui/page-header'
import { pageThemes } from '@/lib/page-themes'
import { siteConfig } from '@/lib/config'

const theme = pageThemes.projects

type FilterType = 'all' | 'assignment' | 'course' | 'research' | 'history' | 'literature' | 'linguistics'

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'assignment', label: 'Classroom Assignment' },
  { value: 'course', label: 'Full Course' },
  { value: 'research', label: 'Research Tool' },
  { value: 'history', label: 'History' },
  { value: 'literature', label: 'Literature' },
  { value: 'linguistics', label: 'Linguistics' },
]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)

  const projects = [
    {
      title: "Young Darwin",
      description: "Interactive simulation of Darwin's Galápagos expedition with specimen collection",
      href: "/projects/young-darwin",
      slug: "young-darwin",
      type: "Simulation",
      year: "2024",
      tags: ['History', 'Classroom Assignment'],
      filters: ['assignment', 'history'] as FilterType[]
    },
    {
      title: "Apothecary Simulator",
      description: "17th century medical practice using authentic early modern recipes",
      href: "/projects/apothecary-simulator",
      slug: "apothecary-simulator",
      type: "Simulation",
      year: "2024",
      tags: ['History', 'Classroom Assignment'],
      filters: ['assignment', 'history'] as FilterType[]
    },
    {
      title: "History Simulator",
      description: "Generate historically plausible scenarios and figures for exploration",
      href: "/projects/history-simulator",
      slug: "history-simulator",
      type: "Generator",
      year: "2024",
      tags: ['History', 'Research Tool'],
      filters: ['research', 'history'] as FilterType[]
    },
    {
      title: "Historical Persona Generator",
      description: "Procedurally generate historically accurate character personas with pixel-art portraits and life histories",
      href: "/projects/historical-persona-generator",
      slug: "historical-persona-generator",
      type: "Generator",
      year: "2025",
      tags: ['World History', 'Digital Humanities'],
      filters: ['research', 'history'] as FilterType[]
    }
  ]

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true
    return project.filters.includes(activeFilter)
  })

  return (
    <>
      <Section className="section-top relative pb-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ProjectsBackground isHovered={isHeaderHovered} />
        </div>
        <Container className="relative">
          <AnimatedSection className="mb-10">
            <PageHeader
              title="Project Gallery"
              accent={theme.accent}
              onHoverChange={setIsHeaderHovered}
              description="Experimental AI tools for humanities teaching and research. All projects are part of the HistoryLens pedagogical framework, which combines primary sources with interactive simulations."
            />
          </AnimatedSection>

          {/* Filter Section */}
          <AnimatedSection delay={100} className="mb-9">
            <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter by type</span>
            </div>

            {/* One scrolling row on phones, a centred wrap once there's room */}
            <div className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
              {filters.map((filter) => {
                const active = activeFilter === filter.value
                return (
                  <Badge
                    key={filter.value}
                    interactive
                    role="button"
                    tabIndex={0}
                    aria-pressed={active}
                    variant={active ? 'default' : 'outline'}
                    className={
                      active
                        ? 'flex-shrink-0 snap-start border-transparent bg-cyan-600 text-white shadow-sm hover:bg-cyan-700'
                        : 'flex-shrink-0 snap-start bg-card/70 hover:border-cyan-600/50 hover:bg-cyan-600/10 hover:text-cyan-700 dark:hover:text-cyan-400'
                    }
                    onClick={() => setActiveFilter(filter.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActiveFilter(filter.value)
                      }
                    }}
                  >
                    {filter.label}
                  </Badge>
                )
              })}
            </div>
          </AnimatedSection>

          {/* Projects Grid */}
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                href={project.href}
                slug={project.slug}
                type={project.type}
                year={project.year}
                tags={project.tags}
                animationDelay={((index + 1) * 100).toString()}
                priority={index === 0}
              />
            ))}

            {/* Placeholder for community contributions */}
            <Card className="group border-2 border-dashed border-border/70 bg-transparent shadow-none transition-colors hover:border-primary/30">
              <CardHeader className="h-full">
                <div className="flex h-full min-h-[13rem] flex-col items-center justify-center gap-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
                    <Code className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <div>
                    <CardTitle className="mb-1.5 text-lg">Share Your Project</CardTitle>
                    <CardDescription>
                      Built something interesting? We'd love to feature it here.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild className="mt-1">
                    <a href={`mailto:${siteConfig.email}`}>Get in touch</a>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        </Container>
      </Section>

      {/* HistoryLens Framework Section */}
      <Section className="section-y border-t bg-muted/40">
        <Container>
          <AnimatedSection className="mx-auto max-w-3xl">
            <h2 className="mb-5 text-center text-title font-serif font-bold">About the HistoryLens Framework</h2>
            <div className="prose max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                All projects featured here are built using the <strong>HistoryLens</strong> pedagogical framework, which combines interactive historical simulations with authentic primary sources. Rather than treating AI as a source of knowledge, HistoryLens encourages students to test AI against historical reality, discovering how these systems misinterpret the past, fabricate sources, and break in revealing ways.
              </p>
              <p className="leading-relaxed">
                This approach develops critical thinking skills while teaching students about both history and the limitations of AI systems. Students learn by doing—collecting specimens with Young Darwin, mixing remedies in the Apothecary Simulator, or generating plausible historical scenarios—always with an emphasis on source criticism and historical evidence.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline">
                <Link href="/projects/historylens">
                  Learn more about HistoryLens
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/pedagogy">
                  Teaching Approach
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Get Started Section */}
      <Section className="section-y border-t">
        <Container>
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-title font-serif font-bold">Use or Adapt These Projects</h2>
            <p className="mb-8 text-muted-foreground">
              All materials are freely available. Browse our teaching guides to see how these tools work in practice, or dive into the modules themselves. Everything here is designed to be modified and built upon.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/guides">How-To Guides</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">About THINK</Link>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  )
}
