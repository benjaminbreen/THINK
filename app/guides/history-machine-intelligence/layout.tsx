import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A History of Machine Intelligence | THINK Guides',
  description: 'From 18th-century mechanist philosophy to contemporary AI—a humanities perspective on thinking machines. Explore the intellectual history of machine intelligence.',
  openGraph: {
    title: 'A History of Machine Intelligence | THINK Guides',
    description: 'From 18th-century mechanist philosophy to contemporary AI—a humanities perspective on thinking machines.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A History of Machine Intelligence | THINK Guides',
    description: 'From 18th-century mechanist philosophy to contemporary AI—a humanities perspective on thinking machines.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
