export type ProjectType = 'classroom-assignment' | 'full-course' | 'research-tool'
export type Discipline = 'history' | 'literature' | 'linguistics' | 'interdisciplinary'
export type ToolTag = 'simulation' | 'framework' | 'generator' | 'analyzer'

export interface Project {
  id: string
  title: string
  slug: string
  type: ProjectType
  discipline: Discipline
  toolTag: ToolTag
  date: string // YYYY-MM format
  tags: string[]
  description: string
  longDescription?: string
  links: {
    demo?: string
    github?: string
    docs?: string
  }
  image?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'historylens',
    title: 'HistoryLens',
    slug: 'historylens',
    type: 'research-tool',
    discipline: 'history',
    toolTag: 'framework',
    date: '2024-01',
    tags: ['primary sources', 'analysis', 'research'],
    description: 'An AI-powered framework for analyzing historical documents and primary sources with contextual understanding.',
    longDescription: 'HistoryLens helps researchers and students analyze primary historical sources by providing AI-assisted contextualization, translation, and interpretation. Built with Claude, it maintains scholarly rigor while accelerating research workflows.',
    links: {
      github: 'https://github.com/ucsc-think/historylens',
      docs: '/projects/historylens'
    },
    featured: true
  },
  {
    id: 'young-darwin',
    title: 'Young Darwin',
    slug: 'young-darwin',
    type: 'classroom-assignment',
    discipline: 'history',
    toolTag: 'simulation',
    date: '2024-03',
    tags: ['19th century', 'science history', 'biography'],
    description: 'An interactive simulation placing students in conversation with a young Charles Darwin during his formative years.',
    longDescription: 'Students engage in historically-grounded conversations with Darwin as a young naturalist, exploring his early ideas about natural history before the development of his theory of evolution. Uses carefully researched historical context and primary sources.',
    links: {
      demo: 'https://youngdarwin.think.dev',
      docs: '/projects/young-darwin'
    },
    featured: true
  },
  {
    id: 'history-simulator',
    title: 'History Simulator',
    slug: 'history-simulator',
    type: 'full-course',
    discipline: 'history',
    toolTag: 'simulation',
    date: '2024-02',
    tags: ['pedagogy', 'interactive', 'counterfactuals'],
    description: 'A flexible framework for creating historical scenario simulations across different time periods and contexts.',
    longDescription: 'Enables instructors to create custom historical simulations where students make decisions and explore counterfactual scenarios. Emphasizes critical thinking about causality, contingency, and historical interpretation.',
    links: {
      github: 'https://github.com/ucsc-think/history-simulator',
      docs: '/projects/history-simulator'
    }
  },
  {
    id: 'apothecary-simulator',
    title: 'Apothecary Simulator',
    slug: 'apothecary-simulator',
    type: 'classroom-assignment',
    discipline: 'history',
    toolTag: 'simulation',
    date: '2024-04',
    tags: ['18th century', 'medicine', 'social history'],
    description: 'Experience running an 18th-century apothecary shop, navigating medical practices, social norms, and ethical dilemmas.',
    longDescription: 'Students operate a colonial-era apothecary, learning about early modern medicine, social hierarchies, gender roles, and the ethics of historical medical practices. Based on extensive research into 18th-century pharmaceutical and medical culture.',
    links: {
      demo: 'https://apothecary.think.dev',
      docs: '/projects/apothecary-simulator'
    }
  },
  {
    id: 'historical-figure-generator',
    title: 'Historical Figure Generator',
    slug: 'historical-figure-generator',
    type: 'research-tool',
    discipline: 'history',
    toolTag: 'generator',
    date: '2024-05',
    tags: ['pedagogy', 'character development', 'biography'],
    description: 'Generate historically-grounded fictional characters for classroom role-playing and simulation exercises.',
    longDescription: 'Creates detailed, historically accurate character profiles for educational simulations. Each character includes biographical background, social context, motivations, and historically appropriate knowledge and attitudes.',
    links: {
      docs: '/projects/historical-figure-generator'
    }
  }
]

// Helper functions for filtering and sorting
export function filterProjects(
  projects: Project[],
  filters: {
    type?: ProjectType | 'all'
    discipline?: Discipline | 'all'
  }
): Project[] {
  return projects.filter(project => {
    if (filters.type && filters.type !== 'all' && project.type !== filters.type) {
      return false
    }
    if (filters.discipline && filters.discipline !== 'all' && project.discipline !== filters.discipline) {
      return false
    }
    return true
  })
}

export function sortProjects(
  projects: Project[],
  sortBy: 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'
): Project[] {
  const sorted = [...projects]

  switch (sortBy) {
    case 'date-desc':
      return sorted.sort((a, b) => b.date.localeCompare(a.date))
    case 'date-asc':
      return sorted.sort((a, b) => a.date.localeCompare(b.date))
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title))
    default:
      return sorted
  }
}

// Get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured)
}
