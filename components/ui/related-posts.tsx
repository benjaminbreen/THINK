'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Calendar, ArrowRight } from 'lucide-react'
import type { BlogPostMeta } from '@/lib/blog'

interface RelatedPostsProps {
  posts: BlogPostMeta[]
  title?: string
}

export function RelatedPosts({ posts, title = "You Might Also Like" }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <Section className="section-y border-t bg-muted/20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-9 text-center text-title font-serif font-bold">
            {title}
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <Card interactive className="flex h-full flex-col">
                  <CardHeader className="flex-1 gap-0 space-y-0 pb-4">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="line-clamp-2 text-lg transition-colors group-hover:text-primary">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      <span className="flex items-center gap-1 font-medium text-primary">
                        Read
                        <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
