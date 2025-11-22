'use client'

import { useEffect, useRef, useState } from 'react'

// Default pedagogy tags - will be replaced with real tags later
const PEDAGOGY_TAGS = [
  'Critical Thinking',
  'Active Learning',
  'Student Agency',
  'Collaborative',
  'Inquiry-Based',
  'Experiential',
  'Socratic Method',
  'Project-Based',
  'Scaffolding',
  'Metacognition'
]

interface Block {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  tag: string
  destroyed: boolean
  destroyedTime?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

export function PedagogyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blocks = useRef<Block[]>([])
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number | undefined>(undefined)
  const mousePos = useRef({ x: 0, y: 0 })
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

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    // Click handler - destroy blocks and create particles
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Check if click hit any blocks
      blocks.current.forEach(block => {
        if (block.destroyed) return

        const dx = clickX - block.x
        const dy = clickY - block.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < block.size) {
          // Destroy block and create particle explosion
          block.destroyed = true
          block.destroyedTime = Date.now()
          createParticleExplosion(block.x, block.y, block.tag)
        }
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    // Create particle explosion
    const createParticleExplosion = (x: number, y: number, tag: string) => {
      // Create 20-30 particles
      const particleCount = 20 + Math.random() * 10
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5
        const speed = 2 + Math.random() * 3
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 60 + Math.random() * 30,
          size: 2 + Math.random() * 3
        })
      }
    }

    // Spawn new blocks periodically
    const spawnBlock = (time: number) => {
      if (time - lastSpawnTime.current > 2000) { // Every 2 seconds
        const tag = PEDAGOGY_TAGS[Math.floor(Math.random() * PEDAGOGY_TAGS.length)]
        blocks.current.push({
          x: Math.random() * canvas.width,
          y: -30,
          vx: (Math.random() - 0.5) * 0.5,
          vy: 0.5 + Math.random() * 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          size: 20 + Math.random() * 10,
          tag,
          destroyed: false
        })
        lastSpawnTime.current = time
      }
    }

    // Animation loop
    const animate = (time: number) => {
      // Clear canvas with transparent fill
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      spawnBlock(time)

      // Update and draw blocks
      blocks.current = blocks.current.filter(block => {
        if (block.destroyed) return false
        if (block.y > canvas.height + 50) return false

        // Update position
        block.x += block.vx
        block.y += block.vy
        block.rotation += block.rotationSpeed

        // Bounce off sides
        if (block.x < block.size || block.x > canvas.width - block.size) {
          block.vx *= -1
        }

        // Draw block (maze-style blue block)
        ctx.save()
        ctx.translate(block.x, block.y)
        ctx.rotate(block.rotation)

        // Blue maze block
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)'
        ctx.fillRect(-block.size / 2, -block.size / 2, block.size, block.size)

        // Border
        ctx.strokeStyle = 'rgba(59, 130, 246, 1)'
        ctx.lineWidth = 2
        ctx.strokeRect(-block.size / 2, -block.size / 2, block.size, block.size)

        ctx.restore()

        return true
      })

      // Update and draw particles
      particles.current = particles.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.1 // Gravity
        particle.vx *= 0.99 // Air resistance
        particle.vy *= 0.99
        particle.life++

        if (particle.life >= particle.maxLife) return false

        const alpha = 1 - (particle.life / particle.maxLife)

        // Violet particles (pedagogy accent color)
        ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

      // Draw revealed tags (from destroyed blocks)
      ctx.font = 'bold 18px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Keep track of revealed tags
      const revealedTags = blocks.current
        .filter(b => b.destroyed)
        .slice(-8) // Keep last 8 revealed tags

      revealedTags.forEach((block, i) => {
        const fadeIn = block.destroyedTime ? Math.min(1, (Date.now() - block.destroyedTime) / 1000) : 1

        // Draw text with a subtle shadow for better visibility
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        ctx.shadowBlur = 4
        ctx.fillStyle = `rgba(139, 92, 246, ${fadeIn})`
        ctx.fillText(block.tag, block.x, block.y)
        ctx.shadowBlur = 0
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  )
}
