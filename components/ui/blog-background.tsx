'use client'

import { useEffect, useRef } from 'react'

interface BlogBackgroundProps {
  isHovered?: boolean
  isHeaderHovered?: boolean
}

export function BlogBackground({ isHovered = false, isHeaderHovered = false }: BlogBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const lastFrameTime = useRef(0)
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

    // Symbol chains for evolution
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

    // Target 30fps for smoother animation
    const targetFPS = 30
    const frameInterval = 1000 / targetFPS

    const draw = (timestamp: number) => {
      // Throttle to target FPS
      const elapsed = timestamp - lastFrameTime.current
      if (elapsed < frameInterval) {
        animationFrameId.current = requestAnimationFrame(draw)
        return
      }
      lastFrameTime.current = timestamp - (elapsed % frameInterval)

      // Clear canvas completely instead of semi-transparent overlay (prevents flickering)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Skip drawing if not hovered
      if (!isHovered && !isHeaderHovered) {
        animationFrameId.current = requestAnimationFrame(draw)
        return
      }

      ctx.font = 'bold 36px Georgia, serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const hoverRadius = 200
      const baseOpacity = 0.12
      const canvasHalfHeight = canvas.height * 0.5
      const canvasHeight = canvas.height

      // Determine render bounds
      let minI = 0, maxI = cols - 1, minJ = 0, maxJ = rows - 1

      if (!isHeaderHovered) {
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

          let finalOpacity = 0

          if (isHeaderHovered) {
            const verticalFade = Math.max(0, 1 - (y / canvasHalfHeight))
            finalOpacity = verticalFade * baseOpacity
          } else {
            const dx = mousePos.current.x - x
            const dy = mousePos.current.y - y
            const distanceFromCursor = Math.sqrt(dx * dx + dy * dy)

            if (distanceFromCursor >= hoverRadius) continue

            const cursorProximity = 1 - (distanceFromCursor / hoverRadius)
            const verticalFade = Math.max(0, 1 - (y / canvasHalfHeight))
            finalOpacity = verticalFade * baseOpacity * cursorProximity
          }

          if (finalOpacity > 0.01) {
            const cellData = cellChains[i]?.[j]
            if (!cellData) continue

            const chain = cellData.useCircular ? circularChain : angularChain
            const verticalPosition = y / canvasHeight
            let speedMultiplier
            if (verticalPosition < 0.5) {
              speedMultiplier = 3 - (verticalPosition * 4)
            } else {
              speedMultiplier = 1 - ((verticalPosition - 0.5) * 1.4)
            }

            const effectiveRate = cellData.evolutionRate * speedMultiplier
            const evolutionProgress = (timestamp * effectiveRate) % chain.length
            const symbolIndex = Math.floor(evolutionProgress)
            const symbol = chain[symbolIndex]

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
    />
  )
}
