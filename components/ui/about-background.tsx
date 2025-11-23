'use client'

import { useEffect, useRef } from 'react'

export function AboutBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const time = useRef(0)

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

    // Create breathing gradient orbs
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Three overlapping gradient orbs at different positions and speeds
      const orbs = [
        {
          x: canvas.width * 0.2,
          y: canvas.height * 0.3,
          baseRadius: 200,
          speed: 0.0008,
          phase: 0
        },
        {
          x: canvas.width * 0.7,
          y: canvas.height * 0.5,
          baseRadius: 250,
          speed: 0.001,
          phase: Math.PI / 3
        },
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.7,
          baseRadius: 180,
          speed: 0.0012,
          phase: Math.PI * 2 / 3
        }
      ]

      orbs.forEach(orb => {
        // Gentle breathing effect - radius expands and contracts
        const breathe = Math.sin(time.current * orb.speed + orb.phase)
        const radius = orb.baseRadius + (breathe * 30)

        // Create radial gradient
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, radius
        )

        // Indigo color with very low opacity
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)')
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.03)')
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      time.current += 1
      animationFrameId.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
