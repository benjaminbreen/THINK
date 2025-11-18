'use client'

import { useEffect, useRef, useState } from 'react'

type BackgroundMode = 'ascii' | 'matrix' | 'particles'

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<BackgroundMode>('ascii')
  const mousePos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | undefined>(undefined)

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

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    // ASCII Grid Effect
    const drawAsciiGrid = (time: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const chars = ['0', '1', '+', '-', '*', '/', '=', '<', '>', '~', '^', '.', ':', ';']
      const gridSize = 30
      const cols = Math.ceil(canvas.width / gridSize)
      const rows = Math.ceil(canvas.height / gridSize)

      ctx.font = '12px monospace'

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize
          const y = j * gridSize

          // Calculate distance from mouse
          const dx = mousePos.current.x - x
          const dy = mousePos.current.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Opacity based on distance and time
          const opacity = Math.max(0, 1 - distance / 200) * 0.6
          const timeOffset = (i + j + time * 0.001) % chars.length
          const char = chars[Math.floor(timeOffset)]

          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
          ctx.fillText(char, x, y)
        }
      }
    }

    // Matrix Rain Effect
    const matrixColumns = Math.floor(canvas.width / 20)
    const matrixDrops: number[] = Array(matrixColumns).fill(0)

    const drawMatrix = (time: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#3b82f6'
      ctx.font = '15px monospace'

      const chars = '01アイウエオカキクケコサシスセソタチツテト'

      for (let i = 0; i < matrixDrops.length; i++) {
        // Add mouse influence
        const columnX = i * 20
        const dx = mousePos.current.x - columnX
        const influence = Math.max(0, 1 - Math.abs(dx) / 200)

        const text = chars[Math.floor(Math.random() * chars.length)]
        const opacity = 0.3 + influence * 0.5

        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.fillText(text, i * 20, matrixDrops[i] * 20)

        // Reset drop to top randomly or when it goes off screen
        if (matrixDrops[i] * 20 > canvas.height && Math.random() > 0.975) {
          matrixDrops[i] = 0
        }

        // Slow down/speed up based on mouse proximity
        matrixDrops[i] += 0.5 + influence * 0.5
      }
    }

    // Particle Field Effect
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        })
      }
    }
    initParticles()

    const drawParticles = (time: number) => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        // Mouse interaction
        const dx = mousePos.current.x - particle.x
        const dy = mousePos.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx += (dx / distance) * force * 0.1
          particle.vy += (dy / distance) * force * 0.1
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Damping
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        const opacity = Math.min(0.8, 0.3 + (Math.abs(particle.vx) + Math.abs(particle.vy)) * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i === j) return
          const dx2 = particle.x - otherParticle.x
          const dy2 = particle.y - otherParticle.y
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (dist < 100) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - dist / 100) * 0.2})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })
    }

    // Animation loop
    let lastTime = 0
    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      if (mode === 'ascii') {
        drawAsciiGrid(time)
      } else if (mode === 'matrix') {
        drawMatrix(time)
      } else if (mode === 'particles') {
        drawParticles(time)
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [mode])

  const cycleMode = () => {
    setMode((current) => {
      if (current === 'ascii') return 'matrix'
      if (current === 'matrix') return 'particles'
      return 'ascii'
    })
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={cycleMode}
      className="absolute inset-0 w-full h-full cursor-pointer"
      style={{ opacity: 0.4 }}
    />
  )
}
