'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProjectBanner } from '@/components/ui/project-banner'
import Link from 'next/link'
import { ExternalLink, Github, Play, BookOpen, Code, Scale, User, Building2, GraduationCap, FileText, Globe, Users, Languages, Heart, MapPin, Calendar } from 'lucide-react'
import { TagList, TagLink } from '@/components/ui/tag-link'
import { FolderTabs } from '@/components/ui/folder-tabs'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CopyButton } from '@/components/ui/copy-button'

export default function HistoricalPersonaGeneratorPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reading' | 'code'>('overview')

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Historical Persona Generator' }
      ]} />

      <Section className="pt-8 pb-8">
        <Container>

          <div className="mx-auto max-w-4xl">
            <ProjectBanner
              thumbnailPath="/thumbnails/historical-persona-generator.webp"
              projectTitle="Historical Persona Generator"
            />

            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-display font-serif font-bold">Historical Persona Generator</h1>
                    <Badge className="bg-cyan-600">Active</Badge>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    Procedurally generate historically accurate character personas with pixel-art portraits, life histories, and cultural context
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
                  <TagLink tag="World History" size="sm" />
                  <TagLink tag="Digital Humanities" size="sm" />
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
                tags={['World History', 'Procedural Generation', 'Educational Games', 'Character Creation', 'Cultural Studies', 'Digital Humanities']}
                className="mb-6"
              />

              {/* Launch Button */}
              <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 mb-8">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-emerald-800 dark:text-emerald-200">
                      This project is freely available online. You can try it here:
                    </p>
                    <Button asChild size="default" className="bg-emerald-600 hover:bg-emerald-700 text-white group">
                      <a href="https://historical-persona-generator.vercel.app" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 external-link-icon" />
                        Launch Persona Generator
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
                { id: 'reading', label: 'Data & Sources', icon: FileText },
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
                      The <strong>Historical Persona Generator</strong> is a sophisticated web application that procedurally
                      generates historically accurate character personas complete with pixel-art portraits, life histories,
                      family trees, and cultural context. It serves as both an educational tool for exploring world history
                      and a creative resource for writers, game designers, educators, and history enthusiasts.
                    </p>
                    <p>
                      Unlike simple random name generators, this tool creates <em>coherent characters</em> whose professions,
                      beliefs, personalities, and life events all align with their historical and cultural context. A medieval
                      European peasant won&apos;t be assigned a philosophy that emerged in 20th-century China; a 1920s American
                      factory worker won&apos;t speak a language that died out in antiquity.
                    </p>

                    <div className="bg-muted/50 p-4 rounded-lg border my-6">
                      <p className="text-sm mb-0">
                        <strong>Key Innovation:</strong> The generator uses a multi-stage coherence validation system that
                        ensures every generated character is internally consistent—their personality traits match their profession,
                        their ideology fits their social context, and their life events reflect the realities of their era.
                      </p>
                    </div>

                    <h2>Educational Purpose</h2>
                    <p>
                      The Historical Persona Generator was designed to make history tangible by generating real, plausible
                      individuals who might have lived in any era from prehistory to the modern age, across any inhabited
                      region of the world. When students encounter &quot;Fatima bint Abdullah al-Rashid, a 34-year-old herbalist
                      in 1287 Damascus,&quot; they&apos;re not just reading facts—they&apos;re meeting a person.
                    </p>

                    <h3>What Users Learn</h3>
                    <ul>
                      <li><strong>Historical Professions:</strong> From ancient Roman gladiators to medieval scribes to Qing Dynasty silk merchants</li>
                      <li><strong>Religious Diversity:</strong> 157+ religions from major world faiths to indigenous animist traditions</li>
                      <li><strong>Linguistic Heritage:</strong> 735 historical languages with greetings, writing systems, and evolutionary relationships</li>
                      <li><strong>Disease History:</strong> 176 historically accurate diseases with period-appropriate symptoms and mortality</li>
                      <li><strong>Social Structures:</strong> How wealth, gender, and social class constrained opportunities in different eras</li>
                      <li><strong>Material Culture:</strong> Era-appropriate clothing, accessories, and possessions</li>
                    </ul>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8 not-prose">
                      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 p-4 rounded-lg border text-center">
                        <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">735</div>
                        <div className="text-sm text-muted-foreground">Languages</div>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-4 rounded-lg border text-center">
                        <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">746+</div>
                        <div className="text-sm text-muted-foreground">Professions</div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-4 rounded-lg border text-center">
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">571</div>
                        <div className="text-sm text-muted-foreground">Locations</div>
                      </div>
                      <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 p-4 rounded-lg border text-center">
                        <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">176</div>
                        <div className="text-sm text-muted-foreground">Diseases</div>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/30 p-4 rounded-lg border text-center">
                        <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">157</div>
                        <div className="text-sm text-muted-foreground">Religions</div>
                      </div>
                      <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30 p-4 rounded-lg border text-center">
                        <div className="text-3xl font-bold text-slate-600 dark:text-slate-400">87K+</div>
                        <div className="text-sm text-muted-foreground">Lines of Code</div>
                      </div>
                    </div>

                    <h2>Key Features</h2>

                    <h3>Procedural Pixel-Art Portraits</h3>
                    <p>
                      Each character receives a unique 64x64 pixel-art portrait generated procedurally based on their
                      physical characteristics, cultural background, age, and profession. The portrait system includes:
                    </p>
                    <ul>
                      <li>14 interactive facial expressions (hover to see smile, scowl, surprise, etc.)</li>
                      <li>Speech bubbles showing &quot;Hello&quot; in the character&apos;s native language</li>
                      <li>Visual disease symptoms (smallpox pustules, plague darkening)</li>
                      <li>Era-appropriate clothing and accessories</li>
                      <li>Cultural variations in facial features and head geometry</li>
                    </ul>

                    <h3>Family Tree Navigation</h3>
                    <p>
                      Click on parent names to &quot;time travel&quot; to their generation. Each family member is fully
                      generated with their own history, profession, and life events—creating an explorable genealogy
                      across centuries.
                    </p>

                    <h3>Life History Generation</h3>
                    <p>
                      The system generates coherent biographical narratives with era-specific life events. A character
                      born in medieval Europe might experience plague outbreaks, religious pilgrimages, or feudal
                      conflicts—while someone in 1920s America faces industrialization, prohibition, or the stock
                      market crash.
                    </p>

                    <h3>Wikipedia Integration</h3>
                    <p>
                      Cultural zones, religions, languages, and historical contexts are hyperlinked to relevant
                      Wikipedia articles, providing educational depth for users who want to learn more.
                    </p>

                    <h3>PDF Export</h3>
                    <p>
                      Save complete character sheets with portraits, stats, personality traits, and life events—suitable
                      for tabletop gaming or creative writing projects.
                    </p>

                    <h2>Nine Cultural Zones</h2>
                    <p>
                      The generator organizes historical cultures into nine major zones, each with distinct naming
                      conventions, religious traditions, professions, and material culture:
                    </p>
                    <ul>
                      <li><strong>European:</strong> Western, Eastern, and Northern Europe across all eras</li>
                      <li><strong>East Asian:</strong> China, Japan, Korea, Mongolia, and surrounding regions</li>
                      <li><strong>South Asian:</strong> The Indian subcontinent and Southeast Asia</li>
                      <li><strong>MENA:</strong> Middle East and North Africa</li>
                      <li><strong>Sub-Saharan African:</strong> The diverse cultures south of the Sahara</li>
                      <li><strong>North American Pre-Columbian:</strong> Indigenous peoples before European contact</li>
                      <li><strong>North American Colonial:</strong> Post-contact through modern era</li>
                      <li><strong>South American:</strong> Indigenous, colonial, and modern Latin America</li>
                      <li><strong>Oceania:</strong> Australia, Pacific Islands, and New Zealand</li>
                    </ul>

                    <div className="bg-muted/50 p-6 rounded-lg border my-8">
                      <h4 className="text-lg font-semibold mb-2">Example Generated Character</h4>
                      <div className="text-sm space-y-2">
                        <p><strong>Fatima bint Abdullah al-Rashid</strong></p>
                        <p className="text-muted-foreground">Herbalist, Age 34</p>
                        <p><MapPin className="inline h-4 w-4 mr-1" /> Damascus, Levant (1287 CE)</p>
                        <p><Globe className="inline h-4 w-4 mr-1" /> Religion: Sunni Islam</p>
                        <p><Languages className="inline h-4 w-4 mr-1" /> Language: Arabic (السلام عليكم)</p>
                        <p><Users className="inline h-4 w-4 mr-1" /> Social Class: Modest</p>
                        <p className="mt-3"><strong>Life Events:</strong></p>
                        <ul className="text-muted-foreground ml-4">
                          <li>1253: Born during the aftermath of Mongol devastation</li>
                          <li>1267: Apprenticed to an elderly healer</li>
                          <li>1275: Survived outbreak of typhoid fever</li>
                          <li>1281: Married Ahmad, a spice merchant</li>
                          <li>1285: Lost first child to illness</li>
                        </ul>
                        <p className="mt-2"><Heart className="inline h-4 w-4 mr-1" /> Ideology: Sufi mysticism - &quot;The divine is found through direct experience&quot;</p>
                      </div>
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
                        <a href="https://historical-persona-generator.vercel.app" target="_blank" rel="noopener noreferrer">
                          <Play className="h-4 w-4" /> Generate Personas
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="w-full group">
                        <a href="https://github.com/benjaminbreen/HistoricalPersonaGenerator" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 external-link-icon" /> View Source
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Tech Stack */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tech Stack</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Frontend</span>
                          <span className="font-medium">React 19 + TypeScript</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Build</span>
                          <span className="font-medium">Vite 7.x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Animation</span>
                          <span className="font-medium">Framer Motion</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Mapping</span>
                          <span className="font-medium">react-simple-maps</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Styling</span>
                          <span className="font-medium">CSS Variables</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Deployment</span>
                          <span className="font-medium">Vercel</span>
                        </div>
                      </div>
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
                      <p className="text-xs text-muted-foreground">
                        Free for educational and creative use, modification, and redistribution.
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
                        Breen, Benjamin. &quot;Historical Persona Generator.&quot; THINK @ UC Santa Cruz, 2025. https://historical-persona-generator.vercel.app
                      </p>
                      <CopyButton
                        textToCopy='Breen, Benjamin. "Historical Persona Generator." THINK @ UC Santa Cruz, 2025. https://historical-persona-generator.vercel.app'
                        label="Copy Citation"
                        className="w-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : activeTab === 'reading' ? (
              /* Data & Sources Tab */
              <div className="space-y-8">
                {/* Codebase Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Codebase Statistics</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      The generator draws from extensive historical data compiled into TypeScript constants
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-semibold">Metric</th>
                            <th className="text-right py-2 font-semibold">Count</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr><td className="py-2">Total Lines of Code</td><td className="text-right font-mono">87,299</td></tr>
                          <tr><td className="py-2">Data/Constants Lines</td><td className="text-right font-mono">47,717</td></tr>
                          <tr><td className="py-2">Languages Defined</td><td className="text-right font-mono">735</td></tr>
                          <tr><td className="py-2">Professions</td><td className="text-right font-mono">746+</td></tr>
                          <tr><td className="py-2">Geographic Locations</td><td className="text-right font-mono">571</td></tr>
                          <tr><td className="py-2">Historical Cities</td><td className="text-right font-mono">365</td></tr>
                          <tr><td className="py-2">Diseases</td><td className="text-right font-mono">176</td></tr>
                          <tr><td className="py-2">Religions (with Wikipedia links)</td><td className="text-right font-mono">157</td></tr>
                          <tr><td className="py-2">Ideologies/Beliefs</td><td className="text-right font-mono">131</td></tr>
                          <tr><td className="py-2">Clothing Definitions</td><td className="text-right font-mono">6,018 lines</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Data Categories</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Examples of the depth of historical research encoded in the generator
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Languages className="h-5 w-5 text-violet-600" />
                          <h4 className="font-semibold">Languages (735)</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Each language includes native name, family, time period, regions, greetings, script,
                          and linguistic predecessors/successors.
                        </p>
                        <p className="text-xs font-mono bg-muted/50 p-2 rounded">
                          Example: Ohlone (Ramaytush) - &quot;Ka warep&quot; (hello)
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-5 w-5 text-amber-600" />
                          <h4 className="font-semibold">Religions (157)</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          From major world religions to regional traditions, each with accurate geographic
                          and temporal distribution.
                        </p>
                        <p className="text-xs font-mono bg-muted/50 p-2 rounded">
                          Includes: Zoroastrianism, Tengrism, Candomblé, Shinto...
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-emerald-600" />
                          <h4 className="font-semibold">Professions (746+)</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Era-specific occupations organized by social class—a &quot;Software Engineer&quot; won&apos;t
                          appear in 1200 CE.
                        </p>
                        <p className="text-xs font-mono bg-muted/50 p-2 rounded">
                          Includes: Gladiator, Silk Merchant, Scribe, Alchemist...
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-5 w-5 text-rose-600" />
                          <h4 className="font-semibold">Diseases (176)</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Historically accurate diseases with period-appropriate symptoms, mortality rates,
                          and visual portrait effects.
                        </p>
                        <p className="text-xs font-mono bg-muted/50 p-2 rounded">
                          Visual: smallpox pustules, plague darkening...
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-cyan-600" />
                          <h4 className="font-semibold">Locations (571)</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Geographic locations with climate, terrain, cultural zone, and historical context
                          spanning all inhabited continents.
                        </p>
                        <p className="text-xs font-mono bg-muted/50 p-2 rounded">
                          365 historical cities with era-specific data
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-slate-600" />
                          <h4 className="font-semibold">Life Events</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Era and culture-specific life events with milestone categories: battles, plagues,
                          romances, tragedies, and more.
                        </p>
                        <p className="text-xs font-mono bg-muted/50 p-2 rounded">
                          Causes of death vary by era × cultural zone
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Naming Conventions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Historically Accurate Naming</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Names follow era and culture-specific conventions
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Celtic Patronymics</h4>
                        <p className="text-sm text-muted-foreground">
                          &quot;Aedan mac Domnall&quot; (Aedan, son of Domnall)
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Chinese Generational Names</h4>
                        <p className="text-sm text-muted-foreground">
                          Family name + generational character + given name
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Arabic Nasab/Nisba</h4>
                        <p className="text-sm text-muted-foreground">
                          &quot;Fatima bint Abdullah al-Rashid&quot; (lineage + origin)
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Roman Tria Nomina</h4>
                        <p className="text-sm text-muted-foreground">
                          Praenomen + Nomen + Cognomen for citizens
                        </p>
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
                        <a href="https://github.com/benjaminbreen/HistoricalPersonaGenerator" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 external-link-icon" /> View Full Repository
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      This section provides excerpts from the most important code files to illustrate how the procedural generation system works.
                    </p>

                    {/* Code Block 1: Character Generation Pipeline */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        1. Character Generation Pipeline
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        The core generation follows a sophisticated multi-stage pipeline ensuring coherent characters.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`// src/services/characterGenerator.ts - Core generation flow
export function generateCharacter(context: GenerationContext): PlayerCharacter {
    // Stage 1: Generate base profile with stats and personality
    const baseProfile = generateBaseProfile(noise, generationContext);

    // Stage 2: Determine social role based on stats and context
    const { socialClass, role, nameKey } =
        determineSocialRole(baseProfile, generationContext);

    // Stage 3: Adjust personality to match profession
    baseProfile.personality = adjustPersonalityForProfession(
        baseProfile.personality,
        role,
        baseProfile.stats
    );

    // Stage 4: Generate culturally appropriate name
    const name = generateNpcName(
        baseProfile.gender,
        culturalZone,
        region,
        year,
        noise,
        nameKey
    );

    // Stage 5: Assign beliefs/ideology based on personality
    // Stage 6: Generate appearance, clothing, equipment
    // Stage 7: Validate coherence and fix contradictions
    const { personality: validatedPersonality } =
        validateCharacterCoherence({...});

    return character;
}`}</code>
                      </pre>
                    </div>

                    {/* Code Block 2: Personality-Profession-Ideology Integration */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        2. Personality-Profession-Ideology Coherence
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        A key innovation ensuring characters are internally consistent—a Red Guard won&apos;t get conservative ideologies.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`// src/generation/common/npcUtils.ts - Personality scoring
function scoreIdeologyPersonalityFit(
    ideology: Ideology,
    personality: CharacterPersonality,
    socialContext: CharacterSocialContext,
    profession?: string
): number {
    let score = 0;
    const ideoId = ideology.id.toLowerCase();

    // Revolutionary ideologies require high openness, low agreeableness
    if (ideoId.includes('revolutionary') || ideoId.includes('radical')) {
        score += (personality.openness - 0.5) * 40;
        score -= (personality.agreeableness - 0.5) * 30;
        score -= socialContext.privilege * 20;
    }

    // Profession-ideology alignment
    if (profession) {
        const profLower = profession.toLowerCase();
        // Red Guard / Revolutionary professions should NOT get
        // conservative ideologies
        if ((profLower.includes('red guard') ||
             profLower.includes('revolutionary')) &&
            (ideoId.includes('conservative') ||
             ideoId.includes('traditional'))) {
            score -= 100;  // Strong penalty
        }
    }
    return score;
}`}</code>
                      </pre>
                    </div>

                    {/* Code Block 3: Procedural Portrait System */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        3. Procedural Portrait System (6,333 lines)
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Generates unique 64x64 pixel art portraits with seeded RNG for consistent results.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`// src/components/portraits/ProceduralPortrait.tsx
const ProceduralPortrait: React.FC<ProceduralPortraitProps> = ({
  character,
  size = 192,
  temporaryExpression = null,
}) => {
  // Seeded RNG ensures same character always gets same portrait
  const seed = generateDefaultSeed();
  const rand = (offset: number = 0) => seededRandom(seed + offset);

  // Head geometry based on face shape, gender, age, build
  const headDim = useMemo(() => {
    let width = isFemale ? 21 : 25;
    let height = isFemale ? 34 : 36;
    if (isYoung) { width += 2; height -= 1; }
    if (isOld) { height += 3; width -= 1; }
    // ... cultural variations, face shape adjustments
  }, [...]);

  // Render layers: Face → Hair → Eyes → Nose → Mouth → Expressions
  return (
    <svg viewBox="0 0 64 64" style={{ imageRendering: 'pixelated' }}>
      {renderBody}
      {renderHead}
      {renderHair}
      {renderEyes()}
      {renderNose}
      {renderMouth}
      {renderFacialHair}
      {/* Disease symptoms, headgear, jewelry, etc. */}
    </svg>
  );
};`}</code>
                      </pre>
                    </div>

                    {/* Code Block 4: Life History Generation */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        4. Life History Generation
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Creates coherent biographical narratives with era-specific events and culturally appropriate causes of death.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`// src/constants/characterData/lifeHistoryService.ts
export interface EnhancedLifeEvent {
  year: number;
  kind: EventKind;  // 'birth' | 'battle' | 'plague' | 'romance' | etc.
  importance: EventImportance;  // MILESTONE | TRAGEDY | INJURY | etc.
  title: string;
  text: string;
  impacts?: {
    wealth?: number;
    reputation?: number;
    health?: number;
  };
  culturalContext?: string;
}

// Historical causes of death vary by era and culture
const HISTORICAL_CAUSES_OF_DEATH: Record<HistoricalEra,
    Record<CulturalZone, string[]>> = {
  [HistoricalEra.MEDIEVAL]: {
    EUROPEAN: [
      'plague', 'typhoid fever', 'smallpox',
      'childbirth complications', 'killed in battle',
      'murdered by bandits', 'starvation during siege'
    ],
    MENA: [
      'plague', 'dysentery', 'murdered by thieves',
      'died crossing desert'
    ],
    // ... all 9 cultural zones
  },
  // ... all 7 historical eras
};`}</code>
                      </pre>
                    </div>

                    {/* Code Block 5: Language System */}
                    <div className="mb-8">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        5. Language System (6,876 lines, 735 languages)
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Every character has a native language with appropriate greetings, scripts, and linguistic relationships.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`// src/constants/gameData/languages.ts - 735 languages
export interface LanguageData {
  id: string;
  name: string;
  nativeName?: string;
  family: string;
  period: [number, number];  // Year range when spoken
  regions: string[];
  greetings?: {
    hello?: string;
    goodbye?: string;
    yes?: string;
    no?: string;
    thanks?: string;
  };
  script?: string | string[];
  predecessors?: string[];
  successors?: string[];
  isReconstructed?: boolean;
  historicalContext?: string;
}

// Example: Ohlone (indigenous California)
OHLONE: {
  id: 'OHLONE',
  name: 'Ohlone',
  nativeName: 'Ramaytush',
  family: 'Utian',
  period: [-2000, 1850],
  regions: ['San Francisco Bay', 'Monterey Bay', 'Central California Coast'],
  greetings: {
    hello: 'Ka warep',
    goodbye: 'Hinne',
  },
  isReconstructed: true,
  historicalContext: 'Language family of indigenous peoples of the
    San Francisco and Monterey Bay areas...'
}`}</code>
                      </pre>
                    </div>

                    {/* Code Block 6: Cultural Zone System */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        6. Cultural Zone System
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Nine cultural zones determine names, clothing, professions, religions, and languages.
                      </p>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed">
                        <code>{`// Cultural zones determine names, clothing, professions, religions, languages
export type CulturalZone =
  | 'EUROPEAN'
  | 'EAST_ASIAN'
  | 'SOUTH_ASIAN'
  | 'MENA'  // Middle East & North Africa
  | 'SUB_SAHARAN_AFRICAN'
  | 'NORTH_AMERICAN_PRE_COLUMBIAN'
  | 'NORTH_AMERICAN_COLONIAL'
  | 'SOUTH_AMERICAN'
  | 'OCEANIA';

// Era-specific profession availability
// A "Software Engineer" won't appear in 1200 CE
// A "Gladiator" won't appear in 1950 CE

// Each cultural zone has:
// - Era-specific naming conventions
// - Appropriate religious traditions
// - Culturally accurate professions
// - Region-appropriate clothing data
// - Historically accurate life events`}</code>
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
                        <p className="font-semibold">React 19</p>
                        <p className="text-xs text-muted-foreground">Framework</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">TypeScript</p>
                        <p className="text-xs text-muted-foreground">Language</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Vite 7.x</p>
                        <p className="text-xs text-muted-foreground">Build Tool</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">Framer Motion</p>
                        <p className="text-xs text-muted-foreground">Animation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Future Development */}
                <Card>
                  <CardHeader>
                    <CardTitle>Future Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Potential enhancements identified:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground">•</span>
                        Enhanced eye detail and facial contouring
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground">•</span>
                        Ear rendering with cultural jewelry
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground">•</span>
                        Improved hair shine and strand detail
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground">•</span>
                        Cultural marking/tattoo rendering
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground">•</span>
                        Background variation by social class
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Educational Applications CTA */}
      <Section className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4">Educational Applications</Badge>
            <h2 className="text-2xl font-serif font-bold mb-4">Teaching with Historical Personas</h2>
            <p className="text-muted-foreground mb-6">
              Use the Historical Persona Generator to help students understand the diversity of human experiences
              throughout history. Generate characters for creative writing exercises, explore social history through
              individual lives, or practice historical empathy and perspective-taking.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <a href="https://historical-persona-generator.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Play className="h-4 w-4" /> Try It Now
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">
                  Browse All Projects
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Projects CTA */}
      <Section className="bg-muted/40 py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-title font-serif font-bold">Related Projects</h2>
            <p className="text-muted-foreground mb-8">
              Explore other AI-powered historical simulations and educational tools from THINK.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/projects/history-simulator">
                  <BookOpen className="h-5 w-5" /> History Simulator
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projects/apothecary-simulator">
                  Apothecary Simulator
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
