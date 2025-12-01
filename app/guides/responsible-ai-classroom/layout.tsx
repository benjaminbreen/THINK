import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Responsible AI in the Classroom | THINK Guides',
  description: 'Practical strategies for integrating AI tools responsibly in humanities education. Navigate academic integrity, assessment design, and student engagement.',
  openGraph: {
    title: 'Responsible AI in the Classroom | THINK Guides',
    description: 'Practical strategies for integrating AI tools responsibly in humanities education.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Responsible AI in the Classroom | THINK Guides',
    description: 'Practical strategies for integrating AI tools responsibly in humanities education.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
