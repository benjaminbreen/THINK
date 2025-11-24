'use client'

import { useEffect, useRef } from 'react'

interface BlogBackgroundProps {
  isHovered?: boolean
  isHeaderHovered?: boolean
}

export function BlogBackground({ isHovered = false, isHeaderHovered = false }: BlogBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)
  const mousePos = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)

    // Two evolution sequences: circular and angular (no emojis)
    // Each evolves from small/simple to large/complex
    const circularChain = [
      '·', '˙', '˚', '°', '∙', '*', '⁎', '⁕', '⁜', '⁑',
      '◌', '◦', '○', '◍', '◎', '◉', '●', '⬤'
    ]

    const angularChain = [
      '.', ':', '·', '˙', '⁚', '⁝', '⁞', '⁘', '⁙', '▪', '▫', '▢',
      '▣', '▤', '▥', '▦', '▧', '▨', '▩', '◰', '◱', '◲', '◳', '◻',
      '◼', '◽', '◾', '■', '▀', '▄', '█', '◆', '◇', '◈'
    ]

    const gridSize = 60
    const cols = Math.ceil(canvas.width / gridSize)
    const rows = Math.ceil(canvas.height / gridSize)

    // Assign each cell to one of the two chains with unique evolution rate
    const cellChains = Array(cols).fill(0).map(() =>
      Array(rows).fill(0).map(() => ({
        useCircular: Math.random() > 0.5,
        evolutionRate: 0.00005 + Math.random() * 0.0002
      }))
    )

    const draw = (time: number) => {
      // Semi-transparent background for fade effect - adapt to dark mode
      const isDark = document.documentElement.classList.contains('dark')
      ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = 'bold 36px Georgia, serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      timeRef.current = time

      const hoverRadius = 200
      const baseOpacity = 0.12 // Lower opacity for more transparency

      // Performance optimization: skip if not hovered
      if (!isHovered && !isHeaderHovered) {
        animationFrameId.current = requestAnimationFrame(draw)
        return
      }

      // Cache canvas dimensions
      const canvasHalfHeight = canvas.height * 0.5
      const canvasHeight = canvas.height

      // When header is hovered, show full background; otherwise show localized
      let minI = 0, maxI = cols - 1, minJ = 0, maxJ = rows - 1

      if (!isHeaderHovered) {
        // Calculate cell range to check (only near cursor)
        const mouseCellX = Math.floor(mousePos.current.x / gridSize)
        const mouseCellY = Math.floor(mousePos.current.y / gridSize)
        const cellRadius = Math.ceil(hoverRadius / gridSize) + 1

        minI = Math.max(0, mouseCellX - cellRadius)
        maxI = Math.min(cols - 1, mouseCellX + cellRadius)
        minJ = Math.max(0, mouseCellY - cellRadius)
        maxJ = Math.min(rows - 1, mouseCellY + cellRadius)
      }

      for (let i = minI; i <= maxI; i++) {
        for (let j = minJ; j <= maxJ; j++) {
          const x = i * gridSize + gridSize / 2
          const y = j * gridSize + gridSize / 2

          // Calculate opacity based on mode
          let finalOpacity = 0

          if (isHeaderHovered) {
            // Full background mode - fade based on vertical position
            const verticalFade = Math.max(0, 1 - (y / canvasHalfHeight))
            finalOpacity = verticalFade * baseOpacity
          } else {
            // Localized mode - fade based on distance from cursor
            const dx = mousePos.current.x - x
            const dy = mousePos.current.y - y
            const distanceFromCursor = Math.sqrt(dx * dx + dy * dy)

            if (distanceFromCursor >= hoverRadius) continue

            const cursorProximity = 1 - (distanceFromCursor / hoverRadius)
            const verticalFade = Math.max(0, 1 - (y / canvasHalfHeight))
            finalOpacity = verticalFade * baseOpacity * cursorProximity
          }

          if (finalOpacity > 0.01) {
            // Get the evolution chain for this cell
            const cellData = cellChains[i][j]
            const chain = cellData.useCircular ? circularChain : angularChain

            // Vertical speed gradient: faster at top, current speed at middle, slower at bottom
            // Top (y=0): 3x speed, Middle (y=50%): 1x speed, Bottom (y=100%): 0.3x speed
            const verticalPosition = y / canvasHeight
            let speedMultiplier
            if (verticalPosition < 0.5) {
              // Top half: interpolate from 3x to 1x
              speedMultiplier = 3 - (verticalPosition * 4)
            } else {
              // Bottom half: interpolate from 1x to 0.3x
              speedMultiplier = 1 - ((verticalPosition - 0.5) * 1.4)
            }

            // Apply speed multiplier to evolution rate
            const effectiveRate = cellData.evolutionRate * speedMultiplier
            const evolutionProgress = (time * effectiveRate) % chain.length
            const symbolIndex = Math.floor(evolutionProgress)
            const symbol = chain[symbolIndex]

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
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isHovered, isHeaderHovered])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 1 }}
    />
  )
}
