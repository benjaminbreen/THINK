import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PromptEngineeringGuide() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/#guides">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
              </Link>
            </Button>
          </div>

          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Prompt Engineering for Humanities
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Techniques for writing effective prompts for historical and literary analysis
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                <em>This guide is currently under development.</em>
              </p>

              <h2>Coming Soon</h2>
              <p>
                This guide will explore:
              </p>
              <ul>
                <li>Structuring prompts for historical accuracy</li>
                <li>Incorporating primary sources into prompts</li>
                <li>Balancing creativity with constraint</li>
                <li>Testing and iterating on prompt design</li>
                <li>Common pitfalls and how to avoid them</li>
              </ul>

              <p>
                See the{' '}
                <Link href="/projects/historylens" className="text-primary hover:underline">
                  HistoryLens project
                </Link>
                {' '}for detailed examples of well-crafted prompts in action.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
