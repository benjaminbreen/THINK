'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Github, ExternalLink } from 'lucide-react'
import { BorgesianMaze } from '@/components/ui/borgesian-maze'
import { MazeLogo } from '@/components/ui/maze-logo'

const footerLinks = {
  projects: [
    { name: 'HistoryLens', href: '/projects/historylens' },
    { name: 'Young Darwin', href: '/projects/young-darwin' },
    { name: 'History Simulator', href: '/projects/history-simulator' },
    { name: 'Apothecary Simulator', href: '/projects/apothecary-simulator' },
  ],
  resources: [
    { name: 'Pedagogy', href: '/pedagogy' },
    { name: 'Resources', href: '/resources' },
    { name: 'Guides', href: '/guides' },
    { name: 'Blog', href: '/blog' },
  ],
  about: [
    { name: 'About THINK', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'UCSC', href: 'https://www.ucsc.edu', external: true },
    { name: 'NEH', href: 'https://www.neh.gov', external: true },
  ],
}

export function Footer() {
  const [showMaze, setShowMaze] = useState(false)
  const [showColophon, setShowColophon] = useState(false)

  return (
    <>
      <footer className="border-t bg-gradient-to-b from-background to-muted/20">
        <Container>
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Brand */}
              <div className="md:col-span-1">
                <Link href="/" className="flex items-center space-x-2 group">
                  <MazeLogo className="h-8 w-8 text-primary group-hover:text-amber-600 transition-colors" />
                  <span className="text-2xl font-serif font-bold text-primary group-hover:text-amber-600 transition-colors">
                    THINK
                  </span>
                  <span className="text-xl font-sans font-light text-muted-foreground">@ UCSC</span>
                </Link>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Teaching with and about AI in humanities classes
                </p>
                <div className="mt-6 flex space-x-4">
                  <a
                    href="https://github.com/benjaminbreen/THINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-sm font-bold mb-4 text-foreground">Projects</h3>
                <ul className="space-y-3">
                  {footerLinks.projects.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-sm font-bold mb-4 text-foreground">Resources</h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About */}
              <div>
                <h3 className="text-sm font-bold mb-4 text-foreground">About</h3>
                <ul className="space-y-3">
                  {footerLinks.about.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform duration-200"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground text-center">
                © {new Date().getFullYear()} THINK Project, UC Santa Cruz. Funded by the National Endowment for the Humanities and the Humanities Institute, UC Santa Cruz.
              </p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                <button
                  onClick={() => setShowColophon(true)}
                  className="hover:text-primary transition-colors underline underline-offset-2"
                >
                  Colophon
                </button>
              </p>

              {/* Hidden Maze Easter Egg Trigger */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowMaze(true)}
                  className="group cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300"
                  aria-label="Open hidden labyrinth"
                  title="The Garden of Forking Paths"
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform group-hover:scale-110 transition-transform duration-300"
                  >
                    {/* Outer maze structure */}
                    <rect x="4" y="4" width="40" height="40" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />

                    {/* Maze paths - intricate pattern */}
                    <path d="M4 12 L16 12" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M20 4 L20 20" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M28 8 L28 16" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M36 4 L36 12" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M12 20 L28 20" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M32 16 L44 16" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M12 28 L20 28" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M28 24 L28 36" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M36 20 L36 32" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M4 36 L12 36" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M20 32 L36 32" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M40 24 L44 24" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M12 44 L12 36" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M20 40 L32 40" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />
                    <path d="M40 36 L44 36" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-amber-600 transition-colors" />

                    {/* Center symbol - stylized @ for player */}
                    <circle cx="24" cy="24" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <circle cx="24" cy="24" r="1.5" fill="currentColor" className="text-amber-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Container>
      </footer>

      {/* Hidden Borgesian Maze - activated by clicking "Humanities" */}
      {showMaze && (
        <>
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            onClick={() => setShowMaze(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 h-[70vh]">
            <div className="relative w-full h-full bg-slate-900 rounded-t-lg overflow-hidden">
              <button
                onClick={() => setShowMaze(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors text-white flex items-center justify-center"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="absolute inset-0">
                <BorgesianMaze />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Colophon Modal */}
      {showColophon && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setShowColophon(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-background border rounded-lg shadow-xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowColophon(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
              <h2 className="text-xl font-serif font-bold mb-4">Colophon</h2>
              <div className="prose prose-sm text-muted-foreground">
                <p className="mb-3">
                  This website was designed and built by{' '}
                  <strong className="text-foreground">Claude Sonnet 4.5</strong>, an AI assistant developed by Anthropic.
                </p>
                <p className="mb-3">
                  Oversight, design guidance, and testing by{' '}
                  <strong className="text-foreground">Benjamin Breen</strong>, Assistant Professor of History at UC Santa Cruz.
                </p>
                <p className="text-xs mt-4 pt-4 border-t border-border/50">
                  Built with Next.js, Tailwind CSS, and shadcn/ui. Source code available on{' '}
                  <a
                    href="https://github.com/benjaminbreen/THINK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    GitHub
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
