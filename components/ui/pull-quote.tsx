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
          'font-serif text-lg leading-relaxed sm:text-xl md:text-2xl',
          'text-foreground/90',
          'relative',
          // Remove default blockquote styling when inside pull quote
          '[&]:border-0 [&]:pl-0 [&]:before:hidden [&]:italic'
        )}
      >
        <span aria-hidden="true" className="mr-0.5 font-serif text-3xl leading-none text-primary/40">&ldquo;</span>
        {children}
        <span aria-hidden="true" className="ml-0.5 font-serif text-3xl leading-none text-primary/40">&rdquo;</span>
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 text-sm text-muted-foreground">
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}
