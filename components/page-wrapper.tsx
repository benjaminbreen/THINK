'use client'

import dynamic from 'next/dynamic'

// Lazy load heavy interactive components to improve initial page load
export const InteractiveBackground = dynamic(
  () => import('@/components/ui/interactive-background').then(mod => ({ default: mod.InteractiveBackground })),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-background to-muted" />
  }
)

export const LiteraryTransformer = dynamic(
  () => import('@/components/ui/literary-transformer').then(mod => ({ default: mod.LiteraryTransformer })),
  { ssr: false }
)
