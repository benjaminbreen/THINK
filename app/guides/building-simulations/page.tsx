import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BuildingSimulationsGuide() {
  return (
    <>
      <Section className="section-top pb-16">
        <Container>
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/#guides">
                <ArrowLeft className="h-4 w-4" /> Back to Guides
              </Link>
            </Button>
          </div>

          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-display font-serif font-bold">
              Building Historical Simulations
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Step-by-step guide to creating AI-powered historical simulations
            </p>

            <div className="prose prose-xl max-w-none">
              <p className="text-muted-foreground">
                <em>This guide is currently under development. Check back soon for a comprehensive walkthrough of building historical simulations.</em>
              </p>

              <h2>Coming Soon</h2>
              <p>
                This guide will cover:
              </p>
              <ul>
                <li>Choosing appropriate historical sources</li>
                <li>Designing simulation mechanics and constraints</li>
                <li>Writing effective system prompts</li>
                <li>Testing for historical accuracy and engagement</li>
                <li>Integrating simulations into course assignments</li>
              </ul>

              <p>
                For examples of existing simulations, see{' '}
                <Link href="/projects/young-darwin" className="text-primary hover:underline">
                  Young Darwin
                </Link>
                {' '}and{' '}
                <Link href="/projects/apothecary-simulator" className="text-primary hover:underline">
                  Apothecary Simulator
                </Link>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
