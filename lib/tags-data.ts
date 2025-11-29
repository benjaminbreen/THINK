/**
 * Centralized tags data for all THINK content
 * This aggregates projects, resources, guides, and pedagogy materials
 * for the unified /tags/[tag] page
 */

export type ContentType = 'project' | 'resource' | 'guide' | 'assignment'

export interface TaggedContent {
  id: string
  title: string
  description: string
  href: string
  type: ContentType
  tags: string[]
  author?: string
  year?: number | string
  institution?: string
  thumbnailPath?: string
}

// All projects
export const projects: TaggedContent[] = [
  {
    id: 'apothecary-simulator',
    title: 'Apothecary Simulator',
    description: 'An AI-powered historical simulation of medicine in 1680s colonial Mexico',
    href: '/projects/apothecary-simulator',
    type: 'project',
    tags: ['History of Medicine', 'Colonial Latin America', 'AI Simulation', 'Primary Sources', 'Converso History', 'Educational Games', 'History'],
    author: 'Benjamin Breen',
    year: 2024,
    institution: 'UC Santa Cruz',
    thumbnailPath: '/thumbnails/apothecary-simulator.png'
  },
  {
    id: 'young-darwin',
    title: 'Young Darwin',
    description: 'Interactive simulation of Darwin\'s Galápagos expedition with specimen collection',
    href: '/projects/young-darwin',
    type: 'project',
    tags: ['History', 'Natural History', 'Classroom Assignment', 'AI Simulation', 'Educational Games'],
    author: 'Benjamin Breen',
    year: 2024,
    institution: 'UC Santa Cruz',
    thumbnailPath: '/thumbnails/young-darwin.png'
  },
  {
    id: 'history-simulator',
    title: 'History Simulator',
    description: 'Generate historically plausible scenarios and figures for exploration',
    href: '/projects/history-simulator',
    type: 'project',
    tags: ['History', 'Research Tool', 'AI Simulation', 'Historical Simulation'],
    author: 'Benjamin Breen',
    year: 2024,
    institution: 'UC Santa Cruz',
    thumbnailPath: '/thumbnails/history-simulator.png'
  },
  {
    id: 'historical-persona-generator',
    title: 'Historical Persona Generator',
    description: 'Procedurally generate historically accurate character personas with pixel-art portraits, life histories, and cultural context',
    href: '/projects/historical-persona-generator',
    type: 'project',
    tags: ['World History', 'Procedural Generation', 'Educational Games', 'Digital Humanities'],
    author: 'Benjamin Breen',
    year: 2025,
    institution: 'UC Santa Cruz',
    thumbnailPath: '/thumbnails/historical-persona-generator.png'
  },
  {
    id: 'historylens',
    title: 'HistoryLens',
    description: 'A pedagogical framework combining interactive historical simulations with authentic primary sources',
    href: '/projects/historylens',
    type: 'project',
    tags: ['History', 'Pedagogy', 'Primary Sources', 'AI Literacy', 'Critical Thinking'],
    author: 'Benjamin Breen',
    year: 2024,
    institution: 'UC Santa Cruz',
    thumbnailPath: '/thumbnails/historylens.png'
  }
]

// All assignments from pedagogy
export const assignments: TaggedContent[] = [
  {
    id: 'drug-history-artifact',
    title: 'Create a Digital Artifact about Drug History',
    description: 'Final assignment offering creative, digital artifact, or research paper options. Build an online exhibit, database, or interactive resource exploring the cultural history of drugs.',
    href: '/pedagogy/assignments/drug-history-artifact',
    type: 'assignment',
    tags: ['History', 'Primary Sources', 'Digital Humanities', 'Research', 'Creative'],
    author: 'Benjamin Breen',
    institution: 'UC Santa Cruz'
  },
  {
    id: 'apothecary-simulator-assignment',
    title: "The Apothecary's Dilemma",
    description: 'An AI-powered historical simulation where students play as Maria de Lima, a converso apothecary in 1680s Mexico City.',
    href: '/pedagogy/assignments/apothecary-simulator',
    type: 'assignment',
    tags: ['History of Medicine', 'Primary Sources', 'Colonial Latin America', 'Critical AI Literacy', 'Roleplay', 'Simulation'],
    author: 'Benjamin Breen',
    institution: 'UC Santa Cruz'
  }
]

