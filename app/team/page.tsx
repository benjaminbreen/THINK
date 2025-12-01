import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AnimatedSection } from '@/components/ui/animated-section'
import { GraduationCap, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export default function TeamPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <AnimatedSection className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">Our Team</h1>
            <p className="text-lg text-muted-foreground">
              THINK is led by an interdisciplinary team of humanities faculty at UC Santa Cruz
            </p>
          </AnimatedSection>

          {/* Principal Investigators */}
          <AnimatedSection delay={100} className="mx-auto max-w-4xl mb-16">
            <h2 className="text-2xl font-serif font-bold mb-8 text-center">Principal Investigators</h2>

            <div className="grid gap-8 md:grid-cols-3 mb-12">
              <Card>
                <CardHeader>
                  <GraduationCap className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Benjamin Breen</CardTitle>
                  <CardDescription>Principal Investigator</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Associate Professor of History specializing in early modern science and medicine. Created
                    HistoryLens and has been experimenting with AI in history courses since 2019.
                  </p>
                  <div className="space-y-2">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={`mailto:${siteConfig.email}`}>
                        <Mail className="mr-2 h-4 w-4" /> Contact
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <GraduationCap className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Pranav Anand</CardTitle>
                  <CardDescription>Co-Principal Investigator</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Professor of Linguistics at UC Santa Cruz, specializing in natural language processing,
                    semantics, and the intersection of linguistics and computational methods.
                  </p>
                  <div className="space-y-2">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href="https://people.ucsc.edu/~panand/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Faculty Page
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <GraduationCap className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Zac Zimmer</CardTitle>
                  <CardDescription>Co-Principal Investigator</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Associate Professor of Literature at UC Santa Cruz, with expertise in digital humanities,
                    critical AI studies, and sociotechnical systems.
                  </p>
                  <div className="space-y-2">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href="https://literature.ucsc.edu/faculty/index.php?uid=zzimmer" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Faculty Page
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-lg max-w-none mx-auto">
              <h3 className="text-xl font-serif font-bold mb-4">About the Team</h3>
              <p>
                Benjamin Breen (History), Pranav Anand (Linguistics), and Zac Zimmer (Literature) have been
                working together through UCSC's Humanizing Technology initiative since 2022, bringing humanistic
                perspectives into engineering and CS curricula.
              </p>
              <p>
                For THINK, that collaboration inverted: instead of adding humanities to technical courses, we're
                building full humanities courses that teach students to build with and critique AI systems. Each PI
                brings a different angle—historical context, linguistic foundations, critical data studies—creating
                courses that work from humanistic strengths rather than treating them as afterthoughts.
              </p>
            </div>
          </AnimatedSection>

          {/* Collaborators & Partners */}
          <AnimatedSection delay={200} className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-serif font-bold mb-8 text-center">Collaborators & Partners</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Bay Area Community College Consortium</CardTitle>
                  <CardDescription>Module Development Partners</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    BACCC partners pilot and provide feedback on modular curriculum extracts,
                    helping us refine materials for wider distribution across community colleges.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>UC Santa Cruz Humanities Division</CardTitle>
                  <CardDescription>Institutional Support</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    The Humanities Division at UCSC provides institutional support, infrastructure,
                    and integration with existing programs like HumTech and Experiential Learning initiatives.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>National Endowment for the Humanities</CardTitle>
                  <CardDescription>Funding Agency</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    THINK is funded by the NEH through a three-year grant supporting curriculum development,
                    evaluation, and dissemination.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://www.neh.gov" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3 w-3" /> Visit NEH
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>National Humanities Center</CardTitle>
                  <CardDescription>Research Partner</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    The NHC supported the development of "AI and Human Imagination," one of the
                    pedagogical initiatives that THINK builds upon.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://nationalhumanitiescenter.org" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3 w-3" /> Visit NHC
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Join Us */}
      <Section className="bg-muted/40 py-12 sm:py-16">
        <Container>
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Collaborate with THINK</h2>
            <p className="text-muted-foreground mb-8">
              Interested in piloting our curriculum modules, contributing resources, or partnering
              with THINK? We welcome collaboration from educators, institutions, and community organizations.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <a href={`mailto:${siteConfig.email}`}>Get in Touch</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More About THINK</Link>
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </>
  )
}
