import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Github } from 'lucide-react'
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
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t mixed-mode-dark">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Brand */}
            <div className="md:col-span-3">
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
            <div className="md:col-span-2">
              <h3 className="text-sm font-bold mb-4">Projects</h3>
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
            <div className="md:col-span-2">
              <h3 className="text-sm font-bold mb-4">Resources</h3>
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

            {/* Borgesian Maze */}
            <div className="md:col-span-5 h-[300px] md:h-[350px]">
              <BorgesianMaze />
            </div>
          </div>

          <div className="mt-12 border-t pt-8">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} THINK Project, UC Santa Cruz. Funded by the National Endowment for the Humanities.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
