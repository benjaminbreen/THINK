'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Map routes to their accent colors
const routeColors: Record<string, { light: string; dark: string }> = {
  '/projects': { light: '#0891b2', dark: '#22d3ee' }, // Cyan
  '/pedagogy': { light: '#7c3aed', dark: '#a78bfa' }, // Violet
  '/resources': { light: '#b45309', dark: '#fbbf24' }, // Amber
  '/guides': { light: '#2563eb', dark: '#60a5fa' }, // Blue
  '/blog': { light: '#e11d48', dark: '#fb7185' }, // Rose
  '/about': { light: '#4f46e5', dark: '#818cf8' }, // Indigo
}

function getColorForPath(pathname: string, isDark: boolean): string {
  // Check for exact match first, then prefix match
  for (const [route, colors] of Object.entries(routeColors)) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      return isDark ? colors.dark : colors.light
    }
  }
  // Default to primary amber
  return isDark ? '#fbbf24' : '#b45309'
}

// Only show progress bar on detail/content pages, not index pages
function shouldShowProgress(pathname: string): boolean {
  // Never show on homepage
  if (pathname === '/') return false

  // Index pages where we don't want the progress bar
  const indexPages = [
    '/projects',
    '/pedagogy',
    '/resources',
    '/guides',
    '/blog',
    '/about',
    '/tags'
  ]

  // If it's exactly an index page, don't show
  if (indexPages.includes(pathname)) return false

  // Show on detail pages (anything with a sub-path under these routes)
  const contentRoutes = ['/projects/', '/pedagogy/', '/guides/', '/blog/']
  return contentRoutes.some(route => pathname.startsWith(route))
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, scrollPercent)))
    }

    // Initial calculation
    updateProgress()

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [pathname])

  // Only show on content/detail pages
  if (!shouldShowProgress(pathname)) return null

  const color = getColorForPath(pathname, isDark)

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent pointer-events-none">
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}40`,
        }}
      />
    </div>
  )
}
