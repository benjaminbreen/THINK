'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AssignmentCard } from '@/components/ui/assignment-card'
import { PedagogyBackground } from '@/components/ui/pedagogy-background'
import { pageThemes } from '@/lib/page-themes'
import Link from 'next/link'
import { FileText, ExternalLink, Filter, List as ListIcon } from 'lucide-react'

const theme = pageThemes.pedagogy

type FilterType = 'all' | 'assignment' | 'syllabus' | 'guide'
type ResourceSource = 'University' | 'Community College' | 'K-12' | 'Independent'

interface ExternalResource {
  id: string
  title: string
  author: string
  institution: string
  source: ResourceSource
  type: FilterType
  url: string
  description: string
  tags: string[]
}

export default function PedagogyPage() {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  // Sample assignments - 9 total for 3x3 grid
  const assignments = [
    {
      title: "Young Darwin Simulation",
      description: "Interactive exploration of Darwin's Galápagos expedition with specimen collection and analysis",
      href: "/projects/young-darwin",
      slug: "young-darwin",
      type: "Simulation",
      tags: ['History', 'Critical Thinking'],
      status: 'available' as const
    },
    {
      title: "Apothecary Simulator",
      description: "17th century medical practice using authentic early modern recipes and primary sources",
      href: "/projects/apothecary-simulator",
      slug: "apothecary-simulator",
      type: "Simulation",
      tags: ['History', 'Primary Sources'],
      status: 'available' as const
    },
    {
      title: "Auditing AI Training Datasets",
      description: "Students probe the contingency of archives used to train LLMs, examining biases and gaps",
      href: "#",
      slug: "audit-datasets",
      type: "Critical Analysis",
      tags: ['AI Literacy', 'Research'],
      status: 'coming-soon' as const
    },
    {
      title: "Constructing Counterfactual Datasets",
      description: "Surface marginalized forms of knowledge by creating alternative datasets that challenge dominant narratives",
      href: "#",
      slug: "counterfactual-datasets",
      type: "Creative Project",
      tags: ['Critical Theory', 'Data'],
      status: 'coming-soon' as const
    },
    {
      title: "Building Historical Simulations",
      description: "Guided project for creating historical simulations using HistoryLens and primary sources",
      href: "#",
      slug: "build-simulations",
      type: "Hands-On",
      tags: ['Technical', 'History'],
      status: 'coming-soon' as const
    },
    {
      title: "AI Inaccuracies Discussion",
      description: "Scaffolded reflective writing that helps students develop critical AI literacy through analysis of AI errors",
      href: "#",
      slug: "ai-inaccuracies",
      type: "Reflection",
      tags: ['Writing', 'AI Literacy'],
      status: 'coming-soon' as const
    },
    {
      title: "Primary Source Analysis with AI",
      description: "Using AI tools to analyze historical documents while maintaining source criticism and scholarly rigor",
      href: "#",
      slug: "source-analysis",
      type: "Analysis",
      tags: ['History', 'Research'],
      status: 'coming-soon' as const
    },
    {
      title: "Collaborative Timeline Building",
      description: "Students work together to create interactive historical timelines using AI-assisted research",
      href: "#",
      slug: "timeline-building",
      type: "Collaborative",
      tags: ['History', 'Teamwork'],
      status: 'coming-soon' as const
    },
    {
      title: "Critical AI Pedagogy Seminar",
      description: "Discussion-based assignment exploring ethical implications of AI in education",
      href: "#",
      slug: "critical-pedagogy",
      type: "Discussion",
      tags: ['Ethics', 'Pedagogy'],
      status: 'coming-soon' as const
    }
  ]

  // External resources - syllabi and assignments from elsewhere (real resources)
  const externalResources: ExternalResource[] = [
    {
      id: '1',
      title: 'Humanities in the Age of AI',
      author: 'Dr. Anastasia Salter',
      institution: 'University of Central Florida',
      source: 'University',
      type: 'syllabus',
      url: 'http://anastasiasalter.net/HumanitiesAISyllabus/',
      description: 'Fall 2024 syllabus exploring critical perspectives on AI using texts like "Algorithms of Oppression" and hands-on experiments with AI tools',
      tags: ['Critical Theory', 'Digital Humanities', 'Undergraduate']
    },
    {
      id: '2',
      title: 'AI and the Humanities Syllabus',
      author: 'University of Chicago',
      institution: 'University of Chicago',
      source: 'University',
      type: 'syllabus',
      url: 'https://home.uchicago.edu/~jcarlsen/academics/downloads/Tharsen%20DIGS%2020006-30006%20AI%20and%20the%20Humanities%20Syllabus%202025_final3.pdf',
      description: '2025 course syllabus including feminist AI perspectives and critical engagement with intelligent machines',
      tags: ['Philosophy', 'Ethics', 'Graduate']
    },
    {
      id: '3',
      title: 'Digital Humanities & Artificial Intelligence',
      author: 'Dr. Anastasia Salter',
      institution: 'University of Central Florida',
      source: 'University',
      type: 'syllabus',
      url: 'http://anastasiasalter.net/markdown_dhsi/',
      description: 'Spring 2025 course exploring how AI enhances humanistic inquiry while critically engaging with limitations and ethics',
      tags: ['Digital Humanities', 'Data Visualization', 'Text Analysis']
    },
    {
      id: '4',
      title: 'AI Pedagogy Project Assignment Collection',
      author: 'Sarah Newman & metaLAB Team',
      institution: 'Harvard University',
      source: 'University',
      type: 'assignment',
      url: 'https://aipedagogy.org/assignments/',
      description: 'Searchable collection of educator-designed assignments for integrating AI into humanities syllabi responsibly and critically',
      tags: ['Assignments', 'Best Practices', 'Curated Resources']
    },
    {
      id: '5',
      title: 'Introduction to Digital Humanities',
      author: 'Prof. Stewart',
      institution: 'Purdue University',
      source: 'University',
      type: 'syllabus',
      url: 'https://www.cla.purdue.edu/academic/history/documents/syllabus-spring-documents/2024/spring-2024-hist-302-syllabus-stewart.pdf',
      description: 'Spring 2024 history course introducing digital methods and AI tools for historical research',
      tags: ['History', 'Digital Methods', 'Undergraduate']
    },
    {
      id: '6',
      title: 'AI and Pedagogy Workshop Series',
      author: 'Laura Wittman & Digital Humanities Team',
      institution: 'Stanford University',
      source: 'University',
      type: 'guide',
      url: 'https://digitalhumanities.stanford.edu/ai-and-pedagogy-workshop/',
      description: 'Three-part workshop on understanding LLMs, pedagogy, and creating assignments with AI tools',
      tags: ['Professional Development', 'LLMs', 'Workshop']
    },
    {
      id: '7',
      title: 'The AI Pedagogy Project',
      author: 'metaLAB (at) Harvard',
      institution: 'Harvard University, Berkman Klein Center',
      source: 'University',
      type: 'guide',
      url: 'https://aipedagogy.org/',
      description: 'Comprehensive resource for educators in humanities and non-technical fields with assignments, concepts, and recommendations',
      tags: ['Best Practices', 'Humanities', 'Curated Resources']
    },
    {
      id: '8',
      title: 'Teaching in the Age of AI',
      author: 'Derek Bok Center for Teaching and Learning',
      institution: 'Harvard University',
      source: 'University',
      type: 'guide',
      url: 'https://bokcenter.harvard.edu/artificial-intelligence',
      description: 'Harvard teaching center resources on incorporating AI thoughtfully into course design and assignments',
      tags: ['Best Practices', 'Course Design', 'Teaching Resources']
    },
    {
      id: '9',
      title: 'AI Teaching Strategies',
      author: 'Center for Teaching and Learning',
      institution: 'Stanford University',
      source: 'University',
      type: 'guide',
      url: 'https://ctl.stanford.edu/aimes/ai-teaching-strategies',
      description: 'AIMES initiative resources including examples from Stanford instructors and critical AI literacy for educators',
      tags: ['Teaching Strategies', 'AI Literacy', 'Faculty Resources']
    }
  ]

  const filteredResources = externalResources.filter(resource => {
    if (activeFilter === 'all') return true
    return resource.type === activeFilter
  })

  return (
    <>
      {/* Header with pedagogy background */}
      <Section className="pt-16 pb-2 relative">
        <div className="absolute inset-0 overflow-hidden">
          <PedagogyBackground isHovered={isHeaderHovered} />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="inline-block"
              onMouseEnter={() => setIsHeaderHovered(true)}
              onMouseLeave={() => setIsHeaderHovered(false)}
            >
              <h1 className="text-4xl font-serif font-bold mb-1">Pedagogy Materials</h1>
              <div
                className="h-0.5 mx-auto transition-all duration-300"
                style={{
                  backgroundColor: theme.accent,
                  width: isHeaderHovered ? '100%' : '4rem'
                }}
              />
            </div>
            <p className="text-lg text-muted-foreground mt-3">
              Sample assignments, syllabi, and resources for teaching with and about AI in the humanities
            </p>
          </div>
        </Container>
      </Section>

      {/* Sample Assignments Grid - reduced padding */}
      <Section className="pt-4 pb-8">
        <Container>
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-bold mb-2 text-center">Sample Assignments</h2>
            <p className="text-muted-foreground text-center">
              Ready-to-use assignments and simulation modules for your courses
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment, index) => (
              <AssignmentCard
                key={assignment.slug}
                title={assignment.title}
                description={assignment.description}
                href={assignment.href}
                slug={assignment.slug}
                type={assignment.type}
                tags={assignment.tags}
                status={assignment.status}
                animationDelay={((index + 1) * 100).toString()}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* External Resources with Sidebar Filters */}
      <Section className="bg-muted/40 border-t py-12">
        <Container>
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold mb-2 text-center">Community Resources</h2>
            <p className="text-muted-foreground text-center">
              Syllabi, assignments, and guides from educators across institutions
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1 mb-6 lg:mb-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <CardTitle className="text-sm">Filter Resources</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={activeFilter === 'all' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('all')}
                  >
                    All Resources
                  </Button>
                  <Button
                    variant={activeFilter === 'assignment' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('assignment')}
                  >
                    Assignments
                  </Button>
                  <Button
                    variant={activeFilter === 'syllabus' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('syllabus')}
                  >
                    Syllabi
                  </Button>
                  <Button
                    variant={activeFilter === 'guide' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setActiveFilter('guide')}
                  >
                    Guides
                  </Button>
                </CardContent>
              </Card>

              {/* Source Filter */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">By Institution Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>University</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Community College</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <span>K-12</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>Independent</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resources List */}
            <div className="lg:col-span-3 space-y-4">
              {filteredResources.map((resource) => {
                const sourceColors = {
                  'University': 'bg-blue-500',
                  'Community College': 'bg-green-500',
                  'K-12': 'bg-amber-500',
                  'Independent': 'bg-purple-500'
                }

                return (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`h-2 w-2 rounded-full ${sourceColors[resource.source]}`}></div>
                            <Badge variant="outline" className="text-xs">
                              {resource.type}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg mb-1">{resource.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-2">
                            {resource.author} • {resource.institution}
                          </p>
                          <CardDescription className="mb-3">
                            {resource.description}
                          </CardDescription>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {resource.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" size="sm">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          View Resource (Placeholder)
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}

              {/* Call to contribute */}
              <Card className="border-dashed border-2">
                <CardHeader>
                  <CardTitle className="text-center">Share Your Resources</CardTitle>
                  <CardDescription className="text-center">
                    Have syllabi or assignments to contribute? Help grow the THINK community!
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button asChild variant="outline">
                    <a href="mailto:bbreen@ucsc.edu">Submit Resources</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* About HistoryLens */}
      <Section className="border-t">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">About the HistoryLens Framework</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              All simulation-based assignments are built using the HistoryLens pedagogical framework,
              which combines interactive historical simulations with authentic primary sources. Rather than
              treating AI as a source of knowledge, HistoryLens encourages students to test AI against
              historical reality, discovering how these systems misinterpret the past and break in revealing ways.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild>
                <Link href="/projects/historylens">Learn About HistoryLens</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/guides">View Teaching Guides</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
