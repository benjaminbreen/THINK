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
      className={`group overflow-hidden animate-fade-in-up opacity-0 ${delayClass} transition-all duration-300 hover:shadow-lg ${!isAvailable ? 'opacity-60' : ''}`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail with gradient overlay */}
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
          {!imageError && thumbnailPath ? (
            <>
              <Image
                src={thumbnailPath}
                alt={assignment.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
              {/* Gradient overlay that fades into card */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white dark:to-slate-900 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-slate-900 md:hidden" />
              {/* Purple tint overlay for coming-soon items */}
              {!isAvailable && (
                <div className="absolute inset-0 bg-violet-500/40 dark:bg-violet-900/50" />
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-900/30 dark:to-violet-800/30 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-violet-400" />
            </div>
          )}
          {/* Type badge overlay */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-violet-600 text-white shadow-md">
              {assignment.type}
            </Badge>
          </div>
          {!isAvailable && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-slate-800/80 text-white">
                Coming Soon
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Header info */}
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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
            <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {isAvailable ? (
                <Link href={`/pedagogy/assignments/${assignment.slug}`} className="hover:underline">
                  {assignment.title}
                </Link>
              ) : (
                assignment.title
              )}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
              {assignment.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {assignment.tags.map((tag) => (
                <Badge key={tag} variant="outline" className={`text-xs ${getTagColor(tag)}`}>
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
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Download PDF
                  </a>
                </Button>
              )}
              {assignment.sampleSubmissionUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={assignment.sampleSubmissionUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
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
