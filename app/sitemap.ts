import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/projects',
    '/pedagogy',
    '/resources',
    '/guides',
    '/blog',
    '/team',
    '/contact',
  ]

  // Project pages
  const projects = [
    '/projects/young-darwin',
    '/projects/apothecary-simulator',
    '/projects/history-simulator',
    '/projects/historical-persona-generator',
  ]

  // Guide pages
  const guides = [
    '/guides/claude-code-basics',
    '/guides/prompt-engineering',
    '/guides/ai-historical-research',
    '/guides/history-machine-intelligence',
    '/guides/responsible-ai-classroom',
  ]

  const allPages = [...staticPages, ...projects, ...guides]

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/projects') || route.startsWith('/guides') ? 0.8 : 0.6,
  }))
}
