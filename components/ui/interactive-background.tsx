'use client'

import { useEffect, useRef, useState } from 'react'

type BackgroundMode = 'ascii' | 'matrix' | 'particles' | 'terminal' | 'waves' | 'constellation'

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<BackgroundMode>('ascii')
  const mousePos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | undefined>(undefined)

  // Terminal state
  const terminalInput = useRef('')
  const terminalHistory = useRef<string[]>([
    '> Welcome to THINK terminal',
    '> Type "help" for commands',
    ''
  ])
  const terminalCursorBlink = useRef(0)

  // Wave state
  const waves = useRef<Array<{ x: number; y: number; radius: number; maxRadius: number }>>([])

  // Constellation state (easter egg)
  const stars = useRef<Array<{ x: number; y: number; size: number; twinkle: number }>>([])
  const konamiCode = useRef<string[]>([])
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight']
  const secretWord = useRef('')
  const easterEggActive = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Reinitialize stars when resizing
      if (mode === 'constellation') {
        initStars()
      }
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

    // Mouse click handler for waves
    const handleMouseClick = (e: MouseEvent) => {
      if (mode === 'waves') {
        const rect = canvas.getBoundingClientRect()
        waves.current.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          radius: 0,
          maxRadius: 200
        })
      }
    }
    canvas.addEventListener('click', handleMouseClick)

    // Keyboard handler for terminal and easter eggs
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode === 'terminal') {
        e.preventDefault()

        if (e.key === 'Enter') {
          const command = terminalInput.current.trim()
          terminalHistory.current.push(`> ${command}`)

          // Process command
          const response = processCommand(command)
          terminalHistory.current.push(response)
          terminalHistory.current.push('')

          // Keep history limited
          if (terminalHistory.current.length > 20) {
            terminalHistory.current = terminalHistory.current.slice(-20)
          }

          terminalInput.current = ''
        } else if (e.key === 'Backspace') {
          terminalInput.current = terminalInput.current.slice(0, -1)
        } else if (e.key.length === 1) {
          terminalInput.current += e.key
        }
      } else if (mode === 'constellation') {
        // Konami code check
        konamiCode.current.push(e.key)
        if (konamiCode.current.length > konamiSequence.length) {
          konamiCode.current.shift()
        }

        if (JSON.stringify(konamiCode.current) === JSON.stringify(konamiSequence)) {
          easterEggActive.current = !easterEggActive.current
          konamiCode.current = []
        }

        // Secret word "THINK"
        if (e.key.length === 1) {
          secretWord.current += e.key.toLowerCase()
          if (secretWord.current.length > 5) {
            secretWord.current = secretWord.current.slice(-5)
          }
          if (secretWord.current === 'think') {
            easterEggActive.current = true
            secretWord.current = ''
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // Terminal command processor
    const processCommand = (cmd: string): string => {
      const lower = cmd.toLowerCase()

      if (lower === 'help') {
        return 'Commands: help, about, projects, clear, time, joke'
      } else if (lower === 'about') {
        return 'THINK: AI tools for humanities research & teaching'
      } else if (lower === 'projects') {
        return 'HistoryLens, Young Darwin, Apothecary Simulator...'
      } else if (lower === 'clear') {
        terminalHistory.current = ['']
        return ''
      } else if (lower === 'time') {
        return `Current time: ${new Date().toLocaleTimeString()}`
      } else if (lower === 'joke') {
        const jokes = [
          'Why did the AI go to school? To improve its learning rate!',
          'What do you call a historian who uses AI? A digital archivist!',
          'How many historians does it take to build an AI? Just one with Claude Code!'
        ]
        return jokes[Math.floor(Math.random() * jokes.length)]
      } else if (cmd === '') {
        return ''
      } else {
        return `Command not found: ${cmd}. Type "help" for commands.`
      }
    }

    // Initialize stars for constellation
    const initStars = () => {
      stars.current = []
      for (let i = 0; i < 150; i++) {
        stars.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          twinkle: Math.random() * Math.PI * 2
        })
      }
    }

    // ASCII Grid Effect
    const drawAsciiGrid = (time: number) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.5)' // slate-900 with transparency
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

          const dx = mousePos.current.x - x
          const dy = mousePos.current.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

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
      ctx.fillStyle = 'rgba(15, 23, 42, 0.5)' // slate-900 with transparency
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '15px monospace'
      const chars = '01アイウエオカキクケコサシスセソタチツテト'

      for (let i = 0; i < matrixDrops.length; i++) {
        const columnX = i * 20
        const dx = mousePos.current.x - columnX
        const influence = Math.max(0, 1 - Math.abs(dx) / 200)

        const text = chars[Math.floor(Math.random() * chars.length)]
        const opacity = 0.3 + influence * 0.5

        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.fillText(text, i * 20, matrixDrops[i] * 20)

        if (matrixDrops[i] * 20 > canvas.height && Math.random() > 0.975) {
          matrixDrops[i] = 0
        }

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
      ctx.fillStyle = 'rgba(15, 23, 42, 0.5)' // slate-900 with transparency
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        const dx = mousePos.current.x - particle.x
        const dy = mousePos.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx += (dx / distance) * force * 0.1
          particle.vy += (dy / distance) * force * 0.1
        }

        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.99
        particle.vy *= 0.99

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        const opacity = Math.min(0.8, 0.3 + (Math.abs(particle.vx) + Math.abs(particle.vy)) * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

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

    // Terminal Effect
    const drawTerminal = (time: number) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)' // darker background for readability
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '14px monospace'
      ctx.fillStyle = 'rgba(59, 130, 246, 0.9)'

      const lineHeight = 20
      const startY = 30
      const padding = 20

      // Draw history
      terminalHistory.current.forEach((line, i) => {
        ctx.fillText(line, padding, startY + i * lineHeight)
      })

      // Draw current input with cursor
      const currentY = startY + terminalHistory.current.length * lineHeight
      const inputLine = `> ${terminalInput.current}`
      ctx.fillText(inputLine, padding, currentY)

      // Blinking cursor
      terminalCursorBlink.current = (terminalCursorBlink.current + 1) % 60
      if (terminalCursorBlink.current < 30) {
        const cursorX = padding + ctx.measureText(inputLine).width + 2
        ctx.fillRect(cursorX, currentY - 12, 8, 14)
      }

      // Hint text
      ctx.font = '12px monospace'
      ctx.fillStyle = 'rgba(59, 130, 246, 0.4)'
      ctx.fillText('Click background to cycle modes | Type and press Enter', padding, canvas.height - 20)
    }

    // Wave/Ripple Effect
    const drawWaves = (time: number) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.3)' // lighter fade for wave trails
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw waves
      waves.current = waves.current.filter(wave => {
        wave.radius += 2

        if (wave.radius > wave.maxRadius) {
          return false
        }

        const opacity = (1 - wave.radius / wave.maxRadius) * 0.6
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        ctx.stroke()

        return true
      })

      // Hint text
      ctx.font = '12px monospace'
      ctx.fillStyle = 'rgba(59, 130, 246, 0.6)'
      ctx.fillText('Click anywhere to create ripples', 20, canvas.height - 20)
    }

    // Constellation Effect (Easter Egg)
    const drawConstellation = (time: number) => {
      ctx.fillStyle = 'rgba(10, 15, 30, 0.5)' // very dark blue-black
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Initialize stars if needed
      if (stars.current.length === 0) {
        initStars()
      }

      // Draw and twinkle stars
      stars.current.forEach((star, i) => {
        star.twinkle += 0.05
        const twinkle = Math.sin(star.twinkle) * 0.5 + 0.5
        const opacity = 0.3 + twinkle * 0.4

        // Distance from mouse affects brightness
        const dx = mousePos.current.x - star.x
        const dy = mousePos.current.y - star.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const mouseInfluence = Math.max(0, 1 - distance / 150) * 0.3

        ctx.fillStyle = `rgba(147, 197, 253, ${opacity + mouseInfluence})` // blue-300
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections for nearby stars
        if (easterEggActive.current) {
          stars.current.forEach((otherStar, j) => {
            if (i >= j) return
            const dx2 = star.x - otherStar.x
            const dy2 = star.y - otherStar.y
            const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2)

            if (dist < 100) {
              ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - dist / 100) * 0.3})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(star.x, star.y)
              ctx.lineTo(otherStar.x, otherStar.y)
              ctx.stroke()
            }
          })
        }
      })

      // Easter egg activated message
      if (easterEggActive.current) {
        ctx.font = 'bold 24px monospace'
        ctx.fillStyle = 'rgba(59, 130, 246, 0.9)'
        const text = '★ CONSTELLATION REVEALED ★'
        const textWidth = ctx.measureText(text).width
        ctx.fillText(text, (canvas.width - textWidth) / 2, 40)
      }

      // Hint text
      ctx.font = '12px monospace'
      ctx.fillStyle = 'rgba(147, 197, 253, 0.4)'
      ctx.fillText('Try typing "THINK" or the Konami code...', 20, canvas.height - 20)
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
      } else if (mode === 'terminal') {
        drawTerminal(time)
      } else if (mode === 'waves') {
        drawWaves(time)
      } else if (mode === 'constellation') {
        drawConstellation(time)
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleMouseClick)
      window.removeEventListener('keydown', handleKeyDown)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [mode])

  const cycleMode = () => {
    setMode((current) => {
      if (current === 'ascii') return 'matrix'
      if (current === 'matrix') return 'particles'
      if (current === 'particles') return 'terminal'
      if (current === 'terminal') return 'waves'
      if (current === 'waves') return 'constellation'
      return 'ascii'
    })

    // Reset terminal when leaving
    if (mode === 'terminal') {
      terminalInput.current = ''
      terminalHistory.current = [
        '> Welcome to THINK terminal',
        '> Type "help" for commands',
        ''
      ]
    }

    // Reset easter egg when leaving
    if (mode === 'constellation') {
      easterEggActive.current = false
      secretWord.current = ''
      konamiCode.current = []
    }
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
