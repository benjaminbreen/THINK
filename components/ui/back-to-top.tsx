'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BackToTopProps {
  /** Scroll threshold in pixels before button appears */
  threshold?: number
}

export function BackToTop({ threshold = 400 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold)
    }

    // Check initial state
    toggleVisibility()

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={cn(
        'group fixed right-5 z-50 sm:right-6',
        // Clears the home indicator on phones with gesture navigation
        'bottom-[max(1.25rem,env(safe-area-inset-bottom))]',
        'flex h-11 w-11 items-center justify-center rounded-full',
        'border border-border/60 bg-card/85 text-foreground/70 backdrop-blur-md',
        'shadow-md transition-all duration-300 ease-out-expo',
        'hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'active:scale-95',
        isVisible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-3 scale-90 opacity-0'
      )}
    >
      <ArrowUp className="h-[18px] w-[18px] transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  )
}
