import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen, Code, Users, Sparkles, BarChart3, ExternalLink } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24 pb-16 sm:pt-32 sm:pb-24 relative overflow-hidden gradient-mesh">
        <Container>
          <div className="mx-auto max-w-3xl text-center relative z-10">
            <div className="inline-block mb-4 animate-fade-in">
              <Badge variant="outline" className="text-sm font-normal">
                NEH-Funded Initiative
              </Badge>
            </div>
            <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-6xl mb-6 animate-fade-in animation-delay-100">
              Teaching with AI in the{' '}
              <span className="gradient-text">Humanities</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in animation-delay-200 leading-relaxed">
              Free, open-source educational resources from THINK at UC Santa Cruz. Featuring
              <strong className="text-foreground"> HistoryLens</strong>, our flagship tool for creating AI-enabled historical
              simulations grounded in primary sources.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in animation-delay-300">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/projects/historylens">
                  Explore HistoryLens <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pedagogy">Teaching Resources</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* HistoryLens - Flagship Project */}
      <Section className="bg-muted/40 relative">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold">HistoryLens</h2>
                <Badge className="gradient-primary text-primary-foreground border-0 shadow-md">
                  Flagship Project
                </Badge>
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                An innovative pedagogical tool combining historical primary sources with detailed LLM prompts
                to generate richly detailed interactive simulations of historical settings and events.
              </p>
            </div>

            {/* Impact Statistics */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="group text-center p-8 bg-background rounded-xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover-lift">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <div className="text-5xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                  81%
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Enhanced understanding of historical periods and figures
                </div>
              </div>
              <div className="group text-center p-8 bg-background rounded-xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover-lift">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-5xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                  200+
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  UCSC humanities students in pilot trials
                </div>
              </div>
              <div className="group text-center p-8 bg-background rounded-xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover-lift">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div className="text-5xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                  3
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Classes piloted at UC Santa Cruz
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/projects/historylens">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <a href="https://tinyurl.com/history-lens" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Try HistoryLens
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Example Simulations */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Example Simulations</h2>
            <p className="text-muted-foreground">
              Built using the HistoryLens framework to demonstrate different historical contexts
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover-lift border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">Young Darwin</CardTitle>
                <CardDescription className="text-base">
                  An interactive simulation of Charles Darwin's early life and voyage on the Beagle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="group-hover:text-primary group-hover:translate-x-1 transition-transform">
                  <Link href="/projects/young-darwin">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover-lift border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">History Simulator</CardTitle>
                <CardDescription className="text-base">
                  Create and explore historically plausible scenarios and figures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="group-hover:text-primary group-hover:translate-x-1 transition-transform">
                  <Link href="/projects/history-simulator">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover-lift border-2 hover:border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">Apothecary Simulator</CardTitle>
                <CardDescription className="text-base">
                  Experience historical medicine and pharmacy practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="group-hover:text-primary group-hover:translate-x-1 transition-transform">
                  <Link href="/projects/apothecary-simulator">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Key Features */}
      <Section className="border-t">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">What We Offer</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive resources for educators and students
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            <div className="text-center group">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Simulations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Interactive historical simulations powered by Claude and other AI tools
              </p>
            </div>

            <div className="text-center group">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pedagogy Materials</h3>
              <p className="text-muted-foreground leading-relaxed">
                Syllabi, assignments, and best practices for teaching with AI
              </p>
            </div>

            <div className="text-center group">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Resources</h3>
              <p className="text-muted-foreground leading-relaxed">
                Curated links to tools and resources from the wider community
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* About THINK */}
      <Section className="gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
        <Container>
          <div className="mx-auto max-w-3xl text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">About THINK</h2>
            <p className="text-xl mb-6 font-medium">
              Technology + Humanities Integrated Knowledge
            </p>
            <p className="text-base sm:text-lg mb-8 opacity-90 leading-relaxed">
              A three-year project at UC Santa Cruz funded by the National Endowment for the Humanities.
              We're developing four innovative courses that teach critical thinking about AI through
              hands-on projects in history, linguistics, and literature. All materials are freely
              available for educators and students worldwide.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/about">Learn More About THINK</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground/30 hover:bg-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm transition-all"
              >
                <Link href="/team">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="border-t">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
              Explore Our Teaching Materials
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Access syllabi, assignments, and guides for integrating AI tools into humanities education.
              All resources are free and openly available.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/pedagogy">
                  <BookOpen className="mr-2 h-5 w-5" /> Teaching Resources
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Link href="/resources">
                  External Resources
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
