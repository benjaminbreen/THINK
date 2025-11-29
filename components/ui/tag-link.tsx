'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { tagToSlug } from '@/lib/tags-data'

interface TagLinkProps {
  tag: string
  variant?: 'default' | 'outline' | 'secondary'
  className?: string
  size?: 'sm' | 'default'
}

/**
 * A clickable tag that links to the /tags/[tag] page
 */
export function TagLink({
  tag,
  variant = 'outline',
  className = '',
  size = 'default'
}: TagLinkProps) {
  return (
    <Link href={`/tags/${tagToSlug(tag)}`}>
      <Badge
        variant={variant}
        className={`cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-colors ${
          size === 'sm' ? 'text-xs px-2 py-0.5' : ''
        } ${className}`}
      >
        {tag}
      </Badge>
    </Link>
  )
}

interface TagListProps {
  tags: string[]
  variant?: 'default' | 'outline' | 'secondary'
  className?: string
  maxVisible?: number
  size?: 'sm' | 'default'
}

/**
 * A list of clickable tags
 */
export function TagList({
  tags,
  variant = 'outline',
  className = '',
  maxVisible,
  size = 'default'
}: TagListProps) {
  const visibleTags = maxVisible ? tags.slice(0, maxVisible) : tags
  const remainingCount = maxVisible ? tags.length - maxVisible : 0

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visibleTags.map(tag => (
        <TagLink key={tag} tag={tag} variant={variant} size={size} />
      ))}
      {remainingCount > 0 && (
        <Badge variant="outline" className={size === 'sm' ? 'text-xs px-2 py-0.5' : ''}>
          +{remainingCount} more
        </Badge>
      )}
    </div>
  )
}
