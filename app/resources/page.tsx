'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { pageThemes } from '@/lib/page-themes'
import { AnimatedSection } from '@/components/ui/animated-section'
import { ExternalLink, Search, BookOpen, FileText, Video, Newspaper, Wrench, Menu, X, ArrowUpDown, LayoutList, Clock, BarChart3 } from 'lucide-react'

const theme = pageThemes.resources

type SortOption = 'newest' | 'oldest' | 'author-az' | 'category' | 'type'
type ViewMode = 'list' | 'timeline' | 'scatter' | 'custom'
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
  | 'AI and Humanities Weirdness'

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
  // Classic texts on machines, minds, and computation (re-categorized into thematic buckets)
  {
    title: "Man a Machine",
    authors: "Julien Offray de La Mettrie",
    year: 1747,
    type: "book",
    category: "Critical AI Theory",
    description: "Radical materialist treatise arguing humans are complex machines, anticipating debates about consciousness, determinism, and artificial intelligence by centuries.",
    url: "https://www.earlymoderntexts.com/assets/pdfs/lamettrie1748.pdf"
  },
  {
    title: "Notes on the Analytical Engine",
    authors: "Ada Lovelace",
    year: 1843,
    type: "paper",
    category: "Digital Humanities",
    description: "Translation and notes on Babbage's Analytical Engine, including Note G—the first computer algorithm.",
    url: "https://www.computerhistory.org/babbage/adalovelace/",
    journal: "Taylor's Scientific Memoirs"
  },
  {
    title: "Darwin Among the Machines",
    authors: "Samuel Butler",
    year: 1863,
    type: "article",
    category: "AI and Humanities Weirdness",
    description: "Satirical essay speculating that machines might evolve consciousness and supplant humanity—an early science fiction exploration of machine intelligence.",
    url: "https://www.gutenberg.org/files/1906/1906-h/1906-h.htm",
    journal: "The Press (New Zealand)"
  },
  {
    title: "Are We Automata?",
    authors: "William James",
    year: 1879,
    type: "article",
    category: "Critical AI Theory",
    description: "Philosophical examination of consciousness, free will, and whether humans are mere mechanical automata. Directly relevant to debates about AI consciousness.",
    url: "https://archive.org/details/jstor-2246397",
    journal: "Mind"
  },
  {
    title: "The Machine Stops",
    authors: "E.M. Forster",
    year: 1909,
    type: "article",
    category: "AI and Humanities Weirdness",
    description: "Dystopian short story about humanity's total dependence on an all-encompassing Machine. Prescient critique of technological dependence and digital isolation.",
    url: "https://www.cs.ucdavis.edu/~koehl/Teaching/ECS188/PDF_files/Machine_stops.pdf"
  },
  {
    title: "The Work of Art in the Age of Mechanical Reproduction",
    authors: "Walter Benjamin",
    year: 1935,
    type: "article",
    category: "Critical AI Theory",
    description: "Examines how reproducibility changes art's aura and authenticity. Foundational for understanding AI-generated content and authorship questions.",
    url: "https://web.mit.edu/allanmc/www/benjamin.pdf"
  },
  {
    title: "The Analytical Language of John Wilkins",
    authors: "Jorge Luis Borges",
    year: 1942,
    type: "article",
    category: "AI and Humanities Weirdness",
    description: "Examines artificial classification systems and their arbitrariness, featuring the famous Celestial Emporium taxonomy. Relevant to AI categorization and knowledge graphs.",
    url: "https://www.alamut.com/subj/artiface/language/johnWilkins.html"
  },
  {
    title: "As We May Think",
    authors: "Vannevar Bush",
    year: 1945,
    type: "article",
    category: "Digital Humanities",
    description: "Visionary essay proposing the memex—a proto-hypertext device presaging information retrieval and digital humanities.",
    url: "https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/",
    journal: "The Atlantic"
  },
  {
    title: "A Mathematical Theory of Communication",
    authors: "Claude Shannon",
    year: 1948,
    type: "paper",
    category: "Digital Humanities",
    description: "Foundational paper establishing information theory and introducing the concept of 'bits' as units of information.",
    url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf",
    journal: "Bell System Technical Journal"
  },
  {
    title: "Cybernetics: Or Control and Communication in the Animal and the Machine",
    authors: "Norbert Wiener",
    year: 1948,
    type: "book",
    category: "Critical AI Theory",
    description: "Technical foundation for cybernetics exploring feedback loops and control systems across biological and mechanical domains.",
    url: "https://archive.org/details/cybernetics-or-communication-and-control-in-the-animal-and-the-machine-norbert-wiene-ocr"
  },
  {
    title: "The Human Use of Human Beings: Cybernetics and Society",
    authors: "Norbert Wiener",
    year: 1950,
    type: "book",
    category: "Critical AI Theory",
    description: "Accessible exploration of cybernetics' societal implications, warning about automation's impact on labor and human dignity.",
    url: "https://monoskop.org/images/6/60/Wiener_Norbert_The_Human_Use_of_Human_Beings_1989.pdf"
  },
  {
    title: "Computing Machinery and Intelligence",
    authors: "Alan Turing",
    year: 1950,
    type: "paper",
    category: "Critical AI Theory",
    description: "Seminal paper introducing the Turing Test and foundational questions about machine intelligence.",
    url: "https://academic.oup.com/mind/article-abstract/LIX/236/433/986238",
    journal: "Mind"
  },
  {
    title: "The Mechanical Bride: Folklore of Industrial Man",
    authors: "Marshall McLuhan",
    year: 1951,
    type: "book",
    category: "Critical AI Theory",
    description: "Pioneering media criticism examining how advertising and mass media mechanize human consciousness. Early exploration of technology's effect on thought patterns.",
    url: "https://archive.org/details/mechanicalbridef00mclu"
  },
  {
    title: "The Question Concerning Technology",
    authors: "Martin Heidegger",
    year: 1954,
    type: "article",
    category: "Critical AI Theory",
    description: "Philosophical inquiry into technology's essence as 'enframing'—a way of revealing that transforms everything into standing-reserve. Foundational for philosophy of technology.",
    url: "https://monoskop.org/images/4/44/Heidegger_Martin_The_Question_Concerning_Technology_and_Other_Essays.pdf"
  },
  {
    title: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence",
    authors: "John McCarthy, Marvin Minsky, Nathaniel Rochester, Claude Shannon",
    year: 1955,
    type: "paper",
    category: "AI Literacy",
    description: "Historic proposal coining 'artificial intelligence' and launching AI as an academic discipline.",
    url: "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html"
  },
  {
    title: "Augmenting Human Intellect: A Conceptual Framework",
    authors: "Douglas Engelbart",
    year: 1962,
    type: "paper",
    category: "Humanities Pedagogy",
    description: "Visionary framework proposing computers as tools to augment rather than replace human intelligence. Foundational for human-computer interaction and collaborative systems.",
    url: "https://www.dougengelbart.org/content/view/138"
  },
  {
    title: "Computer Power and Human Reason: From Judgment to Calculation",
    authors: "Joseph Weizenbaum",
    year: 1976,
    type: "book",
    category: "Critical AI Theory",
    description: "ELIZA creator's critique arguing computers should never make important decisions requiring human wisdom and compassion.",
    url: "https://archive.org/details/computerpowerhum0000weiz_v0i3"
  },
  {
    title: "Literary Machines",
    authors: "Ted Nelson",
    year: 1981,
    type: "book",
    category: "Digital Humanities",
    description: "Foundational hypertext theory proposing transclusion, tumblers, and Project Xanadu's vision of networked writing.",
    url: "https://www.eastgate.com/catalog/LiteraryMachines.html"
  },
  {
    title: "The Second Self: Computers and the Human Spirit",
    authors: "Sherry Turkle",
    year: 1984,
    type: "book",
    category: "Critical AI Theory",
    description: "Psychological study of how computers reshape human identity, thought, and relationships in the personal computing era.",
    url: "https://direct.mit.edu/books/monograph/2327/The-Second-SelfComputers-and-the-Human-Spirit"
  },
  {
    title: "A Cyborg Manifesto: Science, Technology, and Socialist-Feminism in the Late Twentieth Century",
    authors: "Donna Haraway",
    year: 1985,
    type: "article",
    category: "Critical AI Theory",
    description: "Influential feminist critique using the cyborg as metaphor for boundary transgression and political coalitions.",
    url: "https://theanarchistlibrary.org/library/donna-haraway-a-cyborg-manifesto",
    journal: "Socialist Review"
  },
  {
    title: "The Textual Condition",
    authors: "Jerome McGann",
    year: 1991,
    type: "book",
    category: "Digital Humanities",
    description: "Theory of texts as networks of linguistic and bibliographical codes, foundational for digital scholarly editing.",
    url: "https://press.princeton.edu/books/paperback/9780691015187/the-textual-condition"
  },
  {
    title: "Sorting Things Out: Classification and Its Consequences",
    authors: "Geoffrey C. Bowker & Susan Leigh Star",
    year: 1999,
    type: "book",
    category: "Data Ethics",
    description: "Foundational STS text exploring how classification systems shape knowledge, power, and social order.",
    url: "https://direct.mit.edu/books/monograph/4738/Sorting-Things-OutClassification-and-Its"
  },
  {
    title: "How We Became Posthuman: Virtual Bodies in Cybernetics, Literature, and Informatics",
    authors: "N. Katherine Hayles",
    year: 1999,
    type: "book",
    category: "Critical AI Theory",
    description: "Traces how information lost its body through cybernetics, constructing posthuman subjectivity.",
    url: "https://press.uchicago.edu/ucp/books/book/chicago/H/bo3769963.html"
  },

  // Additional classic and pre-2020 texts
  {
    title: "Gödel, Escher, Bach: An Eternal Golden Braid",
    authors: "Douglas Hofstadter",
    year: 1979,
    type: "book",
    category: "Critical AI Theory",
    description: "Pulitzer Prize-winning exploration of consciousness, self-reference, and meaning through the lens of mathematics, art, and music. Essential reading on minds and machines.",
    url: "https://archive.org/details/glodelescherbach00hofs"
  },
  {
    title: "I Am a Strange Loop",
    authors: "Douglas Hofstadter",
    year: 2007,
    type: "book",
    category: "Critical AI Theory",
    description: "Hofstadter's meditation on consciousness as self-referential 'strange loops'—arguing the self is a hallucination hallucinated by a hallucination. Deeply relevant to questions of AI sentience.",
    url: "https://www.basicbooks.com/titles/douglas-r-hofstadter/i-am-a-strange-loop/9780465030798/"
  },
  {
    title: "Neuromancer",
    authors: "William Gibson",
    year: 1984,
    type: "book",
    category: "AI and Humanities Weirdness",
    description: "Genre-defining cyberpunk novel that coined 'cyberspace' and shaped cultural imagination of AI, virtual reality, and human-machine interfaces.",
    url: "https://archive.org/details/neuaborr00gibs"
  },
  {
    title: "Society of Mind",
    authors: "Marvin Minsky",
    year: 1986,
    type: "book",
    category: "Critical AI Theory",
    description: "AI pioneer's theory that intelligence emerges from interactions of many simple agents, each mindless alone. Influential model for understanding both human and artificial cognition.",
    url: "https://archive.org/details/societyofmind00mins"
  },
  {
    title: "Situated Cognition and the Culture of Learning",
    authors: "John Seely Brown, Allan Collins, Paul Duguid",
    year: 1989,
    type: "paper",
    category: "Humanities Pedagogy",
    description: "Influential argument that knowledge is inseparable from the contexts in which it develops. Foundational for understanding why AI lacks situated understanding.",
    url: "https://www.jstor.org/stable/1176008",
    journal: "Educational Researcher"
  },
  {
    title: "The Computer as Theatre",
    authors: "Brenda Laurel",
    year: 1991,
    type: "book",
    category: "Digital Humanities",
    description: "Pioneering work applying dramatic theory to human-computer interaction, arguing for computers as stages for collaborative performance rather than tools.",
    url: "https://archive.org/details/computerastheatr00laur"
  },
  {
    title: "The Embodied Mind: Cognitive Science and Human Experience",
    authors: "Francisco Varela, Evan Thompson, Eleanor Rosch",
    year: 1991,
    type: "book",
    category: "Critical AI Theory",
    description: "Groundbreaking synthesis of cognitive science with Buddhist philosophy, arguing that cognition depends on embodied experience—a challenge to disembodied AI.",
    url: "https://direct.mit.edu/books/monograph/4062/The-Embodied-MindCognitive-Science-and-Human"
  },
  {
    title: "Hypertext: The Convergence of Contemporary Critical Theory and Technology",
    authors: "George P. Landow",
    year: 1992,
    type: "book",
    category: "Digital Humanities",
    description: "Influential exploration of how hypertext embodies poststructuralist ideas about textuality, authorship, and reading. Key text for digital literary studies.",
    url: "https://press.jhu.edu/books/title/8473/hypertext-30"
  },
  {
    title: "The Logic of Practice",
    authors: "Pierre Bourdieu",
    year: 1990,
    type: "book",
    category: "Critical AI Theory",
    description: "Theory of habitus and practical knowledge that cannot be reduced to rules—foundational for understanding what AI cannot easily capture about human expertise.",
    url: "https://www.sup.org/books/title/?id=2478"
  },
  {
    title: "Mind Children: The Future of Robot and Human Intelligence",
    authors: "Hans Moravec",
    year: 1988,
    type: "book",
    category: "AI and Humanities Weirdness",
    description: "Roboticist's provocative vision of mind uploading and the evolution of machine intelligence surpassing humanity. Influential on transhumanist thought.",
    url: "https://archive.org/details/mindchildrenfutu00mora"
  },
  {
    title: "Technologies of the Self",
    authors: "Michel Foucault",
    year: 1988,
    type: "article",
    category: "Critical AI Theory",
    description: "Foucault's late lectures on practices through which individuals transform themselves—relevant to understanding AI as a technology that reshapes subjectivity.",
    url: "https://monoskop.org/images/0/03/Technologies_of_the_Self_A_Seminar_with_Michel_Foucault.pdf"
  },

  // Unusual and international texts on machines, minds, and automation
  {
    title: "The Sandman (Der Sandmann)",
    authors: "E.T.A. Hoffmann",
    year: 1816,
    type: "article",
    category: "AI and Humanities Weirdness",
    description: "Gothic tale of a man who falls in love with an automaton, source for Freud's essay on the uncanny. Foundational text on artificial beings, deception, and the horror of mechanical life.",
    url: "https://www.gutenberg.org/ebooks/32046"
  },
  {
    title: "Tomorrow's Eve (L'Ève future)",
    authors: "Auguste Villiers de l'Isle-Adam",
    year: 1886,
    type: "book",
    category: "AI and Humanities Weirdness",
    description: "French symbolist novel in which Edison creates a perfect android woman. Coined the word 'android' and explores technology, gender, and the pursuit of artificial perfection.",
    url: "https://archive.org/details/tomorrowseve00vill"
  },
  {
    title: "The Supermale (Le Surmâle)",
    authors: "Alfred Jarry",
    year: 1902,
    type: "book",
    category: "AI and Humanities Weirdness",
    description: "Absurdist proto-surrealist novel about a man who becomes a machine to outperform machines. Pataphysical meditation on human-machine competition and the mechanization of desire.",
    url: "https://archive.org/details/supermale0000jarr"
  },
  {
    title: "R.U.R. (Rossum's Universal Robots)",
    authors: "Karel Čapek",
    year: 1920,
    type: "book",
    category: "AI and Humanities Weirdness",
    description: "Czech play that invented the word 'robot' (from robota, forced labor). Prophetic drama about artificial workers, exploitation, and machine rebellion.",
    url: "https://archive.org/details/rurrossumsunivers00apek"
  },
  {
    title: "Man and Technics: A Contribution to a Philosophy of Life",
    authors: "Oswald Spengler",
    year: 1931,
    type: "book",
    category: "Critical AI Theory",
    description: "Pessimistic German philosophy viewing technology as humanity's Faustian bargain—tools that will ultimately escape human control. Prescient warnings about technological determinism.",
    url: "https://archive.org/details/in.ernet.dli.2015.190659"
  },
  {
    title: "On the Mode of Existence of Technical Objects (Du mode d'existence des objets techniques)",
    authors: "Gilbert Simondon",
    year: 1958,
    type: "book",
    category: "Critical AI Theory",
    description: "Radical French philosophy arguing machines have their own mode of existence and evolution. Influential on Deleuze, Stiegler, and contemporary philosophy of technology.",
    url: "https://www.upress.umn.edu/book-division/books/on-the-mode-of-existence-of-technical-objects"
  },
  {
    title: "Summa Technologiae",
    authors: "Stanisław Lem",
    year: 1964,
    type: "book",
    category: "Critical AI Theory",
    description: "Polish science fiction master's philosophical treatise on AI, virtual reality, biological engineering, and the future of intelligence. Remarkably prescient, only translated to English in 2013.",
    url: "https://www.upress.umn.edu/book-division/books/summa-technologiae"
  },
  {
    title: "Cybernetics and Ghosts (Cibernetica e fantasmi)",
    authors: "Italo Calvino",
    year: 1967,
    type: "article",
    category: "AI and Humanities Weirdness",
    description: "Italian novelist's lecture on literature as combinatorial machine—exploring whether stories can be generated algorithmically and what remains irreducibly human in writing.",
    url: "https://monoskop.org/images/2/23/Calvino_Italo_1986_Cybernetics_and_Ghosts.pdf"
  },
  {
    title: "Towards a Philosophy of Photography",
    authors: "Vilém Flusser",
    year: 1983,
    type: "book",
    category: "Critical AI Theory",
    description: "Czech-Brazilian philosopher's theory of 'apparatus' and programmed behavior. Argues cameras (and by extension AI) shape human thought in ways we cannot perceive from inside the program.",
    url: "https://www.reaktionbooks.co.uk/work/towards-a-philosophy-of-photography"
  },
  {
    title: "The Policeman's Beard is Half Constructed",
    authors: "RACTER (William Chamberlain)",
    year: 1984,
    type: "book",
    category: "AI and Humanities Weirdness",
    description: "First book 'written' by an AI—prose and poetry generated by the RACTER program. A strange artifact from early computational creativity, raising questions about authorship and machine expression.",
    url: "https://archive.org/details/policemansbeardi00ract"
  },
  {
    title: "The Garden of Forking Paths (El jardín de senderos que se bifurcan)",
    authors: "Jorge Luis Borges",
    year: 1941,
    type: "article",
    category: "Historical Simulation",
    description: "Short story about a novel where all possible outcomes occur simultaneously—a labyrinth of time rather than space. Direct precursor to hypertext fiction, branching narratives, and interactive simulation.",
    url: "https://archive.org/details/laaborinths00LBorworborg"
  },
  {
    title: "Mindstorms: Children, Computers, and Powerful Ideas",
    authors: "Seymour Papert",
    year: 1980,
    type: "book",
    category: "Humanities Pedagogy",
    description: "MIT educator's vision of LOGO programming as a tool for children to learn thinking itself. Foundational text for constructionist learning, computational thinking, and educational technology.",
    url: "https://archive.org/details/mindstlogoandlea00seym"
  },
  {
    title: "Virtual History: Alternatives and Counterfactuals",
    authors: "Niall Ferguson (ed.)",
    year: 1997,
    type: "book",
    category: "Historical Simulation",
    description: "Historians defend counterfactual reasoning as serious methodology. Essays exploring 'what if' scenarios—directly relevant to historical simulation pedagogy and teaching contingency.",
    url: "https://www.basicbooks.com/titles/niall-ferguson/virtual-history/9780465023233/"
  },
  {
    title: "Hamlet on the Holodeck: The Future of Narrative in Cyberspace",
    authors: "Janet Murray",
    year: 1997,
    type: "book",
    category: "Historical Simulation",
    description: "Theory of interactive narrative and immersive digital storytelling. Essential text for understanding narrative simulation, agency, and procedural authorship.",
    url: "https://mitpress.mit.edu/9780262533485/hamlet-on-the-holodeck/"
  },
  {
    title: "Writing Space: Computers, Hypertext, and the Remediation of Print",
    authors: "Jay David Bolter",
    year: 1991,
    type: "book",
    category: "Writing & Composition",
    description: "How digital writing transforms composition, authorship, and the nature of text itself. Foundational for understanding word processing, hypertext, and now AI writing tools.",
    url: "https://www.routledge.com/Writing-Space-Computers-Hypertext-and-the-Remediation-of-Print/Bolter/p/book/9780805829198"
  },
  {
    title: "English Composition and Rhetoric: A Manual",
    authors: "Alexander Bain",
    year: 1866,
    type: "book",
    category: "Writing & Composition",
    description: "Systematized paragraph structure and modes of discourse still taught today. Demonstrates how 'writing rules' are technologies that become internalized—relevant to AI writing templates and formulas.",
    url: "https://archive.org/details/englishcomposit21teleigoog"
  },
  {
    title: "Cent Mille Milliards de Poèmes (Hundred Thousand Billion Poems)",
    authors: "Raymond Queneau",
    year: 1961,
    type: "book",
    category: "Writing & Composition",
    description: "Ten sonnets with interchangeable lines creating 100 trillion possible poems. Oulipo's combinatorial literature is proto-generative AI—algorithmic creativity decades before LLMs.",
    url: "https://www.bevrowe.info/Queneau/QueneauRandom_v4.html"
  },
  {
    title: "The Philosophy of Composition",
    authors: "Edgar Allan Poe",
    year: 1846,
    type: "article",
    category: "Writing & Composition",
    description: "Poe claims he wrote 'The Raven' algorithmically, through logical steps rather than inspiration. Whether true or performance, it's an early vision of systematic, mechanical creativity.",
    url: "https://www.gutenberg.org/files/55749/55749-h/55749-h.htm"
  },
  {
    title: "Understanding Media: The Extensions of Man",
    authors: "Marshall McLuhan",
    year: 1964,
    type: "book",
    category: "Writing & Composition",
    description: "'The medium is the message.' Essential for understanding how AI as a writing medium shapes what we write and think—not just a tool but an environment that restructures cognition.",
    url: "https://archive.org/details/understandingmed0000mclu"
  },
  {
    title: "Napoléon et la conquête du monde, 1812-1832",
    authors: "Louis Geoffroy",
    year: 1836,
    type: "book",
    category: "Historical Simulation",
    description: "The first alternate history novel—Napoleon conquers the world. Origin of counterfactual historical fiction and imaginative exploration of historical contingency.",
    url: "https://archive.org/details/naaborpolonabil00teleefgoog"
  },
  {
    title: "The Man in the High Castle",
    authors: "Philip K. Dick",
    year: 1962,
    type: "book",
    category: "Historical Simulation",
    description: "Axis powers win WWII, but a novel within the novel imagines Allied victory. Nested alternate histories and questions about authenticity anticipate simulation thinking and AI-generated realities.",
    url: "https://archive.org/details/maninhighcastle00dick"
  },
  {
    title: "A Connecticut Yankee in King Arthur's Court",
    authors: "Mark Twain",
    year: 1889,
    type: "book",
    category: "Historical Simulation",
    description: "Time travel as historical simulation—a 19th-century engineer 'plays' the medieval period, testing what modern knowledge could accomplish. Satirical exploration of technological intervention in history.",
    url: "https://www.gutenberg.org/ebooks/86"
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
    url: "https://journalofdigitalhumanities.org/2-3/dh-that-matters-by-miriam-posner/",
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
  },

  // AI and Humanities Weirdness
  {
    title: "Adversarial Poetry as a Universal Single-Turn Jailbreak Mechanism in Large Language Models",
    authors: "Rylan Schaeffer, Aviral Kumar, Sanmi Koyejo",
    year: 2024,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Discovers that specially crafted poetry can reliably jailbreak LLMs in a single turn, revealing how aesthetic and literary forms exploit vulnerabilities in AI safety mechanisms.",
    url: "https://arxiv.org/pdf/2511.15304",
    journal: "arXiv"
  },
  {
    title: "Do Androids Dream of Electric Sheep? LLMs and the Interpretation of Metaphor",
    authors: "Rui Mao, Kai He, Yida Bao, Zhemin Xun",
    year: 2024,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Examines how language models struggle with metaphorical language in ways that reveal fundamental misunderstandings of literary interpretation and embodied meaning.",
    url: "https://arxiv.org/abs/2410.09084",
    journal: "arXiv"
  },
  {
    title: "The Generative AI Paradox: What It Can Create, It May Not Understand",
    authors: "Peter West, Ximing Lu, Nouha Dziri, et al.",
    year: 2024,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Demonstrates that LLMs can produce sophisticated creative writing while failing basic comprehension tests about the same content, revealing strange asymmetries in their capabilities.",
    url: "https://arxiv.org/abs/2311.00059",
    journal: "arXiv"
  },
  {
    title: "Hallucination is Inevitable: An Innate Limitation of Large Language Models",
    authors: "Ziwei Xu, Sanjay Jain, Mohan Kankanhalli",
    year: 2024,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Proves mathematically that hallucinations are not bugs but inevitable features of LLMs, reframing them as generators of plausible fictions rather than truth machines.",
    url: "https://arxiv.org/abs/2401.11817",
    journal: "arXiv"
  },
  {
    title: "AI Achieves Silver-Medal Performance in International Mathematical Olympiad",
    authors: "AlphaProof & AlphaGeometry teams",
    year: 2024,
    type: "article",
    category: "AI and Humanities Weirdness",
    description: "DeepMind's AI systems solve olympiad-level math problems through formal reasoning, yet struggle with basic commonsense tasks children master easily—revealing the alien nature of machine intelligence.",
    url: "https://deepmind.google/discover/blog/ai-solves-imo-problems-at-silver-medal-level/",
    journal: "DeepMind Blog"
  },
  {
    title: "GPT-4 Passes the Turing Test",
    authors: "Cameron Jones, Benjamin Bergen",
    year: 2024,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Documents GPT-4 fooling human judges in Turing test scenarios, but through unexpected strategies—not by seeming intelligent, but by exploiting human social expectations and conversational norms.",
    url: "https://arxiv.org/abs/2310.20216",
    journal: "arXiv"
  },
  {
    title: "Large Language Models as Simulated Economic Agents",
    authors: "John J. Horton",
    year: 2023,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Uses LLMs to simulate human economic behavior with startling accuracy, raising questions about whether AI can model (or understand) human social and economic reasoning.",
    url: "https://arxiv.org/abs/2301.07543",
    journal: "arXiv"
  },
  {
    title: "Emergent World Representations: Exploring a Sequence Model Trained on a Synthetic Task",
    authors: "Kenneth Li, Aspen K. Hopkins, David Bau, et al.",
    year: 2023,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Discovers that a language model trained only to predict chess moves spontaneously develops an internal spatial representation of the board—suggesting LLMs may build implicit 'world models' we don't understand.",
    url: "https://arxiv.org/abs/2210.13382",
    journal: "arXiv"
  },
  {
    title: "The Curious Case of Neural Text Degeneration",
    authors: "Ari Holtzman, Jan Buys, Li Du, Maxwell Forbes, Yejin Choi",
    year: 2020,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Analyzes why neural language models devolve into repetitive, incoherent text—a phenomenon with implications for understanding creativity, novelty, and the aesthetics of machine-generated writing.",
    url: "https://arxiv.org/abs/1904.09751",
    journal: "ICLR 2020"
  },
  {
    title: "Can Language Models Explain Their Own Classification Behavior?",
    authors: "Vijit Malik, Sunipa Dev, Akihiro Nishi, Nanyun Peng, Kai-Wei Chang",
    year: 2024,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Finds that when LLMs explain their reasoning, the explanations are often post-hoc confabulations unrelated to actual decision-making processes—revealing fundamental opacity in AI 'understanding.'",
    url: "https://arxiv.org/abs/2405.07626",
    journal: "arXiv"
  },
  {
    title: "Evaluating LLMs on Document-Based Question-Answering with Detailed Rubrics and Insights from Human Assessors",
    authors: "Tam Nguyen, Hai Nguyen, et al.",
    year: 2024,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Reveals that LLMs generate answers that sound authoritative but contain subtle factual errors human experts recognize immediately—the 'uncanny valley' of historical and literary analysis.",
    url: "https://arxiv.org/abs/2412.01728",
    journal: "arXiv"
  },
  {
    title: "Language Models Show Human-Like Content Effects on Reasoning Tasks",
    authors: "Ishita Dasgupta, Andrew K. Lampinen, Stephanie C.Y. Chan, et al.",
    year: 2023,
    type: "paper",
    category: "AI and Humanities Weirdness",
    description: "Discovers LLMs exhibit classic human cognitive biases and fallacies, suggesting they may model (or mimic) human irrationality in unexpected ways.",
    url: "https://arxiv.org/abs/2207.07051",
    journal: "arXiv"
  },
  {
    title: "AI Art Is Challenging the Boundaries of Curation",
    authors: "Ahmed Elgammal",
    year: 2024,
    type: "article",
    category: "AI and Humanities Weirdness",
    description: "Art expert examines how AI-generated art has fooled museum curators and collectors, forcing reconsideration of aesthetic judgment, authorship, and what makes art 'authentic.'",
    url: "https://www.nature.com/articles/d41586-024-00211-5",
    journal: "Nature"
  },
  {
    title: "Glitch Poetics: The Posthumanities of Error",
    authors: "Various Authors",
    year: 2023,
    type: "article",
    category: "AI and Humanities Weirdness",
    description: "Explores how AI errors, hallucinations, and failures create new aesthetic categories and forms of 'accidental' poetry and literature.",
    url: "https://electronicbookreview.com/essay/glitch-poetics/",
    journal: "Electronic Book Review"
  },
  {
    title: "ChatGPT Creates Fictional Citations to Real-Sounding Academic Papers",
    authors: "Waleed Ammar, Various Researchers",
    year: 2023,
    type: "article",
    category: "AI and Humanities Weirdness",
    description: "Documents how LLMs generate plausible-sounding but completely fabricated academic citations, author names, and paper titles—'hallucinated scholarship' that reveals creativity at the cost of truth.",
    url: "https://www.nature.com/articles/d41586-023-00641-9",
    journal: "Nature"
  }
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All'>('All')
  const [selectedType, setSelectedType] = useState<ResourceType | 'All'>('All')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)

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
    'Critical AI Theory': 'Foundational texts from 1747 to today examining machines, minds, consciousness, and AI through philosophical, critical, and social lenses',
    'Humanities Pedagogy': 'Teaching approaches integrating AI in humanities courses with critical, humanistic frameworks',
    'Writing & Composition': 'Rhetoric and composition scholarship on AI writing tools in writing instruction',
    'Academic Integrity': 'Research on plagiarism, assessment redesign, and maintaining integrity in the AI era',
    'Digital Humanities': 'Computational methods, hypertext theory, information science, and visualization in humanities research and teaching',
    'Historical Simulation': 'AI tools and pedagogies for interactive historical learning and simulation',
    'AI Literacy': 'Teaching students and educators to use, critique, and understand AI systems',
    'Policy & Guidance': 'Institutional frameworks and policy recommendations for AI in education',
    'Tools & Platforms': 'Practical AI tools designed for educators and classroom use',
    'Data Ethics': 'Critical perspectives on classification, algorithmic bias, fairness, and ethical data practices',
    'AI and Humanities Weirdness': 'Fiction, speculation, and fascinating research at the strange edges where AI meets literature, art, history, and creative expression'
  }

  const scrollToCategory = (category: ResourceCategory) => {
    setSelectedCategory(category)
    setMobileSidebarOpen(false)
    const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Color map for categories
  const categoryColors: Record<ResourceCategory, string> = {
    'Critical AI Theory': 'bg-purple-500',
    'Humanities Pedagogy': 'bg-green-500',
    'Writing & Composition': 'bg-blue-500',
    'Academic Integrity': 'bg-red-500',
    'Digital Humanities': 'bg-cyan-500',
    'Historical Simulation': 'bg-orange-500',
    'AI Literacy': 'bg-indigo-500',
    'Policy & Guidance': 'bg-slate-500',
    'Tools & Platforms': 'bg-emerald-500',
    'Data Ethics': 'bg-rose-500',
    'AI and Humanities Weirdness': 'bg-pink-500'
  }

  // Timeline View Component
  const TimelineView = () => {
    // Group resources by decade
    const resourcesByDecade: Record<string, Resource[]> = {}
    filteredAndSortedResources.forEach(r => {
      const decade = Math.floor(r.year / 10) * 10
      const decadeLabel = `${decade}s`
      if (!resourcesByDecade[decadeLabel]) {
        resourcesByDecade[decadeLabel] = []
      }
      resourcesByDecade[decadeLabel].push(r)
    })

    const decades = Object.keys(resourcesByDecade).sort()
    const minYear = Math.min(...filteredAndSortedResources.map(r => r.year))
    const maxYear = Math.max(...filteredAndSortedResources.map(r => r.year))

    return (
      <div className="relative">
        {/* Timeline header with year range */}
        <div className="sticky top-0 bg-background z-10 pb-4 mb-4 border-b">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-mono">{minYear}</span>
            <span className="text-xs">Timeline of {filteredAndSortedResources.length} resources</span>
            <span className="font-mono">{maxYear}</span>
          </div>
          {/* Category legend */}
          <div className="flex flex-wrap gap-2 mt-3">
            {allCategories.filter(cat =>
              filteredAndSortedResources.some(r => r.category === cat)
            ).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? 'All' : cat)}
                className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'ring-2 ring-primary ring-offset-1'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${categoryColors[cat]}`} />
                <span className="hidden sm:inline">{cat.split(' ').slice(0, 2).join(' ')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline content */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-border" />

          {decades.map((decade, decadeIndex) => (
            <div key={decade} className="relative mb-8">
              {/* Decade marker */}
              <div className="sticky top-[120px] z-[5] flex items-center mb-4">
                <div className="w-8 sm:w-16 flex justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                </div>
                <span className="ml-2 font-mono text-lg font-bold text-primary">{decade}</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  {resourcesByDecade[decade].length}
                </Badge>
              </div>

              {/* Resources in this decade */}
              <div className="space-y-2 ml-8 sm:ml-16 pl-4 border-l-2 border-transparent">
                {resourcesByDecade[decade]
                  .sort((a, b) => a.year - b.year)
                  .map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-3 rounded-lg hover:bg-muted/50 transition-all border border-transparent hover:border-border"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${categoryColors[resource.category]}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="font-mono text-xs text-muted-foreground">{resource.year}</span>
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                              {resource.title}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{resource.authors}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] flex-shrink-0 capitalize">
                          {resource.type}
                        </Badge>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Chart/Scatterplot View Component
  const ChartView = () => {
    const minYear = Math.min(...filteredAndSortedResources.map(r => r.year))
    const maxYear = Math.max(...filteredAndSortedResources.map(r => r.year))
    const yearRange = maxYear - minYear || 1

    // Get unique categories in the current filtered set
    const activeCategories = [...new Set(filteredAndSortedResources.map(r => r.category))]

    // Calculate position for each resource
    const getXPosition = (year: number) => ((year - minYear) / yearRange) * 100
    const getYPosition = (category: ResourceCategory) => {
      const index = activeCategories.indexOf(category)
      return ((index + 0.5) / activeCategories.length) * 100
    }

    // Generate year markers
    const yearMarkers: number[] = []
    const step = yearRange > 100 ? 50 : yearRange > 50 ? 25 : 10
    for (let year = Math.ceil(minYear / step) * step; year <= maxYear; year += step) {
      yearMarkers.push(year)
    }

    return (
      <div className="relative">
        {/* Chart header */}
        <div className="sticky top-0 bg-background z-10 pb-4 mb-4 border-b">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span>Resources by Year & Category</span>
            <span className="text-xs">{filteredAndSortedResources.length} resources</span>
          </div>
          {/* Category legend - clickable */}
          <div className="flex flex-wrap gap-1.5">
            {activeCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? 'All' : cat)}
                className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded transition-all ${
                  selectedCategory === cat
                    ? 'bg-muted ring-1 ring-primary'
                    : 'hover:bg-muted/50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${categoryColors[cat]}`} />
                <span className="hidden md:inline truncate max-w-[120px]">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chart area */}
        <div className="relative bg-muted/20 rounded-lg border overflow-hidden" style={{ minHeight: '400px' }}>
          {/* Y-axis labels (categories) */}
          <div className="absolute left-0 top-0 bottom-8 w-32 sm:w-48 bg-gradient-to-r from-background via-background to-transparent z-10 flex flex-col justify-around py-4 pr-2">
            {activeCategories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? 'All' : cat)}
                className={`text-[10px] sm:text-xs text-right truncate px-2 py-1 rounded transition-colors ${
                  selectedCategory === cat ? 'bg-muted font-medium' : 'hover:bg-muted/50 text-muted-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* X-axis labels (years) */}
          <div className="absolute bottom-0 left-32 sm:left-48 right-0 h-8 bg-gradient-to-t from-background to-transparent flex items-end justify-between px-4 z-10">
            {yearMarkers.map(year => (
              <span key={year} className="text-[10px] font-mono text-muted-foreground">
                {year}
              </span>
            ))}
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 left-32 sm:left-48 right-0 bottom-8">
            {/* Horizontal lines */}
            {activeCategories.map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-t border-dashed border-muted-foreground/20"
                style={{ top: `${((i + 0.5) / activeCategories.length) * 100}%` }}
              />
            ))}
            {/* Vertical lines */}
            {yearMarkers.map(year => (
              <div
                key={year}
                className="absolute top-0 bottom-0 border-l border-dashed border-muted-foreground/20"
                style={{ left: `${getXPosition(year)}%` }}
              />
            ))}
          </div>

          {/* Data points */}
          <div className="absolute inset-0 left-32 sm:left-48 right-0 bottom-8 p-2">
            {filteredAndSortedResources.map((resource, index) => {
              const x = getXPosition(resource.year)
              const y = getYPosition(resource.category)

              return (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute group"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Dot */}
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${categoryColors[resource.category]}
                    opacity-80 group-hover:opacity-100 group-hover:scale-150 transition-all
                    ring-0 group-hover:ring-4 ring-primary/20`}
                  />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100
                    transition-opacity pointer-events-none z-20 w-48 sm:w-64">
                    <div className="bg-popover text-popover-foreground border rounded-lg shadow-lg p-3 text-xs">
                      <p className="font-medium line-clamp-2">{resource.title}</p>
                      <p className="text-muted-foreground mt-1">{resource.authors}, {resource.year}</p>
                      <Badge variant="outline" className="mt-2 text-[10px] capitalize">{resource.type}</Badge>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Mobile-friendly list below chart */}
        <div className="mt-6 lg:hidden">
          <h3 className="text-sm font-medium mb-3">All Resources</h3>
          <div className="space-y-2">
            {filteredAndSortedResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${categoryColors[resource.category]}`} />
                <span className="font-mono text-xs text-muted-foreground w-10">{resource.year}</span>
                <span className="text-sm truncate flex-1">{resource.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Sidebar content (shared between desktop and mobile)
  const SidebarContent = () => (
    <div className="space-y-4">
      {/* Search */}
      <div className="space-y-1.5">
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

      {/* Visualization Options */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          View
        </label>
        <div className="flex flex-wrap gap-1">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            className="text-xs h-7 px-2"
            onClick={() => setViewMode('list')}
          >
            <LayoutList className="h-3 w-3 mr-1" />
            List
          </Button>
          <Button
            variant={viewMode === 'timeline' ? 'default' : 'outline'}
            size="sm"
            className="text-xs h-7 px-2"
            onClick={() => setViewMode('timeline')}
          >
            <Clock className="h-3 w-3 mr-1" />
            Timeline
          </Button>
          <Button
            variant={viewMode === 'scatter' ? 'default' : 'outline'}
            size="sm"
            className="text-xs h-7 px-2"
            onClick={() => setViewMode('scatter')}
          >
            <BarChart3 className="h-3 w-3 mr-1" />
            Chart
          </Button>
        </div>
      </div>

      {/* Type Filter */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Type
        </label>
        <div className="flex flex-wrap gap-1">
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
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Categories
        </label>
        <nav className="space-y-0.5">
          <button
            onClick={() => { setSelectedCategory('All'); setMobileSidebarOpen(false) }}
            className={`w-full flex items-center justify-between px-2 py-1.5 text-sm rounded transition-colors ${
              selectedCategory === 'All'
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <span>All Resources</span>
            <Badge variant="secondary" className="text-[10px] h-5">
              {resources.length}
            </Badge>
          </button>
          {allCategories.map(category => {
            const count = resources.filter(r => r.category === category).length
            return (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`w-full flex items-center justify-between px-2 py-1.5 text-sm rounded transition-colors text-left ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <span className="flex-1 truncate text-xs">{category}</span>
                <Badge variant="secondary" className="text-[10px] h-5 ml-1">
                  {count}
                </Badge>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Results Count */}
      <div className="pt-3 border-t text-xs text-muted-foreground">
        Showing {filteredAndSortedResources.length} of {resources.length} resources
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Centered Page Header - Matching other pages */}
      <Section className="pt-24 pb-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-amber-50/30 to-transparent dark:from-amber-950/10" />
        <Container className="relative">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <div
              className="inline-block"
              onMouseEnter={() => setIsHeaderHovered(true)}
              onMouseLeave={() => setIsHeaderHovered(false)}
            >
              <h1 className="text-3xl font-serif font-bold mb-1">Resources</h1>
              <div
                className="h-0.5 mx-auto transition-all duration-300"
                style={{
                  backgroundColor: theme.accent,
                  width: isHeaderHovered ? '100%' : '4rem'
                }}
              />
            </div>
            <div className="text-lg text-muted-foreground mt-3 flex items-center justify-center gap-3">
              <span>Curated readings, tools, and scholarship for AI in the humanities</span>
              <Badge variant="secondary">
                {resources.length} Resources
              </Badge>
            </div>

          </AnimatedSection>
        </Container>
      </Section>

      {/* Mobile: View Mode Ribbon */}
      <div className="lg:hidden sticky top-[72px] z-30 bg-background border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="flex items-center gap-1">
            <Badge
              variant={sortBy === 'newest' ? 'default' : 'outline'}
              className="cursor-pointer text-xs"
              onClick={() => setSortBy('newest')}
            >
              Newest
            </Badge>
            <Badge
              variant={sortBy === 'category' ? 'default' : 'outline'}
              className="cursor-pointer text-xs"
              onClick={() => setSortBy('category')}
            >
              By Category
            </Badge>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Sidebar */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />
          {/* Sidebar Panel */}
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-background shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
              <h2 className="font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:flex max-w-[1400px] mx-auto">
        {/* Desktop Sidebar */}
        <aside className="sticky top-[72px] h-[calc(100vh-72px)] w-60 flex-shrink-0 border-r bg-muted/30 overflow-y-auto">
          <div className="p-3">
            <SidebarContent />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto py-3 px-6">
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
            <>
              {/* Timeline View */}
              {viewMode === 'timeline' && <TimelineView />}

              {/* Chart/Scatter View */}
              {viewMode === 'scatter' && <ChartView />}

              {/* List View (default) */}
              {viewMode === 'list' && (
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
              )}
            </>
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
        </main>
      </div>

      {/* Mobile Main Content */}
      <div className="lg:hidden">
        <Container className="py-6">
          {filteredAndSortedResources.length > 0 ? (
            <>
              {/* Timeline View - Mobile */}
              {viewMode === 'timeline' && <TimelineView />}

              {/* Chart View - Mobile (simplified message for small screens) */}
              {viewMode === 'scatter' && (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      Chart view works best on larger screens
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      Switch to List View
                    </Button>
                  </div>
                  <ChartView />
                </div>
              )}

              {/* List View - Mobile */}
              {viewMode === 'list' && (
                <div className="space-y-8">
                  {/* Grouped by Category View */}
                  {sortBy === 'category' && Object.entries(resourcesByCategory)
                .sort(([catA], [catB]) => catA.localeCompare(catB))
                .map(([category, categoryResources]) => (
                  <section key={category}>
                    <div className="mb-4 pb-2 border-b">
                      <h2 className="text-xl font-serif font-bold">{category}</h2>
                      <Badge variant="secondary" className="mt-1">{categoryResources.length}</Badge>
                    </div>
                    <div className="space-y-3">
                      {categoryResources.map((resource, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              {getTypeIcon(resource.type)}
                              <Badge variant="outline" className="text-xs capitalize">
                                {resource.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{resource.year}</span>
                            </div>
                            <h3 className="font-semibold text-base mb-1">
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary"
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
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                ))}

              {/* Flat List for newest sort on mobile */}
              {sortBy === 'newest' && (
                <div className="space-y-3">
                  {filteredAndSortedResources.map((resource, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeIcon(resource.type)}
                          <Badge variant="outline" className="text-xs capitalize">
                            {resource.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{resource.year}</span>
                        </div>
                        <h3 className="font-semibold text-base mb-1">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary"
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No resources found.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                  setSelectedType('All')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}
