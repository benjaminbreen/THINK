'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'

interface HeroContentProps {
  children?: React.ReactNode
}

export function HeroContent({ children }: HeroContentProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Listen for hide/show hero events
  useEffect(() => {
    const handleHideHero = () => setIsVisible(false)
    const handleShowHero = () => setIsVisible(true)

    window.addEventListener('THINK_hideHero', handleHideHero)
    window.addEventListener('THINK_showHero', handleShowHero)

    return () => {
      window.removeEventListener('THINK_hideHero', handleHideHero)
      window.removeEventListener('THINK_showHero', handleShowHero)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div
      onClick={() => setIsVisible(false)}
      className="hero-glass-pane px-6 py-6 sm:px-10 sm:py-10 cursor-pointer transition-opacity duration-300 hover:opacity-95"
      title="Click to hide"
    >
      <div className="inline-block mb-5 animate-fade-in">
        <Badge variant="outline" className="text-sm font-normal border-primary/30 text-primary bg-primary/10">
          <span data-literary="hero-badge">Beta version</span>
        </Badge>
      </div>
      <h1 className="text-3xl font-serif font-bold tracking-tight sm:text-5xl mb-5 animate-fade-in animation-delay-100 text-foreground" data-literary="hero-title">
        Open Source Resources for Humanistic AI
      </h1>
      <p className="text-base sm:text-lg hero-subtitle animate-fade-in animation-delay-200 sm:leading-relaxed max-w-3xl" data-literary="hero-description">
        A public resource hub for educators and researchers interested in creative, free, and otherwise interesting uses of AI in the humanities and beyond.
      </p>
    </div>
  )
}
