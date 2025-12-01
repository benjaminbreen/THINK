import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Skeleton } from '@/components/ui/skeleton'

export default function GuidesLoading() {
  return (
    <Section className="pt-24 pb-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <Skeleton className="h-36 w-full mb-4 rounded-lg" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
