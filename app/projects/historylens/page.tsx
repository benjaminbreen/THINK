import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProjectBanner } from '@/components/ui/project-banner'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, BarChart3, Users, BookOpen, Sparkles } from 'lucide-react'

export default function HistoryLensPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'HistoryLens' }
      ]} />

      <Section className="pt-8 pb-16">
        <Container>

          <div className="mx-auto max-w-3xl">
            <ProjectBanner
              thumbnailPath="/thumbnails/historylens.png"
              projectTitle="HistoryLens"
            />

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-display font-serif font-bold">HistoryLens</h1>
                <Badge>Flagship Project</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">History</Badge>
                <Badge variant="outline">AI Simulation</Badge>
                <Badge variant="outline">Pedagogy</Badge>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                HistoryLens is an innovative pedagogical tool that combines historical primary sources with
                detailed LLM prompts to generate richly detailed interactive simulations of historical settings
                and events.
              </p>

              <h2>Overview</h2>
              <p>
                HistoryLens represents a new approach to experiential learning in the humanities. The tool allows
                students to take control of a historical character and navigate a dynamically generated world
                through text commands. Students can interact with historical characters (conversing in
                period-appropriate dialects of regional languages), examine objects, and explore settings—all
                while building critical thinking skills through discussions, reflections, and research exercises.
              </p>

              <h2>How It Works</h2>
              <p>
                HistoryLens combines three key components:
              </p>
              <ol>
                <li><strong>Historical Primary Sources</strong> - Carefully selected documents, letters, and
                records that ground the simulation in historical evidence</li>
                <li><strong>Detailed LLM Prompts</strong> - Sophisticated prompts for AI services like ChatGPT,
                Gemini, or Claude that guide the generation of historically accurate scenarios</li>
                <li><strong>Interactive Exploration</strong> - Text-based commands that allow students to navigate
                and interact with the simulated environment</li>
              </ol>

              <p>
                Students can examine how different primary sources change the simulation, encouraging them to
                develop metacognitive awareness of how the questions we ask and the sources we choose shape
                our understanding of the past.
              </p>

              <div className="not-prose my-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Try HistoryLens</CardTitle>
                    <CardDescription>
                      Access playable simulations, lesson plans, examples, and reading lists
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <a href="https://tinyurl.com/history-lens" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Access HistoryLens Modules
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <h2>Pedagogical Outcomes</h2>
              <p>
                Trials conducted across three classes involving over 200 UCSC humanities students have shown
                promising results:
              </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-6 md:grid-cols-2 my-8">
              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>81%</CardTitle>
                  <CardDescription>
                    Reported the simulations greatly or somewhat enhanced their understanding of
                    historical periods/figures
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>43%</CardTitle>
                  <CardDescription>
                    Found it helped them contextualize the nature of primary sources, allowing
                    them to reflect on the diversity of opinions in another time
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>48%</CardTitle>
                  <CardDescription>
                    Found classroom discussions on AI inaccuracies to be a highlight—demonstrating
                    the value of critical engagement with AI outputs
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>33%</CardTitle>
                  <CardDescription>
                    Found learning to use LLMs in class beneficial for their broader education
                    and future careers
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Educational Applications</h2>
              <p>
                HistoryLens helps students develop several crucial skills:
              </p>
              <ul>
                <li><strong>Historical Empathy</strong> - Students gain deeper understanding of historical
                contexts and the lived experiences of people in the past</li>
                <li><strong>Source Criticism</strong> - By seeing how different sources shape the simulation,
                students learn to evaluate the quality and perspective of historical evidence</li>
                <li><strong>Metacognitive Awareness</strong> - Students reflect on how their own questions
                and assumptions influence their understanding of history</li>
                <li><strong>Critical AI Literacy</strong> - Through identifying inaccuracies and limitations,
                students develop critical thinking about AI-generated content</li>
                <li><strong>Research Skills</strong> - Students learn to verify AI outputs against primary
                sources and scholarly work</li>
              </ul>

              <h2>Recognition & Impact</h2>
              <p>
                HistoryLens has gained significant attention in educational technology circles:
              </p>
              <ul>
                <li>Published in <em>Teaching History: A Journal of Methods</em> (2025)</li>
                <li>Benjamin Breen has written about AI in education for the <em>Chronicle of Higher Education</em></li>
                <li>Lesson plans being used in colleges and high schools across the country</li>
                <li>Featured in presentations and workshops on AI-enabled pedagogy</li>
                <li>Will be rigorously evaluated with 15 courses and 600-800 students during the NEH grant period</li>
              </ul>

              <h2>Available Modules</h2>
              <p>
                Current HistoryLens modules include playable simulations, lesson plans, examples, and reading
                lists for various historical periods and topics. New modules are regularly developed and all
                materials are freely available for educators.
              </p>

              <h2>Technical Details</h2>
              <p>
                HistoryLens is designed to be platform-agnostic, working with various LLM services including:
              </p>
              <ul>
                <li>ChatGPT (OpenAI)</li>
                <li>Claude (Anthropic)</li>
                <li>Gemini (Google)</li>
                <li>Llama and other open-source models</li>
              </ul>

              <p>
                This flexibility ensures educators can use the tool regardless of institutional AI service
                agreements or student access to particular platforms.
              </p>

              <div className="flex gap-4 mt-8 not-prose">
                <Button asChild>
                  <a href="https://tinyurl.com/history-lens" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Try HistoryLens
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pedagogy">
                    <BookOpen className="mr-2 h-4 w-4" /> View Teaching Materials
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40 py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-title font-serif font-bold">Using HistoryLens in Your Classroom</h2>
            <p className="text-muted-foreground mb-8">
              All HistoryLens materials are freely available. Explore our lesson plans, assignments,
              and guides to start using historical simulations in your courses.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/pedagogy">Teaching Resources</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">About THINK</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
