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
      <Section className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-6xl mb-6 animate-fade-in">
              Teaching with AI in the Humanities
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
              Free, open-source educational resources from THINK at UC Santa Cruz. Featuring
              <strong> HistoryLens</strong>, our flagship tool for creating AI-enabled historical
              simulations grounded in primary sources.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
              <Button asChild size="lg">
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
      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <h2 className="text-3xl font-serif font-bold">HistoryLens</h2>
                <Badge>Flagship Project</Badge>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                An innovative pedagogical tool combining historical primary sources with detailed LLM prompts
                to generate richly detailed interactive simulations of historical settings and events.
              </p>
            </div>

            {/* Impact Statistics */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="text-center p-6 bg-background rounded-lg border">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-primary mb-1">81%</div>
                <div className="text-sm text-muted-foreground">
                  Enhanced understanding of historical periods and figures
                </div>
              </div>
              <div className="text-center p-6 bg-background rounded-lg border">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-primary mb-1">200+</div>
                <div className="text-sm text-muted-foreground">
                  UCSC humanities students in pilot trials
                </div>
              </div>
              <div className="text-center p-6 bg-background rounded-lg border">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">
                  Classes piloted at UC Santa Cruz
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/projects/historylens">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
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
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Young Darwin
                </CardTitle>
                <CardDescription>
                  An interactive simulation of Charles Darwin's early life and voyage on the Beagle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="group-hover:text-primary">
                  <Link href="/projects/young-darwin">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  History Simulator
                </CardTitle>
                <CardDescription>
                  Create and explore historically plausible scenarios and figures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="group-hover:text-primary">
                  <Link href="/projects/history-simulator">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Apothecary Simulator
                </CardTitle>
                <CardDescription>
                  Experience historical medicine and pharmacy practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="group-hover:text-primary">
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
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground">
              Comprehensive resources for educators and students
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Simulations</h3>
              <p className="text-muted-foreground">
                Interactive historical simulations powered by Claude and other AI tools
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pedagogy Materials</h3>
              <p className="text-muted-foreground">
                Syllabi, assignments, and best practices for teaching with AI
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Resources</h3>
              <p className="text-muted-foreground">
                Curated links to tools and resources from the wider community
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* About THINK */}
      <Section className="bg-primary text-primary-foreground">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">About THINK</h2>
            <p className="text-lg mb-6 opacity-90">
              <strong>Technology + Humanities Integrated Knowledge</strong> is a three-year project
              at UC Santa Cruz funded by the National Endowment for the Humanities.
            </p>
            <p className="text-base mb-8 opacity-80">
              We're developing four innovative courses that teach critical thinking about AI through
              hands-on projects in history, linguistics, and literature. All materials are freely
              available for educators and students worldwide.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/about">Learn More About THINK</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10">
                <Link href="/team">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Explore Our Teaching Materials</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Access syllabi, assignments, and guides for integrating AI tools into humanities education.
              All resources are free and openly available.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/pedagogy">
                  <BookOpen className="mr-2 h-4 w-4" /> Teaching Resources
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
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
