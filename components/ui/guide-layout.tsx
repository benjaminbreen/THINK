'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { BackToTop } from '@/components/ui/back-to-top'
import { GuideBanner } from '@/components/ui/guide-banner'
import { MazeLogo } from '@/components/ui/maze-logo'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/structured-data'
import { ArrowLeft, Calendar, Clock, BookOpen, ExternalLink, X, Minus, Plus, Type } from 'lucide-react'

interface TableOfContentsItem {
  id: string
  title: string
  level?: number // 1 = main section, 2 = subsection
}

interface GuideAuthor {
  name: string
  avatar?: string
  role?: string
}

interface GuideLayoutProps {
  title: string
  subtitle: string
  guideId: string
  thumbnailPath?: string
  author?: GuideAuthor
  lastUpdated?: string
  readingTime?: string
  tableOfContents: TableOfContentsItem[]
  children: React.ReactNode
}

/* GuideLayout exposes its Wikipedia fetcher so the WikiLink components
   rendered inside MDX content can reach it without prop drilling. */
declare global {
  interface Window {
    __fetchWikipedia?: (searchTerm: string) => void
  }
}

interface WikipediaData {
  title: string
  extract: string
  thumbnail?: {
    source: string
    width: number
    height: number
  }
  pageUrl: string
}

