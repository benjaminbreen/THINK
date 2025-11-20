'use client'

import { useState } from 'react'
import { Link as LinkIcon, Check } from 'lucide-react'
import { Button } from './button'

interface HeadingAnchorProps {
  id: string
  children: React.ReactNode
  level?: 2 | 3 | 4
}

export function HeadingAnchor({ id, children, level = 2 }: HeadingAnchorProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const Tag = `h${level}` as 'h2' | 'h3' | 'h4'
  const className = level === 2
    ? "font-serif scroll-mt-24 group flex items-center gap-3"
    : level === 3
    ? "font-sans text-xl font-semibold mt-8 mb-4 scroll-mt-24 group flex items-center gap-3"
    : "font-sans text-base font-semibold mt-0 mb-3 scroll-mt-24 group flex items-center gap-3"

  return (
    <Tag id={id} className={className}>
      <span className="flex-1">{children}</span>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleCopy}
          aria-label={copied ? "Link copied" : "Copy link to section"}
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-600" />
          ) : (
            <LinkIcon className="h-3 w-3" />
          )}
        </Button>
      </div>
    </Tag>
  )
}
