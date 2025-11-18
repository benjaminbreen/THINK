'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/ui/container'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Search, BookOpen, FileText, Video, Newspaper, Wrench, Menu, X, ChevronRight, ArrowUpDown } from 'lucide-react'

type SortOption = 'newest' | 'oldest' | 'author-az' | 'category' | 'type'
type ResourceType = 'article' | 'paper' | 'blog' | 'video' | 'book' | 'tool'
type ResourceCategory =
  | 'Historical Primary Sources'
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
  // Historical Primary Sources (1843-1999)
  {
    title: "Notes on the Analytical Engine",
    authors: "Ada Lovelace",
    year: 1843,
    type: "paper",
    category: "Historical Primary Sources",
    description: "Translation and notes on Babbage's Analytical Engine, including Note G—the first computer algorithm.",
    url: "https://www.computerhistory.org/babbage/adalovelace/",
    journal: "Taylor's Scientific Memoirs"
  },
  {
    title: "As We May Think",
    authors: "Vannevar Bush",
    year: 1945,
    type: "article",
    category: "Historical Primary Sources",
    description: "Visionary essay proposing the memex—a proto-hypertext device presaging information retrieval and digital humanities.",
    url: "https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/",
    journal: "The Atlantic"
  },
  {
    title: "A Mathematical Theory of Communication",
    authors: "Claude Shannon",
    year: 1948,
    type: "paper",
    category: "Historical Primary Sources",
    description: "Foundational paper establishing information theory and introducing the concept of 'bits' as units of information.",
    url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf",
    journal: "Bell System Technical Journal"
  },
  {
    title: "Cybernetics: Or Control and Communication in the Animal and the Machine",
    authors: "Norbert Wiener",
    year: 1948,
    type: "book",
    category: "Historical Primary Sources",
    description: "Technical foundation for cybernetics exploring feedback loops and control systems across biological and mechanical domains.",
    url: "https://archive.org/details/cybernetics-or-communication-and-control-in-the-animal-and-the-machine-norbert-wiene-ocr"
  },
  {
    title: "The Human Use of Human Beings: Cybernetics and Society",
    authors: "Norbert Wiener",
    year: 1950,
    type: "book",
    category: "Historical Primary Sources",
    description: "Accessible exploration of cybernetics' societal implications, warning about automation's impact on labor and human dignity.",
    url: "https://monoskop.org/images/6/60/Wiener_Norbert_The_Human_Use_of_Human_Beings_1989.pdf"
  },
  {
    title: "Computing Machinery and Intelligence",
    authors: "Alan Turing",
    year: 1950,
    type: "paper",
    category: "Historical Primary Sources",
    description: "Seminal paper introducing the Turing Test and foundational questions about machine intelligence.",
    url: "https://academic.oup.com/mind/article-abstract/LIX/236/433/986238",
    journal: "Mind"
  },
  {
    title: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence",
    authors: "John McCarthy, Marvin Minsky, Nathaniel Rochester, Claude Shannon",
    year: 1955,
    type: "paper",
    category: "Historical Primary Sources",
    description: "Historic proposal coining 'artificial intelligence' and launching AI as an academic discipline.",
    url: "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html"
  },
  {
    title: "Computer Power and Human Reason: From Judgment to Calculation",
    authors: "Joseph Weizenbaum",
    year: 1976,
    type: "book",
    category: "Historical Primary Sources",
    description: "ELIZA creator's critique arguing computers should never make important decisions requiring human wisdom and compassion.",
    url: "https://archive.org/details/computerpowerhum0000weiz_v0i3"
  },
  {
    title: "Literary Machines",
    authors: "Ted Nelson",
    year: 1981,
    type: "book",
    category: "Historical Primary Sources",
    description: "Foundational hypertext theory proposing transclusion, tumblers, and Project Xanadu's vision of networked writing.",
    url: "https://www.eastgate.com/catalog/LiteraryMachines.html"
  },
  {
    title: "The Second Self: Computers and the Human Spirit",
    authors: "Sherry Turkle",
    year: 1984,
    type: "book",
    category: "Historical Primary Sources",
    description: "Psychological study of how computers reshape human identity, thought, and relationships in the personal computing era.",
    url: "https://direct.mit.edu/books/monograph/2327/The-Second-SelfComputers-and-the-Human-Spirit"
  },
  {
    title: "A Cyborg Manifesto: Science, Technology, and Socialist-Feminism in the Late Twentieth Century",
    authors: "Donna Haraway",
    year: 1985,
    type: "article",
    category: "Historical Primary Sources",
    description: "Influential feminist critique using the cyborg as metaphor for boundary transgression and political coalitions.",
    url: "https://theanarchistlibrary.org/library/donna-haraway-a-cyborg-manifesto",
    journal: "Socialist Review"
  },
  {
    title: "The Textual Condition",
    authors: "Jerome McGann",
    year: 1991,
    type: "book",
    category: "Historical Primary Sources",
    description: "Theory of texts as networks of linguistic and bibliographical codes, foundational for digital scholarly editing.",
    url: "https://press.princeton.edu/books/paperback/9780691015187/the-textual-condition"
  },
  {
    title: "Sorting Things Out: Classification and Its Consequences",
    authors: "Geoffrey C. Bowker & Susan Leigh Star",
    year: 1999,
    type: "book",
    category: "Historical Primary Sources",
    description: "Foundational STS text exploring how classification systems shape knowledge, power, and social order.",
    url: "https://direct.mit.edu/books/monograph/4738/Sorting-Things-OutClassification-and-Its"
  },
  {
    title: "How We Became Posthuman: Virtual Bodies in Cybernetics, Literature, and Informatics",
    authors: "N. Katherine Hayles",
    year: 1999,
    type: "book",
    category: "Historical Primary Sources",
    description: "Traces how information lost its body through cybernetics, constructing posthuman subjectivity.",
    url: "https://press.uchicago.edu/ucp/books/book/chicago/H/bo3769963.html"
  },

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
    title: "Artificial Unintelligence: How Computers Misunderstand the World",
    authors: "Meredith Broussard",
    year: 2018,
    type: "book",
    category: "Critical AI Theory",
    description: "Critique of technochauvinism arguing that technology is not always the solution to social problems.",
    url: "https://mitpress.mit.edu/9780262537018/artificial-unintelligence/"
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
  {
    title: "Enshittification and Platform Decay",
    authors: "Cory Doctorow",
    year: 2023,
    type: "article",
    category: "Critical AI Theory",
    description: "Defines pattern where platforms degrade quality to maximize profit, including AI integration nobody wanted.",
    url: "https://pluralistic.net/2023/01/21/potemkin-ai/"
  },
  {
    title: "The Distributed AI Research Institute (DAIR)",
    authors: "Timnit Gebru (founder)",
    year: 2021,
    type: "tool",
    category: "Critical AI Theory",
    description: "Independent research institute prioritizing community-rooted AI research benefiting marginalized groups.",
    url: "https://www.dair-institute.org/"
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
    title: "Undoing the Grade: Why We Grade, and How to Stop",
    authors: "Jesse Stommel",
    year: 2023,
    type: "book",
    category: "Humanities Pedagogy",
    description: "Comprehensive framework for ungrading emphasizing authentic assessment over competition for grades.",
    url: "https://pressbooks.pub/thegrade/"
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
    title: "Graphesis: Visual Forms of Knowledge Production",
    authors: "Johanna Drucker",
    year: 2014,
    type: "book",
    category: "Digital Humanities",
    description: "Critical language for analyzing how visual formats organize and produce knowledge humanistically.",
    url: "https://www.hup.harvard.edu/books/9780674724938"
  },
  {
    title: "Mechanisms: New Media and the Forensic Imagination",
    authors: "Matthew G. Kirschenbaum",
    year: 2008,
    type: "book",
    category: "Digital Humanities",
    description: "Applies computer forensics to study new media textuality through forensic and formal materiality.",
    url: "https://direct.mit.edu/books/monograph/3356/MechanismsNew-Media-and-the-Forensic-Imagination"
  },
  {
    title: "Software Studies: A Lexicon",
    authors: "Matthew Fuller (editor)",
    year: 2008,
    type: "book",
    category: "Digital Humanities",
    description: "Field guide to cultural, political, social, and aesthetic impact of software across disciplines.",
    url: "https://mitpress.mit.edu/9780262062749/software-studies/"
  },
  {
    title: "Always Already New: Media, History, and the Data of Culture",
    authors: "Lisa Gitelman",
    year: 2006,
    type: "book",
    category: "Digital Humanities",
    description: "Media history exploring how recorded sound and digital networks emerged as embedded cultural forms.",
    url: "https://direct.mit.edu/books/monograph/4377/Always-Already-NewMedia-History-and-the-Data-of"
  },
  {
    title: "The Laws of Cool: Knowledge Work and the Culture of Information",
    authors: "Alan Liu",
    year: 2004,
    type: "book",
    category: "Digital Humanities",
    description: "Examines information technology's cultural impact and the emergence of 'information cool' in knowledge work.",
    url: "https://press.uchicago.edu/ucp/books/book/chicago/L/bo3628842.html"
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
  {
    title: "Reading Machines: Toward an Algorithmic Criticism",
    authors: "Stephen Ramsay",
    year: 2011,
    type: "book",
    category: "Digital Humanities",
    description: "Argues computation can enhance subjective literary interpretation through algorithmic textual analysis.",
    url: "https://www.press.uillinois.edu/books/?id=p078200"
  },
  {
    title: "Viral Texts: Mapping Networks of Reprinting in 19th-Century Newspapers and Magazines",
    authors: "Ryan Cordell & David Smith",
    year: 2024,
    type: "tool",
    category: "Digital Humanities",
    description: "Computational project discovering text reuse patterns to understand nineteenth-century information virality.",
    url: "https://viraltexts.org/"
  },
  {
    title: "Index Thomisticus: A Pioneer Project in Digital Humanities",
    authors: "Roberto Busa",
    year: 1974,
    type: "article",
    category: "Digital Humanities",
    description: "Chronicle of the first large-scale humanities computing project indexing Aquinas's complete works.",
    url: "https://www.historyofinformation.com/detail.php?id=3077"
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
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  const allCategories: ResourceCategory[] = Array.from(new Set(resources.map(r => r.category))).sort()

  const filteredAndSortedResources = useMemo(() => {
    let filtered = resources.filter(resource => {
      const matchesSearch = searchQuery === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
      const matchesType = selectedType === 'All' || resource.type === selectedType

      return matchesSearch && matchesCategory && matchesType
    })

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => b.year - a.year)
      case 'oldest':
        return filtered.sort((a, b) => a.year - b.year)
      case 'author-az':
        return filtered.sort((a, b) => {
          const authorA = a.authors.split(',')[0].trim().split(' ').pop() || a.authors
          const authorB = b.authors.split(',')[0].trim().split(' ').pop() || b.authors
          return authorA.localeCompare(authorB)
        })
      case 'category':
        return filtered.sort((a, b) => a.category.localeCompare(b.category))
      case 'type':
        return filtered.sort((a, b) => a.type.localeCompare(b.type))
      default:
        return filtered.sort((a, b) => b.year - a.year)
    }
  }, [searchQuery, selectedCategory, selectedType, sortBy])

  const resourcesByCategory = useMemo(() => {
    const grouped: Record<string, Resource[]> = {}
    filteredAndSortedResources.forEach(resource => {
      if (!grouped[resource.category]) {
        grouped[resource.category] = []
      }
      grouped[resource.category].push(resource)
    })
    return grouped
  }, [filteredAndSortedResources])

  const resourcesByType = useMemo(() => {
    const grouped: Record<string, Resource[]> = {}
    filteredAndSortedResources.forEach(resource => {
      if (!grouped[resource.type]) {
        grouped[resource.type] = []
      }
      grouped[resource.type].push(resource)
    })
    return grouped
  }, [filteredAndSortedResources])

  const isGroupedView = sortBy === 'category' || sortBy === 'type'

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'article': return <Newspaper className="h-3.5 w-3.5" />
      case 'paper': return <FileText className="h-3.5 w-3.5" />
      case 'blog': return <FileText className="h-3.5 w-3.5" />
      case 'video': return <Video className="h-3.5 w-3.5" />
      case 'book': return <BookOpen className="h-3.5 w-3.5" />
      case 'tool': return <Wrench className="h-3.5 w-3.5" />
    }
  }

  const categoryDescriptions: Record<ResourceCategory, string> = {
    'Historical Primary Sources': 'Seminal texts from 1843-1999 establishing foundations of computing, AI, cybernetics, hypertext, and digital humanities',
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

  const scrollToCategory = (category: ResourceCategory) => {
    setSelectedCategory(category)
    const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-serif font-bold">Resources</h1>
            <Badge variant="secondary" className="text-xs">
              {resources.length} Total
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="sticky top-16 h-[calc(100vh-4rem)] w-72 flex-shrink-0 border-r bg-muted/30 overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Type
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <Badge
                    variant={selectedType === 'All' ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedType('All')}
                  >
                    All
                  </Badge>
                  {(['book', 'paper', 'article', 'blog', 'video', 'tool'] as ResourceType[]).map(type => (
                    <Badge
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      className="cursor-pointer text-xs capitalize"
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Categories Navigation */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Categories
                </label>
                <nav className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedCategory === 'All'
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span>All Resources</span>
                    <Badge variant="secondary" className="text-xs">
                      {resources.length}
                    </Badge>
                  </button>
                  {allCategories.map(category => {
                    const count = resources.filter(r => r.category === category).length
                    return (
                      <button
                        key={category}
                        onClick={() => scrollToCategory(category)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-left ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <span className="flex-1 truncate">{category}</span>
                        <Badge variant="secondary" className="text-xs ml-2">
                          {count}
                        </Badge>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Results Count */}
              <div className="pt-4 border-t text-xs text-muted-foreground">
                Showing {filteredAndSortedResources.length} of {resources.length} resources
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Container className="py-8 max-w-5xl">
            {/* Sort Controls */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Sort by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={sortBy === 'newest' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSortBy('newest')}
                >
                  Newest First
                </Badge>
                <Badge
                  variant={sortBy === 'oldest' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSortBy('oldest')}
                >
                  Oldest First
                </Badge>
                <Badge
                  variant={sortBy === 'author-az' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSortBy('author-az')}
                >
                  Author A-Z
                </Badge>
                <Badge
                  variant={sortBy === 'category' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSortBy('category')}
                >
                  By Category
                </Badge>
                <Badge
                  variant={sortBy === 'type' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSortBy('type')}
                >
                  By Format
                </Badge>
              </div>
            </div>

            {filteredAndSortedResources.length > 0 ? (
              <div className="space-y-12">
                {/* Grouped by Category View */}
                {sortBy === 'category' && Object.entries(resourcesByCategory)
                  .sort(([catA], [catB]) => catA.localeCompare(catB))
                  .map(([category, categoryResources]) => (
                    <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
                      <div className="mb-6 pb-3 border-b">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-serif font-bold">{category}</h2>
                          <Badge variant="secondary">{categoryResources.length}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {categoryDescriptions[category as ResourceCategory]}
                        </p>
                      </div>
                      <div className="space-y-3">
                        {categoryResources.map((resource, index) => (
                          <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    {getTypeIcon(resource.type)}
                                    <Badge variant="outline" className="text-xs capitalize">
                                      {resource.type}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{resource.year}</span>
                                    {resource.journal && (
                                      <span className="text-xs text-muted-foreground italic truncate">
                                        · {resource.journal}
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="font-semibold text-base mb-1 leading-snug">
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:text-primary transition-colors hover:underline"
                                    >
                                      {resource.title}
                                    </a>
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {resource.authors}
                                  </p>
                                  <p className="text-sm leading-relaxed">
                                    {resource.description}
                                  </p>
                                </div>
                                <div className="flex-shrink-0">
                                  <Button asChild variant="ghost" size="sm">
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </section>
                  ))}

                {/* Grouped by Type/Format View */}
                {sortBy === 'type' && Object.entries(resourcesByType)
                  .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
                  .map(([type, typeResources]) => (
                    <section key={type}>
                      <div className="mb-6 pb-3 border-b">
                        <div className="flex items-center gap-3 mb-2">
                          {getTypeIcon(type as ResourceType)}
                          <h2 className="text-2xl font-serif font-bold capitalize">{type}s</h2>
                          <Badge variant="secondary">{typeResources.length}</Badge>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {typeResources.map((resource, index) => (
                          <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">
                                      {resource.category}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{resource.year}</span>
                                    {resource.journal && (
                                      <span className="text-xs text-muted-foreground italic truncate">
                                        · {resource.journal}
                                      </span>
                                    )}
                                  </div>
                                  <h3 className="font-semibold text-base mb-1 leading-snug">
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:text-primary transition-colors hover:underline"
                                    >
                                      {resource.title}
                                    </a>
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {resource.authors}
                                  </p>
                                  <p className="text-sm leading-relaxed">
                                    {resource.description}
                                  </p>
                                </div>
                                <div className="flex-shrink-0">
                                  <Button asChild variant="ghost" size="sm">
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </section>
                  ))}

                {/* Flat List View (for date and author sorts) */}
                {!isGroupedView && (
                  <div className="space-y-3">
                    {filteredAndSortedResources.map((resource, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                {getTypeIcon(resource.type)}
                                <Badge variant="outline" className="text-xs capitalize">
                                  {resource.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {resource.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{resource.year}</span>
                                {resource.journal && (
                                  <span className="text-xs text-muted-foreground italic truncate">
                                    · {resource.journal}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-semibold text-base mb-1 leading-snug">
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary transition-colors hover:underline"
                                >
                                  {resource.title}
                                </a>
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {resource.authors}
                              </p>
                              <p className="text-sm leading-relaxed">
                                {resource.description}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <Button asChild variant="ghost" size="sm">
                                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
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
            <Card className="mt-12 border-dashed border-2 bg-muted/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Know a resource we should include?</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
                  This is a living collection. We welcome suggestions for articles, tools, papers, and
                  resources related to AI in humanities education.
                </p>
                <Button asChild>
                  <a href="mailto:bbreen@ucsc.edu?subject=THINK Resource Suggestion">
                    Suggest a Resource
                  </a>
                </Button>
              </CardContent>
            </Card>
          </Container>
        </main>
      </div>
    </div>
  )
}
