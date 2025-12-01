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
import { HeroContent } from '@/components/ui/hero-content'
import { AnimatedSection, StaggeredChildren } from '@/components/ui/animated-section'
import { OrganizationJsonLd } from '@/components/structured-data'
import { siteConfig } from '@/lib/config'

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <LiteraryTransformer />
      {/* Hero Section - Compact */}
      <Section className="pt-10 pb-4 sm:pt-14 sm:pb-5 relative overflow-hidden hero-with-background min-h-[410px]">
        <InteractiveBackground />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl lg:max-w-3xl">
            <HeroContent />
          </div>
        </Container>
      </Section>

      {/* Navigation Buttons - Between hero and about */}
      <Section className="sm:py-10 bg-gradient-to-b from-background to-[#f5f1e8] dark:to-slate-800/40">
        <Container>
          <AnimatedSection delay={600} className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="btn-hover-scale bg-primary hover:bg-primary/90 text-primary-foreground border-0 px-8 py-6 text-base font-medium shadow-md">
              <Link href="/about">
                About THINK
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-hover-scale border-primary/40 text-foreground hover:bg-primary/5 px-8 py-6 text-base font-medium shadow-sm bg-white/80 dark:bg-slate-900/50">
              <Link href="#guides">
                <BookOpen className="mr-2 h-5 w-5" /> How-to Guides
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-hover-scale border-primary/40 text-foreground hover:bg-primary/5 px-8 py-6 text-base font-medium shadow-sm bg-white/80 dark:bg-slate-900/50">
              <Link href="#projects">
                <Sparkles className="mr-2 h-5 w-5" /> Browse Projects
              </Link>
            </Button>
          </AnimatedSection>
        </Container>
      </Section>

      {/* About THINK Section - Compact */}
      <Section className="bg-gradient-to-b from-[#f5f1e8] to-[#faf8f3] dark:from-slate-800/40 dark:to-slate-800/20 border-2 border-amber-200/20 dark:border-slate-700/40 sm:py-6">
        <Container>
          <AnimatedSection delay={100} className="max-w-5xl mx-auto">
            <div className="bg-white/70 dark:bg-slate-900/30 rounded-xl px-6 py-5 sm:px-8 sm:py-6 shadow-md border border-amber-200/30 dark:border-slate-700/40">
              <p className="sm:text-lg sm:leading-8 text-foreground/90 font-sans">
                <span className="font-bold text-lg sm:text-xl text-amber-800 dark:text-amber-400">THINK</span> is an NEH-funded project at UC Santa Cruz offering free resources and interactive projects exploring AI in teaching and research within the humanities. We draw inspiration from Harvard's{' '}
                <a href="https://aipedagogy.org" target="_blank" rel="noopener noreferrer" className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline decoration-amber-600/50 hover:decoration-amber-600 underline-offset-2 transition-all font-medium">
                  AI Pedagogy Project
                </a>,{' '}
                <a href="https://mitsloanedtech.mit.edu/ai/" target="_blank" rel="noopener noreferrer" className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline decoration-amber-600/50 hover:decoration-amber-600 underline-offset-2 transition-all font-medium">
                  MIT Sloan's AI Resource Hub
                </a>, and{' '}
                <a href="https://sheridan.brown.edu/resources/classroom-practices/intentional-pedagogy-ai-technology" target="_blank" rel="noopener noreferrer" className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline decoration-amber-600/50 hover:decoration-amber-600 underline-offset-2 transition-all font-medium">
                  Brown's AI pedagogy framework
                </a>.{' '}
               This is very much a work in progress. We  <Link href="/contact" className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 underline decoration-amber-600/50 hover:decoration-amber-600 underline-offset-2 transition-all font-medium">
                  welcome contributions
                </Link>{' '}
                from educators across all fields.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Project Gallery */}
      <Section id="projects" className="bg-muted/40 py-8">
        <Container>
          <AnimatedSection delay={100} className="mb-6">
            <h2 className="text-3xl font-serif font-bold mb-2" data-literary="projects-title">Project Gallery</h2>
            <p className="text-muted-foreground" data-literary="projects-description">
              Experimental AI tools for humanities teaching and research
            </p>
          </AnimatedSection>

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
              title="Historical Persona Generator"
              description="Procedurally generate historically accurate character personas with pixel-art portraits and life histories"
              href="/projects/historical-persona-generator"
              slug="historical-persona-generator"
              type="Generator"
              year="2025"
              tags={['World History', 'Digital Humanities']}
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
                    <a href={`mailto:${siteConfig.email}`}>Get in touch</a>
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
          <AnimatedSection delay={100} className="mb-6">
            <h2 className="text-3xl font-serif font-bold mb-2" data-literary="guides-title">How-to Guides</h2>
            <p className="text-lg text-muted-foreground" data-literary="guides-description">
              Learn how to build your own experimental AI tools for teaching and research
            </p>
          </AnimatedSection>

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
      <Section className="bg-muted/40 border-t py-12 sm:py-16">
        <Container>
          <AnimatedSection delay={100} className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-serif font-bold mb-4">About This Resource</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                This site collects experimental AI tools built by humanists for teaching and research. It's maintained
                by faculty and students at UC Santa Cruz with NEH support, but we welcome contributions from anyone.
              </p>
              <p className="leading-relaxed">
                The premise: humanists should build their own AI tools, not just adapt commercial products. In 1963,
                Margaret Mead argued that automation works when it frees humans for creative thinking—but fails when
                we mistake eliminating drudgery for eliminating thought. That distinction matters more than ever.
                The projects here show what happens when educators build tools on their own terms.
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
          </AnimatedSection>
        </Container>
      </Section>
    </>
  )
}
