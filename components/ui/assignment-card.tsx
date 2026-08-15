'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Download, ExternalLink, BookOpen } from 'lucide-react'
import { useState } from 'react'

interface AssignmentCardProps {
  title: string
  description: string
  href: string
  slug: string
  type: string
  tags: string[]
  animationDelay?: string
  status?: 'available' | 'coming-soon'
  thumbnailPath?: string
  pdfPath?: string
  sampleSubmissionUrl?: string
  courseName?: string
  institution?: string
  /** Eagerly load the thumbnail when the card is above the fold */
  priority?: boolean
}

export function AssignmentCard({
  title,
  description,
  href,
  slug,
  type,
  tags,
  animationDelay = '100',
  status = 'coming-soon',
  thumbnailPath: customThumbnailPath,
  pdfPath,
  sampleSubmissionUrl,
  courseName,
  institution,
  priority = false
}: AssignmentCardProps) {
  // Only attempt to load image if custom thumbnail is provided
  // This prevents 404 errors for placeholder assignments
  const hasCustomThumbnail = !!customThumbnailPath
  const [imageError, setImageError] = useState(!hasCustomThumbnail)
  const thumbnailPath = customThumbnailPath || ''
  const isAvailable = status === 'available'

  // Map string delays to actual CSS classes for Tailwind JIT
  const delayClass = {
    '100': 'animation-delay-100',
    '200': 'animation-delay-200',
    '300': 'animation-delay-300',
    '400': 'animation-delay-400',
    '500': 'animation-delay-500',
    '600': 'animation-delay-600',
  }[animationDelay] || 'animation-delay-100'

  // Color-code tags based on content
  const getTagColor = (tag: string) => {
    const tagLower = tag.toLowerCase()
    if (tagLower.includes('history')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
    if (tagLower.includes('ai') || tagLower.includes('literacy')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
    if (tagLower.includes('critical') || tagLower.includes('theory')) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
    if (tagLower.includes('research') || tagLower.includes('analysis')) return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
    if (tagLower.includes('writing') || tagLower.includes('reflection')) return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200'
    if (tagLower.includes('technical') || tagLower.includes('data') || tagLower.includes('digital')) return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200'
    if (tagLower.includes('primary') || tagLower.includes('sources')) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
    if (tagLower.includes('teamwork') || tagLower.includes('collaborative')) return 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200'
    if (tagLower.includes('ethics') || tagLower.includes('pedagogy')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200'
    return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
  }

  const cardContent = (
    <Card
      interactive={isAvailable}
      className={`group flex h-full flex-col overflow-hidden opacity-0 animate-fade-in-up ${delayClass} ${
        isAvailable ? 'cursor-pointer' : 'opacity-70'
      }`}
    >
      {/* Thumbnail with gradient overlay */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/40">
        {!imageError && thumbnailPath ? (
          <>
            <Image
              src={thumbnailPath}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              priority={priority}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              onError={() => setImageError(true)}
            />
            {/* Desaturate thumbnails for assignments that aren't published yet */}
            {!isAvailable && (
              <div className="absolute inset-0 bg-background/50 backdrop-grayscale" />
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100/60 dark:from-violet-950/25 dark:to-violet-900/15">
            <BookOpen className="h-9 w-9 text-violet-300/80 dark:text-violet-700/70" />
          </div>
        )}
        {/* Type badge */}
        <div className="absolute left-3 top-3">
          <Badge className="bg-violet-600 text-white shadow-sm">
            {type}
          </Badge>
        </div>
        {!isAvailable && (
          <div className="absolute right-3 top-3">
            <Badge variant="secondary" className="bg-slate-900/80 text-white shadow-sm">
              Coming Soon
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="flex-1 gap-0 space-y-0 pb-4">
        {/* Course/Institution info */}
        {(courseName || institution) && (
          <p className="mb-2 text-xs text-muted-foreground">
            {courseName}{courseName && institution && ' • '}{institution}
          </p>
        )}
        <CardTitle className="line-clamp-2 text-lg transition-colors duration-200 group-hover:text-violet-600 dark:group-hover:text-violet-400">
          {title}
        </CardTitle>
        <CardDescription className="mt-2 line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className={`border-transparent font-normal ${getTagColor(tag)}`}>
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="font-normal">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Action links - use buttons with onClick to avoid nested <a> tags */}
        {isAvailable && (
          <div className="flex flex-wrap gap-2">
            {pdfPath && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(pdfPath, '_blank', 'noopener,noreferrer')
                }}
              >
                <Download className="h-3.5 w-3.5" />
                PDF
              </Button>
            )}
            {sampleSubmissionUrl && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(sampleSubmissionUrl, '_blank', 'noopener,noreferrer')
                }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Sample
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )

  if (isAvailable) {
    return (
      <Link href={`/pedagogy/assignments/${slug}`} className="block">
        {cardContent}
      </Link>
    )
  }

  return <div className="block">{cardContent}</div>
}
