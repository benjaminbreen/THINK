import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CriticalPedagogyGuide() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <Container>
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/#guides">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
              </Link>
            </Button>
          </div>

          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Critical AI Pedagogy
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Teaching students to think critically about AI outputs and limitations
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="lead">
                Critical AI pedagogy isn't about mastering AI tools—it's about understanding their limitations,
                biases, and social implications while developing the analytical skills to work with them responsibly.
              </p>

              <h2>Introduction</h2>
              <p>
                The emergence of large language models presents humanities educators with a pedagogical challenge that
                is also an opportunity. Rather than treating AI as either a threat to critical thinking or a neutral
                productivity tool, critical AI pedagogy positions these systems as objects of inquiry themselves—worthy
                of the same analytical scrutiny we apply to any cultural artifact.
              </p>

              <p>
                This approach builds on three complementary frameworks developed by the THINK project team: treating
                AI hallucinations as pedagogical opportunities rather than failures, examining training data as cultural
                and ethical artifacts, and reimagining the relationship between human writers and AI systems from
                generation to curation.
              </p>

              <h2>Core Principles</h2>

              <h3>1. Hallucinations as Pedagogical Opportunities</h3>

              <p>
                The conventional view treats AI inaccuracies—"hallucinations"—as problems to be solved through better
                models or more careful prompting. Critical AI pedagogy inverts this assumption: what if hallucinations
                are pedagogically valuable precisely because they're wrong?
              </p>

              <p>
                When ChatGPT confidently fabricates a historically plausible but entirely fictional primary source, or
                when it advises a 1690s physician to recommend tai chi (a 20th-century practice), it creates what we
                call "the talking rat problem"—outputs so absurdly inaccurate they undermine any educational value.
                But catching these errors requires exactly the skills humanities education should cultivate: source
                criticism, historical contextualization, close reading, and verification against evidence.
              </p>

              <p>
                <strong>Pedagogical Implementation:</strong> Rather than prohibiting AI use or treating it as a knowledge
                source, structure assignments around error identification. Students engage with AI-generated content,
                identify inaccuracies and anachronisms, conduct independent research to verify claims, then document
                what went wrong and why. The hallucination becomes the curriculum.
              </p>

              <p>
                This approach makes AI-based cheating pedagogically useless—students can't outsource the work to an
                LLM when the work is critiquing what the LLM produces. When a student submits AI-generated analysis
                of "errors" that don't exist, or cites fabricated sources they haven't actually investigated, the
                gaps become immediately visible.
              </p>

              <h3>2. Training Data as Cultural Artifact</h3>

              <p>
                Every AI system is shaped by the data used to train it. These datasets aren't neutral repositories of
                information—they're cultural artifacts that carry historical biases, reflect specific power structures,
                and encode particular worldviews. Critical AI pedagogy treats training data as worthy of the same
                analytical attention we give to any primary source.
              </p>

              <p>
                Consider the Enron email corpus, examined extensively by THINK co-PI Zac Zimmer. This dataset—half a
                million emails exchanged between Enron employees as the corporation lurched toward collapse in 2001—has
                become "one of the most famous publicly available training sets" for natural language processing. It's
                been used to train spam filters, sentiment analysis systems, and workplace surveillance tools.
              </p>

              <p>
                But what does it mean that a generation of algorithms has been trained on "a federally subpoenaed mash
                of fraudulent activity and banal corporate pleasantries"? That this dataset, generated by mostly white
                male corporate criminals, now shapes how AI systems understand workplace communication, professional
                language, and organizational behavior?
              </p>

              <p>
                These questions aren't supplementary to understanding AI—they're foundational. The rhetoric of "newness"
                in technology often blinds us to historical patterns: how archives get constructed, whose voices get
                preserved, what forms of knowledge become authoritative. Humanities scholars know how to ask these questions.
              </p>

              <p>
                <strong>Pedagogical Implementation:</strong> Have students investigate what datasets were used to train
                specific models. Assign them to "audit" training data by probing for gaps, biases, and representational
                imbalances. Create "counterfactual datasets" that surface marginalized forms of knowledge deliberately
                excluded from mainstream training corpora. These assignments teach both technical AI literacy and critical
                analysis of power structures in knowledge production.
              </p>

              <h3>3. From Generation to Curation</h3>

              <p>
                One of the most persistent anxieties about AI in education is that students will use it to bypass the
                difficult cognitive work that produces learning. This concern is legitimate—but it also presents an
                oversimplified view of what "AI-assisted work" actually entails.
              </p>

              <p>
                As THINK co-PI Pranav Anand's work on language models and writing suggests, we may be "on the cusp of
                a fundamental change in our relation to writing." The question isn't simply whether students should use
                AI, but how to distinguish between eliminating drudgery and eliminating thinking itself.
              </p>

              <p>
                Anand proposes a "co-writing" model where LLMs help organize rhetorical structure, framing, and
                meta-cognitive thinking, while the human writer becomes "more curator than crafter"—selecting from
                AI-generated options, editing results, and maintaining critical oversight. For many students, offloading
                some cognitive load could enable fuller attention to analytical components, thereby increasing both
                learning and willingness to engage with complex material.
              </p>

              <p>
                But this only works if students understand the distinction Margaret Mead articulated in 1963: automation
                helps when it frees humans for creative thinking, but fails when we mistake drudgery-elimination for
                intellectual offloading. Learning to recognize that boundary is itself a critical skill.
              </p>

              <p>
                <strong>Pedagogical Implementation:</strong> Design assignments that make the process visible. Require
                students to document what AI tools they used, what prompts they employed, how they evaluated outputs,
                and what changes they made. Treat transparency as a learning objective—students should be able to
                articulate their own role as curators and explain their decision-making process. This shifts focus from
                prohibiting AI to teaching responsible use and maintaining intellectual ownership.
              </p>

              <h2>Practical Applications</h2>

              <h3>HistoryLens Simulations</h3>

              <p>
                The <Link href="/projects/historylens" className="text-primary hover:underline">HistoryLens framework</Link>
                {' '}exemplifies critical AI pedagogy in practice. Students engage with interactive historical simulations
                (such as plague scenarios in 1348 Damascus or Paris), then:
              </p>

              <ul>
                <li>Print and annotate transcripts to identify factual errors and anachronisms</li>
                <li>Conduct independent historical research to verify AI claims</li>
                <li>Analyze why the AI made specific errors—what assumptions or training data produced inaccuracies</li>
                <li>Refine prompts with historically accurate information and observe how outputs change</li>
              </ul>

              <p>
                Trials with over 200 UCSC students found that 81% reported enhanced understanding of historical periods,
                and 48% cited discussions about AI inaccuracies as a course highlight. The engagement comes precisely
                from treating AI outputs as puzzles to be solved rather than information to be absorbed.
              </p>

              <h3>Dataset Auditing Assignments</h3>

              <p>
                The <Link href="/pedagogy" className="text-primary hover:underline">Auditing AI Training Datasets</Link>
                {' '}assignment asks students to probe the contingency of archives used to train LLMs. Students:
              </p>

              <ul>
                <li>Investigate the composition and origins of major training datasets</li>
                <li>Identify whose voices and perspectives are over-represented or excluded</li>
                <li>Examine how dataset construction decisions affect model outputs</li>
                <li>Write analytical essays connecting training data biases to broader questions about knowledge, power, and representation</li>
              </ul>

              <p>
                This assignment can't be completed by asking ChatGPT about its own training data—students must engage
                with research literature, technical documentation, and critical scholarship about AI systems.
              </p>

              <h3>Constructing Counterfactual Datasets</h3>

              <p>
                As a creative extension of dataset auditing, the{' '}
                <Link href="/pedagogy" className="text-primary hover:underline">Constructing Counterfactual Datasets</Link>
                {' '}assignment asks: what would an AI trained on marginalized knowledge look like? Students:
              </p>

              <ul>
                <li>Identify forms of knowledge excluded from mainstream AI training (e.g., Indigenous oral histories, working-class literature, non-Western philosophical traditions)</li>
                <li>Curate alternative datasets that center these perspectives</li>
                <li>Analyze how training on these datasets might change AI outputs and assumptions</li>
                <li>Reflect on the politics of dataset construction and the possibility of more equitable AI systems</li>
              </ul>

              <p>
                This combines technical work (understanding how training data shapes models) with humanistic inquiry
                (whose knowledge counts, how archives get made, what gets remembered or forgotten).
              </p>

              <h3>AI Inaccuracies Discussion</h3>

              <p>
                The <Link href="/pedagogy" className="text-primary hover:underline">AI Inaccuracies Discussion</Link>
                {' '}assignment uses scaffolded reflective writing to develop critical AI literacy. Students:
              </p>

              <ul>
                <li>Generate AI responses to questions in their field of study</li>
                <li>Identify errors, oversimplifications, or misleading statements</li>
                <li>Explain why these outputs seem plausible despite being wrong</li>
                <li>Reflect on implications for research, learning, and knowledge production</li>
              </ul>

              <p>
                This builds metacognitive awareness—students become conscious of how AI systems create the appearance
                of authority through confident prose and plausible-sounding claims, regardless of factual accuracy.
              </p>

              <h2>Assessment Strategies</h2>

              <p>
                Critical AI pedagogy requires rethinking assessment. If an LLM can competently complete an assignment,
                that assignment may not actually measure critical thinking, analysis, or synthesis. Consider:
              </p>

              <ul>
                <li><strong>Process portfolios:</strong> Students submit drafts, research notes, AI transcripts, and reflections showing their intellectual development—not just final products</li>
                <li><strong>Error identification exercises:</strong> Rather than asking students to produce correct information, ask them to identify what's wrong with AI-generated content and explain why</li>
                <li><strong>Comparative analysis:</strong> Have students compare AI outputs to published scholarship, primary sources, or expert analysis—building evaluation skills</li>
                <li><strong>Metacognitive reflections:</strong> Require students to articulate their own decision-making process, explaining when and why they used AI tools and how they maintained intellectual ownership</li>
              </ul>

              <h2>Common Challenges</h2>

              <h3>Students Still Try to Cheat</h3>

              <p>
                Yes, they do. But when assignments are structured around identifying AI errors and conducting original
                research, cheating fails visibly. A student who submits AI-generated analysis of fabricated "errors" or
                cites sources they haven't read produces work that's obviously superficial. The assignment design makes
                shortcuts self-defeating.
              </p>

              <h3>Not All Students Engage Critically</h3>

              <p>
                Some students will go through the motions without deep engagement. This is true of any assignment. The
                difference is that critical AI pedagogy makes shallow thinking more visible—and provides concrete
                opportunities to address it through discussion, revision, and reflection.
              </p>

              <h3>Time and Scaffolding Requirements</h3>

              <p>
                These assignments require more instructional scaffolding than traditional essays. Students need guidance
                on how to identify errors, what counts as verification, and how to analyze training data. But this
                investment pays off in transferable skills—fact-checking, source criticism, understanding bias—that
                matter far beyond a single course.
              </p>

              <h2>Key Takeaways</h2>

              <ol>
                <li><strong>Treat AI outputs as objects of study, not sources of knowledge.</strong> The most valuable
                learning happens when students critique, verify, and analyze what AI systems produce.</li>

                <li><strong>Make training data visible.</strong> Help students understand that AI systems aren't neutral—
                they're shaped by the datasets used to train them, which carry historical biases and power dynamics.</li>

                <li><strong>Focus on curation over generation.</strong> If students use AI, make them responsible for
                evaluating, editing, and justifying what they keep. Transparency and intellectual ownership matter more
                than prohibition.</li>

                <li><strong>Design assignments that make cheating useless.</strong> When the work is identifying what's
                wrong with AI outputs, students can't outsource it to AI.</li>

                <li><strong>Maintain the boundary between drudgery and thinking.</strong> Not all cognitive load should
                be offloaded. Students need to struggle with difficult material—that's where learning happens.</li>
              </ol>

              <h2>Further Resources</h2>

              <p>
                For more on implementing critical AI pedagogy in your courses:
              </p>

              <ul>
                <li><Link href="/pedagogy" className="text-primary hover:underline">Sample assignments and curriculum materials</Link></li>
                <li><Link href="/guides/responsible-ai-classroom" className="text-primary hover:underline">Responsible AI use in the classroom</Link></li>
                <li><Link href="/projects/historylens" className="text-primary hover:underline">HistoryLens framework overview</Link></li>
                <li><Link href="/about" className="text-primary hover:underline">THINK project philosophy</Link></li>
                <li><Link href="/blog" className="text-primary hover:underline">Ongoing discussions on our blog</Link></li>
              </ul>

              <div className="mt-12 p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Get Started</h3>
                <p className="text-sm mb-4">
                  Ready to implement critical AI pedagogy in your courses? All THINK curriculum materials are freely
                  available and designed for easy adaptation.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/pedagogy">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Explore Teaching Materials
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
