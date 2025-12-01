import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Code Basics for Humanities | THINK Guides',
  description: 'A beginner-friendly guide to using Claude Code for humanities projects. Build text analyzers, historical simulations, and educational tools with AI assistance.',
  openGraph: {
    title: 'Claude Code Basics for Humanities | THINK Guides',
    description: 'A beginner-friendly guide to using Claude Code for humanities projects.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Basics for Humanities | THINK Guides',
    description: 'A beginner-friendly guide to using Claude Code for humanities projects.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
