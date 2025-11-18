'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Search, BookOpen, FileText, Video, Newspaper, Wrench } from 'lucide-react'

type ResourceType = 'article' | 'paper' | 'blog' | 'video' | 'book' | 'tool'
type ResourceCategory =
  | 'Critical AI Theory'
  | 'Humanities Pedagogy'
  | 'Writing & Composition'
  | 'Academic Integrity'
  | 'Digital Humanities'
  | 'Historical Simulation'
  | 'AI Literacy'
  | 'Policy & Guidance'
  | 'Tools & Platforms'
  | 'Data Ethics'

interface Resource {
  title: string
  authors: string
  year: number
  type: ResourceType
  category: ResourceCategory
  description: string
  url: string
  journal?: string
}

const resources: Resource[] = [
  // Critical AI Theory
  {
    title: "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?",
    authors: "Emily M. Bender, Timnit Gebru, Angelina McMillan-Major, Margaret Mitchell",
    year: 2021,
    type: "paper",
    category: "Critical AI Theory",
    description: "Landmark paper examining environmental costs, data biases, and the illusion of meaning in large language models.",
    url: "https://dl.acm.org/doi/10.1145/3442188.3445922",
    journal: "FAccT '21"
  },
  {
    title: "Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence",
    authors: "Kate Crawford",
    year: 2021,
    type: "book",
    category: "Critical AI Theory",
    description: "Reveals how AI is a technology of extraction from natural resources, labor, and data, with profound political implications.",
    url: "https://yalebooks.yale.edu/book/9780300264630/atlas-of-ai/"
  },
  {
    title: "Algorithms of Oppression: How Search Engines Reinforce Racism",
    authors: "Safiya Umoja Noble",
    year: 2018,
    type: "book",
    category: "Critical AI Theory",
    description: "Documents how algorithms perpetuate discrimination and inequality through search engine results and classifications.",
    url: "https://nyupress.org/9781479837243/algorithms-of-oppression/"
  },
  {
    title: "Weapons of Math Destruction: How Big Data Increases Inequality",
    authors: "Cathy O'Neil",
    year: 2016,
    type: "book",
    category: "Critical AI Theory",
    description: "Examines how algorithmic systems reinforce inequality across education, employment, and criminal justice.",
    url: "https://www.penguinrandomhouse.com/books/241363/weapons-of-math-destruction-by-cathy-oneil/"
  },
  {
    title: "Coded Bias",
    authors: "Joy Buolamwini (featured), Shalini Kantayya (director)",
    year: 2020,
    type: "video",
    category: "Critical AI Theory",
    description: "Documentary exposing facial recognition bias and the Algorithmic Justice League's fight for equitable AI systems.",
    url: "https://www.codedbias.com/"
  },
  {
    title: "Resisting Dehumanization in the Age of 'AI'",
    authors: "Emily M. Bender",
    year: 2024,
    type: "paper",
    category: "Critical AI Theory",
    description: "Argues for rejecting anthropomorphic AI language to maintain focus on human agency and corporate accountability.",
    url: "https://faculty.washington.edu/ebender/papers/Bender-2024-preprint.pdf"
  },
  {
    title: "The AI Con: How to Fight Big Tech's Hype and Create the Future We Want",
    authors: "Emily M. Bender & Alex Hanna",
    year: 2024,
    type: "book",
    category: "Critical AI Theory",
    description: "Dismantles AI industry hype and offers frameworks for building technology that serves human flourishing.",
    url: "https://mitpress.mit.edu/9780262049528/the-ai-con/"
  },

  // Humanities Pedagogy
  {
    title: "Simulating History with ChatGPT",
    authors: "Benjamin Breen",
    year: 2024,
    type: "blog",
    category: "Humanities Pedagogy",
    description: "Uses LLMs as 'hallucination engines' for interactive historical simulations that teach critical AI literacy.",
    url: "https://resobscura.substack.com/p/simulating-history-with-chatgpt"
  },
  {
    title: "Can Automation Help Make the Humanities More Human?",
    authors: "Benjamin Breen",
    year: 2024,
    type: "blog",
    category: "Humanities Pedagogy",
    description: "Applies Margaret Mead's 1963 automation vision to distinguish drudgery-elimination from intellectual offloading.",
    url: "https://resobscura.substack.com/p/can-automation-make-the-humanities-more-human"
  },
  {
    title: "The AI Pedagogy Project",
    authors: "metaLAB at Harvard",
    year: 2024,
    type: "tool",
    category: "Humanities Pedagogy",
    description: "Collaborative research initiative exploring pedagogical approaches to teaching with and about AI.",
    url: "https://aipedagogy.org/"
  },
  {
    title: "Generative AI in the Humanities Classroom",
    authors: "Arizona State University",
    year: 2024,
    type: "article",
    category: "Humanities Pedagogy",
    description: "NEH-funded study examining voluntary AI platform use in composition and humanities courses.",
    url: "https://news.asu.edu/20240229-arts-humanities-and-education-generative-ai-humanities-classroom"
  },
  {
    title: "Understanding Generative AI as a Pedagogical Innovation",
    authors: "Various Contributors",
    year: 2024,
    type: "article",
    category: "Humanities Pedagogy",
    description: "Frames generative AI as general-purpose pedagogical technology requiring thoughtful instructional design.",
    url: "https://www.insidehighered.com/opinion/views/2024/11/25/understanding-generative-ai-pedagogical-innovation-opinion"
  },
  {
    title: "Teaching with AI",
    authors: "Anna Mills & Lauren M.E. Goodlad (editors)",
    year: 2024,
    type: "tool",
    category: "Humanities Pedagogy",
    description: "Comprehensive resource hub for assignment design, prompting strategies, and ethical AI integration.",
    url: "https://www.teachingwithai.org/"
  },
  {
    title: "Against Efficiency: The Humanities and ChatGPT",
    authors: "Ted Underwood",
    year: 2023,
    type: "blog",
    category: "Humanities Pedagogy",
    description: "Argues humanities' resistance to efficiency metrics uniquely positions them to reshape AI toward human values.",
    url: "https://tedunderwood.com/2023/01/23/against-efficiency/"
  },
  {
    title: "Historians Need to Understand How AI Actually Works",
    authors: "Cameron Blevins",
    year: 2023,
    type: "article",
    category: "Humanities Pedagogy",
    description: "Makes the case for historians developing technical literacy to critique and use AI responsibly.",
    url: "https://www.historians.org/research-and-publications/perspectives-on-history/march-2023/historians-need-to-understand-how-ai-actually-works",
    journal: "Perspectives on History"
  },

  // Writing & Composition
  {
    title: "Rhetorically Training Students to Generate with AI",
    authors: "Various Authors",
    year: 2024,
    type: "paper",
    category: "Writing & Composition",
    description: "Applies rhetorical theory to teach students critical engagement with AI as audience and collaborator.",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S8755461524000045",
    journal: "Computers and Composition"
  },
  {
    title: "Playing the Digital Dialectic Game: Writing Pedagogy with Generative AI",
    authors: "Various Authors",
    year: 2025,
    type: "paper",
    category: "Writing & Composition",
    description: "Frames AI writing tools as sites for dialectical play that teaches critical and ethical engagement.",
    url: "https://www.sciencedirect.com/science/article/pii/S8755461525000027",
    journal: "Computers and Composition"
  },
  {
    title: "Generative AI in First-Year Writing: Affordances, Limitations, and Framework",
    authors: "Various Authors",
    year: 2024,
    type: "paper",
    category: "Writing & Composition",
    description: "Early analysis providing practical framework for integrating AI in composition courses.",
    url: "https://www.sciencedirect.com/science/article/pii/S8755461524000033",
    journal: "Computers and Composition"
  },
  {
    title: "Statement on AI and Writing Across the Curriculum",
    authors: "Association for Writing Across the Curriculum",
    year: 2024,
    type: "article",
    category: "Writing & Composition",
    description: "Professional organization guidance on AI's role in writing instruction across disciplines.",
    url: "https://wacassociation.org/ai-statement/"
  },
  {
    title: "Adapting Writing Pedagogy in the AI Era",
    authors: "Various Contributors",
    year: 2024,
    type: "article",
    category: "Writing & Composition",
    description: "Practical strategies for redesigning writing assignments to maintain pedagogical integrity with AI.",
    url: "https://wcu-tlc.org/ai/adapting-writing-pedagogy-in-the-ai-era/"
  },
  {
    title: "The Futures of Text: Teaching Writing in a World of ChatGPT",
    authors: "Anna Mills",
    year: 2023,
    type: "blog",
    category: "Writing & Composition",
    description: "Framework for redesigning writing assignments that incorporate AI while preserving learning outcomes.",
    url: "https://annamills.net/"
  },

  // Academic Integrity & Assessment
  {
    title: "How Do We Maintain Academic Integrity in the ChatGPT Era?",
    authors: "AAC&U",
    year: 2024,
    type: "article",
    category: "Academic Integrity",
    description: "Recommendations for rethinking academic integrity beyond detection toward pedagogical redesign.",
    url: "https://www.aacu.org/liberaleducation/articles/how-do-we-maintain-academic-integrity-in-the-chatgpt-era"
  },
  {
    title: "Ensuring Academic Integrity in the Age of ChatGPT",
    authors: "Various Authors",
    year: 2024,
    type: "paper",
    category: "Academic Integrity",
    description: "Proposes rethinking exam design, assessment strategies, and ethical AI policies in higher education.",
    url: "https://www.cedtech.net/download/ensuring-academic-integrity-in-the-age-of-chatgpt-rethinking-exam-design-assessment-strategies-and-15775.pdf",
    journal: "Contemporary Educational Technology"
  },
  {
    title: "Unexpected Bedfellows: Using ChatGPT to Uphold Academic Assessment Integrity",
    authors: "Various Authors",
    year: 2023,
    type: "article",
    category: "Academic Integrity",
    description: "Explores counterintuitive approach of using AI to design more robust, authentic assessments.",
    url: "https://er.educause.edu/articles/2023/9/unexpected-bedfellows-using-chatgpt-to-uphold-academic-assessment-integrity",
    journal: "EDUCAUSE Review"
  },
  {
    title: "The End of Writing: AI Essays and Academic Integrity",
    authors: "Rebecca Moore Howard & Tricia Serviss",
    year: 2023,
    type: "article",
    category: "Academic Integrity",
    description: "Challenges traditional integrity approaches and proposes pedagogical redesign over detection.",
    url: "https://www.insidehighered.com/views/2023/01/13/colleges-should-meet-challenge-chatgpt-changing-how-we-teach-opinion"
  },
  {
    title: "ChatGPT Unveiled: Perceptions of Academic Integrity in Higher Education",
    authors: "Various Authors",
    year: 2024,
    type: "paper",
    category: "Academic Integrity",
    description: "Qualitative research examining student and faculty perceptions of AI and academic honesty.",
    url: "https://link.springer.com/article/10.1007/s10805-024-09543-6",
    journal: "Journal of Academic Ethics"
  },

  // Digital Humanities Methods
  {
    title: "Distant Horizons: Digital Evidence and Literary Change",
    authors: "Ted Underwood",
    year: 2019,
    type: "book",
    category: "Digital Humanities",
    description: "Uses machine learning to trace literary patterns across centuries, demonstrating computational humanities methods.",
    url: "https://press.uchicago.edu/ucp/books/book/chicago/D/bo35853783.html"
  },
  {
    title: "Machine Learning and the Literary Imagination",
    authors: "Ted Underwood (interview)",
    year: 2024,
    type: "article",
    category: "Digital Humanities",
    description: "Explores how machine learning serves as philosophical interlocutor for humanities interpretation.",
    url: "https://thegradientpub.substack.com/p/ted-underwood-machine-learning-and"
  },
  {
    title: "Paper Trails: The US Post and the Making of the American West",
    authors: "Cameron Blevins",
    year: 2021,
    type: "book",
    category: "Digital Humanities",
    description: "Spatial history using digital mapping to reveal how postal networks shaped the American West.",
    url: "https://global.oup.com/academic/product/paper-trails-9780190053673"
  },
  {
    title: "Learning by Doing: Labs and Pedagogy in the Digital Humanities",
    authors: "Cameron Blevins",
    year: 2016,
    type: "blog",
    category: "Digital Humanities",
    description: "Articulates pedagogical philosophy for teaching digital methods through hands-on lab experiences.",
    url: "https://cblevins.github.io/posts/learning-by-doing/"
  },
  {
    title: "Think Talk Make Do: Power and the Digital Humanities",
    authors: "Miriam Posner",
    year: 2013,
    type: "article",
    category: "Digital Humanities",
    description: "Critical examination of power dynamics, labor, and representation in digital humanities work.",
    url: "http://journalofdigitalhumanities.org/2-3/dh-that-matters-by-miriam-posner/",
    journal: "Journal of Digital Humanities"
  },
  {
    title: "DH101: Introduction to Digital Humanities",
    authors: "Miriam Posner",
    year: 2024,
    type: "tool",
    category: "Digital Humanities",
    description: "Course materials for developing humanistic attitudes toward data with critical, interrogative stance.",
    url: "https://miriamposner.com/dh101f15/"
  },
  {
    title: "Data Feminism",
    authors: "Catherine D'Ignazio & Lauren F. Klein",
    year: 2020,
    type: "book",
    category: "Digital Humanities",
    description: "Applies intersectional feminist thought to data science, visualization, and ethics.",
    url: "https://data-feminism.mitpress.mit.edu/"
  },
  {
    title: "Feminist Data Visualization",
    authors: "Catherine D'Ignazio & Lauren F. Klein",
    year: 2016,
    type: "paper",
    category: "Digital Humanities",
    description: "Explores how emotion and embodied experience can expand effective data visualization practices.",
    url: "https://kanarinka.com/wp-content/uploads/2015/07/IEEE_Feminist_Data_Visualization.pdf",
    journal: "IEEE VIS 2015"
  },
  {
    title: "Prompt Engineering for Humanities Research",
    authors: "Quinn Dombrowski, Roopika Risam, Liz Grumbach",
    year: 2024,
    type: "blog",
    category: "Digital Humanities",
    description: "Practical guide to designing effective prompts for literary studies, history, and cultural analysis.",
    url: "https://datasittersclub.github.io/site/"
  },
  {
    title: "The Limits of the Digital Humanities",
    authors: "Adam Kirsch",
    year: 2014,
    type: "article",
    category: "Digital Humanities",
    description: "Early critique examining tensions between computational approaches and humanistic inquiry.",
    url: "https://newrepublic.com/article/117428/limits-digital-humanities-adam-kirsch",
    journal: "The New Republic"
  },

  // Historical Simulation & Interactive Learning
  {
    title: "The Role of AI in Historical Simulation Design: A TPACK Perspective",
    authors: "Various Authors",
    year: 2025,
    type: "paper",
    category: "Historical Simulation",
    description: "Examines educator involvement with GenAI in designing French Revolution simulation for classrooms.",
    url: "https://www.mdpi.com/2227-7102/15/2/192",
    journal: "Education Sciences"
  },
  {
    title: "AI Tools for History Teachers",
    authors: "Tom Daccord",
    year: 2024,
    type: "tool",
    category: "Historical Simulation",
    description: "Curated collection of AI tools specifically designed for social studies and history education.",
    url: "https://www.tomdaccord.com/ai-tools-for-history-teachers"
  },
  {
    title: "How Teachers Can Use AI Chatbots in History Class",
    authors: "SchoolAI",
    year: 2024,
    type: "article",
    category: "Historical Simulation",
    description: "Practical strategies for using conversational AI to create historical simulations and dialogues.",
    url: "https://schoolai.com/blog/engaging-in-history-class-using-ai-chatbots-as-a-teaching-tool"
  },
  {
    title: "Revolutionizing History Education Through AI",
    authors: "Historica Canada",
    year: 2024,
    type: "article",
    category: "Historical Simulation",
    description: "Explores immersive AI applications bringing historical events to life in interactive classrooms.",
    url: "https://www.historica.org/blog/ai-in-history-classrooms"
  },
  {
    title: "Hello History: AI Conversations with Historical Figures",
    authors: "Hello History Team",
    year: 2024,
    type: "tool",
    category: "Historical Simulation",
    description: "Platform enabling students to engage in AI-powered dialogues with simulated historical personalities.",
    url: "https://www.hellohistory.ai/for-education"
  },
  {
    title: "Guiding Principles for Artificial Intelligence in History Education",
    authors: "American Historical Association",
    year: 2024,
    type: "article",
    category: "Historical Simulation",
    description: "Professional guidelines recognizing AI opportunities while emphasizing irreplaceable role of human teachers.",
    url: "https://www.historians.org/resource/guiding-principles-for-artificial-intelligence-in-history-education/"
  },

  // AI Literacy & Prompt Engineering
  {
    title: "Understanding AI Literacy",
    authors: "Stanford Teaching Commons",
    year: 2024,
    type: "article",
    category: "AI Literacy",
    description: "Framework identifying functional, ethical, rhetorical, and pedagogical domains of AI literacy.",
    url: "https://teachingcommons.stanford.edu/teaching-guides/artificial-intelligence-teaching-guide/understanding-ai-literacy"
  },
  {
    title: "Prompt Engineering in Higher Education: A Systematic Review",
    authors: "Various Authors",
    year: 2025,
    type: "paper",
    category: "AI Literacy",
    description: "Comprehensive review informing curriculum development for teaching prompt engineering skills.",
    url: "https://educationaltechnologyjournal.springeropen.com/articles/10.1186/s41239-025-00503-7",
    journal: "International Journal of Educational Technology"
  },
  {
    title: "Embracing AI Literacy, Prompt Engineering, and Critical Thinking",
    authors: "Various Authors",
    year: 2024,
    type: "paper",
    category: "AI Literacy",
    description: "Argues prompt engineering belongs to higher cognitive competences grouped under AI literacy umbrella.",
    url: "https://educationaltechnologyjournal.springeropen.com/articles/10.1186/s41239-024-00448-3",
    journal: "International Journal of Educational Technology"
  },
  {
    title: "Generative AI Prompt Engineering for Educators: Practical Strategies",
    authors: "Jiyeon Park & Sam Choo",
    year: 2024,
    type: "paper",
    category: "AI Literacy",
    description: "Introduces IDEA framework for scaffolded, step-by-step prompt engineering in teacher preparation.",
    url: "https://journals.sagepub.com/doi/10.1177/01626434241298954",
    journal: "Journal of Education"
  },
  {
    title: "AI Literacy and Its Implications for Prompt Engineering Strategies",
    authors: "Various Authors",
    year: 2024,
    type: "paper",
    category: "AI Literacy",
    description: "Demonstrates how AI literacy predicts quality of prompt engineering and LLM output.",
    url: "https://www.sciencedirect.com/science/article/pii/S2666920X24000262",
    journal: "Computers and Education: AI"
  },
  {
    title: "Prompt Engineering or AI Literacy? Developing Critical Awareness",
    authors: "Various Authors",
    year: 2024,
    type: "article",
    category: "AI Literacy",
    description: "Explores relationship between technical prompting skills and broader critical AI awareness.",
    url: "https://altc.alt.ac.uk/blog/2024/02/prompting-engineering-or-ai-literacy-how-to-develop-a-critical-awareness-of-generative-ai-in-education/"
  },
  {
    title: "AI Prompt Engineering: The New Literacy Skill for Students",
    authors: "MiddleWeb",
    year: 2024,
    type: "article",
    category: "AI Literacy",
    description: "Positions prompt engineering as essential next-generation literacy requiring intentional instruction.",
    url: "https://www.middleweb.com/52275/ai-prompt-engineering-the-new-literacy-skill/"
  },
  {
    title: "New Guide Helps Educators Build Critical AI Literacy",
    authors: "University of Kansas",
    year: 2024,
    type: "tool",
    category: "AI Literacy",
    description: "Practical guide for developing student ability to critically analyze, evaluate, and reflect on AI use.",
    url: "https://cms.ku.edu/news/article/new-guide-helps-educators-build-critical-ai-literacy"
  },

  // Policy & Institutional Guidance
  {
    title: "AI and Education: Guidance for Policy-Makers",
    authors: "UNESCO",
    year: 2021,
    type: "paper",
    category: "Policy & Guidance",
    description: "International framework introducing AI essentials and responding to educational challenges and opportunities.",
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000376709"
  },
  {
    title: "Guidance for Generative AI in Education and Research",
    authors: "UNESCO",
    year: 2023,
    type: "paper",
    category: "Policy & Guidance",
    description: "First global guidance on GenAI emphasizing human-centered approach with equity and inclusion.",
    url: "https://unesdoc.unesco.org/ark:/48223/pf0000386693"
  },
  {
    title: "Artificial Intelligence and the Future of Teaching and Learning",
    authors: "U.S. Department of Education, Office of Educational Technology",
    year: 2023,
    type: "paper",
    category: "Policy & Guidance",
    description: "Federal policy guidance emphasizing equity, safety, and human-centered design in educational AI.",
    url: "https://tech.ed.gov/ai/"
  },
  {
    title: "ChatGPT and the Transformation of Academic Research and Teaching",
    authors: "UNESCO",
    year: 2023,
    type: "paper",
    category: "Policy & Guidance",
    description: "Framework addressing ChatGPT's higher education impact with ethical integration recommendations.",
    url: "https://www.unesco.org/en/articles/chatgpt-and-artificial-intelligence-higher-education"
  },
  {
    title: "Navigating AI Literacy Education: Insights from a Decade of Research",
    authors: "Various Authors",
    year: 2025,
    type: "paper",
    category: "Policy & Guidance",
    description: "Systematic review of AI literacy research from 2014-2024 informing educational policy development.",
    url: "https://www.nature.com/articles/s41599-025-04583-8",
    journal: "Humanities and Social Sciences Communications"
  },

  // Tools & Platforms
  {
    title: "MagicSchool AI",
    authors: "MagicSchool Team",
    year: 2024,
    type: "tool",
    category: "Tools & Platforms",
    description: "Platform with 80+ AI tools for teachers helping 6 million educators save 7-10 hours weekly.",
    url: "https://www.magicschool.ai"
  },
  {
    title: "Brisk Teaching",
    authors: "Brisk Team",
    year: 2024,
    type: "tool",
    category: "Tools & Platforms",
    description: "Chrome extension integrating AI assistance into Google Workspace, Canvas, and LMS platforms.",
    url: "https://www.briskteaching.com/"
  },
  {
    title: "SchoolAI",
    authors: "SchoolAI Team",
    year: 2024,
    type: "tool",
    category: "Tools & Platforms",
    description: "AI teaching assistant generating standards-aligned lessons and interactive historical simulations.",
    url: "https://schoolai.com/"
  },
  {
    title: "Eduaide.AI",
    authors: "Eduaide Team",
    year: 2024,
    type: "tool",
    category: "Tools & Platforms",
    description: "Specialized AI assistant for creating individualized IEPs, assessments, and academic content.",
    url: "https://www.eduaide.ai/"
  },
  {
    title: "Diffit",
    authors: "Diffit Team",
    year: 2024,
    type: "tool",
    category: "Tools & Platforms",
    description: "AI tool for automatically differentiating reading materials to appropriate student levels.",
    url: "https://www.diffit.me/"
  },

  // Data Ethics & Visualization
  {
    title: "The Seven Principles of Data Feminism",
    authors: "Catherine D'Ignazio & Lauren F. Klein",
    year: 2020,
    type: "article",
    category: "Data Ethics",
    description: "Framework for examining power, challenging binaries, and centering emotion in data work.",
    url: "https://responsibledata.io/anniversary/the-seven-principles-of-data-feminism/"
  },
  {
    title: "Unmasking AI: My Mission to Protect What Is Human",
    authors: "Joy Buolamwini",
    year: 2023,
    type: "book",
    category: "Data Ethics",
    description: "Personal account of discovering facial recognition bias and founding the Algorithmic Justice League.",
    url: "https://www.penguinrandomhouse.com/books/645447/unmasking-ai-by-joy-buolamwini/"
  },
  {
    title: "Race After Technology: Abolitionist Tools for the New Jim Code",
    authors: "Ruha Benjamin",
    year: 2019,
    type: "book",
    category: "Data Ethics",
    description: "Examines how technology reproduces racial discrimination through design defaults and algorithmic bias.",
    url: "https://www.wiley.com/en-us/Race+After+Technology%3A+Abolitionist+Tools+for+the+New+Jim+Code-p-9781509526406"
  },
  {
    title: "Automating Inequality: How High-Tech Tools Profile, Police, and Punish",
    authors: "Virginia Eubanks",
    year: 2018,
    type: "book",
    category: "Data Ethics",
    description: "Investigates how automated systems harm poor and working-class communities through digital poverty management.",
    url: "https://us.macmillan.com/books/9781250074317/automatinginequality"
  },
  {
    title: "Organizations and Researchers Pursuing Algorithmic Justice",
    authors: "Algorithmic Justice League & Others",
    year: 2024,
    type: "article",
    category: "Data Ethics",
    description: "Directory of scholars and organizations working toward equitable, accountable AI systems.",
    url: "https://www.ajl.org/"
  }
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All'>('All')
  const [selectedType, setSelectedType] = useState<ResourceType | 'All'>('All')

  // Get unique categories
  const allCategories: ResourceCategory[] = Array.from(new Set(resources.map(r => r.category))).sort()

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = searchQuery === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
      const matchesType = selectedType === 'All' || resource.type === selectedType

      return matchesSearch && matchesCategory && matchesType
    }).sort((a, b) => b.year - a.year)
  }, [searchQuery, selectedCategory, selectedType])

  // Group resources by category for display
  const resourcesByCategory = useMemo(() => {
    const grouped: Record<string, Resource[]> = {}
    filteredResources.forEach(resource => {
      if (!grouped[resource.category]) {
        grouped[resource.category] = []
      }
      grouped[resource.category].push(resource)
    })
    return grouped
  }, [filteredResources])

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'article': return <Newspaper className="h-4 w-4" />
      case 'paper': return <FileText className="h-4 w-4" />
      case 'blog': return <FileText className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'book': return <BookOpen className="h-4 w-4" />
      case 'tool': return <Wrench className="h-4 w-4" />
    }
  }

  const categoryDescriptions: Record<ResourceCategory, string> = {
    'Critical AI Theory': 'Foundational texts examining AI systems through lenses of power, bias, labor, and social justice',
    'Humanities Pedagogy': 'Teaching approaches integrating AI in humanities courses with critical, humanistic frameworks',
    'Writing & Composition': 'Rhetoric and composition scholarship on AI writing tools in writing instruction',
    'Academic Integrity': 'Research on plagiarism, assessment redesign, and maintaining integrity in the AI era',
    'Digital Humanities': 'Computational methods, data analysis, and visualization in humanities research and teaching',
    'Historical Simulation': 'AI tools and pedagogies for interactive historical learning and simulation',
    'AI Literacy': 'Teaching students and educators to use, critique, and understand AI systems',
    'Policy & Guidance': 'Institutional frameworks and policy recommendations for AI in education',
    'Tools & Platforms': 'Practical AI tools designed for educators and classroom use',
    'Data Ethics': 'Critical perspectives on algorithmic bias, fairness, and ethical data practices'
  }

  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-serif font-bold mb-4">Resources</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A comprehensive, curated collection of articles, papers, books, and tools for teaching
                with and about AI in humanities education—organized for discovery and practical application
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="space-y-4 mb-12">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by title, author, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Category Filter */}
              <div>
                <p className="text-sm font-medium mb-2">Filter by Category:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === 'All' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => setSelectedCategory('All')}
                  >
                    All Categories
                  </Badge>
                  {allCategories.map(category => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      className="cursor-pointer hover:bg-primary/80"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <p className="text-sm font-medium mb-2">Filter by Type:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedType === 'All' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => setSelectedType('All')}
                  >
                    All Types
                  </Badge>
                  <Badge
                    variant={selectedType === 'article' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => setSelectedType('article')}
                  >
                    <Newspaper className="h-3 w-3 mr-1" /> Articles
                  </Badge>
                  <Badge
                    variant={selectedType === 'paper' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => setSelectedType('paper')}
                  >
                    <FileText className="h-3 w-3 mr-1" /> Papers
                  </Badge>
                  <Badge
                    variant={selectedType === 'blog' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => setSelectedType('blog')}
                  >
                    <FileText className="h-3 w-3 mr-1" /> Blogs
                  </Badge>
                  <Badge
                    variant={selectedType === 'book' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => setSelectedType('book')}
                  >
                    <BookOpen className="h-3 w-3 mr-1" /> Books
                  </Badge>
                  <Badge
                    variant={selectedType === 'video' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => setSelectedType('video')}
                  >
                    <Video className="h-3 w-3 mr-1" /> Videos
                  </Badge>
                  <Badge
                    variant={selectedType === 'tool' ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => setSelectedType('tool')}
                  >
                    <Wrench className="h-3 w-3 mr-1" /> Tools
                  </Badge>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-8 text-center">
              Showing {filteredResources.length} of {resources.length} resources
            </p>

            {/* Resources Grouped by Category */}
            {Object.entries(resourcesByCategory).length > 0 ? (
              <div className="space-y-12">
                {Object.entries(resourcesByCategory)
                  .sort(([catA], [catB]) => catA.localeCompare(catB))
                  .map(([category, categoryResources]) => (
                    <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
                      <div className="mb-6">
                        <h2 className="text-2xl font-serif font-bold mb-2">{category}</h2>
                        <p className="text-sm text-muted-foreground">
                          {categoryDescriptions[category as ResourceCategory]}
                        </p>
                      </div>
                      <div className="grid gap-4">
                        {categoryResources.map((resource, index) => (
                          <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    {getTypeIcon(resource.type)}
                                    <Badge variant="secondary" className="text-xs capitalize">
                                      {resource.type}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{resource.year}</span>
                                  </div>
                                  <CardTitle className="text-lg mb-1.5">
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:text-primary transition-colors"
                                    >
                                      {resource.title}
                                    </a>
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {resource.authors}
                                    {resource.journal && <span className="italic"> · {resource.journal}</span>}
                                  </p>
                                </div>
                                <Button asChild variant="ghost" size="sm" className="flex-shrink-0">
                                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <CardDescription className="text-sm">
                                {resource.description}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No resources found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('All')
                    setSelectedType('All')
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Contribution Call */}
            <Card className="mt-16 border-dashed border-2 bg-muted/30">
              <CardHeader>
                <CardTitle className="text-center text-xl">Know a resource we should include?</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4 max-w-xl mx-auto">
                  This is a living collection. We welcome suggestions for articles, tools, papers, and
                  resources related to AI in humanities education. Help us build a more comprehensive resource.
                </CardDescription>
                <Button asChild variant="default">
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
