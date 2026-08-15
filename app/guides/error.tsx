'use client'

import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function GuidesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Section className="section-top pb-16">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Unable to load guide</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't load this guide. Please try again or return to the guides list.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" asChild>
              <Link href="/guides">All guides</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
