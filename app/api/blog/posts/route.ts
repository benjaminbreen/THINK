import { NextResponse } from 'next/server'
import { getAllPostsMeta, getReadingTime, getPostBySlug } from '@/lib/blog'

export async function GET() {
  try {
    const posts = getAllPostsMeta()

    // Add reading time to each post
    const postsWithReadingTime = posts.map(post => {
      const fullPost = getPostBySlug(post.slug)
      return {
        ...post,
        readingTime: fullPost ? getReadingTime(fullPost.content) : '5 min read',
      }
    })

    return NextResponse.json(postsWithReadingTime)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json([], { status: 500 })
  }
}
