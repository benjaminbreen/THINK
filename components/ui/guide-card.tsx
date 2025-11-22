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

  return (
    <Link href={href} className="block group">
      <Card className={`h-full hover-lift-glow animate-fade-in-up opacity-0 animation-delay-${animationDelay} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer`}>
        <CardHeader>
          {hasImage && thumbnailPath ? (
            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
              <Image
                src={thumbnailPath}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setHasImage(false)}
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-lg bg-amber-600/10 flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-amber-600/20 group-hover:scale-110">
              {icon}
            </div>
          )}
          <CardTitle className="text-lg mb-2 group-hover:text-amber-600 transition-colors">{title}</CardTitle>
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-sm text-primary inline-flex items-center group-hover:translate-x-1 transition-transform">
            Read guide <ArrowRight className="ml-1 h-3 w-3" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
