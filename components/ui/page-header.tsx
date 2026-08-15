'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: React.ReactNode
  /** Small label above the title */
  eyebrow?: string
  /** Hex color for the rule under the title; falls back to the primary token */
  accent?: string
  align?: 'center' | 'left'
  /** Notified when the title block is hovered, for pages that react to it */
  onHoverChange?: (hovered: boolean) => void
  /** Controls, badges or filters rendered under the description */
  children?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  eyebrow,
  accent,
  align = 'center',
  onHoverChange,
  children,
  className,
}: PageHeaderProps) {
  const [hovered, setHovered] = useState(false)
  const centered = align === 'center'

  const setHover = (value: boolean) => {
    setHovered(value)
    onHoverChange?.(value)
  }

  return (
    <div
      className={cn(
        'mx-auto flex max-w-3xl flex-col',
        centered ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}

      <div
        className={cn('inline-block', centered && 'mx-auto')}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h1 className="text-display font-serif font-bold text-foreground">{title}</h1>
        {/* Rule grows to the full width of the title on hover */}
        <div
          className={cn(
            'mt-2 h-[2px] rounded-full transition-[width] duration-500 ease-out-expo',
            centered && 'mx-auto'
          )}
          style={{
            backgroundColor: accent ?? 'hsl(var(--primary))',
            width: hovered ? '100%' : '3.5rem',
          }}
        />
      </div>

      {description && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg',
            centered ? 'max-w-2xl' : 'max-w-2xl'
          )}
        >
          {description}
        </p>
      )}

      {children && <div className="mt-6 w-full">{children}</div>}
    </div>
  )
}
