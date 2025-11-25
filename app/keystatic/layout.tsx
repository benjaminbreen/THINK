import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'THINK Blog Editor',
  robots: 'noindex, nofollow',
}

// Keystatic renders without navigation/footer (handled by LayoutWrapper)
export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
