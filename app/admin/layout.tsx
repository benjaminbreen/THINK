import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'THINK Content Manager',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Minimal layout for the CMS - bypasses main site layout styles
  return children
}
