'use client'

import { useEffect, useRef } from 'react'

interface Bloom {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
  growing: boolean
  age: number
  maxAge: number
}

export function BlogBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const blooms = useRef<Bloom[]>([])
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

    // Draw ink blooms
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn new bloom every 8-12 seconds
      if (time - lastSpawnTime.current > 8000 + Math.random() * 4000) {
        blooms.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: 80 + Math.random() * 60,
          alpha: 0.25,
          growing: true,
          age: 0,
          maxAge: 300 // frames
        })
        lastSpawnTime.current = time
      }

      // Update and draw blooms
      blooms.current = blooms.current.filter(bloom => {
        bloom.age++

        if (bloom.growing && bloom.radius < bloom.maxRadius) {
          bloom.radius += 0.3 // Slow growth
          if (bloom.radius >= bloom.maxRadius) {
            bloom.growing = false
          }
        }

        // Fade out after reaching max radius
        if (!bloom.growing) {
          bloom.alpha -= 0.0015
        }

        // Remove if too old or fully faded
        if (bloom.alpha <= 0 || bloom.age >= bloom.maxAge) {
          return false
        }

        // Draw bloom with radial gradient (watercolor effect)
        const gradient = ctx.createRadialGradient(
          bloom.x, bloom.y, 0,
          bloom.x, bloom.y, bloom.radius
        )

        // Rose color with varying opacity
        gradient.addColorStop(0, `rgba(244, 63, 94, ${bloom.alpha * 0.15})`)
        gradient.addColorStop(0.4, `rgba(244, 63, 94, ${bloom.alpha * 0.08})`)
        gradient.addColorStop(0.7, `rgba(244, 63, 94, ${bloom.alpha * 0.03})`)
        gradient.addColorStop(1, 'rgba(244, 63, 94, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(bloom.x, bloom.y, bloom.radius, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle texture with smaller inner circle
        if (bloom.radius > 20) {
          const innerGradient = ctx.createRadialGradient(
            bloom.x + 5, bloom.y - 5, 0,
            bloom.x + 5, bloom.y - 5, bloom.radius * 0.6
          )

          innerGradient.addColorStop(0, `rgba(244, 63, 94, ${bloom.alpha * 0.1})`)
          innerGradient.addColorStop(1, 'rgba(244, 63, 94, 0)')

          ctx.fillStyle = innerGradient
          ctx.beginPath()
          ctx.arc(bloom.x + 5, bloom.y - 5, bloom.radius * 0.6, 0, Math.PI * 2)
          ctx.fill()
        }

        return true
      })

      animationFrameId.current = requestAnimationFrame(draw)
    }

    draw(0)

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
      style={{ opacity: 0.5 }}
    />
  )
}
