import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { ContactForm } from '@/components/ui/contact-form'

export default function ContactPage() {
  return (
    <>
      <Section className="section-top bg-gradient-to-b from-amber-50/50 to-background pb-16 dark:from-slate-900/50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-center text-display font-serif font-bold">Contact &amp; Contributions</h1>

            <div className="prose mb-12 max-w-none">
              <p className="mb-10 mt-5 text-center text-lg text-muted-foreground sm:text-xl">
                Share your project, idea, or feedback with the THINK community
              </p>

              <p>
                We welcome contributions from educators and researchers across all disciplines. Whether you've built
                an experimental AI tool, developed a new pedagogical approach, or have ideas to share, we'd love to
                hear from you.
              </p>

              <p className="mb-8">
                Use the form below to submit your project, propose a collaboration, ask a question, or provide feedback
                on the THINK platform.
              </p>
            </div>

            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  )
}
