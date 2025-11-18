import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

export default function HistorySimulatorPage() {
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
                <h1 className="text-4xl font-serif font-bold">History Simulator</h1>
                <Badge>Active</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">History</Badge>
                <Badge variant="outline">Simulation</Badge>
                <Badge variant="outline">Creative</Badge>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                An AI-powered tool that helps students create and explore historically plausible scenarios,
                events, and counterfactual histories.
              </p>

              <h2>Overview</h2>
              <p>
                History Simulator uses Claude AI to generate historically informed scenarios while maintaining
                plausibility based on actual historical contexts, social structures, and material conditions.
                It's designed to help students think critically about historical causation, contingency, and
                the limits of historical knowledge.
              </p>

              <h2>Features</h2>
              <ul>
                <li>Generate historically plausible scenarios based on real historical contexts</li>
                <li>Explore "what if" scenarios grounded in historical evidence</li>
                <li>Create detailed historical figures with appropriate social, economic, and cultural backgrounds</li>
                <li>Examine the interplay of individual agency and structural forces in history</li>
              </ul>

              <h2>Educational Applications</h2>
              <p>
                History Simulator can be used to teach:
              </p>
              <ul>
                <li>Historical methodology and source criticism</li>
                <li>The difference between plausibility and possibility in historical thinking</li>
                <li>Understanding of historical contexts and material constraints</li>
                <li>Critical engagement with AI-generated content</li>
                <li>Counterfactual reasoning and historical causation</li>
              </ul>

              <h2>Modules & Extensions</h2>
              <p>
                The History Simulator includes several specialized modules, including the Historical Figure
                Generator which creates randomized but plausible historical personas based on specific time
                periods and locations.
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
            <h2 className="text-3xl font-serif font-bold mb-4">Explore Related Projects</h2>
            <p className="text-muted-foreground mb-8">
              Check out the Historical Figure Generator and other modules
            </p>
            <Button asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
