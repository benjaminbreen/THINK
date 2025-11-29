import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historical Persona Generator | THINK Projects',
  description: 'Procedurally generate historically accurate character personas with pixel-art portraits, life histories, family trees, and cultural context. 735 languages, 746+ professions, 571 locations across 9 cultural zones.',
  keywords: ['historical persona generator', 'character generator', 'world history', 'procedural generation', 'pixel art portraits', 'educational games', 'digital humanities'],
  openGraph: {
    title: 'Historical Persona Generator | THINK',
    description: 'Generate historically accurate character personas with pixel-art portraits, life histories, and cultural context spanning prehistory to the modern age.',
    type: 'website',
    url: 'https://historical-persona-generator.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Historical Persona Generator | THINK',
    description: 'Generate historically accurate character personas with pixel-art portraits, life histories, and cultural context.',
  },
}

export default function HistoricalPersonaGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
