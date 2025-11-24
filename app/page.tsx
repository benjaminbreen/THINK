import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { ProjectCard } from '@/components/ui/project-card'
import { GuideCard } from '@/components/ui/guide-card'
import { ArrowRight, BookOpen, Code, FileText, GraduationCap, Microscope, Sparkles, Lightbulb } from 'lucide-react'
import { InteractiveBackground, LiteraryTransformer } from '@/components/page-wrapper'

export default function HomePage() {
  return (
    <>
      <LiteraryTransformer />
      {/* Hero Section */}
      <Section className="pt-16 pb-8 sm:pt-24 sm:pb-12 relative overflow-hidden mixed-mode-dark">
        <InteractiveBackground />
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="inline-block mb-3 animate-fade-in">
              <Badge variant="outline" className="text-sm font-normal border-amber-600/30 text-amber-100">
                <span data-literary="hero-badge">A collaborative resource for experimental AI tools in the humanities</span>
              </Badge>
            </div>
            <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-6xl mb-3 animate-fade-in animation-delay-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" data-literary="hero-title">
              Building AI Tools for Teaching & Research
            </h1>
            <p className="text-lg text-white/80 mb-5 animate-fade-in animation-delay-200 leading-normal max-w-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]" data-literary="hero-description">
              A free, open resource hub for educators and researchers exploring experimental uses of AI in the humanities.
              Browse projects, share your own work, and learn how to build custom tools for your courses and research.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in animation-delay-300">
              <Button asChild size="lg" className="btn-hover-scale bg-amber-600 hover:bg-amber-700 text-white border-0">
                <Link href="/about">
                  About THINK
                </Link>
              </Button>
              <Button asChild size="lg" className="btn-hover-scale bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm">
                <Link href="#guides">
                  <BookOpen className="mr-2 h-4 w-4" /> How-to Guides
                </Link>
              </Button>
              <Button asChild size="lg" className="btn-hover-scale bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm">
                <Link href="#projects">
                  <Sparkles className="mr-2 h-4 w-4" /> Browse Projects
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* About THINK Section */}
      <Section className="bg-gradient-to-b from-[#f5f1e8] to-[#faf8f3] dark:from-slate-800/40 dark:to-slate-800/20 border-y border-amber-200/30 dark:border-slate-700/40 py-0">
        <Container className="py-0.5">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/70 dark:bg-slate-900/30 rounded-xl px-10 py-7 shadow-md border border-amber-200/30 dark:border-slate-700/40">
              <p className="text-xl leading-loose text-foreground/95 font-sans">
                <span className="font-bold text-2xl text-amber-800 dark:text-amber-400">THINK</span> <span className="font-medium">is an NEH-funded project at UC Santa Cruz</span> offering free resources, learning materials, and interactive projects exploring AI in teaching, research, and learning within higher education. Our focus is on humanistic disciplines, emphasizing critical engagement and experimental approaches to educational technology. This project draws inspiration from Harvard's{' '}
                <a href="https://aipedagogy.org" target="_blank" rel="noopener noreferrer" className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline decoration-amber-600/50 hover:decoration-amber-600 underline-offset-2 transition-all font-semibold">
                  AI Pedagogy Project
                </a>{' '}
                from metaLAB and the Berkman Klein Center,{' '}
                <a href="https://mitsloanedtech.mit.edu/ai/" target="_blank" rel="noopener noreferrer" className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline decoration-amber-600/50 hover:decoration-amber-600 underline-offset-2 transition-all font-semibold">
                  MIT Sloan's Teaching with Generative AI Resource Hub
                </a>, and{' '}
                <a href="https://sheridan.brown.edu/resources/classroom-practices/intentional-pedagogy-ai-technology" target="_blank" rel="noopener noreferrer" className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline decoration-amber-600/50 hover:decoration-amber-600 underline-offset-2 transition-all font-semibold">
                  Brown University's framework for intentional pedagogy with AI
                </a>.{' '}
                <Link href="/contact" className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline decoration-amber-600/50 hover:decoration-amber-600 underline-offset-2 transition-all font-semibold">
                  We welcome contributions
                </Link>{' '}
                from educators across all fields.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Project Gallery */}
      <Section id="projects" className="bg-muted/40 py-8">
        <Container>
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-bold mb-2" data-literary="projects-title">Project Gallery</h2>
            <p className="text-muted-foreground" data-literary="projects-description">
              Experimental AI tools for humanities teaching and research
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <ProjectCard
              title="Young Darwin"
              description="Interactive simulation of Darwin's Galápagos expedition with specimen collection"
              href="/projects/young-darwin"
              slug="young-darwin"
              type="Simulation"
              year="2024"
              tags={['History', 'Classroom Assignment']}
              animationDelay="100"
            />

            <ProjectCard
              title="Apothecary Simulator"
              description="17th century medical practice using authentic early modern recipes"
              href="/projects/apothecary-simulator"
              slug="apothecary-simulator"
              type="Simulation"
              year="2024"
              tags={['History', 'Classroom Assignment']}
              animationDelay="200"
            />

            <ProjectCard
              title="History Simulator"
              description="Generate historically plausible scenarios and figures for exploration"
              href="/projects/history-simulator"
              slug="history-simulator"
              type="Generator"
              year="2024"
              tags={['History', 'Research Tool']}
              animationDelay="300"
            />

            <ProjectCard
              title="Historical Figure Generator"
              description="Create randomized but plausible historical figures from different eras"
              href="/projects/historical-figure-generator"
              slug="historical-figure-generator"
              type="Generator"
              year="2024"
              tags={['History', 'Research Tool']}
              animationDelay="400"
            />

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

      {/* How-to Guides */}
      <Section id="guides" className="border-t py-8">
        <Container>
          <div className="mb-6">
            <h2 className="text-3xl font-serif font-bold mb-2" data-literary="guides-title">How-to Guides</h2>
            <p className="text-lg text-muted-foreground" data-literary="guides-description">
              Learn how to build your own experimental AI tools for teaching and research
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <GuideCard
              title="Getting Started with Claude Code"
              description="Learn how to use Claude Code in the terminal to build custom AI tools"
              href="/guides/claude-code-basics"
              thumbnailPath="/thumbnails/claude-code-basics.png"
              icon={<Code className="h-5 w-5 text-amber-600" />}
              animationDelay="100"
            />

            <GuideCard
              title="Prompt Engineering for Humanities"
              description="How to communicate effectively with AI when building educational tools"
              href="/guides/prompt-engineering"
              thumbnailPath="/thumbnails/prompt-engineering.png"
              icon={<FileText className="h-5 w-5 text-amber-600" />}
              animationDelay="200"
            />

            <GuideCard
              title="AI for Historical Research"
              description="NotebookLM, Elicit, and other AI tools for augmenting scholarly research"
              href="/guides/ai-historical-research"
              thumbnailPath="/thumbnails/ai-historical-research.png"
              icon={<Microscope className="h-5 w-5 text-amber-600" />}
              animationDelay="300"
            />

            <GuideCard
              title="History of Machine Intelligence"
              description="From 18th-century mechanist philosophy to contemporary AI"
              href="/guides/history-machine-intelligence"
              thumbnailPath="/thumbnails/history-machine-intelligence.png"
              icon={<BookOpen className="h-5 w-5 text-amber-600" />}
              animationDelay="400"
            />

            <GuideCard
              title="Responsible AI Use in the Classroom"
              description="How humanities faculty are approaching AI integration in 2025"
              href="/guides/responsible-ai-classroom"
              thumbnailPath="/thumbnails/responsible-ai-classroom.png"
              icon={<Lightbulb className="h-5 w-5 text-amber-600" />}
              animationDelay="500"
            />
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/guides">
                View All Guides <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
                commercial products. In 1963, Margaret Mead argued that automation could free humans for creative thinking—but
                only if we didn't mistake drudgery-elimination for intellectual offloading. Six decades later, that distinction
                matters more than ever. The projects featured here demonstrate what's possible when educators and researchers
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
                  Team
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
