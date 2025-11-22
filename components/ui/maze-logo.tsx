'use client'

import { useEffect, useState, useRef, memo } from 'react'

// Hand-crafted 4x4 maze templates with guaranteed solvable paths
// 0 = path, 1 = wall
// Coordinates: [column, row] = [x, y]
const MAZE_TEMPLATES = [
  {
    name: 'S-curve',
    maze: [
      [0, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 0, 0, 0],
      [1, 1, 1, 0]
    ],
    path: [[0,0], [1,0], [1,1], [2,1], [2,2], [3,2], [3,3]]
  },
  {
    name: 'Right-down',
    maze: [
      [0, 0, 0, 1],
      [1, 1, 0, 1],
      [1, 1, 0, 0],
      [1, 1, 1, 0]
    ],
    path: [[0,0], [1,0], [2,0], [2,1], [2,2], [3,2], [3,3]]
  },
  {
    name: 'Zigzag',
    maze: [
      [0, 0, 0, 1],
      [1, 1, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 1, 0]
    ],
    path: [[0,0], [1,0], [2,0], [2,1], [2,2], [1,2], [1,3], [3,3]]
  },
  {
    name: 'L-path',
    maze: [
      [0, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 0, 0, 1],
      [1, 1, 0, 0]
    ],
    path: [[0,0], [0,1], [0,2], [1,2], [2,2], [2,3], [3,3]]
  },
  {
    name: 'T-junction',
    maze: [
      [0, 0, 1, 1],
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 0]
    ],
    path: [[0,0], [1,0], [1,1], [2,1], [3,1], [3,2], [3,3]]
  },
  {
    name: 'Spiral',
    maze: [
      [0, 0, 0, 1],
      [1, 1, 0, 1],
      [0, 0, 0, 1],
      [0, 1, 1, 0]
    ],
    path: [[0,0], [1,0], [2,0], [2,1], [2,2], [1,2], [0,2], [0,3], [3,3]]
  },
  {
    name: 'Diagonal',
    maze: [
      [0, 0, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 0, 0],
      [1, 1, 1, 0]
    ],
    path: [[0,0], [1,0], [1,1], [2,1], [2,2], [3,2], [3,3]]
  },
  {
    name: 'Corridor',
    maze: [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 0],
      [1, 1, 1, 0]
    ],
    path: [[0,0], [1,0], [2,0], [3,0], [3,1], [3,2], [3,3]]
  }
]

function MazeLogoComponent({ className = "h-6 w-6" }: { className?: string }) {
  const [template, setTemplate] = useState(MAZE_TEMPLATES[0])
  const [isHovered, setIsHovered] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const animateXRef = useRef<SVGAnimateElement>(null)
  const animateYRef = useRef<SVGAnimateElement>(null)

  useEffect(() => {
    // Select random maze template on mount
    const randomTemplate = MAZE_TEMPLATES[Math.floor(Math.random() * MAZE_TEMPLATES.length)]
    setTemplate(randomTemplate)
  }, [])

  // Control animation on hover change
  useEffect(() => {
    if (isHovered) {
      // Start animation on hover
      animateXRef.current?.beginElement()
      animateYRef.current?.beginElement()
      setHasAnimated(true)
    } else if (hasAnimated) {
      // Freeze animation when hover ends (only if it has started)
      animateXRef.current?.endElement()
      animateYRef.current?.endElement()
    }
  }, [isHovered, hasAnimated])

  const { maze, path } = template
  const size = 4 // 4x4 grid
  const cellSize = 5 // Larger cells for better visibility
  const offset = 2

  // Generate keyframe values for smooth animation
  const pathX = path.map(([x]) => offset + x * cellSize + cellSize / 2).join(';')
  const pathY = path.map(([, y]) => offset + y * cellSize + cellSize / 2).join(';')

  // Animation duration: ~0.7s per step for natural movement
  const duration = path.length * 0.7

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="THINK maze logo"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background */}
      <rect
        x="0"
        y="0"
        width="24"
        height="24"
        fill="currentColor"
        fillOpacity="0.06"
        rx="1"
      />

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
              fillOpacity="0.9"
              rx="0.5"
            />
          ) : null
        )
      )}

      {/* Animated ball following the path - hidden by default, blue on hover */}
      <circle
        r="1.5"
        fill="#3b82f6"
        opacity={hasAnimated ? "1" : "0"}
        filter="url(#glow)"
        style={{ transition: 'opacity 0.2s ease' }}
      >
        <animate
          ref={animateXRef}
          attributeName="cx"
          values={pathX}
          dur={`${duration}s`}
          repeatCount="indefinite"
          calcMode="linear"
          begin="indefinite"
        />
        <animate
          ref={animateYRef}
          attributeName="cy"
          values={pathY}
          dur={`${duration}s`}
          repeatCount="indefinite"
          calcMode="linear"
          begin="indefinite"
        />
      </circle>

      {/* Subtle glow effect for the ball */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

// Memoize to prevent unnecessary re-renders
export const MazeLogo = memo(MazeLogoComponent)
