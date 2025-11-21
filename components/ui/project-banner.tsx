'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown, X } from 'lucide-react'
import { Button } from './button'

interface ProjectBannerProps {
  thumbnailPath: string
  projectTitle: string
}

export function ProjectBanner({ thumbnailPath, projectTitle }: ProjectBannerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isModalOpen])

  return (
    <>
      <div className="mb-8">
        {/* Banner Image */}
        <div
          className="relative w-full h-48 md:h-64 bg-muted rounded-lg overflow-hidden group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={thumbnailPath}
            alt={projectTitle}
            fill
            className="object-cover"
            priority
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button variant="secondary" size="sm" className="gap-2">
              <ChevronDown className="h-4 w-4" />
              View Full Image
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative w-full h-full overflow-auto rounded-lg">
              <Image
                src={thumbnailPath}
                alt={projectTitle}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
