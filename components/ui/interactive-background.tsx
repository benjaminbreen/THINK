'use client'

import { useEffect, useRef, useState, memo } from 'react'

type BackgroundMode = 'ascii' | 'matrix' | 'particles' | 'terminal' | 'labyrinth' | 'bibliotheca' | 'blocks'

// Get random starting mode
const getRandomMode = (): BackgroundMode => {
  const modes: BackgroundMode[] = ['ascii', 'matrix', 'particles', 'terminal', 'labyrinth', 'bibliotheca', 'blocks']
  return modes[Math.floor(Math.random() * modes.length)]
}

// Light mode color palettes
const lightColors = {
  background: 'rgba(253, 251, 247, 0.4)', // Warm cream with transparency
  backgroundSolid: 'rgb(253, 251, 247)',
  primary: '180, 83, 9', // Amber-700
  primaryLight: '217, 119, 6', // Amber-600
  secondary: '146, 64, 14', // Amber-800
  accent: '120, 53, 15', // Amber-900
  muted: '161, 98, 7', // Amber-700
  text: '41, 37, 36', // Stone-800
  sage: '22, 101, 52', // Green-800
  terracotta: '185, 28, 28', // Red-700
}

// Dark mode color palettes (original)
const darkColors = {
  background: 'rgba(15, 23, 42, 0.5)',
  backgroundSolid: 'rgb(15, 23, 42)',
  primary: '59, 130, 246', // Blue
  primaryLight: '96, 165, 250',
  secondary: '34, 197, 94', // Green
  accent: '217, 119, 6', // Amber
  muted: '100, 116, 139',
  text: '226, 232, 240',
  sage: '34, 197, 94',
  terracotta: '239, 68, 68',
}

// Check if we're in dark mode - checks multiple sources synchronously
const checkIsDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false

  // Check the document class first (most reliable after hydration)
  if (document.documentElement.classList.contains('dark')) return true

  // Check localStorage (set by our inline script)
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') return true
    if (stored === 'light') return false
  } catch {}

  // Fall back to system preference
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return true

  return false
}

function InteractiveBackgroundComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<BackgroundMode>(getRandomMode())
  // Start with null to indicate "not yet determined" - prevents flash
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | undefined>(undefined)

  // Initialize theme on mount (client-side only) and watch for changes
  useEffect(() => {
    // Set initial theme from client-side detection
    setIsDarkMode(checkIsDarkMode())

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Get current color palette based on dark mode
  const colors = isDarkMode ? darkColors : lightColors

  // Interactive controls state - using refs for real-time updates without re-render
  const matrixPaused = useRef(false)
  const matrixColor = useRef<'blue' | 'green' | 'amber'>('amber')
  const showWhitman = useRef(true)
  const terminalExpanded = useRef(false)
  const terminalColorScheme = useRef<'blue' | 'green' | 'amber'>('amber')
  const labyrinthExpanded = useRef(false)
  const particleRainbow = useRef(false)
  const particlePaused = useRef(false)
  const asciiPaused = useRef(false)
  const resetLabyrinth = useRef(false)
  const refreshBooks = useRef(false)

  // Force re-render for control UI updates
  const [, forceUpdate] = useState(0)

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

  // Matrix animation state for pause functionality
  const matrixChars = useRef<string[]>([])
  const matrixLastChange = useRef<number[]>([])

  // Blocks mode state
  const fallingBlocks = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    rotation: number
    rotationSpeed: number
    size: number
    word: string
    destroyed: boolean
    destroyedTime?: number
  }>>([])
  const blockParticles = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
    size: number
  }>>([])
  const lastBlockSpawn = useRef(0)
  const popAllBlocks = useRef(false)
  const popTime = useRef(0)

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
    { text: "We live in time; it holds us and molds us", author: "Arendt" },
    { text: "The world is everything that is the case", author: "Wittgenstein" },
    { text: "Whereof one cannot speak, thereof one must be silent", author: "Wittgenstein" },
    { text: "To philosophize is to learn how to die", author: "Montaigne" },
    { text: "I am a human being; nothing human is alien to me", author: "Terence" },
    { text: "The life which is unexamined is not worth living", author: "Plato" },
    { text: "We are such stuff as dreams are made on", author: "Shakespeare" },
    { text: "What's past is prologue", author: "Shakespeare" },
    { text: "This above all: to thine own self be true", author: "Shakespeare" },
    { text: "The fault, dear Brutus, is not in our stars, but in ourselves", author: "Shakespeare" },
    { text: "Nothing will come of nothing", author: "Shakespeare" },
    { text: "Time is out of joint", author: "Shakespeare" },
    { text: "All the world's a stage, and all the men and women merely players", author: "Shakespeare" },
    { text: "The rest is silence", author: "Shakespeare" },
    { text: "We know what we are, but know not what we may be", author: "Shakespeare" },
    { text: "There are more things in heaven and earth than are dreamt of in your philosophy", author: "Shakespeare" },
    { text: "In the destructive element immerse", author: "Conrad" },
    { text: "The horror! The horror!", author: "Conrad" },
    { text: "April is the cruellest month", author: "Eliot" },
    { text: "We shall not cease from exploration", author: "Eliot" },
    { text: "This is the way the world ends: not with a bang but a whimper", author: "Eliot" },
    { text: "I have measured out my life with coffee spoons", author: "Eliot" },
    { text: "Do I dare disturb the universe?", author: "Eliot" },
    { text: "In the room the women come and go, talking of Michelangelo", author: "Eliot" },
    { text: "The centre cannot hold", author: "Yeats" },
    { text: "And what rough beast, its hour come round at last, slouches towards Bethlehem to be born?", author: "Yeats" },
    { text: "Tread softly because you tread on my dreams", author: "Yeats" },
    { text: "How can we know the dancer from the dance?", author: "Yeats" },
    { text: "Things fall apart", author: "Yeats" },
    { text: "Whatever you can do or dream you can, begin it", author: "Goethe" },
    { text: "The eternal feminine draws us onward", author: "Goethe" },
    { text: "In the beginning was the deed", author: "Goethe" },
    { text: "Two souls, alas, are dwelling in my breast", author: "Goethe" },
    { text: "More light!", author: "Goethe" },
    { text: "Beauty is truth, truth beauty", author: "Keats" },
    { text: "A thing of beauty is a joy forever", author: "Keats" },
    { text: "Here lies one whose name was writ in water", author: "Keats" },
    { text: "Call me Ishmael", author: "Melville" },
    { text: "Better to sleep with a sober cannibal than a drunk Christian", author: "Melville" },
    { text: "I would prefer not to", author: "Melville" },
    { text: "From hell's heart I stab at thee", author: "Melville" },
    { text: "Tell all the truth but tell it slant", author: "Dickinson" },
    { text: "Hope is the thing with feathers", author: "Dickinson" },
    { text: "Because I could not stop for Death, He kindly stopped for me", author: "Dickinson" },
    { text: "I'm Nobody! Who are you?", author: "Dickinson" },
    { text: "The Soul selects her own Society", author: "Dickinson" },
    { text: "After great pain, a formal feeling comes", author: "Dickinson" },
    { text: "I dwell in Possibility", author: "Dickinson" },
  ]

  useEffect(() => {
    // Don't run animation until theme is determined
    if (isDarkMode === null) return

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

    // Mouse click handler
    const handleMouseClick = (e: MouseEvent) => {
      if (mode === 'blocks') {
        const rect = canvas.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const clickY = e.clientY - rect.top

        // Check if click hit any blocks
        fallingBlocks.current.forEach(block => {
          if (block.destroyed) return

          const dx = clickX - block.x
          const dy = clickY - block.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < block.size) {
            // Destroy block and create particle explosion
            block.destroyed = true
            block.destroyedTime = Date.now()

            // Create particle explosion
            const particleCount = 20 + Math.random() * 10
            for (let i = 0; i < particleCount; i++) {
              const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5
              const speed = 2 + Math.random() * 3
              blockParticles.current.push({
                x: block.x,
                y: block.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                life: 1,
                maxLife: 60 + Math.random() * 30,
                size: 2 + Math.random() * 3
              })
            }
          }
        })
      }
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

      // ESC key to close expanded modes
      if (e.key === 'Escape') {
        if (terminalExpanded.current || labyrinthExpanded.current) {
          e.preventDefault()
          terminalExpanded.current = false
          labyrinthExpanded.current = false
          forceUpdate(n => n + 1)
        }
      }
      // Bibliotheca mode doesn't require keyboard input - mouse interaction only
    }
    window.addEventListener('keydown', handleKeyDown)

    // Terminal command processor with literary Easter eggs
    const processCommand = (cmd: string): string => {
      const lower = cmd.toLowerCase()

      // Navigation commands (work when expanded)
      if (lower.startsWith('goto ') || lower.startsWith('cd ')) {
        const path = lower.split(' ')[1]
        if (path === '/projects' || path === 'projects') {
          if (typeof window !== 'undefined') window.location.href = '/projects'
          return '→ Navigating to /projects...'
        } else if (path === '/about' || path === 'about') {
          if (typeof window !== 'undefined') window.location.href = '/about'
          return '→ Navigating to /about...'
        } else if (path === '/resources' || path === 'resources') {
          if (typeof window !== 'undefined') window.location.href = '/resources'
          return '→ Navigating to /resources...'
        } else if (path === '/guides' || path === 'guides') {
          if (typeof window !== 'undefined') window.location.href = '/#guides'
          return '→ Navigating to /guides...'
        } else if (path === '/pedagogy' || path === 'pedagogy') {
          if (typeof window !== 'undefined') window.location.href = '/pedagogy'
          return '→ Navigating to /pedagogy...'
        } else if (path === '/blog' || path === 'blog') {
          if (typeof window !== 'undefined') window.location.href = '/blog'
          return '→ Navigating to /blog...'
        } else if (path === '/team' || path === 'team') {
          if (typeof window !== 'undefined') window.location.href = '/team'
          return '→ Navigating to /team...'
        } else if (path === '/' || path === 'home') {
          if (typeof window !== 'undefined') window.location.href = '/'
          return '→ Navigating to home...'
        } else {
          return `Error: Path not found: ${path}. Try 'ls' to see available pages.`
        }
      } else if (lower === 'ls' || lower === 'dir') {
        return 'Available pages:\n  /          (home)\n  /projects  (AI projects)\n  /about     (about THINK)\n  /resources (learning resources)\n  /guides    (how-to guides)\n  /pedagogy  (teaching philosophy)\n  /blog      (updates)\n  /team      (team members)\n\nUse: goto <page> or cd <page>'
      } else if (lower === 'help') {
        return 'Commands: help, ls, goto <page>, cd <page>, about, projects, clear, time, joke, authors, normal.\nLiterary styles: hemingway, shakespeare, whitman, woolf, joyce, austen, cervantes, borges, james, wilde.\nMore: melville, dickinson, kafka, proust, dante, milton, chaucer, sappho, horace, catullus'
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
      // Create a maze using recursive backtracking - narrower maze
      const width = 17  // Reduced from 25
      const height = 13 // Reduced from 17
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
      // Light mode: warm cream background, Dark mode: slate
      const bgColor = isDarkMode ? 'rgba(15, 23, 42, 0.5)' : 'rgba(253, 251, 247, 0.6)'
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const chars = ['0', '1', '+', '-', '*', '/', '=', '<', '>', '~', '^', '.', ':', ';']
      const gridSize = 30
      const cols = Math.ceil(canvas.width / gridSize)
      const rows = Math.ceil(canvas.height / gridSize)

      ctx.font = '12px monospace'

      // Update time only if not paused
      if (!asciiPaused.current) {
        asciiTimeRef.current = time
      }

      // Light mode: amber/terracotta tones, Dark mode: blue
      const primaryRgb = isDarkMode ? '59, 130, 246' : '180, 83, 9'

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

          ctx.fillStyle = `rgba(${primaryRgb}, ${opacity})`
          ctx.fillText(char, x, y)
        }
      }
    }

    // Matrix Rain Effect with Walt Whitman words
    const matrixColumns = Math.floor(canvas.width / 20)
    const matrixDrops: number[] = Array(matrixColumns).fill(0)

    // Initialize matrix state arrays if not already initialized
    if (matrixChars.current.length === 0) {
      matrixChars.current = Array(matrixColumns).fill('')
      matrixLastChange.current = Array(matrixColumns).fill(0)
    }

    // Walt Whitman vocabulary from "Leaves of Grass" and other poems
    const whitmanWords = [
      'I', 'sing', 'body', 'electric', 'soul', 'grass', 'leaves', 'self', 'song',
      'America', 'democratic', 'vistas', 'open', 'road', 'vast', 'free', 'wild',
      'ocean', 'stars', 'earth', 'mystic', 'barbaric', 'yawp', 'multitudes',
      'contain', 'contradict', 'atom', 'world', 'eternal', 'infinite', 'cosmos',
      'comrade', 'adhesive', 'love', 'death', 'life', 'joy', 'suffer', 'embrace',
      'night', 'day', 'light', 'dark', 'sun', 'moon', 'sea', 'shore', 'wave',
      'celebrate', 'myself', 'loafe', 'observe', 'spear', 'summer', 'blood', 'born',
      'nature', 'woods', 'houses', 'perfume', 'atmosphere', 'distillation', 'creeds',
      'pass', 'float', 'drift', 'lace', 'look', 'lean', 'ease', 'invite', 'harbor',
      'origin', 'form', 'unspeakable', 'tongue', 'air', 'respiration', 'inspiration',
      'urge', 'merge', 'converge', 'perpetual', 'journey', 'untrodden', 'paths', 'free',
      'strong', 'delicious', 'unloosened', 'cleave', 'sufficient', 'possess', 'days',
      'Manhattan', 'Paumanok', 'shores', 'chant', 'lilac', 'dooryard', 'bloomed', 'star',
      'western', 'fallen', 'drooping', 'powerful', 'Lincoln', 'coffin', 'passes', 'through',
      'lustrous', 'dropt', 'hermit', 'thrush', 'solitary', 'carol', 'bleeding', 'throat',
      'knowledge', 'death', 'thought', 'sacred', 'sane', 'sisters', 'twain', 'must',
      'voyage', 'O', 'soul', 'not', 'for', 'trades', 'merchandise', 'venture', 'seek',
      'untried', 'ports', 'steer', 'seas', 'God', 'reckless', 'daring', 'joyous', 'O',
      'passage', 'India', 'more', 'than', 'India', 'passage', 'you', 'rondure', 'swimming',
      'space', 'purpose', 'vast', 'man', 'attained', 'span', 'nameless', 'oceans', 'pent',
      'fierce', 'old', 'mother', 'endlessly', 'crying', 'recklessly', 'venturous', 'boy',
      'blow', 'bugle', 'tonight', 'sound', 'notes', 'bugles', 'trills', 'buglers', 'sleeping',
      'wakened', 'arise', 'form', 'ranks', 'captain', 'my', 'fearful', 'trip', 'done',
      'ship', 'weathered', 'every', 'rack', 'prize', 'won', 'port', 'near', 'bells',
      'flag', 'flung', 'people', 'exulting', 'grim', 'daring', 'vessel', 'steady', 'keel',
      'arm', 'beneath', 'head', 'dream', 'pulse', 'heart', 'fell', 'cold', 'dead',
      'O', 'risen', 'hear', 'rise', 'bugle', 'flag', 'you', 'ankles', 'ribbons', 'bouquets',
      'shores', 'crowded', 'they', 'call', 'swaying', 'mass', 'eager', 'faces', 'turning',
      'bleeding', 'drops', 'red', 'where', 'deck', 'lies', 'fallen', 'lips', 'pale', 'still',
      'walk', 'firmament', 'walk', 'tread', 'measureless', 'light', 'processions', 'poets',
      'you', 'occult', 'convolutions', 'you', 'fluid', 'diffusing', 'threads', 'subtle',
      'electric', 'currents', 'baths', 'air', 'divine', 'chants', 'liturgies', 'hymns',
      'priests', 'temples', 'Kosmos', 'mighty', 'Manhattan', 'turbulent', 'fleshy', 'sensual',
      'eating', 'drinking', 'breeding', 'maternal', 'paternal', 'filial', 'caresser', 'sleep',
      'I', 'wander', 'pause', 'silent', 'thought', 'myths', 'fables', 'divine', 'allegories',
    ]

    const drawMatrix = (time: number) => {
      // Light mode: warm cream, Dark mode: slate
      const bgColor = isDarkMode ? 'rgba(15, 23, 42, 0.5)' : 'rgba(253, 251, 247, 0.6)'
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '15px monospace'
      const binaryChars = '01アイウエオカキクケコサシスセソタチツテト'

      // Color based on setting - adjusted for light/dark mode
      const colorMap = isDarkMode
        ? { blue: '59, 130, 246', green: '34, 197, 94', amber: '217, 119, 6' }
        : { blue: '30, 64, 175', green: '22, 101, 52', amber: '146, 64, 14' }
      const matrixRgb = colorMap[matrixColor.current]

      // Calculate speed based on cursor Y position - SLOWED DOWN
      // Top of screen (y=0): barely moving (0.005)
      // Bottom of screen (y=canvas.height): slow-moderate speed (0.15)
      const cursorHeightRatio = Math.max(0, Math.min(1, mousePos.current.y / canvas.height))
      const baseSpeed = matrixPaused.current ? 0 : 0.005 + (cursorHeightRatio * 0.145) // Range from 0.005 to 0.15 (slowed)

      // Character change interval based on cursor position (slower overall)
      const changeInterval = matrixPaused.current ? Infinity : 200 + (1 - cursorHeightRatio) * 600 // 200-800ms (slower)

      for (let i = 0; i < matrixDrops.length; i++) {
        const columnX = i * 20
        const dx = mousePos.current.x - columnX
        const influence = Math.max(0, 1 - Math.abs(dx) / 200)

        // Only change character if not paused and enough time has passed
        if (!matrixPaused.current && (time - matrixLastChange.current[i] > changeInterval)) {
          // 50% Whitman words, 50% traditional matrix characters
          if (showWhitman.current && Math.random() > 0.5) {
            matrixChars.current[i] = whitmanWords[Math.floor(Math.random() * whitmanWords.length)]
          } else {
            matrixChars.current[i] = binaryChars[Math.floor(Math.random() * binaryChars.length)]
          }
          matrixLastChange.current[i] = time
        }

        // Use stored character (or initialize if empty)
        let text = matrixChars.current[i]
        if (!text) {
          text = binaryChars[Math.floor(Math.random() * binaryChars.length)]
          matrixChars.current[i] = text
        }

        // Occasional character glitch (only when not paused)
        const glitch = !matrixPaused.current && Math.random() > 0.98
        const opacity = glitch ? 1 : 0.3 + influence * 0.5

        ctx.fillStyle = `rgba(${matrixRgb}, ${opacity})`

        // Glitch effect - random horizontal offset
        const glitchOffset = glitch ? (Math.random() - 0.5) * 10 : 0
        ctx.fillText(text, i * 20 + glitchOffset, matrixDrops[i] * 20)

        if (matrixDrops[i] * 20 > canvas.height && Math.random() > 0.975) {
          matrixDrops[i] = 0
        }

        // Speed controlled by cursor Y position + horizontal influence
        if (!matrixPaused.current) {
          matrixDrops[i] += baseSpeed + (influence * 0.15)
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
      // Light mode: warm cream, Dark mode: slate
      const bgColor = isDarkMode ? 'rgba(15, 23, 42, 0.5)' : 'rgba(253, 251, 247, 0.6)'
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Default particle color based on mode
      const defaultColor = isDarkMode ? '59, 130, 246' : '180, 83, 9'

      particles.forEach((particle, i) => {
        if (!particlePaused.current) {
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
        let color = defaultColor
        if (particleRainbow.current) {
          const hue = ((particle.x + particle.y + time * 0.05) % 360)
          const lightness = isDarkMode ? 0.6 : 0.45
          const rgb = hslToRgb(hue / 360, 0.7, lightness)
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
      const isExpanded = terminalExpanded.current

      // Terminal color based on setting - adjusted for light/dark mode
      const terminalColorMap = isDarkMode
        ? { blue: '59, 130, 246', green: '34, 197, 94', amber: '217, 119, 6' }
        : { blue: '30, 64, 175', green: '22, 101, 52', amber: '146, 64, 14' }
      const terminalRgb = terminalColorMap[terminalColorScheme.current]

      // Background colors for light/dark mode
      const bgExpanded = isDarkMode ? 'rgba(5, 10, 20, 0.95)' : 'rgba(253, 251, 247, 0.95)'
      const bgNormal = isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(253, 251, 247, 0.85)'

      if (isExpanded) {
        // Expanded mode - full screen retro terminal
        ctx.fillStyle = bgExpanded
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Retro terminal border
        ctx.strokeStyle = `rgba(${terminalRgb}, 0.6)`
        ctx.lineWidth = 3
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

        // Inner glow
        ctx.strokeStyle = `rgba(${terminalRgb}, 0.3)`
        ctx.lineWidth = 1
        ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30)

        // Header
        ctx.font = 'bold 20px monospace'
        ctx.fillStyle = `rgba(${terminalRgb}, 1)`
        ctx.fillText('THINK TERMINAL v1.0', 30, 45)
        ctx.font = '12px monospace'
        ctx.fillStyle = `rgba(${terminalRgb}, 0.6)`
        ctx.fillText('Navigation System Online', 30, 65)

        // Draw a separator line
        ctx.strokeStyle = `rgba(${terminalRgb}, 0.4)`
        ctx.beginPath()
        ctx.moveTo(30, 75)
        ctx.lineTo(canvas.width - 30, 75)
        ctx.stroke()

        ctx.font = '14px monospace'
        ctx.fillStyle = `rgba(${terminalRgb}, 0.9)`

        const lineHeight = 20
        const startY = 100
        const padding = 30

        // Draw history with line wrapping for expanded view
        let currentY = startY
        terminalHistory.current.forEach((line: string) => {
          const lines = line.split('\n')
          lines.forEach((subLine: string) => {
            ctx.fillText(subLine, padding, currentY)
            currentY += lineHeight
          })
        })

        // Draw current input with cursor
        const inputLine = `> ${terminalInput.current}`
        ctx.fillText(inputLine, padding, currentY)

        // Blinking cursor
        terminalCursorBlink.current = (terminalCursorBlink.current + 1) % 60
        if (terminalCursorBlink.current < 30) {
          const cursorX = padding + ctx.measureText(inputLine).width + 2
          ctx.fillRect(cursorX, currentY - 12, 8, 14)
        }

        // Footer with instructions
        ctx.font = 'bold 12px monospace'
        ctx.fillStyle = `rgba(${terminalRgb}, 0.7)`
        const footer = '[ Type "ls" for navigation | "help" for commands | Click controls to minimize ]'
        const footerWidth = ctx.measureText(footer).width
        ctx.fillText(footer, (canvas.width - footerWidth) / 2, canvas.height - 30)

      } else {
        // Normal mode - standard terminal view
        ctx.fillStyle = bgNormal
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.font = '14px monospace'
        ctx.fillStyle = `rgba(${terminalRgb}, 0.9)`

        const lineHeight = 18
        const startY = 30
        const padding = 20
        const maxWidth = canvas.width - padding * 2 - 10

        // Helper to wrap text
        const wrapText = (text: string, maxW: number): string[] => {
          const words = text.split(' ')
          const lines: string[] = []
          let currentLine = ''
          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word
            if (ctx.measureText(testLine).width > maxW && currentLine) {
              lines.push(currentLine)
              currentLine = word
            } else {
              currentLine = testLine
            }
          }
          if (currentLine) lines.push(currentLine)
          return lines.length ? lines : ['']
        }

        // Draw history with text wrapping
        let currentY = startY
        terminalHistory.current.forEach((line: string) => {
          const wrappedLines = wrapText(line, maxWidth)
          wrappedLines.forEach((wrappedLine: string) => {
            ctx.fillText(wrappedLine, padding, currentY)
            currentY += lineHeight
          })
        })

        // Draw current input with cursor
        const inputLine = `> ${terminalInput.current}`
        ctx.fillText(inputLine, padding, currentY)

        // Blinking cursor
        terminalCursorBlink.current = (terminalCursorBlink.current + 1) % 60
        if (terminalCursorBlink.current < 30) {
          const cursorX = padding + ctx.measureText(inputLine).width + 2
          ctx.fillRect(cursorX, currentY - 12, 8, 14)
        }

        // Hint text
        ctx.font = '11px monospace'
        ctx.fillStyle = `rgba(${terminalRgb}, 0.4)`
        const hintText = 'Click to cycle modes | Type & Enter'
        ctx.fillText(hintText, padding, canvas.height - 20)
      }

      // CRT scanline effect (both modes) - very subtle
      const scanlineOpacity = isDarkMode ? 0.02 : 0.015
      ctx.fillStyle = `rgba(0, 0, 0, ${scanlineOpacity})`
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1)
      }

      // Very subtle screen flicker (reduced frequency and intensity)
      if (Math.random() > 0.995) {
        ctx.fillStyle = `rgba(${terminalRgb}, ${0.01 + Math.random() * 0.01})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    // Labyrinth/Maze Effect - Borges-themed
    const drawLabyrinth = (time: number) => {
      const isExpanded = labyrinthExpanded.current

      // Colors based on mode
      const wallColor = isDarkMode ? '59, 130, 246' : '146, 64, 14'
      const textColor = isDarkMode ? '147, 197, 253' : '120, 53, 15'
      const playerColor = isDarkMode ? '59, 130, 246' : '180, 83, 9'

      if (isExpanded) {
        // Expanded mode - background with subtle gradient
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width / 1.5
        )
        if (isDarkMode) {
          gradient.addColorStop(0, 'rgba(15, 23, 42, 0.98)')
          gradient.addColorStop(1, 'rgba(5, 10, 20, 1)')
        } else {
          gradient.addColorStop(0, 'rgba(253, 251, 247, 0.98)')
          gradient.addColorStop(1, 'rgba(245, 241, 232, 1)')
        }
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Border frame
        ctx.strokeStyle = `rgba(${wallColor}, 0.3)`
        ctx.lineWidth = 2
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)
      } else {
        const bgColor = isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(253, 251, 247, 0.85)'
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      const lab = labyrinth.current

      // Initialize maze if needed or reset requested
      if (lab.maze.length === 0 || resetLabyrinth.current) {
        initLabyrinth()
        if (resetLabyrinth.current) resetLabyrinth.current = false
      }

      const cellSize = 20 // Smaller cells for more compact maze
      // Shift maze to the right to avoid the glass pane overlay in light mode
      const mazeWidth = lab.maze[0].length * cellSize
      const baseOffsetX = (canvas.width - mazeWidth) / 2
      // In light mode (not expanded), shift right by 45% of canvas width to clear the glass pane
      const rightShift = (!isExpanded && !isDarkMode) ? canvas.width * 0.4 : 0
      const offsetX = Math.min(baseOffsetX + rightShift, canvas.width - mazeWidth - 10)
      const offsetY = (canvas.height - lab.maze.length * cellSize) / 2

      // Draw maze
      ctx.font = 'bold 13px monospace'
      for (let y = 0; y < lab.maze.length; y++) {
        for (let x = 0; x < lab.maze[y].length; x++) {
          const px = offsetX + x * cellSize
          const py = offsetY + y * cellSize
          const cell = lab.maze[y][x]

          if (cell === 1) {
            // Wall
            ctx.fillStyle = `rgba(${wallColor}, 0.3)`
            ctx.fillRect(px, py, cellSize, cellSize)
            ctx.fillStyle = `rgba(${wallColor}, 0.6)`
            ctx.fillText('█', px + 3, py + 15)
          } else if (cell === 2 && !lab.collected.has(`${x},${y}`)) {
            // Book (Library of Babel)
            ctx.fillStyle = 'rgba(251, 191, 36, 0.8)' // amber
            ctx.fillText('📖', px + 2, py + 15)
          } else if (cell === 3 && !lab.collected.has(`${x},${y}`)) {
            // Key
            ctx.fillStyle = 'rgba(251, 191, 36, 0.8)' // amber
            ctx.fillText('🗝', px + 2, py + 15)
          } else if (cell === 4 && !lab.collected.has(`${x},${y}`)) {
            // Mirror (Tlön)
            ctx.fillStyle = isDarkMode ? 'rgba(147, 197, 253, 0.8)' : 'rgba(30, 64, 175, 0.8)'
            ctx.fillText('🪞', px + 2, py + 15)
          } else if (cell === 5) {
            // Exit
            const exitColor = lab.solved ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.7)'
            ctx.fillStyle = exitColor
            ctx.fillText('🚪', px + 2, py + 15)
          }
        }
      }

      // Draw player
      const playerPx = offsetX + lab.playerX * cellSize
      const playerPy = offsetY + lab.playerY * cellSize
      ctx.fillStyle = lab.solved ? 'rgba(34, 197, 94, 1)' : `rgba(${playerColor}, 1)`
      ctx.fillText('@', playerPx + 5, playerPy + 15)

      // Draw inventory
      ctx.font = '14px monospace'
      ctx.fillStyle = `rgba(${textColor}, 0.9)`
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
        ctx.fillStyle = isDarkMode ? 'rgba(251, 191, 36, 1)' : 'rgba(180, 83, 9, 1)'
        const msgWidth = ctx.measureText(lab.message).width
        ctx.fillText(lab.message, (canvas.width - msgWidth) / 2, canvas.height - 60)
      }

      // Draw instructions
      ctx.font = '12px monospace'
      ctx.fillStyle = `rgba(${wallColor}, 0.5)`
      const instructions = isExpanded
        ? 'Arrow keys to move | Find 3 artifacts to unlock exit | ESC or close button to exit'
        : 'Arrow keys to move | Find 3 artifacts to unlock exit | Click to change mode'
      ctx.fillText(instructions, 20, canvas.height - 20)

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
      // Background with warm glow - adjusted for light/dark mode
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      )
      if (isDarkMode) {
        gradient.addColorStop(0, 'rgba(30, 20, 10, 0.95)')
        gradient.addColorStop(1, 'rgba(10, 5, 0, 0.98)')
      } else {
        gradient.addColorStop(0, 'rgba(253, 251, 247, 0.9)')
        gradient.addColorStop(1, 'rgba(245, 235, 220, 0.95)')
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Initialize if needed or refresh requested
      if (books.current.length === 0 || refreshBooks.current) {
        initBibliotheca()
        if (refreshBooks.current) refreshBooks.current = false
      }

      // Update and draw dust motes for atmosphere
      const dustColor = isDarkMode ? '200, 180, 150' : '160, 140, 100'
      dustMotes.current.forEach((mote: { x: number; y: number; vx: number; vy: number; opacity: number }) => {
        mote.x += mote.vx
        mote.y += mote.vy

        if (mote.x < 0) mote.x = canvas.width
        if (mote.x > canvas.width) mote.x = 0
        if (mote.y < 0) mote.y = canvas.height
        if (mote.y > canvas.height) mote.y = 0

        ctx.fillStyle = `rgba(${dustColor}, ${mote.opacity})`
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
      ctx.fillStyle = isDarkMode ? 'rgba(220, 200, 170, 0.7)' : 'rgba(120, 80, 40, 0.8)'
      ctx.textAlign = 'left'
      ctx.fillText('✦ Bibliotheca Humanitatis ✦', 20, 30)

      // Hint text
      ctx.font = '12px serif'
      ctx.fillStyle = isDarkMode ? 'rgba(200, 180, 150, 0.5)' : 'rgba(120, 80, 40, 0.5)'
      ctx.fillText('Hover over books to reveal wisdom from across the ages', 20, canvas.height - 20)
    }

    // Animation loop
    // Falling blocks mode with particle explosions
    const drawBlocks = (time: number) => {
      // Clear canvas with background
      const bgColor = isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(253, 251, 247, 0.85)'
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Block colors based on mode
      const blockColor = isDarkMode ? '59, 130, 246' : '180, 83, 9'

      // Handle pop all blocks action
      if (popAllBlocks.current) {
        fallingBlocks.current.forEach(block => {
          if (!block.destroyed) {
            block.destroyed = true
            block.destroyedTime = Date.now()

            // Create particle explosion for each block
            const particleCount = 20 + Math.random() * 10
            for (let i = 0; i < particleCount; i++) {
              const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5
              const speed = 2 + Math.random() * 3
              blockParticles.current.push({
                x: block.x,
                y: block.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                life: 1,
                maxLife: 60 + Math.random() * 30,
                size: 2 + Math.random() * 3
              })
            }
          }
        })
        popAllBlocks.current = false
      }

      // Reset after 20 seconds of popping
      if (popTime.current > 0 && Date.now() - popTime.current > 20000) {
        fallingBlocks.current = []
        blockParticles.current = []
        popTime.current = 0
        lastBlockSpawn.current = time
      }

      // Spawn new blocks - slower spawn rate
      if (time - lastBlockSpawn.current > 2500) {
        const word = humanisticQuotes[Math.floor(Math.random() * humanisticQuotes.length)].text.split(' ').slice(0, 2).join(' ')
        fallingBlocks.current.push({
          x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1, // Keep blocks in middle 80%
          y: -40,
          vx: (Math.random() - 0.5) * 0.15, // Slower horizontal drift
          vy: 0.25 + Math.random() * 0.15, // Slower fall speed
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005, // Slower rotation
          size: 28 + Math.random() * 12, // Slightly larger blocks
          word,
          destroyed: false
        })
        lastBlockSpawn.current = time
      }

      // Update and draw blocks
      fallingBlocks.current = fallingBlocks.current.filter(block => {
        // Remove destroyed blocks after 10 seconds
        if (block.destroyed && block.destroyedTime && Date.now() - block.destroyedTime > 10000) {
          return false
        }

        // Remove blocks that fell off screen (but only if not destroyed)
        if (!block.destroyed && block.y > canvas.height + 50) return false

        // Skip physics and drawing for destroyed blocks
        if (block.destroyed) return true

        // Update position
        block.x += block.vx
        block.y += block.vy
        block.rotation += block.rotationSpeed

        // Bounce off sides
        if (block.x < block.size || block.x > canvas.width - block.size) {
          block.vx *= -1
        }

        // Draw block - color based on mode
        ctx.save()
        ctx.translate(block.x, block.y)
        ctx.rotate(block.rotation)

        ctx.fillStyle = `rgba(${blockColor}, 0.7)`
        ctx.fillRect(-block.size / 2, -block.size / 2, block.size, block.size)

        // Border
        ctx.strokeStyle = `rgba(${blockColor}, 1)`
        ctx.lineWidth = 2
        ctx.strokeRect(-block.size / 2, -block.size / 2, block.size, block.size)

        ctx.restore()

        return true
      })

      // Update and draw particles
      const particleColor = isDarkMode ? '234, 179, 8' : '180, 83, 9'
      blockParticles.current = blockParticles.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.1 // Gravity
        particle.vx *= 0.99
        particle.vy *= 0.99
        particle.life++

        if (particle.life >= particle.maxLife) return false

        const alpha = 1 - (particle.life / particle.maxLife)

        ctx.fillStyle = `rgba(${particleColor}, ${alpha})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

      // Draw revealed words
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const revealedWords = fallingBlocks.current
        .filter(b => b.destroyed)
        .slice(-8)

      const wordColor = isDarkMode ? '234, 179, 8' : '146, 64, 14'
      revealedWords.forEach((block) => {
        const fadeIn = block.destroyedTime ? Math.min(1, (Date.now() - block.destroyedTime) / 1000) : 1

        ctx.shadowColor = isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'
        ctx.shadowBlur = 4
        ctx.fillStyle = `rgba(${wordColor}, ${fadeIn})`
        ctx.fillText(block.word, block.x, block.y)
        ctx.shadowBlur = 0
      })
    }

    let lastTime = 0

    const animate = (time: number) => {
      // Run at full 60fps for smooth animation
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
      } else if (mode === 'blocks') {
        drawBlocks(time)
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
  }, [mode, isDarkMode])

  const cycleMode = () => {
    setMode((current: BackgroundMode) => {
      if (current === 'ascii') return 'matrix'
      if (current === 'matrix') return 'particles'
      if (current === 'particles') return 'terminal'
      if (current === 'terminal') return 'labyrinth'
      if (current === 'labyrinth') return 'bibliotheca'
      if (current === 'bibliotheca') return 'blocks'
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
    // Adaptive button styling for light/dark mode
    const buttonClass = isDarkMode
      ? "px-3 py-1.5 text-xs rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white"
      : "px-3 py-1.5 text-xs rounded bg-amber-900/10 hover:bg-amber-900/20 backdrop-blur-sm border border-amber-900/20 transition-colors text-amber-900"

    const containerClass = isDarkMode
      ? "flex flex-col gap-1.5 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10"
      : "flex flex-col gap-1.5 bg-white/60 backdrop-blur-md rounded-lg p-2 border border-amber-200/50 shadow-sm"

    return (
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
        {mode === 'matrix' && (
          <div className={containerClass}>
            <button onClick={(e) => { e.stopPropagation(); matrixPaused.current = !matrixPaused.current; forceUpdate(n => n + 1); }} className={buttonClass}>
              {matrixPaused.current ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button onClick={(e) => { e.stopPropagation(); matrixColor.current = matrixColor.current === 'blue' ? 'green' : matrixColor.current === 'green' ? 'amber' : 'blue'; forceUpdate(n => n + 1); }} className={buttonClass}>
              Color: {matrixColor.current}
            </button>
            <button onClick={(e) => { e.stopPropagation(); showWhitman.current = !showWhitman.current; forceUpdate(n => n + 1); }} className={buttonClass}>
              Whitman: {showWhitman.current ? 'On' : 'Off'}
            </button>
          </div>
        )}

        {mode === 'terminal' && (
          <div className={containerClass}>
            <button onClick={(e) => { e.stopPropagation(); terminalColorScheme.current = terminalColorScheme.current === 'blue' ? 'green' : terminalColorScheme.current === 'green' ? 'amber' : 'blue'; forceUpdate(n => n + 1); }} className={buttonClass}>
              Color: {terminalColorScheme.current}
            </button>
            <button onClick={(e) => { e.stopPropagation(); terminalHistory.current = ['']; }} className={buttonClass}>
              Clear
            </button>
            <button onClick={(e) => { e.stopPropagation(); terminalExpanded.current = !terminalExpanded.current; forceUpdate(n => n + 1); }} className={buttonClass}>
              {terminalExpanded.current ? '↙ Minimize' : '↗ Expand'}
            </button>
          </div>
        )}

        {mode === 'particles' && (
          <div className={containerClass}>
            <button onClick={(e) => { e.stopPropagation(); particlePaused.current = !particlePaused.current; forceUpdate(n => n + 1); }} className={buttonClass}>
              {particlePaused.current ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button onClick={(e) => { e.stopPropagation(); particleRainbow.current = !particleRainbow.current; forceUpdate(n => n + 1); }} className={buttonClass}>
              Rainbow: {particleRainbow.current ? 'On' : 'Off'}
            </button>
          </div>
        )}

        {mode === 'ascii' && (
          <div className={containerClass}>
            <button onClick={(e) => { e.stopPropagation(); asciiPaused.current = !asciiPaused.current; forceUpdate(n => n + 1); }} className={buttonClass}>
              {asciiPaused.current ? '▶ Resume' : '⏸ Pause'}
            </button>
          </div>
        )}

        {mode === 'labyrinth' && (
          <div className={containerClass}>
            <button onClick={(e) => { e.stopPropagation(); labyrinthExpanded.current = !labyrinthExpanded.current; forceUpdate(n => n + 1); }} className={buttonClass}>
              {labyrinthExpanded.current ? '↙ Minimize' : '↗ Expand'}
            </button>
            <button onClick={(e) => { e.stopPropagation(); resetLabyrinth.current = true; }} className={buttonClass}>
              Reset Maze
            </button>
          </div>
        )}

        {mode === 'bibliotheca' && (
          <div className={containerClass}>
            <button onClick={(e) => { e.stopPropagation(); refreshBooks.current = true; }} className={buttonClass}>
              Refresh Books
            </button>
          </div>
        )}

        {mode === 'blocks' && (
          <div className={containerClass}>
            <button onClick={(e) => {
              e.stopPropagation();
              popAllBlocks.current = true;
              popTime.current = Date.now();
            }} className={buttonClass}>
              💥 Pop All
            </button>
          </div>
        )}
      </div>
    )
  }

  const isExpanded = terminalExpanded.current || labyrinthExpanded.current

  const closeExpanded = () => {
    terminalExpanded.current = false
    labyrinthExpanded.current = false
    forceUpdate(n => n + 1)
  }

  // Resize canvas when expanded state changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    // Initial size
    updateSize()

    // Update on resize
    const timer = setTimeout(updateSize, 10)

    return () => clearTimeout(timer)
  }, [isExpanded])

  // Don't render until we know the theme - prevents flash
  if (isDarkMode === null) {
    return null
  }

  return (
    <>
      {/* Backdrop - only when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] pointer-events-auto"
          onClick={closeExpanded}
        />
      )}

      {/* Main container - changes style based on expanded state */}
      <div className={isExpanded ? "fixed inset-4 z-[9999] pointer-events-auto" : "absolute inset-0 w-full h-full pointer-events-none"}>
        <div className="relative w-full h-full">
          {/* Close button - only when expanded */}
          {isExpanded && (
            <button
              onClick={closeExpanded}
              className="absolute top-4 right-4 z-[10000] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          )}

          {/* Canvas - always in same place with smooth fade-in */}
          <canvas
            ref={canvasRef}
            onClick={isExpanded ? undefined : cycleMode}
            className={isExpanded
              ? "absolute inset-0 w-full h-full rounded-lg pointer-events-auto animate-canvas-fade-in"
              : "absolute inset-0 w-full h-full cursor-pointer pointer-events-auto animate-canvas-fade-in"
            }
            style={{ opacity: isExpanded ? 1 : 0.6 }}
          />

          {/* Controls */}
          <div className="absolute bottom-4 right-4 z-[10000] flex flex-col gap-2 pointer-events-auto">
            {isExpanded ? (
              // Expanded mode controls - adaptive for light/dark
              <>
                {mode === 'terminal' && (
                  <div className={isDarkMode
                    ? "flex flex-col gap-1.5 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10"
                    : "flex flex-col gap-1.5 bg-white/60 backdrop-blur-md rounded-lg p-2 border border-amber-200/50 shadow-sm"
                  }>
                    <button onClick={(e) => { e.stopPropagation(); terminalColorScheme.current = terminalColorScheme.current === 'blue' ? 'green' : terminalColorScheme.current === 'green' ? 'amber' : 'blue'; forceUpdate(n => n + 1); }} className={isDarkMode
                      ? "px-3 py-1.5 text-xs rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white"
                      : "px-3 py-1.5 text-xs rounded bg-amber-900/10 hover:bg-amber-900/20 backdrop-blur-sm border border-amber-900/20 transition-colors text-amber-900"
                    }>
                      Color: {terminalColorScheme.current}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); terminalHistory.current = ['']; }} className={isDarkMode
                      ? "px-3 py-1.5 text-xs rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white"
                      : "px-3 py-1.5 text-xs rounded bg-amber-900/10 hover:bg-amber-900/20 backdrop-blur-sm border border-amber-900/20 transition-colors text-amber-900"
                    }>
                      Clear
                    </button>
                  </div>
                )}
                {mode === 'labyrinth' && (
                  <div className={isDarkMode
                    ? "flex flex-col gap-1.5 bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10"
                    : "flex flex-col gap-1.5 bg-white/60 backdrop-blur-md rounded-lg p-2 border border-amber-200/50 shadow-sm"
                  }>
                    <button onClick={(e) => { e.stopPropagation(); resetLabyrinth.current = true; }} className={isDarkMode
                      ? "px-3 py-1.5 text-xs rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white"
                      : "px-3 py-1.5 text-xs rounded bg-amber-900/10 hover:bg-amber-900/20 backdrop-blur-sm border border-amber-900/20 transition-colors text-amber-900"
                    }>
                      Reset Maze
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Normal mode controls
              renderControls()
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// Memoize to prevent unnecessary re-renders
export const InteractiveBackground = memo(InteractiveBackgroundComponent)
