'use client'

import { useEffect, useRef } from 'react'

export function ProjectsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const gridOpacity = useRef<Map<string, number>>(new Map())
  const time = useRef(0)

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

    const gridSize = 40 // Size of grid squares

    // Draw blueprint-style grid
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Cyan grid lines with low opacity
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)'
      ctx.lineWidth = 0.5

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const key = `v${x}`

        // Some sections fade in/out over time
        const fadePhase = Math.sin(time.current * 0.0005 + x * 0.01)
        let opacity = 0.12 + (fadePhase * 0.08)

        // Store and update opacity
        if (!gridOpacity.current.has(key)) {
          gridOpacity.current.set(key, opacity)
        } else {
          const currentOpacity = gridOpacity.current.get(key)!
          // Smooth transition
          opacity = currentOpacity + (opacity - currentOpacity) * 0.05
          gridOpacity.current.set(key, opacity)
        }

        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const key = `h${y}`

        const fadePhase = Math.sin(time.current * 0.0005 + y * 0.01)
        let opacity = 0.12 + (fadePhase * 0.08)

        if (!gridOpacity.current.has(key)) {
          gridOpacity.current.set(key, opacity)
        } else {
          const currentOpacity = gridOpacity.current.get(key)!
          opacity = currentOpacity + (opacity - currentOpacity) * 0.05
          gridOpacity.current.set(key, opacity)
        }

        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw subtle corner marks at grid intersections (blueprint style)
      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)'
      for (let x = gridSize; x < canvas.width; x += gridSize * 2) {
        for (let y = gridSize; y < canvas.height; y += gridSize * 2) {
          const markPhase = Math.sin(time.current * 0.0003 + x * 0.005 + y * 0.005)
          const size = 1 + (markPhase * 0.5)

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      time.current += 1
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
