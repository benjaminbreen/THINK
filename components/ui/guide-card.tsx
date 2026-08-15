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
  /** Eagerly load the thumbnail when the card is above the fold */
  priority?: boolean
}

export function GuideCard({
  title,
  description,
  href,
  thumbnailPath,
  icon,
  animationDelay = '100',
  priority = false
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
    <Link href={href} className="group block">
      <Card
        interactive
        className={`flex h-full flex-col overflow-hidden opacity-0 animate-fade-in-up ${delayClass}`}
      >
        {hasImage && thumbnailPath ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/40">
            <Image
              src={thumbnailPath}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              onError={() => setHasImage(false)}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ) : null}

        <CardHeader className="flex-1 gap-0 space-y-0 pb-4">
          {!hasImage && (
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
              {icon}
            </div>
          )}
          <CardTitle className="text-lg transition-colors duration-200 group-hover:text-primary">
            {title}
          </CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Read guide
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
