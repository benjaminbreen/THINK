'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const prefersReducedMotion = useReducedMotion()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    if (!prefersReducedMotion) {
      setIsAnimating(true)
      // Add transitioning class for smooth color transitions
      document.documentElement.classList.add('theme-transitioning')
      setTimeout(() => {
        setIsAnimating(false)
        document.documentElement.classList.remove('theme-transitioning')
      }, 600)
    }
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-10 w-10 overflow-hidden rounded-full"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute h-5 w-5 ${prefersReducedMotion ? '' : 'transition-all duration-500 ease-out'} ${
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100'
        } ${isAnimating && !isDark && !prefersReducedMotion ? 'animate-sun-rise' : ''}`}
      >
        {/* Sun center */}
        <circle
          cx="12"
          cy="12"
          r="4"
          className={`transition-all duration-300 ${
            isHovered ? 'fill-amber-500 stroke-amber-600' : 'fill-foreground/80 stroke-foreground'
          }`}
        />
        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={angle}
            x1="12"
            y1="2"
            x2="12"
            y2="4"
            className={`transition-all duration-300 ${
              isHovered ? 'stroke-amber-500' : 'stroke-foreground/80'
            }`}
            style={{
              transformOrigin: '12px 12px',
              transform: `rotate(${angle}deg)`,
              opacity: isAnimating && !isDark ? 1 : 0.8,
              transition: `opacity 0.3s ease ${i * 0.05}s, stroke 0.3s ease`,
            }}
          />
        ))}
      </svg>

      {/* Moon icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute h-5 w-5 ${prefersReducedMotion ? '' : 'transition-all duration-500 ease-out'} ${
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        } ${isAnimating && isDark && !prefersReducedMotion ? 'animate-moon-rise' : ''}`}
      >
        <path
          d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
          className={`transition-all duration-300 ${
            isHovered ? 'fill-indigo-400 stroke-indigo-500' : 'fill-foreground/80 stroke-foreground'
          }`}
        />
        {/* Stars that twinkle in on hover */}
        <circle
          cx="19"
          cy="5"
          r="0.5"
          className={`transition-all duration-300 ${
            isHovered ? 'fill-indigo-300 opacity-80' : 'fill-foreground/50 opacity-0'
          } ${isDark && isAnimating ? 'scale-100' : isDark && isHovered ? 'scale-100' : 'scale-0'}`}
          style={{ transitionDelay: '0.1s' }}
        />
        <circle
          cx="21"
          cy="9"
          r="0.3"
          className={`transition-all duration-300 ${
            isHovered ? 'fill-indigo-300 opacity-60' : 'fill-foreground/50 opacity-0'
          } ${isDark && isAnimating ? 'scale-100' : isDark && isHovered ? 'scale-100' : 'scale-0'}`}
          style={{ transitionDelay: '0.2s' }}
        />
      </svg>

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
