import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'THINK Blog Editor',
  robots: 'noindex, nofollow',
}

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Minimal layout - no nav/footer, just the Keystatic UI
  return <>{children}</>
}
