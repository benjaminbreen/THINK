import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, BookOpen, Code, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/animated-section'
import { siteConfig } from '@/lib/config'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-24 pb-8 bg-gradient-to-b from-indigo-50/50 to-background dark:from-indigo-950/20">
        <Container>
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2 tracking-wide uppercase">
              Technology + Humanities Integrated Knowledge
            </p>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 tracking-tight">
              About THINK
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              An NEH-funded project at UC Santa Cruz developing free resources
              for teaching with and about AI in the humanities.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Core Info */}
      <Section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed">
                THINK offers curriculum materials, interactive simulations, and practical guides for
                educators interested in AI pedagogy. Our focus is on critical engagement—teaching
                students to understand how language models work, where they fail, and why humanistic
                perspectives matter for evaluating AI outputs.
              </p>

              <p className="text-lg leading-relaxed">
                All materials are freely available for adaptation at other institutions. We're
                particularly interested in approaches that treat AI as an object of study rather
                than just a tool—examining training data, identifying hallucinations, and understanding
                the rhetorical strategies that make AI outputs convincing even when wrong.
              </p>
            </AnimatedSection>

            {/* Quick Links */}
            <AnimatedSection delay={150} className="grid sm:grid-cols-3 gap-4 mt-12">
              <Link href="/projects" className="group">
                <Card className="h-full transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md">
                  <CardContent className="pt-6">
                    <Code className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-3" />
                    <h3 className="font-semibold mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Projects
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Interactive simulations and tools
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/pedagogy" className="group">
                <Card className="h-full transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md">
                  <CardContent className="pt-6">
                    <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-3" />
                    <h3 className="font-semibold mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Pedagogy
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Assignments and teaching guides
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/guides" className="group">
                <Card className="h-full transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md">
                  <CardContent className="pt-6">
                    <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-3" />
                    <h3 className="font-semibold mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Guides
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      How-to articles and tutorials
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* TODO: Add Curriculum section once courses are developed
      <Section className="py-16 bg-muted/30 border-y">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <h2 className="text-2xl font-serif font-bold mb-6">The Curriculum</h2>
              <p className="text-muted-foreground mb-8">
                Course descriptions will go here once developed.
              </p>
            </AnimatedSection>
          </div>
        </Container>
      </Section>
      */}

      {/* Team */}
      <Section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <h2 className="text-2xl font-serif font-bold mb-6">Team</h2>
            </AnimatedSection>

            <AnimatedSection delay={100} className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center sm:text-left">
                <h3 className="font-semibold">Benjamin Breen</h3>
                <p className="text-sm text-muted-foreground">Principal Investigator</p>
                <p className="text-sm text-muted-foreground">History</p>
              </div>

              <div className="text-center sm:text-left">
                <h3 className="font-semibold">Pranav Anand</h3>
                <p className="text-sm text-muted-foreground">Co-PI</p>
                <p className="text-sm text-muted-foreground">Linguistics</p>
              </div>

              <div className="text-center sm:text-left">
                <h3 className="font-semibold">Zac Zimmer</h3>
                <p className="text-sm text-muted-foreground">Co-PI</p>
                <p className="text-sm text-muted-foreground">Literature</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <Button asChild variant="outline" size="sm">
                <Link href="/team">
                  Full team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Partners */}
      <Section className="py-16 bg-muted/30 border-t">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <h2 className="text-2xl font-serif font-bold mb-6">Funding & Partners</h2>
            </AnimatedSection>

            <AnimatedSection delay={100} className="flex flex-wrap gap-x-8 gap-y-4 items-center">
              <a
                href="https://www.neh.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                National Endowment for the Humanities
                <ExternalLink className="h-3 w-3" />
              </a>

              <a
                href="https://www.ucsc.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                UC Santa Cruz
                <ExternalLink className="h-3 w-3" />
              </a>

              <a
                href="https://www.baccc.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                Bay Area Community College Consortium
                <ExternalLink className="h-3 w-3" />
              </a>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section className="py-16 border-t">
        <Container>
          <AnimatedSection className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Questions about using these materials or interested in collaboration?
            </p>
            <Button asChild>
              <a href={`mailto:${siteConfig.email}`}>
                Contact Us
              </a>
            </Button>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  )
}
