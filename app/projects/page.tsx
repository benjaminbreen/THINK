import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, ExternalLink, BarChart3, Sparkles } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">Our Projects</h1>
            <p className="text-lg text-muted-foreground">
              AI-enabled historical simulations and educational tools for transformative humanities learning
            </p>
          </div>

          {/* Featured Project: HistoryLens */}
          <div className="mx-auto max-w-4xl mb-16">
            <div className="text-center mb-6">
              <Badge className="mb-4">Flagship Project</Badge>
              <h2 className="text-2xl font-serif font-bold mb-2">HistoryLens</h2>
              <p className="text-muted-foreground">
                Our flagship pedagogical tool combining primary sources with LLM-powered simulations
              </p>
            </div>

            <Card className="group hover:shadow-lg transition-all bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Interactive Historical Simulations</CardTitle>
                <CardDescription className="text-base">
                  HistoryLens combines historical primary sources with detailed LLM prompts to generate
                  richly detailed interactive simulations. Students navigate dynamically generated historical
                  worlds, interact with period-appropriate characters, and build critical thinking skills through
                  hands-on exploration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">200+</div>
                    <div className="text-sm text-muted-foreground">Students Reached</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">81%</div>
                    <div className="text-sm text-muted-foreground">Enhanced Understanding</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">3</div>
                    <div className="text-sm text-muted-foreground">Classes Piloted</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Primary Sources</Badge>
                  <Badge variant="outline">Interactive</Badge>
                  <Badge variant="outline">Critical Thinking</Badge>
                  <Badge variant="outline">Metacognition</Badge>
                </div>

                <div className="flex gap-2">
                  <Button asChild>
                    <Link href="/projects/historylens">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="https://tinyurl.com/history-lens" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Try Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Projects */}
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Other Simulations & Tools</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Young Darwin
                    </CardTitle>
                    <Badge>Example</Badge>
                  </div>
                  <CardDescription>
                    An interactive HistoryLens simulation exploring Charles Darwin's formative years
                    and his historic voyage on HMS Beagle
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
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="group-hover:text-primary transition-colors">
                      History Simulator
                    </CardTitle>
                    <Badge>Example</Badge>
                  </div>
                  <CardDescription>
                    Create and explore historically plausible scenarios and counterfactual histories
                    grounded in real historical contexts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">Counterfactuals</Badge>
                    <Badge variant="outline">Simulation</Badge>
                    <Badge variant="outline">Creative</Badge>
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
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Apothecary Simulator
                    </CardTitle>
                    <Badge>Example</Badge>
                  </div>
                  <CardDescription>
                    Experience the world of historical medicine and pharmacy practices from different
                    eras and cultural contexts
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
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="group-hover:text-primary transition-colors">
                      Historical Figure Generator
                    </CardTitle>
                    <Badge variant="secondary">Tool</Badge>
                  </div>
                  <CardDescription>
                    Generate plausible historical figures with realistic backgrounds, occupations,
                    and life stories based on specific time periods and locations
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

      {/* Impact Section */}
      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-4">Proven Impact</h2>
            <p className="text-muted-foreground">
              Our simulations have demonstrated measurable improvements in student engagement and learning outcomes
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4 mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-2xl">81%</CardTitle>
                <CardDescription>Enhanced historical understanding</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-2xl">48%</CardTitle>
                <CardDescription>Valued AI critical thinking discussions</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-2xl">43%</CardTitle>
                <CardDescription>Better source contextualization</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-2xl">600+</CardTitle>
                <CardDescription>Students to be reached in grant period</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Build Your Own Section */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Build Your Own Simulation</h2>
            <p className="text-muted-foreground mb-8">
              All HistoryLens modules and lesson plans are freely available. Learn how to create your own
              AI-enabled historical simulations or adapt our existing materials for your classroom.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/pedagogy">View Teaching Resources</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://tinyurl.com/history-lens" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Access Modules
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
