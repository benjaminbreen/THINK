import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Github, ExternalLink } from 'lucide-react'

const footerLinks = {
  projects: [
    { name: 'HistoryLens', href: '/projects/historylens' },
    { name: 'Young Darwin', href: '/projects/young-darwin' },
    { name: 'History Simulator', href: '/projects/history-simulator' },
    { name: 'Apothecary Simulator', href: '/projects/apothecary-simulator' },
  ],
  resources: [
    { name: 'Pedagogy', href: '/pedagogy' },
    { name: 'External Resources', href: '/resources' },
    { name: 'Team', href: '/team' },
    { name: 'Blog', href: '/blog' },
  ],
  about: [
    { name: 'About THINK', href: '/about' },
    { name: 'UCSC', href: 'https://www.ucsc.edu', external: true },
    { name: 'NEH', href: 'https://www.neh.gov', external: true },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 group">
                <span className="text-2xl font-serif font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-primary transition-all">
                  THINK
                </span>
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
            <div>
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

            {/* About */}
            <div>
              <h3 className="text-sm font-bold mb-4">About</h3>
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
