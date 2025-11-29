import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  // Note: No default padding - each page controls its own spacing via className
  // This avoids Tailwind specificity issues where passed classes couldn't override defaults
  return (
    <section id={id} className={cn(className)}>
      {children}
    </section>
  )
}
