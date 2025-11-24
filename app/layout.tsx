import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'THINK - AI-Enabled Historical Simulations & Pedagogy',
  description: 'A clearing house for AI-enabled historical simulations, educational resources, and pedagogy materials for teaching with and about AI in humanities classes.',
  keywords: ['AI', 'education', 'history', 'simulations', 'pedagogy', 'humanities'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
