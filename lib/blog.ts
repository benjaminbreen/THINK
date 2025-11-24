import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  image?: string
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  image?: string
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

/**
 * Get all blog posts with full content
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'))

  const posts = files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(BLOG_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
      author: data.author || 'THINK Team',
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image || undefined,
      content,
    } as BlogPost
  })

  // Sort by date, newest first
  return posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * Get all blog post metadata (without content) - lighter weight
 */
export function getAllPostsMeta(): BlogPostMeta[] {
  return getAllPosts().map(({ content, ...meta }) => meta)
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
    author: data.author || 'THINK Team',
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: data.image || undefined,
    content,
  }
}

/**
 * Get related posts based on shared tags
 */
export function getRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  maxPosts: number = 3
): BlogPostMeta[] {
  const allPosts = getAllPostsMeta()

  return allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => ({
      ...post,
      // Score by number of shared tags
      score: post.tags.filter(tag => currentTags.includes(tag)).length
    }))
    .sort((a, b) => {
      // First by tag overlap, then by date
      if (b.score !== a.score) return b.score - a.score
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, maxPosts)
    .map(({ score, ...post }) => post) // Remove score from result
}

/**
 * Get all unique tags across all posts
 */
export function getAllTags(): string[] {
  const posts = getAllPostsMeta()
  const tagSet = new Set<string>()

  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })

  return Array.from(tagSet).sort()
}

/**
 * Calculate estimated reading time
 */
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}
