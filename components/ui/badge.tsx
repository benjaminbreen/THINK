import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  /** Sizes the badge as a tappable filter chip rather than a static label */
  interactive?: boolean
}

function Badge({ className, variant = 'default', interactive = false, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5',
        'transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        {
          'border-transparent bg-primary text-primary-foreground': variant === 'default',
          'border-transparent bg-secondary text-secondary-foreground': variant === 'secondary',
          'border-border bg-transparent text-muted-foreground': variant === 'outline',
          'border-transparent bg-destructive text-destructive-foreground': variant === 'destructive',
        },
        // Comfortable 36px tap target with a slightly larger label
        interactive && 'cursor-pointer select-none px-3.5 py-1.5 text-[0.8125rem] font-semibold active:scale-[0.97]',
        className
      )}
      {...props}
    />
  )
}

export { Badge }
