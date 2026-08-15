import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Mail, MessageSquare, ArrowLeft } from 'lucide-react'
import { siteConfig } from '@/lib/config'

interface BlogPostFooterProps {
  showBackLink?: boolean
}

export function BlogPostFooter({ showBackLink = true }: BlogPostFooterProps) {
  return (
    <Section className="section-y border-t bg-muted/30">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          {showBackLink && (
            <div className="mb-8">
              <Button asChild variant="ghost" size="sm">
                <Link href="/blog">
                  <ArrowLeft className="h-4 w-4" /> Back to all posts
                </Link>
              </Button>
            </div>
          )}

          <h3 className="mb-3 text-headline font-serif font-bold">
            Questions or Ideas?
          </h3>
          <p className="mb-7 text-muted-foreground">
            We'd love to hear from educators exploring AI in the humanities.
            Share your thoughts, ask questions, or tell us about your projects.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                <MessageSquare className="h-4 w-4" />
                Contact Us
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${siteConfig.email}`}>
                <Mail className="h-4 w-4" />
                Email Directly
              </a>
            </Button>
          </div>

          <div className="mt-10 border-t border-border/60 pt-6 text-sm text-muted-foreground">
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
