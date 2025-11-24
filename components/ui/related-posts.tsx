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
    <Section className="border-t bg-muted/20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif font-bold mb-8 text-center">
            {title}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm line-clamp-2 mb-3">
                      {post.description}
                    </CardDescription>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      <span className="flex items-center gap-1 text-primary group-hover:underline">
                        Read <ArrowRight className="h-3 w-3" />
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
