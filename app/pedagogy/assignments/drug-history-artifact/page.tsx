import { AssignmentDetailLayout, AssignmentDetailData } from '@/components/ui/assignment-detail-layout'

const assignmentData: AssignmentDetailData = {
  title: "Create a Digital Artifact about Drug History",
  slug: "drug-history-artifact",
  description: "A flexible final assignment offering creative work, digital artifact, or traditional research paper options. Students explore the cultural history of drugs through original research, building exhibits, databases, or interactive resources.",
  type: "Creative/Research",
  tags: ['History', 'Primary Sources', 'Digital Humanities', 'Research', 'Creative'],
  thumbnailPath: "/thumbnails/drug-history-artifact.png",
  pdfPath: "/pdfs/HIS151BDrugHistoryFinalAssignment.pdf",
  sampleSubmissionUrl: "https://cultural-history-drugs.vercel.app/",
  courseName: "History of Drugs",
  courseCode: "HIS 151B",
  institution: "UC Santa Cruz",
  gradeLevel: "Upper Division Undergraduate",
  author: "Benjamin Breen",
  duration: "Final project (4-6 weeks)",
  groupSize: "Individual",
  learningObjectives: [
    { text: "Develop original research questions about the cultural history of drugs and intoxication" },
    { text: "Locate, evaluate, and analyze 2-5 primary sources and 5+ secondary sources" },
    { text: "Construct a clear, argument-driven narrative about historical drug cultures" },
    { text: "For digital artifacts: Learn to present historical research in interactive formats" },
    { text: "Apply critical analysis skills to understand how societies construct meaning around psychoactive substances" },
    { text: "Engage with historiographical debates about drugs, medicine, and society" }
  ],
  fullText: (
    <>
      <h2>Assignment Overview</h2>
      <p>
        This final assignment offers three pathways for exploring the cultural history of drugs:
      </p>
      <ol>
        <li><strong>Creative Work</strong> – Fiction, poetry, visual art, or multimedia that engages deeply with historical sources (experimental; consult instructor first)</li>
        <li><strong>Digital Artifact</strong> – An online exhibit, database, interactive timeline, or web-based resource (experimental; consult instructor first)</li>
        <li><strong>Research Paper</strong> – A traditional 7-10 page argument-driven paper with original research (standard option)</li>
      </ol>

      <h2>Requirements</h2>
      <h3>All Formats</h3>
      <ul>
        <li>7-10 pages or equivalent scope</li>
        <li>Minimum 2-5 primary sources</li>
        <li>Minimum 5 secondary sources</li>
        <li>Clear argument or thesis</li>
        <li>Any time period is appropriate</li>
        <li>Builds on your earlier prospectus work</li>
      </ul>

      <h3>For Digital Artifacts</h3>
      <p>
        Digital artifacts should present historical research in an accessible, interactive format. This might include:
      </p>
      <ul>
        <li>Online exhibits with primary source galleries</li>
        <li>Searchable databases of historical materials</li>
        <li>Interactive timelines or maps</li>
        <li>Digital archives with contextual essays</li>
      </ul>
      <p>
        The sample submission demonstrates one approach: a curated database/exhibit exploring cultural production (literature, art, music, film) relating to drug history in the 1880-1950 period.
      </p>

      <h2>Evaluation Criteria</h2>
      <p>Your final project will be evaluated on:</p>
      <ul>
        <li><strong>Argument clarity</strong> – Does your project make a clear historical argument?</li>
        <li><strong>Source integration</strong> – How effectively do you use primary and secondary sources?</li>
        <li><strong>Historical analysis</strong> – Do you move beyond description to interpretation?</li>
        <li><strong>Research depth</strong> – Have you engaged substantively with your topic?</li>
        <li><strong>Presentation</strong> – Is your work well-organized and clearly communicated?</li>
      </ul>

      <h2>Suggested Topics</h2>
      <p>
        Students have explored topics including:
      </p>
      <ul>
        <li>Patent medicines and advertising in Victorian America</li>
        <li>Opium in 19th-century literature and art</li>
        <li>The history of cannabis prohibition</li>
        <li>Psychedelics and counterculture movements</li>
        <li>Colonial drug trades and empire</li>
        <li>Pharmacy and apothecaries in early modern Europe</li>
        <li>Coffee houses and the Enlightenment</li>
        <li>Alcohol temperance movements</li>
      </ul>

      <h2>Timeline</h2>
      <ul>
        <li><strong>Week 1-2:</strong> Topic selection and preliminary research</li>
        <li><strong>Week 3:</strong> Prospectus due (for feedback)</li>
        <li><strong>Week 4-5:</strong> Deep research and drafting</li>
        <li><strong>Week 6:</strong> Final submission</li>
      </ul>
    </>
  ),
  suggestedReadings: [
    {
      title: "Forces of Habit: Drugs and the Making of the Modern World",
      author: "David T. Courtwright",
      description: "Essential overview of global drug history"
    },
    {
      title: "The Age of Intoxication: Origins of the Global Drug Trade",
      author: "Benjamin Breen",
      url: "https://www.pennpress.org/9780812251807/the-age-of-intoxication/",
      description: "Early modern drug trades and their global impacts"
    },
    {
      title: "Dark Paradise: A History of Opiate Addiction in America",
      author: "David Courtwright",
      description: "Classic study of American drug history"
    },
    {
      title: "Drugs and Narcotics in History",
      author: "Roy Porter & Mikuláš Teich (eds.)",
      description: "Interdisciplinary essay collection"
    }
  ],
  relatedAssignments: [
    {
      title: "Apothecary Simulator",
      slug: "apothecary-simulator",
      type: "Simulation",
      description: "17th century medical practice simulation using authentic early modern recipes"
    },
    {
      title: "Auditing AI Training Datasets",
      slug: "audit-datasets",
      type: "Critical Analysis",
      description: "Examine biases and gaps in AI training data"
    }
  ]
}

export default function DrugHistoryArtifactPage() {
  return <AssignmentDetailLayout assignment={assignmentData} />
}

export const metadata = {
  title: 'Create a Digital Artifact about Drug History | THINK Pedagogy',
  description: 'Final assignment for HIS 151B offering creative, digital artifact, or research paper options exploring the cultural history of drugs.',
}
