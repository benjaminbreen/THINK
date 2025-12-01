'use client'

import { GuideLayout, WikiLink, GuideSectionDivider } from '@/components/ui/guide-layout'
import { HeadingAnchor } from '@/components/ui/heading-anchor'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Lightbulb, AlertCircle, CheckCircle, BookOpen, ArrowLeft } from 'lucide-react'
import { siteConfig } from '@/lib/config'

const tableOfContents = [
  { id: 'intro', title: 'Introduction' },
  { id: 'hallucinations', title: 'Hallucinations as Teaching' },
  { id: 'training-data', title: 'Training Data as Artifact' },
  { id: 'curation', title: 'Generation to Curation' },
  { id: 'applications', title: 'Practical Applications' },
  { id: 'assessment', title: 'Assessment Strategies' },
  { id: 'challenges', title: 'Common Challenges' },
  { id: 'takeaways', title: 'Key Takeaways' },
]

export default function CriticalPedagogyGuide() {
  return (
    <GuideLayout
      title="Critical AI Pedagogy"
      subtitle="Teaching students to think critically about AI outputs and limitations"
      guideId="critical-pedagogy"
      thumbnailPath="/thumbnails/critical-pedagogy.png"
      author={{
        name: 'Benjamin Breen',
        role: 'Principal Investigator, THINK',
      }}
      lastUpdated="November 2025"
      readingTime="18 min read"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        Critical AI pedagogy isn't about mastering AI tools—it's about understanding their limitations, biases, and social implications while developing the analytical skills to work with them responsibly.
      </p>

      <HeadingAnchor id="intro">Introduction</HeadingAnchor>

      <p>
        The emergence of <WikiLink term="Large language model">large language models</WikiLink> presents humanities educators with a pedagogical challenge that is also an opportunity. Rather than treating AI as either a threat to <WikiLink term="Critical thinking">critical thinking</WikiLink> or a neutral productivity tool, critical AI pedagogy positions these systems as objects of inquiry themselves—worthy of the same analytical scrutiny we apply to any cultural artifact.
      </p>

      <p>
        This approach builds on three complementary frameworks developed by the THINK project team: treating AI hallucinations as pedagogical opportunities rather than failures, examining training data as cultural and ethical artifacts, and reimagining the relationship between human writers and AI systems from generation to curation.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="hallucinations">1. Hallucinations as Pedagogical Opportunities</HeadingAnchor>

      <p>
        The conventional view treats AI inaccuracies—"<WikiLink term="Hallucination (artificial intelligence)">hallucinations</WikiLink>"—as problems to be solved through better models or more careful prompting. Critical AI pedagogy inverts this assumption: what if hallucinations are pedagogically valuable precisely because they're wrong?
      </p>

      <p>
        When <WikiLink term="ChatGPT">ChatGPT</WikiLink> confidently fabricates a historically plausible but entirely fictional <WikiLink term="Primary source">primary source</WikiLink>, or when it advises a 1690s physician to recommend <WikiLink term="Tai chi">tai chi</WikiLink> (a 20th-century practice), it creates what we call "the talking rat problem"—outputs so absurdly inaccurate they undermine any educational value. But catching these errors requires exactly the skills humanities education should cultivate: source criticism, historical contextualization, <WikiLink term="Close reading">close reading</WikiLink>, and verification against evidence.
      </p>

      <div className="my-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-600 rounded-r-lg">
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
              Pedagogical Implementation
            </h4>
            <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
              Rather than prohibiting AI use or treating it as a knowledge source, structure assignments around error identification. Students engage with AI-generated content, identify inaccuracies and <WikiLink term="Anachronism">anachronisms</WikiLink>, conduct independent research to verify claims, then document what went wrong and why. The hallucination becomes the curriculum.
            </p>
          </div>
        </div>
      </div>

      <p>
        This approach makes AI-based cheating pedagogically useless—students can't outsource the work to an LLM when the work is critiquing what the LLM produces. When a student submits AI-generated analysis of "errors" that don't exist, or cites fabricated sources they haven't actually investigated, the gaps become immediately visible.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="training-data">2. Training Data as Cultural Artifact</HeadingAnchor>

      <p>
        Every AI system is shaped by the data used to train it. These datasets aren't neutral repositories of information—they're cultural artifacts that carry historical biases, reflect specific power structures, and encode particular worldviews. Critical AI pedagogy treats training data as worthy of the same analytical attention we give to any primary source.
      </p>

      <p>
        Consider the <WikiLink term="Enron scandal">Enron</WikiLink> email corpus, examined extensively by THINK co-PI Zac Zimmer. This dataset—half a million emails exchanged between Enron employees as the corporation lurched toward collapse in 2001—has become "one of the most famous publicly available training sets" for <WikiLink term="Natural language processing">natural language processing</WikiLink>. It's been used to train spam filters, <WikiLink term="Sentiment analysis">sentiment analysis</WikiLink> systems, and workplace surveillance tools.
      </p>

      <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-amber-900 dark:text-amber-100">
              Critical Questions
            </h4>
            <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-0">
              What does it mean that a generation of algorithms has been trained on "a federally subpoenaed mash of fraudulent activity and banal corporate pleasantries"? That this dataset, generated by mostly white male corporate criminals, now shapes how AI systems understand workplace communication, professional language, and organizational behavior?
            </p>
          </div>
        </div>
      </div>

      <p>
        These questions aren't supplementary to understanding AI—they're foundational. The rhetoric of "newness" in technology often blinds us to historical patterns: how archives get constructed, whose voices get preserved, what forms of knowledge become authoritative. Humanities scholars know how to ask these questions.
      </p>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <h4 className="font-sans text-base font-semibold mt-0 mb-3">Pedagogical Implementation</h4>
        <p className="text-sm mb-0">
          Have students investigate what datasets were used to train specific models. Assign them to "audit" training data by probing for gaps, biases, and representational imbalances. Create "counterfactual datasets" that surface marginalized forms of knowledge deliberately excluded from mainstream training corpora. These assignments teach both technical AI literacy and critical analysis of power structures in knowledge production.
        </p>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="curation">3. From Generation to Curation</HeadingAnchor>

      <p>
        One of the most persistent anxieties about AI in education is that students will use it to bypass the difficult cognitive work that produces learning. This concern is legitimate—but it also presents an oversimplified view of what "AI-assisted work" actually entails.
      </p>

      <p>
        As THINK co-PI <WikiLink term="Linguistics">Pranav Anand's</WikiLink> work on language models and writing suggests, we may be "on the cusp of a fundamental change in our relation to writing." The question isn't simply whether students should use AI, but how to distinguish between eliminating drudgery and eliminating thinking itself.
      </p>

      <p>
        Anand proposes a "co-writing" model where LLMs help organize rhetorical structure, framing, and meta-cognitive thinking, while the human writer becomes "more curator than crafter"—selecting from AI-generated options, editing results, and maintaining critical oversight. For many students, offloading some <WikiLink term="Cognitive load">cognitive load</WikiLink> could enable fuller attention to analytical components, thereby increasing both learning and willingness to engage with complex material.
      </p>

      <p>
        But this only works if students understand the distinction <WikiLink term="Margaret Mead">Margaret Mead</WikiLink> articulated in 1963: automation helps when it frees humans for creative thinking, but fails when we mistake drudgery-elimination for intellectual offloading. Learning to recognize that boundary is itself a critical skill.
      </p>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <h4 className="font-sans text-base font-semibold mt-0 mb-3">Pedagogical Implementation</h4>
        <p className="text-sm mb-0">
          Design assignments that make the process visible. Require students to document what AI tools they used, what prompts they employed, how they evaluated outputs, and what changes they made. Treat transparency as a learning objective—students should be able to articulate their own role as curators and explain their decision-making process. This shifts focus from prohibiting AI to teaching responsible use and maintaining intellectual ownership.
        </p>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="applications">Practical Applications</HeadingAnchor>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">HistoryLens Simulations</h3>

      <p>
        The <Link href="/projects/historylens" className="text-primary hover:underline">HistoryLens framework</Link> exemplifies critical AI pedagogy in practice. Students engage with interactive historical simulations (such as <WikiLink term="Black Death">plague</WikiLink> scenarios in 1348 <WikiLink term="Damascus">Damascus</WikiLink> or <WikiLink term="Paris">Paris</WikiLink>), then:
      </p>

      <ul>
        <li>Print and annotate transcripts to identify factual errors and anachronisms</li>
        <li>Conduct independent historical research to verify AI claims</li>
        <li>Analyze why the AI made specific errors—what assumptions or training data produced inaccuracies</li>
        <li>Refine prompts with historically accurate information and observe how outputs change</li>
      </ul>

      <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
        <div className="flex gap-3">
          <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
              Results from UCSC Trials
            </h4>
            <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
              Trials with over 200 UCSC students found that 81% reported enhanced understanding of historical periods, and 48% cited discussions about AI inaccuracies as a course highlight. The engagement comes precisely from treating AI outputs as puzzles to be solved rather than information to be absorbed.
            </p>
          </div>
        </div>
      </div>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Dataset Auditing Assignments</h3>

      <p>
        The <Link href="/pedagogy" className="text-primary hover:underline">Auditing AI Training Datasets</Link> assignment asks students to probe the contingency of archives used to train LLMs. Students:
      </p>

      <ul>
        <li>Investigate the composition and origins of major training datasets</li>
        <li>Identify whose voices and perspectives are over-represented or excluded</li>
        <li>Examine how dataset construction decisions affect model outputs</li>
        <li>Write analytical essays connecting training data biases to broader questions about knowledge, power, and representation</li>
      </ul>

      <p>
        This assignment can't be completed by asking ChatGPT about its own training data—students must engage with research literature, technical documentation, and critical scholarship about AI systems.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Constructing Counterfactual Datasets</h3>

      <p>
        As a creative extension of dataset auditing, the{' '}
        <Link href="/pedagogy" className="text-primary hover:underline">Constructing Counterfactual Datasets</Link>
        {' '}assignment asks: what would an AI trained on marginalized knowledge look like? Students:
      </p>

      <ul>
        <li>Identify forms of knowledge excluded from mainstream AI training (e.g., <WikiLink term="Indigenous peoples">Indigenous</WikiLink> oral histories, working-class literature, non-Western philosophical traditions)</li>
        <li>Curate alternative datasets that center these perspectives</li>
        <li>Analyze how training on these datasets might change AI outputs and assumptions</li>
        <li>Reflect on the politics of dataset construction and the possibility of more equitable AI systems</li>
      </ul>

      <p>
        This combines technical work (understanding how training data shapes models) with humanistic inquiry (whose knowledge counts, how archives get made, what gets remembered or forgotten).
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="assessment">Assessment Strategies</HeadingAnchor>

      <p>
        Critical AI pedagogy requires rethinking assessment. If an LLM can competently complete an assignment, that assignment may not actually measure critical thinking, analysis, or synthesis. Consider:
      </p>

      <div className="my-6 space-y-4">
        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Process Portfolios</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            Students submit drafts, research notes, AI transcripts, and reflections showing their intellectual development—not just final products.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Error Identification Exercises</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            Rather than asking students to produce correct information, ask them to identify what's wrong with AI-generated content and explain why.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Comparative Analysis</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            Have students compare AI outputs to published scholarship, primary sources, or expert analysis—building evaluation skills.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Metacognitive Reflections</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            Require students to articulate their own decision-making process, explaining when and why they used AI tools and how they maintained intellectual ownership.
          </p>
        </div>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="challenges">Common Challenges</HeadingAnchor>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Students Still Try to Cheat</h3>

      <p>
        Yes, they do. But when assignments are structured around identifying AI errors and conducting original research, cheating fails visibly. A student who submits AI-generated analysis of fabricated "errors" or cites sources they haven't read produces work that's obviously superficial. The assignment design makes shortcuts self-defeating.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Not All Students Engage Critically</h3>

      <p>
        Some students will go through the motions without deep engagement. This is true of any assignment. The difference is that critical AI pedagogy makes shallow thinking more visible—and provides concrete opportunities to address it through discussion, revision, and reflection.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Time and Scaffolding Requirements</h3>

      <p>
        These assignments require more instructional scaffolding than traditional essays. Students need guidance on how to identify errors, what counts as verification, and how to analyze training data. But this investment pays off in transferable skills—fact-checking, source criticism, understanding bias—that matter far beyond a single course.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="takeaways">Key Takeaways</HeadingAnchor>

      <div className="my-6 space-y-4">
        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                1. Treat AI outputs as objects of study, not sources of knowledge
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                The most valuable learning happens when students critique, verify, and analyze what AI systems produce.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                2. Make training data visible
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                Help students understand that AI systems aren't neutral—they're shaped by the datasets used to train them, which carry historical biases and power dynamics.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                3. Focus on curation over generation
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                If students use AI, make them responsible for evaluating, editing, and justifying what they keep. Transparency and intellectual ownership matter more than prohibition.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                4. Design assignments that make cheating useless
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                When the work is identifying what's wrong with AI outputs, students can't outsource it to AI.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                5. Maintain the boundary between drudgery and thinking
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                Not all cognitive load should be offloaded. Students need to struggle with difficult material—that's where learning happens.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Get Started</h3>
        <p className="text-sm mb-4">
          Ready to implement critical AI pedagogy in your courses? All THINK curriculum materials are freely available and designed for easy adaptation.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link href="/pedagogy">
            Explore Teaching Materials
          </Link>
        </Button>
      </div>

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Further Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/pedagogy" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h4 className="font-semibold mb-1 text-sm">Sample Assignments</h4>
            <p className="text-xs text-muted-foreground">Ready-to-use curriculum materials</p>
          </Link>
          <Link href="/guides/responsible-ai-classroom" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h4 className="font-semibold mb-1 text-sm">Responsible AI Use</h4>
            <p className="text-xs text-muted-foreground">Faculty approaches to AI policy</p>
          </Link>
          <Link href="/projects/historylens" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h4 className="font-semibold mb-1 text-sm">HistoryLens Framework</h4>
            <p className="text-xs text-muted-foreground">Interactive historical simulations</p>
          </Link>
          <Link href="/about" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h4 className="font-semibold mb-1 text-sm">About THINK</h4>
            <p className="text-xs text-muted-foreground">Our project philosophy</p>
          </Link>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          <strong>Guide last updated:</strong> November 2025. Questions or feedback?{' '}
          <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
            Get in touch
          </a>
        </p>
      </div>
    </GuideLayout>
  )
}
