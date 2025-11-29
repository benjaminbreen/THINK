/**
 * Site configuration
 * Centralizes site-wide settings to avoid hardcoded values
 */

export const siteConfig = {
  name: 'THINK',
  fullName: 'Technology + Humanities Integrated Knowledge',
  description: 'An NEH-funded project at UC Santa Cruz developing free resources for teaching with and about AI in the humanities.',

  // Use environment variable with fallback to production domain
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://think.ucsc.edu',

  // Social/contact
  email: 'bbreen@ucsc.edu',
  github: 'https://github.com/benjaminbreen/THINK',

  // Organization info for structured data
  organization: {
    name: 'UC Santa Cruz',
    url: 'https://www.ucsc.edu',
  },

  // Funding acknowledgment
  funder: {
    name: 'National Endowment for the Humanities',
    url: 'https://www.neh.gov',
  },
} as const

export type SiteConfig = typeof siteConfig
