import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

/**
 * Base skeleton component with shimmer animation
 */
export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted-foreground/10',
        className
      )}
      style={style}
    />
  )
}

/**
 * Skeleton for card content - matches ProjectCard shape
 */
export function CardSkeleton() {
  return (
    <div className="space-y-4 overflow-hidden rounded-xl border border-border/70 bg-card p-5 sm:p-6">
      {/* Image placeholder */}
      <Skeleton className="aspect-[16/10] w-full rounded-lg" />
      {/* Badge and date row */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
      {/* Title */}
      <Skeleton className="h-6 w-3/4" />
      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      {/* Tags */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  )
}

/* Fixed rag widths — random ones differ between server and client render */
const LINE_WIDTHS = ['96%', '88%', '92%', '79%', '85%']

/**
 * Skeleton for text content - paragraph blocks
 */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{ width: LINE_WIDTHS[i % LINE_WIDTHS.length] }}
        />
      ))}
    </div>
  )
}

/**
 * Skeleton for guide/article page
 */
export function ArticleSkeleton() {
  return (
    <div className="max-w-3xl space-y-8">
      {/* Title */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      {/* Content blocks */}
      <TextSkeleton lines={4} />
      <Skeleton className="h-48 w-full rounded-xl" />
      <TextSkeleton lines={5} />
      <TextSkeleton lines={3} />
    </div>
  )
}

/**
 * Skeleton for sidebar navigation
 */
export function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-32" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  )
}
