import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AIAssignmentsGuide() {
  return (
    <>
      <Section className="section-top pb-16">
        <Container>
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/#guides">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
              </Link>
            </Button>
          </div>

          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-display font-serif font-bold">
              Designing AI Assignments
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Best practices for creating effective AI-enhanced assignments
            </p>

            <div className="prose prose-xl max-w-none">
              <p className="text-muted-foreground">
                <em>This guide is currently under development.</em>
              </p>

              <h2>Coming Soon</h2>
              <p>
                This guide will explore:
              </p>
              <ul>
                <li>Designing assignments that leverage AI strengths</li>
                <li>Creating rubrics for AI-assisted work</li>
                <li>Encouraging critical engagement with AI outputs</li>
                <li>Avoiding common pitfalls and gaming</li>
                <li>Assessment strategies for AI-enhanced coursework</li>
              </ul>

              <p>
                See our{' '}
                <Link href="/pedagogy" className="text-primary hover:underline">
                  pedagogy materials
                </Link>
                {' '}for examples of AI assignments in action.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
