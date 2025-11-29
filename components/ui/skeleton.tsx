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
        'animate-pulse rounded-md bg-muted/60',
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
    <div className="rounded-lg border bg-card p-6 space-y-4">
      {/* Image placeholder */}
      <Skeleton className="h-36 w-full rounded-lg" />
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
          style={{ width: `${Math.random() * 20 + 75}%` }}
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
    <div className="space-y-8 max-w-3xl">
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
      <Skeleton className="h-48 w-full rounded-lg" />
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
