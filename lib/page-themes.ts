// Page-specific accent colors following a harmonious design principle
// All colors work well with primary blue (#3b82f6) and amber (#eab308)

export const pageThemes = {
  pedagogy: {
    name: 'Pedagogy',
    accent: '#8b5cf6', // Violet - wisdom, education, thoughtfulness
    accentRgb: '139, 92, 246',
    tailwind: 'violet-500',
    description: 'Teaching philosophy and approaches'
  },
  guides: {
    name: 'Guides',
    accent: '#3b82f6', // Blue - clarity, guidance, knowledge
    accentRgb: '59, 130, 246',
    tailwind: 'blue-500',
    description: 'How-to guides and tutorials'
  },
  about: {
    name: 'About',
    accent: '#6366f1', // Indigo - depth, professionalism
    accentRgb: '99, 102, 241',
    tailwind: 'indigo-500',
    description: 'About the THINK project'
  },
  blog: {
    name: 'Blog',
    accent: '#f43f5e', // Rose - creativity, expression
    accentRgb: '244, 63, 94',
    tailwind: 'rose-500',
    description: 'Updates and announcements'
  },
  projects: {
    name: 'Projects',
    accent: '#06b6d4', // Cyan - innovation, technology
    accentRgb: '6, 182, 212',
    tailwind: 'cyan-500',
    description: 'AI projects and simulations'
  },
  resources: {
    name: 'Resources',
    accent: '#f59e0b', // Amber - knowledge, scholarship, warmth
    accentRgb: '245, 158, 11',
    tailwind: 'amber-500',
    description: 'Curated readings and tools'
  }
} as const

export type PageTheme = keyof typeof pageThemes