export function GuideLayout({
  title,
  subtitle,
  guideId,
  thumbnailPath,
  author,
  lastUpdated,
  readingTime,
  tableOfContents,
  children
}: GuideLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [sidebarTab, setSidebarTab] = useState<'toc' | 'wikipedia'>('toc')
  const [wikipediaData, setWikipediaData] = useState<WikipediaData | null>(null)
  const [wikipediaLoading, setWikipediaLoading] = useState(false)
  const [wikipediaError, setWikipediaError] = useState<string | null>(null)
  const [fontSize, setFontSize] = useState<number>(110) // percentage, 110 = 10% larger default

  // Font size controls
  const decreaseFontSize = () => setFontSize(prev => Math.max(80, prev - 10))
  const increaseFontSize = () => setFontSize(prev => Math.min(140, prev + 10))
  const resetFontSize = () => setFontSize(110)

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    tableOfContents.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [tableOfContents])

  // Fetch Wikipedia data
  const fetchWikipedia = useCallback(async (searchTerm: string) => {
    setWikipediaLoading(true)
    setWikipediaError(null)
    setSidebarTab('wikipedia')

    try {
      // Search for the page first
      const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`
      const response = await fetch(searchUrl)

      if (!response.ok) {
        throw new Error('Article not found')
      }

      const data = await response.json()

      setWikipediaData({
        title: data.title,
        extract: data.extract,
        thumbnail: data.thumbnail,
        pageUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`
      })
    } catch (err) {
      setWikipediaError(`Could not find Wikipedia article for "${searchTerm}"`)
      setWikipediaData(null)
    } finally {
      setWikipediaLoading(false)
    }
  }, [])

  // Make fetchWikipedia available globally for WikiLink components
  useEffect(() => {
    window.__fetchWikipedia = fetchWikipedia
    return () => {
      delete window.__fetchWikipedia
    }
  }, [fetchWikipedia])

  return (
    <>
      <ArticleJsonLd
        title={title}
        description={subtitle}
        author={author?.name}
        dateModified={lastUpdated}
        image={thumbnailPath}
        slug={`guides/${guideId}`}
        section="Educational Guide"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Guides', url: '/guides' },
          { name: title, url: `/guides/${guideId}` },
        ]}
      />

      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: title }
      ]} />

      <Section className="pt-8 pb-16">
        <Container>
          {thumbnailPath && (
            <GuideBanner
              thumbnailPath={thumbnailPath}
              guideTitle={title}
              guideId={guideId}
            />
          )}

          <div className="mb-8">
            <Button asChild variant="ghost" size="sm" className="-ml-3 group">
              <Link href="/guides">
                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                Back to Guides
              </Link>
            </Button>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 space-y-4">
                {/* Tab Buttons */}
                <div className="flex rounded-full border border-border bg-muted/50 p-1" role="tablist" aria-label="Sidebar navigation">
                  <button
                    role="tab"
                    aria-selected={sidebarTab === 'toc'}
                    aria-controls="toc-panel"
                    onClick={() => setSidebarTab('toc')}
                    className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                      sidebarTab === 'toc'
                        ? 'bg-card text-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    On This Page
                  </button>
                  <button
                    role="tab"
                    aria-selected={sidebarTab === 'wikipedia'}
                    aria-controls="wikipedia-panel"
                    onClick={() => setSidebarTab('wikipedia')}
                    className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                      sidebarTab === 'wikipedia'
                        ? 'bg-card text-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Wikipedia
                  </button>
                </div>

                {/* TOC Panel */}
                {sidebarTab === 'toc' && (
                  <div
                    id="toc-panel"
                    role="tabpanel"
                    aria-labelledby="toc-tab"
                    className="rounded-2xl border border-border/60 bg-muted/30 p-5 sm:p-6"
                  >
                    <h3 className="eyebrow mb-4">
                      On This Page
                    </h3>
                    <nav className="space-y-1 text-sm" aria-label="Table of contents">
                      {tableOfContents.map(({ id, title, level = 1 }) => (
                        <a
                          key={id}
                          href={`#${id}`}
                          className={`flex min-h-[34px] items-center rounded-md py-1.5 transition-colors ${
                            level === 2 ? 'pl-6 pr-3 text-xs' : 'px-3'
                          } ${
                            activeSection === id
                              ? 'bg-primary/10 text-primary font-medium'
                              : level === 2
                                ? 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                                : 'text-foreground/70 hover:text-primary hover:bg-muted/50'
                          }`}
                        >
                          {title}
                        </a>
                      ))}
                    </nav>

                    {/* Font Size Control */}
                    <div className="mt-6 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Type className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">Font Size</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={decreaseFontSize}
                            disabled={fontSize <= 80}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Decrease font size"
                          >
                            <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                          <button
                            onClick={resetFontSize}
                            className="inline-flex h-8 min-w-[40px] items-center justify-center rounded-md font-mono text-[11px] font-medium tabular-nums text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            aria-label="Reset font size"
                          >
                            {fontSize}%
                          </button>
                          <button
                            onClick={increaseFontSize}
                            disabled={fontSize >= 140}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Increase font size"
                          >
                            <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wikipedia Panel */}
                {sidebarTab === 'wikipedia' && (
                  <div
                    id="wikipedia-panel"
                    role="tabpanel"
                    aria-labelledby="wikipedia-tab"
                    className="rounded-2xl border border-border/60 bg-muted/30 p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="eyebrow flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Wikipedia
                      </h3>
                      {wikipediaData && (
                        <button
                          onClick={() => setWikipediaData(null)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-muted"
                          aria-label="Close Wikipedia panel"
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>

                    {wikipediaLoading && (
                      <div className="space-y-3">
                        <div className="h-4 bg-muted animate-pulse rounded" />
                        <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                        <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
                      </div>
                    )}

                    {wikipediaError && (
                      <p className="text-sm text-muted-foreground">{wikipediaError}</p>
                    )}

                    {!wikipediaLoading && !wikipediaError && !wikipediaData && (
                      <p className="text-sm text-muted-foreground">
                        Click on a <span className="wiki-link-example">highlighted term</span> in the guide to see its Wikipedia article here.
                      </p>
                    )}

                    {wikipediaData && (
                      <div className="space-y-4">
                        {wikipediaData.thumbnail && (
                          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                            <Image
                              src={wikipediaData.thumbnail.source}
                              alt={wikipediaData.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <h4 className="font-serif text-lg font-semibold">
                          {wikipediaData.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {wikipediaData.extract}
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <a
                            href={wikipediaData.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read on Wikipedia
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="mx-auto max-w-3xl">
                {/* Header */}
                <header className="mb-12">
                  <h1 className="mb-4 text-display-lg font-serif font-bold">
                    {title}
                  </h1>
                  <p className="mb-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                    {subtitle}
                  </p>

                  {/* Author & Meta */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-border/70 pb-8">
                    {author && (
                      <div className="flex items-center gap-3">
                        {author.avatar ? (
                          <Image
                            src={author.avatar}
                            alt={author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold text-sm">
                              {author.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm">{author.name}</p>
                          {author.role && (
                            <p className="text-xs text-muted-foreground">{author.role}</p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {lastUpdated && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>Updated {lastUpdated}</span>
                        </div>
                      )}
                      {readingTime && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{readingTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </header>

                {/* Content */}
                <div
                  className="guide-content prose prose-xl max-w-none transition-all duration-200"
                  style={{ fontSize: `${fontSize}%` }}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <BackToTop />
    </>
  )
}

// WikiLink component for inline Wikipedia links
export function WikiLink({
  term,
  children
}: {
  term: string
  children: React.ReactNode
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.__fetchWikipedia?.(term)
  }

  return (
    <button
      onClick={handleClick}
      className="wiki-link inline text-inherit underline decoration-dotted decoration-primary/50 underline-offset-2 hover:decoration-solid hover:font-medium hover:text-primary transition-all cursor-pointer"
      title={`Learn about ${term} on Wikipedia`}
    >
      {children}
    </button>
  )
}

// Section Divider component with maze logo
export function GuideSectionDivider() {
  return (
    <div className="my-16 flex items-center gap-4" aria-hidden="true">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <MazeLogo className="w-6 h-6 text-primary/50 hover:text-primary transition-colors" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  )
}
