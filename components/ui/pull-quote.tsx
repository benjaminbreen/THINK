import { cn } from '@/lib/utils'

interface PullQuoteProps {
  /** The quote text */
  children: React.ReactNode
  /** Attribution/source */
  attribution?: string
  /** Visual style variant */
  variant?: 'default' | 'accent' | 'subtle'
  /** Additional CSS classes */
  className?: string
}

/**
 * Pull quote component for highlighting key passages in articles
 * Designed to break up walls of text with emphasis on important ideas
 */
export function PullQuote({
  children,
  attribution,
  variant = 'default',
  className
}: PullQuoteProps) {
  return (
    <figure
      className={cn(
        'my-8 mx-0 md:-mx-4 lg:-mx-8',
        'py-6 px-6 md:px-8',
        'border-y',
        variant === 'default' && 'border-border bg-muted/20',
        variant === 'accent' && 'border-primary/30 bg-primary/5',
        variant === 'subtle' && 'border-transparent bg-transparent',
        className
      )}
    >
      <blockquote
        className={cn(
          'text-xl md:text-2xl font-serif leading-relaxed',
          'text-foreground/90',
          'relative',
          // Remove default blockquote styling when inside pull quote
          '[&]:border-0 [&]:pl-0 [&]:before:hidden [&]:italic'
        )}
      >
        <span className="text-primary/40 text-4xl font-serif leading-none mr-1">"</span>
        {children}
        <span className="text-primary/40 text-4xl font-serif leading-none ml-1">"</span>
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-sm text-muted-foreground">
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}
