'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { Download } from 'lucide-react'
import { useState } from 'react'

interface AssignmentCardProps {
  title: string
  description: string
  href: string
  slug: string // URL slug for finding thumbnail
  type: string
  tags: string[]
  animationDelay?: string
  status?: 'available' | 'coming-soon'
}

export function AssignmentCard({
  title,
  description,
  href,
  slug,
  type,
  tags,
  animationDelay = '100',
  status = 'coming-soon'
}: AssignmentCardProps) {
  const [hasImage, setHasImage] = useState(true)
  const thumbnailPath = `/thumbnails/assignments/${slug}.png`

  // Color-code tags based on content
  const getTagColor = (tag: string) => {
    const tagLower = tag.toLowerCase()
    if (tagLower.includes('history')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    if (tagLower.includes('ai') || tagLower.includes('literacy')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    if (tagLower.includes('critical') || tagLower.includes('theory')) return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
    if (tagLower.includes('research') || tagLower.includes('analysis')) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    if (tagLower.includes('writing') || tagLower.includes('reflection')) return 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
    if (tagLower.includes('technical') || tagLower.includes('data')) return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
    if (tagLower.includes('primary') || tagLower.includes('sources')) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    if (tagLower.includes('teamwork') || tagLower.includes('collaborative')) return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
    if (tagLower.includes('ethics') || tagLower.includes('pedagogy')) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200' // default
  }

  const cardContent = (
    <Card className={`h-full hover-lift-glow animate-fade-in-up opacity-0 animation-delay-${animationDelay} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${status === 'available' ? 'cursor-pointer' : 'opacity-70'}`}>
      <CardHeader>
        {hasImage ? (
          <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
            <Image
              src={thumbnailPath}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setHasImage(false)}
            />
          </div>
        ) : null}
        <div className="flex items-start justify-between mb-2">
          <Badge className="text-xs bg-violet-600 group-hover:bg-violet-700 text-white transition-colors">
            {type}
          </Badge>
          {status === 'coming-soon' && (
            <Badge variant="outline" className="text-xs">
              Coming Soon
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl mb-2 group-hover:text-violet-600 transition-colors">{title}</CardTitle>
        <CardDescription className="text-sm mb-2 leading-snug">
          {description}
        </CardDescription>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} className={`text-xs ${getTagColor(tag)}`}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {status === 'available' ? (
          <span className="text-sm text-primary inline-flex items-center group-hover:translate-x-1 transition-transform">
            Download assignment <Download className="ml-1 h-3 w-3" />
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">
            Available soon
          </span>
        )}
      </CardContent>
    </Card>
  )

  if (status === 'available') {
    return (
      <Link href={href} className="block group">
        {cardContent}
      </Link>
    )
  }

  return <div className="block">{cardContent}</div>
}
