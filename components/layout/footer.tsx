'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Github, ExternalLink, X } from 'lucide-react'
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

const columns = [
  { title: 'Projects', links: footerLinks.projects },
  { title: 'Resources', links: footerLinks.resources },
  { title: 'About', links: footerLinks.about },
]

export function Footer() {
  const [showMaze, setShowMaze] = useState(false)
  const [showColophon, setShowColophon] = useState(false)

  return (
    <>
      <footer className="mt-auto border-t border-border/70 bg-gradient-to-b from-background to-muted/30">
        <Container>
          <div className="py-14 sm:py-16">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="group inline-flex items-baseline gap-1.5">
                  <MazeLogo className="h-7 w-7 self-center text-primary transition-colors duration-300 group-hover:text-amber-500" />
                  <span className="text-2xl font-bold leading-none tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    THINK
                  </span>
                  <span className="relative top-[-1px] font-logo text-[0.8rem] font-semibold leading-none text-primary transition-colors duration-300 group-hover:text-amber-500">
                    @ UCSC
                  </span>
                </Link>
                <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-muted-foreground">
                  Teaching with and about AI in humanities classes
                </p>
                <a
                  href="https://github.com/benjaminbreen/THINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  aria-label="GitHub Repository"
                >
                  <Github className="h-[18px] w-[18px]" />
                </a>
              </div>

              {columns.map((column) => (
                <nav key={column.title} aria-label={column.title}>
                  <h3 className="eyebrow mb-4">{column.title}</h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        {'external' in link && link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                          >
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                              {link.name}
                            </span>
                            <ExternalLink className="external-link-icon h-3 w-3 opacity-60" />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="inline-block text-sm text-muted-foreground transition-[color,transform] duration-200 hover:translate-x-0.5 hover:text-primary"
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            <div className="mt-14 border-t border-border/60 pt-8">
              <div className="flex flex-col items-center gap-4 text-center">
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  © {new Date().getFullYear()} THINK Project, UC Santa Cruz. Funded by the National Endowment for the Humanities and the Humanities Institute, UC Santa Cruz.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowColophon(true)}
                    className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/50"
                  >
                    Colophon
                  </button>

                  {/* The labyrinth hides in plain sight */}
                  <button
                    onClick={() => setShowMaze(true)}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full opacity-40 transition-opacity duration-300 hover:opacity-100"
                    aria-label="Open hidden labyrinth"
                    title="The Garden of Forking Paths"
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-muted-foreground transition-[transform,color] duration-300 group-hover:scale-110 group-hover:text-amber-600"
                    >
                      <g stroke="currentColor" strokeWidth="2">
                        <rect x="4" y="4" width="40" height="40" />
                        <path d="M4 12 L16 12" />
                        <path d="M20 4 L20 20" />
                        <path d="M28 8 L28 16" />
                        <path d="M36 4 L36 12" />
                        <path d="M12 20 L28 20" />
                        <path d="M32 16 L44 16" />
                        <path d="M12 28 L20 28" />
                        <path d="M28 24 L28 36" />
                        <path d="M36 20 L36 32" />
                        <path d="M4 36 L12 36" />
                        <path d="M20 32 L36 32" />
                        <path d="M40 24 L44 24" />
                        <path d="M12 44 L12 36" />
                        <path d="M20 40 L32 40" />
                        <path d="M40 36 L44 36" />
                      </g>
                      <circle cx="24" cy="24" r="3" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </footer>

      {/* Hidden Borgesian Maze */}
      {showMaze && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowMaze(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 h-[70vh]">
            <div className="relative h-full w-full overflow-hidden rounded-t-2xl bg-slate-900 shadow-xl">
              <button
                onClick={() => setShowMaze(false)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
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
            className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowColophon(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="colophon-title"
              className="relative w-full max-w-md rounded-2xl border border-border bg-card p-7 shadow-xl animate-sheet-in"
            >
              <button
                onClick={() => setShowColophon(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <h2 id="colophon-title" className="mb-5 text-headline font-serif font-bold">
                Colophon
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  This website was designed and built by{' '}
                  <strong className="font-semibold text-foreground">Claude</strong>, an AI assistant developed by Anthropic.
                </p>
                <p>
                  Oversight, design guidance, and testing by{' '}
                  <strong className="font-semibold text-foreground">Benjamin Breen</strong>, Assistant Professor of History at UC Santa Cruz.
                </p>
                <p className="border-t border-border/60 pt-4 text-xs">
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
