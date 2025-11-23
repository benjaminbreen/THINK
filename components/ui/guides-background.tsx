'use client'

import { useEffect, useRef } from 'react'

export function GuidesBackground() {
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

    // Draw Cy Twombly-style looping cursive
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Use blue color with low opacity
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)' // Blue with 15% opacity
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Draw multiple overlapping cursive loops
      const numLoops = 3
      const loopHeight = 60
      const startY = 40

      for (let loop = 0; loop < numLoops; loop++) {
        ctx.beginPath()

        const yOffset = startY + (loop * 25)
        const xStart = -200 + offset.current

        // Create organic, hand-drawn cursive loops
        for (let x = xStart; x < canvas.width + 200; x += 80) {
          // Random variation to make it look hand-drawn
          const vary = Math.sin(x * 0.01 + loop) * 5

          // Upward curve
          ctx.moveTo(x, yOffset + vary)
          ctx.bezierCurveTo(
            x + 15, yOffset - loopHeight / 2 + vary,
            x + 25, yOffset - loopHeight / 2 + vary,
            x + 40, yOffset + vary
          )

          // Downward curve with loop
          ctx.bezierCurveTo(
            x + 55, yOffset + loopHeight / 2 + vary,
            x + 65, yOffset + loopHeight / 2 + vary,
            x + 80, yOffset + vary
          )
        }

        ctx.stroke()
      }

      // Add some random accent marks and flourishes
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.lineWidth = 1.5

      for (let i = 0; i < 8; i++) {
        const x = (i * 150) - 100 + offset.current
        const y = 30 + Math.sin(i) * 20

        // Small accent marks
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + 8, y - 3)
        ctx.stroke()
      }

      // Slowly move the pattern from right to left
      offset.current -= 0.2
      if (offset.current < -80) {
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
      style={{ opacity: 0.4 }}
    />
  )
}
