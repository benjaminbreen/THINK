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
import { pageThemes } from '@/lib/page-themes'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import { FileText, ExternalLink, Filter, List, LayoutGrid } from 'lucide-react'

const theme = pageThemes.pedagogy

type FilterType = 'all' | 'assignment' | 'syllabus' | 'guide'
type ViewMode = 'list' | 'grid'
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
      <Section className="pt-24 pb-6 relative">
        <div className="absolute inset-0 overflow-hidden">
          <InkWashBackground isHovered={isHeaderHovered} />
        </div>
        <Container className="relative">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
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
          </AnimatedSection>
        </Container>
      </Section>

      {/* Sample Assignments Section */}
      <Section className="pt-8 pb-8 sm:pt-10">
        <Container>
          <AnimatedSection delay={100} className="flex flex-col sm:flex-row sm:items-center sm:justify-between ">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">Sample Assignments</h2>
              <p className="text-muted-foreground mb-5">
                Ready-to-use assignments and simulation modules for your courses
              </p>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className="h-8"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-1.5" />
                List
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className="h-8"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4 mr-1.5" />
                Grid
              </Button>
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
            <div className="grid gap-6 md:grid-cols-2">
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
                />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* External Resources with Sidebar Filters */}
      <Section className="bg-muted/40 border-t py-12">
        <Container>
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold mb-2 text-center">Teaching Resources</h2>
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

              {/* Source Filter Legend */}
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
                          View Resource
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
                    <a href={`mailto:${siteConfig.email}`}>Submit Resources</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* About HistoryLens - with physics blocks background */}
      <Section className="border-t relative overflow-hidden py-12 sm:py-16">
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
              <h2 className="text-3xl font-serif font-bold mb-1 cursor-default">About the HistoryLens Framework</h2>
              <div
                className="h-0.5 mx-auto transition-all duration-300 mb-4"
                style={{
                  backgroundColor: theme.accent,
                  width: isHistoryLensHovered ? '100%' : '4rem'
                }}
              />
            </div>
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
