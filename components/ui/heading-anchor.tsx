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
    ? "group flex scroll-mt-24 items-center gap-3 font-serif"
    : level === 3
    ? "group mb-4 mt-8 flex scroll-mt-24 items-center gap-3 font-serif text-headline font-semibold"
    : "group mb-3 mt-0 flex scroll-mt-24 items-center gap-3 font-serif text-lg font-semibold"

  return (
    <Tag id={id} className={className}>
      <span className="flex-1">{children}</span>
      <Button
        variant="ghost"
        size="icon"
        className="reveal-on-hover h-8 w-8 flex-shrink-0 rounded-full"
        onClick={handleCopy}
        aria-label={copied ? 'Link copied' : 'Copy link to section'}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-600" />
        ) : (
          <LinkIcon className="h-3.5 w-3.5" />
        )}
      </Button>
    </Tag>
  )
}
