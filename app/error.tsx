'use client'

import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Section className="section-top pb-16">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">
            We encountered an unexpected error. Please try again.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" asChild>
              <a href="/">Go home</a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
