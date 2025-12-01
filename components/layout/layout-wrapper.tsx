'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { BackToTop } from '@/components/ui/back-to-top'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isKeystatic = pathname?.startsWith('/keystatic')

  if (isKeystatic) {
    // Render Keystatic without navigation and footer
    return <>{children}</>
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Skip to content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navigation />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  )
}
