'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface HeroContentProps {
  children?: React.ReactNode
}

export function HeroContent({ children }: HeroContentProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Trigger animations after mount (skip delay if reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) {
      setMounted(true)
      return
    }
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

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

  // Animation classes - skip if user prefers reduced motion
  const getAnimationClass = (baseClass: string) => {
    if (prefersReducedMotion) return ''
    return mounted ? 'opacity-100 translate-y-0' : `opacity-0 ${baseClass}`
  }

  return (
    <div
      onClick={() => setIsVisible(false)}
      className={`hero-glass-pane cursor-pointer px-6 py-7 sm:px-10 sm:py-9 ${
        prefersReducedMotion ? '' : 'transition-all duration-300'
      } ${getAnimationClass('translate-y-4')}`}
      style={prefersReducedMotion ? undefined : { transitionDelay: '100ms' }}
      title="Click to hide"
    >
      <div
        className={`mb-5 inline-block ${
          prefersReducedMotion ? '' : 'transition-all duration-500 ease-out'
        } ${getAnimationClass('translate-y-3')}`}
        style={prefersReducedMotion ? undefined : { transitionDelay: '250ms' }}
      >
        <Badge
          variant="outline"
          className="border-primary/30 bg-primary/10 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary"
        >
          <span data-literary="hero-badge">Beta version</span>
        </Badge>
      </div>
      <h1
        className={`mb-4 text-display-lg font-serif font-bold text-foreground ${
          prefersReducedMotion ? '' : 'transition-all duration-500 ease-out'
        } ${getAnimationClass('translate-y-4')}`}
        style={prefersReducedMotion ? undefined : { transitionDelay: '350ms' }}
        data-literary="hero-title"
      >
        Open Source Resources for Humanistic AI
      </h1>
      <p
        className={`hero-subtitle max-w-[46ch] text-base leading-relaxed sm:text-lg ${
          prefersReducedMotion ? '' : 'transition-all duration-500 ease-out'
        } ${getAnimationClass('translate-y-4')}`}
        style={prefersReducedMotion ? undefined : { transitionDelay: '450ms' }}
        data-literary="hero-description"
      >
        A public resource hub for educators and researchers interested in creative, free, and otherwise interesting uses of AI in the humanities and beyond.
      </p>
    </div>
  )
}