// All guides
export const guides: TaggedContent[] = [
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering for Humanities',
    description: 'Learn effective techniques for crafting prompts that produce useful results for humanities research and teaching.',
    href: '/guides/prompt-engineering',
    type: 'guide',
    tags: ['AI Literacy', 'Research', 'Prompt Engineering', 'Pedagogy']
  },
  {
    id: 'building-simulations',
    title: 'Building Historical Simulations',
    description: 'A technical guide to creating AI-powered historical simulations for classroom use.',
    href: '/guides/building-simulations',
    type: 'guide',
    tags: ['Historical Simulation', 'AI Simulation', 'Educational Games', 'Pedagogy', 'Technical']
  },
  {
    id: 'ai-assignments',
    title: 'Designing AI-Enhanced Assignments',
    description: 'Strategies for creating assignments that leverage AI tools while developing critical thinking.',
    href: '/guides/ai-assignments',
    type: 'guide',
    tags: ['Pedagogy', 'AI Literacy', 'Assignment Design', 'Critical Thinking']
  },
  {
    id: 'critical-pedagogy',
    title: 'Critical AI Pedagogy',
    description: 'Approaches to teaching about AI that center critique, ethics, and humanistic inquiry.',
    href: '/guides/critical-pedagogy',
    type: 'guide',
    tags: ['Critical AI Theory', 'Pedagogy', 'Ethics', 'AI Literacy']
  },
  {
    id: 'ai-historical-research',
    title: 'AI for Historical Research',
    description: 'How to use AI tools effectively in historical research while maintaining scholarly rigor.',
    href: '/guides/ai-historical-research',
    type: 'guide',
    tags: ['History', 'Research', 'AI Literacy', 'Digital Humanities']
  },
  {
    id: 'responsible-ai-classroom',
    title: 'Responsible AI in the Classroom',
    description: 'Guidelines for ethical and effective use of AI tools in educational settings.',
    href: '/guides/responsible-ai-classroom',
    type: 'guide',
    tags: ['Ethics', 'Pedagogy', 'AI Literacy', 'Academic Integrity']
  },
  {
    id: 'research-workflows',
    title: 'AI Research Workflows',
    description: 'Practical workflows for integrating AI into humanities research processes.',
    href: '/guides/research-workflows',
    type: 'guide',
    tags: ['Research', 'Digital Humanities', 'AI Literacy', 'Workflow']
  },
  {
    id: 'history-machine-intelligence',
    title: 'History of Machine Intelligence',
    description: 'Historical context for understanding AI: from automata to neural networks.',
    href: '/guides/history-machine-intelligence',
    type: 'guide',
    tags: ['History', 'Critical AI Theory', 'AI and Humanities Weirdness']
  },
  {
    id: 'claude-code-basics',
    title: 'Claude Code Basics',
    description: 'Getting started with Claude Code for humanities computing projects.',
    href: '/guides/claude-code-basics',
    type: 'guide',
    tags: ['Technical', 'AI Literacy', 'Tools & Platforms']
  }
]

// Combine all content
export function getAllContent(): TaggedContent[] {
  return [...projects, ...assignments, ...guides]
}

// Get all unique tags
export function getAllTags(): string[] {
  const allContent = getAllContent()
  const tagSet = new Set<string>()
  allContent.forEach(item => {
    item.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

// Get content by tag
export function getContentByTag(tag: string): TaggedContent[] {
  const allContent = getAllContent()
  const normalizedTag = tag.toLowerCase()
  return allContent.filter(item =>
    item.tags.some(t => t.toLowerCase() === normalizedTag)
  )
}

// Get tag counts
export function getTagCounts(): Record<string, number> {
  const allContent = getAllContent()
  const counts: Record<string, number> = {}
  allContent.forEach(item => {
    item.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1
    })
  })
  return counts
}

// Normalize tag for URL (lowercase, hyphenated)
export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and')
}

// Convert slug back to display tag
export function slugToTag(slug: string): string {
  // This is a simple conversion - for exact matches, we check against known tags
  const allTags = getAllTags()
  const normalizedSlug = slug.toLowerCase()

  // Find the tag that matches this slug
  const matchingTag = allTags.find(tag => tagToSlug(tag) === normalizedSlug)

  if (matchingTag) return matchingTag

  // Fallback: convert slug back to title case
  return slug
    .replace(/-/g, ' ')
    .replace(/\band\b/g, '&')
    .replace(/\b\w/g, c => c.toUpperCase())
}
