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
      <ScrollProgress />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  )
}
