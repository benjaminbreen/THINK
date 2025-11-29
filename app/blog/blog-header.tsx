'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { BlogBackground } from '@/components/ui/blog-background'
import { pageThemes } from '@/lib/page-themes'

const theme = pageThemes.blog

export function BlogHeader() {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)
  const [isBackgroundHovered, setIsBackgroundHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsBackgroundHovered(true)}
      onMouseLeave={() => setIsBackgroundHovered(false)}
    >
      <Section className="pt-24 pb-12 relative">
        {/* Blog background limited to header area only */}
        <div className="absolute top-0 left-0 right-0 h-48 overflow-hidden pointer-events-auto">
          <BlogBackground isHovered={isBackgroundHovered} isHeaderHovered={isHeaderHovered} />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center mb-8">
            <div
              className="inline-block"
              onMouseEnter={() => setIsHeaderHovered(true)}
              onMouseLeave={() => setIsHeaderHovered(false)}
            >
              <h1 className="text-4xl font-serif font-bold mb-1">Blog</h1>
              <div
                className="h-0.5 mx-auto transition-all duration-300"
                style={{
                  backgroundColor: theme.accent,
                  width: isHeaderHovered ? '100%' : '4rem'
                }}
              />
            </div>
            <p className="text-lg text-muted-foreground mt-3">
              Updates, insights, and stories from the THINK project
            </p>
          </div>
        </Container>
      </Section>
    </div>
  )
}
