'use client'

import { useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function BlogError({
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
          <h2 className="text-2xl font-serif font-bold mb-4">Unable to load post</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't load this blog post. Please try again or return to the blog.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" asChild>
              <Link href="/blog">All posts</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
