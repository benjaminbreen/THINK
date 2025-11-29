'use client'

import { useEffect, useRef } from 'react'

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
}

interface RipplesBackgroundProps {
  isHovered?: boolean
}

export function RipplesBackground({ isHovered = false }: RipplesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const ripples = useRef<Ripple[]>([])
  const lastSpawnTime = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize with a few ripple sources
    const initRipples = () => {
      const sources = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3 },
        { x: canvas.width * 0.7, y: canvas.height * 0.6 },
        { x: canvas.width * 0.5, y: canvas.height * 0.4 },
      ]

      sources.forEach(source => {
        // Create initial ripples at different stages
        for (let i = 0; i < 3; i++) {
          ripples.current.push({
            x: source.x,
            y: source.y,
            radius: i * 60,
            maxRadius: 200 + Math.random() * 100,
            opacity: 1 - (i * 0.3),
            speed: 0.3 + Math.random() * 0.2
          })
        }
      })
    }

    initRipples()

    // Spawn new ripple at a source point
    const spawnRipple = (time: number) => {
      const spawnInterval = isHovered ? 800 : 1500

      if (time - lastSpawnTime.current > spawnInterval) {
        const sources = [
          { x: canvas.width * 0.2, y: canvas.height * 0.3 },
          { x: canvas.width * 0.7, y: canvas.height * 0.6 },
          { x: canvas.width * 0.5, y: canvas.height * 0.4 },
        ]

        // Pick a random source, or spawn at multiple sources when hovered
        if (isHovered) {
          // Spawn at all sources when hovered
          sources.forEach(source => {
            ripples.current.push({
              x: source.x + (Math.random() - 0.5) * 20,
              y: source.y + (Math.random() - 0.5) * 20,
              radius: 0,
              maxRadius: 180 + Math.random() * 120,
              opacity: 1,
              speed: 0.5 + Math.random() * 0.3
            })
          })
        } else {
          const source = sources[Math.floor(Math.random() * sources.length)]
          ripples.current.push({
            x: source.x + (Math.random() - 0.5) * 30,
            y: source.y + (Math.random() - 0.5) * 30,
            radius: 0,
            maxRadius: 200 + Math.random() * 100,
            opacity: 1,
            speed: 0.3 + Math.random() * 0.2
          })
        }

        lastSpawnTime.current = time
      }
    }

    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      spawnRipple(time)

      // Speed multiplier on hover
      const speedMultiplier = isHovered ? 1.8 : 1

      // Update and draw ripples
      ripples.current = ripples.current.filter(ripple => {
        // Expand ripple
        ripple.radius += ripple.speed * speedMultiplier

        // Fade out as it expands
        ripple.opacity = Math.max(0, 1 - (ripple.radius / ripple.maxRadius))

        // Remove if fully faded
        if (ripple.opacity <= 0) return false

        // Draw ripple circle
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(139, 92, 246, ${ripple.opacity * 0.3})` // Violet color
        ctx.lineWidth = isHovered ? 2 : 1.5
        ctx.stroke()

        // Draw a second, inner ripple for depth
        if (ripple.radius > 20) {
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(139, 92, 246, ${ripple.opacity * 0.15})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        return true
      })

      // Keep a minimum number of ripples
      if (ripples.current.length < 5) {
        const sources = [
          { x: canvas.width * 0.2, y: canvas.height * 0.3 },
          { x: canvas.width * 0.7, y: canvas.height * 0.6 },
          { x: canvas.width * 0.5, y: canvas.height * 0.4 },
        ]
        const source = sources[Math.floor(Math.random() * sources.length)]
        ripples.current.push({
          x: source.x,
          y: source.y,
          radius: 0,
          maxRadius: 200 + Math.random() * 100,
          opacity: 1,
          speed: 0.3 + Math.random() * 0.2
        })
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isHovered])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  )
}
