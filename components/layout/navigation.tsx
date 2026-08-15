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
  const [scrolled, setScrolled] = useState(false)

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

  // The header gains a shadow once the page is scrolled away from the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Lock the page behind the open menu, and let Escape dismiss it
  useEffect(() => {
    if (!mobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileMenuOpen])

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

  const handleLogoClick = (e: React.MouseEvent) => {
    if (typeof window === 'undefined') return

    // If not on homepage, let the link navigate normally
    if (pathname !== '/') return

    // On homepage: reveal a hidden hero, otherwise cycle the background
    e.preventDefault()
    window.dispatchEvent(
      new CustomEvent(heroVisible ? 'THINK_cycleBackground' : 'THINK_showHero')
    )
  }

  const wordmark = (
    <>
      <MazeLogo className="h-7 w-7 self-center text-primary transition-colors duration-300 group-hover:text-amber-500 sm:h-8 sm:w-8" />
      <span className="text-2xl font-bold leading-none tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-[1.6rem]">
        THINK
      </span>
      <span className="relative top-[-1px] font-logo text-[0.8rem] font-semibold leading-none text-primary transition-colors duration-300 group-hover:text-amber-500 sm:text-[0.9rem]">
        @ UCSC
      </span>
    </>
  )

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'border-border/70 bg-background/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/80'
          : 'border-transparent bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/55'
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-[72px]">
          <Link
            href="/"
            className="group flex items-baseline gap-1.5 rounded-lg py-1 pr-1"
            onClick={handleLogoClick}
          >
            {wordmark}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-0.5">
            {navigation.map((item) => {
              const active = isActive(item.href)
              const hovered = hoveredItem === item.name
              const itemColor = getItemColor(item)

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-lg px-3 py-2 text-[0.9375rem] font-medium tracking-[-0.01em] transition-colors duration-200 lg:px-3.5',
                    active ? 'text-foreground' : 'text-foreground/65 hover:text-foreground'
                  )}
                  style={active ? { color: itemColor } : undefined}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="relative">
                    {item.name}
                    {/* Underline sweeps out from the left on hover or when active */}
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full transition-[transform,opacity] duration-300 ease-out-expo"
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
            <div className="ml-3 border-l border-border/60 pl-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-accent hover:text-foreground active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu
                className={cn(
                  'absolute h-[22px] w-[22px] transition-all duration-300 ease-out-expo',
                  mobileMenuOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
                )}
                aria-hidden="true"
              />
              <X
                className={cn(
                  'absolute h-[22px] w-[22px] transition-all duration-300 ease-out-expo',
                  mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
                )}
                aria-hidden="true"
              />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile menu — a sheet that overlays the page rather than pushing it */}
      <div
        className={cn(
          'fixed inset-x-0 top-16 z-40 md:hidden',
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-[calc(100vh-4rem)] bg-foreground/25 backdrop-blur-[2px] transition-opacity duration-300',
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className={cn(
            'relative max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-border bg-background shadow-lg',
            'origin-top transition-all duration-300 ease-out-expo',
            mobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-3 opacity-0'
          )}
        >
          <Container>
            <ul className="safe-b space-y-0.5 pt-2">
              {navigation.map((item) => {
                const active = isActive(item.href)
                const itemColor = getItemColor(item)

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-[46px] items-center gap-3 rounded-xl px-3 text-base font-medium transition-colors duration-200',
                        active
                          ? 'bg-accent/70 text-foreground'
                          : 'text-foreground/75 active:bg-accent/40'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {/* A colored bar marks the current section */}
                      <span
                        className="h-5 w-[3px] shrink-0 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: itemColor,
                          opacity: active ? 1 : 0.3,
                          transform: active ? 'scaleY(1)' : 'scaleY(0.55)',
                        }}
                      />
                      <span style={active ? { color: itemColor } : undefined}>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Container>
        </div>
      </div>
    </header>
  )
}
