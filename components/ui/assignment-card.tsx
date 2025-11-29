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
  institution
}: AssignmentCardProps) {
  // Only attempt to load image if custom thumbnail is provided
  // This prevents 404 errors for placeholder assignments
  const hasCustomThumbnail = !!customThumbnailPath
  const [imageError, setImageError] = useState(!hasCustomThumbnail)
  const thumbnailPath = customThumbnailPath || ''
  const isAvailable = status === 'available'

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
    <Card className={`group h-full overflow-hidden animate-fade-in-up opacity-0 animation-delay-${animationDelay} transition-all duration-300 hover:shadow-xl ${isAvailable ? 'cursor-pointer' : 'opacity-60'}`}>
      {/* Thumbnail with gradient overlay */}
      <div className="relative w-full h-40 overflow-hidden">
        {!imageError && thumbnailPath ? (
          <>
            <Image
              src={thumbnailPath}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-white/20 dark:via-slate-900/20 to-transparent" />
            {/* Purple tint overlay for coming-soon items */}
            {!isAvailable && (
              <div className="absolute inset-0 bg-violet-500/40 dark:bg-violet-900/50" />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-900/30 dark:to-violet-800/30 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-violet-300 dark:text-violet-600" />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent" />
          </div>
        )}
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-violet-600 text-white shadow-md text-xs">
            {type}
          </Badge>
        </div>
        {!isAvailable && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-slate-800/80 text-white text-xs">
              Coming Soon
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pt-3 pb-2">
        {/* Course/Institution info */}
        {(courseName || institution) && (
          <p className="text-xs text-muted-foreground mb-1">
            {courseName}{courseName && institution && ' • '}{institution}
          </p>
        )}
        <CardTitle className="text-lg leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
          {title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed line-clamp-3 mt-1">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className={`text-xs ${getTagColor(tag)}`}>
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
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
                className="text-xs h-7"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(pdfPath, '_blank', 'noopener,noreferrer')
                }}
              >
                <Download className="mr-1 h-3 w-3" />
                PDF
              </Button>
            )}
            {sampleSubmissionUrl && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(sampleSubmissionUrl, '_blank', 'noopener,noreferrer')
                }}
              >
                <ExternalLink className="mr-1 h-3 w-3" />
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
