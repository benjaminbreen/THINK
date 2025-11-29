'use client'

import { use } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, BookOpen, Beaker, FileText, GraduationCap, Tag } from 'lucide-react'
import { getContentByTag, slugToTag, tagToSlug, getAllTags, getTagCounts, type ContentType } from '@/lib/tags-data'

// Icon mapping for content types
const typeIcons: Record<ContentType, React.ReactNode> = {
  project: <Beaker className="h-4 w-4" />,
  resource: <FileText className="h-4 w-4" />,
  guide: <BookOpen className="h-4 w-4" />,
  assignment: <GraduationCap className="h-4 w-4" />
}

const typeLabels: Record<ContentType, string> = {
  project: 'Project',
  resource: 'Resource',
  guide: 'Guide',
  assignment: 'Assignment'
}

const typeColors: Record<ContentType, string> = {
  project: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200',
  resource: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
  guide: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
  assignment: 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200'
}

export default function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = use(params)
  const tag = slugToTag(tagSlug)
  const content = getContentByTag(tag)
  const allTags = getAllTags()
  const tagCounts = getTagCounts()

  // Group content by type
  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = []
    acc[item.type].push(item)
    return acc
  }, {} as Record<ContentType, typeof content>)

  return (
    <>
      <Section className="pt-24 pb-8">
        <Container>
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/tags">
                <ArrowLeft className="mr-2 h-4 w-4" /> All Tags
              </Link>
            </Button>
          </div>

          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Tag className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-4xl font-serif font-bold">{tag}</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                {content.length} item{content.length !== 1 ? 's' : ''} tagged with "{tag}"
              </p>
            </div>

            {/* Content Grid */}
            {content.length > 0 ? (
              <div className="space-y-12">
                {/* Projects */}
                {groupedContent.project && groupedContent.project.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Beaker className="h-5 w-5 text-cyan-600" />
                      Projects
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {groupedContent.project.map(item => (
                        <Link key={item.id} href={item.href}>
                          <Card className="h-full hover:shadow-lg transition-shadow group overflow-hidden">
                            {item.thumbnailPath && (
                              <div className="relative h-32 overflow-hidden">
                                <Image
                                  src={item.thumbnailPath}
                                  alt={item.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                              </div>
                            )}
                            <CardHeader className={item.thumbnailPath ? 'pt-3' : ''}>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={typeColors[item.type]} variant="secondary">
                                  {typeIcons[item.type]}
                                  <span className="ml-1">{typeLabels[item.type]}</span>
                                </Badge>
                                {item.year && (
                                  <span className="text-xs text-muted-foreground">{item.year}</span>
                                )}
                              </div>
                              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                {item.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">
                                {item.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assignments */}
                {groupedContent.assignment && groupedContent.assignment.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-violet-600" />
                      Assignments
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {groupedContent.assignment.map(item => (
                        <Link key={item.id} href={item.href}>
                          <Card className="h-full hover:shadow-lg transition-shadow group">
                            <CardHeader>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={typeColors[item.type]} variant="secondary">
                                  {typeIcons[item.type]}
                                  <span className="ml-1">{typeLabels[item.type]}</span>
                                </Badge>
                                {item.institution && (
                                  <span className="text-xs text-muted-foreground">{item.institution}</span>
                                )}
                              </div>
                              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                {item.title}
                              </CardTitle>
                              <CardDescription className="line-clamp-2">
                                {item.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guides */}
                {groupedContent.guide && groupedContent.guide.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-amber-600" />
                      Guides
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {groupedContent.guide.map(item => (
                        <Link key={item.id} href={item.href}>
                          <Card className="h-full hover:shadow-lg transition-shadow group">
                            <CardHeader>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={typeColors[item.type]} variant="secondary">
                                  {typeIcons[item.type]}
                                  <span className="ml-1">{typeLabels[item.type]}</span>
                                </Badge>
                              </div>
                              <CardTitle className="text-base group-hover:text-primary transition-colors">
                                {item.title}
                              </CardTitle>
                              <CardDescription className="text-sm line-clamp-2">
                                {item.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resources */}
                {groupedContent.resource && groupedContent.resource.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Resources
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {groupedContent.resource.map(item => (
                        <Link key={item.id} href={item.href}>
                          <Card className="h-full hover:shadow-lg transition-shadow group">
                            <CardHeader>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={typeColors[item.type]} variant="secondary">
                                  {typeIcons[item.type]}
                                  <span className="ml-1">{typeLabels[item.type]}</span>
                                </Badge>
                                {item.year && (
                                  <span className="text-xs text-muted-foreground">{item.year}</span>
                                )}
                              </div>
                              <CardTitle className="text-base group-hover:text-primary transition-colors">
                                {item.title}
                              </CardTitle>
                              {item.author && (
                                <p className="text-xs text-muted-foreground">{item.author}</p>
                              )}
                              <CardDescription className="text-sm line-clamp-2">
                                {item.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No content found for this tag.</p>
                <Button asChild variant="outline">
                  <Link href="/tags">Browse all tags</Link>
                </Button>
              </div>
            )}

            {/* Related Tags */}
            <div className="mt-16 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Related Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags
                  .filter(t => t !== tag)
                  .slice(0, 20)
                  .map(relatedTag => (
                    <Link key={relatedTag} href={`/tags/${tagToSlug(relatedTag)}`}>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 transition-colors"
                      >
                        {relatedTag}
                        <span className="ml-1 text-muted-foreground">({tagCounts[relatedTag]})</span>
                      </Badge>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
