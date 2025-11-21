'use client'

import { useEffect, useRef } from 'react'

export function BorgesianMaze() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | undefined>(undefined)

  // Labyrinth state
  const labyrinth = useRef({
    playerX: 1,
    playerY: 1,
    maze: [] as number[][],
    collected: new Set<string>(),
    hasKey: false,
    hasBook: false,
    hasMirror: false,
    solved: false,
    message: 'Navigate the Garden of Forking Paths...',
    messageTime: 0
  })

  // Borges words panel state
  const wordsPanel = useRef({
    words: [] as Array<{ text: string; y: number; speed: number; id: number }>,
    nextId: 0,
    lastSpawn: 0
  })

  // Collected words (left panel)
  const collectedWords = useRef<Array<{ text: string; id: number }>>([])

  // Drag state for throwing words
  const dragState = useRef<{
    isDragging: boolean
    wordId: number | null
    startX: number
    startY: number
    currentX: number
    currentY: number
  }>({
    isDragging: false,
    wordId: null,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  })

  // Borges vocabulary from his works
  const borgesWords = [
    'labyrinth', 'infinity', 'mirror', 'time', 'eternity', 'library', 'babel',
    'aleph', 'circular', 'ruins', 'garden', 'forking', 'paths', 'tlön', 'uqbar',
    'orbis', 'tertius', 'ficciones', 'dream', 'dreamer', 'tiger', 'immortal',
    'book', 'sand', 'infinite', 'paradox', 'knife', 'memory', 'oblivion', 'chess',
    'universe', 'hexagon', 'endless', 'stairway', 'sphinx', 'double', 'reflection',
    'lotus', 'god', 'heresiarch', 'rose', 'compass', 'labyrinthine', 'babylon',
    'lottery', 'circular', 'zahir', 'dead', 'man', 'detective', 'death', 'compass',
    'secret', 'miracle', 'form', 'sword', 'encyclopaedia', 'exactitude', 'science',
    'rigor', 'empire', 'myth', 'legend', 'fable', 'chronicle', 'annals', 'history',
    'philosophy', 'theology', 'metaphysics', 'cosmology', 'ontology', 'epistemology',
    'eternal', 'return', 'cyclical', 'repetition', 'variation', 'permutation',
    'combination', 'geometry', 'algebra', 'arithmetic', 'number', 'symbol', 'sign',
    'letter', 'word', 'sentence', 'paragraph', 'page', 'volume', 'shelf', 'gallery',
    'vestibule', 'staircase', 'mirror', 'window', 'door', 'key', 'lock', 'passage'
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

      // Update drag position
      if (dragState.current.isDragging) {
        dragState.current.currentX = mousePos.current.x
        dragState.current.currentY = mousePos.current.y
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    // Mouse click handler
    const handleMouseClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Check if clicking on words in right panel
      const rightPanelX = canvas.width * 0.75
      if (clickX >= rightPanelX) {
        wordsPanel.current.words.forEach((word) => {
          const wordX = rightPanelX + 10
          const wordY = word.y
          const wordWidth = ctx.measureText(word.text).width
          const wordHeight = 16

          if (
            clickX >= wordX &&
            clickX <= wordX + wordWidth &&
            clickY >= wordY - wordHeight &&
            clickY <= wordY
          ) {
            // Add to collected words
            collectedWords.current.push({ text: word.text, id: word.id })
            // Remove from falling words
            wordsPanel.current.words = wordsPanel.current.words.filter(
              (w) => w.id !== word.id
            )
          }
        })
      }

      // Check if clicking on collected words (left panel)
      const leftPanelWidth = canvas.width * 0.2
      if (clickX <= leftPanelWidth) {
        let currentY = 40
        for (let i = 0; i < collectedWords.current.length; i++) {
          const word = collectedWords.current[i]
          const wordHeight = 20
          if (clickY >= currentY && clickY <= currentY + wordHeight) {
            // Start dragging this word
            dragState.current.isDragging = true
            dragState.current.wordId = word.id
            dragState.current.startX = clickX
            dragState.current.startY = clickY
            dragState.current.currentX = clickX
            dragState.current.currentY = clickY
            break
          }
          currentY += wordHeight + 5
        }
      }
    }
    canvas.addEventListener('click', handleMouseClick)

    // Mouse up handler (for releasing thrown words)
    const handleMouseUp = (e: MouseEvent) => {
      if (dragState.current.isDragging && dragState.current.wordId !== null) {
        // Calculate velocity
        const vx = dragState.current.currentX - dragState.current.startX
        const vy = dragState.current.currentY - dragState.current.startY
        const velocity = Math.sqrt(vx * vx + vy * vy)

        // Check if thrown with enough force toward maze
        if (velocity > 50) {
          // Calculate maze area
          const lab = labyrinth.current
          const cellSize = 25
          const leftPanelWidth = canvas.width * 0.2
          const rightPanelX = canvas.width * 0.75
          const mazeWidth = rightPanelX - leftPanelWidth - 40
          const actualMazeWidth = lab.maze[0]?.length * cellSize || 0
          const actualMazeHeight = lab.maze.length * cellSize || 0
          const offsetX = leftPanelWidth + 20 + (mazeWidth - actualMazeWidth) / 2
          const offsetY = (canvas.height - actualMazeHeight) / 2

          // Check if throw direction is toward maze
          const throwX = dragState.current.currentX
          const throwY = dragState.current.currentY

          if (
            throwX >= offsetX &&
            throwX <= offsetX + actualMazeWidth &&
            throwY >= offsetY &&
            throwY <= offsetY + actualMazeHeight
          ) {
            // Calculate which cell was hit
            const cellX = Math.floor((throwX - offsetX) / cellSize)
            const cellY = Math.floor((throwY - offsetY) / cellSize)

            // Break wall if it's a wall
            if (
              lab.maze[cellY] &&
              lab.maze[cellY][cellX] === 1 &&
              cellX > 0 &&
              cellX < lab.maze[0].length - 1 &&
              cellY > 0 &&
              cellY < lab.maze.length - 1
            ) {
              lab.maze[cellY][cellX] = 0 // Remove wall
              lab.message = `Wall shattered by the word "${
                collectedWords.current.find((w) => w.id === dragState.current.wordId)?.text
              }"!`
              lab.messageTime = Date.now()

              // Remove word from collected
              collectedWords.current = collectedWords.current.filter(
                (w) => w.id !== dragState.current.wordId
              )
            }
          }
        }

        // Reset drag state
        dragState.current.isDragging = false
        dragState.current.wordId = null
      }
    }
    canvas.addEventListener('mouseup', handleMouseUp)

    // Keyboard handler for labyrinth movement
    const handleKeyDown = (e: KeyboardEvent) => {
      const lab = labyrinth.current
      let newX = lab.playerX
      let newY = lab.playerY

      if (e.key === 'ArrowUp') newY--
      else if (e.key === 'ArrowDown') newY++
      else if (e.key === 'ArrowLeft') newX--
      else if (e.key === 'ArrowRight') newX++
      else return

      e.preventDefault()

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
          // Spawn words when finding an artifact
          spawnWordBurst()
        } else if (lab.maze[newY][newX] === 3 && !lab.collected.has(pos)) {
          lab.collected.add(pos)
          lab.hasKey = true
          lab.message = 'Found: The Key to the Garden!'
          lab.messageTime = Date.now()
          spawnWordBurst()
        } else if (lab.maze[newY][newX] === 4 && !lab.collected.has(pos)) {
          lab.collected.add(pos)
          lab.hasMirror = true
          lab.message = 'Found: The Mirror of Tlön!'
          lab.messageTime = Date.now()
          spawnWordBurst()
        } else if (lab.maze[newY][newX] === 5) {
          // Exit
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

    // Spawn multiple words when finding artifact
    const spawnWordBurst = () => {
      for (let i = 0; i < 10; i++) {
        const word = borgesWords[Math.floor(Math.random() * borgesWords.length)]
        wordsPanel.current.words.push({
          text: word,
          y: -i * 50,
          speed: 0.5 + Math.random() * 1.5,
          id: wordsPanel.current.nextId++
        })
      }
    }

    // Initialize labyrinth
    const initLabyrinth = () => {
      const width = 25
      const height = 17
      const maze: number[][] = Array(height)
        .fill(0)
        .map(() => Array(width).fill(1))

      // Recursive backtracking maze generation
      const carve = (x: number, y: number) => {
        const dirs = [
          [0, -1],
          [1, 0],
          [0, 1],
          [-1, 0],
        ].sort(() => Math.random() - 0.5)
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

      // Place special items
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
      labyrinth.current.message = 'Navigate the Garden of Forking Paths... Find 3 artifacts.'
      labyrinth.current.messageTime = Date.now()
    }

    // Initialize maze
    if (labyrinth.current.maze.length === 0) {
      initLabyrinth()
    }

    // Animation loop
    const animate = (time: number) => {
      // Update words panel - spawn new words occasionally
      if (time - wordsPanel.current.lastSpawn > 2000) {
        const word = borgesWords[Math.floor(Math.random() * borgesWords.length)]
        wordsPanel.current.words.push({
          text: word,
          y: 0,
          speed: 0.5 + Math.random() * 1.5,
          id: wordsPanel.current.nextId++
        })
        wordsPanel.current.lastSpawn = time
      }

      // Update word positions
      wordsPanel.current.words.forEach((word) => {
        word.y += word.speed
      })

      // Remove words that fell off screen
      wordsPanel.current.words = wordsPanel.current.words.filter(
        (word) => word.y < canvas.height + 20
      )

      // Draw everything
      draw(ctx, canvas)

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleMouseClick)
      canvas.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('keydown', handleKeyDown)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const lab = labyrinth.current

    // Dark background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate panel dimensions
    const leftPanelWidth = canvas.width * 0.2
    const rightPanelX = canvas.width * 0.75
    const mazeWidth = rightPanelX - leftPanelWidth - 40

    // Draw left panel (collected words)
    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)'
    ctx.fillRect(0, 0, leftPanelWidth, canvas.height)
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, leftPanelWidth, canvas.height)

    ctx.font = 'bold 14px monospace'
    ctx.fillStyle = 'rgba(147, 197, 253, 1)'
    ctx.fillText('Collected Words', 10, 25)

    ctx.font = '12px monospace'
    let wordY = 40
    collectedWords.current.forEach((word, i) => {
      // Highlight if being dragged
      if (dragState.current.isDragging && dragState.current.wordId === word.id) {
        ctx.fillStyle = 'rgba(251, 191, 36, 0.3)'
        ctx.fillRect(5, wordY - 15, leftPanelWidth - 10, 20)
      }

      ctx.fillStyle = 'rgba(251, 191, 36, 0.9)'
      ctx.fillText(`• ${word.text}`, 10, wordY)
      wordY += 25
    })

    // Instructions
    ctx.font = '10px monospace'
    ctx.fillStyle = 'rgba(148, 163, 184, 0.7)'
    const instrY = canvas.height - 40
    ctx.fillText('Click words', 10, instrY)
    ctx.fillText('to collect', 10, instrY + 12)
    ctx.fillText('Drag & throw', 10, instrY + 24)
    ctx.fillText('to break walls', 10, instrY + 36)

    // Draw right panel (falling Borges words - Matrix style)
    ctx.fillStyle = 'rgba(30, 41, 59, 0.8)'
    ctx.fillRect(rightPanelX, 0, canvas.width - rightPanelX, canvas.height)
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
    ctx.lineWidth = 2
    ctx.strokeRect(rightPanelX, 0, canvas.width - rightPanelX, canvas.height)

    ctx.font = 'bold 14px monospace'
    ctx.fillStyle = 'rgba(147, 197, 253, 1)'
    ctx.fillText('Borges', rightPanelX + 10, 25)

    // Draw falling words
    ctx.font = '13px monospace'
    wordsPanel.current.words.forEach((word) => {
      const opacity = Math.max(0.3, Math.min(1, 1 - word.y / canvas.height))
      ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`
      ctx.fillText(word.text, rightPanelX + 10, word.y)

      // Glow effect for top words
      if (word.y < 100) {
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(34, 197, 94, 0.5)'
        ctx.fillText(word.text, rightPanelX + 10, word.y)
        ctx.shadowBlur = 0
      }
    })

    // Draw maze in center
    const cellSize = 25
    const actualMazeWidth = lab.maze[0]?.length * cellSize || 0
    const actualMazeHeight = lab.maze.length * cellSize || 0
    const offsetX = leftPanelWidth + 20 + (mazeWidth - actualMazeWidth) / 2
    const offsetY = (canvas.height - actualMazeHeight) / 2

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
          // Book
          ctx.fillStyle = 'rgba(251, 191, 36, 0.8)'
          ctx.fillText('📖', px + 4, py + 18)
        } else if (cell === 3 && !lab.collected.has(`${x},${y}`)) {
          // Key
          ctx.fillStyle = 'rgba(251, 191, 36, 0.8)'
          ctx.fillText('🗝', px + 4, py + 18)
        } else if (cell === 4 && !lab.collected.has(`${x},${y}`)) {
          // Mirror
          ctx.fillStyle = 'rgba(147, 197, 253, 0.8)'
          ctx.fillText('🪞', px + 4, py + 18)
        } else if (cell === 5) {
          // Exit
          const exitColor = lab.solved
            ? 'rgba(34, 197, 94, 0.9)'
            : 'rgba(239, 68, 68, 0.7)'
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

    // Draw inventory above maze
    ctx.font = '12px monospace'
    ctx.fillStyle = 'rgba(147, 197, 253, 0.9)'
    const invX = offsetX
    const invY = offsetY - 60
    ctx.fillText('Inventory:', invX, invY)
    let invOffset = 0
    if (lab.hasBook) {
      ctx.fillText('📖', invX + invOffset, invY + 18)
      invOffset += 25
    }
    if (lab.hasKey) {
      ctx.fillText('🗝', invX + invOffset, invY + 18)
      invOffset += 25
    }
    if (lab.hasMirror) {
      ctx.fillText('🪞', invX + invOffset, invY + 18)
      invOffset += 25
    }

    // Draw message
    if (Date.now() - lab.messageTime < 3000) {
      ctx.font = 'bold 13px monospace'
      ctx.fillStyle = 'rgba(251, 191, 36, 1)'
      const msgWidth = ctx.measureText(lab.message).width
      ctx.fillText(lab.message, (canvas.width - msgWidth) / 2, offsetY + actualMazeHeight + 40)
    }

    // Draw instructions below maze
    ctx.font = '11px monospace'
    ctx.fillStyle = 'rgba(148, 163, 184, 0.6)'
    const instructText = 'Arrow keys to move | Find 3 artifacts | Click falling words to collect | Throw words at walls to break them'
    const instructWidth = ctx.measureText(instructText).width
    ctx.fillText(instructText, (canvas.width - instructWidth) / 2, canvas.height - 20)

    // Draw dragged word if dragging
    if (dragState.current.isDragging && dragState.current.wordId !== null) {
      const word = collectedWords.current.find((w) => w.id === dragState.current.wordId)
      if (word) {
        ctx.font = 'bold 20px monospace'
        ctx.fillStyle = 'rgba(251, 191, 36, 0.8)'
        ctx.fillText(word.text, dragState.current.currentX, dragState.current.currentY)

        // Draw trajectory line
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(dragState.current.startX, dragState.current.startY)
        ctx.lineTo(dragState.current.currentX, dragState.current.currentY)
        ctx.stroke()
      }
    }

    // Victory message
    if (lab.solved) {
      ctx.font = 'bold 20px monospace'
      ctx.fillStyle = 'rgba(34, 197, 94, 1)'
      const victoryMsg = '★ THE LABYRINTH YIELDS ITS SECRETS ★'
      const victoryWidth = ctx.measureText(victoryMsg).width
      ctx.fillText(victoryMsg, (canvas.width - victoryWidth) / 2, offsetY - 90)
    }
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  )
}
