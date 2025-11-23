'use client'

import { useEffect, useRef } from 'react'

interface BlogBackgroundProps {
  isHovered?: boolean
}

export function BlogBackground({ isHovered = false }: BlogBackgroundProps) {
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

    // Symbol evolution chains - symbols evolve based on visual complexity/size
    const evolutionChains = [
      // Dots evolving to larger circles
      ['.', '·', '°', '◦', '•', '●'],
      // Commas to colons to ellipsis
      [',', ';', ':', '‥', '…'],
      // Single to double vertical lines
      ['|', '‖', '│', '║'],
      // Brackets opening wider
      ['(', '[', '{', '⟨', '«'],
      [')' ,']', '}', '⟩', '»'],
      // Dashes growing longer
      ['-', '–', '—', '═'],
      // Crosses growing more complex
      ['+', '†', '‡', '✕', '✖'],
      // Quote marks
      ["'", '"', '‹', '›', '«', '»'],
      // Asterisks blooming
      ['*', '⁎', '✱', '✳', '✺', '✻'],
      // Slashes
      ['/', '⁄', '⧸'],
      ['\\', '⧹'],
      // Underscores to lines
      ['_', '‗', '═'],
      // Carets and angles
      ['^', '∧', '⌃'],
      ['~', '∼', '≈'],
      // Paragraph marks
      ['¶', '§', '⁋'],
      // Daggers
      ['†', '‡', '⁑'],
      // Bullets
      ['·', '•', '◦', '○', '◉'],
      // Mathematical
      ['=', '≈', '≡'],
      ['<', '⟨', '«'],
      ['>', '⟩', '»']
    ]

    const gridSize = 60 // Bigger grid
    const cols = Math.ceil(canvas.width / gridSize)
    const rows = Math.ceil(canvas.height / gridSize)

    // Assign each cell to an evolution chain and give it a unique evolution rate
    const cellChains = Array(cols).fill(0).map(() =>
      Array(rows).fill(0).map(() => ({
        chainIndex: Math.floor(Math.random() * evolutionChains.length),
        evolutionRate: 0.00005 + Math.random() * 0.0002 // Different rates, very slow
      }))
    )

    const draw = (time: number) => {
      // Semi-transparent background for fade effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = 'bold 36px Georgia, serif' // Much bigger font
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      timeRef.current = time

      const hoverRadius = 200 // Localized area around cursor

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize + gridSize / 2
          const y = j * gridSize + gridSize / 2

          // Distance from cursor
          const dx = mousePos.current.x - x
          const dy = mousePos.current.y - y
          const distanceFromCursor = Math.sqrt(dx * dx + dy * dy)

          // Only show in localized area around cursor when hovered
          let cursorProximity = 0
          if (isHovered && distanceFromCursor < hoverRadius) {
            cursorProximity = 1 - (distanceFromCursor / hoverRadius)
          }

          // Fade based on vertical position - invisible by halfway
          const verticalFade = Math.max(0, 1 - (y / (canvas.height * 0.5)))

          // Half opacity even at top
          const baseOpacity = 0.5

          // Combine all opacity effects
          const finalOpacity = verticalFade * baseOpacity * cursorProximity

          if (finalOpacity > 0.01) {
            // Get the evolution chain for this cell
            const cellData = cellChains[i][j]
            const chain = evolutionChains[cellData.chainIndex]

            // Calculate evolution progress for this specific cell
            const evolutionProgress = (time * cellData.evolutionRate) % chain.length
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
  }, [isHovered])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 1 }}
    />
  )
}
