import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, BookOpen, Code, Users, Newspaper, ScrollText, Archive } from 'lucide-react'

const resources = {
  historicalSources: [
    {
      title: 'Samuel Butler - "Darwin Among the Machines" (1863)',
      description: 'Prescient essay arguing machines could eventually develop consciousness through evolution',
      link: 'https://nzetc.victoria.ac.nz/tm/scholarly/tei-ButFir-t1-g1-t1-g1-t4-body.html',
      category: '19th Century',
    },
    {
      title: 'Samuel Butler - Erewhon (1872)',
      description: 'Dystopian novel featuring "The Book of the Machines" - imagining machine consciousness and evolution',
      link: 'https://www.gutenberg.org/ebooks/1906',
      category: '19th Century',
    },
    {
      title: 'Ada Lovelace - Notes on the Analytical Engine (1843)',
      description: 'First published algorithm and speculation on machine creativity beyond mere calculation',
      link: 'https://www.fourmilab.ch/babbage/sketch.html',
      category: '19th Century',
    },
    {
      title: 'Alan Turing - "Computing Machinery and Intelligence" (1950)',
      description: 'The foundational paper introducing the Turing Test and the question "Can machines think?"',
      link: 'https://academic.oup.com/mind/article/LIX/236/433/986238',
      category: 'Mid-20th Century',
    },
    {
      title: 'Norbert Wiener - Cybernetics (1948)',
      description: 'Groundbreaking work on control and communication in animals and machines',
      link: 'https://archive.org/details/norbert-wiener-cybernetics',
      category: 'Mid-20th Century',
    },
    {
      title: 'Norbert Wiener - The Human Use of Human Beings (1950)',
      description: 'Accessible exploration of cybernetics and its social implications for automation',
      link: 'https://archive.org/details/humanuseohumanbe00wien',
      category: 'Mid-20th Century',
    },
    {
      title: 'Warren McCulloch & Walter Pitts - "A Logical Calculus..." (1943)',
      description: 'Mathematical model of neural networks - foundational to modern AI',
      link: 'https://www.cs.cmu.edu/~./epxing/Class/10715/reading/McCulloch.and.Pitts.pdf',
      category: 'Mid-20th Century',
    },
    {
      title: 'Vannevar Bush - "As We May Think" (1945)',
      description: 'Visionary essay on the "memex" - an early conceptualization of hypertext and knowledge machines',
      link: 'https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/',
      category: 'Mid-20th Century',
    },
    {
      title: 'Claude Shannon - "A Mathematical Theory of Communication" (1948)',
      description: 'Foundation of information theory - essential to understanding computational intelligence',
      link: 'https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf',
      category: 'Mid-20th Century',
    },
    {
      title: 'Karel Čapek - R.U.R. (Rossum\'s Universal Robots) (1920)',
      description: 'Play that introduced the word "robot" - exploring artificial workers and rebellion',
      link: 'https://www.gutenberg.org/ebooks/59112',
      category: 'Early 20th Century',
    },
    {
      title: 'Isaac Asimov - "Runaround" (1942) - Three Laws of Robotics',
      description: 'Short story introducing the influential Three Laws governing robot behavior',
      link: 'https://archive.org/details/I_Robot_-_Isaac_Asimov',
      category: 'Mid-20th Century',
    },
    {
      title: 'John von Neumann - Theory of Self-Reproducing Automata (1966)',
      description: 'Posthumous work on machines that can replicate themselves',
      link: 'https://archive.org/details/theoryofselfrepr00vonn',
      category: 'Mid-20th Century',
    },
    {
      title: 'Macy Conferences on Cybernetics (1946-1953)',
      description: 'Transcripts and papers from interdisciplinary meetings that shaped cybernetics',
      link: 'https://www.asc-cybernetics.org/foundations/history/MacySummary.htm',
      category: 'Mid-20th Century',
    },
    {
      title: 'W. Ross Ashby - An Introduction to Cybernetics (1956)',
      description: 'Accessible introduction to cybernetic principles and self-regulating systems',
      link: 'https://archive.org/details/introductiontocy00ashb',
      category: 'Mid-20th Century',
    },
    {
      title: 'Marvin Minsky - "Steps Toward Artificial Intelligence" (1961)',
      description: 'Early survey of AI research problems and potential approaches',
      link: 'https://web.media.mit.edu/~minsky/papers/steps.html',
      category: 'Mid-20th Century',
    },
    {
      title: 'Joseph Weizenbaum - ELIZA (1966) & "Computer Power..." (1976)',
      description: 'Early chatbot and critical book on limits of artificial intelligence',
      link: 'https://web.stanford.edu/class/symbsys205/Weizenbaum.pdf',
      category: 'Late 20th Century',
    },
    {
      title: 'J.C.R. Licklider - "Man-Computer Symbiosis" (1960)',
      description: 'Vision of cooperative interaction between humans and computers',
      link: 'https://groups.csail.mit.edu/medg/people/psz/Licklider.html',
      category: 'Mid-20th Century',
    },
    {
      title: 'Herbert Simon - "The Shape of Automation" (1965)',
      description: 'Analysis of automation\'s impact on society and human work',
      link: 'https://archive.org/details/shapeofautomatio00simo',
      category: 'Mid-20th Century',
    },
    {
      title: 'Hubert Dreyfus - "Alchemy and AI" (1965)',
      description: 'Early philosophical critique of artificial intelligence assumptions',
      link: 'https://www.rand.org/pubs/papers/P3244.html',
      category: 'Mid-20th Century',
    },
    {
      title: 'John McCarthy - "Programs with Common Sense" (1959)',
      description: 'Foundational paper on AI from the researcher who coined the term',
      link: 'http://jmc.stanford.edu/articles/mcc59.html',
      category: 'Mid-20th Century',
    },
    {
      title: 'E.M. Forster - "The Machine Stops" (1909)',
      description: 'Dystopian story of humanity\'s dependence on an all-controlling machine',
      link: 'https://www.gutenberg.org/ebooks/73676',
      category: 'Early 20th Century',
    },
    {
      title: 'Ambrose Bierce - "Moxon\'s Master" (1899)',
      description: 'Early science fiction about a chess-playing automaton that becomes violent',
      link: 'https://www.gutenberg.org/files/4366/4366-h/4366-h.htm',
      category: '19th Century',
    },
    {
      title: 'Edward Bellamy - Looking Backward (1888)',
      description: 'Utopian novel imagining automated production and technological society',
      link: 'https://www.gutenberg.org/ebooks/624',
      category: '19th Century',
    },
    {
      title: 'Charles Babbage - Passages from the Life of a Philosopher (1864)',
      description: 'Autobiography including detailed accounts of the Analytical Engine',
      link: 'https://www.gutenberg.org/ebooks/57532',
      category: '19th Century',
    },
    {
      title: 'George Boole - The Laws of Thought (1854)',
      description: 'Foundation of Boolean logic essential to computer science',
      link: 'https://www.gutenberg.org/ebooks/15114',
      category: '19th Century',
    },
    {
      title: 'Donna Haraway - "A Cyborg Manifesto" (1985)',
      description: 'Influential feminist theory of technology, cyborgs, and identity',
      link: 'https://warwick.ac.uk/fac/arts/english/currentstudents/undergraduate/modules/fictionnow/manifestly_haraway_----_a_cyborg_manifesto_science_technology_and_socialist-feminism_in_the_....pdf',
      category: 'Late 20th Century',
    },
    {
      title: 'Douglas Hofstadter - Gödel, Escher, Bach (1979)',
      description: 'Exploration of consciousness, self-reference, and artificial intelligence',
      link: 'https://archive.org/details/GdelEscherBach',
      category: 'Late 20th Century',
    },
    {
      title: 'Sherry Turkle - The Second Self (1984)',
      description: 'Psychological study of computers and human identity',
      link: 'https://archive.org/details/secondselfcomput00turk',
      category: 'Late 20th Century',
    },
    {
      title: 'Pamela McCorduck - Machines Who Think (1979)',
      description: 'Historical account of AI research from ancient automata to 1970s',
      link: 'https://archive.org/details/machineswhothink00mcco',
      category: 'Late 20th Century',
    },
    {
      title: 'Grey Walter - The Living Brain (1953)',
      description: 'Neurophysiologist\'s account of robotic "tortoises" and brain function',
      link: 'https://archive.org/details/livingbrain00walt',
      category: 'Mid-20th Century',
    },
  ],
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
      link: 'https://docs.claude.com/en/docs/claude-code',
      category: 'Development Tool',
    },
    {
      title: 'OpenAI API',
      description: 'GPT models and other AI tools for developers',
      link: 'https://openai.com/api/',
      category: 'AI Platform',
    },
    {
      title: 'Hugging Face',
      description: 'Open-source AI models and datasets for NLP and machine learning',
      link: 'https://huggingface.co/',
      category: 'AI Platform',
    },
    {
      title: 'LangChain',
      description: 'Framework for developing applications with large language models',
      link: 'https://www.langchain.com/',
      category: 'Development Tool',
    },
    {
      title: 'Jupyter Notebooks',
      description: 'Interactive computing environment for data science and AI experimentation',
      link: 'https://jupyter.org/',
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
    {
      title: 'Stanford CS+Social Good',
      description: 'Resources for using computer science for social impact',
      link: 'https://cs.stanford.edu/social-good',
      category: 'Education',
    },
    {
      title: 'AI4ALL',
      description: 'Educational programs increasing diversity and inclusion in AI',
      link: 'https://ai-4-all.org/',
      category: 'Education',
    },
    {
      title: 'fast.ai',
      description: 'Practical deep learning courses for coders',
      link: 'https://www.fast.ai/',
      category: 'Tutorial',
    },
    {
      title: 'Elements of AI',
      description: 'Free online introduction to AI for non-technical audiences',
      link: 'https://www.elementsofai.com/',
      category: 'Tutorial',
    },
    {
      title: 'Moral Machine',
      description: 'MIT platform for exploring ethical dilemmas in AI decision-making',
      link: 'https://www.moralmachine.net/',
      category: 'Ethics',
    },
  ],
  aiEthics: [
    {
      title: 'AI Now Institute',
      description: 'Research institute examining social implications of artificial intelligence',
      link: 'https://ainowinstitute.org/',
      category: 'Research',
    },
    {
      title: 'Partnership on AI',
      description: 'Multi-stakeholder organization working on responsible AI practices',
      link: 'https://partnershiponai.org/',
      category: 'Organization',
    },
    {
      title: 'Data & Society',
      description: 'Research on social and cultural issues of data and automation',
      link: 'https://datasociety.net/',
      category: 'Research',
    },
    {
      title: 'Algorithm Watch',
      description: 'Non-profit examining algorithmic decision-making',
      link: 'https://algorithmwatch.org/',
      category: 'Watchdog',
    },
    {
      title: 'Algorithmic Justice League',
      description: 'Organization combining art and research to fight AI bias',
      link: 'https://www.ajl.org/',
      category: 'Advocacy',
    },
    {
      title: 'Montreal AI Ethics Institute',
      description: 'International community making AI ethical and equitable',
      link: 'https://montrealethics.ai/',
      category: 'Research',
    },
    {
      title: 'AI Ethics Guidelines Global Inventory',
      description: 'Database of AI ethics principles from around the world',
      link: 'https://inventory.algorithmwatch.org/',
      category: 'Database',
    },
    {
      title: 'Centre for the Governance of AI',
      description: 'Research center on political challenges of transformative AI',
      link: 'https://www.governance.ai/',
      category: 'Research',
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
      category: 'Professional',
    },
    {
      title: 'American Historical Association',
      description: 'Professional organization for historians with DH resources',
      link: 'https://www.historians.org/',
      category: 'Professional',
    },
    {
      title: 'Association for Computers and the Humanities',
      description: 'Organization supporting computational approaches to humanities',
      link: 'http://ach.org/',
      category: 'Professional',
    },
    {
      title: 'Digital Library Federation',
      description: 'Community advancing research, learning, and heritage through digital collections',
      link: 'https://www.diglib.org/',
      category: 'Community',
    },
    {
      title: 'Text Encoding Initiative',
      description: 'Consortium developing standards for digital text representation',
      link: 'https://tei-c.org/',
      category: 'Standards',
    },
  ],
  archives: [
    {
      title: 'Internet Archive',
      description: 'Digital library with millions of free books, texts, and historical materials',
      link: 'https://archive.org/',
      category: 'Archive',
    },
    {
      title: 'HathiTrust Digital Library',
      description: 'Partnership of research libraries preserving and sharing digital content',
      link: 'https://www.hathitrust.org/',
      category: 'Archive',
    },
    {
      title: 'Europeana',
      description: 'European cultural heritage collections from museums, libraries, and archives',
      link: 'https://www.europeana.eu/',
      category: 'Archive',
    },
    {
      title: 'Digital Public Library of America',
      description: 'Portal to millions of photographs, manuscripts, books, and more',
      link: 'https://dp.la/',
      category: 'Archive',
    },
    {
      title: 'The Charles Babbage Institute',
      description: 'Archive for history of information technology',
      link: 'https://cbi.umn.edu/',
      category: 'Archive',
    },
    {
      title: 'Computer History Museum',
      description: 'Collections and exhibitions on computing history',
      link: 'https://computerhistory.org/',
      category: 'Museum',
    },
    {
      title: 'Turing Digital Archive',
      description: 'Alan Turing\'s papers, photographs, and correspondence',
      link: 'https://turingarchive.kings.cam.ac.uk/',
      category: 'Archive',
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
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
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
            <h1 className="text-4xl font-serif font-bold mb-4">Resources</h1>
            <p className="text-lg text-muted-foreground">
              Curated collection of historical sources, tools, and scholarship on AI, automation, and digital humanities
            </p>
          </div>

          {/* Historical Primary Sources */}
          <div className="mb-16">
            <div className="flex items-start gap-3 mb-4">
              <ScrollText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-serif font-bold mb-2">Historical Primary Sources on AI & Automation</h2>
                <p className="text-muted-foreground">
                  19th and 20th century texts exploring intelligent machines, automation, and artificial minds—
                  essential for understanding the deep history of AI concepts
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.historicalSources.map((resource, index) => (
                <ResourceLink key={index} {...resource} />
              ))}
            </div>
          </div>

          {/* AI Tools & Platforms */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Code className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-serif font-bold">AI Tools & Platforms</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.aiEthics.map((resource, index) => (
                <ResourceLink key={index} {...resource} />
              ))}
            </div>
          </div>

          {/* Archives & Digital Collections */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Archive className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-serif font-bold">Archives & Digital Collections</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.archives.map((resource, index) => (
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              href="mailto:bbreen@ucsc.edu?subject=Resource Suggestion"
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
