import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ClaudeCodeBasicsGuide() {
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
              Getting Started with Claude Code
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Learn how to use Claude Code in the terminal to build custom AI tools
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                <em>This guide is currently under development. Check back soon for detailed instructions on using Claude Code to build custom educational tools.</em>
              </p>

              <h2>Coming Soon</h2>
              <p>
                This guide will cover:
              </p>
              <ul>
                <li>Installing and setting up Claude Code</li>
                <li>Basic terminal commands and workflows</li>
                <li>Writing your first AI-powered script</li>
                <li>Best practices for iterative development</li>
                <li>Deploying your tools for classroom use</li>
              </ul>

              <p>
                In the meantime, you can explore the{' '}
                <Link href="/projects" className="text-primary hover:underline">
                  project gallery
                </Link>
                {' '}to see examples of tools built with Claude Code.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
