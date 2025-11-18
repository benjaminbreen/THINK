import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Users, Target, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-serif font-bold mb-6 text-center">About THINK</h1>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-muted-foreground text-center mb-8">
                Teaching with and about AI in humanities classes
              </p>

              <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
              <p>
                THINK is a project at UC Santa Cruz funded by the National Endowment for the Humanities (NEH).
                Our mission is to create a comprehensive web platform with freely available educational resources
                for teaching with and about AI in humanities classes.
              </p>

              <p>
                We believe that AI technologies like Claude offer unprecedented opportunities for humanities
                education, enabling new forms of historical simulation, creative exploration, and critical
                analysis. At the same time, we recognize the importance of teaching students to think critically
                about these technologies—their capabilities, limitations, and implications.
              </p>

              <h2 className="text-3xl font-serif font-bold mb-4 mt-8">What We Do</h2>
              <p>
                The THINK project serves as a clearing house for AI-enabled historical simulations and
                educational resources. We develop, curate, and share:
              </p>
              <ul>
                <li>Interactive historical simulations powered by AI</li>
                <li>Pedagogy materials including syllabi, assignments, and guides</li>
                <li>Best practices for integrating AI into humanities teaching</li>
                <li>Tools and frameworks for building your own simulations</li>
                <li>Curated links to resources from the wider digital humanities community</li>
              </ul>
            </div>

            {/* Key Pillars */}
            <div className="grid gap-6 md:grid-cols-3 mb-12">
              <Card>
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Education First</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All our tools and resources are designed with educators and students in mind,
                    prioritizing pedagogical value and accessibility.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Lightbulb className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Critical Thinking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We emphasize critical engagement with AI technologies, teaching students to
                    evaluate and question AI-generated content.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Open Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All our materials are freely available, supporting the democratization of
                    AI-enabled humanities education.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-serif font-bold mb-4">The Team</h2>
              <p>
                THINK is led by Benjamin Breen at UC Santa Cruz, with support from the National
                Endowment for the Humanities. The project brings together historians, educators,
                and technologists committed to exploring the possibilities of AI in humanities education.
              </p>

              <h2 className="text-3xl font-serif font-bold mb-4 mt-8">Funding & Support</h2>
              <p>
                This project is made possible by a grant from the National Endowment for the Humanities
                and institutional support from UC Santa Cruz.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Partners & Links */}
      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Our Partners</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>UC Santa Cruz</CardTitle>
                  <CardDescription>Home institution of the THINK project</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://www.ucsc.edu" target="_blank" rel="noopener noreferrer">
                      Visit Website <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>National Endowment for the Humanities</CardTitle>
                  <CardDescription>Funding organization supporting this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://www.neh.gov" target="_blank" rel="noopener noreferrer">
                      Visit Website <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Interested in collaborating or learning more about the THINK project?
            </p>
            <Button asChild size="lg">
              <a href="mailto:contact@example.com">Contact Us</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
