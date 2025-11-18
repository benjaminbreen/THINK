import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CriticalPedagogyGuide() {
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
              Critical AI Pedagogy
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Teaching students to think critically about AI outputs and limitations
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                <em>This guide is currently under development.</em>
              </p>

              <h2>Coming Soon</h2>
              <p>
                This guide will address:
              </p>
              <ul>
                <li>Identifying and discussing AI inaccuracies</li>
                <li>Understanding bias in training data</li>
                <li>Ethical considerations in AI-assisted learning</li>
                <li>Building metacognitive awareness</li>
                <li>Fostering skepticism and verification habits</li>
              </ul>

              <p>
                For related discussions, see our{' '}
                <Link href="/blog" className="text-primary hover:underline">
                  blog
                </Link>
                {' '}and{' '}
                <Link href="/about" className="text-primary hover:underline">
                  project philosophy
                </Link>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
