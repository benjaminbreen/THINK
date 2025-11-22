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
    <Link href={href} className="block group">
      <Card className={`h-full hover-lift-glow animate-fade-in-up opacity-0 animation-delay-${animationDelay} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer`}>
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
            <Badge className="text-xs bg-amber-600 group-hover:bg-amber-700 text-white transition-colors">
              {type}
            </Badge>
            <span className="text-xs text-muted-foreground">{year}</span>
          </div>
          <CardTitle className="text-xl mb-2 group-hover:text-amber-600 transition-colors">{title}</CardTitle>
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
          <span className="text-sm text-primary inline-flex items-center group-hover:translate-x-1 transition-transform">
            View project <ArrowRight className="ml-1 h-3 w-3" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
