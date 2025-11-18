import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { BookOpen, FileText, Lightbulb, Download, ExternalLink } from 'lucide-react'

const materials = {
  syllabi: [
    {
      title: 'AI in Historical Research',
      description: 'A sample syllabus for a course on using AI tools in historical research and writing',
      link: '#',
      type: 'Syllabus',
    },
    {
      title: 'Digital Humanities Methods',
      description: 'Course outline for introducing AI-enabled methods in digital humanities',
      link: '#',
      type: 'Syllabus',
    },
  ],
  assignments: [
    {
      title: 'Analyzing AI-Generated Historical Content',
      description: 'Assignment for critically evaluating AI-generated historical narratives',
      link: '#',
      type: 'Assignment',
    },
    {
      title: 'Building Historical Simulations',
      description: 'Guided project for creating historical simulations with Claude',
      link: '#',
      type: 'Assignment',
    },
    {
      title: 'Comparative Analysis Exercise',
      description: 'Compare traditional and AI-assisted historical research methods',
      link: '#',
      type: 'Assignment',
    },
  ],
  guides: [
    {
      title: 'Getting Started with Claude Code',
      description: 'Step-by-step guide to building your first historical simulation',
      link: '#',
      type: 'Guide',
    },
    {
      title: 'Best Practices for AI in the Classroom',
      description: 'Tips and strategies for effective AI integration in humanities courses',
      link: '#',
      type: 'Guide',
    },
    {
      title: 'Prompt Engineering for Historians',
      description: 'How to write effective prompts for historical AI applications',
      link: '#',
      type: 'Guide',
    },
  ],
}

export default function PedagogyPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">Pedagogy Materials</h1>
            <p className="text-lg text-muted-foreground">
              Resources, guides, and best practices for teaching with and about AI in humanities classes
            </p>
          </div>

          {/* Syllabi */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-serif font-bold">Sample Syllabi</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {materials.syllabi.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button asChild size="sm">
                        <a href={item.link}>
                          <Download className="mr-2 h-3 w-3" /> Download
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href={item.link}>
                          <ExternalLink className="mr-2 h-3 w-3" /> View
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-serif font-bold">Assignments</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {materials.assignments.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-2">
                      <Badge variant="outline" className="mb-2">{item.type}</Badge>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild size="sm" variant="ghost" className="w-full">
                      <a href={item.link}>
                        <Download className="mr-2 h-3 w-3" /> Download
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Guides */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-serif font-bold">Guides & Best Practices</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {materials.guides.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-2">
                      <Badge variant="outline" className="mb-2">{item.type}</Badge>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild size="sm" variant="ghost" className="w-full">
                      <a href={item.link}>
                        Read Guide
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Build Your Own CTA */}
      <Section className="bg-primary text-primary-foreground">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Build Your Own Simulation</h2>
            <p className="text-lg mb-8 opacity-90">
              Ready to create your own AI-enabled historical simulation? Our guides will walk you through the process.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="#build-guide">Get Started</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Community Contributions */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Share Your Materials</h2>
            <p className="text-muted-foreground mb-8">
              Have you created assignments, syllabi, or guides using our tools? We'd love to feature your work!
            </p>
            <Button asChild variant="outline">
              <a href="mailto:contact@example.com">Submit Your Materials</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
