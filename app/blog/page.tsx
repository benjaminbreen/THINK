'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { BlogBackground } from '@/components/ui/blog-background'
import { pageThemes } from '@/lib/page-themes'

const theme = pageThemes.blog

// This is sample data - in production, you'd fetch from MDX files
const blogPosts = [
  {
    slug: 'welcome-to-think',
    title: 'Welcome to THINK',
    excerpt: 'Introducing the THINK project and our vision for AI-enabled humanities education',
    date: '2024-01-15',
    author: 'Benjamin Breen',
    readTime: '5 min read',
    tags: ['Announcement', 'Education'],
  },
  {
    slug: 'building-historical-simulations',
    title: 'Building Historical Simulations with AI',
    excerpt: 'A guide to creating engaging and historically accurate AI-powered simulations',
    date: '2024-02-01',
    author: 'THINK Team',
    readTime: '8 min read',
    tags: ['Tutorial', 'AI'],
  },
]

export default function BlogPage() {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)
  const [isBackgroundHovered, setIsBackgroundHovered] = useState(false)

  return (
    <>
      <div
        onMouseEnter={() => setIsBackgroundHovered(true)}
        onMouseLeave={() => setIsBackgroundHovered(false)}
      >
        <Section className="pt-16 pb-12 relative">
          <div className="absolute inset-0 overflow-hidden">
            <BlogBackground isHovered={isBackgroundHovered} />
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

          {blogPosts.length > 0 ? (
            <div className="mx-auto max-w-4xl">
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                          <span>by {post.author}</span>
                        </div>
                        <div className="mt-4 flex items-center text-primary group-hover:underline">
                          Read more <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center py-12">
              <p className="text-muted-foreground">
                No blog posts yet. Check back soon for updates!
              </p>
            </div>
          )}
        </Container>
      </Section>
      </div>
    </>
  )
}
