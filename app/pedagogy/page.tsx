import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FileText, Lightbulb, Download, ExternalLink, Users } from 'lucide-react'
import { PedagogyBackground } from '@/components/ui/pedagogy-background'
import { pageThemes } from '@/lib/page-themes'

const theme = pageThemes.pedagogy

export default function PedagogyPage() {
  return (
    <>
      {/* Header with subtle accent color */}
      <Section className="pt-20 pb-12 relative overflow-hidden">
        <PedagogyBackground />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-serif font-bold mb-3">Pedagogy Materials</h1>
            <div
              className="w-16 h-0.5 mb-3"
              style={{ backgroundColor: theme.accent }}
            />
            <p className="text-lg text-muted-foreground">
              Curriculum, resources, and best practices for teaching with and about AI in humanities classes
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          {/* HistoryLens Materials */}
          <div className="mx-auto max-w-4xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6" style={{ color: theme.accent }} />
              <h2 className="text-3xl font-serif font-bold">HistoryLens Modules</h2>
            </div>
            <Card className="hover:shadow-lg transition-shadow mb-6">
              <CardHeader>
                <CardTitle>Freely Available Simulation Modules</CardTitle>
                <CardDescription>
                  Playable simulations, lesson plans, examples, and reading lists for various historical
                  periods and topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button asChild>
                    <a href="https://tinyurl.com/history-lens" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Access All Modules
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/projects/historylens">Learn More About HistoryLens</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Young Darwin Simulation</CardTitle>
                      <CardDescription className="mt-1">
                        Explore Darwin's formative years and voyage on HMS Beagle
                      </CardDescription>
                    </div>
                    <Badge variant="outline">Example Module</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/projects/young-darwin">View Details</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Building Your Own Simulations</CardTitle>
                      <CardDescription className="mt-1">
                        Step-by-step guide to creating HistoryLens simulations for your courses
                      </CardDescription>
                    </div>
                    <Badge variant="outline">Guide</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm">
                    <a href="https://tinyurl.com/history-lens" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-3 w-3" /> Access Guide
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sample Assignments */}
          <div className="mx-auto max-w-4xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6" style={{ color: theme.accent }} />
              <h2 className="text-3xl font-serif font-bold">Sample Assignments</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">Critical Analysis</Badge>
                    <CardTitle className="text-lg">Auditing AI Training Datasets</CardTitle>
                  </div>
                  <CardDescription>
                    Assignment where students probe the contingency of archives used to train LLMs,
                    examining biases and gaps in training data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">Download Assignment (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">Creative Project</Badge>
                    <CardTitle className="text-lg">Constructing Counterfactual Datasets</CardTitle>
                  </div>
                  <CardDescription>
                    Students surface marginalized forms of knowledge by creating alternative datasets
                    that challenge dominant narratives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">Download Assignment (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">Hands-On</Badge>
                    <CardTitle className="text-lg">Building Historical Simulations</CardTitle>
                  </div>
                  <CardDescription>
                    Guided project for creating historical simulations using HistoryLens and primary sources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">Download Assignment (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">Reflection</Badge>
                    <CardTitle className="text-lg">AI Inaccuracies Discussion</CardTitle>
                  </div>
                  <CardDescription>
                    Scaffolded reflective writing that helps students develop critical AI literacy
                    through analysis of AI errors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">Download Assignment (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

        </Container>
      </Section>

      {/* Community College Modules */}
      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-8">
            <Users className="h-12 w-12 mx-auto mb-4" style={{ color: theme.accent }} />
            <h2 className="text-3xl font-serif font-bold mb-4">Modular Curriculum Extracts</h2>
            <p className="text-muted-foreground mb-6">
              Working with the Bay Area Community College Consortium (BACCC), we are developing modular
              extracts of THINK courses that can be easily imported into any humanistic college course.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Expected Reach:</strong> 10-20 community college instructors and at least 1,000 students
              beyond UCSC
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Pilot Program</CardTitle>
                <CardDescription>
                  Modules will be piloted and refined with BACCC partners for wider distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/about">Learn More About THINK</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Community Contributions */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Share Your Materials</h2>
            <p className="text-muted-foreground mb-8">
              Have you created assignments, syllabi, or guides using our tools? We'd love to feature
              your work and expand the THINK community!
            </p>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:bbreen@ucsc.edu">Submit Your Materials</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
