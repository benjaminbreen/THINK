'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  href: string
  slug: string // URL slug for finding thumbnail
  type: string
  year: string
  tags: string[]
  animationDelay?: string
  priority?: boolean // For above-the-fold images
}

export function ProjectCard({
  title,
  description,
  href,
  slug,
  type,
  year,
  tags,
  animationDelay = '100',
  priority = false
}: ProjectCardProps) {
  const [hasImage, setHasImage] = useState(true)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const thumbnailPath = `/thumbnails/${slug}.png`

  // Map string delays to actual CSS classes
  const delayClass = {
    '100': 'animation-delay-100',
    '200': 'animation-delay-200',
    '300': 'animation-delay-300',
    '400': 'animation-delay-400',
    '500': 'animation-delay-500',
    '600': 'animation-delay-600',
  }[animationDelay] || 'animation-delay-100'

  return (
    <Link href={href} className="group block">
      <Card
        interactive
        className={`flex h-full flex-col overflow-hidden opacity-0 animate-fade-in-up ${delayClass}`}
      >
        {hasImage ? (
          // A fixed ratio keeps every card in the grid aligned
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/40">
            {!isImageLoaded && <Skeleton className="absolute inset-0 h-full w-full" />}
            <Image
              src={thumbnailPath}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className={`object-cover transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.04] ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setHasImage(false)}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ) : null}

        <CardHeader className="flex-1 gap-0 space-y-0 pb-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <Badge className="bg-primary/90 transition-colors duration-200 group-hover:bg-primary">
              {type}
            </Badge>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">{year}</span>
          </div>
          <CardTitle className="text-lg transition-colors duration-200 group-hover:text-primary">
            {title}
          </CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            View project
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
