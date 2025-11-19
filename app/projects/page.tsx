import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Users, BookOpen } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">Project Examples</h1>
            <p className="text-lg text-muted-foreground">
              Experimental tools and simulations for humanities teaching and research.
              All freely shared as starting points for your own work.
            </p>
          </div>

          {/* HistoryLens as one project among others */}
          <div className="mx-auto max-w-4xl mb-12">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    HistoryLens
                  </CardTitle>
                  <CardDescription>
                    Interactive historical simulations combining primary sources with LLM prompts.
                    Students explore dynamically generated historical scenarios and develop critical thinking
                    skills through hands-on engagement with the past.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">Primary Sources</Badge>
                    <Badge variant="outline">Interactive</Badge>
                    <Badge variant="outline">Critical Thinking</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="default" size="sm">
                      <Link href="/projects/historylens">
                        Learn more <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href="https://tinyurl.com/history-lens" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3 w-3" /> Try it
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Young Darwin
                  </CardTitle>
                  <CardDescription>
                    An example HistoryLens simulation exploring Charles Darwin's formative years
                    and his historic voyage on HMS Beagle.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">Biography</Badge>
                    <Badge variant="outline">Science History</Badge>
                    <Badge variant="outline">19th Century</Badge>
                  </div>
                  <Button asChild variant="default" size="sm">
                    <Link href="/projects/young-darwin">
                      Learn more <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    History Simulator
                  </CardTitle>
                  <CardDescription>
                    Explore historically plausible scenarios and counterfactual histories
                    grounded in real historical contexts. A tool for thinking about contingency and causation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">Counterfactuals</Badge>
                    <Badge variant="outline">Simulation</Badge>
                    <Badge variant="outline">Critical Thinking</Badge>
                  </div>
                  <Button asChild variant="default" size="sm">
                    <Link href="/projects/history-simulator">
                      Learn more <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Apothecary Simulator
                  </CardTitle>
                  <CardDescription>
                    Experience historical medicine and pharmacy practices from different
                    eras and cultural contexts. Explore the material culture of healing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">Medicine</Badge>
                    <Badge variant="outline">Social History</Badge>
                    <Badge variant="outline">Material Culture</Badge>
                  </div>
                  <Button asChild variant="default" size="sm">
                    <Link href="/projects/apothecary-simulator">
                      Learn more <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    Historical Figure Generator
                  </CardTitle>
                  <CardDescription>
                    Generate plausible historical figures with realistic backgrounds and life stories
                    based on specific time periods and locations. Useful for research and teaching.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">Generator</Badge>
                    <Badge variant="outline">Social History</Badge>
                    <Badge variant="outline">Research Tool</Badge>
                  </div>
                  <Button asChild variant="default" size="sm">
                    <Link href="/projects/historical-figure-generator">
                      Learn more <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Community and Sharing Section */}
      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-serif font-bold mb-4">A Collaborative Space</h2>
              <p className="text-muted-foreground">
                This is a clearinghouse for sharing experimental tools and pedagogical approaches.
                All materials are freely available, and we welcome contributions from educators and
                researchers working with AI in the humanities.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-8">
              <Card>
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Open Resources</CardTitle>
                  <CardDescription>
                    All lesson plans, prompts, and materials are freely shared. Adapt them for your own
                    classroom or research, no strings attached.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Community Contributions</CardTitle>
                  <CardDescription>
                    Have a project to share? We're building a community of practice around AI in humanities
                    education. Your work could help others.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Get Started Section */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Use or Adapt These Projects</h2>
            <p className="text-muted-foreground mb-8">
              Browse our teaching guides to see how these tools work in practice, or dive into the
              modules themselves. Everything here is designed to be modified and built upon.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/guides">How-To Guides</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pedagogy">Teaching Approach</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://tinyurl.com/history-lens" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Browse Modules
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
