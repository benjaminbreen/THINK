'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface GuideCardProps {
  title: string
  description: string
  href: string
  thumbnailPath?: string
  icon: React.ReactNode
  animationDelay?: string
}

export function GuideCard({
  title,
  description,
  href,
  thumbnailPath,
  icon,
  animationDelay = '100'
}: GuideCardProps) {
  const [hasImage, setHasImage] = useState(!!thumbnailPath)

  // Map string delays to actual CSS classes for Tailwind JIT
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
      <Card className={`h-full hover-lift-glow animate-fade-in-up opacity-0 ${delayClass} transition-all duration-300 ease-out cursor-pointer border-border/60 hover:border-primary/30`}>
        <CardHeader className="pb-3">
          {hasImage && thumbnailPath ? (
            <div className="relative w-full h-36 rounded-lg overflow-hidden mb-3 bg-muted/30">
              <Image
                src={thumbnailPath}
                alt={title}
                fill
                className="object-cover transition-all duration-500 ease-out group-hover:scale-[1.03]"
                onError={() => setHasImage(false)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3 transition-all duration-300 ease-out group-hover:bg-primary/15 group-hover:scale-105">
              {icon}
            </div>
          )}
          <CardTitle className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">{title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed text-muted-foreground/90">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            Read guide <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
