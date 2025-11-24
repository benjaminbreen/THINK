import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectBanner } from '@/components/ui/project-banner'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

export default function ApothecarySimulatorPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
              </Link>
            </Button>
          </div>

          <div className="mx-auto max-w-3xl">
            <ProjectBanner
              thumbnailPath="/thumbnails/apothecary-simulator.png"
              projectTitle="Apothecary Simulator"
            />

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-serif font-bold">Apothecary Simulator</h1>
                <Badge>Active</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">History</Badge>
                <Badge variant="outline">Medicine</Badge>
                <Badge variant="outline">Simulation</Badge>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                Step into the world of historical medicine and pharmacy practices through an AI-powered
                interactive simulation.
              </p>

              <h2>Overview</h2>
              <p>
                Apothecary Simulator recreates the experience of historical medicine and pharmacy from different
                eras, allowing students to explore how medical knowledge, practices, and remedies have evolved
                over time. The simulation uses Claude AI to provide historically accurate information about
                treatments, ingredients, and medical theories from various time periods.
              </p>

              <h2>Features</h2>
              <ul>
                <li>Explore historical medical practices and pharmaceutical knowledge from different eras</li>
                <li>Learn about traditional remedies and their historical contexts</li>
                <li>Understand the evolution of medical theory from humoral medicine to modern practice</li>
                <li>Interact with historically accurate recreations of apothecary scenarios</li>
              </ul>

              <h2>Educational Applications</h2>
              <p>
                This simulation helps students learn about:
              </p>
              <ul>
                <li>The history of medicine and pharmacy</li>
                <li>Cultural and social contexts of medical practice</li>
                <li>The development of pharmaceutical knowledge</li>
                <li>Historical epistemology and changing concepts of disease and treatment</li>
                <li>The relationship between science, culture, and medical practice</li>
              </ul>

              <h2>Historical Periods Covered</h2>
              <p>
                The Apothecary Simulator includes scenarios from multiple historical periods, including medieval
                Europe, the early modern period, and the 18th-19th centuries, each with period-appropriate
                medical knowledge and practices.
              </p>

              <div className="flex gap-4 mt-8 not-prose">
                <Button asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Try Demo
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Teaching Resources</h2>
            <p className="text-muted-foreground mb-8">
              Find lesson plans and assignments for using Apothecary Simulator in your classroom
            </p>
            <Button asChild>
              <Link href="/pedagogy">View Pedagogy Materials</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
