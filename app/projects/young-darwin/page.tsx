import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProjectBanner } from '@/components/ui/project-banner'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

export default function YoungDarwinPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Young Darwin' }
      ]} />

      <Section className="pt-8 pb-16">
        <Container>

          <div className="mx-auto max-w-3xl">
            <ProjectBanner
              thumbnailPath="/thumbnails/young-darwin.png"
              projectTitle="Young Darwin"
            />

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-display font-serif font-bold">Young Darwin</h1>
                <Badge>Active</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">History</Badge>
                <Badge variant="outline">Biography</Badge>
                <Badge variant="outline">Science</Badge>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground mb-8">
                An interactive AI-powered simulation that lets students explore Charles Darwin's formative years
                and his historic voyage on HMS Beagle.
              </p>

              <h2>Overview</h2>
              <p>
                Young Darwin is an educational tool that uses Claude AI to simulate conversations and experiences
                from Charles Darwin's early life, including his time at Cambridge, his relationship with mentors
                like John Stevens Henslow, and his transformative voyage aboard the HMS Beagle.
              </p>

              <h2>Features</h2>
              <ul>
                <li>Interactive dialogue with a historically-grounded AI Darwin persona</li>
                <li>Exploration of key moments in Darwin's intellectual development</li>
                <li>Context-aware responses based on historical records and letters</li>
                <li>Educational prompts that encourage critical thinking about scientific inquiry</li>
              </ul>

              <h2>Educational Applications</h2>
              <p>
                This simulation can be used to teach about:
              </p>
              <ul>
                <li>The development of scientific thought in the 19th century</li>
                <li>Darwin's methodology and observational practices</li>
                <li>The role of travel and cultural exchange in scientific discovery</li>
                <li>Critical analysis of historical sources and AI-generated content</li>
              </ul>

              <h2>Technical Details</h2>
              <p>
                Built using Claude Code and the Anthropic API, Young Darwin demonstrates how AI can be used
                to create engaging historical simulations while maintaining historical accuracy and encouraging
                critical thinking about both history and AI technology.
              </p>

              <div className="not-prose mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> Try Demo
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" /> View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/40 py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-title font-serif font-bold">Want to Learn More?</h2>
            <p className="text-muted-foreground mb-8">
              Check out our pedagogy materials for guides on using Young Darwin in your classroom
            </p>
            <Button asChild>
              <Link href="/pedagogy">View Teaching Materials</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
