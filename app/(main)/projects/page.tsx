'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectCard } from '@/components/ui/project-card'
import Link from 'next/link'
import { Filter, Code } from 'lucide-react'
import { ProjectsBackground } from '@/components/ui/projects-background'
import { pageThemes } from '@/lib/page-themes'

const theme = pageThemes.projects

type FilterType = 'all' | 'assignment' | 'course' | 'research' | 'history' | 'literature' | 'linguistics'

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
      title: "Historical Figure Generator",
      description: "Create randomized but plausible historical figures from different eras",
      href: "/projects/historical-figure-generator",
      slug: "historical-figure-generator",
      type: "Generator",
      year: "2024",
      tags: ['History', 'Research Tool'],
      filters: ['research', 'history'] as FilterType[]
    }
  ]

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true
    return project.filters.includes(activeFilter)
  })

  return (
    <>
      <Section className="pt-16 pb-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <ProjectsBackground isHovered={isHeaderHovered} />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center mb-6">
            <div
              className="inline-block"
              onMouseEnter={() => setIsHeaderHovered(true)}
              onMouseLeave={() => setIsHeaderHovered(false)}
            >
              <h1 className="text-4xl font-serif font-bold mb-1">Project Gallery</h1>
              <div
                className="h-0.5 mx-auto transition-all duration-300"
                style={{
                  backgroundColor: theme.accent,
                  width: isHeaderHovered ? '100%' : '4rem'
                }}
              />
            </div>
            <p className="text-lg text-muted-foreground mt-3">
              Experimental AI tools for humanities teaching and research. All projects are part of the HistoryLens pedagogical framework, which combines primary sources with interactive simulations.
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filter by type</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <Badge
                className={`cursor-pointer transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-background hover:bg-cyan-600/10 hover:border-cyan-600/50 hover:text-cyan-700 dark:hover:text-cyan-400'
                }`}
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('all')}
              >
                All Projects
              </Badge>
              <Badge
                className={`cursor-pointer transition-colors ${
                  activeFilter === 'assignment'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-background hover:bg-cyan-600/10 hover:border-cyan-600/50 hover:text-cyan-700 dark:hover:text-cyan-400'
                }`}
                variant={activeFilter === 'assignment' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('assignment')}
              >
                Classroom Assignment
              </Badge>
              <Badge
                className={`cursor-pointer transition-colors ${
                  activeFilter === 'course'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-background hover:bg-cyan-600/10 hover:border-cyan-600/50 hover:text-cyan-700 dark:hover:text-cyan-400'
                }`}
                variant={activeFilter === 'course' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('course')}
              >
                Full Course
              </Badge>
              <Badge
                className={`cursor-pointer transition-colors ${
                  activeFilter === 'research'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-background hover:bg-cyan-600/10 hover:border-cyan-600/50 hover:text-cyan-700 dark:hover:text-cyan-400'
                }`}
                variant={activeFilter === 'research' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('research')}
              >
                Research Tool
              </Badge>
              <Badge
                className={`cursor-pointer transition-colors ${
                  activeFilter === 'history'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-background hover:bg-cyan-600/10 hover:border-cyan-600/50 hover:text-cyan-700 dark:hover:text-cyan-400'
                }`}
                variant={activeFilter === 'history' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('history')}
              >
                History
              </Badge>
              <Badge
                className={`cursor-pointer transition-colors ${
                  activeFilter === 'literature'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-background hover:bg-cyan-600/10 hover:border-cyan-600/50 hover:text-cyan-700 dark:hover:text-cyan-400'
                }`}
                variant={activeFilter === 'literature' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('literature')}
              >
                Literature
              </Badge>
              <Badge
                className={`cursor-pointer transition-colors ${
                  activeFilter === 'linguistics'
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-background hover:bg-cyan-600/10 hover:border-cyan-600/50 hover:text-cyan-700 dark:hover:text-cyan-400'
                }`}
                variant={activeFilter === 'linguistics' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('linguistics')}
              >
                Linguistics
              </Badge>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              />
            ))}

            {/* Placeholder for community contributions */}
            <Card className="group border-dashed border-2 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center h-full min-h-[200px] flex-col gap-3">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <Code className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <CardTitle className="text-lg mb-2">Share Your Project</CardTitle>
                    <CardDescription className="text-sm">
                      Built something interesting? We'd love to feature it here.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="mailto:bbreen@ucsc.edu">Get in touch</a>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        </Container>
      </Section>

      {/* HistoryLens Framework Section */}
      <Section className="bg-muted/40 border-t">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-serif font-bold mb-4 text-center">About the HistoryLens Framework</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                All projects featured here are built using the <strong>HistoryLens</strong> pedagogical framework, which combines interactive historical simulations with authentic primary sources. Rather than treating AI as a source of knowledge, HistoryLens encourages students to test AI against historical reality, discovering how these systems misinterpret the past, fabricate sources, and break in revealing ways.
              </p>
              <p className="leading-relaxed">
                This approach develops critical thinking skills while teaching students about both history and the limitations of AI systems. Students learn by doing—collecting specimens with Young Darwin, mixing remedies in the Apothecary Simulator, or generating plausible historical scenarios—always with an emphasis on source criticism and historical evidence.
              </p>
            </div>
            <div className="flex gap-4 justify-center mt-6">
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
          </div>
        </Container>
      </Section>

      {/* Get Started Section */}
      <Section className="border-t">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Use or Adapt These Projects</h2>
            <p className="text-muted-foreground mb-8">
              All materials are freely available. Browse our teaching guides to see how these tools work in practice, or dive into the modules themselves. Everything here is designed to be modified and built upon.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/guides">How-To Guides</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">About THINK</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
