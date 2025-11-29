'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface FillingBlock {
  col: number
  row: number
  canvasX: number // Position on canvas (with displacement)
  canvasY: number
  screenX: number
  screenY: number
  fillProgress: number // 0 to 1, water rising
  phase: 'filling' | 'wiggling' | 'falling'
  wiggleTime: number
  vy: number
  rotation: number
  rotationSpeed: number
  opacity: number
}

interface InkWashBackgroundProps {
  isHovered?: boolean
}

export function InkWashBackground({ isHovered = false }: InkWashBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const mousePos = useRef({ x: -1000, y: -1000 })
  const isHoveredRef = useRef(isHovered)
  const time = useRef(0)
  const fillingBlocks = useRef<FillingBlock[]>([])
  const [fallingElements, setFallingElements] = useState<FillingBlock[]>([])
  const gridSpacingRef = useRef(25)

  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleMouseLeave = () => {
      mousePos.current = { x: -1000, y: -1000 }
    }

    const gridSpacing = 25
    gridSpacingRef.current = gridSpacing

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Simple approach: find nearest grid cell based on click position
      // The block will appear at its current morphed position
      const col = Math.round(clickX / gridSpacing)
      const row = Math.round(clickY / gridSpacing)

      // Bounds check
      const cols = Math.ceil(canvas.width / gridSpacing) + 1
      const rows = Math.ceil(canvas.height / gridSpacing) + 1
      if (col < 0 || col >= cols || row < 0 || row >= rows) return

      // Check if this block is already being processed
      const alreadyExists = fillingBlocks.current.some(
        b => b.col === col && b.row === row
      )
      if (alreadyExists) return

      // Get base and morphed positions
      const baseX = col * gridSpacing
      const baseY = row * gridSpacing
      const { dx, dy } = getDisplacement(baseX, baseY)

      // Create a filling block at the morphed position
      fillingBlocks.current.push({
        col,
        row,
        canvasX: baseX + dx,
        canvasY: baseY + dy,
        screenX: rect.left + baseX + dx,
        screenY: rect.top + baseY + dy,
        fillProgress: 0,
        phase: 'filling',
        wiggleTime: 0,
        vy: 0,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        opacity: 1
      })
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)

    const influenceRadius = 120

    // Calculate displacement for each grid point - defined outside draw so click handler can use it
    const getDisplacement = (x: number, y: number) => {
      let dx = 0
      let dy = 0

      // Mouse influence - magnetic field effect
      const mouseDistX = x - mousePos.current.x
      const mouseDistY = y - mousePos.current.y
      const mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY)

      if (mouseDist < influenceRadius && mouseDist > 0) {
        const influence = Math.pow(1 - mouseDist / influenceRadius, 2)
        // Push points away from cursor (like magnetic repulsion)
        dx += (mouseDistX / mouseDist) * influence * 15
        dy += (mouseDistY / mouseDist) * influence * 15
      }

      // Subtle wave animation on hover
      if (isHoveredRef.current) {
        const wavePhase = time.current * 0.02
        dx += Math.sin(y * 0.05 + wavePhase) * 3
        dy += Math.cos(x * 0.05 + wavePhase) * 2
      }

      return { dx, dy }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time.current += 1

      const cols = Math.ceil(canvas.width / gridSpacing) + 1
      const rows = Math.ceil(canvas.height / gridSpacing) + 1

      // Draw vertical lines
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)'
      ctx.lineWidth = 0.5

      for (let col = 0; col < cols; col++) {
        ctx.beginPath()
        for (let row = 0; row <= rows; row++) {
          const baseX = col * gridSpacing
          const baseY = row * gridSpacing

          const { dx, dy } = getDisplacement(baseX, baseY)
          const x = baseX + dx
          const y = baseY + dy

          // Vertical fade - fully visible at top, transparent at bottom
          const fadeProgress = baseY / canvas.height
          const alpha = Math.max(0, 0.15 * (1 - fadeProgress * fadeProgress))

          if (row === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        // Create gradient stroke for vertical fade
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)')
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)')
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
        ctx.strokeStyle = gradient
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let row = 0; row < rows; row++) {
        const baseY = row * gridSpacing
        const fadeProgress = baseY / canvas.height
        const alpha = Math.max(0, 0.15 * (1 - fadeProgress * fadeProgress))

        if (alpha < 0.01) continue // Skip invisible lines

        ctx.beginPath()
        for (let col = 0; col <= cols; col++) {
          const baseX = col * gridSpacing

          const { dx, dy } = getDisplacement(baseX, baseY)
          const x = baseX + dx
          const y = baseY + dy

          if (col === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`
        ctx.stroke()
      }

      // Draw subtle intersection dots near cursor
      if (mousePos.current.x > 0) {
        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            const baseX = col * gridSpacing
            const baseY = row * gridSpacing

            // Skip if this block is being filled
            if (fillingBlocks.current.some(b => b.col === col && b.row === row)) continue

            const mouseDistX = baseX - mousePos.current.x
            const mouseDistY = baseY - mousePos.current.y
            const mouseDist = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY)

            if (mouseDist < influenceRadius * 0.8) {
              const { dx, dy } = getDisplacement(baseX, baseY)
              const x = baseX + dx
              const y = baseY + dy

              const fadeProgress = baseY / canvas.height
              const verticalAlpha = Math.max(0, 1 - fadeProgress * fadeProgress)
              const proximityAlpha = Math.pow(1 - mouseDist / (influenceRadius * 0.8), 2)
              const dotAlpha = verticalAlpha * proximityAlpha * 0.4

              if (dotAlpha > 0.02) {
                ctx.beginPath()
                ctx.arc(x, y, 1.5, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(139, 92, 246, ${dotAlpha})`
                ctx.fill()
              }
            }
          }
        }
      }

      // Update and draw filling blocks (before they start falling)
      const blockSize = gridSpacing * 0.9
      const blocksToPortal: FillingBlock[] = []

      fillingBlocks.current = fillingBlocks.current.filter(block => {
        // Use the stored canvas position (which includes displacement from when clicked)
        const x = block.canvasX
        const y = block.canvasY

        if (block.phase === 'filling') {
          // Fill up like rising water
          block.fillProgress += 0.04

          if (block.fillProgress >= 1) {
            block.fillProgress = 1
            block.phase = 'wiggling'
            block.wiggleTime = 0
          }

          // Draw filling block
          ctx.save()
          ctx.translate(x, y)

          // Draw the fill from bottom up
          const fillHeight = blockSize * block.fillProgress
          const fillY = blockSize / 2 - fillHeight

          ctx.fillStyle = 'rgba(139, 92, 246, 0.6)'
          ctx.fillRect(-blockSize / 2, fillY, blockSize, fillHeight)

          // Border
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)'
          ctx.lineWidth = 1
          ctx.strokeRect(-blockSize / 2, -blockSize / 2, blockSize, blockSize)

          ctx.restore()
          return true
        }

        if (block.phase === 'wiggling') {
          block.wiggleTime += 1

          // Wiggle for about 20 frames
          if (block.wiggleTime > 20) {
            block.phase = 'falling'
            // Update screen position for the portal using stored canvas position
            const rect = canvas.getBoundingClientRect()
            block.screenX = rect.left + x + window.scrollX
            block.screenY = rect.top + y + window.scrollY
            blocksToPortal.push({ ...block })
            return false // Remove from canvas-drawn blocks
          }

          // Draw wiggling block
          const wiggleX = Math.sin(block.wiggleTime * 0.8) * 3
          const wiggleRotation = Math.sin(block.wiggleTime * 0.6) * 0.1

          ctx.save()
          ctx.translate(x + wiggleX, y)
          ctx.rotate(wiggleRotation)

          ctx.fillStyle = 'rgba(139, 92, 246, 0.6)'
          ctx.fillRect(-blockSize / 2, -blockSize / 2, blockSize, blockSize)

          ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)'
          ctx.lineWidth = 1
          ctx.strokeRect(-blockSize / 2, -blockSize / 2, blockSize, blockSize)

          ctx.restore()
          return true
        }

        return true
      })

      // Move blocks to portal for full-page falling
      if (blocksToPortal.length > 0) {
        setFallingElements(prev => [...prev, ...blocksToPortal])
      }

      animationFrameId.current = requestAnimationFrame(draw)
    }

    animationFrameId.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  // Animate falling elements
  useEffect(() => {
    if (fallingElements.length === 0) return

    const animateFalling = () => {
      setFallingElements(prev => {
        const updated = prev.map(block => ({
          ...block,
          vy: block.vy + 0.5, // Gravity - starts slow, accelerates
          screenY: block.screenY + block.vy,
          rotation: block.rotation + block.rotationSpeed,
          opacity: block.opacity - 0.003
        })).filter(block =>
          block.screenY < window.innerHeight + 100 && block.opacity > 0
        )
        return updated
      })
    }

    const intervalId = setInterval(animateFalling, 16)
    return () => clearInterval(intervalId)
  }, [fallingElements.length > 0])

  const blockSize = gridSpacingRef.current * 0.9

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />
      {typeof window !== 'undefined' && createPortal(
        <>
          {fallingElements.map((block, i) => (
            <div
              key={`${block.col}-${block.row}-${i}`}
              className="pointer-events-none"
              style={{
                position: 'fixed',
                left: block.screenX - blockSize / 2,
                top: block.screenY - blockSize / 2,
                width: blockSize,
                height: blockSize,
                backgroundColor: `rgba(139, 92, 246, ${block.opacity * 0.6})`,
                border: `1px solid rgba(139, 92, 246, ${block.opacity * 0.8})`,
                transform: `rotate(${block.rotation}rad)`,
                zIndex: 9999,
              }}
            />
          ))}
        </>,
        document.body
      )}
    </>
  )
}
