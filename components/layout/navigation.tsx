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
  { name: 'Home', href: '/', color: '#b45309', darkColor: '#eab308' }, // Burnt umber (light) / Amber (dark)
  { name: 'Projects', href: '/projects', color: '#06b6d4' }, // Cyan
  { name: 'Pedagogy', href: '/pedagogy', color: '#8b5cf6' }, // Violet
  { name: 'Resources', href: '/resources', color: '#b45309', darkColor: '#eab308' }, // Burnt umber (light) / Amber (dark)
  { name: 'Guides', href: '/guides', color: '#3b82f6' }, // Blue
  { name: 'Blog', href: '/blog', color: '#f43f5e' }, // Rose
  { name: 'About', href: '/about', color: '#6366f1' }, // Indigo
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getItemColor = (item: typeof navigation[0]) => {
    if (!mounted) return item.color
    if (item.darkColor && resolvedTheme === 'dark') {
      return item.darkColor
    }
    return item.color
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <Container>
        <nav className="flex h-[72px] items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-baseline gap-1.5 group">
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
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={cn(
                  'relative px-4 py-2.5 text-[16px] font-semibold tracking-[-0.01em] transition-all duration-200 rounded-lg',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-foreground/90 hover:text-foreground hover:bg-accent/60'
                )}
                style={pathname === item.href ? { color: getItemColor(item) } : undefined}
              >
                {item.name}
                {pathname === item.href && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] w-6 rounded-full transition-all duration-300"
                    style={{ backgroundColor: getItemColor(item) }}
                  />
                )}
              </Link>
            ))}
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
              className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden" role="navigation" aria-label="Mobile navigation">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={cn(
                    'block rounded-md px-3 py-2 text-base font-medium',
                    pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
