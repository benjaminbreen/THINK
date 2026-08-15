'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { BackToTop } from '@/components/ui/back-to-top'
import { siteConfig } from '@/lib/config'
import { ArrowLeft, Download, ExternalLink, BookOpen, Clock, Users, Target, Copy, Check, Share2, FileText } from 'lucide-react'

export interface LearningObjective {
  text: string
}

export interface SuggestedReading {
  title: string
  author?: string
  url?: string
  description?: string
}

export interface RelatedAssignment {
  title: string
  slug: string
  type: string
  description: string
}

export interface AssignmentDetailData {
  title: string
  slug: string
  description: string
  type: string
  tags: string[]
  thumbnailPath?: string
  pdfPath?: string
  sampleSubmissionUrl?: string
  courseName?: string
  courseCode?: string
  institution?: string
  gradeLevel?: string
  author?: string
  duration?: string
  groupSize?: string
  learningObjectives: LearningObjective[]
  fullText: React.ReactNode
  suggestedReadings?: SuggestedReading[]
  relatedAssignments?: RelatedAssignment[]
}

interface AssignmentDetailLayoutProps {
  assignment: AssignmentDetailData
}

export function AssignmentDetailLayout({ assignment }: AssignmentDetailLayoutProps) {
  // Only attempt to load image if thumbnail path is explicitly provided
  const hasCustomThumbnail = !!assignment.thumbnailPath
  const [imageError, setImageError] = useState(!hasCustomThumbnail)
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const thumbnailPath = assignment.thumbnailPath || ''

  // Generate citation
  const currentYear = new Date().getFullYear()
  const citation = `${assignment.author || 'THINK Project'}. "${assignment.title}." THINK @ UCSC, ${currentYear}. ${siteConfig.url}/pedagogy/assignments/${assignment.slug}`

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    const shareUrl = `${siteConfig.url}/pedagogy/assignments/${assignment.slug}`
    const shareData = {
      title: assignment.title,
      text: assignment.description,
      url: shareUrl
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(shareUrl)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch (err) {
      // User cancelled or error - silently fail
      console.log('Share cancelled or failed')
    }
  }

  const handleDownloadPdf = async () => {
    setGeneratingPdf(true)

    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default

      // Create a styled container for the PDF
      const pdfContent = document.createElement('div')
      pdfContent.innerHTML = `
        <div style="font-family: 'Georgia', serif; padding: 40px; max-width: 800px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #7c3aed;">
            <h1 style="font-size: 28px; color: #1f2937; margin-bottom: 8px;">${assignment.title}</h1>
            <p style="color: #6b7280; font-size: 14px;">
              ${assignment.courseName ? `${assignment.courseName}` : ''}${assignment.institution ? ` • ${assignment.institution}` : ''}
            </p>
            ${assignment.author ? `<p style="color: #6b7280; font-size: 13px; margin-top: 4px;">By ${assignment.author}</p>` : ''}
          </div>

          <div style="background: #f3f4f6; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0;">${assignment.description}</p>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; font-size: 13px; color: #6b7280;">
            ${assignment.duration ? `<span>⏱ ${assignment.duration}</span>` : ''}
            ${assignment.groupSize ? `<span>👥 ${assignment.groupSize}</span>` : ''}
            ${assignment.gradeLevel ? `<span>📚 ${assignment.gradeLevel}</span>` : ''}
          </div>

          ${assignment.learningObjectives.length > 0 ? `
            <div style="margin-bottom: 28px;">
              <h2 style="font-size: 18px; color: #7c3aed; margin-bottom: 12px; font-weight: 600;">Learning Objectives</h2>
              <ol style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.8;">
                ${assignment.learningObjectives.map(obj => `<li style="margin-bottom: 6px;">${obj.text}</li>`).join('')}
              </ol>
            </div>
          ` : ''}

          <div style="margin-bottom: 28px;">
            <h2 style="font-size: 18px; color: #7c3aed; margin-bottom: 12px; font-weight: 600;">Assignment Details</h2>
            <div id="assignment-content" style="color: #374151; font-size: 14px; line-height: 1.7;">
              ${contentRef.current?.innerHTML || ''}
            </div>
          </div>

          ${assignment.suggestedReadings && assignment.suggestedReadings.length > 0 ? `
            <div style="margin-bottom: 28px; page-break-before: auto;">
              <h2 style="font-size: 18px; color: #7c3aed; margin-bottom: 12px; font-weight: 600;">Suggested Readings</h2>
              <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 13px; line-height: 1.7;">
                ${assignment.suggestedReadings.map(reading => `
                  <li style="margin-bottom: 10px;">
                    <strong>${reading.title}</strong>${reading.author ? ` by ${reading.author}` : ''}
                    ${reading.description ? `<br><span style="color: #6b7280;">${reading.description}</span>` : ''}
                    ${reading.url ? `<br><span style="color: #7c3aed; font-size: 12px;">${reading.url}</span>` : ''}
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; text-align: center;">
            <p style="margin: 0;">THINK @ UC Santa Cruz • think.ucsc.edu</p>
            <p style="margin: 4px 0 0 0;">This work is licensed under CC BY-NC-SA 4.0</p>
          </div>
        </div>
      `

      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `${assignment.slug}-assignment.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      }

      await html2pdf().set(opt).from(pdfContent).save()
    } catch (err) {
      console.error('PDF generation failed:', err)
      alert('PDF generation failed. Please try again.')
    } finally {
      setGeneratingPdf(false)
    }
  }

  // Color-code tags
  const getTagColor = (tag: string) => {
    const tagLower = tag.toLowerCase()
    if (tagLower.includes('history')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
    if (tagLower.includes('ai') || tagLower.includes('literacy')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
    if (tagLower.includes('critical') || tagLower.includes('theory')) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
    if (tagLower.includes('research') || tagLower.includes('analysis')) return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
    if (tagLower.includes('writing') || tagLower.includes('reflection')) return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200'
    if (tagLower.includes('technical') || tagLower.includes('data') || tagLower.includes('digital')) return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200'
    if (tagLower.includes('primary') || tagLower.includes('sources')) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
    return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
  }

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Pedagogy', href: '/pedagogy' },
        { label: assignment.title }
      ]} />

      {/* Hero Banner with Thumbnail */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        {!imageError && thumbnailPath ? (
          <>
            <Image
              src={thumbnailPath}
              alt={assignment.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-100 to-violet-300 dark:from-violet-900/30 dark:to-violet-800/50">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}

        {/* Type badge */}
        <div className="absolute top-6 left-6">
          <Badge className="bg-violet-600 text-white text-sm px-3 py-1 shadow-lg">
            {assignment.type}
          </Badge>
        </div>
      </div>

      <Section className="pt-0 pb-8 -mt-24 relative z-10">
        <Container>
          {/* Back button */}
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm" className="bg-background/80 backdrop-blur-sm">
              <Link href="/pedagogy">
                <ArrowLeft className="h-4 w-4" /> Back to Pedagogy
              </Link>
            </Button>
          </div>

          {/* Header Card */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-8">
              {/* Share button - upper right */}
              <div className="flex justify-end mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  {shared ? (
                    <>
                      <Check className="h-4 w-4" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4" />
                      Share
                    </>
                  )}
                </Button>
              </div>

              {/* Course info line */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                {assignment.courseCode && (
                  <Badge variant="outline" className="font-mono">{assignment.courseCode}</Badge>
                )}
                {assignment.courseName && (
                  <span className="font-medium text-foreground">{assignment.courseName}</span>
                )}
                {assignment.institution && (
                  <>
                    <span>•</span>
                    <span>{assignment.institution}</span>
                  </>
                )}
                {assignment.gradeLevel && (
                  <>
                    <span>•</span>
                    <span>{assignment.gradeLevel}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="mb-4 text-display font-serif font-bold">
                {assignment.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {assignment.description}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                {assignment.author && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>By {assignment.author}</span>
                  </div>
                )}
                {assignment.duration && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{assignment.duration}</span>
                  </div>
                )}
                {assignment.groupSize && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{assignment.groupSize}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {assignment.tags.map((tag) => (
                  <Badge key={tag} className={`${getTagColor(tag)}`}>
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {assignment.pdfPath && (
                  <Button asChild size="lg">
                    <a href={assignment.pdfPath} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      Download Assignment PDF
                    </a>
                  </Button>
                )}
                {assignment.sampleSubmissionUrl && (
                  <Button asChild variant="outline" size="lg">
                    <a href={assignment.sampleSubmissionUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      View Sample Submission
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Learning Objectives */}
          {assignment.learningObjectives.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Target className="h-5 w-5 text-violet-600" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {assignment.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-sm font-medium flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{objective.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Full Assignment Text */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen className="h-5 w-5 text-violet-600" />
                    Assignment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div ref={contentRef} className="prose prose-lg max-w-none dark:prose-invert">
                    {assignment.fullText}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Download PDF Button */}
              <Card className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/50 dark:to-green-900/30 border-emerald-200 dark:border-emerald-800">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-600 rounded-lg">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Download Assignment</h3>
                      <p className="text-xs text-muted-foreground">Get a printable PDF version</p>
                    </div>
                  </div>
                  <Button
                    onClick={handleDownloadPdf}
                    disabled={generatingPdf}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                  >
                    {generatingPdf ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Download as PDF
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Suggested Readings */}
              {assignment.suggestedReadings && assignment.suggestedReadings.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Suggested Readings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {assignment.suggestedReadings.map((reading, index) => (
                        <li key={index} className="border-b border-border/50 last:border-0 pb-3 last:pb-0">
                          {reading.url ? (
                            <a
                              href={reading.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-primary hover:underline"
                            >
                              {reading.title}
                            </a>
                          ) : (
                            <span className="font-medium">{reading.title}</span>
                          )}
                          {reading.author && (
                            <p className="text-sm text-muted-foreground">{reading.author}</p>
                          )}
                          {reading.description && (
                            <p className="text-sm text-muted-foreground mt-1">{reading.description}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* License */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">License</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-sm">Creative Commons</p>
                      <p className="text-xs text-muted-foreground">CC BY-NC-SA 4.0</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
                  </p>
                </CardContent>
              </Card>

              {/* Citation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cite This Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 font-mono bg-muted/50 p-3 rounded-lg">
                    {citation}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={handleCopyCitation}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy Citation
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Assignments */}
          {assignment.relatedAssignments && assignment.relatedAssignments.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-serif font-bold mb-6">Related Assignments</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {assignment.relatedAssignments.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/pedagogy/assignments/${related.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-violet-200 dark:hover:border-violet-800">
                      <CardContent className="p-5">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {related.type}
                        </Badge>
                        <h3 className="font-semibold mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
      <BackToTop />
    </>
  )
}
