'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Maximize2, Minimize2 } from 'lucide-react'

// Borges quotes for atmosphere
const BORGES_FRAGMENTS = [
  'Time forks perpetually toward innumerable futures...',
  'The visible universe was an illusion or a sophism...',
  'The composition of vast books is a laborious and impoverishing extravagance...',
  'Mirrors and copulation are abominable, for they multiply the numbers of man...',
  'I foresee that man will resign himself each day to new abominations...',
  'In that single gigantic instant I saw millions of acts...',
  'The Aleph was probably two or three centimeters in diameter...',
  'Every language is an alphabet of symbols...',
  'Writing is nothing more than a guided dream...',
  'Reality favors symmetries and slight anachronisms...'
]

export function BorgesianMaze() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const animationFrameId = useRef<number | undefined>(undefined)

  // Enhanced labyrinth state with two levels
  const labyrinth = useRef({
    playerX: 1,
    playerY: 1,
    currentLevel: 0, // 0 = surface, 1 = depths
    mazeUpper: [] as number[][],
    mazeLower: [] as number[][],
    collected: new Set<string>(),
    foundFragments: new Set<string>(),

    // Artifacts
    hasBook: false,
    hasKey: false,
    hasMirror: false,
    hasAleph: false,
    hasClock: false,
    hasInfiniteBook: false,

    // State
    solved: false,
    message: 'The labyrinth awaits. Two levels. Six artifacts. One truth.',
    messageTime: 0,
    currentFragment: '',
    fragmentTime: 0
  })

  // Generate more complex maze
  const generateMaze = (width: number, height: number, complexity = 0.7) => {
    const maze: number[][] = Array(height).fill(0).map(() => Array(width).fill(1))

    // Recursive backtracking with occasional loops
    const carve = (x: number, y: number, createLoops = false) => {
      const dirs = [[0, -2], [2, 0], [0, 2], [-2, 0]].sort(() => Math.random() - 0.5)
      maze[y][x] = 0

      for (const [dx, dy] of dirs) {
        const nx = x + dx
        const ny = y + dy
        if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1) {
          if (maze[ny][nx] === 1 || (createLoops && Math.random() < 0.15)) {
            maze[y + dy/2][x + dx/2] = 0
            if (maze[ny][nx] === 1) {
              carve(nx, ny, createLoops)
            }
          }
        }
      }
    }

    carve(1, 1, complexity > 0.5)

    // Add some open areas for atmosphere
    const openAreas = Math.floor(complexity * 3)
    for (let i = 0; i < openAreas; i++) {
      const cx = Math.floor(Math.random() * (width - 6)) + 3
      const cy = Math.floor(Math.random() * (height - 6)) + 3
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (cx + dx > 0 && cx + dx < width - 1 && cy + dy > 0 && cy + dy < height - 1) {
            maze[cy + dy][cx + dx] = 0
          }
        }
      }
    }

    return maze
  }

  // Initialize the two-level labyrinth
  const initLabyrinth = () => {
    const width = 35
    const height = 23

    // Generate both levels with different complexity
    const mazeUpper = generateMaze(width, height, 0.6)
    const mazeLower = generateMaze(width, height, 0.8)

    // Place items on UPPER level
    // 2 = Book, 3 = Key, 4 = Mirror, 6 = Stairs Down, 7 = Literary Fragment
    const placeItem = (maze: number[][], value: number, count = 1) => {
      let placed = 0
      let attempts = 0
      while (placed < count && attempts < 100) {
        attempts++
        const x = Math.floor(Math.random() * (width - 4)) + 2
        const y = Math.floor(Math.random() * (height - 4)) + 2
        if (maze[y][x] === 0 && (x !== 1 || y !== 1)) {
          maze[y][x] = value
          placed++
        }
      }
    }

    // Upper level items
    placeItem(mazeUpper, 2) // Library of Babel book
    placeItem(mazeUpper, 3) // Key
    placeItem(mazeUpper, 4) // Mirror
    placeItem(mazeUpper, 6, 2) // Stairs down (2 locations)
    placeItem(mazeUpper, 7, 5) // Literary fragments

    // Lower level items
    // 8 = Aleph, 9 = Infinite Book, 10 = Clock (Tlön), 11 = Stairs Up, 12 = Exit
    placeItem(mazeLower, 8) // The Aleph
    placeItem(mazeLower, 9) // Infinite Book
    placeItem(mazeLower, 10) // Time-Clock
    placeItem(mazeLower, 11, 2) // Stairs up
    placeItem(mazeLower, 7, 5) // More fragments

    // Place exit in lower level
    mazeLower[height - 2][width - 2] = 12

    labyrinth.current.mazeUpper = mazeUpper
    labyrinth.current.mazeLower = mazeLower
    labyrinth.current.playerX = 1
    labyrinth.current.playerY = 1
    labyrinth.current.currentLevel = 0
    labyrinth.current.collected = new Set()
    labyrinth.current.foundFragments = new Set()
    labyrinth.current.hasBook = false
    labyrinth.current.hasKey = false
    labyrinth.current.hasMirror = false
    labyrinth.current.hasAleph = false
    labyrinth.current.hasClock = false
    labyrinth.current.hasInfiniteBook = false
    labyrinth.current.solved = false
    labyrinth.current.message = 'Surface level. Seek the stairs to descend into the depths...'
    labyrinth.current.messageTime = Date.now()
    labyrinth.current.currentFragment = ''
    labyrinth.current.fragmentTime = 0
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Keyboard handler
    const handleKeyDown = (e: KeyboardEvent) => {
      const lab = labyrinth.current
      const currentMaze = lab.currentLevel === 0 ? lab.mazeUpper : lab.mazeLower
      let newX = lab.playerX
      let newY = lab.playerY

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        newY--
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        newY++
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        newX--
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        newX++
      } else if (e.key === 'Escape' && isExpanded) {
        e.preventDefault()
        setIsExpanded(false)
        return
      } else {
        return
      }

      // Check if move is valid
      if (currentMaze[newY] && currentMaze[newY][newX] !== 1) {
        lab.playerX = newX
        lab.playerY = newY

        const pos = `${lab.currentLevel}-${newX},${newY}`
        const cell = currentMaze[newY][newX]

        // Upper level items
        if (cell === 2 && !lab.collected.has(pos)) {
          lab.collected.add(pos)
          lab.hasBook = true
          lab.message = 'A volume from the infinite Library. It contains all possible books...'
          lab.messageTime = Date.now()
        } else if (cell === 3 && !lab.collected.has(pos)) {
          lab.collected.add(pos)
          lab.hasKey = true
          lab.message = 'The Key to the Garden of Forking Paths.'
          lab.messageTime = Date.now()
        } else if (cell === 4 && !lab.collected.has(pos)) {
          lab.collected.add(pos)
          lab.hasMirror = true
          lab.message = 'A mirror from Tlön—it multiplies reality itself.'
          lab.messageTime = Date.now()
        } else if (cell === 6) {
          // Stairs down
          lab.currentLevel = 1
          lab.message = 'Descending... The air grows thick with possibility.'
          lab.messageTime = Date.now()
        } else if (cell === 7 && !lab.foundFragments.has(pos)) {
          // Literary fragment
          lab.foundFragments.add(pos)
          lab.currentFragment = BORGES_FRAGMENTS[Math.floor(Math.random() * BORGES_FRAGMENTS.length)]
          lab.fragmentTime = Date.now()
          lab.message = 'You found a fragment of text...'
          lab.messageTime = Date.now()
        }
        // Lower level items
        else if (cell === 8 && !lab.collected.has(pos)) {
          lab.collected.add(pos)
          lab.hasAleph = true
          lab.message = 'The Aleph! Point of infinite space where all places converge...'
          lab.messageTime = Date.now()
        } else if (cell === 9 && !lab.collected.has(pos)) {
          lab.collected.add(pos)
          lab.hasInfiniteBook = true
          lab.message = 'The Book of Sand—infinite pages, never the same twice.'
          lab.messageTime = Date.now()
        } else if (cell === 10 && !lab.collected.has(pos)) {
          lab.collected.add(pos)
          lab.hasClock = true
          lab.message = 'A clock from Tlön. Time here flows... differently.'
          lab.messageTime = Date.now()
        } else if (cell === 11) {
          // Stairs up
          lab.currentLevel = 0
          lab.message = 'Ascending to the surface...'
          lab.messageTime = Date.now()
        } else if (cell === 12) {
          // Exit
          const allUpper = lab.hasBook && lab.hasKey && lab.hasMirror
          const allLower = lab.hasAleph && lab.hasInfiniteBook && lab.hasClock
          if (allUpper && allLower) {
            lab.solved = true
            lab.message = '★ The labyrinth yields. You have found all paths. ★'
            lab.messageTime = Date.now()
          } else {
            const missing = 6 - [lab.hasBook, lab.hasKey, lab.hasMirror, lab.hasAleph, lab.hasInfiniteBook, lab.hasClock].filter(Boolean).length
            lab.message = `Exit locked. Still seeking ${missing} artifacts...`
            lab.messageTime = Date.now()
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    // Rendering
    const drawLabyrinth = () => {
      // Background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5
      )
      if (labyrinth.current.currentLevel === 0) {
        gradient.addColorStop(0, 'rgba(15, 23, 42, 0.98)')
        gradient.addColorStop(1, 'rgba(5, 10, 20, 1)')
      } else {
        gradient.addColorStop(0, 'rgba(10, 5, 25, 0.98)')
        gradient.addColorStop(1, 'rgba(5, 0, 15, 1)')
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const lab = labyrinth.current
      const currentMaze = lab.currentLevel === 0 ? lab.mazeUpper : lab.mazeLower

      if (currentMaze.length === 0) {
        initLabyrinth()
        return
      }

      const cellSize = isExpanded ? 20 : 12
      const offsetX = (canvas.width - currentMaze[0].length * cellSize) / 2
      const offsetY = (canvas.height - currentMaze.length * cellSize) / 2

      const fontSize = isExpanded ? 14 : 8
      ctx.font = `bold ${fontSize}px monospace`

      // Draw maze
      for (let y = 0; y < currentMaze.length; y++) {
        for (let x = 0; x < currentMaze[y].length; x++) {
          const px = offsetX + x * cellSize
          const py = offsetY + y * cellSize
          const cell = currentMaze[y][x]
          const pos = `${lab.currentLevel}-${x},${y}`

          if (cell === 1) {
            ctx.fillStyle = lab.currentLevel === 0 ? 'rgba(59, 130, 246, 0.25)' : 'rgba(139, 92, 246, 0.3)'
            ctx.fillRect(px, py, cellSize, cellSize)
          } else if (cell === 2 && !lab.collected.has(pos)) {
            ctx.fillText('📖', px, py + cellSize - 2)
          } else if (cell === 3 && !lab.collected.has(pos)) {
            ctx.fillText('🗝', px, py + cellSize - 2)
          } else if (cell === 4 && !lab.collected.has(pos)) {
            ctx.fillText('🪞', px, py + cellSize - 2)
          } else if (cell === 6) {
            ctx.fillStyle = 'rgba(251, 191, 36, 0.6)'
            ctx.fillText('▼', px + 2, py + cellSize - 2)
          } else if (cell === 7 && !lab.foundFragments.has(pos)) {
            ctx.fillStyle = 'rgba(147, 197, 253, 0.5)'
            ctx.fillText('∞', px + 2, py + cellSize - 2)
          } else if (cell === 8 && !lab.collected.has(pos)) {
            ctx.fillText('⊙', px + 2, py + cellSize - 2)
          } else if (cell === 9 && !lab.collected.has(pos)) {
            ctx.fillText('📜', px, py + cellSize - 2)
          } else if (cell === 10 && !lab.collected.has(pos)) {
            ctx.fillText('⌚', px, py + cellSize - 2)
          } else if (cell === 11) {
            ctx.fillStyle = 'rgba(251, 191, 36, 0.6)'
            ctx.fillText('▲', px + 2, py + cellSize - 2)
          } else if (cell === 12) {
            ctx.fillStyle = lab.solved ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.7)'
            ctx.fillText('🚪', px, py + cellSize - 2)
          }
        }
      }

      // Draw player
      const playerPx = offsetX + lab.playerX * cellSize
      const playerPy = offsetY + lab.playerY * cellSize
      ctx.fillStyle = lab.solved ? 'rgba(34, 197, 94, 1)' : 'rgba(59, 130, 246, 1)'
      ctx.fillText('@', playerPx + 2, playerPy + cellSize - 2)

      // UI
      ctx.font = `${isExpanded ? 12 : 8}px monospace`
      ctx.fillStyle = 'rgba(147, 197, 253, 0.9)'
      const levelText = lab.currentLevel === 0 ? 'SURFACE' : 'DEPTHS'
      ctx.fillText(`Level: ${levelText}`, 20, 25)

      let invY = 45
      const count = [lab.hasBook, lab.hasKey, lab.hasMirror, lab.hasAleph, lab.hasInfiniteBook, lab.hasClock].filter(Boolean).length
      ctx.fillText(`Artifacts: ${count}/6`, 20, invY)
      ctx.fillText(`Fragments: ${lab.foundFragments.size}`, 20, invY + 15)

      // Messages
      if (Date.now() - lab.messageTime < 3500) {
        ctx.font = `bold ${isExpanded ? 12 : 8}px monospace`
        ctx.fillStyle = 'rgba(251, 191, 36, 1)'
        ctx.fillText(lab.message, 20, canvas.height - 40)
      }

      // Fragment display
      if (Date.now() - lab.fragmentTime < 5000 && lab.currentFragment) {
        ctx.font = `italic ${isExpanded ? 11 : 7}px monospace`
        ctx.fillStyle = 'rgba(147, 197, 253, 0.8)'
        const maxWidth = canvas.width - 40
        const words = lab.currentFragment.split(' ')
        let line = ''
        let y = canvas.height - 80
        for (const word of words) {
          const testLine = line + word + ' '
          if (ctx.measureText(testLine).width > maxWidth && line) {
            ctx.fillText(line, 20, y)
            line = word + ' '
            y += 15
          } else {
            line = testLine
          }
        }
        ctx.fillText(line, 20, y)
      }

      // Victory
      if (lab.solved) {
        ctx.font = `bold ${isExpanded ? 20 : 12}px monospace`
        ctx.fillStyle = 'rgba(34, 197, 94, 1)'
        const msg = '★ ALL PATHS CONVERGE ★'
        const w = ctx.measureText(msg).width
        ctx.fillText(msg, (canvas.width - w) / 2, 50)
      }
    }

    const animate = () => {
      drawLabyrinth()
      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('keydown', handleKeyDown)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [isExpanded])

  const resetMaze = () => {
    labyrinth.current.mazeUpper = []
    labyrinth.current.mazeLower = []
    initLabyrinth()
  }

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div className={isExpanded ? "fixed bottom-0 left-0 right-0 z-50 h-[70vh]" : "relative w-full h-full"}>
        <div className="relative w-full h-full bg-slate-900 rounded-lg overflow-hidden">
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <button
              onClick={resetMaze}
              className="px-3 py-1.5 text-xs rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white"
            >
              Reset
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white flex items-center justify-center"
              aria-label={isExpanded ? "Minimize" : "Maximize"}
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            {isExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white flex items-center justify-center"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </>
  )
}
