'use client'

import { useEffect, useRef, useState } from 'react'

type BackgroundMode = 'ascii' | 'matrix' | 'particles' | 'terminal' | 'labyrinth' | 'bibliotheca'

// Get random starting mode
const getRandomMode = (): BackgroundMode => {
  const modes: BackgroundMode[] = ['ascii', 'matrix', 'particles', 'terminal', 'labyrinth', 'bibliotheca']
  return modes[Math.floor(Math.random() * modes.length)]
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<BackgroundMode>(getRandomMode())
  const mousePos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | undefined>(undefined)

  // Interactive controls state
  const [matrixPaused, setMatrixPaused] = useState(false)
  const [matrixColor, setMatrixColor] = useState<'blue' | 'green' | 'amber'>('blue')
  const [showWhitman, setShowWhitman] = useState(true)
  const [terminalExpanded, setTerminalExpanded] = useState(false)
  const [terminalColorScheme, setTerminalColorScheme] = useState<'blue' | 'green' | 'amber'>('blue')
  const [particleRainbow, setParticleRainbow] = useState(false)
  const [particlePaused, setParticlePaused] = useState(false)
  const [asciiPaused, setAsciiPaused] = useState(false)
  const [resetLabyrinth, setResetLabyrinth] = useState(false)
  const [refreshBooks, setRefreshBooks] = useState(false)

  // Terminal state
  const terminalInput = useRef('')
  const terminalHistory = useRef<string[]>([
    '> Welcome to THINK terminal',
    '> Type "help" for commands',
    ''
  ])
  const terminalCursorBlink = useRef(0)

  // Labyrinth state (Borges-themed maze)
  const labyrinth = useRef({
    playerX: 1,
    playerY: 1,
    maze: [] as number[][],
    collected: new Set<string>(),
    hasKey: false,
    hasBook: false,
    hasMirror: false,
    solved: false,
    message: 'Use arrow keys to navigate the Garden of Forking Paths...',
    messageTime: 0
  })

  // Bibliotheca state (Living Library)
  const books = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    rotation: number
    rotationSpeed: number
    type: 'book' | 'scroll' | 'manuscript'
    quote: string
    author: string
    open: boolean
    openProgress: number
    hovered: boolean
    size: number
  }>>([])
  const dustMotes = useRef<Array<{ x: number; y: number; vx: number; vy: number; opacity: number }>>([])

  // ASCII animation time reference for pause functionality
  const asciiTimeRef = useRef(0)

  // Humanistic quotes from across cultures and time
  const humanisticQuotes = [
    { text: "Know thyself", author: "Socrates" },
    { text: "The unexamined life is not worth living", author: "Socrates" },
    { text: "I think, therefore I am", author: "Descartes" },
    { text: "Man is the measure of all things", author: "Protagoras" },
    { text: "The only true wisdom is knowing you know nothing", author: "Socrates" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment", author: "Emerson" },
    { text: "What is truth?", author: "Pilate" },
    { text: "Do not go gentle into that good night", author: "Dylan Thomas" },
    { text: "I am large, I contain multitudes", author: "Whitman" },
    { text: "The past is never dead. It's not even past", author: "Faulkner" },
    { text: "In my beginning is my end", author: "Eliot" },
    { text: "Between the idea and the reality falls the shadow", author: "Eliot" },
    { text: "Hell is other people", author: "Sartre" },
    { text: "One must imagine Sisyphus happy", author: "Camus" },
    { text: "Esse est percipi - To be is to be perceived", author: "Berkeley" },
    { text: "The owl of Minerva spreads its wings only with the falling of dusk", author: "Hegel" },
    { text: "All that is solid melts into air", author: "Marx" },
    { text: "God is dead", author: "Nietzsche" },
    { text: "Become who you are", author: "Nietzsche" },
    { text: "The limits of my language mean the limits of my world", author: "Wittgenstein" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Reinitialize bibliotheca when resizing
      if (mode === 'bibliotheca' && books.current.length > 0) {
        // Clear books so they're reinitialized with new canvas dimensions
        books.current = []
        dustMotes.current = []
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

    // Mouse click handler (reserved for future use)
    const handleMouseClick = (e: MouseEvent) => {
      // Click to cycle modes handled in onClick prop
    }
    canvas.addEventListener('click', handleMouseClick)

    // Keyboard handler for terminal, labyrinth, and easter eggs
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
      } else if (mode === 'labyrinth') {
        e.preventDefault()
        const lab = labyrinth.current
        let newX = lab.playerX
        let newY = lab.playerY

        if (e.key === 'ArrowUp') newY--
        else if (e.key === 'ArrowDown') newY++
        else if (e.key === 'ArrowLeft') newX--
        else if (e.key === 'ArrowRight') newX++

        // Check if move is valid (not wall)
        if (lab.maze[newY] && lab.maze[newY][newX] !== 1) {
          lab.playerX = newX
          lab.playerY = newY

          // Check for items
          const pos = `${newX},${newY}`
          if (lab.maze[newY][newX] === 2 && !lab.collected.has(pos)) {
            lab.collected.add(pos)
            lab.hasBook = true
            lab.message = 'Found: A volume from the Library of Babel!'
            lab.messageTime = Date.now()
          } else if (lab.maze[newY][newX] === 3 && !lab.collected.has(pos)) {
            lab.collected.add(pos)
            lab.hasKey = true
            lab.message = 'Found: The Key to the Garden!'
            lab.messageTime = Date.now()
          } else if (lab.maze[newY][newX] === 4 && !lab.collected.has(pos)) {
            lab.collected.add(pos)
            lab.hasMirror = true
            lab.message = 'Found: The Mirror of Tlön!'
            lab.messageTime = Date.now()
          } else if (lab.maze[newY][newX] === 5) {
            // Exit - check if puzzle solved
            if (lab.hasBook && lab.hasKey && lab.hasMirror) {
              lab.solved = true
              lab.message = '★ You have escaped the Labyrinth! ★'
              lab.messageTime = Date.now()
            } else {
              lab.message = 'The exit is locked. Find all three artifacts...'
              lab.messageTime = Date.now()
            }
          }
        }
      }
      // Bibliotheca mode doesn't require keyboard input - mouse interaction only
    }
    window.addEventListener('keydown', handleKeyDown)

    // Terminal command processor with literary Easter eggs
    const processCommand = (cmd: string): string => {
      const lower = cmd.toLowerCase()

      if (lower === 'help') {
        return 'Commands: help, about, projects, clear, time, joke, authors, normal. Literary styles (transforms page!): hemingway, shakespeare, whitman, woolf, joyce, austen, cervantes, borges, james, wilde. More (text only): melville, dickinson, kafka, proust, dante, milton, chaucer, sappho, horace, catullus...'
      } else if (lower === 'about') {
        return 'THINK: AI tools for humanities research & teaching'
      } else if (lower === 'projects') {
        return 'HistoryLens, Young Darwin, Apothecary Simulator...'
      } else if (lower === 'clear') {
        terminalHistory.current = ['']
        return ''
      } else if (lower === 'time') {
        return `Current time: ${new Date().toLocaleTimeString()}`
      } else if (lower === 'date') {
        return `Current date: ${new Date().toLocaleDateString()}`
      } else if (lower === 'joke') {
        const jokes = [
          'Why did the AI go to school? To improve its learning rate!',
          'What do you call a historian who uses AI? A digital archivist!',
          'How many historians does it take to build an AI? Just one with Claude Code!'
        ]
        return jokes[Math.floor(Math.random() * jokes.length)]
      } else if (lower === 'authors') {
        return '★ Full text transformations: hemingway, shakespeare, whitman, woolf, joyce, austen, cervantes, borges, james, wilde. ★ Response only: melville, dickinson, kafka, proust, dante, milton, chaucer, sappho, horace, catullus. Type "normal" to restore.'
      } else if (lower === 'normal' || lower === 'reset' || lower === 'restore') {
        transformPageStyle('normal')
        return '★ Page restored to normal style'
      } else if (lower === 'hemingway') {
        transformPageStyle('hemingway')
        return '★ Page transformed to Hemingway style: short sentences, simple words, true things.'
      } else if (lower === 'shakespeare') {
        transformPageStyle('shakespeare')
        return '★ Page transformed to Shakespearean verse: what light through yonder webpage breaks!'
      } else if (lower === 'whitman') {
        transformPageStyle('whitman')
        return '★ I sing the page electric! The democratic vistas of the humanities!'
      } else if (lower === 'woolf') {
        transformPageStyle('woolf')
        return '★ Stream of consciousness activated—thoughts flowing like waves breaking...'
      } else if (lower === 'joyce') {
        transformPageStyle('joyce')
        return '★ Stately, plum modernist prose appears, bearing pages of possibility...'
      } else if (lower === 'austen') {
        transformPageStyle('austen')
        return '★ Page transformed: It is a truth universally acknowledged...'
      } else if (lower === 'cervantes') {
        transformPageStyle('cervantes')
        return '★ En un lugar de la web, de cuyo nombre no quiero acordarme...'
      } else if (lower === 'borges') {
        transformPageStyle('borges')
        return '★ The Library contains all possible pages, including this one...'
      } else if (lower === 'james' || lower === 'henry james') {
        transformPageStyle('james')
        return '★ A transformation of the most delicate complexity has been achieved...'
      } else if (lower === 'wilde') {
        transformPageStyle('wilde')
        return '★ I can resist everything except web design. This page is perfectly imperfect.'
      } else if (lower === 'melville') {
        transformPageStyle('melville')
        return '★ Call me digital. Some years ago—never mind how long precisely...'
      } else if (lower === 'dickinson') {
        transformPageStyle('dickinson')
        return '★ Tell all the truth but tell it slant— / The page too bright for our infirm delight'
      } else if (lower === 'kafka') {
        transformPageStyle('kafka')
        return '★ One morning, upon waking from anxious dreams, the page had transformed...'
      } else if (lower === 'proust') {
        transformPageStyle('proust')
        return '★ For a long time I browsed early. Sometimes, scarcely had the page loaded...'
      } else if (lower === 'dante') {
        transformPageStyle('dante')
        return '★ Nel mezzo del cammin of our website / Mi ritrovai per una selva oscura...'
      } else if (lower === 'milton') {
        transformPageStyle('milton')
        return '★ Of Mans First Disobedience of web standards, and the Fruit / Of that Forbidden Tree...'
      } else if (lower === 'chaucer') {
        transformPageStyle('chaucer')
        return '★ Whan that Aprill with his shoures soote / The droghte of March hath perced to the roote...'
      } else if (lower === 'sappho') {
        transformPageStyle('sappho')
        return '★ φαίνεταί μοι κῆνος / Some say the webpage is most beautiful...'
      } else if (lower === 'horace') {
        transformPageStyle('horace')
        return '★ Carpe diem! Seize the page! Ars longa, vita brevis.'
      } else if (lower === 'catullus') {
        transformPageStyle('catullus')
        return '★ Odi et amo this webpage. Why? You ask. I know not, but I feel it.'
      } else if (lower === 'history') {
        return 'The past is never dead. It\'s not even past. — Faulkner'
      } else if (lower === 'ai') {
        return 'AI is a tool, not a teacher. Use it wisely.'
      } else if (lower === 'think') {
        return '★ THINK: Tools for Historical INterpretation via Knowledge Engineering'
      } else if (lower === 'matrix') {
        return 'There is no spoon. Only prompts.'
      } else if (lower === 'labyrinth') {
        return 'Try the labyrinth mode—navigate Borges\' Garden of Forking Paths!'
      } else if (lower === 'echo') {
        return '...echo...echo...echo...'
      } else if (cmd === '') {
        return ''
      } else {
        return `Command not found: ${cmd}. Type "help" for commands.`
      }
    }

    // Transform page style (Easter egg - stores preference)
    const transformPageStyle = (style: string) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('THINK_textStyle', style)
          // Trigger custom event for page to respond
          window.dispatchEvent(new CustomEvent('THINK_styleChange', { detail: { style } }))
        } catch (e) {
          console.log('Style transformation activated:', style)
        }
      }
    }

    // Initialize labyrinth - Borges-themed maze
    const initLabyrinth = () => {
      // Create a maze using recursive backtracking
      const width = 25
      const height = 17
      const maze: number[][] = Array(height).fill(0).map(() => Array(width).fill(1))

      // Simple maze generation - create corridors
      const carve = (x: number, y: number) => {
        const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]].sort(() => Math.random() - 0.5)
        maze[y][x] = 0

        for (const [dx, dy] of dirs) {
          const nx = x + dx * 2
          const ny = y + dy * 2
          if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1 && maze[ny][nx] === 1) {
            maze[y + dy][x + dx] = 0
            carve(nx, ny)
          }
        }
      }

      carve(1, 1)

      // Place special items (Borges references)
      // 2 = Book (Library of Babel), 3 = Key, 4 = Mirror (Tlön), 5 = Exit
      let placed = 0
      while (placed < 3) {
        const x = Math.floor(Math.random() * (width - 2)) + 1
        const y = Math.floor(Math.random() * (height - 2)) + 1
        if (maze[y][x] === 0 && (x !== 1 || y !== 1)) {
          maze[y][x] = placed + 2
          placed++
        }
      }

      // Place exit
      maze[height - 2][width - 2] = 5

      labyrinth.current.maze = maze
      labyrinth.current.playerX = 1
      labyrinth.current.playerY = 1
      labyrinth.current.collected = new Set()
      labyrinth.current.hasKey = false
      labyrinth.current.hasBook = false
      labyrinth.current.hasMirror = false
      labyrinth.current.solved = false
      labyrinth.current.message = 'Navigate the Garden of Forking Paths... Find 3 artifacts to escape.'
      labyrinth.current.messageTime = Date.now()
    }

    // Initialize Bibliotheca - Living Library with floating books
    const initBibliotheca = () => {
      books.current = []
      dustMotes.current = []

      // Create floating books with humanistic quotes
      for (let i = 0; i < 15; i++) {
        const quote = humanisticQuotes[Math.floor(Math.random() * humanisticQuotes.length)]
        const types: Array<'book' | 'scroll' | 'manuscript'> = ['book', 'scroll', 'manuscript']
        books.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          type: types[Math.floor(Math.random() * types.length)],
          quote: quote.text,
          author: quote.author,
          open: false,
          openProgress: 0,
          hovered: false,
          size: 80 + Math.random() * 40,  // Much wider books for text readability
        })
      }

      // Create dust motes for atmosphere
      for (let i = 0; i < 50; i++) {
        dustMotes.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: Math.random() * 0.1 - 0.05,
          opacity: Math.random() * 0.3,
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

      // Update time only if not paused
      if (!asciiPaused) {
        asciiTimeRef.current = time
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize
          const y = j * gridSize

          const dx = mousePos.current.x - x
          const dy = mousePos.current.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          const opacity = Math.max(0, 1 - distance / 200) * 0.6
          const timeOffset = (i + j + asciiTimeRef.current * 0.001) % chars.length
          const char = chars[Math.floor(timeOffset)]

          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
          ctx.fillText(char, x, y)
        }
      }
    }

    // Matrix Rain Effect with Walt Whitman words
    const matrixColumns = Math.floor(canvas.width / 20)
    const matrixDrops: number[] = Array(matrixColumns).fill(0)

    // Walt Whitman vocabulary from "Leaves of Grass" and other poems
    const whitmanWords = [
      'I', 'sing', 'body', 'electric', 'soul', 'grass', 'leaves', 'self', 'song',
      'America', 'democratic', 'vistas', 'open', 'road', 'vast', 'free', 'wild',
      'ocean', 'stars', 'earth', 'mystic', 'barbaric', 'yawp', 'multitudes',
      'contain', 'contradict', 'atom', 'world', 'eternal', 'infinite', 'cosmos',
      'comrade', 'adhesive', 'love', 'death', 'life', 'joy', 'suffer', 'embrace',
      'night', 'day', 'light', 'dark', 'sun', 'moon', 'sea', 'shore', 'wave'
    ]

    const drawMatrix = (time: number) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.5)' // slate-900 with transparency
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '15px monospace'
      const binaryChars = '01アイウエオカキクケコサシスセソタチツテト'

      // Color based on setting
      const colorMap = {
        blue: '59, 130, 246',
        green: '34, 197, 94',
        amber: '217, 119, 6'
      }
      const matrixRgb = colorMap[matrixColor]

      // Calculate speed based on cursor Y position
      // Top of screen (y=0): slow (0.15)
      // Bottom of screen (y=canvas.height): fast (1.0)
      const cursorHeightRatio = Math.max(0, Math.min(1, mousePos.current.y / canvas.height))
      const baseSpeed = matrixPaused ? 0 : 0.15 + (cursorHeightRatio * 0.85) // Range from 0.15 to 1.0

      for (let i = 0; i < matrixDrops.length; i++) {
        const columnX = i * 20
        const dx = mousePos.current.x - columnX
        const influence = Math.max(0, 1 - Math.abs(dx) / 200)

        // 50% Whitman words, 50% traditional matrix characters
        let text: string
        if (showWhitman && Math.random() > 0.5) {
          text = whitmanWords[Math.floor(Math.random() * whitmanWords.length)]
        } else {
          text = binaryChars[Math.floor(Math.random() * binaryChars.length)]
        }

        // Occasional character glitch
        const glitch = Math.random() > 0.98
        const opacity = glitch ? 1 : 0.3 + influence * 0.5

        ctx.fillStyle = `rgba(${matrixRgb}, ${opacity})`

        // Glitch effect - random horizontal offset
        const glitchOffset = glitch ? (Math.random() - 0.5) * 10 : 0
        ctx.fillText(text, i * 20 + glitchOffset, matrixDrops[i] * 20)

        if (matrixDrops[i] * 20 > canvas.height && Math.random() > 0.975) {
          matrixDrops[i] = 0
        }

        // Speed controlled by cursor Y position + horizontal influence
        if (!matrixPaused) {
          matrixDrops[i] += baseSpeed + (influence * 0.3)
        }
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
        if (!particlePaused) {
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
        }

        const opacity = Math.min(0.8, 0.3 + (Math.abs(particle.vx) + Math.abs(particle.vy)) * 2)

        // Rainbow mode: cycle through hues based on position
        let color = '59, 130, 246' // default blue
        if (particleRainbow) {
          const hue = ((particle.x + particle.y + time * 0.05) % 360)
          const rgb = hslToRgb(hue / 360, 0.7, 0.6)
          color = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`
        }

        ctx.fillStyle = `rgba(${color}, ${opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particles.forEach((otherParticle, j) => {
          if (i === j) return
          const dx2 = particle.x - otherParticle.x
          const dy2 = particle.y - otherParticle.y
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (dist < 100) {
            ctx.strokeStyle = `rgba(${color}, ${(1 - dist / 100) * 0.2})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })
    }

    // Helper function to convert HSL to RGB
    const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
      let r, g, b
      if (s === 0) {
        r = g = b = l
      } else {
        const hue2rgb = (p: number, q: number, t: number) => {
          if (t < 0) t += 1
          if (t > 1) t -= 1
          if (t < 1/6) return p + (q - p) * 6 * t
          if (t < 1/2) return q
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
          return p
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1/3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1/3)
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
    }

    // Terminal Effect
    const drawTerminal = (time: number) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)' // darker background for readability
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '14px monospace'

      // Terminal color based on setting
      const terminalColorMap = {
        blue: '59, 130, 246',
        green: '34, 197, 94',
        amber: '217, 119, 6'
      }
      const terminalRgb = terminalColorMap[terminalColorScheme]
      ctx.fillStyle = `rgba(${terminalRgb}, 0.9)`

      const lineHeight = 20
      const startY = 30
      const padding = 20

      // Draw history
      terminalHistory.current.forEach((line: string, i: number) => {
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

      // CRT scanline effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      for (let y = 0; y < canvas.height; y += 3) {
        ctx.fillRect(0, y, canvas.width, 1)
      }

      // Subtle screen flicker
      if (Math.random() > 0.97) {
        ctx.fillStyle = `rgba(${terminalRgb}, ${0.02 + Math.random() * 0.03})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Hint text
      ctx.font = '12px monospace'
      ctx.fillStyle = `rgba(${terminalRgb}, 0.4)`
      ctx.fillText('Click background to cycle modes | Type and press Enter', padding, canvas.height - 20)
    }

    // Labyrinth/Maze Effect - Borges-themed
    const drawLabyrinth = (time: number) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)' // dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const lab = labyrinth.current

      // Initialize maze if needed or reset requested
      if (lab.maze.length === 0 || resetLabyrinth) {
        initLabyrinth()
        if (resetLabyrinth) setResetLabyrinth(false)
      }

      const cellSize = 25
      const offsetX = (canvas.width - lab.maze[0].length * cellSize) / 2
      const offsetY = (canvas.height - lab.maze.length * cellSize) / 2

      // Draw maze
      ctx.font = 'bold 16px monospace'
      for (let y = 0; y < lab.maze.length; y++) {
        for (let x = 0; x < lab.maze[y].length; x++) {
          const px = offsetX + x * cellSize
          const py = offsetY + y * cellSize
          const cell = lab.maze[y][x]

          if (cell === 1) {
            // Wall
            ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'
            ctx.fillRect(px, py, cellSize, cellSize)
            ctx.fillStyle = 'rgba(59, 130, 246, 0.6)'
            ctx.fillText('█', px + 5, py + 18)
          } else if (cell === 2 && !lab.collected.has(`${x},${y}`)) {
            // Book (Library of Babel)
            ctx.fillStyle = 'rgba(251, 191, 36, 0.8)' // amber
            ctx.fillText('📖', px + 4, py + 18)
          } else if (cell === 3 && !lab.collected.has(`${x},${y}`)) {
            // Key
            ctx.fillStyle = 'rgba(251, 191, 36, 0.8)' // amber
            ctx.fillText('🗝', px + 4, py + 18)
          } else if (cell === 4 && !lab.collected.has(`${x},${y}`)) {
            // Mirror (Tlön)
            ctx.fillStyle = 'rgba(147, 197, 253, 0.8)' // blue-300
            ctx.fillText('🪞', px + 4, py + 18)
          } else if (cell === 5) {
            // Exit
            const exitColor = lab.solved ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.7)'
            ctx.fillStyle = exitColor
            ctx.fillText('🚪', px + 4, py + 18)
          }
        }
      }

      // Draw player
      const playerPx = offsetX + lab.playerX * cellSize
      const playerPy = offsetY + lab.playerY * cellSize
      ctx.fillStyle = lab.solved ? 'rgba(34, 197, 94, 1)' : 'rgba(59, 130, 246, 1)'
      ctx.fillText('@', playerPx + 7, playerPy + 18)

      // Draw inventory
      ctx.font = '14px monospace'
      ctx.fillStyle = 'rgba(147, 197, 253, 0.9)'
      const inventoryY = 30
      ctx.fillText('Inventory:', 20, inventoryY)
      let invY = inventoryY + 20
      if (lab.hasBook) {
        ctx.fillText('📖 Library of Babel volume', 20, invY)
        invY += 18
      }
      if (lab.hasKey) {
        ctx.fillText('🗝 Garden Key', 20, invY)
        invY += 18
      }
      if (lab.hasMirror) {
        ctx.fillText('🪞 Mirror of Tlön', 20, invY)
        invY += 18
      }

      // Draw message
      if (Date.now() - lab.messageTime < 3000) {
        ctx.font = 'bold 14px monospace'
        ctx.fillStyle = 'rgba(251, 191, 36, 1)'
        const msgWidth = ctx.measureText(lab.message).width
        ctx.fillText(lab.message, (canvas.width - msgWidth) / 2, canvas.height - 60)
      }

      // Draw instructions
      ctx.font = '12px monospace'
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'
      ctx.fillText('Arrow keys to move | Find 3 artifacts to unlock exit | Click to change mode', 20, canvas.height - 20)

      // Victory message
      if (lab.solved) {
        ctx.font = 'bold 24px monospace'
        ctx.fillStyle = 'rgba(34, 197, 94, 1)'
        const victoryMsg = '★ THE LABYRINTH YIELDS ITS SECRETS ★'
        const victoryWidth = ctx.measureText(victoryMsg).width
        ctx.fillText(victoryMsg, (canvas.width - victoryWidth) / 2, 60)
      }
    }

    // Bibliotheca - Living Library with floating books and scrolls
    const drawBibliotheca = (time: number) => {
      // Deep library background with warm glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      )
      gradient.addColorStop(0, 'rgba(30, 20, 10, 0.95)')
      gradient.addColorStop(1, 'rgba(10, 5, 0, 0.98)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Initialize if needed or refresh requested
      if (books.current.length === 0 || refreshBooks) {
        initBibliotheca()
        if (refreshBooks) setRefreshBooks(false)
      }

      // Update and draw dust motes for atmosphere
      dustMotes.current.forEach((mote: { x: number; y: number; vx: number; vy: number; opacity: number }) => {
        mote.x += mote.vx
        mote.y += mote.vy

        if (mote.x < 0) mote.x = canvas.width
        if (mote.x > canvas.width) mote.x = 0
        if (mote.y < 0) mote.y = canvas.height
        if (mote.y > canvas.height) mote.y = 0

        ctx.fillStyle = `rgba(200, 180, 150, ${mote.opacity})`
        ctx.beginPath()
        ctx.arc(mote.x, mote.y, 1, 0, Math.PI * 2)
        ctx.fill()
      })

      // Update and draw books
      books.current.forEach((book: {
        x: number; y: number; vx: number; vy: number; rotation: number; rotationSpeed: number;
        type: 'book' | 'scroll' | 'manuscript'; quote: string; author: string; open: boolean;
        openProgress: number; hovered: boolean; size: number
      }) => {
        // Update position
        book.x += book.vx
        book.y += book.vy
        book.rotation += book.rotationSpeed

        // Wrap around edges
        if (book.x < -book.size) book.x = canvas.width + book.size
        if (book.x > canvas.width + book.size) book.x = -book.size
        if (book.y < -book.size) book.y = canvas.height + book.size
        if (book.y > canvas.height + book.size) book.y = -book.size

        // Check if mouse is hovering
        const dx = mousePos.current.x - book.x
        const dy = mousePos.current.y - book.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const wasHovered = book.hovered
        book.hovered = distance < book.size * 1.5

        // Animate opening/closing
        if (book.hovered) {
          book.openProgress = Math.min(1, book.openProgress + 0.05)
          if (!wasHovered && !book.open) {
            book.open = true
          }
        } else {
          book.openProgress = Math.max(0, book.openProgress - 0.03)
          if (book.openProgress === 0) {
            book.open = false
          }
        }

        ctx.save()
        ctx.translate(book.x, book.y)
        ctx.rotate(book.rotation * (1 - book.openProgress * 0.8))

        // Draw book/scroll/manuscript
        if (book.type === 'book') {
          // Book spine
          const baseOpacity = 0.6 + book.openProgress * 0.3
          ctx.fillStyle = `rgba(139, 92, 46, ${baseOpacity})` // Brown leather
          ctx.fillRect(-book.size / 2, -book.size / 2, book.size, book.size * 1.3)

          // Book pages opening
          if (book.openProgress > 0) {
            const pageSpread = book.size * book.openProgress
            ctx.fillStyle = `rgba(240, 230, 210, ${0.9 * book.openProgress})` // Aged paper
            ctx.fillRect(-pageSpread / 2, -book.size / 2, pageSpread, book.size * 1.3)

            // Draw quote on pages
            ctx.fillStyle = `rgba(50, 40, 30, ${book.openProgress})`
            ctx.font = `${10 + book.openProgress * 2}px serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            // Wrap text
            const words = book.quote.split(' ')
            let line = ''
            let y = -10
            words.forEach((word: string) => {
              const testLine = line + word + ' '
              if (ctx.measureText(testLine).width > pageSpread * 0.8 && line !== '') {
                ctx.fillText(line, 0, y)
                line = word + ' '
                y += 14
              } else {
                line = testLine
              }
            })
            ctx.fillText(line, 0, y)

            // Draw author
            ctx.font = `${8 + book.openProgress}px italic serif`
            ctx.fillText(`— ${book.author}`, 0, y + 20)
          }
        } else if (book.type === 'scroll') {
          // Scroll
          const scrollLength = book.size * (1 + book.openProgress * 2)
          ctx.fillStyle = `rgba(220, 200, 170, ${0.7 + book.openProgress * 0.2})`
          ctx.fillRect(-book.size / 4, -scrollLength / 2, book.size / 2, scrollLength)

          // Scroll ends
          ctx.fillStyle = `rgba(100, 70, 40, ${0.6})`
          ctx.fillRect(-book.size / 4 - 3, -scrollLength / 2 - 5, book.size / 2 + 6, 5)
          ctx.fillRect(-book.size / 4 - 3, scrollLength / 2, book.size / 2 + 6, 5)

          if (book.openProgress > 0.3) {
            ctx.fillStyle = `rgba(40, 30, 20, ${book.openProgress})`
            ctx.font = `${9}px serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            const words = book.quote.split(' ')
            let line = ''
            let y = -scrollLength / 4
            words.forEach((word: string) => {
              const testLine = line + word + ' '
              if (ctx.measureText(testLine).width > book.size * 0.4 && line !== '') {
                ctx.fillText(line, 0, y)
                line = word + ' '
                y += 12
              } else {
                line = testLine
              }
            })
            ctx.fillText(line, 0, y)
            ctx.font = `${7}px italic serif`
            ctx.fillText(`— ${book.author}`, 0, scrollLength / 4)
          }
        } else {
          // Manuscript pages
          ctx.fillStyle = `rgba(235, 220, 200, ${0.8 + book.openProgress * 0.15})`
          const pageWidth = book.size * (0.7 + book.openProgress * 0.6)
          ctx.fillRect(-pageWidth / 2, -book.size / 2, pageWidth, book.size * 1.2)

          // Ornate border
          ctx.strokeStyle = `rgba(150, 100, 50, ${0.5 + book.openProgress * 0.4})`
          ctx.lineWidth = 2
          ctx.strokeRect(-pageWidth / 2 + 5, -book.size / 2 + 5, pageWidth - 10, book.size * 1.2 - 10)

          if (book.openProgress > 0.2) {
            ctx.fillStyle = `rgba(40, 30, 20, ${book.openProgress})`
            ctx.font = `${10}px serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            const words = book.quote.split(' ')
            let line = ''
            let y = -book.size / 4
            words.forEach((word: string) => {
              const testLine = line + word + ' '
              if (ctx.measureText(testLine).width > pageWidth * 0.7 && line !== '') {
                ctx.fillText(line, 0, y)
                line = word + ' '
                y += 13
              } else {
                line = testLine
              }
            })
            ctx.fillText(line, 0, y)
            ctx.font = `${8}px italic serif`
            ctx.fillText(`— ${book.author}`, 0, y + 22)
          }
        }

        // Glow effect when hovered
        if (book.hovered) {
          ctx.shadowBlur = 20 * book.openProgress
          ctx.shadowColor = 'rgba(255, 220, 150, 0.8)'
        }

        ctx.restore()
      })

      // Draw title
      ctx.font = 'bold 16px serif'
      ctx.fillStyle = 'rgba(220, 200, 170, 0.7)'
      ctx.textAlign = 'left'
      ctx.fillText('✦ Bibliotheca Humanitatis ✦', 20, 30)

      // Hint text
      ctx.font = '12px serif'
      ctx.fillStyle = 'rgba(200, 180, 150, 0.5)'
      ctx.fillText('Hover over books to reveal wisdom from across the ages', 20, canvas.height - 20)
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
      } else if (mode === 'labyrinth') {
        drawLabyrinth(time)
      } else if (mode === 'bibliotheca') {
        drawBibliotheca(time)
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
    setMode((current: BackgroundMode) => {
      if (current === 'ascii') return 'matrix'
      if (current === 'matrix') return 'particles'
      if (current === 'particles') return 'terminal'
      if (current === 'terminal') return 'labyrinth'
      if (current === 'labyrinth') return 'bibliotheca'
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

    // Reset labyrinth when leaving
    if (mode === 'labyrinth') {
      labyrinth.current.maze = []
      labyrinth.current.collected = new Set()
      labyrinth.current.hasKey = false
      labyrinth.current.hasBook = false
      labyrinth.current.hasMirror = false
      labyrinth.current.solved = false
    }

    // Reset bibliotheca when leaving
    if (mode === 'bibliotheca') {
      books.current = []
      dustMotes.current = []
    }
  }

  const renderControls = () => {
    const buttonClass = "px-3 py-1.5 text-xs rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white"

    return (
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
        {mode === 'matrix' && (
          <div className="flex flex-col gap-1.5 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10">
            <button onClick={(e) => { e.stopPropagation(); setMatrixPaused(!matrixPaused); }} className={buttonClass}>
              {matrixPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button onClick={(e) => { e.stopPropagation(); setMatrixColor(matrixColor === 'blue' ? 'green' : matrixColor === 'green' ? 'amber' : 'blue'); }} className={buttonClass}>
              Color: {matrixColor}
            </button>
            <button onClick={(e) => { e.stopPropagation(); setShowWhitman(!showWhitman); }} className={buttonClass}>
              Whitman: {showWhitman ? 'On' : 'Off'}
            </button>
          </div>
        )}

        {mode === 'terminal' && (
          <div className="flex flex-col gap-1.5 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10">
            <button onClick={(e) => { e.stopPropagation(); setTerminalColorScheme(terminalColorScheme === 'blue' ? 'green' : terminalColorScheme === 'green' ? 'amber' : 'blue'); }} className={buttonClass}>
              Color: {terminalColorScheme}
            </button>
            <button onClick={(e) => { e.stopPropagation(); terminalHistory.current = ['']; }} className={buttonClass}>
              Clear
            </button>
            <button onClick={(e) => { e.stopPropagation(); setTerminalExpanded(!terminalExpanded); }} className={buttonClass}>
              {terminalExpanded ? '↙ Minimize' : '↗ Expand'}
            </button>
          </div>
        )}

        {mode === 'particles' && (
          <div className="flex flex-col gap-1.5 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10">
            <button onClick={(e) => { e.stopPropagation(); setParticlePaused(!particlePaused); }} className={buttonClass}>
              {particlePaused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button onClick={(e) => { e.stopPropagation(); setParticleRainbow(!particleRainbow); }} className={buttonClass}>
              Rainbow: {particleRainbow ? 'On' : 'Off'}
            </button>
          </div>
        )}

        {mode === 'ascii' && (
          <div className="flex flex-col gap-1.5 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10">
            <button onClick={(e) => { e.stopPropagation(); setAsciiPaused(!asciiPaused); }} className={buttonClass}>
              {asciiPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
          </div>
        )}

        {mode === 'labyrinth' && (
          <div className="flex flex-col gap-1.5 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10">
            <button onClick={(e) => { e.stopPropagation(); setResetLabyrinth(true); }} className={buttonClass}>
              Reset Maze
            </button>
          </div>
        )}

        {mode === 'bibliotheca' && (
          <div className="flex flex-col gap-1.5 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10">
            <button onClick={(e) => { e.stopPropagation(); setRefreshBooks(true); }} className={buttonClass}>
              Refresh Books
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas
        ref={canvasRef}
        onClick={cycleMode}
        className="absolute inset-0 w-full h-full cursor-pointer pointer-events-auto"
        style={{ opacity: 0.6 }}
      />
      {renderControls()}
    </div>
  )
}
