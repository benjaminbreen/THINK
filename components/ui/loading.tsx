'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
    </div>
  )
}

interface LoadingDotsProps {
  className?: string
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" />
    </div>
  )
}

interface LoadingSkeletonProps {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gradient-to-r from-muted via-muted/70 to-muted bg-[length:200%_100%]',
        className
      )}
      style={{
        animation: 'shimmer 1.5s ease-in-out infinite',
      }}
    />
  )
}

interface PageLoadingProps {
  message?: string
}

export function PageLoading({ message = 'Loading...' }: PageLoadingProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl animate-pulse" />

        {/* Main spinner */}
        <div className="relative h-16 w-16">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-primary/10" />

          {/* Spinning gradient ring */}
          <div
            className="absolute inset-0 rounded-full border-[3px] border-transparent animate-spin"
            style={{
              borderTopColor: 'hsl(var(--primary))',
              borderRightColor: 'hsl(var(--primary) / 0.5)',
              animationDuration: '1s',
            }}
          />

          {/* Inner pulse */}
          <div className="absolute inset-3 rounded-full bg-primary/5 animate-pulse" />

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
    </div>
  )
}

interface CardSkeletonProps {
  showImage?: boolean
}

export function CardSkeleton({ showImage = true }: CardSkeletonProps) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {showImage && (
        <LoadingSkeleton className="h-36 w-full rounded-none" />
      )}
      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          <LoadingSkeleton className="h-5 w-16" />
          <LoadingSkeleton className="h-5 w-12" />
        </div>
        <LoadingSkeleton className="h-6 w-3/4" />
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-full" />
          <LoadingSkeleton className="h-4 w-5/6" />
        </div>
        <LoadingSkeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <LoadingSkeleton className="h-32 w-full rounded-none" />
      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          <LoadingSkeleton className="h-5 w-20" />
        </div>
        <LoadingSkeleton className="h-7 w-4/5" />
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-full" />
          <LoadingSkeleton className="h-4 w-3/4" />
        </div>
        <div className="flex gap-4 pt-2">
          <LoadingSkeleton className="h-4 w-24" />
          <LoadingSkeleton className="h-4 w-16" />
          <LoadingSkeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

// Hero skeleton for homepage
export function HeroSkeleton() {
  return (
    <div className="animate-fade-in">
      <div className="hero-glass-pane px-6 py-6 sm:px-10 sm:py-8">
        <LoadingSkeleton className="h-6 w-24 mb-5" />
        <LoadingSkeleton className="h-12 w-full max-w-xl mb-3" />
        <LoadingSkeleton className="h-12 w-4/5 max-w-lg mb-3" />
        <div className="space-y-2 mt-4">
          <LoadingSkeleton className="h-5 w-full max-w-2xl" />
          <LoadingSkeleton className="h-5 w-3/4 max-w-xl" />
        </div>
      </div>
    </div>
  )
}
