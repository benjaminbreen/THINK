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
    <Card className={`group hover-lift-glow animate-fade-in-up opacity-0 animation-delay-${animationDelay}`}>
      <CardHeader>
        {hasImage && thumbnailPath ? (
          <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
            <Image
              src={thumbnailPath}
              alt={title}
              fill
              className="object-cover"
              onError={() => setHasImage(false)}
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-lg bg-amber-600/10 flex items-center justify-center mb-3 animate-bounce-subtle">
            {icon}
          </div>
        )}
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href} className="text-sm text-primary hover:underline inline-flex items-center link-underline">
          Read guide <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  )
}
