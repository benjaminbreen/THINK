import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prompt Engineering for Humanities | THINK Guides',
  description: 'Learn to craft effective prompts for AI tools in humanities teaching and research. Practical techniques for educators building educational AI applications.',
  openGraph: {
    title: 'Prompt Engineering for Humanities | THINK Guides',
    description: 'Learn to craft effective prompts for AI tools in humanities teaching and research.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Engineering for Humanities | THINK Guides',
    description: 'Learn to craft effective prompts for AI tools in humanities teaching and research.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
