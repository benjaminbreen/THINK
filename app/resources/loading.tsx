import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Skeleton } from '@/components/ui/skeleton'

export default function ResourcesLoading() {
  return (
    <Section className="section-top pb-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-4 flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded" />
              <div className="flex-1">
                <Skeleton className="h-5 w-2/3 mb-1" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
