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
      className={`hero-glass-pane px-6 py-6 sm:px-10 sm:py-10 cursor-pointer hover:opacity-95 ${
        prefersReducedMotion ? '' : 'transition-all duration-300'
      } ${getAnimationClass('translate-y-4')}`}
      style={prefersReducedMotion ? undefined : { transitionDelay: '100ms' }}
      title="Click to hide"
    >
      <div
        className={`inline-block mb-5 ${
          prefersReducedMotion ? '' : 'transition-all duration-500 ease-out'
        } ${getAnimationClass('translate-y-3')}`}
        style={prefersReducedMotion ? undefined : { transitionDelay: '250ms' }}
      >
        <Badge variant="outline" className="text-sm font-normal border-primary/30 text-primary bg-primary/10">
          <span data-literary="hero-badge">Beta version</span>
        </Badge>
      </div>
      <h1
        className={`text-3xl font-serif font-bold tracking-tight sm:text-5xl mb-5 text-foreground ${
          prefersReducedMotion ? '' : 'transition-all duration-500 ease-out'
        } ${getAnimationClass('translate-y-4')}`}
        style={prefersReducedMotion ? undefined : { transitionDelay: '350ms' }}
        data-literary="hero-title"
      >
        Open Source Resources for Humanistic AI
      </h1>
      <p
        className={`text-base sm:text-lg hero-subtitle sm:leading-relaxed max-w-3xl ${
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
