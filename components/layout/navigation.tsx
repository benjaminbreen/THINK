'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Pedagogy', href: '/pedagogy' },
  { name: 'Resources', href: '/resources' },
  { name: 'Guides', href: '/guides' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-1 group">
              <span className="text-2xl font-serif font-bold text-primary group-hover:text-amber-600 transition-colors">
                THINK
              </span>
              <span className="text-lg font-sans font-light text-muted-foreground/70">@ UCSC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors rounded-md',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-amber-600 rounded-full" />
                )}
              </Link>
            ))}
            <div className="ml-2 pl-2 border-l">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
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
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
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
