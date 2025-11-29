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
    <Link href={href} className="block group">
      <Card interactive className={`h-full animate-fade-in-up opacity-0 ${delayClass} cursor-pointer border-border/60 hover:border-primary/30`}>
        <CardHeader className="pb-3">
          {hasImage ? (
            <div className="relative w-full h-36 rounded-lg overflow-hidden mb-3 bg-muted/30">
              {!isImageLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full" />
              )}
              <Image
                src={thumbnailPath}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={priority}
                className={`object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setHasImage(false)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : null}
          <div className="flex items-start justify-between mb-2">
            <Badge className="text-xs font-medium bg-primary/90 group-hover:bg-primary text-primary-foreground transition-colors duration-200">
              {type}
            </Badge>
            <span className="text-xs text-muted-foreground font-medium">{year}</span>
          </div>
          <CardTitle className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">{title}</CardTitle>
          <CardDescription className="text-sm mb-3 leading-relaxed text-muted-foreground/90">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs font-normal border-border/70">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            View project <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
