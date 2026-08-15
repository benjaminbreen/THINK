import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <Section className="section-top pb-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Skeleton className="h-10 w-32 mx-auto mb-4" />
          <Skeleton className="h-6 w-72 mx-auto" />
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-6 items-start">
              <Skeleton className="h-48 w-72 rounded-lg flex-shrink-0 hidden md:block" />
              <div className="flex-1">
                <div className="flex gap-2 mb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-7 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
