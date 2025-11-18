'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Search, BookOpen, FileText, Video, Newspaper } from 'lucide-react'

type ResourceType = 'article' | 'paper' | 'blog' | 'video' | 'book' | 'tool'
type ResourceTopic = 'AI Pedagogy' | 'Critical AI' | 'Historical Simulation' | 'Digital Humanities' | 'LLMs in Education' | 'Assessment & Cheating' | 'Humanities Computing'

interface Resource {
  title: string
  authors: string
  year: number
  type: ResourceType
  topics: ResourceTopic[]
  description: string
  url: string
  journal?: string
}

const resources: Resource[] = [
  {
    title: "Simulating History with ChatGPT",
    authors: "Benjamin Breen",
    year: 2024,
    type: "blog",
    topics: ["AI Pedagogy", "Historical Simulation", "LLMs in Education"],
    description: "Detailed account of using LLMs as 'hallucination engines' for creating interactive historical simulations in university history courses.",
    url: "https://resobscura.substack.com/p/simulating-history-with-chatgpt"
  },
  {
    title: "Can automation help make the humanities more human?",
    authors: "Benjamin Breen",
    year: 2024,
    type: "blog",
    topics: ["AI Pedagogy", "Critical AI", "Digital Humanities"],
    description: "Explores Margaret Mead's 1963 vision of automation and applies it to contemporary LLM use in humanities education, arguing for thoughtful distinction between drudgery-elimination and intellectual offloading.",
    url: "https://resobscura.substack.com/p/can-automation-make-the-humanities-more-human"
  },
  {
    title: "Teaching with AI",
    authors: "Anna Mills & Lauren M.E. Goodlad (editors)",
    year: 2024,
    type: "tool",
    topics: ["AI Pedagogy", "LLMs in Education"],
    description: "Comprehensive resource hub for instructors learning to teach with and about AI tools. Includes assignment design, prompting strategies, and ethical considerations.",
    url: "https://www.teachingwithai.org/"
  },
  {
    title: "The Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence",
    authors: "Kate Crawford",
    year: 2021,
    type: "book",
    topics: ["Critical AI"],
    description: "Foundational critical examination of AI's environmental, social, and political dimensions. Essential reading for understanding AI's material infrastructure and power relations.",
    url: "https://yalebooks.yale.edu/book/9780300264630/atlas-of-ai/"
  },
  {
    title: "Stochastic Parrots: Can Language Models Be Too Big?",
    authors: "Emily M. Bender, Timnit Gebru, Angelina McMillan-Major, Margaret Mitchell",
    year: 2021,
    type: "paper",
    topics: ["Critical AI", "LLMs in Education"],
    description: "Landmark paper examining risks of large language models, including environmental costs, data biases, and the illusion of meaning. Critical for understanding LLM limitations.",
    url: "https://dl.acm.org/doi/10.1145/3442188.3445922",
    journal: "FAccT '21: Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency"
  },
  {
    title: "ChatGPT and the Transformation of Academic Research and Teaching",
    authors: "UNESCO",
    year: 2023,
    type: "paper",
    topics: ["AI Pedagogy", "LLMs in Education", "Assessment & Cheating"],
    description: "International policy framework addressing ChatGPT's impact on higher education, with recommendations for ethical integration and academic integrity.",
    url: "https://www.unesco.org/en/articles/chatgpt-and-artificial-intelligence-higher-education"
  },
  {
    title: "Historians Need to Understand How AI Actually Works",
    authors: "Cameron Blevins",
    year: 2023,
    type: "article",
    topics: ["Digital Humanities", "LLMs in Education", "Historical Simulation"],
    description: "Argues that historians must develop technical literacy about AI systems to critique them effectively and use them responsibly in research and teaching.",
    url: "https://www.historians.org/research-and-publications/perspectives-on-history/march-2023/historians-need-to-understand-how-ai-actually-works",
    journal: "Perspectives on History"
  },
  {
    title: "The End of Writing: AI Essays and Academic Integrity",
    authors: "Rebecca Moore Howard & Tricia Serviss",
    year: 2023,
    type: "article",
    topics: ["Assessment & Cheating", "LLMs in Education"],
    description: "Examines how AI text generation challenges traditional approaches to academic integrity and proposes pedagogical redesign rather than detection-based responses.",
    url: "https://www.insidehighered.com/views/2023/01/13/colleges-should-meet-challenge-chatgpt-changing-how-we-teach-opinion"
  },
  {
    title: "Digital Divides and Artificial Intelligence Education",
    authors: "Safiya Umoja Noble",
    year: 2024,
    type: "article",
    topics: ["Critical AI", "AI Pedagogy"],
    description: "Critical examination of how AI education reproduces existing inequalities and the imperative for humanities-centered approaches to algorithmic literacy.",
    url: "https://datasociety.net/"
  },
  {
    title: "Prompt Engineering for Humanities Research",
    authors: "Quinn Dombrowski, Roopika Risam, Liz Grumbach",
    year: 2024,
    type: "blog",
    topics: ["Digital Humanities", "AI Pedagogy", "Humanities Computing"],
    description: "Practical guide to designing effective prompts for humanities research, with specific examples from literary studies, history, and cultural analysis.",
    url: "https://datasittersclub.github.io/site/"
  },
  {
    title: "Against Efficiency: The Humanities and ChatGPT",
    authors: "Ted Underwood",
    year: 2023,
    type: "blog",
    topics: ["Critical AI", "Humanities Computing"],
    description: "Argues that the humanities' resistance to efficiency metrics positions them uniquely to critique and reshape AI development toward human flourishing.",
    url: "https://tedunderwood.com/2023/01/23/against-efficiency/"
  },
  {
    title: "How AI Is Changing Higher Education",
    authors: "Chronicle of Higher Education (various contributors)",
    year: 2024,
    type: "article",
    topics: ["AI Pedagogy", "LLMs in Education", "Assessment & Cheating"],
    description: "Collection of perspectives from educators across disciplines on AI's impact on pedagogy, assessment, and institutional policy.",
    url: "https://www.chronicle.com/article/how-ai-is-changing-higher-education",
    journal: "The Chronicle of Higher Education"
  },
  {
    title: "The Limits of the Digital Humanities",
    authors: "Adam Kirsch",
    year: 2014,
    type: "article",
    topics: ["Digital Humanities", "Critical AI"],
    description: "Early critique of digital humanities methods that remains relevant for understanding tensions between computational approaches and humanistic inquiry.",
    url: "https://newrepublic.com/article/117428/limits-digital-humanities-adam-kirsch",
    journal: "The New Republic"
  },
  {
    title: "Large Language Models and the History of Science",
    authors: "Will Fenton",
    year: 2023,
    type: "blog",
    topics: ["Digital Humanities", "Historical Simulation", "LLMs in Education"],
    description: "Explores how LLMs can assist historical research while maintaining critical awareness of their limitations and biases in handling historical texts.",
    url: "https://earlyamericanists.com/"
  },
  {
    title: "The Futures of Text: Teaching Writing in a World of ChatGPT",
    authors: "Anna Mills",
    year: 2023,
    type: "paper",
    topics: ["AI Pedagogy", "LLMs in Education", "Assessment & Cheating"],
    description: "Practical framework for redesigning writing assignments to incorporate AI tools while maintaining pedagogical integrity and student learning.",
    url: "https://annamills.net/"
  },
  {
    title: "Artificial Intelligence and the Future of Teaching and Learning",
    authors: "U.S. Department of Education, Office of Educational Technology",
    year: 2023,
    type: "paper",
    topics: ["AI Pedagogy", "LLMs in Education"],
    description: "Federal policy guidance on AI in education, emphasizing equity, safety, and the importance of human-centered design in educational AI systems.",
    url: "https://tech.ed.gov/ai/"
  },
  {
    title: "Weapons of Math Destruction",
    authors: "Cathy O'Neil",
    year: 2016,
    type: "book",
    topics: ["Critical AI"],
    description: "Examines how algorithmic systems reinforce inequality and discrimination. Foundational for understanding why humanistic critique matters in AI development.",
    url: "https://www.penguinrandomhouse.com/books/241363/weapons-of-math-destruction-by-cathy-oneil/"
  }
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<ResourceTopic | 'All'>('All')
  const [selectedType, setSelectedType] = useState<ResourceType | 'All'>('All')

  // Get unique topics
  const allTopics = Array.from(new Set(resources.flatMap(r => r.topics))).sort()

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = searchQuery === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTopic = selectedTopic === 'All' || resource.topics.includes(selectedTopic)
      const matchesType = selectedType === 'All' || resource.type === selectedType

      return matchesSearch && matchesTopic && matchesType
    }).sort((a, b) => b.year - a.year)
  }, [searchQuery, selectedTopic, selectedType])

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'article': return <Newspaper className="h-4 w-4" />
      case 'paper': return <FileText className="h-4 w-4" />
      case 'blog': return <FileText className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'book': return <BookOpen className="h-4 w-4" />
      case 'tool': return <ExternalLink className="h-4 w-4" />
    }
  }

  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-serif font-bold mb-4 text-center">External Resources</h1>
            <p className="text-lg text-muted-foreground text-center mb-8">
              Curated collection of articles, papers, books, and tools for teaching with and about AI in humanities education
            </p>

            {/* Search and Filter Controls */}
            <div className="space-y-4 mb-8">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search resources by title, author, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Topic Filter */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedTopic === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedTopic('All')}
                >
                  All Topics
                </Badge>
                {allTopics.map(topic => (
                  <Badge
                    key={topic}
                    variant={selectedTopic === topic ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic}
                  </Badge>
                ))}
              </div>

              {/* Type Filter */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedType === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedType('All')}
                >
                  All Types
                </Badge>
                <Badge
                  variant={selectedType === 'article' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedType('article')}
                >
                  Articles
                </Badge>
                <Badge
                  variant={selectedType === 'paper' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedType('paper')}
                >
                  Academic Papers
                </Badge>
                <Badge
                  variant={selectedType === 'blog' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedType('blog')}
                >
                  Blog Posts
                </Badge>
                <Badge
                  variant={selectedType === 'book' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedType('book')}
                >
                  Books
                </Badge>
                <Badge
                  variant={selectedType === 'tool' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedType('tool')}
                >
                  Tools & Sites
                </Badge>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredResources.length} of {resources.length} resources
            </p>

            {/* Resource Cards */}
            <div className="space-y-4">
              {filteredResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(resource.type)}
                          <Badge variant="secondary" className="text-xs capitalize">
                            {resource.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{resource.year}</span>
                        </div>
                        <CardTitle className="text-lg mb-1">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {resource.title}
                          </a>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mb-2">
                          {resource.authors}
                          {resource.journal && <span className="italic"> · {resource.journal}</span>}
                        </p>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-3">
                      {resource.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1.5">
                      {resource.topics.map(topic => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No resources found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedTopic('All')
                    setSelectedType('All')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Contribution Call */}
            <Card className="mt-12 border-dashed border-2">
              <CardHeader>
                <CardTitle className="text-center">Know a resource we should include?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">
                  We welcome suggestions for articles, tools, and resources related to AI in humanities education.
                </CardDescription>
                <Button asChild>
                  <a href="mailto:bbreen@ucsc.edu?subject=THINK Resource Suggestion">
                    Suggest a Resource
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
