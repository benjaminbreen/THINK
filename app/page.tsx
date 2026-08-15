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
      <Section className="hero-with-background relative min-h-[26rem] overflow-hidden pb-6 pt-8 sm:min-h-[28rem] sm:pt-12">
        <InteractiveBackground />
        <Container className="relative z-10">
          <div className="mx-auto max-w-2xl lg:max-w-3xl">
            <HeroContent />
          </div>
        </Container>
      </Section>

      {/* Navigation Buttons - Between hero and about */}
      <Section className="bg-gradient-to-b from-background to-muted/70 py-8 sm:py-10">
        <Container>
          <AnimatedSection
            delay={600}
            className="mx-auto flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
          >
            <Button asChild size="lg" className="btn-hover-scale">
              <Link href="/about">
                About THINK
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-hover-scale">
              <Link href="#guides">
                <BookOpen className="h-[18px] w-[18px]" /> How-to Guides
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-hover-scale">
              <Link href="#projects">
                <Sparkles className="h-[18px] w-[18px]" /> Browse Projects
              </Link>
            </Button>
          </AnimatedSection>
        </Container>
      </Section>

      {/* About THINK Section - Compact */}
      <Section className="border-y border-border/60 bg-gradient-to-b from-muted/70 to-background py-8 sm:py-10">
        <Container>
          <AnimatedSection delay={100} className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border/70 bg-card/80 px-6 py-6 shadow-sm sm:px-9 sm:py-8">
              <p className="font-sans text-[1.0625rem] leading-[1.7] text-foreground/90 sm:text-lg sm:leading-8">
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
      <Section id="projects" className="section-y scroll-mt-20 bg-muted/40">
        <Container>
          <AnimatedSection delay={100} className="mb-8">
            <h2 className="text-title font-serif font-bold" data-literary="projects-title">Project Gallery</h2>
            <p className="mt-2 text-base text-muted-foreground" data-literary="projects-description">
              Experimental AI tools for humanities teaching and research
            </p>
          </AnimatedSection>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">

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

      {/* How-to Guides */}
      <Section id="guides" className="section-y scroll-mt-20 border-t">
        <Container>
          <AnimatedSection delay={100} className="mb-8">
            <h2 className="text-title font-serif font-bold" data-literary="guides-title">How-to Guides</h2>
            <p className="mt-2 text-base text-muted-foreground" data-literary="guides-description">
              Learn how to build your own experimental AI tools for teaching and research
            </p>
          </AnimatedSection>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <GuideCard
              title="Getting Started with Claude Code"
              description="Learn how to use Claude Code in the terminal to build custom AI tools"
              href="/guides/claude-code-basics"
              thumbnailPath="/thumbnails/claude-code-basics.webp"
              icon={<Code className="h-5 w-5 text-amber-600" />}
              animationDelay="100"
            />

            <GuideCard
              title="Prompt Engineering for Humanities"
              description="How to communicate effectively with AI when building educational tools"
              href="/guides/prompt-engineering"
              thumbnailPath="/thumbnails/prompt-engineering.webp"
              icon={<FileText className="h-5 w-5 text-amber-600" />}
              animationDelay="200"
            />

            <GuideCard
              title="AI for Historical Research"
              description="NotebookLM, Elicit, and other AI tools for augmenting scholarly research"
              href="/guides/ai-historical-research"
              thumbnailPath="/thumbnails/ai-historical-research.webp"
              icon={<Microscope className="h-5 w-5 text-amber-600" />}
              animationDelay="300"
            />

            <GuideCard
              title="History of Machine Intelligence"
              description="From 18th-century mechanist philosophy to contemporary AI"
              href="/guides/history-machine-intelligence"
              thumbnailPath="/thumbnails/history-machine-intelligence.webp"
              icon={<BookOpen className="h-5 w-5 text-amber-600" />}
              animationDelay="400"
            />

            <GuideCard
              title="Responsible AI Use in the Classroom"
              description="How humanities faculty are approaching AI integration in 2025"
              href="/guides/responsible-ai-classroom"
              thumbnailPath="/thumbnails/responsible-ai-classroom.webp"
              icon={<Lightbulb className="h-5 w-5 text-amber-600" />}
              animationDelay="500"
            />
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/guides">
                View All Guides
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Community & Collaboration */}
      <Section className="section-y border-t bg-muted/40">
        <Container>
          <AnimatedSection delay={100} className="mx-auto max-w-3xl">
            <h2 className="mb-5 text-title font-serif font-bold">About This Resource</h2>
            <div className="prose max-w-none text-muted-foreground">
              <p className="leading-relaxed">
                This site collects experimental AI tools built by humanists for teaching and research. The code of this site was mostly written by Claude Opus 4.5, an AI model from Anthropic, with design guidance and oversight by Benjamin Breen. It's maintained thanks to NEH support and is a project hosted at UC Santa Cruz.
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
            <div className="mt-9 flex flex-wrap gap-3">
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
