import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, BookOpen, Code, Users, Newspaper } from 'lucide-react'

const resources = {
  tools: [
    {
      title: 'Claude API',
      description: 'Anthropic\'s powerful AI API for building applications',
      link: 'https://www.anthropic.com',
      category: 'AI Platform',
    },
    {
      title: 'Claude Code',
      description: 'AI-powered coding assistant for building simulations',
      link: 'https://claude.ai',
      category: 'Development Tool',
    },
  ],
  educational: [
    {
      title: 'Digital Humanities Quarterly',
      description: 'Open-access journal covering digital humanities scholarship',
      link: 'http://www.digitalhumanities.org/dhq/',
      category: 'Journal',
    },
    {
      title: 'Programming Historian',
      description: 'Peer-reviewed tutorials for digital humanities methods',
      link: 'https://programminghistorian.org',
      category: 'Tutorial',
    },
    {
      title: 'Humanities Commons',
      description: 'Network for humanities scholars sharing work and ideas',
      link: 'https://hcommons.org',
      category: 'Community',
    },
  ],
  aiEthics: [
    {
      title: 'AI & Education Resources',
      description: 'Collection of resources on AI ethics in education',
      link: '#',
      category: 'Ethics',
    },
    {
      title: 'Responsible AI Practices',
      description: 'Guidelines for ethical AI use in humanities teaching',
      link: '#',
      category: 'Guidelines',
    },
  ],
  organizations: [
    {
      title: 'National Endowment for the Humanities',
      description: 'Federal agency supporting humanities research and education',
      link: 'https://www.neh.gov',
      category: 'Funding',
    },
    {
      title: 'Alliance of Digital Humanities Organizations',
      description: 'International organization promoting digital humanities',
      link: 'https://adho.org',
      category: 'Organization',
    },
  ],
}

interface ResourceLinkProps {
  title: string
  description: string
  link: string
  category: string
}

function ResourceLink({ title, description, link, category }: ResourceLinkProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <Badge variant="outline" className="w-fit">{category}</Badge>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </a>
  )
}

export default function ResourcesPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">External Resources</h1>
            <p className="text-lg text-muted-foreground">
              Curated links to tools, platforms, and resources from the wider community
            </p>
          </div>

          {/* AI Tools & Platforms */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Code className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-serif font-bold">AI Tools & Platforms</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.tools.map((resource, index) => (
                <ResourceLink key={index} {...resource} />
              ))}
            </div>
          </div>

          {/* Educational Resources */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-serif font-bold">Educational Resources</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.educational.map((resource, index) => (
                <ResourceLink key={index} {...resource} />
              ))}
            </div>
          </div>

          {/* AI Ethics & Responsible Use */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Newspaper className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-serif font-bold">AI Ethics & Responsible Use</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.aiEthics.map((resource, index) => (
                <ResourceLink key={index} {...resource} />
              ))}
            </div>
          </div>

          {/* Organizations */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-serif font-bold">Organizations & Communities</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {resources.organizations.map((resource, index) => (
                <ResourceLink key={index} {...resource} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Submit Resource CTA */}
      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Know a Great Resource?</h2>
            <p className="text-muted-foreground mb-8">
              Help us build this collection by suggesting resources that would benefit the community
            </p>
            <a
              href="mailto:contact@example.com?subject=Resource Suggestion"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Suggest a Resource
            </a>
          </div>
        </Container>
      </Section>
    </>
  )
}
