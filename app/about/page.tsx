import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Users, Target, Lightbulb, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-serif font-bold mb-6 text-center">About THINK</h1>

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-muted-foreground text-center mb-8">
                Technology + Humanities Integrated Knowledge
              </p>

              <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
              <p>
                THINK is a transformative curriculum at UC Santa Cruz, funded by the National Endowment
                for the Humanities. Our mission is to equip undergraduate and early graduate students in the
                humanities with both the practical skills and critical perspectives needed to engage with AI
                technologies thoughtfully, creatively, and ethically.
              </p>

              <p>
                As large language models like ChatGPT become increasingly powerful and pervasive, it is essential
                that students—particularly in humanities disciplines that rely on the interpretation of text—cultivate
                the skills needed to work with these tools while maintaining a critical understanding of their social,
                cultural, and political dimensions.
              </p>

              <h2 className="text-3xl font-serif font-bold mb-4 mt-8">The Challenge</h2>
              <p>
                Despite growing work in Critical AI studies, current approaches to AI education continue to neglect
                the crucial perspectives that the humanities offer. There is vanishingly little substantive training
                in the humanities for responsible use of contemporary tools like LLMs, and virtually none that
                historically grounds these technologies or meaningfully connects them with the interrelations of
                sociopolitical power, financial capital, and social prestige.
              </p>

              <h2 className="text-3xl font-serif font-bold mb-4 mt-8">Our Approach</h2>
              <p>
                THINK consists of four upper-division courses designed for advanced undergraduates and early
                graduate students in the humanities:
              </p>
              <ul>
                <li><strong>The History of AI</strong> - Contextualizing the rise of LLMs within longer histories of information technologies</li>
                <li><strong>Data and Memory</strong> - Critiquing the societal impacts of the data practices that underpin AI</li>
                <li><strong>Modeling Language</strong> - Understanding how language models work and their implications</li>
                <li><strong>Applied LLM Projects in the Humanities</strong> - Hands-on experiential learning through small group projects</li>
              </ul>

              <p>
                The first three courses have no prerequisites and are capped at 100 students each. Students must
                complete at least one before enrolling in the fourth course, a project-based experiential learning
                course limited to 40 students.
              </p>

              <p>
                Assignments range from probing the contingency of archives used to train LLMs to constructing
                "counterfactual datasets" that surface marginalized forms of knowledge. By the end of year 3,
                we expect to reach approximately 500 students at UCSC through two iterations of these four courses.
              </p>
            </div>

            {/* Key Pillars */}
            <div className="grid gap-6 md:grid-cols-3 mb-12">
              <Card>
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Critical Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Students develop metacognitive awareness of how AI systems shape knowledge production
                    while learning to identify their limitations and biases.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Lightbulb className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Hands-On Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Through experiential projects like auditing training datasets and building historical
                    simulations, students gain real-world AI skills grounded in humanistic frameworks.
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
                    All curriculum materials and simulations are freely available, with modular extracts
                    designed for easy adoption at other institutions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-serif font-bold mb-4">Beyond UCSC</h2>
              <p>
                To expand THINK's reach, we are developing modular curriculum extracts that can be easily
                imported into humanistic college courses. These modules, along with HistoryLens simulations
                and lesson plans, are publicly available on this website.
              </p>

              <p>
                We are partnering with the Bay Area Community College Consortium (BACCC) to pilot and refine
                these modules, aiming to reach 10-20 community college instructors and at least 1,000 students
                beyond UCSC.
              </p>

              <div className="not-prose my-8">
                <Button asChild>
                  <Link href="/pedagogy">Explore Curriculum Materials</Link>
                </Button>
              </div>

              <h2 className="text-3xl font-serif font-bold mb-4 mt-8">HistoryLens</h2>
              <p>
                A flagship component of THINK is HistoryLens, an innovative pedagogical tool that combines
                historical primary sources with detailed LLM prompts to generate richly detailed interactive
                simulations of historical settings and events.
              </p>

              <p>
                Trials across three classes involving over 200 UCSC humanities students have shown promising results:
              </p>
              <ul>
                <li>81% reported the simulations greatly or somewhat enhanced their understanding of historical periods/figures</li>
                <li>43% found it helped them contextualize the nature of primary sources</li>
                <li>48% found classroom discussions on AI inaccuracies to be a highlight</li>
                <li>33% found learning to use LLMs in class beneficial</li>
              </ul>

              <div className="not-prose my-8">
                <Button asChild variant="outline">
                  <Link href="/projects/historylens">Learn More About HistoryLens</Link>
                </Button>
              </div>

              <h2 className="text-3xl font-serif font-bold mb-4 mt-8">Project Origins</h2>
              <p>
                THINK builds on three recent pedagogical initiatives at UCSC:
              </p>
              <ul>
                <li><strong>Humanizing Technology (HumTech)</strong> - An NEH-supported initiative launched in Fall 2022
                that infuses humanistic approaches into the undergraduate engineering curriculum</li>
                <li><strong>AI and Human Imagination</strong> - An undergraduate course introducing students to AI
                as a socio-technical system, designed under an award from the National Humanities Center</li>
                <li><strong>HistoryLens</strong> - LLM-powered historical simulations that increase student engagement,
                encourage historical empathy, and build critical reflection about knowledge construction</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Project Team</h2>
            <p className="text-center text-muted-foreground mb-8">
              THINK is led by an interdisciplinary team of humanities faculty at UC Santa Cruz
            </p>
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card>
                <CardHeader>
                  <GraduationCap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Benjamin Breen</CardTitle>
                  <CardDescription>Principal Investigator</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Associate Professor of History, creator of HistoryLens
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <GraduationCap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Pranav Anand</CardTitle>
                  <CardDescription>Co-Principal Investigator</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Professor of Linguistics
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <GraduationCap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Zac Zimmer</CardTitle>
                  <CardDescription>Co-Principal Investigator</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Associate Professor of Literature
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
              <Button asChild variant="outline">
                <Link href="/team">Meet the Full Team</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Partners & Links */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Partners & Collaborators</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>UC Santa Cruz</CardTitle>
                  <CardDescription>Home institution</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://www.ucsc.edu" target="_blank" rel="noopener noreferrer">
                      Visit <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>National Endowment for the Humanities</CardTitle>
                  <CardDescription>Funding agency</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://www.neh.gov" target="_blank" rel="noopener noreferrer">
                      Visit <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bay Area Community College Consortium</CardTitle>
                  <CardDescription>Partner for module development</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" size="sm">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Visit <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section className="bg-muted/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Interested in collaborating, piloting our curriculum modules, or learning more about THINK?
            </p>
            <Button asChild size="lg">
              <a href="mailto:bbreen@ucsc.edu">Contact Us</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
