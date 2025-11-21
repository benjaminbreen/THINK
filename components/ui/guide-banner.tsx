'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown, X } from 'lucide-react'
import { Button } from './button'

interface GuideBannerProps {
  thumbnailPath: string
  guideTitle: string
  guideId: string
}

export function GuideBanner({ thumbnailPath, guideTitle, guideId }: GuideBannerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasGuessed, setHasGuessed] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const isNonAIImage = guideId === 'responsible-ai-classroom'

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

  const handleGuess = (guess: 'ai' | 'non-ai') => {
    if (hasGuessed) return

    setHasGuessed(true)

    const isCorrect = (guess === 'non-ai' && isNonAIImage) || (guess === 'ai' && !isNonAIImage)

    if (isCorrect) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 4000)
    }
  }

  return (
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
          alt={guideTitle}
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

      {/* Attribution Content - Always visible below image */}
      <div className="mt-4 p-6 bg-muted/50 rounded-lg border">
        <h3 className="font-sans text-lg font-semibold mb-4">Image Attribution & Mini-Game</h3>

        <div className="prose prose-sm max-w-none mb-6">
          <p>
            Seven of the eight guide thumbnails on this site were created using Google's{' '}
            <span className="font-semibold">Imagen 3</span> by riffing on imagery from{' '}
            <a
              href="https://publicdomainreview.org/collection/a-19th-century-vision-of-the-year-2000/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              "A 19th-Century Vision of the Year 2000"
            </a>
            {' '}— a series of French illustrations from around 1900 imagining future technology.
          </p>
          <p className="mb-4">
            One thumbnail is <strong>not</strong> AI-generated. Can you guess which one this guide uses?
          </p>
        </div>

        {!hasGuessed ? (
          <div className="flex gap-3">
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleGuess('ai')
              }}
              variant="outline"
            >
              This is AI-generated
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                handleGuess('non-ai')
              }}
              variant="outline"
            >
              This is NOT AI-generated
            </Button>
          </div>
        ) : (
          <div className={`p-4 rounded-lg ${isNonAIImage ? 'bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800' : 'bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800'}`}>
            <p className="text-sm mb-0">
              {isNonAIImage ? (
                <span className="font-semibold">This image is NOT AI-generated!</span>
              ) : (
                <span>This image was created using AI. The non-AI image is on the <strong>Responsible AI Use in the Classroom</strong> guide.</span>
              )}
            </p>
          </div>
        )}
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
                alt={guideTitle}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg max-w-sm">
            <p className="font-semibold mb-1">Congratulations! 🎉</p>
            <p className="text-sm">You have good intuition about AI-generated images!</p>
          </div>
        </div>
      )}
    </div>
  )
}
