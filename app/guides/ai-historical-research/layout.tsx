import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI for Historical Research | THINK Guides',
  description: 'Separating hype from reality in AI-assisted historical research. Learn what actually works for transcription, translation, analysis, and source discovery.',
  openGraph: {
    title: 'AI for Historical Research | THINK Guides',
    description: 'Separating hype from reality in AI-assisted historical research.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Historical Research | THINK Guides',
    description: 'Separating hype from reality in AI-assisted historical research.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
