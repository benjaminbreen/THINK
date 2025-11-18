import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 'young-darwin',
    title: 'Young Darwin',
    description: 'An interactive simulation exploring Charles Darwin\'s formative years and his historic voyage on HMS Beagle.',
    tags: ['History', 'Biography', 'Science'],
    status: 'Active',
    link: '/projects/young-darwin',
    demoLink: '#',
    githubLink: '#',
  },
  {
    id: 'history-simulator',
    title: 'History Simulator',
    description: 'Create and explore historically plausible scenarios, events, and figures with AI assistance.',
    tags: ['History', 'Simulation', 'Creative'],
    status: 'Active',
    link: '/projects/history-simulator',
    demoLink: '#',
    githubLink: '#',
  },
  {
    id: 'apothecary-simulator',
    title: 'Apothecary Simulator',
    description: 'Experience the world of historical medicine and pharmacy practices from different eras.',
    tags: ['History', 'Medicine', 'Simulation'],
    status: 'Active',
    link: '/projects/apothecary-simulator',
    demoLink: '#',
    githubLink: '#',
  },
  {
    id: 'historical-figure-generator',
    title: 'Historical Figure Generator',
    description: 'A module from History Simulator that generates plausible historical figures in a randomized way.',
    tags: ['History', 'Generator', 'Tool'],
    status: 'Beta',
    link: '/projects/historical-figure-generator',
    demoLink: '#',
    githubLink: '#',
  },
]

export default function ProjectsPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">Our Projects</h1>
            <p className="text-lg text-muted-foreground">
              Explore our collection of AI-enabled historical simulations and educational tools
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="default" size="sm">
                      <Link href={project.link}>
                        Learn more <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                    {project.demoLink && (
                      <Button asChild variant="outline" size="sm">
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" /> Demo
                        </a>
                      </Button>
                    )}
                    {project.githubLink && (
                      <Button asChild variant="ghost" size="sm">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Build Your Own Section */}
      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Build Your Own</h2>
            <p className="text-muted-foreground mb-8">
              Interested in creating your own AI-enabled historical simulation? Check out our guides and resources.
            </p>
            <Button asChild size="lg">
              <Link href="/pedagogy">View Guides & Resources</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
