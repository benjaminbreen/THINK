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
  // Track visibility to pause animation when off-screen (performance optimization)
  const isVisible = useRef(true)

  // Pause animation when canvas is off-screen to save CPU/battery
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

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
    '> or try typing "game"',
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
    messageTime: 0,
    // Level 2 - Giant Slayer (Ender's Game inspired)
    level: 1 as 1 | 2,
    level2: {
      playerX: 50,
      playerY: 0, // Will be set to ground level
      playerVX: 0, // Horizontal velocity for momentum
      playerVY: 0,
      facingRight: true,
      isJumping: false,
      isSlashing: false,
      slashFrame: 0,
      // Player health
      playerHealth: 5,
      playerMaxHealth: 5,
      playerHurt: 0, // Invincibility frames
      // Power slash
      isCharging: false,
      chargeStart: 0,
      chargePower: 0, // 0 to 1
      isPowerSlashing: false,
      powerSlashFrame: 0,
      // Shield
      isShielding: false,
      shieldHit: 0, // For shield impact effect
      // Giant state
      giantX: 0, // Will be set based on canvas width
      giantHealth: 5,
      giantMaxHealth: 5,
      giantHurt: 0,
      giantDefeated: false,
      giantAttacking: false,
      giantAttackFrame: 0,
      giantAttackType: 'sword' as 'sword' | 'rock' | 'fireball' | 'lightning',
      // Procedural variations
      giantColor: { body: '', dark: '' },
      skyColors: { top: '', bottom: '' },
      groundColor: '',
      grassColor: '',
      waveNumber: 1,
      // Projectiles
      projectiles: [] as Array<{
        x: number
        y: number
        vx: number
        vy: number
        type: 'rock' | 'fireball' | 'lightning'
        frame: number
      }>,
      // Beanstalk state
      beanstalksGrown: false,
      climbingBeanstalk: false,
      climbProgress: 0,
      // Victory/Game state
      reachedClouds: false,
      mysticalText: '',
      mysticalTextIndex: 0,
      fadeIn: 0,
      gameOver: false,
      endlessMode: false,
      showKeepPlaying: false,
    }
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
    era: 'ancient' | 'medieval' | 'modern'
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
  // era: 'ancient' (before 500 CE), 'medieval' (500-1500), 'modern' (1500-present)
  const humanisticQuotes: Array<{ text: string; author: string; era: 'ancient' | 'medieval' | 'modern' }> = [
    // === ANCIENT (before 500 CE) ===
    // Greek & Roman
    { text: "Know thyself", author: "Socrates", era: 'ancient' },
    { text: "The unexamined life is not worth living", author: "Socrates", era: 'ancient' },
    { text: "Man is the measure of all things", author: "Protagoras", era: 'ancient' },
    { text: "The only true wisdom is knowing you know nothing", author: "Socrates", era: 'ancient' },
    { text: "What is truth?", author: "Pilate", era: 'ancient' },
    { text: "I am a human being; nothing human is alien to me", author: "Terence", era: 'ancient' },
    { text: "The life which is unexamined is not worth living", author: "Plato", era: 'ancient' },
    { text: "We are what we repeatedly do; excellence is not an act, but a habit", author: "Aristotle", era: 'ancient' },
    { text: "The soul becomes dyed with the color of its thoughts", author: "Marcus Aurelius", era: 'ancient' },
    { text: "Waste no more time arguing about what a good man should be. Be one", author: "Marcus Aurelius", era: 'ancient' },
    { text: "Fortune favors the bold", author: "Virgil", era: 'ancient' },
    { text: "While I breathe, I hope", author: "Cicero", era: 'ancient' },
    { text: "Seize the day, trusting little in tomorrow", author: "Horace", era: 'ancient' },
    // Chinese
    { text: "The way that can be told is not the eternal Way", author: "Laozi", era: 'ancient' },
    { text: "A journey of a thousand miles begins with a single step", author: "Laozi", era: 'ancient' },
    { text: "He who knows others is wise; he who knows himself is enlightened", author: "Laozi", era: 'ancient' },
    { text: "By three methods we may learn wisdom: reflection, imitation, and experience", author: "Confucius", era: 'ancient' },
    { text: "The noble person is concerned with righteousness; the petty person is concerned with profit", author: "Confucius", era: 'ancient' },
    { text: "Study the past if you would define the future", author: "Confucius", era: 'ancient' },
    { text: "The fish trap exists because of the fish. Once you've gotten the fish, you can forget the trap", author: "Zhuangzi", era: 'ancient' },
    // Indian
    { text: "You have the right to work, but never to the fruit of work", author: "Bhagavad Gita", era: 'ancient' },
    { text: "The mind is everything. What you think you become", author: "Buddha", era: 'ancient' },
    { text: "Three things cannot be long hidden: the sun, the moon, and the truth", author: "Buddha", era: 'ancient' },
    { text: "In the sky, there is no distinction of east and west", author: "Buddha", era: 'ancient' },
    // Persian & Middle Eastern
    { text: "This too shall pass", author: "Persian proverb", era: 'ancient' },
    { text: "I am Cyrus, king of the world", author: "Cyrus Cylinder", era: 'ancient' },

    // === MEDIEVAL (500-1500 CE) ===
    // Islamic Golden Age
    { text: "The ink of the scholar is more sacred than the blood of the martyr", author: "Islamic proverb", era: 'medieval' },
    { text: "Seek knowledge even unto China", author: "Islamic proverb", era: 'medieval' },
    { text: "I am the Truth", author: "Mansur al-Hallaj", era: 'medieval' },
    { text: "Whoever travels without a guide needs two hundred years for a two-day journey", author: "Rumi", era: 'medieval' },
    { text: "What you seek is seeking you", author: "Rumi", era: 'medieval' },
    { text: "Let the beauty we love be what we do", author: "Rumi", era: 'medieval' },
    { text: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there", author: "Rumi", era: 'medieval' },
    { text: "The wound is the place where the Light enters you", author: "Rumi", era: 'medieval' },
    { text: "Be like melting snow—wash yourself of yourself", author: "Rumi", era: 'medieval' },
    { text: "I have lived on the lip of insanity, wanting to know reasons, knocking on a door. It opens. I've been knocking from the inside", author: "Rumi", era: 'medieval' },
    { text: "A rose's rarest essence lives in the thorn", author: "Saadi", era: 'medieval' },
    { text: "Human beings are members of a whole, in creation of one essence and soul", author: "Saadi", era: 'medieval' },
    { text: "The rose and the thorn, and sorrow and gladness are linked together", author: "Saadi", era: 'medieval' },
    // Japanese
    { text: "Mono no aware: the pathos of things", author: "Murasaki Shikibu", era: 'medieval' },
    { text: "The fleeting world—a dream within a dream", author: "Tale of Genji", era: 'medieval' },
    { text: "The sound of the bell of Gion Shōja echoes the impermanence of all things", author: "Heike Monogatari", era: 'medieval' },
    { text: "In this floating world, to be is to become", author: "Japanese proverb", era: 'medieval' },
    // European Medieval
    { text: "In the middle of the journey of our life, I found myself in a dark wood", author: "Dante", era: 'medieval' },
    { text: "Love that moves the sun and the other stars", author: "Dante", era: 'medieval' },
    { text: "Consider your origins: you were not made to live as brutes, but to follow virtue and knowledge", author: "Dante", era: 'medieval' },
    { text: "Abandon all hope, ye who enter here", author: "Dante", era: 'medieval' },
    { text: "The more perfect a thing is, the more it feels pleasure and pain", author: "Dante", era: 'medieval' },
    { text: "No one can be perfectly free till all are free", author: "Herbert Spencer", era: 'medieval' },
    // African
    { text: "However far the stream flows, it never forgets its source", author: "Yoruba proverb", era: 'medieval' },
    { text: "When the music changes, so does the dance", author: "Hausa proverb", era: 'medieval' },
    { text: "Knowledge without wisdom is like water in the sand", author: "Guinean proverb", era: 'medieval' },

    // === MODERN (1500-present) ===
    // Renaissance & Early Modern
    { text: "I think, therefore I am", author: "Descartes", era: 'modern' },
    { text: "To philosophize is to learn how to die", author: "Montaigne", era: 'modern' },
    { text: "We are such stuff as dreams are made on", author: "Shakespeare", era: 'modern' },
    { text: "What's past is prologue", author: "Shakespeare", era: 'modern' },
    { text: "This above all: to thine own self be true", author: "Shakespeare", era: 'modern' },
    { text: "The fault, dear Brutus, is not in our stars, but in ourselves", author: "Shakespeare", era: 'modern' },
    { text: "Nothing will come of nothing", author: "Shakespeare", era: 'modern' },
    { text: "Time is out of joint", author: "Shakespeare", era: 'modern' },
    { text: "All the world's a stage, and all the men and women merely players", author: "Shakespeare", era: 'modern' },
    { text: "The rest is silence", author: "Shakespeare", era: 'modern' },
    { text: "We know what we are, but know not what we may be", author: "Shakespeare", era: 'modern' },
    { text: "There are more things in heaven and earth than are dreamt of in your philosophy", author: "Shakespeare", era: 'modern' },
    // Enlightenment & 19th Century
    { text: "Esse est percipi - To be is to be perceived", author: "Berkeley", era: 'modern' },
    { text: "The owl of Minerva spreads its wings only with the falling of dusk", author: "Hegel", era: 'modern' },
    { text: "All that is solid melts into air", author: "Marx", era: 'modern' },
    { text: "God is dead", author: "Nietzsche", era: 'modern' },
    { text: "Become who you are", author: "Nietzsche", era: 'modern' },
    { text: "He who has a why to live can bear almost any how", author: "Nietzsche", era: 'modern' },
    { text: "Whatever you can do or dream you can, begin it", author: "Goethe", era: 'modern' },
    { text: "The eternal feminine draws us onward", author: "Goethe", era: 'modern' },
    { text: "In the beginning was the deed", author: "Goethe", era: 'modern' },
    { text: "Two souls, alas, are dwelling in my breast", author: "Goethe", era: 'modern' },
    { text: "More light!", author: "Goethe", era: 'modern' },
    { text: "Beauty is truth, truth beauty", author: "Keats", era: 'modern' },
    { text: "A thing of beauty is a joy forever", author: "Keats", era: 'modern' },
    { text: "Here lies one whose name was writ in water", author: "Keats", era: 'modern' },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment", author: "Emerson", era: 'modern' },
    { text: "I am large, I contain multitudes", author: "Whitman", era: 'modern' },
    { text: "I celebrate myself, and sing myself", author: "Whitman", era: 'modern' },
    { text: "Call me Ishmael", author: "Melville", era: 'modern' },
    { text: "I would prefer not to", author: "Melville", era: 'modern' },
    { text: "From hell's heart I stab at thee", author: "Melville", era: 'modern' },
    { text: "Tell all the truth but tell it slant", author: "Dickinson", era: 'modern' },
    { text: "Hope is the thing with feathers", author: "Dickinson", era: 'modern' },
    { text: "Because I could not stop for Death, He kindly stopped for me", author: "Dickinson", era: 'modern' },
    { text: "I'm Nobody! Who are you?", author: "Dickinson", era: 'modern' },
    { text: "The Soul selects her own Society", author: "Dickinson", era: 'modern' },
    { text: "I dwell in Possibility", author: "Dickinson", era: 'modern' },
    // 20th Century & Contemporary
    { text: "The limits of my language mean the limits of my world", author: "Wittgenstein", era: 'modern' },
    { text: "We live in time; it holds us and molds us", author: "Arendt", era: 'modern' },
    { text: "The world is everything that is the case", author: "Wittgenstein", era: 'modern' },
    { text: "Whereof one cannot speak, thereof one must be silent", author: "Wittgenstein", era: 'modern' },
    { text: "Hell is other people", author: "Sartre", era: 'modern' },
    { text: "One must imagine Sisyphus happy", author: "Camus", era: 'modern' },
    { text: "In the midst of winter, I found there was, within me, an invincible summer", author: "Camus", era: 'modern' },
    { text: "The past is never dead. It's not even past", author: "Faulkner", era: 'modern' },
    { text: "In my beginning is my end", author: "Eliot", era: 'modern' },
    { text: "Between the idea and the reality falls the shadow", author: "Eliot", era: 'modern' },
    { text: "April is the cruellest month", author: "Eliot", era: 'modern' },
    { text: "We shall not cease from exploration", author: "Eliot", era: 'modern' },
    { text: "This is the way the world ends: not with a bang but a whimper", author: "Eliot", era: 'modern' },
    { text: "I have measured out my life with coffee spoons", author: "Eliot", era: 'modern' },
    { text: "Do I dare disturb the universe?", author: "Eliot", era: 'modern' },
    { text: "The centre cannot hold", author: "Yeats", era: 'modern' },
    { text: "Things fall apart", author: "Yeats", era: 'modern' },
    { text: "Tread softly because you tread on my dreams", author: "Yeats", era: 'modern' },
    { text: "Do not go gentle into that good night", author: "Dylan Thomas", era: 'modern' },
    { text: "In the destructive element immerse", author: "Conrad", era: 'modern' },
    { text: "The horror! The horror!", author: "Conrad", era: 'modern' },
    // Latin American
    { text: "Many years later, facing the firing squad, he was to remember that distant afternoon when his father took him to discover ice", author: "García Márquez", era: 'modern' },
    { text: "What matters in life is not what happens to you but what you remember and how you remember it", author: "García Márquez", era: 'modern' },
    { text: "I learned that one can always find something good in bad things, and something bad in good things", author: "García Márquez", era: 'modern' },
    { text: "I do not know if the world has lied, I have lied", author: "Neruda", era: 'modern' },
    { text: "You can cut all the flowers but you cannot keep spring from coming", author: "Neruda", era: 'modern' },
    { text: "Poetry is an act of peace", author: "Neruda", era: 'modern' },
    { text: "I grew up in this country, and I don't speak its language", author: "Borges", era: 'modern' },
    { text: "Time is the substance I am made of. Time is a river which sweeps me along, but I am the river", author: "Borges", era: 'modern' },
    { text: "I have always imagined that Paradise will be a kind of library", author: "Borges", era: 'modern' },
    { text: "The original is unfaithful to the translation", author: "Borges", era: 'modern' },
    // African & Caribbean
    { text: "Things fall apart; the centre cannot hold", author: "Achebe (via Yeats)", era: 'modern' },
    { text: "Until the lions have their own historians, the history of the hunt will always glorify the hunter", author: "Chinua Achebe", era: 'modern' },
    { text: "The white man is very clever. He came quietly with his religion", author: "Chinua Achebe", era: 'modern' },
    { text: "If you don't like someone's story, write your own", author: "Chinua Achebe", era: 'modern' },
    { text: "A people without the knowledge of their past history, origin and culture is like a tree without roots", author: "Marcus Garvey", era: 'modern' },
    { text: "Me only have one ambition, y'know. I only have one thing I really like to see happen. I like to see mankind live together - black, white, Chinese, everyone", author: "Bob Marley", era: 'modern' },
    // Asian Modern
    { text: "The more you sweat in peacetime, the less you bleed during war", author: "Chinese proverb", era: 'modern' },
    { text: "An old pond / A frog jumps in / The sound of water", author: "Bashō", era: 'modern' },
    { text: "Do not seek to follow in the footsteps of the wise. Seek what they sought", author: "Bashō", era: 'modern' },
    { text: "Be the change you wish to see in the world", author: "Gandhi", era: 'modern' },
    { text: "In a gentle way, you can shake the world", author: "Gandhi", era: 'modern' },
    { text: "The weak can never forgive. Forgiveness is the attribute of the strong", author: "Gandhi", era: 'modern' },
    { text: "Where the mind is without fear and the head is held high", author: "Tagore", era: 'modern' },
    { text: "You can't cross the sea merely by standing and staring at the water", author: "Tagore", era: 'modern' },
    { text: "Let your life lightly dance on the edges of Time like dew on the tip of a leaf", author: "Tagore", era: 'modern' },
    // Women's Voices
    { text: "One is not born, but rather becomes, a woman", author: "Simone de Beauvoir", era: 'modern' },
    { text: "I am no bird; and no net ensnares me", author: "Charlotte Brontë", era: 'modern' },
    { text: "It is not the consciousness of men that determines their being, but their social being that determines their consciousness", author: "Rosa Luxemburg", era: 'modern' },
    { text: "The most common way people give up their power is by thinking they don't have any", author: "Alice Walker", era: 'modern' },
    { text: "Caring for myself is not self-indulgence, it is self-preservation, and that is an act of political warfare", author: "Audre Lorde", era: 'modern' },
    { text: "Your silence will not protect you", author: "Audre Lorde", era: 'modern' },
    { text: "If you are silent about your pain, they'll kill you and say you enjoyed it", author: "Zora Neale Hurston", era: 'modern' },
    { text: "A room of one's own", author: "Virginia Woolf", era: 'modern' },
    { text: "Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of my mind", author: "Virginia Woolf", era: 'modern' },
  ]

  // Mystical ending texts for Level 2 - obscure references to pre-modern/early modern non-English literature
  const mysticalEndingTexts = [
    // Shahnameh (Ferdowsi, Persian, c. 1010) - reference to Rostam and the Simorgh
    "The feather of the burning bird still glows in your pocket. When the world-serpent coils, remember: your father's father climbed this same vine.",
    // Orlando Furioso (Ariosto, Italian, 1516) - reference to Astolfo's journey to the moon
    "On the moon, in crystal vials, lie all the things lost on Earth. Your sanity waits there, stoppered and patient.",
    // Journey to the West (Wu Cheng'en, Chinese, c. 1592) - reference to Sun Wukong
    "The stone monkey laughs. Five hundred years beneath the mountain taught him: every prison is a chrysalis.",
    // Tale of Genji (Murasaki Shikibu, Japanese, c. 1010) - reference to the ephemeral nature of beauty
    "Mono no aware: the pathos of things. Even these clouds will scatter like cherry blossoms in an indifferent wind.",
    // Popol Vuh (K'iche' Maya, c. 1550 transcription) - reference to the Hero Twins
    "The lords of Xibalba play their ball game still. You have beaten death at riddles, but death remembers every answer.",
    // Mahabharata (Sanskrit, c. 400 BCE - 400 CE) - reference to Arjuna's dilemma
    "The charioteer whispers: you must act, but do not cling to the fruits of action. The giant falls; the giant rises; the giant falls.",
    // One Thousand and One Nights (Arabic, various periods) - reference to Scheherazade
    "And so dawn overtook the storyteller, and she fell silent. But there are still nine hundred and ninety-nine nights remaining.",
    // Divina Commedia (Dante, Italian, 1320) - reference to the final vision
    "L'amor che move il sole e l'altre stelle—the love that moves the sun moves also these pixel stars, and you.",
    // Lusiads (Camões, Portuguese, 1572) - reference to the Isle of Love
    "Beyond the cape of storms lies the island where nymphs await. But you have slain your giant; what need have you of paradise?",
    // Heike Monogatari (Japanese, c. 1330) - reference to impermanence
    "The sound of the bell of Gion Shōja echoes the impermanence of all things. Even this victory is already fading.",
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
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      if (mode === 'blocks') {
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

        // Level 2 controls - side-scroller
        if (lab.level === 2) {
          const l2 = lab.level2

          // Victory screen - RETURN/Enter to start endless mode
          if (l2.reachedClouds) {
            if (e.key === 'Enter' && l2.showKeepPlaying) {
              startEndlessMode()
            }
            return
          }

          // Game over - SPACE to restart
          if (l2.gameOver) {
            if (e.key === ' ') {
              // Reset game
              l2.gameOver = false
              l2.endlessMode = false
              l2.waveNumber = 1
              l2.playerX = 50
              l2.playerY = 0
              l2.playerVX = 0
              l2.playerVY = 0
              l2.playerHealth = 5
              l2.playerHurt = 0
              l2.giantHealth = 5
              l2.giantMaxHealth = 5
              l2.giantDefeated = false
              l2.giantHurt = 0
              l2.giantAttacking = false
              l2.giantX = 300
              l2.projectiles = []
              l2.beanstalksGrown = false
              l2.climbingBeanstalk = false
              l2.climbProgress = 0
              l2.reachedClouds = false
              l2.showKeepPlaying = false
              // Exit fullscreen if needed
              if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {})
              }
            }
            return
          }

          // Climbing beanstalk controls
          if (l2.climbingBeanstalk) {
            if (e.key === 'ArrowUp') {
              l2.climbProgress += 0.05
              if (l2.climbProgress >= 1) {
                l2.reachedClouds = true
                l2.mysticalTextIndex = Math.floor(Math.random() * mysticalEndingTexts.length)
                l2.mysticalText = mysticalEndingTexts[l2.mysticalTextIndex]
                l2.fadeIn = 0
              }
            } else if (e.key === 'ArrowDown' && l2.climbProgress > 0) {
              l2.climbProgress -= 0.05
              if (l2.climbProgress <= 0) {
                l2.climbingBeanstalk = false
                l2.climbProgress = 0
              }
            }
            return
          }

          // X key = Shield (hold)
          if (e.key === 'x' || e.key === 'X') {
            if (!l2.isSlashing && !l2.isPowerSlashing && !l2.isCharging) {
              l2.isShielding = true
            }
            return
          }

          // Space = Charge power slash (on keydown, start charging)
          if (e.key === ' ') {
            if (!l2.isSlashing && !l2.isPowerSlashing && !l2.isShielding) {
              if (!l2.isCharging) {
                l2.isCharging = true
                l2.chargeStart = Date.now()
                l2.chargePower = 0
              }
            }
            return
          }

          // Movement with momentum
          if (e.key === 'ArrowLeft') {
            l2.playerVX = -6 // Set horizontal velocity
            l2.facingRight = false
          } else if (e.key === 'ArrowRight') {
            l2.playerVX = 6 // Set horizontal velocity
            l2.facingRight = true
          } else if (e.key === 'ArrowUp' && !l2.isJumping) {
            // Check if near beanstalk to climb
            if (l2.beanstalksGrown && l2.playerX > canvas.width - 120) {
              l2.climbingBeanstalk = true
              l2.climbProgress = 0
            } else {
              // Jump - carries current horizontal momentum
              l2.isJumping = true
              l2.playerVY = -13
              // Boost horizontal velocity slightly when jumping while moving
              if (l2.playerVX !== 0) {
                l2.playerVX *= 1.2
              }
            }
          }
          return
        }

        // Level 1 controls - maze navigation
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
              lab.message = '★ Entering Level 2: The Giant\'s Garden ★'
              lab.messageTime = Date.now()
              // Hide hero for full game view
              window.dispatchEvent(new CustomEvent('THINK_hideHero'))
              // Transition to Level 2 after a moment
              setTimeout(() => {
                lab.level = 2
                lab.level2.playerX = 50
                lab.level2.playerY = 0
                lab.level2.playerVX = 0
                lab.level2.giantX = canvas.width * 0.7
                lab.level2.giantHealth = 5
                lab.level2.giantDefeated = false
                lab.level2.giantHurt = 0
                lab.level2.giantAttacking = false
                lab.level2.giantAttackFrame = 0
                lab.level2.beanstalksGrown = false
                lab.level2.climbingBeanstalk = false
                lab.level2.climbProgress = 0
                lab.level2.reachedClouds = false
                lab.level2.fadeIn = 0
                lab.level2.isCharging = false
                lab.level2.chargePower = 0
                lab.level2.isPowerSlashing = false
                lab.level2.isShielding = false
                lab.level2.shieldHit = 0
              }, 2000)
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

    // Keyup handler for Level 2 (release space to slash, release X to lower shield)
    const handleKeyUp = (e: KeyboardEvent) => {
      if (mode === 'labyrinth' && labyrinth.current.level === 2) {
        const l2 = labyrinth.current.level2

        // Release X = lower shield
        if (e.key === 'x' || e.key === 'X') {
          l2.isShielding = false
        }

        // Release Space = execute slash (power depends on charge time)
        if (e.key === ' ' && l2.isCharging) {
          l2.isCharging = false
          const chargeTime = Date.now() - l2.chargeStart
          const chargePower = Math.min(1, chargeTime / 1500) // 1.5 seconds for full charge

          if (chargePower >= 0.8) {
            // Power slash!
            l2.isPowerSlashing = true
            l2.powerSlashFrame = 0
            l2.chargePower = chargePower

            // Power slash does 2 damage and has longer range
            if (!l2.giantDefeated) {
              const distToGiant = l2.giantX - l2.playerX
              if (distToGiant > 0 && distToGiant < 150 && l2.facingRight) {
                l2.giantHealth -= 2
                l2.giantHurt = 30
                if (l2.giantHealth <= 0) {
                  l2.giantDefeated = true
                  if (l2.endlessMode) {
                    // Spawn next giant after delay
                    setTimeout(() => {
                      spawnNextGiant()
                    }, 1500)
                  } else {
                    setTimeout(() => {
                      labyrinth.current.level2.beanstalksGrown = true
                    }, 1500)
                  }
                }
              }
            }
          } else {
            // Normal slash
            l2.isSlashing = true
            l2.slashFrame = 0

            if (!l2.giantDefeated) {
              const distToGiant = l2.giantX - l2.playerX
              if (distToGiant > 0 && distToGiant < 100 && l2.facingRight) {
                l2.giantHealth--
                l2.giantHurt = 20
                if (l2.giantHealth <= 0) {
                  l2.giantDefeated = true
                  if (l2.endlessMode) {
                    // Spawn next giant after delay
                    setTimeout(() => {
                      spawnNextGiant()
                    }, 1500)
                  } else {
                    setTimeout(() => {
                      labyrinth.current.level2.beanstalksGrown = true
                    }, 1500)
                  }
                }
              }
            }
          }
        }

        // Release arrow keys = stop horizontal movement (but keep momentum if jumping)
        if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !l2.isJumping) {
          l2.playerVX = 0
        }
      }
    }
    window.addEventListener('keyup', handleKeyUp)

    // Start endless mode with procedural generation
    const startEndlessMode = () => {
      const l2 = labyrinth.current.level2

      // Request fullscreen
      if (canvasRef.current && document.fullscreenEnabled) {
        canvasRef.current.requestFullscreen().catch(() => {
          // Fullscreen may be blocked, continue anyway
        })
      }

      // Generate procedural colors for giant
      const giantColors = [
        { body: 'rgba(140, 80, 100, 1)', dark: 'rgba(100, 50, 70, 1)' },   // Burgundy
        { body: 'rgba(80, 120, 140, 1)', dark: 'rgba(50, 90, 110, 1)' },   // Steel blue
        { body: 'rgba(100, 140, 80, 1)', dark: 'rgba(70, 110, 50, 1)' },   // Forest green
        { body: 'rgba(140, 120, 80, 1)', dark: 'rgba(110, 90, 50, 1)' },   // Bronze
        { body: 'rgba(120, 80, 140, 1)', dark: 'rgba(90, 50, 110, 1)' },   // Purple
        { body: 'rgba(140, 100, 60, 1)', dark: 'rgba(110, 70, 30, 1)' },   // Copper
        { body: 'rgba(80, 100, 120, 1)', dark: 'rgba(50, 70, 90, 1)' },    // Slate
        { body: 'rgba(130, 90, 90, 1)', dark: 'rgba(100, 60, 60, 1)' },    // Dusty rose
      ]

      const skyVariations = [
        { top: 'rgba(100, 60, 80, 1)', bottom: 'rgba(200, 150, 120, 1)' },   // Sunset
        { top: 'rgba(40, 60, 100, 1)', bottom: 'rgba(120, 140, 180, 1)' },   // Twilight
        { top: 'rgba(60, 80, 60, 1)', bottom: 'rgba(150, 180, 140, 1)' },    // Mossy dusk
        { top: 'rgba(80, 50, 100, 1)', bottom: 'rgba(180, 140, 200, 1)' },   // Purple haze
        { top: 'rgba(100, 80, 50, 1)', bottom: 'rgba(220, 180, 140, 1)' },   // Golden hour
        { top: 'rgba(30, 50, 80, 1)', bottom: 'rgba(100, 150, 200, 1)' },    // Night falls
      ]

      const groundColors = [
        'rgba(100, 80, 60, 1)',   // Earth
        'rgba(80, 90, 70, 1)',    // Mossy
        'rgba(90, 70, 80, 1)',    // Purple earth
        'rgba(110, 90, 70, 1)',   // Sandy
        'rgba(70, 80, 90, 1)',    // Slate
      ]

      const grassColors = [
        'rgba(70, 140, 70, 1)',   // Green
        'rgba(90, 130, 60, 1)',   // Yellow-green
        'rgba(60, 120, 80, 1)',   // Blue-green
        'rgba(80, 100, 70, 1)',   // Sage
        'rgba(100, 120, 50, 1)',  // Golden grass
      ]

      // Set up endless mode
      l2.endlessMode = true
      l2.waveNumber = 1
      l2.showKeepPlaying = false
      l2.reachedClouds = false
      l2.climbingBeanstalk = false
      l2.beanstalksGrown = false
      l2.giantDefeated = false
      l2.fadeIn = 0

      // Reset player
      l2.playerX = 50
      l2.playerY = 0
      l2.playerVX = 0
      l2.playerVY = 0
      l2.playerHealth = 5
      l2.playerHurt = 0
      l2.isCharging = false
      l2.chargePower = 0
      l2.isShielding = false
      l2.projectiles = []

      // Generate new giant
      const colorIdx = Math.floor(Math.random() * giantColors.length)
      l2.giantColor = giantColors[colorIdx]
      l2.giantX = 300
      l2.giantHealth = 5 + l2.waveNumber
      l2.giantMaxHealth = l2.giantHealth
      l2.giantHurt = 0
      l2.giantAttacking = false

      // Generate new environment
      const skyIdx = Math.floor(Math.random() * skyVariations.length)
      l2.skyColors = skyVariations[skyIdx]
      l2.groundColor = groundColors[Math.floor(Math.random() * groundColors.length)]
      l2.grassColor = grassColors[Math.floor(Math.random() * grassColors.length)]

      // Hide hero
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('THINK_hideHero'))
      }
    }

    // Spawn next giant in endless mode
    const spawnNextGiant = () => {
      const l2 = labyrinth.current.level2

      // Increment wave
      l2.waveNumber++

      // Procedural colors
      const giantColors = [
        { body: 'rgba(140, 80, 100, 1)', dark: 'rgba(100, 50, 70, 1)' },
        { body: 'rgba(80, 120, 140, 1)', dark: 'rgba(50, 90, 110, 1)' },
        { body: 'rgba(100, 140, 80, 1)', dark: 'rgba(70, 110, 50, 1)' },
        { body: 'rgba(140, 120, 80, 1)', dark: 'rgba(110, 90, 50, 1)' },
        { body: 'rgba(120, 80, 140, 1)', dark: 'rgba(90, 50, 110, 1)' },
        { body: 'rgba(140, 100, 60, 1)', dark: 'rgba(110, 70, 30, 1)' },
        { body: 'rgba(80, 100, 120, 1)', dark: 'rgba(50, 70, 90, 1)' },
        { body: 'rgba(130, 90, 90, 1)', dark: 'rgba(100, 60, 60, 1)' },
      ]

      const skyVariations = [
        { top: 'rgba(100, 60, 80, 1)', bottom: 'rgba(200, 150, 120, 1)' },
        { top: 'rgba(40, 60, 100, 1)', bottom: 'rgba(120, 140, 180, 1)' },
        { top: 'rgba(60, 80, 60, 1)', bottom: 'rgba(150, 180, 140, 1)' },
        { top: 'rgba(80, 50, 100, 1)', bottom: 'rgba(180, 140, 200, 1)' },
        { top: 'rgba(100, 80, 50, 1)', bottom: 'rgba(220, 180, 140, 1)' },
        { top: 'rgba(30, 50, 80, 1)', bottom: 'rgba(100, 150, 200, 1)' },
      ]

      const groundColors = ['rgba(100, 80, 60, 1)', 'rgba(80, 90, 70, 1)', 'rgba(90, 70, 80, 1)', 'rgba(110, 90, 70, 1)', 'rgba(70, 80, 90, 1)']
      const grassColors = ['rgba(70, 140, 70, 1)', 'rgba(90, 130, 60, 1)', 'rgba(60, 120, 80, 1)', 'rgba(80, 100, 70, 1)', 'rgba(100, 120, 50, 1)']

      // Reset for new giant
      l2.giantDefeated = false
      l2.giantColor = giantColors[Math.floor(Math.random() * giantColors.length)]
      l2.giantX = 300
      l2.giantHealth = 5 + Math.floor(l2.waveNumber * 1.5)  // Harder each wave
      l2.giantMaxHealth = l2.giantHealth
      l2.giantHurt = 0
      l2.giantAttacking = false
      l2.projectiles = []

      // New environment
      l2.skyColors = skyVariations[Math.floor(Math.random() * skyVariations.length)]
      l2.groundColor = groundColors[Math.floor(Math.random() * groundColors.length)]
      l2.grassColor = grassColors[Math.floor(Math.random() * grassColors.length)]

      // Reset player position but keep health
      l2.playerX = 50
      l2.playerVX = 0
    }

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
        return 'Commands: help, ls, goto <page>, cd <page>, about, projects, clear, time, joke, authors, normal.\nGames: game (giant slayer), labyrinth (maze), maze.\nLiterary styles: hemingway, shakespeare, whitman, woolf, joyce, austen, cervantes, borges, james, wilde.\nMore: melville, dickinson, kafka, proust, dante, milton, chaucer, sappho, horace, catullus'
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
      } else if (lower === 'game' || lower === 'giant' || lower === 'play') {
        // Switch to labyrinth mode and start Level 2 directly
        setMode('labyrinth')
        // Initialize Level 2 state
        labyrinth.current.level = 2
        labyrinth.current.solved = true // Mark level 1 as complete
        labyrinth.current.level2.playerX = 50
        labyrinth.current.level2.playerY = 0
        labyrinth.current.level2.playerVX = 0
        labyrinth.current.level2.giantX = canvas.width * 0.7
        labyrinth.current.level2.giantHealth = 5
        labyrinth.current.level2.giantDefeated = false
        labyrinth.current.level2.giantHurt = 0
        labyrinth.current.level2.giantAttacking = false
        labyrinth.current.level2.giantAttackFrame = 0
        labyrinth.current.level2.beanstalksGrown = false
        labyrinth.current.level2.climbingBeanstalk = false
        labyrinth.current.level2.climbProgress = 0
        labyrinth.current.level2.reachedClouds = false
        labyrinth.current.level2.fadeIn = 0
        labyrinth.current.level2.isSlashing = false
        labyrinth.current.level2.isJumping = false
        labyrinth.current.level2.isCharging = false
        labyrinth.current.level2.chargePower = 0
        labyrinth.current.level2.isPowerSlashing = false
        labyrinth.current.level2.isShielding = false
        labyrinth.current.level2.shieldHit = 0
        // Hide the hero content for full game view
        window.dispatchEvent(new CustomEvent('THINK_hideHero'))
        forceUpdate(n => n + 1)
        return '★ ENTERING THE GIANT\'S GARDEN ★\n\n← → move | ↑ jump | Hold SPACE: power slash | X: shield\nDefeat the giant, climb the beanstalk, reach the clouds...'
      } else if (lower === 'labyrinth' || lower === 'maze') {
        // Switch to labyrinth mode Level 1
        setMode('labyrinth')
        labyrinth.current.level = 1
        labyrinth.current.solved = false
        labyrinth.current.maze = [] // Reset maze
        forceUpdate(n => n + 1)
        return '★ ENTERING THE LABYRINTH ★\n\nNavigate Borges\' Garden of Forking Paths!\nArrow keys to move. Find 3 artifacts to unlock the exit.'
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
      for (let i = 0; i < 12; i++) {
        const quote = humanisticQuotes[Math.floor(Math.random() * humanisticQuotes.length)]
        // Match book type to era for visual consistency
        let bookType: 'book' | 'scroll' | 'manuscript'
        if (quote.era === 'ancient') {
          bookType = Math.random() > 0.3 ? 'scroll' : 'manuscript'
        } else if (quote.era === 'medieval') {
          bookType = Math.random() > 0.5 ? 'manuscript' : 'book'
        } else {
          bookType = Math.random() > 0.2 ? 'book' : 'manuscript'
        }

        books.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          type: bookType,
          quote: quote.text,
          author: quote.author,
          era: quote.era,
          open: false,
          openProgress: 0,
          hovered: false,
          size: 100 + Math.random() * 50,  // Larger books for better readability
        })
      }

      // Create dust motes for atmosphere
      for (let i = 0; i < 60; i++) {
        dustMotes.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: Math.random() * 0.08 - 0.04,
          opacity: Math.random() * 0.25,
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

    // Labyrinth/Maze Effect - Borges-themed (Level 1) + Giant's Garden (Level 2)
    const drawLabyrinth = (time: number) => {
      const isExpanded = labyrinthExpanded.current
      const lab = labyrinth.current

      // Colors based on mode
      const wallColor = isDarkMode ? '59, 130, 246' : '146, 64, 14'
      const textColor = isDarkMode ? '147, 197, 253' : '120, 53, 15'
      const playerColor = isDarkMode ? '59, 130, 246' : '180, 83, 9'

      // Draw background
      if (isExpanded) {
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

        ctx.strokeStyle = `rgba(${wallColor}, 0.3)`
        ctx.lineWidth = 2
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)
      } else {
        const bgColor = isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(253, 251, 247, 0.85)'
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // ========== LEVEL 2: THE GIANT'S GARDEN ==========
      if (lab.level === 2) {
        const l2 = lab.level2
        const groundY = canvas.height - 60

        // Set player Y if not set
        if (l2.playerY === 0) {
          l2.playerY = groundY - 24
        }

        // Update horizontal physics (momentum)
        if (l2.playerVX !== 0) {
          l2.playerX += l2.playerVX

          // Apply friction when on ground
          if (!l2.isJumping) {
            l2.playerVX *= 0.85 // Friction
            if (Math.abs(l2.playerVX) < 0.5) l2.playerVX = 0
          }

          // Boundaries
          if (l2.playerX < 30) {
            l2.playerX = 30
            l2.playerVX = 0
          }
          const maxX = l2.giantDefeated ? canvas.width - 50 : l2.giantX - 80
          if (l2.playerX > maxX) {
            l2.playerX = maxX
            l2.playerVX = 0
          }
        }

        // Update vertical physics (jumping)
        if (l2.isJumping) {
          l2.playerVY += 0.55 // Gravity
          l2.playerY += l2.playerVY
          if (l2.playerY >= groundY - 24) {
            l2.playerY = groundY - 24
            l2.isJumping = false
            l2.playerVY = 0
            // Apply landing friction
            l2.playerVX *= 0.7
          }
        }

        // Update charge power (while holding space)
        if (l2.isCharging) {
          const chargeTime = Date.now() - l2.chargeStart
          l2.chargePower = Math.min(1, chargeTime / 1500)
        }

        // Update slash animation
        if (l2.isSlashing) {
          l2.slashFrame++
          if (l2.slashFrame > 12) {
            l2.isSlashing = false
            l2.slashFrame = 0
          }
        }

        // Update power slash animation
        if (l2.isPowerSlashing) {
          l2.powerSlashFrame++
          if (l2.powerSlashFrame > 20) {
            l2.isPowerSlashing = false
            l2.powerSlashFrame = 0
          }
        }

        // Update shield hit effect
        if (l2.shieldHit > 0) l2.shieldHit--

        // Update player hurt invincibility
        if (l2.playerHurt > 0) l2.playerHurt--

        // Update giant hurt flash
        if (l2.giantHurt > 0) l2.giantHurt--

        // Check for game over
        if (l2.playerHealth <= 0 && !l2.gameOver) {
          l2.gameOver = true
        }

        // Giant AI - attacks periodically with varied attack types
        const attackChance = l2.endlessMode ? 0.012 + (l2.waveNumber * 0.002) : 0.008
        if (!l2.giantDefeated && !l2.giantAttacking && !l2.gameOver && Math.random() < attackChance) {
          l2.giantAttacking = true
          l2.giantAttackFrame = 0
          // Choose attack type (in endless mode, more variety)
          if (l2.endlessMode) {
            const attacks: Array<'sword' | 'rock' | 'fireball' | 'lightning'> = ['sword', 'rock', 'fireball', 'lightning']
            l2.giantAttackType = attacks[Math.floor(Math.random() * attacks.length)]
          } else {
            l2.giantAttackType = 'sword'
          }
        }

        if (l2.giantAttacking) {
          l2.giantAttackFrame++

          // Different attacks trigger at different frames
          if (l2.giantAttackType === 'sword') {
            // Melee attack hits at frame 15
            if (l2.giantAttackFrame === 15 && l2.playerHurt === 0) {
              const distToPlayer = l2.giantX - l2.playerX
              if (distToPlayer > 0 && distToPlayer < 120) {
                if (l2.isShielding) {
                  l2.shieldHit = 15
                  l2.playerVX = -8
                } else {
                  l2.playerHealth--
                  l2.playerHurt = 60
                  l2.playerVX = -12
                  l2.playerY -= 5
                  l2.isJumping = true
                  l2.playerVY = -3
                }
              }
            }
          } else if (l2.giantAttackFrame === 20) {
            // Projectile attacks launch at frame 20
            const projectile = {
              x: l2.giantX - 40,
              y: groundY - 100,
              vx: -6 - (l2.waveNumber * 0.5),
              vy: l2.giantAttackType === 'lightning' ? 0 : (l2.giantAttackType === 'rock' ? -3 : -1),
              type: l2.giantAttackType as 'rock' | 'fireball' | 'lightning',
              frame: 0
            }
            l2.projectiles.push(projectile)
          }

          if (l2.giantAttackFrame > 50) {
            l2.giantAttacking = false
            l2.giantAttackFrame = 0
          }
        }

        // Update projectiles
        l2.projectiles = l2.projectiles.filter(proj => {
          proj.x += proj.vx
          proj.y += proj.vy
          proj.frame++

          // Gravity for rocks and fireballs
          if (proj.type === 'rock') proj.vy += 0.15
          if (proj.type === 'fireball') proj.vy += 0.05

          // Check collision with player
          if (l2.playerHurt === 0) {
            const dx = proj.x - l2.playerX
            const dy = proj.y - l2.playerY
            if (Math.abs(dx) < 25 && Math.abs(dy) < 25) {
              if (l2.isShielding && dx > 0) {
                // Blocked!
                l2.shieldHit = 15
                l2.playerVX = -6
                return false
              } else {
                // Hit!
                l2.playerHealth--
                l2.playerHurt = 60
                l2.playerVX = -8
                return false
              }
            }
          }

          // Remove if off screen
          return proj.x > -50 && proj.y < canvas.height + 50
        })

        // ===== GAME OVER SCREEN =====
        if (l2.gameOver) {
          // Dark overlay
          ctx.fillStyle = isDarkMode ? 'rgba(10, 5, 20, 0.95)' : 'rgba(40, 20, 10, 0.95)'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          ctx.save()
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          // Game Over text
          ctx.font = 'bold 32px monospace'
          ctx.fillStyle = isDarkMode ? 'rgba(220, 80, 80, 1)' : 'rgba(180, 60, 60, 1)'
          ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40)

          // Wave reached
          if (l2.endlessMode) {
            ctx.font = '16px monospace'
            ctx.fillStyle = isDarkMode ? 'rgba(180, 160, 200, 0.9)' : 'rgba(140, 100, 80, 0.9)'
            ctx.fillText(`Giants Defeated: ${l2.waveNumber - 1}`, canvas.width / 2, canvas.height / 2 + 10)
          }

          // Try again prompt
          ctx.font = '14px monospace'
          ctx.fillStyle = isDarkMode ? 'rgba(147, 197, 253, 0.8)' : 'rgba(146, 64, 14, 0.8)'
          ctx.fillText('Press SPACE to try again', canvas.width / 2, canvas.height / 2 + 50)

          ctx.restore()
          return
        }

        // ===== VICTORY SCREEN - CLOUDS =====
        if (l2.reachedClouds) {
          // Show keep playing button after delay
          if (l2.fadeIn > 0.8 && !l2.showKeepPlaying) {
            l2.showKeepPlaying = true
          }

          // Ethereal sky background
          const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          if (isDarkMode) {
            skyGradient.addColorStop(0, 'rgba(30, 20, 60, 1)')
            skyGradient.addColorStop(0.5, 'rgba(60, 40, 90, 1)')
            skyGradient.addColorStop(1, 'rgba(100, 70, 130, 1)')
          } else {
            skyGradient.addColorStop(0, 'rgba(135, 180, 220, 1)')
            skyGradient.addColorStop(0.5, 'rgba(200, 220, 240, 1)')
            skyGradient.addColorStop(1, 'rgba(255, 240, 220, 1)')
          }
          ctx.fillStyle = skyGradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Draw many pixel clouds
          const cloudColor = isDarkMode ? 'rgba(180, 160, 200, 0.6)' : 'rgba(255, 255, 255, 0.8)'
          const drawPixelCloud = (cx: number, cy: number, scale: number) => {
            ctx.fillStyle = cloudColor
            const ps = 4 * scale
            const cloudPixels = [
              [2,0], [3,0], [4,0],
              [1,1], [2,1], [3,1], [4,1], [5,1],
              [0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2],
              [1,3], [2,3], [3,3], [4,3], [5,3],
            ]
            cloudPixels.forEach(([px, py]) => {
              ctx.fillRect(cx + px * ps, cy + py * ps, ps, ps)
            })
          }

          // Animated clouds
          const cloudOffset = (time * 0.02) % canvas.width
          drawPixelCloud(cloudOffset - 100, 50, 2)
          drawPixelCloud(cloudOffset + 150, 120, 1.5)
          drawPixelCloud(cloudOffset + 400, 80, 2.5)
          drawPixelCloud(cloudOffset - 300, 180, 1.8)
          drawPixelCloud(cloudOffset + 600, 140, 2)

          // Fade in mystical text
          l2.fadeIn = Math.min(1, l2.fadeIn + 0.008)

          ctx.save()
          ctx.globalAlpha = l2.fadeIn
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'

          // Mystical quote - larger, italic
          ctx.font = 'italic 18px serif'
          ctx.fillStyle = isDarkMode ? 'rgba(220, 200, 240, 0.95)' : 'rgba(60, 40, 30, 0.95)'
          const text = l2.mysticalText
          const maxWidth = canvas.width - 80
          const words = text.split(' ')
          let line = ''
          let y = canvas.height / 2 - 60
          const lineHeight = 26

          words.forEach((word) => {
            const testLine = line + word + ' '
            if (ctx.measureText(testLine).width > maxWidth && line !== '') {
              ctx.fillText(line.trim(), canvas.width / 2, y)
              line = word + ' '
              y += lineHeight
            } else {
              line = testLine
            }
          })
          ctx.fillText(line.trim(), canvas.width / 2, y)

          // "Game Over?" text
          ctx.font = 'bold 24px monospace'
          ctx.fillStyle = isDarkMode ? 'rgba(180, 160, 200, 0.9)' : 'rgba(100, 70, 50, 0.9)'
          ctx.fillText('Game Over?', canvas.width / 2, y + 60)

          // "Press RETURN to keep playing" text with pulsing effect
          if (l2.showKeepPlaying) {
            const pulse = Math.sin(time * 0.005) * 0.3 + 0.7
            ctx.font = 'bold 16px monospace'
            ctx.fillStyle = isDarkMode
              ? `rgba(147, 197, 253, ${pulse})`
              : `rgba(180, 83, 9, ${pulse})`
            ctx.fillText('Press RETURN to keep playing', canvas.width / 2, y + 100)
          }

          // Small stars twinkling
          ctx.fillStyle = isDarkMode ? 'rgba(255, 255, 200, 0.8)' : 'rgba(255, 220, 100, 0.6)'
          for (let i = 0; i < 20; i++) {
            const starX = (i * 97 + time * 0.1) % canvas.width
            const starY = (i * 53) % (canvas.height / 2)
            const twinkle = Math.sin(time * 0.01 + i) * 0.5 + 0.5
            ctx.globalAlpha = l2.fadeIn * twinkle * 0.8
            ctx.fillRect(starX, starY, 2, 2)
          }

          ctx.restore()

          // Instructions
          ctx.font = '11px monospace'
          ctx.fillStyle = `rgba(${wallColor}, 0.5)`
          ctx.fillText('ESC to return | Click button to continue', 20, canvas.height - 20)
          return
        }

        // ===== CLIMBING BEANSTALK =====
        if (l2.climbingBeanstalk) {
          // Draw climbing scene
          const climbY = canvas.height - (l2.climbProgress * canvas.height * 0.8)

          // Gradient sky that changes as you climb
          const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          if (isDarkMode) {
            skyGradient.addColorStop(0, `rgba(30, 20, ${60 + l2.climbProgress * 40}, 1)`)
            skyGradient.addColorStop(1, 'rgba(15, 23, 42, 1)')
          } else {
            skyGradient.addColorStop(0, `rgba(${135 + l2.climbProgress * 50}, ${180 + l2.climbProgress * 40}, 220, 1)`)
            skyGradient.addColorStop(1, 'rgba(253, 251, 247, 1)')
          }
          ctx.fillStyle = skyGradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Draw beanstalk in center
          const beansX = canvas.width / 2
          ctx.fillStyle = isDarkMode ? 'rgba(34, 197, 94, 0.9)' : 'rgba(22, 101, 52, 0.9)'
          ctx.fillRect(beansX - 8, 0, 16, canvas.height)

          // Leaves on beanstalk
          const leafColor = isDarkMode ? 'rgba(74, 222, 128, 0.8)' : 'rgba(34, 197, 94, 0.8)'
          for (let ly = 30; ly < canvas.height; ly += 50) {
            const leafOffset = Math.sin(ly * 0.1 + time * 0.002) * 5
            ctx.fillStyle = leafColor
            // Left leaf
            ctx.beginPath()
            ctx.ellipse(beansX - 20 + leafOffset, ly, 15, 8, -0.3, 0, Math.PI * 2)
            ctx.fill()
            // Right leaf
            ctx.beginPath()
            ctx.ellipse(beansX + 20 - leafOffset, ly + 25, 15, 8, 0.3, 0, Math.PI * 2)
            ctx.fill()
          }

          // Draw climbing player (pixel art)
          const playerClimbY = climbY
          ctx.fillStyle = isDarkMode ? `rgba(${playerColor}, 1)` : `rgba(180, 83, 9, 1)`
          // Body
          ctx.fillRect(beansX - 6, playerClimbY, 12, 16)
          // Head
          ctx.fillRect(beansX - 4, playerClimbY - 8, 8, 8)
          // Arms gripping stalk
          ctx.fillRect(beansX - 12, playerClimbY + 2, 6, 4)
          ctx.fillRect(beansX + 6, playerClimbY + 2, 6, 4)

          // Progress indicator
          ctx.font = '12px monospace'
          ctx.fillStyle = `rgba(${textColor}, 0.8)`
          ctx.fillText(`Climbing... ${Math.floor(l2.climbProgress * 100)}%`, 20, 30)
          ctx.fillText('↑ to climb | ↓ to descend', 20, canvas.height - 20)

          // Clouds appearing at top
          if (l2.climbProgress > 0.6) {
            const cloudAlpha = (l2.climbProgress - 0.6) * 2.5
            ctx.fillStyle = isDarkMode ? `rgba(180, 160, 200, ${cloudAlpha * 0.5})` : `rgba(255, 255, 255, ${cloudAlpha * 0.7})`
            ctx.fillRect(0, 0, canvas.width, 100 * cloudAlpha)
          }
          return
        }

        // ===== MAIN LEVEL 2 GAMEPLAY =====
        // Draw gradient sky - use procedural colors in endless mode
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        if (l2.endlessMode && l2.skyColors.top) {
          skyGradient.addColorStop(0, l2.skyColors.top)
          skyGradient.addColorStop(1, l2.skyColors.bottom)
        } else if (isDarkMode) {
          skyGradient.addColorStop(0, 'rgba(20, 30, 50, 1)')
          skyGradient.addColorStop(1, 'rgba(15, 23, 42, 1)')
        } else {
          skyGradient.addColorStop(0, 'rgba(180, 210, 240, 1)')
          skyGradient.addColorStop(1, 'rgba(253, 251, 247, 1)')
        }
        ctx.fillStyle = skyGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw ground - use procedural colors in endless mode
        if (l2.endlessMode && l2.groundColor) {
          ctx.fillStyle = l2.groundColor
        } else {
          ctx.fillStyle = isDarkMode ? 'rgba(30, 60, 30, 1)' : 'rgba(90, 140, 70, 1)'
        }
        ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY)

        // Pixel grass - use procedural colors in endless mode
        if (l2.endlessMode && l2.grassColor) {
          ctx.fillStyle = l2.grassColor
        } else {
          ctx.fillStyle = isDarkMode ? 'rgba(50, 100, 50, 1)' : 'rgba(70, 160, 70, 1)'
        }
        for (let gx = 0; gx < canvas.width; gx += 8) {
          const grassH = 4 + Math.sin(gx * 0.3 + time * 0.002) * 2
          ctx.fillRect(gx, groundY - grassH, 4, grassH)
        }

        // Draw beanstalk if grown
        if (l2.beanstalksGrown) {
          const bsX = canvas.width - 80
          // Stalk
          ctx.fillStyle = isDarkMode ? 'rgba(34, 197, 94, 0.9)' : 'rgba(22, 101, 52, 0.9)'
          ctx.fillRect(bsX - 6, 0, 12, groundY)

          // Leaves
          const leafCol = isDarkMode ? 'rgba(74, 222, 128, 0.8)' : 'rgba(34, 197, 94, 0.8)'
          ctx.fillStyle = leafCol
          for (let ly = groundY - 40; ly > 20; ly -= 35) {
            const wave = Math.sin(time * 0.003 + ly * 0.05) * 3
            ctx.beginPath()
            ctx.ellipse(bsX - 18 + wave, ly, 12, 6, -0.4, 0, Math.PI * 2)
            ctx.fill()
            ctx.beginPath()
            ctx.ellipse(bsX + 18 - wave, ly + 18, 12, 6, 0.4, 0, Math.PI * 2)
            ctx.fill()
          }

          // Prompt to climb
          if (l2.playerX > canvas.width - 130) {
            ctx.font = '10px monospace'
            ctx.fillStyle = isDarkMode ? 'rgba(74, 222, 128, 1)' : 'rgba(22, 101, 52, 1)'
            ctx.fillText('↑ CLIMB', bsX - 20, groundY - 30)
          }
        }

        // Draw giant (pixel art style)
        if (!l2.giantDefeated) {
          const gx = l2.giantX
          const gy = groundY
          const hurtFlash = l2.giantHurt > 0 && l2.giantHurt % 4 < 2

          // Giant body color - use procedural colors in endless mode
          let giantBody: string
          let giantDark: string
          if (hurtFlash) {
            giantBody = 'rgba(255, 100, 100, 1)'
            giantDark = 'rgba(200, 80, 80, 1)'
          } else if (l2.endlessMode && l2.giantColor.body) {
            giantBody = l2.giantColor.body
            giantDark = l2.giantColor.dark
          } else {
            giantBody = isDarkMode ? 'rgba(100, 80, 120, 1)' : 'rgba(140, 100, 80, 1)'
            giantDark = isDarkMode ? 'rgba(70, 50, 90, 1)' : 'rgba(100, 70, 50, 1)'
          }

          ctx.fillStyle = giantBody

          // Legs (pixel blocks)
          ctx.fillRect(gx - 25, gy - 50, 18, 50)
          ctx.fillRect(gx + 7, gy - 50, 18, 50)

          // Body
          ctx.fillRect(gx - 30, gy - 120, 60, 70)

          // Arms
          ctx.fillRect(gx - 50, gy - 110, 20, 50)
          ctx.fillRect(gx + 30, gy - 110, 20, 50)

          // Head
          ctx.fillRect(gx - 20, gy - 160, 40, 40)

          // Face details
          ctx.fillStyle = giantDark
          // Eyes
          ctx.fillRect(gx - 12, gy - 150, 8, 8)
          ctx.fillRect(gx + 4, gy - 150, 8, 8)
          // Angry eyebrows
          ctx.fillRect(gx - 14, gy - 155, 12, 3)
          ctx.fillRect(gx + 2, gy - 155, 12, 3)
          // Mouth
          ctx.fillRect(gx - 8, gy - 130, 16, 6)

          // Health bar
          ctx.fillStyle = 'rgba(60, 60, 60, 0.8)'
          ctx.fillRect(gx - 30, gy - 175, 60, 8)
          ctx.fillStyle = 'rgba(220, 60, 60, 1)'
          ctx.fillRect(gx - 30, gy - 175, 60 * (l2.giantHealth / l2.giantMaxHealth), 8)

          // Giant attack animation - arm swipe
          if (l2.giantAttacking) {
            const attackProgress = l2.giantAttackFrame / 40
            ctx.fillStyle = giantBody
            // Attacking arm swings out
            const armAngle = Math.sin(attackProgress * Math.PI) * 0.8
            ctx.save()
            ctx.translate(gx - 50, gy - 90)
            ctx.rotate(-armAngle)
            ctx.fillRect(0, -10, -40, 20)
            ctx.restore()

            // Attack warning/effect
            if (l2.giantAttackFrame > 10 && l2.giantAttackFrame < 20) {
              ctx.strokeStyle = 'rgba(255, 100, 100, 0.6)'
              ctx.lineWidth = 4
              ctx.beginPath()
              ctx.arc(gx - 70, gy - 80, 50, 0.5, 2.5)
              ctx.stroke()
            }
          }
        } else if (!l2.beanstalksGrown) {
          // Giant defeated, falling apart animation
          ctx.font = 'bold 16px monospace'
          ctx.fillStyle = isDarkMode ? 'rgba(147, 197, 253, 1)' : 'rgba(146, 64, 14, 1)'
          ctx.fillText('The giant falls...', l2.giantX - 50, groundY - 100)
        }

        // Draw player (pixel art hero)
        const px = l2.playerX
        const py = l2.playerY
        const facing = l2.facingRight ? 1 : -1

        // Body color
        ctx.fillStyle = isDarkMode ? `rgba(147, 197, 253, 1)` : `rgba(180, 83, 9, 1)`

        // Legs
        ctx.fillRect(px - 6, py + 12, 5, 12)
        ctx.fillRect(px + 1, py + 12, 5, 12)

        // Body
        ctx.fillRect(px - 7, py, 14, 14)

        // Head
        ctx.fillRect(px - 5, py - 10, 10, 10)

        // Arm + Sword/Shield
        if (l2.isShielding) {
          // Shield stance
          ctx.fillStyle = isDarkMode ? `rgba(147, 197, 253, 1)` : `rgba(180, 83, 9, 1)`
          ctx.fillRect(px + facing * 5, py + 2, 6 * facing, 5)

          // Shield
          const shieldFlash = l2.shieldHit > 0 && l2.shieldHit % 4 < 2
          ctx.fillStyle = shieldFlash
            ? 'rgba(255, 255, 100, 1)'
            : isDarkMode ? 'rgba(100, 140, 180, 1)' : 'rgba(120, 90, 60, 1)'
          ctx.fillRect(px + facing * 10, py - 8, 8, 24)
          // Shield border
          ctx.fillStyle = shieldFlash
            ? 'rgba(255, 200, 50, 1)'
            : isDarkMode ? 'rgba(70, 100, 140, 1)' : 'rgba(90, 60, 30, 1)'
          ctx.fillRect(px + facing * 10, py - 8, 2, 24)
          ctx.fillRect(px + facing * 10, py - 8, 8, 2)
          ctx.fillRect(px + facing * 10, py + 14, 8, 2)

          // Shield emblem (small cross)
          ctx.fillStyle = isDarkMode ? 'rgba(200, 200, 220, 0.7)' : 'rgba(180, 140, 100, 0.7)'
          ctx.fillRect(px + facing * 12, py, 4, 2)
          ctx.fillRect(px + facing * 13, py - 2, 2, 6)
        } else if (l2.isPowerSlashing) {
          // Power slash animation - bigger, more dramatic
          const slashAngle = (l2.powerSlashFrame / 20) * Math.PI * 1.2 - Math.PI * 0.6
          ctx.save()
          ctx.translate(px + facing * 5, py + 4)
          ctx.rotate(slashAngle * facing)

          // Arm
          ctx.fillStyle = isDarkMode ? `rgba(147, 197, 253, 1)` : `rgba(180, 83, 9, 1)`
          ctx.fillRect(0, -3, 14, 7)

          // Glowing sword
          ctx.fillStyle = isDarkMode ? 'rgba(255, 220, 100, 1)' : 'rgba(255, 200, 50, 1)'
          ctx.fillRect(12, -3, 35, 6)
          // Sword glow
          ctx.fillStyle = isDarkMode ? 'rgba(255, 220, 100, 0.4)' : 'rgba(255, 200, 50, 0.4)'
          ctx.fillRect(12, -6, 35, 12)
          // Hilt
          ctx.fillStyle = isDarkMode ? 'rgba(220, 180, 80, 1)' : 'rgba(180, 140, 60, 1)'
          ctx.fillRect(8, -6, 5, 12)

          // Power slash arc effect
          ctx.strokeStyle = isDarkMode ? 'rgba(255, 220, 100, 0.8)' : 'rgba(255, 180, 50, 0.8)'
          ctx.lineWidth = 6
          ctx.beginPath()
          ctx.arc(0, 0, 50, -Math.PI * 0.6, slashAngle, false)
          ctx.stroke()

          // Sparkles
          for (let i = 0; i < 5; i++) {
            const sparkAngle = slashAngle - (i * 0.2)
            const sparkDist = 40 + i * 5
            ctx.fillStyle = `rgba(255, 255, 200, ${0.8 - i * 0.15})`
            ctx.fillRect(
              Math.cos(sparkAngle) * sparkDist - 2,
              Math.sin(sparkAngle) * sparkDist - 2,
              4, 4
            )
          }

          ctx.restore()
        } else if (l2.isSlashing) {
          // Normal slashing animation
          const slashAngle = (l2.slashFrame / 12) * Math.PI * 0.8 - Math.PI * 0.4
          ctx.save()
          ctx.translate(px + facing * 5, py + 4)
          ctx.rotate(slashAngle * facing)

          // Arm
          ctx.fillStyle = isDarkMode ? `rgba(147, 197, 253, 1)` : `rgba(180, 83, 9, 1)`
          ctx.fillRect(0, -3, 12, 6)

          // Sword
          ctx.fillStyle = isDarkMode ? 'rgba(200, 200, 220, 1)' : 'rgba(180, 180, 200, 1)'
          ctx.fillRect(10, -2, 25, 4)
          // Hilt
          ctx.fillStyle = isDarkMode ? 'rgba(180, 140, 60, 1)' : 'rgba(140, 100, 40, 1)'
          ctx.fillRect(8, -5, 4, 10)

          // Slash effect
          ctx.strokeStyle = isDarkMode ? 'rgba(200, 200, 255, 0.6)' : 'rgba(255, 220, 150, 0.6)'
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.arc(0, 0, 35, -Math.PI * 0.5, slashAngle, false)
          ctx.stroke()

          ctx.restore()
        } else if (l2.isCharging) {
          // Charging stance - sword raised back
          ctx.fillStyle = isDarkMode ? `rgba(147, 197, 253, 1)` : `rgba(180, 83, 9, 1)`
          ctx.save()
          ctx.translate(px + facing * 5, py + 4)
          ctx.rotate(-0.5 * facing) // Sword raised back

          ctx.fillRect(0, -3, 12, 6)

          // Sword charging glow based on charge level
          const chargeGlow = l2.chargePower
          if (chargeGlow >= 0.8) {
            ctx.fillStyle = isDarkMode ? 'rgba(255, 220, 100, 1)' : 'rgba(255, 200, 50, 1)'
          } else {
            ctx.fillStyle = isDarkMode
              ? `rgba(${200 + chargeGlow * 55}, ${200 + chargeGlow * 20}, ${220 - chargeGlow * 120}, 1)`
              : `rgba(${180 + chargeGlow * 75}, ${180 - chargeGlow * 80}, ${200 - chargeGlow * 150}, 1)`
          }
          ctx.fillRect(10, -2, 25, 4)
          ctx.fillStyle = isDarkMode ? 'rgba(180, 140, 60, 1)' : 'rgba(140, 100, 40, 1)'
          ctx.fillRect(8, -5, 4, 10)

          ctx.restore()

          // Charge meter above player
          ctx.fillStyle = 'rgba(60, 60, 60, 0.8)'
          ctx.fillRect(px - 15, py - 25, 30, 6)
          const meterColor = l2.chargePower >= 0.8
            ? 'rgba(255, 200, 50, 1)'
            : isDarkMode ? 'rgba(147, 197, 253, 1)' : 'rgba(180, 83, 9, 1)'
          ctx.fillStyle = meterColor
          ctx.fillRect(px - 15, py - 25, 30 * l2.chargePower, 6)
          // "POWER" text when fully charged
          if (l2.chargePower >= 0.8) {
            ctx.font = 'bold 8px monospace'
            ctx.fillStyle = 'rgba(255, 200, 50, 1)'
            ctx.fillText('POWER!', px - 14, py - 30)
          }
        } else {
          // Idle arm with sword
          ctx.fillStyle = isDarkMode ? `rgba(147, 197, 253, 1)` : `rgba(180, 83, 9, 1)`
          ctx.fillRect(px + facing * 6, py + 2, 8 * facing, 5)

          // Sword pointing forward
          ctx.fillStyle = isDarkMode ? 'rgba(200, 200, 220, 1)' : 'rgba(180, 180, 200, 1)'
          ctx.fillRect(px + facing * 12, py + 3, 18 * facing, 3)
          ctx.fillStyle = isDarkMode ? 'rgba(180, 140, 60, 1)' : 'rgba(140, 100, 40, 1)'
          ctx.fillRect(px + facing * 10, py, 3, 8)
        }

        // Draw projectiles
        l2.projectiles.forEach(proj => {
          ctx.save()
          if (proj.type === 'rock') {
            // Gray rock
            ctx.fillStyle = 'rgba(100, 90, 80, 1)'
            ctx.beginPath()
            ctx.arc(proj.x, proj.y, 12, 0, Math.PI * 2)
            ctx.fill()
            // Rock texture
            ctx.fillStyle = 'rgba(80, 70, 60, 1)'
            ctx.fillRect(proj.x - 4, proj.y - 3, 5, 4)
            ctx.fillRect(proj.x + 1, proj.y + 1, 4, 3)
          } else if (proj.type === 'fireball') {
            // Orange/red fireball
            const fireGradient = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, 15)
            fireGradient.addColorStop(0, 'rgba(255, 255, 100, 1)')
            fireGradient.addColorStop(0.4, 'rgba(255, 150, 50, 1)')
            fireGradient.addColorStop(1, 'rgba(200, 50, 0, 0.3)')
            ctx.fillStyle = fireGradient
            ctx.beginPath()
            ctx.arc(proj.x, proj.y, 15, 0, Math.PI * 2)
            ctx.fill()
            // Fire trail
            ctx.fillStyle = 'rgba(255, 100, 0, 0.5)'
            for (let i = 0; i < 3; i++) {
              ctx.fillRect(proj.x + 10 + i * 8, proj.y - 4 + Math.sin(proj.frame * 0.3 + i) * 4, 6, 8)
            }
          } else if (proj.type === 'lightning') {
            // Lightning bolt
            ctx.strokeStyle = 'rgba(200, 220, 255, 1)'
            ctx.lineWidth = 4
            ctx.beginPath()
            ctx.moveTo(proj.x, proj.y - 15)
            ctx.lineTo(proj.x - 5, proj.y - 5)
            ctx.lineTo(proj.x + 5, proj.y - 5)
            ctx.lineTo(proj.x - 3, proj.y + 5)
            ctx.lineTo(proj.x + 8, proj.y + 5)
            ctx.lineTo(proj.x, proj.y + 15)
            ctx.stroke()
            // Glow
            ctx.strokeStyle = 'rgba(150, 180, 255, 0.4)'
            ctx.lineWidth = 10
            ctx.stroke()
          }
          ctx.restore()
        })

        // UI
        ctx.font = 'bold 14px monospace'
        ctx.fillStyle = isDarkMode ? 'rgba(147, 197, 253, 0.9)' : 'rgba(120, 53, 15, 0.9)'
        const titleText = l2.endlessMode ? `WAVE ${l2.waveNumber}: THE GIANT'S GARDEN` : 'LEVEL 2: THE GIANT\'S GARDEN'
        ctx.fillText(titleText, 20, 30)

        // Health hearts
        const heartSize = 16
        const heartSpacing = 20
        const heartsX = canvas.width - 20 - (l2.playerMaxHealth * heartSpacing)
        for (let i = 0; i < l2.playerMaxHealth; i++) {
          const hx = heartsX + i * heartSpacing
          const hy = 22
          if (i < l2.playerHealth) {
            // Full heart - red
            ctx.fillStyle = 'rgba(220, 60, 80, 1)'
          } else {
            // Empty heart - gray
            ctx.fillStyle = 'rgba(100, 100, 100, 0.5)'
          }
          // Draw pixel heart shape
          ctx.fillRect(hx + 2, hy, 4, 4)
          ctx.fillRect(hx + 10, hy, 4, 4)
          ctx.fillRect(hx, hy + 4, 16, 4)
          ctx.fillRect(hx + 2, hy + 8, 12, 4)
          ctx.fillRect(hx + 4, hy + 12, 8, 4)
          ctx.fillRect(hx + 6, hy + 16, 4, 2)
        }

        // Instructions
        ctx.font = '11px monospace'
        ctx.fillStyle = `rgba(${wallColor}, 0.6)`
        if (!l2.giantDefeated) {
          ctx.fillText('← → move | ↑ jump | Hold SPACE: power slash | X: shield', 20, canvas.height - 20)
        } else if (l2.beanstalksGrown) {
          ctx.fillText('← → to move | Approach beanstalk and press ↑ to climb', 20, canvas.height - 20)
        } else {
          ctx.fillText('A beanstalk grows from the giant\'s remains...', 20, canvas.height - 20)
        }

        return
      }

      // ========== LEVEL 1: THE LABYRINTH ==========
      // Initialize maze if needed or reset requested
      if (lab.maze.length === 0 || resetLabyrinth.current) {
        initLabyrinth()
        if (resetLabyrinth.current) {
          resetLabyrinth.current = false
          // Also reset level
          lab.level = 1
          lab.solved = false
        }
      }

      const cellSize = 20
      const mazeWidth = lab.maze[0].length * cellSize
      const baseOffsetX = (canvas.width - mazeWidth) / 2
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
            ctx.fillStyle = `rgba(${wallColor}, 0.3)`
            ctx.fillRect(px, py, cellSize, cellSize)
            ctx.fillStyle = `rgba(${wallColor}, 0.6)`
            ctx.fillText('█', px + 3, py + 15)
          } else if (cell === 2 && !lab.collected.has(`${x},${y}`)) {
            ctx.fillStyle = 'rgba(251, 191, 36, 0.8)'
            ctx.fillText('📖', px + 2, py + 15)
          } else if (cell === 3 && !lab.collected.has(`${x},${y}`)) {
            ctx.fillStyle = 'rgba(251, 191, 36, 0.8)'
            ctx.fillText('🗝', px + 2, py + 15)
          } else if (cell === 4 && !lab.collected.has(`${x},${y}`)) {
            ctx.fillStyle = isDarkMode ? 'rgba(147, 197, 253, 0.8)' : 'rgba(30, 64, 175, 0.8)'
            ctx.fillText('🪞', px + 2, py + 15)
          } else if (cell === 5) {
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
      ctx.fillText('Inventory:', 20, 30)
      let invY = 50
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
        ? 'Arrow keys to move | Find 3 artifacts to unlock exit | ESC to close'
        : 'Arrow keys to move | Find 3 artifacts | Click header banner to make it disappear'
      ctx.fillText(instructions, 20, canvas.height - 20)

      // Level indicator
      ctx.font = 'bold 12px monospace'
      ctx.fillStyle = `rgba(${textColor}, 0.7)`
      ctx.fillText('LEVEL 1: THE LABYRINTH', 20, canvas.height - 40)
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

      // Font families based on era
      // Ancient: classical serif (Times-like)
      // Medieval: blackletter-style (approximated with bold serif)
      // Modern: elegant transitional serif (Georgia-like)
      const getFontForEra = (era: string, size: number, style: 'normal' | 'italic' = 'normal') => {
        const styleStr = style === 'italic' ? 'italic ' : ''
        if (era === 'ancient') {
          return `${styleStr}${size}px "Times New Roman", Times, serif`
        } else if (era === 'medieval') {
          return `${styleStr}bold ${size}px "Palatino Linotype", Palatino, "Book Antiqua", serif`
        } else {
          return `${styleStr}${size}px Georgia, "Cambria", serif`
        }
      }

      // Update and draw books
      books.current.forEach((book) => {
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
        book.hovered = distance < book.size * 1.8

        // Animate opening/closing
        if (book.hovered) {
          book.openProgress = Math.min(1, book.openProgress + 0.04)
          if (!wasHovered && !book.open) {
            book.open = true
          }
        } else {
          book.openProgress = Math.max(0, book.openProgress - 0.025)
          if (book.openProgress === 0) {
            book.open = false
          }
        }

        const era = book.era || 'modern'

        ctx.save()
        ctx.translate(book.x, book.y)
        ctx.rotate(book.rotation * (1 - book.openProgress * 0.85))

        // Draw book/scroll/manuscript
        if (book.type === 'book') {
          // Book spine with era-appropriate color
          const baseOpacity = 0.65 + book.openProgress * 0.3
          const spineColor = era === 'ancient' ? `rgba(120, 80, 50, ${baseOpacity})`
            : era === 'medieval' ? `rgba(100, 50, 40, ${baseOpacity})`
            : `rgba(139, 92, 46, ${baseOpacity})`
          ctx.fillStyle = spineColor
          ctx.fillRect(-book.size / 2, -book.size / 2, book.size, book.size * 1.4)

          // Spine decoration
          ctx.fillStyle = `rgba(180, 150, 100, ${baseOpacity * 0.5})`
          ctx.fillRect(-book.size / 2 + 5, -book.size / 2, 3, book.size * 1.4)

          // Book pages opening - wider spread
          if (book.openProgress > 0) {
            const pageSpread = book.size * 1.3 * book.openProgress
            const pageColor = era === 'ancient' ? `rgba(235, 225, 195, ${0.92 * book.openProgress})`
              : era === 'medieval' ? `rgba(245, 235, 210, ${0.92 * book.openProgress})`
              : `rgba(250, 245, 235, ${0.92 * book.openProgress})`
            ctx.fillStyle = pageColor
            ctx.fillRect(-pageSpread / 2, -book.size / 2, pageSpread, book.size * 1.4)

            // Page edge lines for realism
            ctx.strokeStyle = `rgba(180, 160, 130, ${0.3 * book.openProgress})`
            ctx.lineWidth = 0.5
            for (let i = 1; i < 4; i++) {
              ctx.beginPath()
              ctx.moveTo(-pageSpread / 2 + i * 2, -book.size / 2 + 5)
              ctx.lineTo(-pageSpread / 2 + i * 2, book.size * 0.9 - 5)
              ctx.stroke()
            }

            // Draw quote on pages with era-appropriate font
            ctx.fillStyle = `rgba(40, 30, 20, ${book.openProgress})`
            const fontSize = 11 + book.openProgress * 3
            ctx.font = getFontForEra(era, fontSize)
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            // Wrap text with better line spacing
            const words = book.quote.split(' ')
            let line = ''
            let y = -book.size * 0.25
            const lineHeight = fontSize * 1.5
            const maxWidth = pageSpread * 0.85
            words.forEach((word: string) => {
              const testLine = line + word + ' '
              if (ctx.measureText(testLine).width > maxWidth && line !== '') {
                ctx.fillText(line.trim(), 0, y)
                line = word + ' '
                y += lineHeight
              } else {
                line = testLine
              }
            })
            ctx.fillText(line.trim(), 0, y)

            // Draw author with elegant styling
            ctx.font = getFontForEra(era, fontSize * 0.75, 'italic')
            ctx.fillStyle = `rgba(80, 60, 40, ${book.openProgress * 0.9})`
            ctx.fillText(`— ${book.author}`, 0, y + lineHeight * 1.3)
          }
        } else if (book.type === 'scroll') {
          // Scroll with papyrus-like appearance - wider for better readability
          const scrollLength = book.size * (1.2 + book.openProgress * 2.2)
          const scrollWidth = book.size * (0.9 + book.openProgress * 0.4)

          // Papyrus color varies by era
          const papyrusColor = era === 'ancient' ? `rgba(210, 190, 150, ${0.75 + book.openProgress * 0.2})`
            : `rgba(220, 200, 170, ${0.75 + book.openProgress * 0.2})`
          ctx.fillStyle = papyrusColor
          ctx.fillRect(-scrollWidth / 2, -scrollLength / 2, scrollWidth, scrollLength)

          // Scroll texture lines
          ctx.strokeStyle = `rgba(180, 160, 130, ${0.15 + book.openProgress * 0.1})`
          ctx.lineWidth = 0.5
          for (let i = -scrollLength / 2 + 10; i < scrollLength / 2 - 10; i += 8) {
            ctx.beginPath()
            ctx.moveTo(-scrollWidth / 2 + 5, i)
            ctx.lineTo(scrollWidth / 2 - 5, i)
            ctx.stroke()
          }

          // Scroll rollers (wooden dowels)
          ctx.fillStyle = `rgba(90, 60, 35, 0.8)`
          ctx.fillRect(-scrollWidth / 2 - 4, -scrollLength / 2 - 8, scrollWidth + 8, 8)
          ctx.fillRect(-scrollWidth / 2 - 4, scrollLength / 2, scrollWidth + 8, 8)

          // Roller ends
          ctx.fillStyle = `rgba(70, 45, 25, 0.9)`
          ctx.beginPath()
          ctx.arc(-scrollWidth / 2 - 4, -scrollLength / 2 - 4, 6, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(scrollWidth / 2 + 4, -scrollLength / 2 - 4, 6, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(-scrollWidth / 2 - 4, scrollLength / 2 + 4, 6, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.arc(scrollWidth / 2 + 4, scrollLength / 2 + 4, 6, 0, Math.PI * 2)
          ctx.fill()

          if (book.openProgress > 0.25) {
            ctx.fillStyle = `rgba(35, 25, 15, ${book.openProgress})`
            const fontSize = 10 + book.openProgress * 2
            ctx.font = getFontForEra(era, fontSize)
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            const words = book.quote.split(' ')
            let line = ''
            let y = -scrollLength / 3.5
            const lineHeight = fontSize * 1.4
            const maxWidth = scrollWidth * 0.85
            words.forEach((word: string) => {
              const testLine = line + word + ' '
              if (ctx.measureText(testLine).width > maxWidth && line !== '') {
                ctx.fillText(line.trim(), 0, y)
                line = word + ' '
                y += lineHeight
              } else {
                line = testLine
              }
            })
            ctx.fillText(line.trim(), 0, y)
            ctx.font = getFontForEra(era, fontSize * 0.7, 'italic')
            ctx.fillStyle = `rgba(60, 45, 25, ${book.openProgress * 0.85})`
            ctx.fillText(`— ${book.author}`, 0, scrollLength / 3.5)
          }
        } else {
          // Manuscript/illuminated pages with ornate border
          const pageWidth = book.size * (0.8 + book.openProgress * 0.7)
          const pageHeight = book.size * 1.35

          // Vellum/parchment color
          const vellumColor = era === 'medieval' ? `rgba(248, 240, 218, ${0.88 + book.openProgress * 0.1})`
            : era === 'ancient' ? `rgba(238, 228, 198, ${0.88 + book.openProgress * 0.1})`
            : `rgba(252, 248, 240, ${0.88 + book.openProgress * 0.1})`
          ctx.fillStyle = vellumColor
          ctx.fillRect(-pageWidth / 2, -pageHeight / 2, pageWidth, pageHeight)

          // Ornate double border
          const borderColor = era === 'medieval' ? `rgba(160, 90, 40, ${0.6 + book.openProgress * 0.35})`
            : `rgba(140, 100, 50, ${0.5 + book.openProgress * 0.35})`
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 2
          ctx.strokeRect(-pageWidth / 2 + 8, -pageHeight / 2 + 8, pageWidth - 16, pageHeight - 16)
          ctx.lineWidth = 1
          ctx.strokeRect(-pageWidth / 2 + 12, -pageHeight / 2 + 12, pageWidth - 24, pageHeight - 24)

          // Decorative corner flourishes for medieval
          if (era === 'medieval' && book.openProgress > 0.3) {
            ctx.fillStyle = `rgba(180, 120, 60, ${book.openProgress * 0.6})`
            const cornerSize = 8
            // Top-left
            ctx.fillRect(-pageWidth / 2 + 8, -pageHeight / 2 + 8, cornerSize, 2)
            ctx.fillRect(-pageWidth / 2 + 8, -pageHeight / 2 + 8, 2, cornerSize)
            // Top-right
            ctx.fillRect(pageWidth / 2 - 8 - cornerSize, -pageHeight / 2 + 8, cornerSize, 2)
            ctx.fillRect(pageWidth / 2 - 10, -pageHeight / 2 + 8, 2, cornerSize)
            // Bottom-left
            ctx.fillRect(-pageWidth / 2 + 8, pageHeight / 2 - 10, cornerSize, 2)
            ctx.fillRect(-pageWidth / 2 + 8, pageHeight / 2 - 8 - cornerSize, 2, cornerSize)
            // Bottom-right
            ctx.fillRect(pageWidth / 2 - 8 - cornerSize, pageHeight / 2 - 10, cornerSize, 2)
            ctx.fillRect(pageWidth / 2 - 10, pageHeight / 2 - 8 - cornerSize, 2, cornerSize)
          }

          if (book.openProgress > 0.15) {
            ctx.fillStyle = `rgba(35, 25, 15, ${book.openProgress})`
            const fontSize = 11 + book.openProgress * 2
            ctx.font = getFontForEra(era, fontSize)
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            const words = book.quote.split(' ')
            let line = ''
            let y = -pageHeight / 3.5
            const lineHeight = fontSize * 1.45
            const maxWidth = pageWidth * 0.78
            words.forEach((word: string) => {
              const testLine = line + word + ' '
              if (ctx.measureText(testLine).width > maxWidth && line !== '') {
                ctx.fillText(line.trim(), 0, y)
                line = word + ' '
                y += lineHeight
              } else {
                line = testLine
              }
            })
            ctx.fillText(line.trim(), 0, y)
            ctx.font = getFontForEra(era, fontSize * 0.75, 'italic')
            ctx.fillStyle = `rgba(70, 50, 30, ${book.openProgress * 0.9})`
            ctx.fillText(`— ${book.author}`, 0, y + lineHeight * 1.4)
          }
        }

        // Glow effect when hovered - warmer, more subtle
        if (book.hovered) {
          ctx.shadowBlur = 25 * book.openProgress
          ctx.shadowColor = era === 'ancient' ? 'rgba(255, 200, 120, 0.7)'
            : era === 'medieval' ? 'rgba(255, 180, 100, 0.7)'
            : 'rgba(255, 220, 150, 0.75)'
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
      // Skip rendering when off-screen to save CPU/battery
      if (!isVisible.current) {
        animationFrameId.current = requestAnimationFrame(animate)
        return
      }

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
      window.removeEventListener('keyup', handleKeyUp)
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
         '> Or try typing "game"',
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

  // Listen for cycle background event from navigation
  useEffect(() => {
    const handleCycleBackground = () => {
      cycleMode()
    }

    window.addEventListener('THINK_cycleBackground', handleCycleBackground)
    return () => {
      window.removeEventListener('THINK_cycleBackground', handleCycleBackground)
    }
  }, [mode]) // Include mode dependency since cycleMode uses it

  const renderControls = () => {
    // Adaptive button styling for light/dark mode - compact sizing
    const buttonClass = isDarkMode
      ? "px-2 py-1 text-[10px] rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white whitespace-nowrap"
      : "px-2 py-1 text-[10px] rounded bg-amber-900/10 hover:bg-amber-900/20 backdrop-blur-sm border border-amber-900/20 transition-colors text-amber-900 whitespace-nowrap"

    // Horizontal layout with smaller gap
    const containerClass = isDarkMode
      ? "flex flex-row gap-1 bg-black/40 backdrop-blur-md rounded-lg p-1.5 border border-white/10"
      : "flex flex-row gap-1 bg-white/60 backdrop-blur-md rounded-lg p-1.5 border border-amber-200/50 shadow-sm"

    return (
      // Mobile: bottom-2 right-2, Desktop: bottom-3 right-3
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-20 flex flex-row gap-1.5 pointer-events-auto">
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
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-[10000] flex flex-row gap-1.5 pointer-events-auto">
            {isExpanded ? (
              // Expanded mode controls - adaptive for light/dark, horizontal layout
              <>
                {mode === 'terminal' && (
                  <div className={isDarkMode
                    ? "flex flex-row gap-1 bg-black/40 backdrop-blur-md rounded-lg p-1.5 border border-white/10"
                    : "flex flex-row gap-1 bg-white/60 backdrop-blur-md rounded-lg p-1.5 border border-amber-200/50 shadow-sm"
                  }>
                    <button onClick={(e) => { e.stopPropagation(); terminalColorScheme.current = terminalColorScheme.current === 'blue' ? 'green' : terminalColorScheme.current === 'green' ? 'amber' : 'blue'; forceUpdate(n => n + 1); }} className={isDarkMode
                      ? "px-2 py-1 text-[10px] rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white whitespace-nowrap"
                      : "px-2 py-1 text-[10px] rounded bg-amber-900/10 hover:bg-amber-900/20 backdrop-blur-sm border border-amber-900/20 transition-colors text-amber-900 whitespace-nowrap"
                    }>
                      Color: {terminalColorScheme.current}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); terminalHistory.current = ['']; }} className={isDarkMode
                      ? "px-2 py-1 text-[10px] rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white whitespace-nowrap"
                      : "px-2 py-1 text-[10px] rounded bg-amber-900/10 hover:bg-amber-900/20 backdrop-blur-sm border border-amber-900/20 transition-colors text-amber-900 whitespace-nowrap"
                    }>
                      Clear
                    </button>
                  </div>
                )}
                {mode === 'labyrinth' && (
                  <div className={isDarkMode
                    ? "flex flex-row gap-1 bg-black/40 backdrop-blur-md rounded-lg p-1.5 border border-white/10"
                    : "flex flex-row gap-1 bg-white/60 backdrop-blur-md rounded-lg p-1.5 border border-amber-200/50 shadow-sm"
                  }>
                    <button onClick={(e) => { e.stopPropagation(); resetLabyrinth.current = true; }} className={isDarkMode
                      ? "px-2 py-1 text-[10px] rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white whitespace-nowrap"
                      : "px-2 py-1 text-[10px] rounded bg-amber-900/10 hover:bg-amber-900/20 backdrop-blur-sm border border-amber-900/20 transition-colors text-amber-900 whitespace-nowrap"
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
