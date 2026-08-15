'use client'

import { useState } from 'react'
import { Twitter, Linkedin, Link2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SocialShareProps {
  title: string
  url: string
  description?: string
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)
  const encodedDescription = encodeURIComponent(description || '')

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <span className="mr-1.5 text-sm text-muted-foreground">Share:</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 rounded-full p-0"
        asChild
        aria-label="Share on Twitter"
      >
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 rounded-full p-0"
        asChild
        aria-label="Share on LinkedIn"
      >
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 rounded-full p-0"
        onClick={copyToClipboard}
        aria-label={copied ? 'Link copied' : 'Copy link'}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
