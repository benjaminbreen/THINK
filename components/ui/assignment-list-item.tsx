'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Download, ExternalLink, BookOpen } from 'lucide-react'
import { useState, useEffect } from 'react'

export interface AssignmentData {
  id: string
  title: string
  description: string
  href: string
  slug: string
  type: string
  tags: string[]
  status: 'available' | 'coming-soon'
  thumbnailPath?: string
  pdfPath?: string
  sampleSubmissionUrl?: string
  courseName?: string
  institution?: string
  gradeLevel?: string
  author?: string
}

interface AssignmentListItemProps {
  assignment: AssignmentData
  animationDelay?: string
}

export function AssignmentListItem({ assignment, animationDelay = '100' }: AssignmentListItemProps) {
  // Only show image if a custom thumbnail path is explicitly provided
  // This prevents 404 errors for placeholder assignments
  const hasCustomThumbnail = !!assignment.thumbnailPath
  const [imageError, setImageError] = useState(!hasCustomThumbnail)
  const thumbnailPath = assignment.thumbnailPath || ''

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

  const isAvailable = assignment.status === 'available'

  return (
    <Card
      interactive={isAvailable}
      className={`group overflow-hidden opacity-0 animate-fade-in-up ${delayClass} ${!isAvailable ? 'opacity-70' : ''}`}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden bg-muted/40 sm:aspect-auto sm:w-56 lg:w-64">
          {!imageError && thumbnailPath ? (
            <>
              <Image
                src={thumbnailPath}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 256px"
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
          {/* Type badge overlay */}
          <div className="absolute left-3 top-3">
            <Badge className="bg-violet-600 text-white shadow-sm">
              {assignment.type}
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

        {/* Content */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex h-full flex-col">
            {/* Header info */}
            <div className="mb-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              {assignment.courseName && (
                <span className="font-medium text-foreground">{assignment.courseName}</span>
              )}
              {assignment.courseName && assignment.institution && <span>•</span>}
              {assignment.institution && <span>{assignment.institution}</span>}
              {(assignment.courseName || assignment.institution) && assignment.gradeLevel && <span>•</span>}
              {assignment.gradeLevel && <span>{assignment.gradeLevel}</span>}
              {assignment.author && (
                <>
                  <span>•</span>
                  <span>By {assignment.author}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="mb-2 font-serif text-lg font-bold leading-snug transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400 sm:text-xl">
              {isAvailable ? (
                <Link href={`/pedagogy/assignments/${assignment.slug}`}>
                  {assignment.title}
                </Link>
              ) : (
                assignment.title
              )}
            </h3>

            {/* Description */}
            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {assignment.description}
            </p>

            {/* Tags */}
            <div className="mb-5 flex flex-wrap gap-1.5">
              {assignment.tags.map((tag) => (
                <Badge key={tag} variant="outline" className={`border-transparent font-normal ${getTagColor(tag)}`}>
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-auto flex flex-wrap gap-2">
              {isAvailable && (
                <Button asChild size="sm">
                  <Link href={`/pedagogy/assignments/${assignment.slug}`}>
                    View Assignment
                  </Link>
                </Button>
              )}
              {assignment.pdfPath && (
                <Button asChild variant="outline" size="sm">
                  <a href={assignment.pdfPath} target="_blank" rel="noopener noreferrer">
                    <Download className="h-3.5 w-3.5" />
                    Download PDF
                  </a>
                </Button>
              )}
              {assignment.sampleSubmissionUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={assignment.sampleSubmissionUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Sample Submission
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
