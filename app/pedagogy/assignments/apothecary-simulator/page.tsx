import { AssignmentDetailLayout, AssignmentDetailData } from '@/components/ui/assignment-detail-layout'

const assignmentData: AssignmentDetailData = {
  title: "The Apothecary's Dilemma",
  slug: "apothecary-simulator",
  description: "An AI-powered historical simulation where students play as Maria de Lima, a converso apothecary in 1680s Mexico City. Students diagnose patients using period sources, then critically analyze the simulation's historical accuracy and archival gaps.",
  type: "Simulation + Primary Source Research",
  tags: ['History of Medicine', 'Primary Sources', 'Colonial Latin America', 'Critical AI Literacy', 'Roleplay'],
  thumbnailPath: "/thumbnails/apothecary-simulator.webp",
  courseName: "History of Medicine / Colonial Latin American History",
  institution: "UC Santa Cruz",
  gradeLevel: "Undergraduate",
  author: "Benjamin Breen",
  duration: "2-3 class sessions (can extend to full unit)",
  groupSize: "Individual play, group reflection",
  learningObjectives: [
    { text: "Understand early modern humoral medicine and pharmaceutical practice in the colonial Americas" },
    { text: "Conduct primary source research to inform historical decision-making" },
    { text: "Analyze how converso identity shaped daily life under Inquisitorial surveillance" },
    { text: "Critically evaluate AI-generated historical content: identify errors, anachronisms, and archival silences" },
    { text: "Reflect on whose voices are missing from historical archives and how this shapes AI training data" },
    { text: "Develop historical empathy while maintaining critical distance" }
  ],
  fullText: (
    <>
      <h2>About the Simulation</h2>
      <p>
        <a href="https://apothecary-simulator.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Apothecary Simulator</a> is
        an AI-enabled educational game that places students in the role of Maria de Lima, a converso (Jewish convert)
        apothecary running a shop in 1680s Mexico City. The simulation uses large language models to generate
        patient encounters based on actual cases documented in late 17th-century sources—medical treatises,
        Inquisition records, and pharmaceutical texts from colonial New Spain.
      </p>
      <p className="mt-4 p-4 bg-muted/50 rounded-lg border">
        <strong>Historical Note:</strong> Maria de Lima is based on Maria Coelho, a real apothecary who lived in
        Portugal in the 1660s. She was arrested by the Inquisition, found guilty of heresy, and sentenced to
        exile in Brazil. Afterward, she disappeared from the historical record. This game imagines where she
        might have ended up—and asks students to think critically about such archival silences.
      </p>

      <h2>How the Simulation Works</h2>
      <p>
        Students interact through a conversational interface, making choices about how to run Maria's shop,
        diagnose patients, and navigate the dangerous social world of colonial Mexico as a converso under
        Inquisitorial scrutiny.
      </p>

      <h3>Core Mechanics</h3>
      <ul>
        <li><strong>💬 Act Naturally:</strong> Type what you'd say or do in character. The AI responds to context and remembers your choices.</li>
        <li><strong>⚗️ Mix Medicines:</strong> Combine historical ingredients using period methods—distillation, decoction, confection, calcination.</li>
        <li><strong>🩺 Diagnose Patients:</strong> Examine symptoms and offer cures using early modern humoral medicine.</li>
        <li><strong>⚖️ Manage Resources:</strong> Balance health, energy, wealth, and reputation. Actions have costs and survival requires planning.</li>
        <li><strong>🤔 Question the AI:</strong> Notice what it gets right—and wrong—about the past. Think critically about historical narratives and algorithmic assumptions.</li>
      </ul>

      <h2>Assignment Structure</h2>

      <h3>Part 1: Play the Simulation (Individual, 30-45 minutes)</h3>
      <p>
        Students play through the simulation, taking notes on:
      </p>
      <ul>
        <li>Patient symptoms and their proposed diagnoses</li>
        <li>Remedies they prepared and ingredients used</li>
        <li>Any moments that felt historically "off" or suspiciously modern</li>
        <li>Ethical dilemmas they encountered (economic pressures vs. patient care, Inquisition fears)</li>
      </ul>

      <h3>Part 2: Primary Source Research (Individual or pairs, 1-2 hours)</h3>
      <p>
        After playing, students select one patient encounter and conduct actual primary source research to
        evaluate and extend their in-game diagnosis. They should:
      </p>
      <ul>
        <li><strong>Identify the malady:</strong> What would early modern physicians have called this condition?</li>
        <li><strong>Find period treatments:</strong> Locate actual remedies in digitized pharmacopoeias and medical texts</li>
        <li><strong>Compare to simulation:</strong> How did the AI's suggestions match (or diverge from) historical sources?</li>
        <li><strong>Note archival gaps:</strong> What couldn't you find? Whose medical knowledge is missing from the archive?</li>
      </ul>
      <p className="mt-2 text-sm text-muted-foreground">
        Suggested databases: <a href="https://archive.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Internet Archive</a>,
        {' '}<a href="https://www.biodiversitylibrary.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Biodiversity Heritage Library</a>,
        {' '}<a href="https://wellcomecollection.org/collections" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Wellcome Collection</a>,
        {' '}<a href="https://books.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Books</a> (pre-1900 texts)
      </p>

      <h3>Part 3: Critical Reflection (Written, 500-750 words)</h3>
      <p>
        Students write a reflection addressing:
      </p>
      <ol>
        <li><strong>Historical accuracy:</strong> What did the simulation get right? What errors or anachronisms did you notice?</li>
        <li><strong>Archival silences:</strong> Whose voices and knowledge systems are missing? (Indigenous healing practices? Enslaved people's medical knowledge? Women healers outside formal systems?)</li>
        <li><strong>AI limitations:</strong> How do gaps in digitized archives shape what an AI "knows" about the past?</li>
        <li><strong>Historical empathy:</strong> How did playing as Maria change your understanding of converso life, early modern medicine, or colonial society?</li>
      </ol>

      <h2>Optional Extension: In-Class Roleplay</h2>
      <p>
        For a deeper engagement, conduct an in-class roleplay session where students embody different figures
        in the early modern medical marketplace:
      </p>

      <h3>Roles</h3>
      <ul>
        <li><strong>Patients:</strong> Research and present with period-appropriate illnesses (quartian fever, dropsy, melancholy, etc.)</li>
        <li><strong>Apothecaries:</strong> Diagnose and propose treatments using humoral reasoning</li>
        <li><strong>Licensed Physicians:</strong> Consult on difficult cases, assert professional authority</li>
        <li><strong>Inquisition Officials:</strong> Investigate reports of suspicious healing practices or crypto-Judaism</li>
        <li><strong>Indigenous Healers:</strong> Offer alternative treatments from Mesoamerican traditions (research required)</li>
        <li><strong>Midwives:</strong> Handle cases involving women's health and childbirth</li>
      </ul>

      <h3>Roleplay Structure</h3>
      <ol>
        <li><strong>Preparation (homework):</strong> Students research their assigned role using primary and secondary sources</li>
        <li><strong>Scene setting (5 min):</strong> Instructor establishes the scenario (marketplace, Inquisition tribunal, wealthy household, etc.)</li>
        <li><strong>Roleplay (20-30 min):</strong> Students interact in character, making period-appropriate decisions</li>
        <li><strong>Debrief (15 min):</strong> Out-of-character discussion about what felt authentic, what was difficult, and what they learned</li>
      </ol>

      <h2>Assessment Options</h2>
      <ul>
        <li><strong>Primary source analysis (2-3 pages):</strong> Compare simulation diagnosis to actual historical treatments</li>
        <li><strong>AI critique portfolio:</strong> Document 5+ historical errors with explanations of why they're anachronistic</li>
        <li><strong>Archival silence essay:</strong> Research a voice missing from the simulation (Indigenous healers, enslaved medical practitioners, etc.)</li>
        <li><strong>Roleplay character dossier:</strong> Research packet for the in-class extension, including primary source excerpts</li>
        <li><strong>Remedies comparison:</strong> Transcribe and analyze an actual 17th-century recipe, comparing to simulation</li>
      </ul>

      <h2>Discussion Questions</h2>
      <ol>
        <li>How did economic pressures shape Maria's medical decisions? How does this compare to healthcare today?</li>
        <li>What does it mean to practice medicine under surveillance? How did converso identity affect daily life?</li>
        <li>The simulation is trained on digitized texts—mostly European, mostly elite. What gets left out?</li>
        <li>Can an AI simulate historical trauma? Should it? What are the ethics of "playing" persecution?</li>
        <li>How does humoral medicine's logic compare to modern medical reasoning? What's actually different?</li>
      </ol>

      <h2>Technical Requirements</h2>
      <ul>
        <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
        <li>Internet connection</li>
        <li>No account required—play at <a href="https://apothecary.breen.gg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">apothecary.breen.gg</a></li>
      </ul>
    </>
  ),
  suggestedReadings: [
    {
      title: "The Complete Herbal (1653)",
      author: "Nicholas Culpeper",
      url: "https://www.gutenberg.org/ebooks/49513",
      description: "Classic early modern herbal—free on Project Gutenberg. Great for finding period remedies."
    },
    {
      title: "Tesoro de Medicinas (1672)",
      author: "Gregorio López",
      url: "https://archive.org/details/tesorodemedicina00lpez",
      description: "Spanish colonial pharmacopoeia compiled in New Spain—primary source for Mexican remedies."
    },
    {
      title: "The Badianus Manuscript (Codex Barberini)",
      author: "Martín de la Cruz & Juan Badiano",
      url: "https://www.wdl.org/en/item/10096/",
      description: "1552 Aztec herbal translated to Latin—rare Indigenous medical knowledge that survived colonization."
    },
    {
      title: "The Age of Intoxication: Origins of the Global Drug Trade",
      author: "Benjamin Breen",
      url: "https://www.pennpress.org/9780812224672/the-age-of-intoxication/",
      description: "Context on early modern drug trades, apothecary practice, and colonial pharmacology."
    },
    {
      title: "Rituals of Childhood: Jewish Acculturation in Medieval Europe",
      author: "Ivan Marcus",
      url: "https://yalebooks.yale.edu/book/9780300076585/rituals-of-childhood/",
      description: "Background on Jewish life and crypto-Judaism—useful for understanding converso identity."
    },
    {
      title: "Inquisition Records from Mexico City (1590s-1690s)",
      author: "Various (Archivo General de la Nación)",
      url: "https://www.agn.gob.mx/",
      description: "Primary sources on converso life and Inquisitorial persecution in colonial Mexico."
    },
    {
      title: "Secrets of Women: Gender, Generation, and the Origins of Human Dissection",
      author: "Katharine Park",
      url: "https://press.princeton.edu/books/paperback/9781890951689/secrets-of-women",
      description: "Women's bodies, medical knowledge, and the gendering of early modern medicine."
    }
  ],
  relatedAssignments: [
    {
      title: "Create a Digital Artifact about Drug History",
      slug: "drug-history-artifact",
      type: "Creative/Research",
      description: "Build an online exhibit exploring drug history using primary sources"
    },
    {
      title: "Counterfactual History Datasets",
      slug: "counterfactual-datasets",
      type: "Research/AI Literacy",
      description: "Create datasets for historical 'what if' scenarios to understand AI training"
    }
  ]
}

export default function ApothecarySimulatorPage() {
  return <AssignmentDetailLayout assignment={assignmentData} />
}

export const metadata = {
  title: "The Apothecary's Dilemma | THINK Pedagogy",
  description: "AI-powered historical simulation: play as a converso apothecary in 1680s Mexico City, diagnose patients using primary sources, and critically analyze AI limitations.",
}
