'use client'

import { useEffect, useState } from 'react'

// Literary style transformations for main page content
const styleTransformations = {
  hemingway: {
    hero: {
      badge: 'AI tools for humanities',
      title: 'AI Tools for Teaching',
      description: 'Free tools for teachers and researchers. Try them. Share your work. Learn how to build tools.',
    },
    projects: {
      title: 'Projects',
      description: 'AI tools for teaching',
    },
    guides: {
      title: 'Guides',
      description: 'Learn to build tools',
    },
  },
  shakespeare: {
    hero: {
      badge: 'A digital stage whereon the humanities do play',
      title: 'What Tools Through Yonder Classroom Break',
      description: 'Lo, here we gather—scholars, teachers all—to forge such instruments as make the past speak true. Browse what others wrought, or craft thine own.',
    },
    projects: {
      title: 'A Gallery of Wonders',
      description: 'Experimental devices for the teaching of humanities',
    },
    guides: {
      title: 'The Art of Making',
      description: 'Wherein we teach the craft of building AI-powered wonders',
    },
  },
  whitman: {
    hero: {
      badge: 'I sing the digital humanities electric',
      title: 'Building AI Tools—I Contain Multitudes!',
      description: 'O free resource hub! O democratic vistas of education! For every teacher, for every researcher, these projects—these experiments in AI—I sing them all, the open road of possibility!',
    },
    projects: {
      title: 'Gallery of the Democratic Vistas',
      description: 'I celebrate these tools, and what I create you shall create',
    },
    guides: {
      title: 'Song of the Making',
      description: 'Come, learn the craft of digital creation—adhesive, democratic, free',
    },
  },
  woolf: {
    hero: {
      badge: 'One thinks of the humanities and AI, the way they flow together',
      title: 'Building AI Tools (or Rather, The Attempt)',
      description: 'Here is a resource hub—though what is a resource, really?—for educators and researchers exploring (one must use that word carefully) experimental uses of AI. Browse projects, yes, but also consider: what does it mean to build, to share, to learn?',
    },
    projects: {
      title: 'Projects (A Gathering)',
      description: 'Experimental tools flowing like water through consciousness',
    },
    guides: {
      title: 'How-to Guides (If Such a Thing Exists)',
      description: 'Learning and building blur together, don\'t they, like waves',
    },
  },
  joyce: {
    hero: {
      badge: 'Stately, plum AI ascending',
      title: 'Buildingaitools. Yesthatsit. For Teaching Research.',
      description: 'Freeopen resourcehub educators and researchers (bracketed in academe yes) exploring the experimental the possible the AI in humanitiesflow. Browseprojects shareyourownwork learnhow to buildcustomtools coursesresearch.',
    },
    projects: {
      title: 'Projectgallery (Portals of Discovery)',
      description: 'Experimental AI the tools yes for teaching and researchflow',
    },
    guides: {
      title: 'Howtoguides (The Learning)',
      description: 'Learnbuild your own experimental AI tools teaching research yes',
    },
  },
  austen: {
    hero: {
      badge: 'It is a truth universally acknowledged',
      title: 'Of Building AI Tools (A Most Particular Pursuit)',
      description: 'It is a truth universally acknowledged, that an educator in possession of good ideas must be in want of proper instruments. Here assembled are resources for those of discriminating taste who wish to fashion AI tools suited to the teaching and researching arts.',
    },
    projects: {
      title: 'A Gallery Most Accomplished',
      description: 'Experimental instruments of considerable ingenuity for humanities instruction',
    },
    guides: {
      title: 'Instructions for Young Practitioners',
      description: 'Wherein one learns the arts of fashioning AI tools with elegance and propriety',
    },
  },
  cervantes: {
    hero: {
      badge: 'En un lugar de la Web, de cuyo nombre no quiero acordarme',
      title: 'La Ingeniosa Historia de las Herramientas de IA',
      description: 'En un lugar del internet, de cuyo nombre bien puedo acordarme, se halla un repositorio de herramientas experimentales para la enseñanza. Browse these quixotic projects, share your own adventures, and learn to build tools as fantastical as windmill giants.',
    },
    projects: {
      title: 'Galería de Hazañas Digitales',
      description: 'Herramientas experimentales para los caballeros andantes de las humanidades',
    },
    guides: {
      title: 'Guías del Arte Noble',
      description: 'Sally forth and learn to craft your own chivalric AI instruments',
    },
  },
  borges: {
    hero: {
      badge: 'The Library contains all possible tools',
      title: 'The Garden of Forking Tools',
      description: 'In this library—infinite, cyclical, hexagonal—one finds tools that perhaps exist, tools that should exist, and tools that cannot exist yet do. Each educator discovers their own labyrinth. The catalog is the collection; the collection, the universe.',
    },
    projects: {
      title: 'A Catalogue of Parallel Instruments',
      description: 'In one timeline these tools exist; in another, they are merely dreamed',
    },
    guides: {
      title: 'The Aleph of Making',
      description: 'All possible guides exist in this point; you need only learn to see them',
    },
  },
  james: {
    hero: {
      badge: 'A situation of the most delicate complexity',
      title: 'The Building of AI Tools: An Inquiry into Pedagogical Instruments',
      description: 'One might venture to observe—though the observation itself demands qualification—that here exists a resource, free and altogether available, for those educators and researchers whose interest lies in the development of what one might term experimental applications of artificial intelligence within the rather specialized, one might even say rarefied, atmosphere of humanistic inquiry.',
    },
    projects: {
      title: 'A Gallery of Considerable Refinement',
      description: 'Experimental instruments of a complexity not altogether unsuited to scholarship',
    },
    guides: {
      title: 'Guides of the Most Particular Sort',
      description: 'Instructions—though that term scarcely captures the nuance—for building tools',
    },
  },
  wilde: {
    hero: {
      badge: 'We are all in the gutter, but some of us are using AI',
      title: 'The Importance of Building AI Tools Earnestly',
      description: 'I can resist everything except good pedagogy. These tools are perfectly useless, which is why they are absolutely essential. One should either be a work of art, or create AI tools for teaching—there is no middle ground.',
    },
    projects: {
      title: 'A Gallery of Beautiful Trivialities',
      description: 'Experimental tools: delightfully artificial, intelligently frivolous',
    },
    guides: {
      title: 'The Picture of Pedagogical Wilde',
      description: 'Learn to build tools with all the superficiality that great art demands',
    },
  },
}

