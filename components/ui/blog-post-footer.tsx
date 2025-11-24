import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Mail, MessageSquare, ArrowLeft } from 'lucide-react'

interface BlogPostFooterProps {
  showBackLink?: boolean
}

export function BlogPostFooter({ showBackLink = true }: BlogPostFooterProps) {
  return (
    <Section className="bg-muted/30 border-t">
      <Container>
        <div className="max-w-2xl mx-auto text-center py-4">
          {showBackLink && (
            <div className="mb-8">
              <Button asChild variant="ghost" size="sm">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
                </Link>
              </Button>
            </div>
          )}

          <h3 className="text-xl font-serif font-semibold mb-3">
            Questions or Ideas?
          </h3>
          <p className="text-muted-foreground mb-6">
            We'd love to hear from educators exploring AI in the humanities.
            Share your thoughts, ask questions, or tell us about your projects.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild>
              <Link href="/contact">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Us
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:bbreen@ucsc.edu">
                <Mail className="mr-2 h-4 w-4" />
                Email Directly
              </a>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
            <p className="mb-2">
              THINK is supported by the{' '}
              <a
                href="https://www.neh.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                National Endowment for the Humanities
              </a>
            </p>
            <p>
              Based at{' '}
              <a
                href="https://www.ucsc.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                UC Santa Cruz
              </a>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
