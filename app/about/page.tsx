import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, BookOpen, Code, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/animated-section'
import { siteConfig } from '@/lib/config'

const quickLinks = [
  { href: '/projects', label: 'Projects', blurb: 'Interactive simulations and tools', icon: Code },
  { href: '/pedagogy', label: 'Pedagogy', blurb: 'Assignments and teaching guides', icon: BookOpen },
  { href: '/guides', label: 'Guides', blurb: 'How-to articles and tutorials', icon: Users },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="section-top bg-gradient-to-b from-indigo-50/50 to-background pb-12 dark:from-indigo-950/20">
        <Container>
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-3 text-indigo-600 dark:text-indigo-400">
              Technology + Humanities Integrated Knowledge
            </p>
            <h1 className="text-display font-serif font-bold">
              About THINK
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              An NEH-funded project at UC Santa Cruz developing free resources
              for teaching with and about AI in the humanities.
            </p>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Core Info */}
      <Section className="section-y">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection className="prose max-w-none">
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
            <AnimatedSection delay={150} className="mt-12 grid gap-4 sm:grid-cols-3">
              {quickLinks.map(({ href, label, blurb, icon: Icon }) => (
                <Link key={href} href={href} className="group block">
                  <Card interactive className="h-full hover:border-indigo-300 dark:hover:border-indigo-700">
                    <CardContent className="pt-6">
                      <Icon className="mb-4 h-7 w-7 text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-400" />
                      <h3 className="mb-1 font-serif text-lg font-semibold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {label}
                      </h3>
                      <p className="text-sm text-muted-foreground">{blurb}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
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
      <Section className="section-y">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <h2 className="mb-7 text-title font-serif font-bold">Team</h2>
            </AnimatedSection>

            <AnimatedSection delay={100} className="mb-9 grid gap-6 sm:grid-cols-3">
              {[
                { name: 'Benjamin Breen', role: 'Principal Investigator', field: 'History' },
                { name: 'Pranav Anand', role: 'Co-PI', field: 'Linguistics' },
                { name: 'Zac Zimmer', role: 'Co-PI', field: 'Literature' },
              ].map((member) => (
                <div key={member.name} className="border-l-2 border-indigo-500/30 pl-4">
                  <h3 className="font-serif text-lg font-semibold">{member.name}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.field}</p>
                </div>
              ))}
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
      <Section className="section-y border-t bg-muted/30">
        <Container>
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <h2 className="mb-7 text-title font-serif font-bold">Funding & Partners</h2>
            </AnimatedSection>

            <AnimatedSection delay={100} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
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
      <Section className="section-y border-t">
        <Container>
          <AnimatedSection className="mx-auto max-w-xl text-center">
            <h2 className="mb-4 text-title font-serif font-bold">Get in Touch</h2>
            <p className="mb-7 text-muted-foreground">
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
