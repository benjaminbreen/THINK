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

      <Section className="pb-16">
        <Container>
          {posts.length > 0 ? (
            <div className="mx-auto max-w-3xl space-y-6">
              {posts.map((post, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <Card interactive className="overflow-hidden">
                    {post.image && (
                      <div className="relative aspect-[2/1] w-full overflow-hidden bg-muted/40 sm:aspect-[5/2]">
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 768px"
                          priority={index === 0}
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      {post.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <CardTitle className="text-xl transition-colors group-hover:text-primary sm:text-2xl">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readingTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        Read more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border py-16 text-center">
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
