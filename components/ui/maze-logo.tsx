'use client'

import { useEffect, useState } from 'react'

// Generate a simple 5x5 maze using randomized DFS
function generateMaze(): number[][] {
  const size = 5
  const maze: number[][] = Array(size).fill(0).map(() => Array(size).fill(1))

  const stack: [number, number][] = []
  const visited = new Set<string>()

  // Start from (0, 0)
  const start: [number, number] = [0, 0]
  stack.push(start)
  visited.add('0,0')
  maze[0][0] = 0

  const directions = [
    [0, -1], [1, 0], [0, 1], [-1, 0]
  ]

  while (stack.length > 0) {
    const [x, y] = stack[stack.length - 1]

    // Shuffle directions
    const shuffled = [...directions].sort(() => Math.random() - 0.5)
    let moved = false

    for (const [dx, dy] of shuffled) {
      const nx = x + dx
      const ny = y + dy

      if (nx >= 0 && nx < size && ny >= 0 && ny < size && !visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`)
        maze[ny][nx] = 0
        stack.push([nx, ny])
        moved = true
        break
      }
    }

    if (!moved) {
      stack.pop()
    }
  }

  return maze
}

// Find a path through the maze from top-left to bottom-right
function findPath(maze: number[][]): [number, number][] {
  const size = maze.length
  const queue: { pos: [number, number], path: [number, number][] }[] = []
  const visited = new Set<string>()

  queue.push({ pos: [0, 0], path: [[0, 0]] })
  visited.add('0,0')

  const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]

  while (queue.length > 0) {
    const { pos: [x, y], path } = queue.shift()!

    // If we reached the end, return the path
    if (x === size - 1 && y === size - 1) {
      return path
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx
      const ny = y + dy
      const key = `${nx},${ny}`

      if (
        nx >= 0 && nx < size &&
        ny >= 0 && ny < size &&
        maze[ny][nx] === 0 &&
        !visited.has(key)
      ) {
        visited.add(key)
        queue.push({ pos: [nx, ny], path: [...path, [nx, ny]] })
      }
    }
  }

  // Fallback: just return a simple path if no path found
  return [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]]
}

export function MazeLogo({ className = "h-6 w-6" }: { className?: string }) {
  const [maze, setMaze] = useState<number[][]>([])
  const [path, setPath] = useState<[number, number][]>([])

  useEffect(() => {
    const newMaze = generateMaze()
    setMaze(newMaze)
    setPath(findPath(newMaze))
  }, [])

  if (maze.length === 0) return null

  const cellSize = 4
  const offset = 2

  // Generate keyframe values for smooth animation
  const pathX = path.map(p => offset + p[0] * cellSize + cellSize / 2).join(';')
  const pathY = path.map(p => offset + p[1] * cellSize + cellSize / 2).join(';')

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect x="0" y="0" width="24" height="24" fill="currentColor" fillOpacity="0.08" />

      {/* Draw maze walls as solid blocks */}
      {maze.map((row, y) =>
        row.map((cell, x) =>
          cell === 1 ? (
            <rect
              key={`${x}-${y}`}
              x={offset + x * cellSize}
              y={offset + y * cellSize}
              width={cellSize}
              height={cellSize}
              fill="currentColor"
              fillOpacity="0.85"
            />
          ) : null
        )
      )}

      {/* Animated yellow circle moving along path */}
      {path.length > 1 && (
        <circle r="1.3" fill="#eab308" opacity="1">
          <animate
            attributeName="cx"
            values={pathX}
            dur="6s"
            repeatCount="indefinite"
            calcMode="linear"
          />
          <animate
            attributeName="cy"
            values={pathY}
            dur="6s"
            repeatCount="indefinite"
            calcMode="linear"
          />
        </circle>
      )}
    </svg>
  )
}
