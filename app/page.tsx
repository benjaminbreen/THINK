import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Code, FileText, GraduationCap, Microscope, Sparkles, Filter } from 'lucide-react'
import { InteractiveBackground } from '@/components/ui/interactive-background'
import { LiteraryTransformer } from '@/components/ui/literary-transformer'

export default function HomePage() {
  return (
    <>
      <LiteraryTransformer />
      {/* Hero Section */}
      <Section className="pt-20 pb-12 sm:pt-28 sm:pb-16 relative overflow-hidden mixed-mode-dark">
        <InteractiveBackground />
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="inline-block mb-4 animate-fade-in">
              <Badge variant="outline" className="text-sm font-normal border-amber-600/30 text-amber-100">
                <span data-literary="hero-badge">A collaborative resource for experimental AI tools in the humanities</span>
              </Badge>
            </div>
            <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-6xl mb-4 animate-fade-in animation-delay-100" data-literary="hero-title">
              Building AI Tools for Teaching & Research
            </h1>
            <p className="text-lg text-white/80 mb-6 animate-fade-in animation-delay-200 leading-normal max-w-3xl" data-literary="hero-description">
              A free, open resource hub for educators and researchers exploring experimental uses of AI in the humanities.
              Browse projects, share your own work, and learn how to build custom tools for your courses and research.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Button asChild size="lg" className="btn-hover-scale bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm">
                <Link href="#projects">
                  <Sparkles className="mr-2 h-4 w-4" /> Browse Projects
                </Link>
              </Button>
              <Button asChild size="lg" className="btn-hover-scale bg-amber-600 hover:bg-amber-700 text-white border-0">
                <Link href="#guides">
                  <BookOpen className="mr-2 h-4 w-4" /> How-to Guides
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-hover-scale border-white/20 text-white hover:bg-white/10">
                <Link href="/about">
                  About THINK
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Project Gallery */}
      <Section id="projects" className="bg-muted/40 py-12">
        <Container>
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-2" data-literary="projects-title">Project Gallery</h2>
                <p className="text-muted-foreground" data-literary="projects-description">
                  Experimental AI tools for humanities teaching and research
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter by type
              </Button>
            </div>

            {/* Filter tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white transition-colors">All Projects</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-amber-600/10 hover:border-amber-600/50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">Classroom Assignment</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-amber-600/10 hover:border-amber-600/50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">Full Course</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-amber-600/10 hover:border-amber-600/50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">Research Tool</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-amber-600/10 hover:border-amber-600/50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">History</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-amber-600/10 hover:border-amber-600/50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">Literature</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-amber-600/10 hover:border-amber-600/50 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">Linguistics</Badge>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* HistoryLens */}
            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-100">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className="text-xs bg-amber-600 hover:bg-amber-700 text-white">Framework</Badge>
                  <span className="text-xs text-muted-foreground">2024</span>
                </div>
                <CardTitle className="text-xl mb-2">HistoryLens</CardTitle>
                <CardDescription className="text-sm mb-2 leading-snug">
                  A suite of educational games and simulations built around open-ended "sandbox" learning enabled by LLM-generated roleplaying—but backstopped by real primary sources. Students learn history by testing AI against historical reality, discovering how these systems misinterpret the past, fabricate sources, and break in revealing ways. Only through critical, skeptical engagement can we truly understand them.
                </CardDescription>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-xs border-emerald-600/30 text-emerald-700 dark:text-emerald-400">History</Badge>
                  <Badge variant="outline" className="text-xs border-emerald-600/30 text-emerald-700 dark:text-emerald-400">Full Course</Badge>
                  <Badge variant="outline" className="text-xs border-emerald-600/30 text-emerald-700 dark:text-emerald-400">Assignment</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/projects/historylens" className="text-sm text-primary hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform">
                  View project <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            {/* Young Darwin */}
            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-200">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">Simulation</Badge>
                  <span className="text-xs text-muted-foreground">2024</span>
                </div>
                <CardTitle className="text-xl mb-2">Young Darwin</CardTitle>
                <CardDescription className="text-sm mb-3">
                  Interactive simulation of Darwin's Galápagos expedition with specimen collection
                </CardDescription>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-xs">History</Badge>
                  <Badge variant="outline" className="text-xs">Classroom Assignment</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/projects/young-darwin" className="text-sm text-primary hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform">
                  View project <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            {/* Apothecary Simulator */}
            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">Simulation</Badge>
                  <span className="text-xs text-muted-foreground">2024</span>
                </div>
                <CardTitle className="text-xl mb-2">Apothecary Simulator</CardTitle>
                <CardDescription className="text-sm mb-3">
                  17th century medical practice using authentic early modern recipes
                </CardDescription>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-xs">History</Badge>
                  <Badge variant="outline" className="text-xs">Classroom Assignment</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/projects/apothecary-simulator" className="text-sm text-primary hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform">
                  View project <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            {/* History Simulator */}
            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-400">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">Generator</Badge>
                  <span className="text-xs text-muted-foreground">2024</span>
                </div>
                <CardTitle className="text-xl mb-2">History Simulator</CardTitle>
                <CardDescription className="text-sm mb-3">
                  Generate historically plausible scenarios and figures for exploration
                </CardDescription>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-xs">History</Badge>
                  <Badge variant="outline" className="text-xs">Research Tool</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/projects/history-simulator" className="text-sm text-primary hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform">
                  View project <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            {/* Historical Figure Generator */}
            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-500">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">Generator</Badge>
                  <span className="text-xs text-muted-foreground">2024</span>
                </div>
                <CardTitle className="text-xl mb-2">Historical Figure Generator</CardTitle>
                <CardDescription className="text-sm mb-3">
                  Create randomized but plausible historical figures from different eras
                </CardDescription>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="text-xs">History</Badge>
                  <Badge variant="outline" className="text-xs">Research Tool</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/projects/historical-figure-generator" className="text-sm text-primary hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform">
                  View project <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

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
      <Section id="guides" className="border-t py-12">
        <Container>
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold mb-2" data-literary="guides-title">How-to Guides</h2>
            <p className="text-lg text-muted-foreground" data-literary="guides-description">
              Learn how to build your own experimental AI tools for teaching and research
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-100 shimmer">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-amber-600/10 flex items-center justify-center mb-3 animate-bounce-subtle">
                  <Code className="h-5 w-5 text-amber-600" />
                </div>
                <CardTitle className="text-lg mb-2">Getting Started with Claude Code</CardTitle>
                <CardDescription className="text-sm">
                  Learn how to use Claude Code in the terminal to build custom AI tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/claude-code-basics" className="text-sm text-primary hover:underline inline-flex items-center link-underline">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-200 shimmer">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-amber-600/10 flex items-center justify-center mb-3 animate-bounce-subtle">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                </div>
                <CardTitle className="text-lg mb-2">Building Historical Simulations</CardTitle>
                <CardDescription className="text-sm">
                  Step-by-step guide to creating AI-powered historical simulations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/building-simulations" className="text-sm text-primary hover:underline inline-flex items-center link-underline">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-300 shimmer">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-amber-600/10 flex items-center justify-center mb-3 animate-bounce-subtle">
                  <GraduationCap className="h-5 w-5 text-amber-600" />
                </div>
                <CardTitle className="text-lg mb-2">Designing AI Assignments</CardTitle>
                <CardDescription className="text-sm">
                  Best practices for creating effective AI-enhanced assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/ai-assignments" className="text-sm text-primary hover:underline inline-flex items-center link-underline">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-400 shimmer">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-amber-600/10 flex items-center justify-center mb-3 animate-bounce-subtle">
                  <Microscope className="h-5 w-5 text-amber-600" />
                </div>
                <CardTitle className="text-lg mb-2">AI for Research Workflows</CardTitle>
                <CardDescription className="text-sm">
                  Using LLMs for historical research, translation, and data analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/research-workflows" className="text-sm text-primary hover:underline inline-flex items-center link-underline">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-500 shimmer">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-amber-600/10 flex items-center justify-center mb-3 animate-bounce-subtle">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <CardTitle className="text-lg mb-2">Prompt Engineering for Humanities</CardTitle>
                <CardDescription className="text-sm">
                  Techniques for writing effective prompts for historical and literary analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/guides/prompt-engineering" className="text-sm text-primary hover:underline inline-flex items-center link-underline">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-600 shimmer">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-amber-600/10 flex items-center justify-center mb-3 animate-bounce-subtle">
                  <BookOpen className="h-5 w-5 text-amber-600" />
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
