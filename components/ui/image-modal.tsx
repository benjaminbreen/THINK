'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface ImageModalProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  containerClassName?: string
}

/**
 * A clickable image that opens in a full-screen modal.
 * Click anywhere outside the image or press Escape to close.
 */
export function ImageModal({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  containerClassName = ''
}: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeModal])

  return (
    <>
      {/* Clickable Image */}
      <div
        className={`cursor-zoom-in ${containerClassName}`}
        onClick={() => setIsOpen(true)}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={className}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 500}
            className={className}
            priority={priority}
          />
        )}
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-60 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-colors"
            aria-label="Close image"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal Image Container */}
          <div
            className="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1000}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              priority
            />

            {/* Caption */}
            {alt && (
              <div className="absolute -bottom-12 left-0 right-0 text-center text-white/80 text-sm">
                {alt}
              </div>
            )}
          </div>

          {/* Click outside hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs">
            Click anywhere or press ESC to close
          </div>
        </div>
      )}
    </>
  )
}
