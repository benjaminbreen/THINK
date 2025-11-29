import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { RelatedPosts } from '@/components/ui/related-posts'
import { BlogPostFooter } from '@/components/ui/blog-post-footer'
import { BackToTop } from '@/components/ui/back-to-top'
import { SocialShare } from '@/components/ui/social-share'
import { getPostBySlug, getRelatedPosts, getAllPostsMeta, getReadingTime } from '@/lib/blog'
import { siteConfig } from '@/lib/config'
import { BlogPostingJsonLd, BreadcrumbJsonLd } from '@/components/structured-data'
import { Calendar, Clock, User } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPostsMeta()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const url = `${siteConfig.url}/blog/${slug}`

  return {
    title: `${post.title} | THINK Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: 'THINK @ UCSC',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: 'THINK @ UCSC',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : ['/og-default.png'],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, post.tags, 3)
  const readingTime = getReadingTime(post.content)

  return (
    <>
      <BlogPostingJsonLd
        title={post.title}
        description={post.description}
        author={post.author}
        datePublished={post.date}
        image={post.image}
        slug={slug}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${slug}` },
        ]}
      />

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <Section className="pt-12 pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Post Header */}
            <header className="mb-10">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl font-serif font-bold mb-4">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground mb-6">
                {post.description}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground border-t border-b py-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime}</span>
                  </div>
                </div>
                <SocialShare
                  title={post.title}
                  url={`${siteConfig.url}/blog/${slug}`}
                  description={post.description}
                />
              </div>

              {/* Featured Image */}
              {post.image && (
                <div className="mt-8 -mx-4 sm:-mx-8 lg:-mx-16">
                  <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              )}
            </header>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={post.content} />
            </div>
          </article>
        </Container>
      </Section>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />

      {/* Footer CTA */}
      <BlogPostFooter />

      <BackToTop />
    </>
  )
}
