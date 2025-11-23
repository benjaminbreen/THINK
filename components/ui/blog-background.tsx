'use client'

import { useEffect, useRef } from 'react'

interface BlogBackgroundProps {
  isHovered?: boolean
}

export function BlogBackground({ isHovered = false }: BlogBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)

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

    // Editorial and typographic symbols
    const symbols = [
      '\u201C', '\u201D', '\u2018', '\u2019', '\u2014', '\u2013', '\u2026', '/', '\\', '|',
      '*', '\u2020', '\u2021', '\u00A7', '\u00B6', '\u2022', '\u25E6', '\u00B0', '~', '^',
      '\u00AB', '\u00BB', '\u2039', '\u203A', '[', ']', '{', '}', '\u2042', '\u203B'
    ]

    const gridSize = 50 // Much bigger grid (was 25)
    const cols = Math.ceil(canvas.width / gridSize)
    const rows = Math.ceil(canvas.height / gridSize)

    // Store change rates for each cell (much slower)
    const changeRates = Array(cols).fill(0).map(() =>
      Array(rows).fill(0).map(() => 0.0001 + Math.random() * 0.0003) // Much slower (was 0.0005-0.002)
    )

    const draw = (time: number) => {
      // Semi-transparent background for fade effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '28px Georgia, serif' // Much bigger font (was 14px)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      timeRef.current = time

      // Only show if hovered
      const hoverOpacity = isHovered ? 1 : 0

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize + gridSize / 2
          const y = j * gridSize + gridSize / 2

          // Calculate distance from upper left (0,0)
          const distanceFromOrigin = Math.sqrt(i * i + j * j)
          const maxDistance = Math.sqrt(cols * cols + rows * rows)

          // Fade based on distance from upper left
          const fadeDistance = maxDistance * 0.4
          let baseFade = 1.0

          if (distanceFromOrigin > fadeDistance) {
            baseFade = Math.max(0, 1 - ((distanceFromOrigin - fadeDistance) / (maxDistance - fadeDistance)))
          }

          // Wave animation from upper left
          const waveDelay = (i + j) * 100
          const waveProgress = Math.max(0, (time - waveDelay) / 1000)
          const waveOpacity = Math.min(1, waveProgress)

          // Combine all opacity effects including hover
          const finalOpacity = baseFade * waveOpacity * 0.4 * hoverOpacity

          if (finalOpacity > 0.01) {
            // Each cell changes at its own rate
            const timeOffset = (time * changeRates[i][j]) % symbols.length
            const symbolIndex = Math.floor(timeOffset)
            const symbol = symbols[symbolIndex]

            // Rose color theme
            ctx.fillStyle = `rgba(244, 63, 94, ${finalOpacity})`
            ctx.fillText(symbol, x, y)
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(draw)
    }

    animationFrameId.current = requestAnimationFrame(draw)

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
      style={{ opacity: 1 }}
    />
  )
}
