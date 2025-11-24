'use client'

import { useEffect, useRef, useState } from 'react'

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
  grounded: boolean
  autoRevealed?: boolean
  revealProgress: number // 0 to 1 for smooth fade-in animation
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

interface PedagogyBackgroundProps {
  isHovered?: boolean
  tags?: string[]
}

export function PedagogyBackground({ isHovered = false, tags = [] }: PedagogyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blocks = useRef<Block[]>([])
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number | undefined>(undefined)
  const mousePos = useRef({ x: 0, y: 0 })
  const lastSpawnTime = useRef(-5000) // Delay first spawn by 5 seconds

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
          vy: Math.sin(angle) * speed - 2, // Initial upward velocity
          life: 1,
          maxLife: 60 + Math.random() * 30,
          size: 2 + Math.random() * 3
        })
      }
    }

    // Spawn new blocks periodically
    const spawnBlock = (time: number) => {
      if (time - lastSpawnTime.current > 2000 && tags.length > 0) { // Every 2 seconds
        const tag = tags[Math.floor(Math.random() * tags.length)]
        blocks.current.push({
          x: Math.random() * canvas.width,
          y: -30,
          vx: (Math.random() - 0.5) * 0.2,
          vy: 0.2 + Math.random() * 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          size: 20 + Math.random() * 10,
          tag,
          destroyed: false,
          grounded: false,
          revealProgress: 0
        })
        lastSpawnTime.current = time
      }
    }

    // Check collision with other blocks
    const checkCollision = (block: Block, otherBlock: Block): boolean => {
      const dx = block.x - otherBlock.x
      const dy = block.y - otherBlock.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      return distance < (block.size + otherBlock.size) / 2
    }

    // Animation loop
    const animate = (time: number) => {
      // Clear canvas with transparent fill
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Auto-reveal all non-destroyed blocks on hover with smooth transition
      blocks.current.forEach(block => {
        if (!block.destroyed) {
          block.autoRevealed = isHovered
          // Smooth fade in/out over 300ms (at 60fps, that's 18 frames)
          const fadeSpeed = 1 / 18
          if (isHovered && block.revealProgress < 1) {
            block.revealProgress = Math.min(1, block.revealProgress + fadeSpeed)
          } else if (!isHovered && block.revealProgress > 0) {
            block.revealProgress = Math.max(0, block.revealProgress - fadeSpeed)
          }
        }
      })

      spawnBlock(time)

      const gravity = 0.15
      const bounce = 0.6 // Bounce coefficient (springiness)
      const blockBounce = 0.3 // Reduced bounce for block-to-block collisions

      // Update and draw blocks
      blocks.current = blocks.current.filter(block => {
        // Remove destroyed blocks after 10 seconds
        if (block.destroyed && block.destroyedTime && Date.now() - block.destroyedTime > 10000) {
          return false
        }

        // Skip physics and drawing for destroyed blocks, but keep them for text display
        if (block.destroyed) return true

        if (!block.grounded) {
          // Apply physics
          block.vy += gravity
          block.x += block.vx
          block.y += block.vy
          block.rotation += block.rotationSpeed

          // Cap rotation speed to prevent rapid spinning
          const maxRotationSpeed = 0.05
          block.rotationSpeed = Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, block.rotationSpeed))

          // Bounce off sides with energy loss
          if (block.x - block.size / 2 < 0) {
            block.x = block.size / 2
            block.vx *= -0.5
          }
          if (block.x + block.size / 2 > canvas.width) {
            block.x = canvas.width - block.size / 2
            block.vx *= -0.5
          }

          // Check ground collision with bounce
          if (block.y + block.size / 2 >= canvas.height) {
            block.y = canvas.height - block.size / 2

            // Bounce if velocity is high enough, otherwise settle
            if (Math.abs(block.vy) > 1.5) {
              block.vy *= -bounce // Bounce with energy loss
              block.vx *= 0.85
            } else {
              // Settling - snap to flat side
              block.vy = 0
              block.vx *= 0.5 // Strong horizontal damping when settling
              block.grounded = true
              block.rotationSpeed = 0
              // Snap to nearest 90-degree angle for flat landing
              block.rotation = Math.round(block.rotation / (Math.PI / 2)) * (Math.PI / 2)
            }
          }

          // Check collision with other grounded blocks
          blocks.current.forEach(otherBlock => {
            if (otherBlock !== block && otherBlock.grounded && !block.grounded) {
              if (checkCollision(block, otherBlock)) {
                // Stack on top with reduced bounce
                const overlap = (block.size + otherBlock.size) / 2 - Math.sqrt(
                  Math.pow(block.x - otherBlock.x, 2) + Math.pow(block.y - otherBlock.y, 2)
                )
                if (overlap > 0 && block.y < otherBlock.y) {
                  block.y = otherBlock.y - (block.size + otherBlock.size) / 2

                  // Bounce off other blocks with reduced energy
                  if (Math.abs(block.vy) > 1.5) {
                    block.vy *= -blockBounce // Much less bouncy on block collisions
                    block.vx *= 0.7 // More horizontal damping
                  } else {
                    // Settling on another block - snap to flat side
                    block.vy = 0
                    block.vx *= 0.3 // Strong horizontal damping to prevent shifting
                    block.grounded = true
                    block.rotationSpeed = 0
                    // Snap to nearest 90-degree angle for stable stacking
                    block.rotation = Math.round(block.rotation / (Math.PI / 2)) * (Math.PI / 2)
                  }
                }
              }
            }
          })
        } else {
          // Apply strong friction to grounded blocks to prevent shifting
          block.vx *= 0.85
          block.x += block.vx
          // Stop completely when velocity is very small
          if (Math.abs(block.vx) < 0.01) {
            block.vx = 0
          }
        }

        // Draw block with opacity based on reveal progress
        const blockOpacity = 1 - block.revealProgress
        if (blockOpacity > 0) {
          ctx.save()
          ctx.translate(block.x, block.y)
          ctx.rotate(block.rotation)

          // Purple (pedagogy accent color) with dynamic opacity
          const blockColor = `rgba(139, 92, 246, ${0.8 * blockOpacity})`
          const borderColor = `rgba(139, 92, 246, ${blockOpacity})`

          ctx.fillStyle = blockColor
          ctx.fillRect(-block.size / 2, -block.size / 2, block.size, block.size)

          // Border
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 2
          ctx.strokeRect(-block.size / 2, -block.size / 2, block.size, block.size)

          ctx.restore()
        }

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

      // Draw revealed tags (from destroyed or auto-revealed blocks)
      ctx.font = 'bold 18px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Show tags for destroyed blocks (last 8) and all auto-revealed blocks
      const destroyedTags = blocks.current
        .filter(b => b.destroyed)
        .slice(-8)

      const autoRevealedTags = blocks.current
        .filter(b => b.revealProgress > 0 && !b.destroyed)

      const allRevealedTags = [...destroyedTags, ...autoRevealedTags]

      allRevealedTags.forEach((block) => {
        // Use smooth reveal progress for auto-revealed, instant for destroyed
        const fadeIn = block.destroyedTime
          ? Math.min(1, (Date.now() - block.destroyedTime) / 1000)
          : block.revealProgress

        if (fadeIn > 0) {
          // Draw text with a subtle shadow for better visibility
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
          ctx.shadowBlur = 4
          ctx.fillStyle = `rgba(139, 92, 246, ${fadeIn})`
          ctx.fillText(block.tag, block.x, block.y)
          ctx.shadowBlur = 0
        }
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
  }, [isHovered, tags])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.4 }}
    />
  )
}
