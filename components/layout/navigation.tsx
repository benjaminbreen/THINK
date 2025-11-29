'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Container } from '@/components/ui/container'
import { ThemeToggle } from '@/components/theme-toggle'
import { MazeLogo } from '@/components/ui/maze-logo'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const navigation = [
  { name: 'Home', href: '/', color: '#b45309', darkColor: '#fbbf24' }, // Burnt umber (light) / Amber (dark)
  { name: 'Projects', href: '/projects', color: '#0891b2', darkColor: '#22d3ee' }, // Cyan
  { name: 'Pedagogy', href: '/pedagogy', color: '#7c3aed', darkColor: '#a78bfa' }, // Violet
  { name: 'Resources', href: '/resources', color: '#b45309', darkColor: '#fbbf24' }, // Burnt umber (light) / Amber (dark)
  { name: 'Guides', href: '/guides', color: '#2563eb', darkColor: '#60a5fa' }, // Blue
  { name: 'Blog', href: '/blog', color: '#e11d48', darkColor: '#fb7185' }, // Rose
  { name: 'About', href: '/about', color: '#4f46e5', darkColor: '#818cf8' }, // Indigo
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    // Listen for hero visibility changes
    const handleHideHero = () => setHeroVisible(false)
    const handleShowHero = () => setHeroVisible(true)

    window.addEventListener('THINK_hideHero', handleHideHero)
    window.addEventListener('THINK_showHero', handleShowHero)

    return () => {
      window.removeEventListener('THINK_hideHero', handleHideHero)
      window.removeEventListener('THINK_showHero', handleShowHero)
    }
  }, [])

  const getItemColor = (item: typeof navigation[0]) => {
    if (!mounted) return item.color
    if (item.darkColor && resolvedTheme === 'dark') {
      return item.darkColor
    }
    return item.color
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <Container>
        <nav className="flex h-[72px] items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-baseline gap-1.5 group"
              onClick={(e) => {
                if (typeof window === 'undefined') return

                // If not on homepage, let the link navigate normally
                if (pathname !== '/') return

                // On homepage: check hero visibility
                if (!heroVisible) {
                  // Hero is hidden - show it and prevent navigation
                  e.preventDefault()
                  window.dispatchEvent(new CustomEvent('THINK_showHero'))
                } else {
                  // Hero is visible - cycle to next interactive background
                  e.preventDefault()
                  window.dispatchEvent(new CustomEvent('THINK_cycleBackground'))
                }
              }}
            >
              <MazeLogo className="h-8 w-8 text-primary group-hover:text-amber-500 transition-all duration-300 self-center" />
              <span className="text-[1.75rem] font-sans font-bold tracking-tight text-foreground group-hover:text-primary transition-all duration-300 leading-none">
                THINK
              </span>
              <span className="text-[0.95rem] font-logo font-semibold text-primary group-hover:text-amber-500 transition-all duration-300 leading-none relative top-[-2px]">
                @ UCSC
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-0.5">
            {navigation.map((item) => {
              const active = isActive(item.href)
              const hovered = hoveredItem === item.name
              const itemColor = getItemColor(item)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className={cn(
                    'relative px-4 py-2.5 text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200 rounded-lg',
                    active
                      ? 'text-foreground'
                      : 'text-foreground/70 hover:text-foreground'
                  )}
                  style={active ? { color: itemColor } : undefined}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="relative">
                    {item.name}
                    {/* Animated underline - width matches text */}
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full transition-all duration-300 ease-out origin-left"
                      style={{
                        backgroundColor: itemColor,
                        transform: `scaleX(${active || hovered ? 1 : 0})`,
                        opacity: active || hovered ? 1 : 0,
                      }}
                    />
                  </span>
                </Link>
              )
            })}
            <div className="ml-4 pl-4 border-l border-border/50">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 ease-out',
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="space-y-1 pb-4 pt-2">
            {navigation.map((item) => {
              const active = isActive(item.href)
              const itemColor = getItemColor(item)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  style={active ? { color: itemColor } : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    {/* Accent dot for active item */}
                    <span
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: active ? itemColor : 'transparent',
                        transform: active ? 'scale(1)' : 'scale(0)',
                      }}
                    />
                    {item.name}
                  </span>

                  {/* Left border accent on active */}
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-full"
                      style={{ backgroundColor: itemColor }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </Container>
    </header>
  )
}
