import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  // Gutters live in `.gutter` (globals.css) so they can respect safe-area insets
  return (
    <div className={cn('mx-auto w-full max-w-7xl gutter', className)}>
      {children}
    </div>
  )
}
