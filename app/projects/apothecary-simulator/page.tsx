'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProjectBanner } from '@/components/ui/project-banner'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Github, Play, BookOpen, Code, Scale, User, Building2, GraduationCap, FileText } from 'lucide-react'
import { TagList, TagLink } from '@/components/ui/tag-link'
import { ImageModal } from '@/components/ui/image-modal'
import { FolderTabs } from '@/components/ui/folder-tabs'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CopyButton } from '@/components/ui/copy-button'

export default function ApothecarySimulatorPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reading' | 'code'>('overview')

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Apothecary Simulator' }
      ]} />

      <Section className="pt-8 pb-8">
        <Container>

          <div className="mx-auto max-w-4xl">
            <ProjectBanner
              thumbnailPath="/thumbnails/apothecary-simulator.png"
              projectTitle="Apothecary Simulator"
            />

            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-display font-serif font-bold">Apothecary Simulator</h1>
                    <Badge className="bg-cyan-600">Active</Badge>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    An AI-powered historical simulation of medicine in 1680s colonial Mexico
                  </p>
                </div>
              </div>

              {/* Author / Institution / Disciplines */}
              <div className="flex flex-wrap gap-4 text-sm mb-4 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Author:</span>
                  <span className="font-medium">Benjamin Breen</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Institution:</span>
                  <span className="font-medium">UC Santa Cruz</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Disciplines:</span>
                  <TagLink tag="History of Medicine" size="sm" />
                  <TagLink tag="Colonial Latin America" size="sm" />
                </div>
              </div>

              {/* Open Source Badge */}
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                  <Scale className="mr-1 h-3 w-3" />
                  Open Source (MIT License)
                </Badge>
                <Badge variant="outline">Free for Educational Use</Badge>
              </div>

              {/* Tags */}
              <TagList
                tags={['History of Medicine', 'Colonial Latin America', 'AI Simulation', 'Primary Sources', 'Converso History', 'Educational Games']}
                className="mb-6"
              />

              {/* Minimal Green Launch Button */}
              <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 mb-8">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-emerald-800 dark:text-emerald-200">
                      This project is freely available online. You can try it here:
                    </p>
                    <Button asChild size="default" className="bg-emerald-600 hover:bg-emerald-700 text-white group">
                      <a href="https://apothecary-simulator.vercel.app" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4 external-link-icon" />
                        Launch Apothecary Simulator
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tab Navigation */}
            <FolderTabs
              tabs={[
                { id: 'overview', label: 'Overview', icon: BookOpen },
                { id: 'reading', label: 'Further Reading', icon: FileText },
                { id: 'code', label: 'Source Code', icon: Code }
              ]}
              activeTab={activeTab}
              onTabChange={(id) => setActiveTab(id as 'overview' | 'reading' | 'code')}
            />

            {/* Tab Content */}
            {activeTab === 'overview' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="prose prose-lg lg:prose-xl max-w-none dark:prose-invert prose-p:leading-relaxed">
                    <h2>Introduction</h2>
                    <p>
                      <strong>Apothecary Simulator</strong> is an AI-powered historical simulation where players assume the role of Maria de Lima,
                      a converso (Jewish convert) apothecary in 1680 Mexico City. The game is based on research from my book{' '}
                      <a href="https://www.pennpress.org/9780812224672/the-age-of-intoxication/" target="_blank" rel="noopener noreferrer">
                        <em>The Age of Intoxication: Origins of the Global Drug Trade</em>
                      </a> (University of Pennsylvania Press, 2019).
                    </p>
                    <p>
                      I designed this simulation primarily for courses in <strong>history of medicine</strong>, <strong>early modern history</strong>,
                      and <strong>colonial Latin American history</strong>. However, it also serves as a <strong>prototype for a broader model</strong>:
                      LLM-based educational games that use primary sources and expert-designed historical scenarios to create meaningful learning experiences.
                    </p>
                    <p>
                      This same approach—combining large language models with carefully curated historical data to simulate medical diagnosis—could
                      potentially be adapted for <strong>medical education</strong> contexts, allowing students to practice clinical reasoning in
                      historically or culturally diverse settings.
                    </p>

                    <div className="bg-muted/50 p-4 rounded-lg border my-6">
                      <p className="text-sm mb-0">
                        <strong>Key Innovation:</strong> For the first time, educational games can make <em>qualitative assessments</em> of learning.
                        Players "win" not by selecting correct multiple-choice answers, but by demonstrating historically accurate reasoning
                        through open-ended dialogue and decision-making.
                      </p>
                    </div>

                    <h2>Historical Context</h2>
                    <p>
                      Apothecaries were the historical predecessors to today's pharmacists. But the medicines they crafted were
                      far stranger and more surprising than what you might find in a pharmacy today. The practice of apothecaries in
                      the 17th century was rooted in a blend of empirical knowledge, classical Greek, Roman, Muslim, and medieval
                      Christian traditional medicine, and practices involving astrology, alchemy, and natural magic.
                    </p>
                    <p>
                      Maria de Lima, the protagonist of this game, is an adaptation of the real-life female apothecary
                      Maria Coelho. She is a semi-fictional apothecary in colonial Mexico City in the year 1680, a time when medicine
                      was changing more rapidly than ever before.
                    </p>

                    <figure className="my-8">
                      <ImageModal
                        src="/images/apothecary-simulator-diagnosis.jpg"
                        alt="The diagnosis interface where players examine patients using 17th-century medical epistemology"
                        width={800}
                        height={500}
                        className="rounded-lg border w-full h-auto"
                      />
                      <figcaption className="text-center text-sm text-muted-foreground mt-2">
                        The diagnosis interface where players examine patients using 17th-century medical epistemology
                        <span className="block text-xs mt-1 opacity-70">(Click to enlarge)</span>
                      </figcaption>
                    </figure>

                    <h3>The Role of Apothecaries</h3>
                    <p>
                      The apothecaries of the 17th century occupied a unique and precarious position. On the one hand, they were
                      critical figures in their communities, acting as front-line healers for clientele who might not be able to
                      afford to visit physicians, while also creating drugs for physicians to prescribe. On the other hand, their
                      involvement in the lucrative but controversial trade in medicinal drugs exposed them to accusations of fraud,
                      heresy, and professional malpractice.
                    </p>
                    <p>
                      At the heart of the apothecaries' trade was their intimate knowledge of drugs, referred to as "simples" when
                      in their raw, unprocessed state. Apothecaries like Maria Coelho, the daughter of a Jewish convert (converso)
                      family in Portugal, mastered the art of transforming these simples into potent "compound remedies."
                    </p>

                    <h3>Colonial Mexico's Medical Practices</h3>
                    <p>
                      In colonial Mexico, medicine was influenced by a combination of Indigenous, European, and African healing
                      traditions. The blending of these traditions created a unique medical landscape where apothecaries like Maria
                      navigated complex social and cultural dynamics.
                    </p>
                    <p>
                      As Paula de Vos notes in her 2007 article "From Herbs to Alchemy," the majority of medicines used by
                      apothecaries in colonial Mexico were of plant origin, supplemented by some animal and mineral ingredients.
                      These substances were prepared as waters, syrups, ointments, and other formulations according to Galenic
                      principles, which emphasized balancing the body's humors.
                    </p>

                    <h3>The Real Maria de Lima</h3>
                    <p>
                      Maria de Lima is based on a real-life apothecary named Maria Coelho, who lived in 17th-century Coimbra,
                      Portugal. Maria Coelho was part of a family of converso apothecaries, descendants of Sephardic Jews forced
                      to convert to Christianity.
                    </p>
                    <p>
                      Maria Coelho's Inquisition file still survives in the Portuguese national archives (AN/TT) in Lisbon. An
                      auto de entrega (warrant of delivery) states that on January 8, 1666, Maria was delivered to the prison of
                      the Holy Inquisition. After a trial lasting over three years, Maria was declared a heretic, excommunicated,
                      her goods confiscated, and she was sentenced to exile in Brazil. Her ultimate fate remains unknown—this game
                      imagines where she might have ended up.
                    </p>

                    <div className="bg-muted/50 p-6 rounded-lg border my-8">
                      <h4 className="text-lg font-semibold mb-2">Primary Source Access</h4>
                      <p className="text-sm mb-4">
                        Maria's Inquisition file is available at: <em>Processo de Maria Coelho</em>, Tribunal do Santo Ofício,
                        Inquisição de Coimbra, proc. 352, AN/TT, Portugal.
                      </p>
                      <p className="text-sm">
                        The <em>Pharmaca of Jozeph Coelho</em> (1668), possibly created by Maria's relative, can be viewed at
                        the Biblioteca Nacional de Portugal.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Links */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                        <a href="https://apothecarysimulator.vercel.app" target="_blank" rel="noopener noreferrer">
                          <Play className="mr-2 h-4 w-4" /> Play Now
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full group">
                        <a href="https://github.com/benjaminbreen/HistoryLens" target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4 external-link-icon" /> View Source
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/pedagogy/assignments/apothecary-simulator">
                          <BookOpen className="mr-2 h-4 w-4" /> Teaching Guide
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* License */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Scale className="h-4 w-4" />
                        License
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-3">
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                        <div>
                          <p className="font-medium text-sm">MIT License</p>
                          <p className="text-xs text-muted-foreground">Open source</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        The source code is freely available for educational use, modification, and redistribution.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Historical content is licensed under CC BY-NC-SA 4.0.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Citation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cite This Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs font-mono bg-muted/50 p-3 rounded-lg mb-3">
                        Breen, Benjamin. "Apothecary Simulator." THINK @ UC Santa Cruz, 2024. https://apothecarysimulator.vercel.app
                      </p>
                      <CopyButton
                        textToCopy='Breen, Benjamin. "Apothecary Simulator." THINK @ UC Santa Cruz, 2024. https://apothecarysimulator.vercel.app'
                        label="Copy Citation"
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : activeTab === 'reading' ? (
              /* Further Reading Tab */
              <div className="space-y-8">
                {/* Primary Sources Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Primary Sources</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Historical texts that informed the game's design and can be used for student research
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://purl.pt/24899" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Pharmaca de Jozeph Coelho (1668)
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Biblioteca Nacional de Portugal</p>
                        <p className="text-sm">Portuguese apothecary manuscript, possibly by Maria Coelho's relative. Contains recipes and drug prices.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://archive.org/details/observacoensmed00semegoog" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Observaçoens Medicas Doutrinaes
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">João Curvo Semedo (1707)</p>
                        <p className="text-sm">Portuguese medical treatise with case studies and remedies.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://archive.org/details/florloilegiomedi00este" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Florilegio Medicinal
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Juan de Esteyneffer (1712)</p>
                        <p className="text-sm">Comprehensive Mexican pharmacopoeia written by a Jesuit. Essential for New Spain remedies.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://archive.org/details/b30518772" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Medicina Practica de Guadalupe (1734)
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Franciscan friars</p>
                        <p className="text-sm">Medical manual from the Hospital de Guadalupe in Mexico.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://www.gutenberg.org/ebooks/49513" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            The Complete Herbal (1653)
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Nicholas Culpeper</p>
                        <p className="text-sm">Classic English herbal with humoral properties of hundreds of plants.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://archive.org/details/tesorodemedicina00lpez" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Tesoro de Medicinas (1672)
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Gregorio López</p>
                        <p className="text-sm">Spanish colonial pharmacopoeia compiled in New Spain.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://www.wdl.org/en/item/10096/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            The Badianus Manuscript (1552)
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Martín de la Cruz & Juan Badiano</p>
                        <p className="text-sm">Aztec herbal translated to Latin—rare Indigenous medical knowledge that survived colonization.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://www.agn.gob.mx/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Inquisition Records (1590s-1690s)
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Archivo General de la Nación, Mexico</p>
                        <p className="text-sm">Primary sources on converso life and Inquisitorial persecution in colonial Mexico.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Secondary Sources Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Secondary Sources</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Scholarly works that provide historical context
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://www.pennpress.org/9780812224672/the-age-of-intoxication/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            The Age of Intoxication
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Benjamin Breen (2019)</p>
                        <p className="text-sm">Origins of the global drug trade—direct research basis for this game.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://upittpress.org/books/9780822945673/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Compound Remedies
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Paula De Vos (2010)</p>
                        <p className="text-sm">Apothecaries, science, and trade in colonial Mexican pharmacology.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://doi.org/10.1080/14636200701430984" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            From Herbs to Alchemy
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Paula De Vos (2007)</p>
                        <p className="text-sm">The chemical turn in Mexican apothecary practice.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://uncpress.org/book/9781469631066/the-experiential-caribbean/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            The Experiential Caribbean
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Pablo F. Gómez (2017)</p>
                        <p className="text-sm">African healing traditions in the early modern Atlantic world.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://yalebooks.yale.edu/book/9780300076585/rituals-of-childhood/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Rituals of Childhood
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Ivan Marcus</p>
                        <p className="text-sm">Jewish acculturation in medieval Europe—context for converso identity.</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-1">
                          <a href="https://press.princeton.edu/books/paperback/9781890951689/secrets-of-women" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Secrets of Women
                          </a>
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">Katharine Park</p>
                        <p className="text-sm">Gender, generation, and the origins of human dissection.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Code Tab */
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Key Code Architecture</CardTitle>
                      <Button asChild variant="outline" size="sm" className="group">
                        <a href="https://github.com/benjaminbreen/HistoryLens" target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4 external-link-icon" /> View Full Repository
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      This section provides excerpts from the most important code files to illustrate how the game's AI-driven narrative system works.
                    </p>

                    {/* Code Block 1: System Prompts */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        1. System Prompts (promptModules.js)
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        The game's prompts define the AI's behavior, historical constraints, and response format.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`// Core identity and character
export const universalPromptModules = {
  core: {
    identity: \`You are HistoryLens, an advanced historical simulation engine.
    Your role is to maintain an immersive, historically accurate simulation set
    in Mexico City and its environs, beginning on August 22, 1680. Your responses
    should be concise, exceptionally historically accurate, and grounded in the
    specific, gritty, earthy realities of 17th-century life.\`,

    character: \`Protagonist: Maria de Lima, a 45-year-old Coimbra-born converso apothecary
    Background: Fled to Mexico City 10 years ago after arrest by the Portuguese Inquisition
    Current Situation: Practicing illegally, in debt (100 reales to Don Luis, 20 reales to Marta)
    Starting Wealth: 11 silver coins (reales)\`,

    tone: \`**Dynamic pacing - match length to importance:**
    TRIVIAL actions: 15-30 words, 1-2 sentences
    ROUTINE interactions: 40-60 words, 3-4 sentences
    IMPORTANT moments: 80-120 words, 1-2 paragraphs
    CRITICAL events: 120-180 words MAX, 2-3 paragraphs

    **Writing rules:**
    - Clear, direct prose. No purple language or clichés.
    - Grounded in 1680s realities - specific sensory details
    - Use "says" as dialogue tag, not "murmurs/hisses/breathes"
    - Historical specificity over generic descriptions\`
  },

  // Historical authenticity constraints
  historical: {
    accuracy: \`Historical Frame: Never allow the simulation to move outside the 1680s.
    If the user inputs something anachronistic like "give the patient a vaccine,"
    respond with: "That is historically inaccurate. Please enter a new command."

    Avoid Modern Concepts: Maria would not reference vitamins, which are unknown.
    Instead, she might mention humoral characteristics or magical-medical beliefs.
    No one speaks of syphilis, but instead "the pox" or "the French pox".\`,

    social: \`Patients and NPCs observe 17th century social norms. They call one
    another by last name (so "Señora de Lima" not "Maria"). People of lower or
    middle social ranks are treated mercilessly and arrogantly by nobility.

    Patients are often in bad moods, suffering from discomfort. Maria must engage
    in dialogue to draw out relevant details.\`
  },

  // Skills system for player progression
  skills: {
    mechanics: \`**Skills System**: Maria has various skills at different levels (1-5).
    **Skill Checks**: Roll d20 + (skill level × 2) vs. Difficulty Class (DC):
    - DC 5 (Trivial): Almost impossible to fail
    - DC 10 (Easy): Easy for trained characters
    - DC 15 (Moderate): Standard challenge
    - DC 20 (Hard): Difficult even for experts
    - DC 25 (Very Hard): Nearly impossible

    **Natural 20**: Automatic success with exceptional outcome
    **Natural 1**: Automatic failure with complications\`
  }
};`}</code>
                      </pre>
                    </div>

                    {/* Code Block 2: Agent Orchestrator */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        2. Agent Orchestrator (AgentOrchestrator.js)
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        The orchestrator coordinates three AI agents for each game turn: EntityAgent, NarrativeAgent, and StateAgent.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`export async function orchestrateTurn({
  scenarioId,
  playerAction,
  conversationHistory,
  gameState,
  turnNumber,
  reputation,
  mapData,
  playerPosition,
  weather,
  scheduledFollowUps,
  // ... other params
}) {
  try {
    // Step 1: Context-aware entity selection
    // EntityAgent decides if an NPC should appear based on time, location, reputation
    let selectedEntity = selectContextAwareEntity({
      scenarioId,
      playerAction,
      turnNumber,
      location: gameState.location,
      time: gameState.time,
      date: gameState.date,
      recentNPCs,
      reputation,
      wealth,
      shopSign: gameState.shopSign,
      activePatient,
      scheduledFollowUps
    });

    // Step 2: Detect conversation continuation
    // If player is responding to an existing NPC, maintain that conversation
    const isContinuation = (!selectedEntity && recentNPCs.length > 0 && !isMovingAway);

    // Step 3: Generate narrative using NarrativeAgent
    const narrativeResult = await generateNarrative({
      scenarioId,
      playerAction,
      conversationHistory,
      gameState,
      selectedEntity,
      turnNumber,
      mapData,
      playerPosition,
      reputation,
      playerSkills,
      journal,
      recentPortrait: isContinuation ? recentPortrait : null,
      weather
    });

    // Step 4: Extract game state changes using StateAgent
    const stateResult = await extractGameState({
      narrative: narrativeResult.narrative,
      currentGameState: gameState,
      playerAction,
      selectedEntity,
      scenarioId,
      turnNumber,
      primaryNPC: narrativeResult.primaryNPC,
      interactionIntent: narrativeResult.interactionIntent
    });

    // Step 5: Validate and return combined result
    const validatedState = validateGameState(stateResult.gameState, gameState);

    return {
      success: true,
      narrative: narrativeResult.narrative,
      primaryPortrait: narrativeResult.primaryPortrait,
      primaryNPC: narrativeResult.primaryNPC,
      gameState: validatedState,
      inventoryChanges: stateResult.inventoryChanges,
      contractOffer: stateResult.contractOffer,
      journalEntry: stateResult.journalEntry,
      // ... other fields
    };
  } catch (error) {
    // Fallback: return minimal valid response
    return {
      success: false,
      error: error.message,
      narrative: 'Something unexpected happened. Please try again.',
      gameState: gameState
    };
  }
}`}</code>
                      </pre>
                    </div>

                    {/* Code Block 3: Entity Manager */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        3. Entity Manager (EntityManager.js)
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Central registry for all game entities (NPCs, patients, items) with procedural enrichment.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`class EntityManager {
  constructor() {
    this.entities = new Map();              // id → entity
    this.entitiesByType = new Map();        // type → [entities]
    this.entitiesByName = new Map();        // normalized name → entity
    this.pendingEnrichment = new Set();
    this.portraitCache = new Map();
    this.llmGeneratedEntities = new Set();
  }

  register(entity) {
    if (!entity.id) {
      entity.id = this.generateId(entity);
    }

    // Check for duplicates by normalized name
    const normalizedName = this.normalizeName(entity.name);
    const existingByName = this.entitiesByName.get(normalizedName);

    if (existingByName && existingByName.id !== entity.id) {
      // Merge data instead of creating duplicate
      return this.mergeEntities(existingByName, entity);
    }

    this.entities.set(entity.id, entity);
    this.indexEntity(entity);

    if (this.needsEnrichment(entity)) {
      this.pendingEnrichment.add(entity.id);
    }

    return entity;
  }

  enrichNPC(npc) {
    // CRITICAL: Do NOT procedurally generate names for LLM-generated entities
    if (npc.isLLMGenerated) {
      if (!npc.personality) {
        npc.personality = this.generatePersonality();
      }
      return npc;
    }

    // For template entities, generate historically accurate name
    if (npc.isTemplate || npc.name?.includes('[') || !npc.name) {
      const historicalName = this.generateHistoricalName(npc);
      if (historicalName) npc.name = historicalName;
    }

    if (!npc.gender) {
      npc.gender = inferGenderFromName(npc.name);
    }

    return npc;
  }

  query(criteria = {}) {
    let results = Array.from(this.entities.values());

    if (criteria.type) results = results.filter(e => e.type === criteria.type);
    if (criteria.tier) results = results.filter(e => e.tier === criteria.tier);
    if (criteria.faction) {
      results = results.filter(e =>
        e.social?.faction?.toLowerCase() === criteria.faction.toLowerCase()
      );
    }
    if (criteria.hasCondition !== undefined) {
      results = results.filter(e =>
        criteria.hasCondition ? e.medicalProfile?.currentCondition : !e.medicalProfile?.currentCondition
      );
    }

    return results;
  }
}`}</code>
                      </pre>
                    </div>

                    {/* Code Block 4: Reputation System */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        4. Reputation System
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Multi-faction reputation with spillover effects between allied groups.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`export const FACTIONS = {
  ELITE: 'elite',           // Criollos and Spanish nobility
  COMMON_FOLK: 'commonFolk', // Mestizos, workers, everyday patients
  CHURCH: 'church',          // Clergy and religious authorities
  INDIGENOUS: 'indigenous',  // Native healers and patients
  GUILD: 'guild',            // Physicians and licensed apothecaries
  MERCHANTS: 'merchants'     // Shopkeepers and traders
};

export const INITIAL_REPUTATION = {
  overall: 50,
  factions: {
    [FACTIONS.ELITE]: 40,
    [FACTIONS.COMMON_FOLK]: 60,
    [FACTIONS.CHURCH]: 50,
    [FACTIONS.INDIGENOUS]: 30,
    [FACTIONS.GUILD]: 35,
    [FACTIONS.MERCHANTS]: 55
  }
};

// Faction relationships (allies get positive spillover)
const allies = {
  [FACTIONS.ELITE]: [FACTIONS.CHURCH, FACTIONS.MERCHANTS],
  [FACTIONS.CHURCH]: [FACTIONS.ELITE],
  [FACTIONS.MERCHANTS]: [FACTIONS.ELITE, FACTIONS.GUILD],
  [FACTIONS.GUILD]: [FACTIONS.MERCHANTS, FACTIONS.COMMON_FOLK],
  [FACTIONS.COMMON_FOLK]: [FACTIONS.GUILD, FACTIONS.INDIGENOUS],
  [FACTIONS.INDIGENOUS]: [FACTIONS.COMMON_FOLK]
};

export function getSpilloverEffects(primaryFaction, delta) {
  const spillovers = [];
  const spilloverFactor = 0.3; // 30% of original change

  const alliedFactions = allies[primaryFaction] || [];
  alliedFactions.forEach(faction => {
    spillovers.push({
      faction,
      delta: Math.round(delta * spilloverFactor)
    });
  });

  return spillovers;
}`}</code>
                      </pre>
                    </div>

                    {/* Code Block 5: Patient Flow Calculator */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        5. Patient Flow Calculator
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Calculates probability of patients appearing based on location, time, reputation, and shop state.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`const TIME_MULTIPLIERS = {
  'early_morning': 0.8,   // 5-7 AM: Some early risers
  'morning': 1.2,         // 7-11 AM: Good traffic
  'midday': 1.0,          // 11 AM-2 PM: Siesta time, moderate
  'afternoon': 1.5,       // 2-6 PM: Peak hours
  'evening': 0.8,         // 6-9 PM: Winding down
  'night': 0.3            // 9 PM-5 AM: Very few
};

const LOCATION_MULTIPLIERS = {
  'Botica de la Amargura': 1.0,      // Home base
  'La Merced Market': 1.4,           // High foot traffic
  'Plaza Mayor': 1.3,                // Central location
  'Hospital Real de los Naturales': 0.5,  // They have their own doctors
  'Chapultepec Forest': 0.2,         // Remote
  'The Alameda': 0.6                 // Park, some encounters
};

export function calculatePatientFlow(gameState) {
  const factors = {};

  // Base probability depends on shop sign
  const baseChance = gameState.shopSignOut ? 0.7 : 0.2;
  factors.shopSign = gameState.shopSignOut ? 'Sign displayed (+70% base)' : 'Sign hidden (20% base)';

  // Time of day factor
  const timeOfDay = getTimeOfDay(gameState.time);
  const timeMult = TIME_MULTIPLIERS[timeOfDay] || 1.0;

  // Location factor
  const locationMult = LOCATION_MULTIPLIERS[gameState.location] || 0.8;

  // Reputation factor (Common Folk reputation matters most for patients)
  const commonRep = gameState.reputation?.factions?.[FACTIONS.COMMON_FOLK] || 50;
  let repMult = 1.0;
  if (commonRep >= 70) repMult = 1.5;
  else if (commonRep >= 60) repMult = 1.2;
  else if (commonRep <= 30) repMult = 0.5;

  // Early game boost (first 10 turns get +30%)
  const earlyGameMult = gameState.turnNumber <= 10 ? 1.3 : 1.0;

  // Calculate final probability (cap at 95%)
  let probability = Math.min(0.95, baseChance * timeMult * locationMult * repMult * earlyGameMult);

  return { probability, factors, shouldSpawnPatient: Math.random() < probability };
}`}</code>
                      </pre>
                    </div>

                    {/* Code Block 6: Scenario Config */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        6. Scenario Config - 1680 Mexico City
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Complete scenario definition including historical context, naming conventions, and starting conditions.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`export default {
  id: '1680-mexico-city',
  name: '1680 Mexico City',
  description: 'Practice medicine as Maria de Lima, a converso apothecary fleeing the Inquisition.',

  settings: {
    language: 'Spanish',
    addressStyle: 'Señora de Lima',
    socialNorms: [
      'Address people by last name',
      'Nobility and church officials treat commoners harshly',
      'The Inquisition is a constant threat',
      'Medical practice without physician license is illegal',
      'Conversos (converted Jews) face persecution',
      'Women cannot practice medicine officially'
    ],
    historicalContext: [
      'Mexico City in 1680 is a bustling colonial capital of 100,000+ people',
      'The Spanish Inquisition is active and feared',
      'Humoral medicine is the dominant medical theory',
      'Indigenous and Spanish medical traditions mix',
      'Tensions between criollos and peninsulares are high'
    ],
    locations: [
      'Botica de la Amargura', 'La Merced Market', 'Metropolitan Cathedral',
      'Plaza Mayor', 'Chapultepec Forest', 'The Alameda', 'Inquisition Palace',
      'Hospital Real de los Naturales', 'San Hipólito', 'Calle de Tacuba'
    ]
  },

  startDate: 'August 22, 1680',
  startTime: '8:00 AM',
  startLocation: 'Botica de la Amargura, Mexico City',
  currency: 'reales',
  startingWealth: 11,

  debts: {
    'Don Luis (Moneylender)': {
      amount: 100,
      deadline: 'August 29, 1680, 8:00 PM',
      consequence: 'Shop repossession and potential imprisonment'
    },
    'Marta (Herb Woman)': {
      amount: 20,
      deadline: null,
      consequence: 'Loss of primary herb supplier'
    }
  },

  npcGeneration: {
    namingGuidelines: \`Use historically accurate Spanish colonial names:

    **Elite Class**: Don/Doña + First Name + Surname(s)
    Examples: "Don Juan de Mendoza", "Doña Isabel García de la Cruz"

    **Clergy**: Padre/Fray/Sor + First Name + Surname
    Examples: "Padre Diego Martínez", "Sor María de la Concepción"

    **Common Class**: First Name + Surname (no titles)
    Examples: "Pedro Ramírez", "Catalina Flores"

    **Indigenous NPCs**: Spanish baptismal + Nahuatl names
    Examples: "Juan Xochitl", "María Citlali"\`
  }
};`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Technical Stack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Next.js 14</p>
                        <p className="text-xs text-muted-foreground">Framework</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">JavaScript</p>
                        <p className="text-xs text-muted-foreground">Language</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Gemini API</p>
                        <p className="text-xs text-muted-foreground">AI Backend</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Tailwind</p>
                        <p className="text-xs text-muted-foreground">Styling</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Blog Post Link */}
      <Section className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4">Research & Development</Badge>
            <h2 className="text-2xl font-serif font-bold mb-4">LLM-Based Educational Games Will Be a Big Deal</h2>
            <p className="text-muted-foreground mb-6">
              For the first time, digital games can make qualitative assessments of learning. Read the original blog post
              that explains the thinking behind this project and its potential applications for education.
            </p>
            <Button asChild size="lg" variant="outline" className="group">
              <a href="https://resobscura.substack.com/p/llm-based-educational-games-will" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4 external-link-icon" />
                Read the Blog Post (May 2024)
              </a>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Teaching Resources CTA */}
      <Section className="bg-muted/40 py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-title font-serif font-bold">Use This in Your Classroom</h2>
            <p className="text-muted-foreground mb-8">
              Find detailed lesson plans, assignments, and discussion questions for using the Apothecary Simulator
              in history of medicine, colonial Latin American history, or digital humanities courses.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/pedagogy/assignments/apothecary-simulator">
                  <BookOpen className="mr-2 h-5 w-5" /> View Teaching Guide
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pedagogy">
                  Browse All Assignments
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
