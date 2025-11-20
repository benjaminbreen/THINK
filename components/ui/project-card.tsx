'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
}

export function ProjectCard({
  title,
  description,
  href,
  slug,
  type,
  year,
  tags,
  animationDelay = '100'
}: ProjectCardProps) {
  const [hasImage, setHasImage] = useState(true)
  const thumbnailPath = `/thumbnails/${slug}.png`

  return (
    <Card className={`group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-${animationDelay} overflow-hidden relative`}>
      {hasImage ? (
        <>
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={thumbnailPath}
              alt={title}
              fill
              className="object-cover"
              onError={() => setHasImage(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
          </div>

          {/* Content Overlay */}
          <CardHeader className="relative z-10">
            <div className="flex items-start justify-between mb-2">
              <Badge className="text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-lg">
                {type}
              </Badge>
              <span className="text-xs text-white/80 shadow-sm">{year}</span>
            </div>
            <CardTitle className="text-xl mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {title}
            </CardTitle>
            <CardDescription className="text-sm mb-2 leading-snug text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              {description}
            </CardDescription>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-white/30 text-white bg-white/10 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <Link href={href} className="text-sm text-white hover:text-amber-300 inline-flex items-center group-hover:translate-x-1 transition-all drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              View project <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardContent>
        </>
      ) : (
        <>
          {/* Fallback without image */}
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <Badge className="text-xs bg-amber-600 hover:bg-amber-700 text-white">{type}</Badge>
              <span className="text-xs text-muted-foreground">{year}</span>
            </div>
            <CardTitle className="text-xl mb-2">{title}</CardTitle>
            <CardDescription className="text-sm mb-2 leading-snug">
              {description}
            </CardDescription>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Link href={href} className="text-sm text-primary hover:underline inline-flex items-center group-hover:translate-x-1 transition-transform">
              View project <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </CardContent>
        </>
      )}
    </Card>
  )
}
