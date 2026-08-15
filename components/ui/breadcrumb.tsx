'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'
import { Container } from '@/components/ui/container'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border/60 bg-muted/25">
      <Container>
        {/* Long trails scroll sideways instead of clipping the current page */}
        <ol className="flex items-center gap-1.5 overflow-x-auto py-3 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <Fragment key={index}>
                {index > 0 && (
                  <ChevronRight
                    className="h-3.5 w-3.5 flex-shrink-0 animate-breadcrumb-chevron text-muted-foreground/60 opacity-0"
                    style={{ animationDelay: `${index * 80 + 40}ms` }}
                    aria-hidden="true"
                  />
                )}
                <li
                  className="flex animate-breadcrumb-item items-center whitespace-nowrap opacity-0"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="rounded px-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={isLast ? 'page' : undefined}
                      className={
                        isLast
                          ? 'px-1 py-0.5 font-medium text-foreground'
                          : 'px-1 py-0.5 text-muted-foreground'
                      }
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              </Fragment>
            )
          })}
        </ol>
      </Container>
    </nav>
  )
}
