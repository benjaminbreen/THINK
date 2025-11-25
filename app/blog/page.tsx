import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, User } from 'lucide-react'
import { getAllPostsMeta, getPostBySlug, getReadingTime } from '@/lib/blog'
import { BlogHeader } from './blog-header'

interface BlogPostWithReadingTime {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  image?: string
  readingTime: string
}

// Server component - data fetched at build time
export default function BlogPage() {
  const postsMeta = getAllPostsMeta()

  // Add reading time to each post
  const posts: BlogPostWithReadingTime[] = postsMeta.map(post => {
    const fullPost = getPostBySlug(post.slug)
    return {
      ...post,
      readingTime: fullPost ? getReadingTime(fullPost.content) : '5 min read',
    }
  })

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
      />

      <BlogHeader />

      <Section className="pb-12">
        <Container>
          {posts.length > 0 ? (
            <div className="mx-auto max-w-4xl">
              <div className="space-y-8">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                      {post.image && (
                        <div className="relative aspect-[3/1] w-full overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}
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
                          {post.description}
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
                            <span>{post.readingTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
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
    </>
  )
}
