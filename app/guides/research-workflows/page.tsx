import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ResearchWorkflowsGuide() {
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
              AI for Research Workflows
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Using LLMs for historical research, translation, and data analysis
            </p>

            <div className="prose prose-xl max-w-none">
              <p className="text-muted-foreground">
                <em>This guide is currently under development.</em>
              </p>

              <h2>Coming Soon</h2>
              <p>
                This guide will cover:
              </p>
              <ul>
                <li>Using AI for paleography and transcription</li>
                <li>Translation of archaic languages and dialects</li>
                <li>Mining historical databases and archives</li>
                <li>Analyzing large corpora of primary sources</li>
                <li>Verification and fact-checking workflows</li>
              </ul>

              <p>
                Explore related discussions in our{' '}
                <Link href="/blog" className="text-primary hover:underline">
                  blog
                </Link>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
