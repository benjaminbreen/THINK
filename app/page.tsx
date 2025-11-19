'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Code, FileText, GraduationCap, Microscope, Sparkles, Filter, ArrowUpDown } from 'lucide-react'
import { InteractiveBackground } from '@/components/ui/interactive-background'
import { projects, filterProjects, sortProjects, type ProjectType, type Discipline } from '@/data/projects'

export default function HomePage() {
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'all'>('all')
  const [disciplineFilter, setDisciplineFilter] = useState<Discipline | 'all'>('all')
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'>('date-desc')

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = filterProjects(projects, {
      type: typeFilter,
      discipline: disciplineFilter
    })
    return sortProjects(filtered, sortBy)
  }, [typeFilter, disciplineFilter, sortBy])

  // Helper to get display label for tool tag
  const getToolTagLabel = (tag: string) => {
    const labels: Record<string, string> = {
      'framework': 'Framework',
      'simulation': 'Simulation',
      'generator': 'Generator',
      'analyzer': 'Analyzer'
    }
    return labels[tag] || tag
  }

  // Helper to get display label for project type
  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'classroom-assignment': 'Classroom Assignment',
      'full-course': 'Full Course',
      'research-tool': 'Research Tool'
    }
    return labels[type] || type
  }

  // Helper to format date
  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-')
    return year
  }

  // Cycle through sort options
  const cycleSortOrder = () => {
    const sortOptions: Array<'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'> = ['date-desc', 'date-asc', 'name-asc', 'name-desc']
    const currentIndex = sortOptions.indexOf(sortBy)
    const nextIndex = (currentIndex + 1) % sortOptions.length
    setSortBy(sortOptions[nextIndex])
  }

  const getSortLabel = () => {
    const labels = {
      'date-desc': 'Newest First',
      'date-asc': 'Oldest First',
      'name-asc': 'A → Z',
      'name-desc': 'Z → A'
    }
    return labels[sortBy]
  }

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24 pb-16 sm:pt-32 sm:pb-24 relative overflow-hidden">
        <InteractiveBackground />
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="inline-block mb-4 animate-fade-in">
              <Badge variant="outline" className="text-sm font-normal">
                A collaborative resource for experimental AI tools in the humanities
              </Badge>
            </div>
            <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-6xl mb-6 animate-fade-in animation-delay-100">
              Building AI Tools for Teaching & Research
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in animation-delay-200 leading-relaxed max-w-3xl">
              A free, open resource hub for educators and researchers exploring experimental uses of AI in the humanities.
              Browse projects, share your own work, and learn how to build custom tools for your courses and research.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Button asChild size="lg" variant="outline">
                <Link href="#projects">
                  <Sparkles className="mr-2 h-4 w-4" /> Browse Projects
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#guides">
                  <BookOpen className="mr-2 h-4 w-4" /> How-to Guides
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">
                  About THINK
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Project Gallery */}
      <Section id="projects" className="bg-muted/40">
        <Container>
          <div className="mb-12">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-2">Project Gallery</h2>
                <p className="text-muted-foreground">
                  {filteredAndSortedProjects.length} experimental AI tool{filteredAndSortedProjects.length !== 1 ? 's' : ''} for humanities teaching and research
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={cycleSortOrder}>
                <ArrowUpDown className="mr-2 h-4 w-4" /> {getSortLabel()}
              </Button>
            </div>

            {/* Filter controls */}
            <div className="space-y-4 mb-8">
              {/* Type filters */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5" /> Filter by Type
                </label>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={typeFilter === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setTypeFilter('all')}
                  >
                    All Projects
                  </Badge>
                  <Badge
                    variant={typeFilter === 'classroom-assignment' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setTypeFilter('classroom-assignment')}
                  >
                    Classroom Assignment
                  </Badge>
                  <Badge
                    variant={typeFilter === 'full-course' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setTypeFilter('full-course')}
                  >
                    Full Course
                  </Badge>
                  <Badge
                    variant={typeFilter === 'research-tool' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setTypeFilter('research-tool')}
                  >
                    Research Tool
                  </Badge>
                </div>
              </div>

              {/* Discipline filters */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5" /> Filter by Discipline
                </label>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={disciplineFilter === 'all' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setDisciplineFilter('all')}
                  >
                    All Disciplines
                  </Badge>
                  <Badge
                    variant={disciplineFilter === 'history' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setDisciplineFilter('history')}
                  >
                    History
                  </Badge>
                  <Badge
                    variant={disciplineFilter === 'literature' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setDisciplineFilter('literature')}
                  >
                    Literature
                  </Badge>
                  <Badge
                    variant={disciplineFilter === 'linguistics' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setDisciplineFilter('linguistics')}
                  >
                    Linguistics
                  </Badge>
                  <Badge
                    variant={disciplineFilter === 'interdisciplinary' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setDisciplineFilter('interdisciplinary')}
                  >
                    Interdisciplinary
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            layout
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSortedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300 hover-lift h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {getToolTagLabel(project.toolTag)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(project.date)}
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-sm mb-3">
                        {project.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="outline" className="text-xs capitalize">
                          {project.discipline}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(project.type)}
                        </Badge>
                        {project.featured && (
                          <Badge variant="outline" className="text-xs bg-primary/5">
                            ⭐ Featured
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 flex-wrap">
                        <Link
                          href={project.links.docs || `/projects/${project.slug}`}
                          className="text-sm text-primary hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform"
                        >
                          View project <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary hover:underline inline-flex items-center"
                          >
                            Try demo
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary hover:underline inline-flex items-center"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Placeholder for community contributions */}
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group border-dashed border-2 hover:border-primary/30 transition-colors h-full">
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
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>

      {/* How-to Guides */}
      <Section id="guides" className="border-t">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold mb-2">How-to Guides</h2>
            <p className="text-lg text-muted-foreground">
              Learn how to build your own experimental AI tools for teaching and research
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2">Getting Started with Claude Code</CardTitle>
                <CardDescription className="text-sm">
                  Learn how to use Claude Code in the terminal to build custom AI tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/claude-code-basics" className="text-sm text-primary hover:underline inline-flex items-center">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2">Building Historical Simulations</CardTitle>
                <CardDescription className="text-sm">
                  Step-by-step guide to creating AI-powered historical simulations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/building-simulations" className="text-sm text-primary hover:underline inline-flex items-center">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2">Designing AI Assignments</CardTitle>
                <CardDescription className="text-sm">
                  Best practices for creating effective AI-enhanced assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/ai-assignments" className="text-sm text-primary hover:underline inline-flex items-center">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Microscope className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2">AI for Research Workflows</CardTitle>
                <CardDescription className="text-sm">
                  Using LLMs for historical research, translation, and data analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/research-workflows" className="text-sm text-primary hover:underline inline-flex items-center">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2">Prompt Engineering for Humanities</CardTitle>
                <CardDescription className="text-sm">
                  Techniques for writing effective prompts for historical and literary analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/prompt-engineering" className="text-sm text-primary hover:underline inline-flex items-center">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover-lift">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg mb-2">Critical AI Pedagogy</CardTitle>
                <CardDescription className="text-sm">
                  Teaching students to think critically about AI outputs and limitations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/critical-pedagogy" className="text-sm text-primary hover:underline inline-flex items-center">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Community & Collaboration */}
      <Section className="bg-muted/40 border-t">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-serif font-bold mb-4">About This Resource</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                This is a collaborative clearinghouse for experimental AI tools in the humanities, maintained by faculty
                and students at UC Santa Cruz with support from the National Endowment for the Humanities.
              </p>
              <p className="leading-relaxed">
                We believe that humanists should be building their own AI tools rather than relying solely on
                commercial products. The projects featured here demonstrate what's possible when educators and researchers
                take an active, critical, and creative role in shaping how AI gets used in teaching and scholarship.
              </p>
              <p className="leading-relaxed">
                All materials are freely available. We welcome contributions from the wider community—if you've built
                something interesting or have ideas to share, please get in touch.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button asChild variant="outline">
                <Link href="/about">
                  Read more about THINK
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/team">
                  Meet the team
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blog">
                  Read the blog
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
