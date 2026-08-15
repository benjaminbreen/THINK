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
  const [isAttributionVisible, setIsAttributionVisible] = useState(false)
  const [isAttributionDismissed, setIsAttributionDismissed] = useState(false)

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
        className="group relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-2xl bg-muted sm:aspect-[21/9]"
        onMouseEnter={() => {
          setIsHovered(true)
          if (!isAttributionDismissed) {
            setIsAttributionVisible(true)
          }
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={thumbnailPath}
          alt={guideTitle}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
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

      {/* Attribution Content - Shows on hover, stays visible until dismissed */}
      {isAttributionVisible && !isAttributionDismissed && (
        <div className="relative mt-4 rounded-2xl border border-border/70 bg-muted/50 p-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <button
            onClick={() => setIsAttributionDismissed(true)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-muted-foreground/10 flex items-center justify-center transition-colors group"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </button>
          <h3 className="mb-4 pr-8 font-serif text-lg font-semibold">Image Attribution &amp; Mini-Game</h3>

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
          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
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
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-h-[90vh] w-full max-w-6xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative h-full w-full overflow-auto rounded-xl">
              <Image
                src={thumbnailPath}
                alt={guideTitle}
                width={1200}
                height={800}
                className="h-auto w-full rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed inset-x-5 bottom-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 sm:inset-x-auto sm:bottom-8 sm:right-8">
          <div className="max-w-sm rounded-xl bg-green-600 px-5 py-4 text-white shadow-lg">
            <p className="font-semibold mb-1">Congratulations! 🎉</p>
            <p className="text-sm">You have good intuition about AI-generated images!</p>
          </div>
        </div>
      )}
    </div>
  )
}
