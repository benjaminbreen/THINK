'use client'

import { useEffect, useRef } from 'react'

export function ProjectsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const gridOpacity = useRef<Map<string, number>>(new Map())
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

    const gridSize = 40 // Size of grid squares

    // Draw blueprint-style grid
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Cyan grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.18)'
      ctx.lineWidth = 0.5

      // Vertical lines with gradient from top to bottom
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

        // Darker at top, fading to invisible by halfway
        const fadePhase = Math.sin(time.current * 0.0005 + x * 0.01)
        const baseOpacity = 0.18 + (fadePhase * 0.08)

        gradient.addColorStop(0, `rgba(6, 182, 212, ${baseOpacity * 1.2})`)
        gradient.addColorStop(0.3, `rgba(6, 182, 212, ${baseOpacity * 0.6})`)
        gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0)')
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')

        ctx.strokeStyle = gradient
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines with fade based on vertical position
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const fadePhase = Math.sin(time.current * 0.0005 + y * 0.01)
        let baseOpacity = 0.18 + (fadePhase * 0.08)

        // Fade out based on vertical position (invisible by halfway)
        const verticalFade = Math.max(0, 1 - (y / (canvas.height * 0.5)))
        const opacity = baseOpacity * verticalFade * 1.2

        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw subtle corner marks at grid intersections (blueprint style) with fade
      for (let x = gridSize; x < canvas.width; x += gridSize * 2) {
        for (let y = gridSize; y < canvas.height; y += gridSize * 2) {
          const markPhase = Math.sin(time.current * 0.0003 + x * 0.005 + y * 0.005)
          const size = 1 + (markPhase * 0.5)

          // Fade out based on vertical position
          const verticalFade = Math.max(0, 1 - (y / (canvas.height * 0.5)))
          const opacity = 0.22 * verticalFade * 1.2

          ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

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
      style={{ opacity: 0.55 }}
    />
  )
}
