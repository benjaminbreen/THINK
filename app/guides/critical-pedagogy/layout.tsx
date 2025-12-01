import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Critical AI Pedagogy | THINK Guides',
  description: 'Teaching students to think critically about AI through hands-on experimentation. Transform hallucinations and limitations into learning opportunities.',
  openGraph: {
    title: 'Critical AI Pedagogy | THINK Guides',
    description: 'Teaching students to think critically about AI through hands-on experimentation.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Critical AI Pedagogy | THINK Guides',
    description: 'Teaching students to think critically about AI through hands-on experimentation.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
