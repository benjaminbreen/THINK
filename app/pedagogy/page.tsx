'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AssignmentCard } from '@/components/ui/assignment-card'
import { AssignmentListItem, AssignmentData } from '@/components/ui/assignment-list-item'
import { InkWashBackground } from '@/components/ui/ink-wash-background'
import { PedagogyBackground } from '@/components/ui/pedagogy-background'
import { AnimatedSection } from '@/components/ui/animated-section'
import { PageHeader } from '@/components/ui/page-header'
import { pageThemes } from '@/lib/page-themes'
import { siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FileText, ExternalLink, Filter, List, LayoutGrid } from 'lucide-react'

const theme = pageThemes.pedagogy

type FilterType = 'all' | 'assignment' | 'syllabus' | 'guide'
type ViewMode = 'list' | 'grid'
type ResourceSource = 'University' | 'Community College' | 'K-12' | 'Independent'

const resourceFilters: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All Resources' },
  { value: 'assignment', label: 'Assignments' },
  { value: 'syllabus', label: 'Syllabi' },
  { value: 'guide', label: 'Guides' },
]

const institutionTypes: { label: ResourceSource; dot: string }[] = [
  { label: 'University', dot: 'bg-blue-500' },
  { label: 'Community College', dot: 'bg-green-500' },
  { label: 'K-12', dot: 'bg-amber-500' },
  { label: 'Independent', dot: 'bg-purple-500' },
]

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
  const [isHistoryLensHovered, setIsHistoryLensHovered] = useState(false)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // Sample assignments with extended data
  const assignments: AssignmentData[] = [
    {
      id: '1',
      title: "Create a Digital Artifact about Drug History",
      description: "Final assignment offering creative, digital artifact, or research paper options (7-10 pages). Build an online exhibit, database, or interactive resource exploring the cultural history of drugs. Requires 2-5 primary sources and 5+ secondary sources with a clear argument.",
      href: "https://cultural-history-drugs.vercel.app/",
      slug: "drug-history-artifact",
      type: "Creative/Research",
      tags: ['History', 'Primary Sources', 'Digital Humanities', 'Research'],
      status: 'available',
      thumbnailPath: "/thumbnails/drug-history-artifact.png",
      pdfPath: "/pdfs/HIS151BDrugHistoryFinalAssignment.pdf",
      sampleSubmissionUrl: "https://cultural-history-drugs.vercel.app/",
      courseName: "HIS 151B: History of Drugs",
      institution: "UC Santa Cruz",
      gradeLevel: "Upper Division",
      author: "Benjamin Breen"
    },
    {
      id: '2',
      title: "Apothecary Simulator",
      description: "17th century medical practice simulation using authentic early modern recipes and primary sources. Students roleplay as an apprentice apothecary, learning historical pharmacology.",
      href: "/projects/apothecary-simulator",
      slug: "apothecary-simulator",
      type: "Simulation",
      tags: ['History', 'Primary Sources', 'Roleplay'],
      status: 'available',
      thumbnailPath: "/thumbnails/apothecary-simulator.png",
      courseName: "History of Medicine",
      institution: "UC Santa Cruz"
    },
    {
      id: '3',
      title: "Auditing AI Training Datasets",
      description: "Students probe the contingency of archives used to train LLMs, examining biases and gaps in training data. Develops critical thinking about how AI systems inherit historical prejudices.",
      href: "#",
      slug: "audit-datasets",
      type: "Critical Analysis",
      tags: ['AI Literacy', 'Research', 'Critical Thinking'],
      status: 'coming-soon',
      gradeLevel: "Upper Division/Graduate"
    },
    {
      id: '4',
      title: "Constructing Counterfactual Datasets",
      description: "Surface marginalized forms of knowledge by creating alternative datasets that challenge dominant narratives. Students build small-scale datasets highlighting overlooked perspectives.",
      href: "#",
      slug: "counterfactual-datasets",
      type: "Creative Project",
      tags: ['Critical Theory', 'Data', 'Research'],
      status: 'coming-soon',
      thumbnailPath: "/thumbnails/counterfactual-datasets.png",
      gradeLevel: "Graduate"
    },
    {
      id: '5',
      title: "Building Historical Simulations",
      description: "Guided project for creating historical simulations using HistoryLens and primary sources. Students learn prompt engineering while building educational tools.",
      href: "#",
      slug: "build-simulations",
      type: "Hands-On",
      tags: ['Technical', 'History', 'AI Literacy'],
      status: 'coming-soon',
      gradeLevel: "Upper Division"
    },
    {
      id: '6',
      title: "AI Inaccuracies Discussion",
      description: "Scaffolded reflective writing that helps students develop critical AI literacy through analysis of AI errors. Students document and analyze hallucinations.",
      href: "#",
      slug: "ai-inaccuracies",
      type: "Reflection",
      tags: ['Writing', 'AI Literacy', 'Critical Thinking'],
      status: 'coming-soon',
      gradeLevel: "Any Level"
    },
  ]

  // External resources - syllabi and assignments from elsewhere
  const externalResources: ExternalResource[] = [
    {
      id: '1',
      title: 'Humanities in the Age of AI',
      author: 'Dr. Anastasia Salter',
      institution: 'University of Central Florida',
      source: 'University',
      type: 'syllabus',
      url: 'https://anastasiasalter.net/HumanitiesAISyllabus/',
      description: 'Fall 2024 syllabus exploring critical perspectives on AI using texts like "Algorithms of Oppression" and hands-on experiments with AI tools',
      tags: ['Critical Thinking', 'Experiential Learning', 'Undergraduate']
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
      tags: ['Inquiry-Based', 'Socratic Method', 'Graduate']
    },
    {
      id: '3',
      title: 'Digital Humanities & Artificial Intelligence',
      author: 'Dr. Anastasia Salter',
      institution: 'University of Central Florida',
      source: 'University',
      type: 'syllabus',
      url: 'https://anastasiasalter.net/markdown_dhsi/',
      description: 'Spring 2025 course exploring how AI enhances humanistic inquiry while critically engaging with limitations and ethics',
      tags: ['Project-Based', 'Active Learning', 'Scaffolding']
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
      tags: ['Student Agency', 'Collaborative', 'Assessment Design']
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
      tags: ['Metacognition', 'Hands-On', 'Primary Sources']
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
      tags: ['Faculty Development', 'Instructional Design', 'Workshop']
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
      tags: ['Pedagogical Framework', 'Best Practices', 'Digital Humanities']
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
      tags: ['Universal Design', 'Course Design', 'Backward Design']
    },
  ]

  const filteredResources = externalResources.filter(resource => {
    if (activeFilter === 'all') return true
    return resource.type === activeFilter
  })

  const allTags = Array.from(new Set(externalResources.flatMap(resource => resource.tags)))

  return (
    <>
      {/* Header with grid background */}
      <Section className="section-top relative pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <InkWashBackground isHovered={isHeaderHovered} />
        </div>
        <Container className="relative">
          <AnimatedSection>
            <PageHeader
              title="Pedagogy Materials"
              accent={theme.accent}
              onHoverChange={setIsHeaderHovered}
              description="Sample assignments, syllabi, and resources for teaching with and about AI in the humanities"
            />
          </AnimatedSection>
        </Container>
      </Section>

      {/* Sample Assignments Section */}
      <Section className="section-y-sm">
        <Container>
          <AnimatedSection
            delay={100}
            className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <h2 className="text-title font-serif font-bold">Sample Assignments</h2>
              <p className="mt-2 text-muted-foreground">
                Ready-to-use assignments and simulation modules for your courses
              </p>
            </div>

            {/* View mode toggle */}
            <div className="inline-flex flex-shrink-0 self-start rounded-full border border-border bg-muted/50 p-1 sm:self-auto">
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
              <button
                type="button"
                aria-pressed={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                className={cn(
                  'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors',
                  viewMode === 'grid'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <LayoutGrid className="h-4 w-4" />
                Grid
              </button>
            </div>
          </AnimatedSection>

          {/* Assignments - List or Grid view */}
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <AssignmentListItem
                  key={assignment.id}
                  assignment={assignment}
                  animationDelay={((index + 1) * 100).toString()}
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              {assignments.map((assignment, index) => (
                <AssignmentCard
                  key={assignment.id}
                  title={assignment.title}
                  description={assignment.description}
                  href={assignment.href}
                  slug={assignment.slug}
                  type={assignment.type}
                  tags={assignment.tags}
                  status={assignment.status}
                  animationDelay={((index + 1) * 100).toString()}
                  thumbnailPath={assignment.thumbnailPath}
                  pdfPath={assignment.pdfPath}
                  sampleSubmissionUrl={assignment.sampleSubmissionUrl}
                  courseName={assignment.courseName}
                  institution={assignment.institution}
                  priority={index === 0}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* External Resources with Sidebar Filters */}
      <Section className="section-y border-t bg-muted/40">
        <Container>
          <div className="mb-9 text-center">
            <h2 className="text-title font-serif font-bold">Teaching Resources</h2>
            <p className="mt-2 text-muted-foreground">
              Syllabi, assignments, and guides from educators across institutions
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Filters — a scrolling chip row on small screens */}
            <div className="mb-8 lg:col-span-1 lg:mb-0">
              <div className="lg:sticky lg:top-24">
                <div className="mb-3 flex items-center gap-2 lg:mb-4">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <h3 className="eyebrow">Filter Resources</h3>
                </div>

                <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
                  {resourceFilters.map((filter) => {
                    const active = activeFilter === filter.value
                    return (
                      <button
                        key={filter.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setActiveFilter(filter.value)}
                        className={cn(
                          'inline-flex h-10 flex-shrink-0 items-center rounded-full px-4 text-sm font-medium transition-colors lg:w-full lg:justify-start lg:rounded-lg',
                          active
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'border border-border bg-card/70 text-muted-foreground hover:border-primary/30 hover:text-foreground lg:border-transparent lg:bg-transparent lg:hover:bg-accent/60'
                        )}
                      >
                        {filter.label}
                      </button>
                    )
                  })}
                </div>

                {/* Source Filter Legend */}
                <div className="mt-7 hidden rounded-xl border border-border/70 bg-card/60 p-4 lg:block">
                  <h3 className="eyebrow mb-3">By Institution Type</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {institutionTypes.map((item) => (
                      <li key={item.label} className="flex items-center gap-2.5">
                        <span className={cn('h-2 w-2 rounded-full', item.dot)} />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Resources List */}
            <div className="space-y-3 lg:col-span-3">
              {filteredResources.map((resource) => {
                const sourceColors = {
                  'University': 'bg-blue-500',
                  'Community College': 'bg-green-500',
                  'K-12': 'bg-amber-500',
                  'Independent': 'bg-purple-500'
                }

                return (
                  <Card key={resource.id} interactive className="group">
                    <CardHeader className="pb-4">
                      <div className="mb-2.5 flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${sourceColors[resource.source]}`} />
                        <Badge variant="outline" className="capitalize">
                          {resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-primary"
                        >
                          {resource.title}
                        </a>
                      </CardTitle>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {resource.author} • {resource.institution}
                      </p>
                      <CardDescription className="mt-2.5">
                        {resource.description}
                      </CardDescription>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button asChild variant="outline" size="sm" className="external-link">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5" />
                          View Resource
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}

              {/* Call to contribute */}
              <Card className="border-2 border-dashed border-border/70 bg-transparent shadow-none">
                <CardHeader className="items-center text-center">
                  <CardTitle className="text-lg">Share Your Resources</CardTitle>
                  <CardDescription>
                    Have syllabi or assignments to contribute? Help grow the THINK community!
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button asChild variant="outline">
                    <a href={`mailto:${siteConfig.email}`}>Submit Resources</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* About HistoryLens - with physics blocks background */}
      <Section className="section-y relative overflow-hidden border-t">
        <div className="absolute inset-0">
          <PedagogyBackground isHovered={isHistoryLensHovered} tags={allTags} />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="inline-block"
              onMouseEnter={() => setIsHistoryLensHovered(true)}
              onMouseLeave={() => setIsHistoryLensHovered(false)}
            >
              <h2 className="cursor-default text-title font-serif font-bold">About the HistoryLens Framework</h2>
              <div
                className="mx-auto mt-2 h-[2px] rounded-full transition-[width] duration-500 ease-out-expo"
                style={{
                  backgroundColor: theme.accent,
                  width: isHistoryLensHovered ? '100%' : '3.5rem'
                }}
              />
            </div>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              All simulation-based assignments are built using the HistoryLens pedagogical framework,
              which combines interactive historical simulations with authentic primary sources. Rather than
              treating AI as a source of knowledge, HistoryLens encourages students to test AI against
              historical reality, discovering how these systems misinterpret the past and break in revealing ways.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
