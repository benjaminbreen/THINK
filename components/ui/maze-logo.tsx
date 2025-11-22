export function MazeLogo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Blocky maze pattern inspired by █ character */}
      {/* Outer border */}
      <rect x="2" y="2" width="20" height="20" fill="currentColor" fillOpacity="0.15" />

      {/* Maze walls - blocky pattern */}
      <rect x="2" y="2" width="3" height="3" fill="currentColor" />
      <rect x="8" y="2" width="3" height="3" fill="currentColor" />
      <rect x="14" y="2" width="3" height="3" fill="currentColor" />
      <rect x="19" y="2" width="3" height="3" fill="currentColor" />

      <rect x="2" y="8" width="3" height="3" fill="currentColor" />
      <rect x="11" y="8" width="3" height="3" fill="currentColor" />
      <rect x="19" y="8" width="3" height="3" fill="currentColor" />

      <rect x="5" y="11" width="3" height="3" fill="currentColor" />
      <rect x="14" y="11" width="3" height="3" fill="currentColor" />
      <rect x="19" y="11" width="3" height="3" fill="currentColor" />

      <rect x="2" y="14" width="3" height="3" fill="currentColor" />
      <rect x="8" y="14" width="3" height="3" fill="currentColor" />
      <rect x="14" y="14" width="3" height="3" fill="currentColor" />

      <rect x="2" y="19" width="3" height="3" fill="currentColor" />
      <rect x="8" y="19" width="3" height="3" fill="currentColor" />
      <rect x="14" y="19" width="3" height="3" fill="currentColor" />
      <rect x="19" y="19" width="3" height="3" fill="currentColor" />

      {/* Player position @ in center */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" fillOpacity="0.8" />
    </svg>
  )
}
