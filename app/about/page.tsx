'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Users, Target, Lightbulb, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { AboutBackground } from '@/components/ui/about-background'
import { pageThemes } from '@/lib/page-themes'

const theme = pageThemes.about

export default function AboutPage() {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)

  return (
    <>
      <Section className="pt-16 pb-12 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AboutBackground />
        </div>
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="inline-block"
              onMouseEnter={() => setIsHeaderHovered(true)}
              onMouseLeave={() => setIsHeaderHovered(false)}
            >
              <h1 className="text-4xl font-serif font-bold mb-1">About THINK</h1>
              <div
                className="h-0.5 mx-auto transition-all duration-300"
                style={{
                  backgroundColor: theme.accent,
                  width: isHeaderHovered ? '100%' : '4rem'
                }}
              />
            </div>

            <div className="prose prose-lg max-w-none mt-3 mb-8">
              <p className="text-xl text-muted-foreground text-center mb-6">
                Technology + Humanities Integrated Knowledge
              </p>

              <h2 className="text-3xl font-serif font-bold mb-4">Our Mission</h2>
              <p>
                THINK is an NEH-funded curriculum at UC Santa Cruz teaching undergraduate and graduate students
                in the humanities how to work with AI critically and build their own tools.
              </p>

              <p>
                Large language models like ChatGPT are fundamentally textual technologies—they depend entirely
                on language, genre, and rhetoric. Yet most AI education treats humanities perspectives as optional.
                THINK flips that assumption: humanists should be leading conversations about these tools, not
                scrambling to catch up.
              </p>

              <h2 className="text-3xl font-serif font-bold mb-4 mt-8">The Challenge</h2>
              <p>
                Despite growing work in Critical AI studies, current approaches to AI education continue to neglect
                the crucial perspectives that the humanities offer. Co-PI Zac Zimmer's research exemplifies this gap:
                his work examining the Enron email corpus—a dataset of corporate fraud used to train countless workplace
                surveillance tools and natural language systems—reveals how "a generation of algorithms trained on data
                sets like this federally subpoenaed mash of fraudulent activity and banal corporate pleasantries" carries
                hidden ethical implications we haven't fully considered. There is vanishingly little substantive training
                in the humanities for this kind of critical engagement with LLMs, and virtually none that historically
                grounds these technologies or meaningfully connects them with the interrelations of sociopolitical power,
                financial capital, and social prestige.
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

              <h2 className="text-3xl font-serif font-bold mb-4 mt-8">Why This Matters</h2>
              <p>
                LLMs are, at their core, deeply textual technologies. They live and die by their relationship to language,
                genre, rhetoric—precisely the domains where humanities training matters most. Yet AI education continues to
                marginalize humanistic perspectives, treating them as afterthoughts to technical skills.
              </p>
              <p>
                THINK starts from a different premise. The best people to work with LLMs aren't just computer
                scientists—they're historians who know how archives get made, linguists who understand how meaning
                emerges from context, and literary scholars who recognize pastiche and imitation when they see it.
              </p>
              <p>
                These aren't supplementary skills—they're foundational. When ChatGPT hallucinates a primary source that
                sounds medievally perfect but never existed, you need a historian to spot it. When an LLM reproduces
                historical biases baked into its training data, you need scholars trained in critical analysis of power
                and representation. The technical and the humanistic aren't opposed—they're interdependent.
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
                    Students spot AI hallucinations, trace training data biases, and learn why plausible-sounding
                    outputs can be dangerously wrong.
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
                    Students audit the datasets used to train AI systems, build their own historical simulations,
                    and create tools for their research—no coding experience required.
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

              <h2 className="text-3xl font-serif font-bold mb-4 mt-8">What Doesn't Work: Honest Caveats</h2>
              <p>
                Let's be direct: ChatGPT has been catastrophic for facilitating student plagiarism. The ease of generating
                plausible-sounding essays has created massive challenges for academic integrity. We're not naive about this.
              </p>
              <p>
                The assignments in THINK are designed specifically to make AI-based cheating obvious and pedagogically useless.
                They require annotation of AI errors, fact-checking against original sources, and reflective analysis that can't
                be outsourced to an LLM without the gaps showing immediately. When students try to cut corners, the failure becomes
                a teachable moment—because the assignment itself is structured around understanding how and why AI fails.
              </p>
              <p>
                We've also learned that not every use of AI in the classroom enhances learning. Simply asking students to "use
                ChatGPT" without clear pedagogical scaffolding often produces shallow engagement. The difference between meaningful
                integration and gimmickry lies in the design: students need unassisted intellectual struggle early in their education,
                and they need to understand that AI is a tool for asking better questions, not a replacement for thinking.
              </p>

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

      {/* FAQ Section */}
      <Section className="border-t">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Common Questions</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Isn't this just teaching students to use ChatGPT?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    No. It's teaching students to recognize when ChatGPT is fabricating information—and why it sounds
                    plausible while being wrong. That's a humanities skill par excellence: close reading, source criticism,
                    and understanding how rhetoric creates the appearance of authority. Students learn by catching AI in the
                    act of hallucination, then investigating why it failed and what that reveals about how these systems work.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Won't this make students intellectually lazy?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Margaret Mead warned in 1963: automation only helps if you don't confuse eliminating drudgery with
                    eliminating thinking. Our pedagogy is built around that distinction. Students do the hard intellectual
                    work—researching, analyzing, fact-checking—while AI handles tasks like initial text generation or metadata
                    extraction. The difference matters enormously, and learning to recognize it is part of what we teach.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can't students just use AI to cheat on these assignments?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Yes, students can and do try. That's precisely why every THINK assignment requires original source work,
                    error annotation, and critical reflection that can't be outsourced to an LLM without it being immediately
                    obvious. When a student submits AI-generated analysis of "errors" that don't exist, or cites sources they
                    haven't read, the gaps are glaring. The assignment design makes cheating fail visibly.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do students need coding experience for this curriculum?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    No. The first three THINK courses have no prerequisites and require zero coding knowledge. Students learn
                    to prompt, critique, and work with AI tools through hands-on practice. In the fourth course (Applied LLM
                    Projects), students may choose to incorporate AI-generated code into their projects, but this is optional
                    and supported through scaffolded learning.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can faculty at other institutions use these materials?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Absolutely. All curriculum materials, simulations, and lesson plans are freely available on this site
                    under open licenses. We've designed modular extracts specifically for easy adoption—you can use a single
                    HistoryLens simulation in one class session, or build an entire unit around our pedagogical framework.
                    We welcome adaptation and are happy to support implementation at other institutions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Isn't AI just a passing trend in education?</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    LLMs represent a fundamental shift in how information is processed and presented, similar to the invention
                    of search engines or the printing press. Whether current models persist or evolve, the underlying challenge
                    remains: students need to understand how automated text generation works, where it fails, and how to maintain
                    critical thinking in an environment saturated with plausible-sounding but potentially unreliable information.
                    These are enduring pedagogical concerns, not temporary trends.
                  </CardDescription>
                </CardContent>
              </Card>
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
