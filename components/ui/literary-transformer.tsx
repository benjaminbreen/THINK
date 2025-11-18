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
}

export function LiteraryTransformer() {
  const [currentStyle, setCurrentStyle] = useState<string | null>(null)
  const [originalContent, setOriginalContent] = useState<Record<string, string>>({})

  useEffect(() => {
    // Check for saved style on mount
    if (typeof window !== 'undefined') {
      const savedStyle = localStorage.getItem('THINK_textStyle')
      if (savedStyle && styleTransformations[savedStyle as keyof typeof styleTransformations]) {
        setCurrentStyle(savedStyle)
      }
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
