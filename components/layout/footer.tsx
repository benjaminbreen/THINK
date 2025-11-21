'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Github, ExternalLink } from 'lucide-react'
import { BorgesianMaze } from '@/components/ui/borgesian-maze'

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

  return (
    <>
      <footer className="border-t bg-gradient-to-b from-background to-muted/20">
        <Container>
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Brand */}
              <div className="md:col-span-1">
                <Link href="/" className="flex items-center space-x-1 group">
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
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} THINK Project, UC Santa Cruz. Funded by the National Endowment for the{' '}
                <button
                  onClick={() => setShowMaze(true)}
                  className="hover:text-amber-600 transition-colors underline decoration-dotted underline-offset-2 cursor-pointer"
                  aria-label="Open hidden maze"
                >
                  Humanities
                </button>
                .
              </p>
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
    </>
  )
}
