import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  /** Enable ripple effect on click */
  ripple?: boolean
}

const buttonStyles = (variant: string, size: string, className?: string) =>
  cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    {
      'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
      'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
    },
    {
      'h-10 px-4 py-2': size === 'default',
      'h-9 rounded-md px-3 text-sm': size === 'sm',
      'h-11 rounded-md px-8 text-lg': size === 'lg',
      'h-10 w-10': size === 'icon',
    },
    className
  )

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ripple = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    // Simple path for non-ripple buttons (most common case)
    if (!ripple) {
      return (
        <Comp
          className={buttonStyles(variant, size, className)}
          ref={ref}
          {...props}
        />
      )
    }

    // Ripple button requires 'use client' context - import dynamically or use inline
    return (
      <RippleButton
        className={buttonStyles(variant, size, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

// Separate component for ripple functionality to avoid state in non-ripple buttons
const RippleButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, children, ...props }, ref) => {
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number; size: number }>>([])
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useImperativeHandle(ref, () => buttonRef.current!)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const size = Math.max(rect.width, rect.height) * 2
      const id = Date.now()

      setRipples(prev => [...prev, { id, x, y, size }])
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600)
    }
    onClick?.(e)
  }

  return (
    <button
      className={cn('relative overflow-hidden', className)}
      ref={buttonRef}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-current opacity-20 animate-ripple pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  )
})
RippleButton.displayName = 'RippleButton'

export { Button }
