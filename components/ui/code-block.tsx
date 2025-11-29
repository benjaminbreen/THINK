'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  /** The code content */
  code: string
  /** Programming language for syntax highlighting label */
  language?: string
  /** Filename to display */
  filename?: string
  /** Show line numbers */
  showLineNumbers?: boolean
  /** Starting line number */
  startLine?: number
  /** Highlight specific lines (1-indexed) */
  highlightLines?: number[]
  /** Additional CSS classes */
  className?: string
}

export function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = true,
  startLine = 1,
  highlightLines = [],
  className
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const lines = code.split('\n')
  // Remove last empty line if present
  if (lines[lines.length - 1] === '') {
    lines.pop()
  }

  return (
    <div className={cn('relative group rounded-lg overflow-hidden border bg-muted/30', className)}>
      {/* Header bar */}
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <div className="flex items-center gap-3">
            {/* Traffic light dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            {filename && (
              <span className="text-xs font-mono text-muted-foreground">{filename}</span>
            )}
          </div>
          {language && (
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>
      )}

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={cn(
          'absolute top-2 right-2 p-2 rounded-md',
          'bg-background/80 backdrop-blur-sm border',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
          'hover:bg-background',
          'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          (filename || language) && 'top-12'
        )}
        aria-label={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="py-4 text-sm leading-relaxed">
          <code>
            {lines.map((line, index) => {
              const lineNumber = startLine + index
              const isHighlighted = highlightLines.includes(lineNumber)

              return (
                <div
                  key={index}
                  className={cn(
                    'px-4 flex',
                    isHighlighted && 'bg-primary/10 border-l-2 border-primary'
                  )}
                >
                  {showLineNumbers && (
                    <span className="select-none text-muted-foreground/50 text-right w-8 mr-4 flex-shrink-0">
                      {lineNumber}
                    </span>
                  )}
                  <span className="flex-1 font-mono whitespace-pre">{line || ' '}</span>
                </div>
              )
            })}
          </code>
        </pre>
      </div>
    </div>
  )
}
