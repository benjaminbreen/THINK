import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReadingTimeProps {
  /** Reading time in minutes */
  minutes: number
  /** Additional CSS classes */
  className?: string
  /** Show clock icon */
  showIcon?: boolean
}

export function ReadingTime({ minutes, className, showIcon = true }: ReadingTimeProps) {
  const label = minutes === 1 ? '1 min read' : `${minutes} min read`

  return (
    <span className={cn('inline-flex items-center gap-1.5 text-sm text-muted-foreground', className)}>
      {showIcon && <Clock className="h-3.5 w-3.5" />}
      <span>{label}</span>
    </span>
  )
}
