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
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Tag className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-4xl font-serif font-bold">Browse by Tag</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Explore projects, resources, guides, and assignments by topic
              </p>
            </div>

            {/* Tag Cloud */}
            <div className="bg-muted/30 rounded-2xl p-8 border">
              <div className="flex flex-wrap gap-3 justify-center items-center">
                {sortedTags.map(tag => {
                  const count = tagCounts[tag] || 0
                  const fontSize = getFontSize(count)

                  return (
                    <Link key={tag} href={`/tags/${tagToSlug(tag)}`}>
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-background border hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-pointer"
                        style={{ fontSize: `${fontSize}rem` }}
                      >
                        {tag}
                        <span className="text-muted-foreground text-xs ml-1">
                          {count}
                        </span>
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Alphabetical List */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-6 text-center">All Tags (A-Z)</h2>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {[...allTags].sort().map(tag => (
                  <Link key={tag} href={`/tags/${tagToSlug(tag)}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                      <span className="font-medium">{tag}</span>
                      <Badge variant="secondary" className="ml-2">
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
