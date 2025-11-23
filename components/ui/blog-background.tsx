'use client'

import { useEffect, useRef } from 'react'

interface Quote {
  x: number
  y: number
  vx: number
  vy: number
  type: 'open' | 'close' | 'single' | 'em-dash' | 'ellipsis'
  opacity: number
  rotation: number
  rotationSpeed: number
}

export function BlogBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const quotes = useRef<Quote[]>([])
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

    // Initialize some quotes
    for (let i = 0; i < 8; i++) {
      const types: Quote['type'][] = ['open', 'close', 'single', 'em-dash', 'ellipsis']
      quotes.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.2 + 0.1,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: 0.3 + Math.random() * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01
      })
    }

    // Draw floating quotes
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn new quote occasionally
      if (time - lastSpawnTime.current > 3000 + Math.random() * 2000) {
        const types: Quote['type'][] = ['open', 'close', 'single', 'em-dash', 'ellipsis']
        quotes.current.push({
          x: Math.random() * canvas.width,
          y: -20,
          vx: (Math.random() - 0.5) * 0.3,
          vy: Math.random() * 0.2 + 0.1,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: 0.3 + Math.random() * 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01
        })
        lastSpawnTime.current = time
      }

      // Use rose color
      ctx.fillStyle = 'rgba(244, 63, 94, 0.4)'
      ctx.font = '24px Georgia, serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Update and draw quotes
      quotes.current = quotes.current.filter(quote => {
        // Update position
        quote.x += quote.vx
        quote.y += quote.vy
        quote.rotation += quote.rotationSpeed

        // Wrap horizontally
        if (quote.x < -50) quote.x = canvas.width + 50
        if (quote.x > canvas.width + 50) quote.x = -50

        // Remove if too far down
        if (quote.y > canvas.height + 50) {
          return false
        }

        // Draw with rotation
        ctx.save()
        ctx.translate(quote.x, quote.y)
        ctx.rotate(quote.rotation)
        ctx.globalAlpha = quote.opacity

        let symbol = ''
        switch (quote.type) {
          case 'open':
            symbol = '"'
            break
          case 'close':
            symbol = '"'
            break
          case 'single':
            symbol = "'"
            break
          case 'em-dash':
            symbol = '—'
            break
          case 'ellipsis':
            symbol = '…'
            break
        }

        ctx.fillText(symbol, 0, 0)
        ctx.restore()

        return true
      })

      ctx.globalAlpha = 1
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
      style={{ opacity: 1 }}
    />
  )
}
