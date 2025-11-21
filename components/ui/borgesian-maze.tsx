'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Maximize2, Minimize2 } from 'lucide-react'

export function BorgesianMaze() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const animationFrameId = useRef<number | undefined>(undefined)

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

    // Keyboard handler for labyrinth
    const handleKeyDown = (e: KeyboardEvent) => {
      const lab = labyrinth.current
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
        return // Don't prevent default for non-arrow keys
      }

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
    window.addEventListener('keydown', handleKeyDown)

    // Labyrinth/Maze rendering
    const drawLabyrinth = () => {
      // Dark background with subtle gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5
      )
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.98)')
      gradient.addColorStop(1, 'rgba(5, 10, 20, 1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Border frame
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.lineWidth = 2
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

      const lab = labyrinth.current

      // Initialize maze if needed
      if (lab.maze.length === 0) {
        initLabyrinth()
      }

      const cellSize = isExpanded ? 25 : 15
      const offsetX = (canvas.width - lab.maze[0].length * cellSize) / 2
      const offsetY = (canvas.height - lab.maze.length * cellSize) / 2

      // Draw maze
      const fontSize = isExpanded ? 16 : 10
      ctx.font = `bold ${fontSize}px monospace`
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
            ctx.fillText('█', px + (isExpanded ? 5 : 2), py + (isExpanded ? 18 : 11))
          } else if (cell === 2 && !lab.collected.has(`${x},${y}`)) {
            // Book (Library of Babel)
            ctx.fillStyle = 'rgba(251, 191, 36, 0.8)' // amber
            ctx.fillText('📖', px + (isExpanded ? 4 : 1), py + (isExpanded ? 18 : 11))
          } else if (cell === 3 && !lab.collected.has(`${x},${y}`)) {
            // Key
            ctx.fillStyle = 'rgba(251, 191, 36, 0.8)' // amber
            ctx.fillText('🗝', px + (isExpanded ? 4 : 1), py + (isExpanded ? 18 : 11))
          } else if (cell === 4 && !lab.collected.has(`${x},${y}`)) {
            // Mirror (Tlön)
            ctx.fillStyle = 'rgba(147, 197, 253, 0.8)' // blue-300
            ctx.fillText('🪞', px + (isExpanded ? 4 : 1), py + (isExpanded ? 18 : 11))
          } else if (cell === 5) {
            // Exit
            const exitColor = lab.solved ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.7)'
            ctx.fillStyle = exitColor
            ctx.fillText('🚪', px + (isExpanded ? 4 : 1), py + (isExpanded ? 18 : 11))
          }
        }
      }

      // Draw player
      const playerPx = offsetX + lab.playerX * cellSize
      const playerPy = offsetY + lab.playerY * cellSize
      ctx.fillStyle = lab.solved ? 'rgba(34, 197, 94, 1)' : 'rgba(59, 130, 246, 1)'
      ctx.fillText('@', playerPx + (isExpanded ? 7 : 3), playerPy + (isExpanded ? 18 : 11))

      // Draw inventory
      ctx.font = `${isExpanded ? 14 : 10}px monospace`
      ctx.fillStyle = 'rgba(147, 197, 253, 0.9)'
      const inventoryY = 30
      ctx.fillText('Inventory:', 20, inventoryY)
      let invY = inventoryY + (isExpanded ? 20 : 15)
      if (lab.hasBook) {
        ctx.fillText('📖 Library of Babel volume', 20, invY)
        invY += isExpanded ? 18 : 13
      }
      if (lab.hasKey) {
        ctx.fillText('🗝 Garden Key', 20, invY)
        invY += isExpanded ? 18 : 13
      }
      if (lab.hasMirror) {
        ctx.fillText('🪞 Mirror of Tlön', 20, invY)
        invY += isExpanded ? 18 : 13
      }

      // Draw message
      if (Date.now() - lab.messageTime < 3000) {
        ctx.font = `bold ${isExpanded ? 14 : 10}px monospace`
        ctx.fillStyle = 'rgba(251, 191, 36, 1)'
        const msgWidth = ctx.measureText(lab.message).width
        ctx.fillText(lab.message, (canvas.width - msgWidth) / 2, canvas.height - 60)
      }

      // Draw instructions
      ctx.font = `${isExpanded ? 12 : 9}px monospace`
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'
      const instructions = 'Arrow keys to move | Find 3 artifacts to unlock exit'
      ctx.fillText(instructions, 20, canvas.height - 20)

      // Victory message
      if (lab.solved) {
        ctx.font = `bold ${isExpanded ? 24 : 14}px monospace`
        ctx.fillStyle = 'rgba(34, 197, 94, 1)'
        const victoryMsg = '★ THE LABYRINTH YIELDS ITS SECRETS ★'
        const victoryWidth = ctx.measureText(victoryMsg).width
        ctx.fillText(victoryMsg, (canvas.width - victoryWidth) / 2, 60)
      }
    }

    // Animation loop
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
    labyrinth.current.maze = []
    initLabyrinth()
  }

  return (
    <>
      {/* Backdrop - only when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Maze Container */}
      <div className={isExpanded ? "fixed bottom-0 left-0 right-0 z-50 h-[70vh]" : "relative w-full h-full"}>
        <div className="relative w-full h-full bg-slate-900 rounded-lg overflow-hidden">
          {/* Controls */}
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

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </>
  )
}
