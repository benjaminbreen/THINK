'use client'

import { useState, useCallback } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  textToCopy: string
  /** Label shown before copying */
  label?: string
  /** Label shown after copying */
  copiedLabel?: string
  /** Duration to show "copied" state in ms */
  copiedDuration?: number
}

export function CopyButton({
  textToCopy,
  label = 'Copy',
  copiedLabel = 'Copied!',
  copiedDuration = 2000,
  className,
  variant = 'outline',
  size = 'sm',
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), copiedDuration)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [textToCopy, copiedDuration])

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('relative overflow-hidden group', className)}
      onClick={handleCopy}
      {...props}
    >
      {/* Container for icon and text with transition */}
      <span className={cn(
        'inline-flex items-center transition-all duration-300 ease-out',
        copied ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
      )}>
        {/* Copy icon */}
        <svg
          className="mr-2 h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {label}
      </span>

      {/* Copied state with animated checkmark */}
      <span className={cn(
        'absolute inset-0 inline-flex items-center justify-center transition-all duration-300 ease-out',
        copied ? 'opacity-100 scale-100' : 'opacity-0 scale-125'
      )}>
        {/* Animated checkmark */}
        <svg
          className={cn(
            'mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400',
            copied && 'animate-checkmark'
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M4 12l5 5L20 6"
            className={cn(
              'transition-all duration-300',
              copied ? 'stroke-dashoffset-0' : ''
            )}
            style={{
              strokeDasharray: 24,
              strokeDashoffset: copied ? 0 : 24,
              transition: 'stroke-dashoffset 0.4s ease-out 0.1s'
            }}
          />
        </svg>
        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
          {copiedLabel}
        </span>
      </span>
    </Button>
  )
}
