'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b bg-muted/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-2 py-3 text-sm overflow-x-auto">
          {items.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && (
                <ChevronRight
                  className="h-4 w-4 text-muted-foreground flex-shrink-0 animate-breadcrumb-chevron opacity-0"
                  style={{ animationDelay: `${index * 80 + 40}ms` }}
                />
              )}
              <li
                className="flex items-center whitespace-nowrap animate-breadcrumb-item opacity-0"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {item.href && index < items.length - 1 ? (
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-0.5 transform duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={index === items.length - 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </nav>
  )
}
