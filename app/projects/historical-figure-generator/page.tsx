import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

export default function HistoricalFigureGeneratorPage() {
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
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-serif font-bold">Historical Figure Generator</h1>
                <Badge variant="secondary">Beta</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">History</Badge>
                <Badge variant="outline">Generator</Badge>
                <Badge variant="outline">Tool</Badge>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                A module from History Simulator that generates plausible historical figures with realistic
                backgrounds, occupations, and life stories.
              </p>

              <h2>Overview</h2>
              <p>
                The Historical Figure Generator creates randomized but historically plausible personas based on
                specific time periods, locations, and social contexts. Each generated figure includes details
                about their background, occupation, social status, and life circumstances that accurately reflect
                the historical period and place.
              </p>

              <h2>Features</h2>
              <ul>
                <li>Generate historically accurate personas from different time periods and regions</li>
                <li>Randomized but plausible combinations of social class, occupation, and background</li>
                <li>Detailed life stories grounded in historical research</li>
                <li>Customizable parameters for time period, location, and social context</li>
              </ul>

              <h2>Educational Applications</h2>
              <p>
                Use the Historical Figure Generator to:
              </p>
              <ul>
                <li>Create characters for historical fiction writing exercises</li>
                <li>Generate case studies for understanding social history</li>
                <li>Explore the diversity of historical experiences across different social groups</li>
                <li>Practice historical empathy and perspective-taking</li>
                <li>Understand the relationship between individual lives and broader historical structures</li>
              </ul>

              <h2>How It Works</h2>
              <p>
                The generator uses Claude AI to create figures that reflect historically accurate social
                structures, economic conditions, naming conventions, and life patterns from the selected period.
                Each generated figure represents a plausible person who could have existed in that historical
                context.
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
            <h2 className="text-3xl font-serif font-bold mb-4">Part of History Simulator</h2>
            <p className="text-muted-foreground mb-8">
              This is a module from the larger History Simulator project
            </p>
            <Button asChild>
              <Link href="/projects/history-simulator">Learn About History Simulator</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
