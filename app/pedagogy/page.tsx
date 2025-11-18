import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { BookOpen, FileText, Lightbulb, Download, ExternalLink, GraduationCap, Users } from 'lucide-react'

export default function PedagogyPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">Pedagogy Materials</h1>
            <p className="text-lg text-muted-foreground">
              Curriculum, resources, and best practices for teaching with and about AI in humanities classes
            </p>
          </div>

          {/* THINK Curriculum */}
          <div className="mx-auto max-w-4xl mb-16">
            <div className="text-center mb-8">
              <Badge className="mb-4">Core Curriculum</Badge>
              <h2 className="text-3xl font-serif font-bold mb-2">The THINK Curriculum</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Four upper-division courses designed to equip humanities students with practical AI skills
                and critical perspectives
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">Introductory Course</Badge>
                    <CardTitle className="text-xl">The History of AI</CardTitle>
                  </div>
                  <CardDescription>
                    Contextualizing the rise of LLMs within longer histories of information technologies.
                    Explore how artificial intelligence emerged from cybernetics, cognitive science, and
                    computational linguistics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p><strong>Enrollment:</strong> Up to 100 students</p>
                    <p><strong>Prerequisites:</strong> None</p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">View Syllabus (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">Introductory Course</Badge>
                    <CardTitle className="text-xl">Data and Memory</CardTitle>
                  </div>
                  <CardDescription>
                    Critiquing the societal impacts of the data practices that underpin AI. Examine how
                    training datasets encode power structures, biases, and marginalized knowledge.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p><strong>Enrollment:</strong> Up to 100 students</p>
                    <p><strong>Prerequisites:</strong> None</p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">View Syllabus (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="outline" className="mb-2">Introductory Course</Badge>
                    <CardTitle className="text-xl">Modeling Language</CardTitle>
                  </div>
                  <CardDescription>
                    Understanding how language models work and their implications. Explore the technical
                    foundations of LLMs while maintaining critical perspective on their capabilities and limits.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p><strong>Enrollment:</strong> Up to 100 students</p>
                    <p><strong>Prerequisites:</strong> None</p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">View Syllabus (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="mb-2">
                    <Badge className="mb-2">Experiential Learning</Badge>
                    <CardTitle className="text-xl">Applied LLM Projects in the Humanities</CardTitle>
                  </div>
                  <CardDescription>
                    Project-based course where students work in small groups to develop humanities-informed
                    and AI-enabled projects. Build real-world skills through hands-on experiential learning.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    <p><strong>Enrollment:</strong> Limited to 40 students</p>
                    <p><strong>Prerequisites:</strong> At least one introductory THINK course</p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">View Syllabus (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Expected Impact
              </h3>
              <p className="text-sm text-muted-foreground">
                By the end of year 3 of the grant period, we expect to reach approximately <strong>500 students
                at UCSC</strong> through two iterations of these four courses.
              </p>
            </div>
          </div>

          {/* HistoryLens Materials */}
          <div className="mx-auto max-w-4xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6 text-primary" />
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
              <FileText className="h-6 w-6 text-primary" />
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

          {/* Best Practices */}
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-serif font-bold">Guides & Best Practices</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Responsible AI Use in the Classroom</CardTitle>
                  <CardDescription>
                    Tips and strategies for effective, ethical AI integration in humanities courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">Read Guide (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Prompt Engineering for Historians</CardTitle>
                  <CardDescription>
                    How to write effective prompts for historical AI applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">Read Guide (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Facilitating Critical AI Discussions</CardTitle>
                  <CardDescription>
                    Techniques for leading productive conversations about AI limitations and biases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">Read Guide (Coming Soon)</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Assessment Strategies for AI-Enhanced Learning</CardTitle>
                  <CardDescription>
                    How to evaluate student work in courses that incorporate AI tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href="#">Read Guide (Coming Soon)</Link>
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
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
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
