'use client'

import { useEffect, useRef } from 'react'

interface Mark {
  x: number
  y: number
  type: 'dash' | 'asterisk' | 'underline' | 'caret' | 'bracket'
  opacity: number
  maxOpacity: number
  fadingIn: boolean
  age: number
  maxAge: number
}

export function BlogBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const marks = useRef<Mark[]>([])
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

    // Draw editorial marks
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn new mark every 2-3 seconds
      if (time - lastSpawnTime.current > 2000 + Math.random() * 1000) {
        const types: Mark['type'][] = ['dash', 'asterisk', 'underline', 'caret', 'bracket']
        marks.current.push({
          x: Math.random() * canvas.width,
          y: 20 + Math.random() * 60,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: 0,
          maxOpacity: 0.15 + Math.random() * 0.05,
          fadingIn: true,
          age: 0,
          maxAge: 180 + Math.random() * 60 // frames
        })
        lastSpawnTime.current = time
      }

      // Use rose color
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.15)'
      ctx.fillStyle = 'rgba(244, 63, 94, 0.15)'
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'

      // Update and draw marks
      marks.current = marks.current.filter(mark => {
        mark.age++

        // Fade in
        if (mark.fadingIn && mark.opacity < mark.maxOpacity) {
          mark.opacity += 0.01
          if (mark.opacity >= mark.maxOpacity) {
            mark.fadingIn = false
          }
        }

        // Fade out after reaching max age
        if (!mark.fadingIn && mark.age > mark.maxAge * 0.6) {
          mark.opacity -= 0.005
        }

        // Remove if too old or fully faded
        if (mark.opacity <= 0 || mark.age >= mark.maxAge) {
          return false
        }

        // Set opacity for this mark
        ctx.globalAlpha = mark.opacity

        // Draw based on type
        switch (mark.type) {
          case 'dash':
            ctx.beginPath()
            ctx.moveTo(mark.x, mark.y)
            ctx.lineTo(mark.x + 12, mark.y)
            ctx.stroke()
            break

          case 'asterisk':
            ctx.beginPath()
            // Draw asterisk with 6 lines
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i
              const x1 = mark.x + Math.cos(angle) * 3
              const y1 = mark.y + Math.sin(angle) * 3
              const x2 = mark.x + Math.cos(angle) * 6
              const y2 = mark.y + Math.sin(angle) * 6
              ctx.moveTo(x1, y1)
              ctx.lineTo(x2, y2)
            }
            ctx.stroke()
            break

          case 'underline':
            ctx.beginPath()
            ctx.moveTo(mark.x, mark.y + 2)
            ctx.lineTo(mark.x + 16, mark.y + 2)
            ctx.stroke()
            break

          case 'caret':
            ctx.beginPath()
            ctx.moveTo(mark.x, mark.y + 5)
            ctx.lineTo(mark.x + 4, mark.y)
            ctx.lineTo(mark.x + 8, mark.y + 5)
            ctx.stroke()
            break

          case 'bracket':
            ctx.beginPath()
            ctx.moveTo(mark.x + 2, mark.y - 4)
            ctx.lineTo(mark.x, mark.y - 4)
            ctx.lineTo(mark.x, mark.y + 4)
            ctx.lineTo(mark.x + 2, mark.y + 4)
            ctx.stroke()
            break
        }

        ctx.globalAlpha = 1
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
      style={{ opacity: 0.4 }}
    />
  )
}
