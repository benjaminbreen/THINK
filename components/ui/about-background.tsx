'use client'

import { useEffect, useRef } from 'react'

export function AboutBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const offset = useRef(0)

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

    // Define constellation points
    interface Point {
      x: number
      y: number
      baseX: number
      baseY: number
    }

    const points: Point[] = []
    const numPoints = 12

    // Initialize points across the top area
    for (let i = 0; i < numPoints; i++) {
      const x = (i * 120) + 50
      const y = 30 + Math.random() * 40
      points.push({
        x,
        y,
        baseX: x,
        baseY: y
      })
    }

    // Draw constellation threads
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Use indigo color
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)' // Indigo with 35% opacity
      ctx.fillStyle = 'rgba(99, 102, 241, 0.4)'
      ctx.lineWidth = 1
      ctx.lineCap = 'round'

      // Update point positions with gentle drift
      points.forEach((point, i) => {
        const driftX = Math.sin(offset.current * 0.01 + i * 0.5) * 3
        const driftY = Math.cos(offset.current * 0.01 + i * 0.3) * 2
        point.x = point.baseX + driftX - offset.current
        point.y = point.baseY + driftY
      })

      // Draw connecting lines between nearby points
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i]
          const p2 = points[j]
          const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))

          // Only connect points that are reasonably close
          if (distance < 150) {
            // Opacity fades with distance
            const opacity = 0.35 * (1 - distance / 150)
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`

            ctx.beginPath()
            // Curved line between points
            const midX = (p1.x + p2.x) / 2
            const midY = (p1.y + p2.y) / 2 + Math.sin(offset.current * 0.02) * 5

            ctx.moveTo(p1.x, p1.y)
            ctx.quadraticCurveTo(midX, midY, p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Draw dots at each point
      points.forEach(point => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Slowly move the pattern from right to left
      offset.current += 0.2
      if (offset.current > 120) {
        // Reset positions
        points.forEach((point, i) => {
          point.baseX = (i * 120) + 50
        })
        offset.current = 0
      }

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
      style={{ opacity: 0.8 }}
    />
  )
}
