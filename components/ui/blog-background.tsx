'use client'

import { useEffect, useRef, useState } from 'react'

interface BlogBackgroundProps {
  isHovered?: boolean
  isHeaderHovered?: boolean
}

export function BlogBackground({ isHovered = false, isHeaderHovered = false }: BlogBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)
  const mousePos = useRef({ x: -1000, y: -1000 })
  const fadeProgress = useRef(0)
  const lastFrameTime = useRef(0)

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
      // Clear canvas completely to prevent flickering
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Smooth fade in/out animation (300ms = 18 frames at 60fps)
      const isActive = isHovered || isHeaderHovered
      const fadeSpeed = 1 / 18
      if (isActive && fadeProgress.current < 1) {
        fadeProgress.current = Math.min(1, fadeProgress.current + fadeSpeed)
      } else if (!isActive && fadeProgress.current > 0) {
        fadeProgress.current = Math.max(0, fadeProgress.current - fadeSpeed)
      }

      // Skip rendering if fully faded out
      if (fadeProgress.current === 0) {
        animationFrameId.current = requestAnimationFrame(draw)
        return
      }

      // Performance: only update time if enough time has passed (16ms = 60fps)
      const deltaTime = time - lastFrameTime.current
      if (deltaTime < 16) {
        animationFrameId.current = requestAnimationFrame(draw)
        return
      }
      lastFrameTime.current = time

      ctx.font = 'bold 36px Georgia, serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      timeRef.current = time

      const hoverRadius = 200
      const headerHoverRadius = 400 // Larger radius when header is hovered
      const baseOpacity = 0.18 // Increased opacity for better visibility

      // Cache canvas dimensions
      const canvasHalfHeight = canvas.height * 0.5
      const canvasHeight = canvas.height

      // Always use localized mode, but with different radius based on header hover
      const activeRadius = isHeaderHovered ? headerHoverRadius : hoverRadius

      // Calculate cell range to check (only near cursor)
      const mouseCellX = Math.floor(mousePos.current.x / gridSize)
      const mouseCellY = Math.floor(mousePos.current.y / gridSize)
      const cellRadius = Math.ceil(activeRadius / gridSize) + 1

      const minI = Math.max(0, mouseCellX - cellRadius)
      const maxI = Math.min(cols - 1, mouseCellX + cellRadius)
      const minJ = Math.max(0, mouseCellY - cellRadius)
      const maxJ = Math.min(rows - 1, mouseCellY + cellRadius)

      for (let i = minI; i <= maxI; i++) {
        for (let j = minJ; j <= maxJ; j++) {
          const x = i * gridSize + gridSize / 2
          const y = j * gridSize + gridSize / 2

          // Calculate opacity based on distance from cursor
          const dx = mousePos.current.x - x
          const dy = mousePos.current.y - y
          const distanceFromCursor = Math.sqrt(dx * dx + dy * dy)

          if (distanceFromCursor >= activeRadius) continue

          const cursorProximity = 1 - (distanceFromCursor / activeRadius)
          const verticalFade = Math.max(0, 1 - (y / canvasHalfHeight))
          const finalOpacity = verticalFade * baseOpacity * cursorProximity * fadeProgress.current

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
