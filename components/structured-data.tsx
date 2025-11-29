import { siteConfig } from '@/lib/config'

interface BlogPostingProps {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  slug: string
}

interface ArticleProps {
  title: string
  description: string
  author?: string
  datePublished?: string
  dateModified?: string
  image?: string
  slug: string
  section: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * JSON-LD structured data for blog posts
 */
export function BlogPostingJsonLd({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  slug,
}: BlogPostingProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${slug}`,
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * JSON-LD structured data for guides/articles
 */
export function ArticleJsonLd({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  slug,
  section,
}: ArticleProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    articleSection: section,
    ...(author && {
      author: {
        '@type': 'Person',
        name: author,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${slug}`,
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * JSON-LD breadcrumb structured data
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/**
 * JSON-LD organization structured data (for homepage/about)
 */
export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: siteConfig.organization.name,
      url: siteConfig.organization.url,
    },
    funder: {
      '@type': 'GovernmentOrganization',
      name: siteConfig.funder.name,
      url: siteConfig.funder.url,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.email,
      contactType: 'general inquiry',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
