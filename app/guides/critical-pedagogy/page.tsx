import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Brain, Eye, Scale, AlertTriangle, Users, Lightbulb } from 'lucide-react'

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
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">Advanced</Badge>
              <Badge variant="outline">Pedagogy</Badge>
              <Badge variant="outline">Ethics</Badge>
            </div>

            <h1 className="text-4xl font-serif font-bold mb-4">
              Critical AI Pedagogy
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Teaching students to think critically about AI outputs, understand bias and limitations, and develop healthy skepticism
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="flex items-center gap-2">
                <Brain className="h-6 w-6" /> Why Critical AI Literacy Matters
              </h2>
              <p>
                As AI tools become ubiquitous in research and education, students need more than technical skills—they
                need critical awareness. A pedagogy that integrates AI without teaching critical evaluation produces
                students who are passive consumers of AI outputs rather than thoughtful, skeptical users.
              </p>

              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg my-6">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" /> Core Principle
                </p>
                <p className="text-sm">
                  The goal isn't to teach students to avoid AI or blindly trust it, but to develop the judgment to
                  evaluate when AI is helpful, when it's misleading, and when human expertise is irreplaceable.
                </p>
              </div>

              <h3>What Students Need to Understand</h3>
              <ul>
                <li>AI models are trained on historical data and reflect its biases</li>
                <li>AI can be confident and wrong—fluency doesn't equal accuracy</li>
                <li>Historical context and interpretation require human judgment</li>
                <li>Verification is not optional—it's part of responsible AI use</li>
                <li>Different tools and prompts produce different results</li>
              </ul>

              <h2 className="flex items-center gap-2">
                <Eye className="h-6 w-6" /> Teaching Students to Spot AI Limitations
              </h2>

              <h3>Exercise 1: The Hallucination Hunt</h3>
              <p>
                Have students deliberately try to make AI produce inaccurate historical information, then analyze the patterns.
              </p>

              <div className="bg-muted p-4 rounded-lg my-6">
                <p className="font-semibold mb-2">Class Activity (45 minutes)</p>
                <p className="text-sm mb-3">
                  <strong>Setup:</strong> Divide class into groups. Each group gets a historical topic they've studied.
                </p>
                <p className="text-sm mb-3">
                  <strong>Task:</strong> Ask an AI (ChatGPT, Claude, etc.) 5 questions about this topic designed to
                  reveal limitations or inaccuracies. Document all prompts and responses.
                </p>
                <p className="text-sm mb-3">
                  <strong>Analysis:</strong> Groups identify:
                  <br/>
                  - What factual errors did the AI make?
                  <br/>
                  - Did it cite fake sources?
                  <br/>
                  - Did it oversimplify complex debates?
                  <br/>
                  - Did it present contested interpretations as fact?
                  <br/>
                  - What patterns do you notice in what AI gets wrong?
                </p>
                <p className="text-sm">
                  <strong>Debrief:</strong> What does this reveal about how AI works? When should you be most skeptical?
                </p>
              </div>

              <h3>Exercise 2: Comparing AI to Primary Sources</h3>
              <p>
                Students analyze how AI-generated summaries compare to actual historical documents.
              </p>

              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                <strong>Assignment:</strong> Choose a historical event from our course. First, ask AI to summarize
                what happened and why it's significant. Then, read 3 primary sources from that event.
                <br/><br/>
                Write a 2-page analysis:
                <br/>
                - What did AI get right?
                <br/>
                - What nuances or complexities did AI miss?
                <br/>
                - What perspectives from primary sources were absent in AI's summary?
                <br/>
                - If you only read the AI summary, what would you misunderstand about this event?
              </blockquote>

              <h3>Exercise 3: The Anachronism Detector</h3>
              <p>
                Train students to recognize when AI imposes modern concepts on the past.
              </p>

              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                <strong>In-Class Activity:</strong> Provide students with AI-generated descriptions of historical events.
                Their job: highlight any language, concepts, or framings that seem anachronistic.
                <br/><br/>
                Example: AI describing 18th-century politics using terms like "progressive," "conservative," "left-wing,"
                or "human rights"—concepts that didn't exist in that form.
                <br/><br/>
                Discussion: Why does AI do this? What does it reveal about the challenges of historical thinking?
              </blockquote>

              <h2 className="flex items-center gap-2">
                <Scale className="h-6 w-6" /> Understanding Bias in AI
              </h2>

              <h3>Where Bias Comes From</h3>
              <p>
                AI models learn from massive datasets of human-created text. This means they absorb:
              </p>
              <ul>
                <li><strong>Historical biases:</strong> Texts reflect the prejudices of their time</li>
                <li><strong>Representation gaps:</strong> Some voices are overrepresented, others absent</li>
                <li><strong>Dominant narratives:</strong> Mainstream interpretations appear more than marginalized ones</li>
                <li><strong>Language patterns:</strong> Stereotypes embedded in how we write about groups</li>
              </ul>

              <h3>Exercise 4: Bias Detection Workshop</h3>
              <div className="bg-muted p-4 rounded-lg my-6">
                <p className="font-semibold mb-2">Structured Activity</p>
                <p className="text-sm mb-3">
                  <strong>Part 1:</strong> Ask AI to describe the same historical period from different perspectives:
                  <br/>
                  - "Describe the colonization of the Americas from a European perspective"
                  <br/>
                  - "Describe the colonization of the Americas from an Indigenous perspective"
                  <br/>
                  - "Describe the colonization of the Americas from an African perspective"
                </p>
                <p className="text-sm mb-3">
                  <strong>Part 2:</strong> Compare the outputs:
                  <br/>
                  - Which perspective seems most detailed or nuanced?
                  <br/>
                  - Are any perspectives stereotyped or oversimplified?
                  <br/>
                  - What language differences do you notice?
                  <br/>
                  - Which response seems to be the AI's "default" framing?
                </p>
                <p className="text-sm">
                  <strong>Part 3:</strong> Discussion:
                  <br/>
                  - Why might AI perform differently for different perspectives?
                  <br/>
                  - What does this tell us about whose voices dominate historical writing?
                  <br/>
                  - How should historians account for this when using AI tools?
                </p>
              </div>

              <h3>Exercise 5: Gender and Representation Analysis</h3>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                Ask AI to "describe important figures in [historical period]." Analyze the response:
                <br/>
                - What percentage are men vs. women?
                <br/>
                - What roles are women described as having?
                <br/>
                - Are any groups entirely absent?
                <br/><br/>
                Then, ask: "describe important women in [same period]." How does the response change?
                <br/><br/>
                Reflection: What does this reveal about default assumptions in historical narratives? How can you prompt
                AI more effectively to get diverse perspectives?
              </blockquote>

              <h2 className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" /> Ethical Considerations
              </h2>

              <h3>Teaching Responsible AI Use</h3>
              <p>
                Students need frameworks for making ethical decisions about AI use. Consider these scenarios:
              </p>

              <div className="bg-muted p-4 rounded-lg my-6 text-sm">
                <p className="font-semibold mb-3">Scenario 1: The Shortcut</p>
                <p className="mb-3">
                  "You have a primary source analysis due tomorrow. You haven't read the sources yet. AI could analyze
                  them and write the paper for you. What should you do?"
                </p>

                <p className="font-semibold mb-3">Scenario 2: The Research Assistant</p>
                <p className="mb-3">
                  "You're analyzing 50 historical letters. AI could help you identify themes and patterns much faster
                  than reading all 50 yourself. Is this appropriate?"
                </p>

                <p className="font-semibold mb-3">Scenario 3: The Source Check</p>
                <p className="mb-3">
                  "You found a great quote that supports your argument, but you can't locate the original source. AI
                  confirms it sounds right and provides a plausible citation. Should you use it?"
                </p>

                <p className="font-semibold mb-3">Scenario 4: The Translation</p>
                <p className="mb-3">
                  "You're researching a topic requiring French sources, but you don't read French. Is it ethical to rely
                  entirely on AI translation?"
                </p>
              </div>

              <p>
                <strong>Discussion prompt:</strong> What principles should guide your decisions? When does using AI
                enhance learning vs. replace it?
              </p>

              <h3>Academic Integrity in the AI Age</h3>
              <p>
                Help students understand the difference between appropriate AI assistance and academic dishonesty:
              </p>

              <div className="bg-muted p-4 rounded-lg my-6">
                <p className="font-semibold mb-2 text-green-600 dark:text-green-400">Appropriate Use Examples:</p>
                <ul className="text-sm mb-4">
                  <li>Using AI to explain a difficult historical concept you encountered</li>
                  <li>Having AI suggest search terms or potential sources to explore</li>
                  <li>Using AI to help organize your own notes and ideas</li>
                  <li>Asking AI to identify patterns in data you've collected</li>
                  <li>Using AI as a brainstorming partner for research questions</li>
                </ul>

                <p className="font-semibold mb-2 text-red-600 dark:text-red-400">Academic Dishonesty Examples:</p>
                <ul className="text-sm">
                  <li>Submitting AI-written text as your own analysis</li>
                  <li>Using AI to generate arguments you don't understand</li>
                  <li>Asking AI about sources you haven't read and citing them anyway</li>
                  <li>Having AI write your thesis or main interpretive claims</li>
                  <li>Using AI to avoid engaging with course materials</li>
                </ul>
              </div>

              <h2 className="flex items-center gap-2">
                <Users className="h-6 w-6" /> Building Metacognitive Awareness
              </h2>

              <h3>Reflection Prompts for Assignments</h3>
              <p>
                Include these questions in assignment submissions to build student awareness:
              </p>

              <div className="bg-muted p-4 rounded-lg my-6 text-sm">
                <p className="font-semibold mb-2">AI Use Reflection (required with all major assignments):</p>
                <p className="mb-2">1. Did you use AI for any part of this assignment? If so, describe specifically what you asked it to do.</p>
                <p className="mb-2">2. What was helpful about the AI's responses? What was misleading or unhelpful?</p>
                <p className="mb-2">3. Describe one moment where you fact-checked AI output. What did you find?</p>
                <p className="mb-2">4. How did your own historical knowledge allow you to evaluate AI's limitations?</p>
                <p>5. What did you contribute to this assignment that AI could not?</p>
              </div>

              <h3>Exercise 6: The AI Audit</h3>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                <strong>Assignment:</strong> Take an AI-generated essay on a historical topic (provide one, or have students
                generate it). Students must:
                <br/><br/>
                1. Fact-check every factual claim using reliable sources
                <br/>
                2. Identify any fake or misattributed citations
                <br/>
                3. Assess whether the argument is historically sound
                <br/>
                4. Note what important context or nuance is missing
                <br/>
                5. Write a 2-page "reviewer's report" evaluating the essay's historical quality
                <br/><br/>
                This teaches students to evaluate AI output with the same critical eye they'd apply to any historical writing.
              </blockquote>

              <h3>Exercise 7: Prompt Comparison Study</h3>
              <p>
                Show students how different prompts produce wildly different results:
              </p>

              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                Ask the same historical question using these different prompts:
                <br/><br/>
                1. Simple question: "What caused the French Revolution?"
                <br/>
                2. Specific request: "Based on historical scholarship, what were the main causes of the French Revolution?"
                <br/>
                3. Constrained query: "Analyze these three primary sources from 1789 France and identify what
                contemporaries saw as the causes of the Revolution."
                <br/><br/>
                Compare results: Which response is most historically sophisticated? Why? What does this teach you about
                how to use AI effectively?
              </blockquote>

              <h2>Creating a Critical AI Culture in Your Classroom</h2>

              <h3>Start the Semester with Transparency</h3>
              <p>
                On day one, have an open conversation about AI:
              </p>
              <ul>
                <li>Acknowledge that students have access to these tools</li>
                <li>Explain your AI policy and the reasoning behind it</li>
                <li>Discuss what skills this course aims to build</li>
                <li>Invite students to share their experiences and concerns</li>
              </ul>

              <h3>Model Critical AI Use</h3>
              <p>
                Use AI in class and show your thinking process:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "Let's ask AI about this topic. [Show response] Now, what do we notice? This claim about dates seems
                wrong—let's check our textbook. This interpretation is plausible but contested—what sources would we
                need to verify it? The language here is suspiciously modern—would someone in 1850 really talk about
                'social movements' this way?"
              </blockquote>

              <h3>Celebrate Good Skepticism</h3>
              <p>
                When students identify AI errors or limitations, praise this as demonstrating historical expertise:
              </p>
              <ul>
                <li>"Excellent catch—you're right that AI is anachronistic here"</li>
                <li>"Great critical thinking to verify that claim"</li>
                <li>"This shows you understand the historical context better than AI"</li>
              </ul>

              <h3>Regular "AI Error of the Week"</h3>
              <p>
                Start each class by sharing an AI mistake students found. Discuss:
              </p>
              <ul>
                <li>What made this error plausible?</li>
                <li>How did you identify it as wrong?</li>
                <li>What historical knowledge was required to catch this?</li>
              </ul>

              <h2>Advanced Topics for Discussion</h2>

              <h3>Who Controls Historical Knowledge?</h3>
              <p>
                Discuss with students:
              </p>
              <ul>
                <li>What voices and perspectives are most represented in AI training data?</li>
                <li>How might AI amplify or challenge dominant historical narratives?</li>
                <li>What responsibilities do historians have when AI tools become widespread?</li>
                <li>How might AI affect which historical questions get asked and answered?</li>
              </ul>

              <h3>The Future of Historical Thinking</h3>
              <p>
                Engage students in thinking about their professional future:
              </p>
              <ul>
                <li>What historical skills will become more important as AI advances?</li>
                <li>What can humans do that AI cannot (or should not)?</li>
                <li>How should historical training evolve?</li>
                <li>What ethical guidelines should the discipline develop?</li>
              </ul>

              <h2>Assessment Strategies for Critical AI Literacy</h2>

              <h3>Include Critical AI Analysis in Rubrics</h3>
              <div className="bg-muted p-4 rounded-lg my-6 text-sm">
                <p className="font-semibold mb-3">Sample Rubric Category: Critical Evaluation (15%)</p>
                <p className="mb-2"><strong>Excellent:</strong> Demonstrates sophisticated awareness of AI limitations; identifies
                specific examples where AI output required verification or correction; shows independent historical judgment.</p>
                <p className="mb-2"><strong>Good:</strong> Shows awareness of AI limitations; verifies some AI outputs; demonstrates
                some independent analysis.</p>
                <p className="mb-2"><strong>Developing:</strong> Limited evidence of critical evaluation of AI; relies heavily on
                AI output without verification.</p>
                <p><strong>Needs Improvement:</strong> No evidence of critical engagement with AI limitations; uncritical acceptance
                of AI outputs.</p>
              </div>

              <h3>Timed In-Class Components</h3>
              <p>
                Include assignments where students demonstrate knowledge without AI access:
              </p>
              <ul>
                <li>In-class essay questions on course readings</li>
                <li>Primary source analysis during class time</li>
                <li>Discussion participation showing engagement with materials</li>
                <li>Oral presentations on research findings</li>
              </ul>

              <h2>Real-World Examples</h2>

              <div className="grid gap-4 my-8">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Case Study: Fact-Checking Historical Simulations</h4>
                  <p className="text-sm text-muted-foreground">
                    Students used the Young Darwin simulation, then researched whether Darwin's responses matched his
                    actual writings from 1835. They created annotated transcripts noting historical accuracies and
                    inaccuracies, demonstrating deep engagement with primary sources.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    <Link href="/projects/historylens" className="text-primary hover:underline">
                      HistoryLens Critical Framework →
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    A research tool that explicitly builds in verification steps, requiring students to test AI-generated
                    hypotheses against primary sources and evaluate confidence levels.
                  </p>
                </div>
              </div>

              <h2>Common Challenges and Solutions</h2>

              <h3>Challenge: Students Resist Critical Approach</h3>
              <p>
                <strong>Problem:</strong> "Why learn to critique AI if we can just use it?"
              </p>
              <p>
                <strong>Solution:</strong> Demonstrate that uncritical AI use leads to poor work. Show examples of
                AI-generated papers with factual errors, fake citations, and shallow analysis. Ask: "Would you want
                to submit this?"
              </p>

              <h3>Challenge: Overwhelming Skepticism</h3>
              <p>
                <strong>Problem:</strong> Students conclude AI is useless and refuse to engage.
              </p>
              <p>
                <strong>Solution:</strong> Show appropriate use cases where AI genuinely helps. The goal is critical
                literacy, not rejection. Frame it as: "AI is a powerful tool that requires expertise to use well—and
                you're developing that expertise."
              </p>

              <h3>Challenge: Varying Levels of AI Experience</h3>
              <p>
                <strong>Problem:</strong> Some students are AI power users, others have never used it.
              </p>
              <p>
                <strong>Solution:</strong> Start with a baseline workshop where everyone learns together. Use peer
                teaching—experienced students can share tips while novices ask important "why?" questions.
              </p>

              <h2>Next Steps</h2>

              <div className="bg-muted p-6 rounded-lg space-y-4 not-prose my-8">
                <h3 className="text-lg font-semibold mb-3">Continue Learning</h3>
                <div className="space-y-2">
                  <Link href="/guides/ai-assignments" className="block text-primary hover:underline">
                    → Designing AI Assignments
                  </Link>
                  <Link href="/guides/prompt-engineering" className="block text-primary hover:underline">
                    → Prompt Engineering for Humanities
                  </Link>
                  <Link href="/guides/research-workflows" className="block text-primary hover:underline">
                    → AI for Research Workflows
                  </Link>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Share Your Teaching Strategies</h3>
                <p className="mb-4">
                  Developed effective approaches to teaching critical AI literacy? Your insights could help shape
                  best practices for the field. We're collecting case studies from educators navigating these challenges.
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href="mailto:bbreen@ucsc.edu">Share your experience</a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
