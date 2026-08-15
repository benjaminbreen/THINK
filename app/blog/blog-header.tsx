'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { BlogBackground } from '@/components/ui/blog-background'
import { PageHeader } from '@/components/ui/page-header'
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
      <Section className="section-top relative pb-10">
        {/* Blog background limited to header area only */}
        <div className="pointer-events-auto absolute inset-x-0 top-0 h-48 overflow-hidden">
          <BlogBackground isHovered={isBackgroundHovered} isHeaderHovered={isHeaderHovered} />
        </div>
        <Container className="relative">
          <PageHeader
            title="Blog"
            accent={theme.accent}
            onHoverChange={setIsHeaderHovered}
            description="Updates, insights, and stories from the THINK project"
          />
        </Container>
      </Section>
    </div>
  )
}
