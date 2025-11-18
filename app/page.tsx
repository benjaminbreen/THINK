import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { ArrowRight, BookOpen, Code, Users, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-6xl mb-6 animate-fade-in">
              Teaching History with AI-Enabled Simulations
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
              A clearing house for AI-enabled historical simulations, pedagogy materials,
              and resources for teaching with and about AI in humanities classes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
              <Button asChild size="lg">
                <Link href="/projects">
                  Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pedagogy">View Pedagogy Materials</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Projects */}
      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground">
              Interactive AI simulations that bring history to life
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

      {/* CTA Section */}
      <Section className="bg-primary text-primary-foreground">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Build Your Own Simulation</h2>
            <p className="text-lg mb-8 opacity-90">
              Learn how to create your own AI-enabled historical simulations using Claude Code and our guides
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/pedagogy">Get Started</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* About THINK */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">About THINK</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-center">
                THINK is a project at UC Santa Cruz funded by the National Endowment for the Humanities.
                Our mission is to create a web platform with freely available educational resources for
                teaching with and about AI in humanities classes.
              </p>
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link href="/about">Learn More About THINK</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
