'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from './button'

interface ProjectBannerProps {
  thumbnailPath: string
  projectTitle: string
}

export function ProjectBanner({ thumbnailPath, projectTitle }: ProjectBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mb-8">
      {/* Banner Image */}
      <div
        className={`relative w-full bg-muted rounded-lg overflow-hidden group cursor-pointer transition-all duration-500 ${
          isExpanded ? 'h-auto' : 'h-48 md:h-64'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <div className="relative w-full">
            <Image
              src={thumbnailPath}
              alt={projectTitle}
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        ) : (
          <Image
            src={thumbnailPath}
            alt={projectTitle}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Collapse Image
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                View Full Image
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
