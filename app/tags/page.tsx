'use client'

import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Tag } from 'lucide-react'
import { getAllTags, getTagCounts, tagToSlug } from '@/lib/tags-data'

export default function TagsIndexPage() {
  const allTags = getAllTags()
  const tagCounts = getTagCounts()

  // Sort tags by count (most used first)
  const sortedTags = [...allTags].sort((a, b) => (tagCounts[b] || 0) - (tagCounts[a] || 0))

  // Get max count for sizing
  const maxCount = Math.max(...Object.values(tagCounts))

  // Calculate font size based on count
  const getFontSize = (count: number) => {
    const min = 0.875 // text-sm
    const max = 1.5 // text-2xl
    const ratio = count / maxCount
    return min + ratio * (max - min)
  }

  return (
    <>
      <Section className="section-top pb-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2.5">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-display font-serif font-bold">Browse by Tag</h1>
              </div>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
                Explore projects, resources, guides, and assignments by topic
              </p>
            </div>

            {/* Tag Cloud */}
            <div className="rounded-2xl border border-border/70 bg-muted/30 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {sortedTags.map(tag => {
                  const count = tagCounts[tag] || 0
                  const fontSize = getFontSize(count)

                  return (
                    <Link key={tag} href={`/tags/${tagToSlug(tag)}`} className="group">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 leading-tight transition-[background-color,border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:bg-primary/10"
                        style={{ fontSize: `${fontSize}rem` }}
                      >
                        {tag}
                        <span className="font-mono text-xs tabular-nums text-muted-foreground">
                          {count}
                        </span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Alphabetical List */}
            <div className="mt-14">
              <h2 className="mb-6 text-center text-headline font-serif font-bold">All Tags (A-Z)</h2>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {[...allTags].sort().map(tag => (
                  <Link key={tag} href={`/tags/${tagToSlug(tag)}`}>
                    <div className="flex min-h-[48px] items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 transition-colors hover:border-primary/30 hover:bg-accent/50">
                      <span className="min-w-0 truncate text-sm font-medium">{tag}</span>
                      <Badge variant="secondary" className="flex-shrink-0 font-mono tabular-nums">
                        {tagCounts[tag]}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