export function LiteraryTransformer() {
  const [currentStyle, setCurrentStyle] = useState<string | null>(null)
  const [originalContent, setOriginalContent] = useState<Record<string, string>>({})

  useEffect(() => {
    // Clear any saved style on mount (reset on page refresh)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('THINK_textStyle')
    }

    // Listen for style change events
    const handleStyleChange = (event: CustomEvent) => {
      const { style } = event.detail

      if (style === 'normal' || !styleTransformations[style as keyof typeof styleTransformations]) {
        // Restore original content
        restoreOriginalContent()
        setCurrentStyle(null)
        localStorage.removeItem('THINK_textStyle')
      } else {
        // Apply transformation
        applyStyleTransformation(style)
        setCurrentStyle(style)
      }
    }

    window.addEventListener('THINK_styleChange', handleStyleChange as EventListener)

    return () => {
      window.removeEventListener('THINK_styleChange', handleStyleChange as EventListener)
    }
  }, [])

  // Apply style on mount if saved
  useEffect(() => {
    if (currentStyle && styleTransformations[currentStyle as keyof typeof styleTransformations]) {
      setTimeout(() => {
        applyStyleTransformation(currentStyle)
      }, 100)
    }
  }, [currentStyle])

  const applyStyleTransformation = (style: string) => {
    const transformations = styleTransformations[style as keyof typeof styleTransformations]
    if (!transformations) return

    const selectors = [
      { selector: '[data-literary="hero-badge"]', key: 'hero-badge', content: transformations.hero.badge },
      { selector: '[data-literary="hero-title"]', key: 'hero-title', content: transformations.hero.title },
      { selector: '[data-literary="hero-description"]', key: 'hero-description', content: transformations.hero.description },
      { selector: '[data-literary="projects-title"]', key: 'projects-title', content: transformations.projects.title },
      { selector: '[data-literary="projects-description"]', key: 'projects-description', content: transformations.projects.description },
      { selector: '[data-literary="guides-title"]', key: 'guides-title', content: transformations.guides.title },
      { selector: '[data-literary="guides-description"]', key: 'guides-description', content: transformations.guides.description },
    ]

    const newOriginalContent: Record<string, string> = {}

    selectors.forEach(({ selector, key, content }) => {
      const element = document.querySelector(selector)
      if (element) {
        // Store original if not already stored
        if (!originalContent[key]) {
          newOriginalContent[key] = element.textContent || ''
        }
        element.textContent = content
      }
    })

    if (Object.keys(newOriginalContent).length > 0) {
      setOriginalContent((prev: Record<string, string>) => ({ ...prev, ...newOriginalContent }))
    }
  }

  const restoreOriginalContent = () => {
    Object.entries(originalContent).forEach(([key, content]) => {
      const element = document.querySelector(`[data-literary="${key}"]`)
      if (element && typeof content === 'string') {
        element.textContent = content
      }
    })
  }

  return null // This is a utility component with no UI
}
