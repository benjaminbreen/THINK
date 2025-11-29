'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

// Animated Hourglass SVG component
function AnimatedHourglass({ className = '' }: { className?: string }) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 180) % 360)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <svg
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      aria-label="Hourglass - page lost to time"
    >
      {/* Outer frame */}
      <rect x="10" y="5" width="80" height="8" rx="2" className="fill-amber-700 dark:fill-amber-500" />
      <rect x="10" y="127" width="80" height="8" rx="2" className="fill-amber-700 dark:fill-amber-500" />

      {/* Decorative frame caps */}
      <rect x="5" y="3" width="90" height="4" rx="1" className="fill-amber-800 dark:fill-amber-400" />
      <rect x="5" y="133" width="90" height="4" rx="1" className="fill-amber-800 dark:fill-amber-400" />

      {/* Glass bulbs */}
      <path
        d="M20 13 L20 50 Q50 70 80 50 L80 13 Z"
        className="fill-amber-100/80 dark:fill-amber-900/40 stroke-amber-600 dark:stroke-amber-400"
        strokeWidth="2"
      />
      <path
        d="M20 127 L20 90 Q50 70 80 90 L80 127 Z"
        className="fill-amber-100/80 dark:fill-amber-900/40 stroke-amber-600 dark:stroke-amber-400"
        strokeWidth="2"
      />

      {/* Neck of hourglass */}
      <path
        d="M42 65 L42 75 L58 75 L58 65 Z"
        className="fill-amber-100/60 dark:fill-amber-900/30 stroke-amber-600 dark:stroke-amber-400"
        strokeWidth="1.5"
      />

      {/* Sand in top bulb */}
      <path
        d="M25 20 L25 42 Q50 58 75 42 L75 20 Z"
        className="fill-amber-400/70 dark:fill-amber-600/60"
      >
        <animate
          attributeName="d"
          values="M25 20 L25 42 Q50 58 75 42 L75 20 Z;M35 20 L35 35 Q50 45 65 35 L65 20 Z;M45 20 L45 25 Q50 30 55 25 L55 20 Z"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Sand stream */}
      <line x1="50" y1="58" x2="50" y2="82" className="stroke-amber-500 dark:stroke-amber-500" strokeWidth="3">
        <animate
          attributeName="stroke-opacity"
          values="0.8;0.3;0.8"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>

      {/* Sand in bottom bulb */}
      <path
        d="M25 120 L25 110 Q50 95 75 110 L75 120 Z"
        className="fill-amber-400/70 dark:fill-amber-600/60"
      >
        <animate
          attributeName="d"
          values="M25 120 L25 110 Q50 95 75 110 L75 120 Z;M25 120 L25 100 Q50 85 75 100 L75 120 Z;M25 120 L25 95 Q50 80 75 95 L75 120 Z"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* Subtle glass shine */}
      <ellipse cx="30" cy="30" rx="5" ry="8" className="fill-white/30" />
      <ellipse cx="30" cy="105" rx="5" ry="8" className="fill-white/30" />
    </svg>
  )
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background via-amber-50/20 to-background dark:via-amber-950/10">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 py-16">
          {/* Hourglass */}
          <div className="flex-shrink-0">
            <AnimatedHourglass className="w-40 h-56 sm:w-52 sm:h-72 lg:w-64 lg:h-[360px] drop-shadow-2xl" />
          </div>

          {/* Text content */}
          <div className="text-center lg:text-left max-w-xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight tracking-tight">
              Page lost to the{' '}
              <span className="italic text-amber-700 dark:text-amber-400">
                mists of time...
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground font-serif mb-10 leading-relaxed">
              The page you seek has slipped through the hourglass. Perhaps it never existed,
              or perhaps it belongs to another era entirely.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/projects/historical-persona-generator">
                  Generate a Historical Persona
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/about">
                  About THINK
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              THINK is a collaborative project at UC Santa Cruz funded by the{' '}
              <span className="font-semibold text-amber-700 dark:text-amber-400">
               National Endowment for the Humanities and the Humanities Institute, UCSC
              </span>
              
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
