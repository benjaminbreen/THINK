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
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}
