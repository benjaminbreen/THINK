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

    // Define constellation points with branches
    interface Point {
      x: number
      y: number
      baseX: number
      baseY: number
      isBranch?: boolean
      parentIndex?: number
      branchPhase?: number
    }

    const points: Point[] = []
    const numMainPoints = 12

    // Initialize main points across the top area
    for (let i = 0; i < numMainPoints; i++) {
      const x = (i * 120) + 50
      const y = 30 + Math.random() * 60
      points.push({
        x,
        y,
        baseX: x,
        baseY: y
      })
    }

    // Add branch points that extend downward from some main points
    for (let i = 0; i < numMainPoints; i++) {
      // 40% chance to have a branch
      if (Math.random() < 0.4) {
        const parent = points[i]
        const branchCount = 1 + Math.floor(Math.random() * 2) // 1-2 branches per parent

        for (let b = 0; b < branchCount; b++) {
          const branchX = parent.baseX + (Math.random() - 0.5) * 60
          const branchY = parent.baseY + 40 + Math.random() * 100
          points.push({
            x: branchX,
            y: branchY,
            baseX: branchX,
            baseY: branchY,
            isBranch: true,
            parentIndex: i,
            branchPhase: Math.random() * Math.PI * 2
          })
        }
      }
    }

    // Draw constellation threads with branches
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Use indigo color
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)'
      ctx.fillStyle = 'rgba(99, 102, 241, 0.4)'
      ctx.lineWidth = 1
      ctx.lineCap = 'round'

      // Update point positions with gentle drift
      points.forEach((point, i) => {
        if (point.isBranch) {
          // Branches have more vertical movement
          const driftX = Math.sin(offset.current * 0.015 + (point.branchPhase || 0)) * 4
          const driftY = Math.sin(offset.current * 0.012 + (point.branchPhase || 0)) * 6
          point.x = point.baseX + driftX - offset.current
          point.y = point.baseY + driftY
        } else {
          // Main points have gentle drift
          const driftX = Math.sin(offset.current * 0.01 + i * 0.5) * 3
          const driftY = Math.cos(offset.current * 0.01 + i * 0.3) * 2
          point.x = point.baseX + driftX - offset.current
          point.y = point.baseY + driftY
        }
      })

      // Draw branch connections first (parent to branch)
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)'
      points.forEach((point, i) => {
        if (point.isBranch && point.parentIndex !== undefined) {
          const parent = points[point.parentIndex]

          ctx.beginPath()
          // Draw organic curved path from parent to branch
          const controlX = (parent.x + point.x) / 2 + Math.sin(offset.current * 0.02 + i) * 10
          const controlY = (parent.y + point.y) / 2 + Math.cos(offset.current * 0.02 + i) * 5
          ctx.moveTo(parent.x, parent.y)
          ctx.quadraticCurveTo(controlX, controlY, point.x, point.y)
          ctx.stroke()
        }
      })

      // Draw connecting lines between nearby main points
      for (let i = 0; i < numMainPoints; i++) {
        for (let j = i + 1; j < numMainPoints; j++) {
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

      // Draw connecting lines between nearby branch points
      const branchPoints = points.filter(p => p.isBranch)
      for (let i = 0; i < branchPoints.length; i++) {
        for (let j = i + 1; j < branchPoints.length; j++) {
          const p1 = branchPoints[i]
          const p2 = branchPoints[j]
          const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))

          // Only connect nearby branches
          if (distance < 120) {
            const opacity = 0.2 * (1 - distance / 120)
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Draw dots at each point (larger for main points)
      ctx.fillStyle = 'rgba(99, 102, 241, 0.4)'
      points.forEach(point => {
        ctx.beginPath()
        const radius = point.isBranch ? 1.5 : 2
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Slowly move the pattern from right to left
      offset.current += 0.2
      if (offset.current > 120) {
        // Reset positions
        points.forEach((point, i) => {
          if (!point.isBranch) {
            point.baseX = (i * 120) + 50
          }
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
