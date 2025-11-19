import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Target, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react'

export default function AIAssignmentsGuide() {
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
              <Badge variant="outline">Intermediate</Badge>
              <Badge variant="outline">Pedagogy</Badge>
              <Badge variant="outline">Assessment</Badge>
            </div>

            <h1 className="text-4xl font-serif font-bold mb-4">
              Designing AI Assignments
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Best practices for creating effective AI-enhanced assignments that develop historical thinking and critical skills
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="flex items-center gap-2">
                <Target className="h-6 w-6" /> The Challenge: Beyond Detection
              </h2>
              <p>
                The arrival of powerful AI tools like Claude and ChatGPT has fundamentally changed the landscape of academic assignments.
                Rather than fighting AI with detection tools (which don't work reliably), we need to redesign assignments that:
              </p>
              <ul>
                <li>Leverage AI as a learning tool rather than a shortcut</li>
                <li>Develop critical thinking about AI outputs</li>
                <li>Require genuine historical reasoning that AI alone cannot provide</li>
                <li>Make transparent and intentional use of AI part of the learning objectives</li>
              </ul>

              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg my-6">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" /> Core Principle
                </p>
                <p className="text-sm">
                  Design assignments where using AI is encouraged but insufficient. Students must bring historical knowledge,
                  critical analysis, and synthesis that goes beyond what an AI can produce from a simple prompt.
                </p>
              </div>

              <h2 className="flex items-center gap-2">
                <BookOpen className="h-6 w-6" /> Three Types of AI-Enhanced Assignments
              </h2>

              <h3>Type 1: AI as Conversation Partner</h3>
              <p>
                Students engage with AI-powered historical simulations or chatbots to practice historical inquiry.
              </p>

              <h4>Example Assignment: Interview with a Historical Figure</h4>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                <strong>Assignment:</strong> Using the Young Darwin simulation, conduct a 20-minute conversation exploring
                Darwin's observations in the Galápagos Islands (1835). Your deliverable includes:
                <br/><br/>
                1. Full conversation transcript<br/>
                2. A 3-page analysis comparing Darwin's responses to actual primary sources from this period<br/>
                3. A reflection on what the AI got right vs. wrong, citing specific historical evidence
              </blockquote>

              <p><strong>Why this works:</strong></p>
              <ul>
                <li>Students must have historical knowledge to ask meaningful questions</li>
                <li>The analysis requires comparing AI output to real sources</li>
                <li>Critical evaluation of AI accuracy is built into the rubric</li>
                <li>Can't be completed by just copying AI output—requires synthesis</li>
              </ul>

              <h3>Type 2: AI as Research Assistant</h3>
              <p>
                Students use AI to help with research tasks, but must critically evaluate and verify all outputs.
              </p>

              <h4>Example Assignment: Annotated AI-Assisted Research</h4>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                <strong>Assignment:</strong> Research the role of women in the American Revolutionary War using both traditional
                sources and AI assistance. Document your process:
                <br/><br/>
                1. Submit all prompts you used to query AI about this topic<br/>
                2. For each AI response, provide: (a) fact-checking notes, (b) additional sources you found to verify claims,
                (c) corrections or nuances the AI missed<br/>
                3. Final 5-page research paper with annotated bibliography noting which sources came from AI suggestions vs. your own research<br/>
                4. 2-page reflection on what AI was helpful for vs. where it led you astray
              </blockquote>

              <p><strong>Why this works:</strong></p>
              <ul>
                <li>Explicitly integrates AI into research process</li>
                <li>Requires metacognitive awareness of AI's role</li>
                <li>Assessment focuses on verification and critical evaluation</li>
                <li>Teaches responsible AI use as a research skill</li>
              </ul>

              <h3>Type 3: AI as a Tool to Critique</h3>
              <p>
                Students analyze AI outputs for historical accuracy, bias, and limitations.
              </p>

              <h4>Example Assignment: Historical Fact-Checking AI</h4>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                <strong>Assignment:</strong> Generate 5 different AI responses about the causes of the Civil War using different
                prompts and AI models (ChatGPT, Claude, etc.). Then:
                <br/><br/>
                1. Analyze each response for historical accuracy using primary and secondary sources<br/>
                2. Identify patterns in what AI gets wrong or oversimplifies<br/>
                3. Examine how different prompts lead to different historical narratives<br/>
                4. Write a 4-page analysis of what these patterns reveal about AI's understanding of historical causation
              </blockquote>

              <p><strong>Why this works:</strong></p>
              <ul>
                <li>Turns AI into an object of study rather than just a tool</li>
                <li>Develops critical media literacy</li>
                <li>Requires deep historical knowledge to identify errors</li>
                <li>Teaches students to question AI-generated content</li>
              </ul>

              <h2>Assignment Design Principles</h2>

              <h3>Principle 1: Make Your Learning Objectives Explicit</h3>
              <p>
                Be clear about what you want students to learn. If the assignment can be completed by copying AI output,
                your learning objectives aren't being met.
              </p>

              <div className="bg-muted p-4 rounded-lg my-6">
                <p className="font-semibold mb-2">Poor Learning Objective:</p>
                <p className="text-sm mb-3">"Students will write a 5-page paper on the French Revolution."</p>

                <p className="font-semibold mb-2">Strong Learning Objective:</p>
                <p className="text-sm">
                  "Students will analyze competing historiographical interpretations of the French Revolution's causes,
                  evaluate primary source evidence, and construct an argument about which interpretation is most
                  supported by the sources."
                </p>
              </div>

              <p>
                The strong objective requires historical thinking skills that AI alone cannot demonstrate without
                the student providing sources, frameworks, and original synthesis.
              </p>

              <h3>Principle 2: Require Process Documentation</h3>
              <p>
                Don't just grade the final product. Ask students to document their thinking process:
              </p>
              <ul>
                <li>Annotated bibliographies explaining source selection</li>
                <li>Research logs showing inquiry evolution</li>
                <li>AI conversation transcripts with reflective commentary</li>
                <li>Multiple drafts showing revision based on peer/instructor feedback</li>
              </ul>

              <h3>Principle 3: Include Specific, Local, or Personal Sources</h3>
              <p>
                AI models are trained on general knowledge. Assignments requiring engagement with:
              </p>
              <ul>
                <li>Local archives and special collections</li>
                <li>Course-specific primary source readers</li>
                <li>Class discussions and guest lectures</li>
                <li>Material objects and museum visits</li>
              </ul>
              <p>
                These require students to bring knowledge AI doesn't have, making their contribution essential.
              </p>

              <h3>Principle 4: Emphasize Comparative and Evaluative Tasks</h3>
              <p>
                Instead of "summarize X," ask students to:
              </p>
              <ul>
                <li>Compare different historians' interpretations of X</li>
                <li>Evaluate which primary sources best support interpretation Y</li>
                <li>Assess the strengths and limitations of source Z</li>
                <li>Explain why scholar A's argument is more convincing than scholar B's</li>
              </ul>

              <h2 className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6" /> Creating AI-Aware Rubrics
              </h2>

              <h3>Sample Rubric: AI-Assisted Research Paper</h3>
              <div className="bg-muted p-4 rounded-lg my-6 text-sm">
                <p className="font-semibold mb-3">Historical Argument (30%)</p>
                <ul className="mb-4">
                  <li>Thesis demonstrates original interpretation, not AI-generated summary</li>
                  <li>Argument shows synthesis of multiple sources and perspectives</li>
                  <li>Evidence of independent historical thinking beyond AI capabilities</li>
                </ul>

                <p className="font-semibold mb-3">Source Analysis (25%)</p>
                <ul className="mb-4">
                  <li>Close reading of primary sources with specific textual evidence</li>
                  <li>Critical evaluation of source credibility and context</li>
                  <li>Integration of sources AI likely wouldn't know about</li>
                </ul>

                <p className="font-semibold mb-3">Critical AI Use (20%)</p>
                <ul className="mb-4">
                  <li>Transparent documentation of when and how AI was used</li>
                  <li>Evidence of fact-checking and verification of AI outputs</li>
                  <li>Thoughtful reflection on AI's strengths and limitations</li>
                </ul>

                <p className="font-semibold mb-3">Historical Thinking (15%)</p>
                <ul className="mb-4">
                  <li>Demonstrates understanding of historical context and change over time</li>
                  <li>Considers multiple perspectives and contingency</li>
                  <li>Avoids anachronism and presentism</li>
                </ul>

                <p className="font-semibold mb-3">Writing and Organization (10%)</p>
                <ul>
                  <li>Clear structure with transitions and paragraph coherence</li>
                  <li>Proper citation and academic conventions</li>
                  <li>Voice shows engagement and individual thinking</li>
                </ul>
              </div>

              <h3>Red Flags for AI Overreliance</h3>
              <p>Watch for these indicators that a student may be over-relying on AI without critical engagement:</p>
              <ul>
                <li>Generic, encyclopedic tone lacking personal voice or argument</li>
                <li>Suspiciously comprehensive coverage without depth</li>
                <li>Lack of engagement with course-specific materials or discussions</li>
                <li>Perfect grammar but shallow historical analysis</li>
                <li>Sources that are all readily available online vs. library databases</li>
                <li>Absence of the messy thinking process evident in earlier drafts</li>
              </ul>

              <h2 className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6" /> Common Pitfalls and Solutions
              </h2>

              <h3>Pitfall 1: The "Don't Use AI" Policy</h3>
              <p>
                <strong>Problem:</strong> Blanket AI bans are unenforceable and fail to teach students responsible AI use.
              </p>
              <p>
                <strong>Solution:</strong> Create clear guidelines for acceptable AI use. Example policy:
              </p>
              <div className="bg-muted p-4 rounded-lg my-6 text-sm">
                <p className="font-semibold mb-2">AI Use Policy for This Course</p>
                <p className="mb-2">
                  <strong>Encouraged:</strong> Using AI to brainstorm ideas, explain difficult concepts, suggest sources,
                  generate discussion questions, or practice language translation.
                </p>
                <p className="mb-2">
                  <strong>Allowed with Citation:</strong> Quoting AI responses as primary evidence to analyze, using AI
                  to summarize your own notes, having AI help revise your writing.
                </p>
                <p>
                  <strong>Not Allowed:</strong> Submitting AI-generated text as your own writing, using AI to generate
                  core arguments without your own analysis, avoiding engagement with course materials by asking AI instead.
                </p>
              </div>

              <h3>Pitfall 2: Death by Documentation</h3>
              <p>
                <strong>Problem:</strong> Requiring too much documentation of AI use becomes busywork.
              </p>
              <p>
                <strong>Solution:</strong> Make documentation purposeful. Instead of "submit all AI conversations," ask:
                "Write a 1-page reflection on one moment where AI helped your thinking and one moment where it led you astray."
              </p>

              <h3>Pitfall 3: Assuming AI Access</h3>
              <p>
                <strong>Problem:</strong> Not all students have equal access to paid AI tools or reliable internet.
              </p>
              <p>
                <strong>Solution:</strong> If assignments require AI, provide institutional access or make AI use optional
                with alternative assignment paths.
              </p>

              <h3>Pitfall 4: Gaming the System</h3>
              <p>
                <strong>Problem:</strong> Students submit fake "AI reflection" paragraphs generated by AI.
              </p>
              <p>
                <strong>Solution:</strong> Include assignment components that happen in class (discussions, presentations,
                peer review) where authentic understanding is visible. Use progressive assignments where later work builds
                on earlier demonstrated knowledge.
              </p>

              <h2>Real-World Examples</h2>

              <div className="grid gap-4 my-8">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Apothecary Simulator Assignment</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Students run an 18th-century pharmacy simulation, then write an analysis comparing period medical
                    practices to modern medicine. The AI provides historically accurate scenarios; students must research
                    and analyze the historical context.
                  </p>
                  <Link href="/projects/apothecary-simulator" className="text-sm text-primary hover:underline">
                    View project →
                  </Link>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">HistoryLens Research Framework</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Students use AI to generate multiple interpretive frameworks for a historical question, then evaluate
                    which frameworks are most supported by primary sources they've analyzed. AI provides scaffolding;
                    students provide evidence and judgment.
                  </p>
                  <Link href="/projects/historylens" className="text-sm text-primary hover:underline">
                    View project →
                  </Link>
                </div>
              </div>

              <h2>Assessment Best Practices</h2>

              <h3>Move to Portfolio Assessment</h3>
              <p>
                Instead of one-off papers, have students build portfolios showing:
              </p>
              <ul>
                <li>Multiple drafts with revision commentary</li>
                <li>Research process documentation</li>
                <li>Reflection on learning and skill development</li>
                <li>Evidence of engagement with feedback</li>
              </ul>

              <h3>Use Low-Stakes Formative Assessments</h3>
              <p>
                Regular small assignments help you track authentic student understanding:
              </p>
              <ul>
                <li>In-class writing on that day's sources</li>
                <li>Discussion board posts responding to peers</li>
                <li>Quick reading quizzes on specific textual details</li>
                <li>Think-pair-share activities</li>
              </ul>

              <h3>Incorporate Oral Components</h3>
              <p>
                Add presentations, oral exams, or recorded explanations where students must demonstrate knowledge in real-time.
              </p>

              <h2>Sample Assignment: The Complete Package</h2>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg my-8">
                <h3 className="font-semibold mb-4">Assignment: Debating the New Deal</h3>

                <p className="mb-4">
                  <strong>Duration:</strong> 3 weeks | <strong>Weight:</strong> 20% of final grade
                </p>

                <p className="font-semibold mb-2">Part 1: AI-Assisted Research (Week 1)</p>
                <p className="text-sm mb-3">
                  Use Claude or ChatGPT to generate an overview of New Deal programs and their critics. Document your
                  prompts and responses. Then, fact-check the AI's claims using our course reader and at least 3 scholarly
                  sources. Create an annotated document noting: (a) what AI got right, (b) what it oversimplified or got
                  wrong, (c) what important context it missed.
                </p>

                <p className="font-semibold mb-2">Part 2: Primary Source Analysis (Week 2)</p>
                <p className="text-sm mb-3">
                  Analyze 5 primary sources from our course archive (letters, speeches, newspaper articles from 1933-1938).
                  For each source, write a 1-paragraph analysis of the author's perspective on the New Deal. You may discuss
                  these sources with AI, but your analysis must include specific quotations and historical context that
                  demonstrates close reading.
                </p>

                <p className="font-semibold mb-2">Part 3: In-Class Debate (Week 3)</p>
                <p className="text-sm mb-3">
                  Participate in a class debate representing either supporters or critics of the New Deal. You'll be randomly
                  assigned a position. Use evidence from your research and primary sources to make arguments. You may prepare
                  with AI, but must respond to classmates' arguments in real-time.
                </p>

                <p className="font-semibold mb-2">Part 4: Reflective Essay (Week 3)</p>
                <p className="text-sm">
                  Write a 4-page essay arguing which New Deal programs were most effective and why. Include: (1) your thesis,
                  (2) evidence from primary sources, (3) engagement with at least 2 different historians' interpretations,
                  (4) a one-page appendix reflecting on how AI helped or hindered your research process.
                </p>
              </div>

              <h2>Next Steps</h2>

              <div className="bg-muted p-6 rounded-lg space-y-4 not-prose my-8">
                <h3 className="text-lg font-semibold mb-3">Continue Learning</h3>
                <div className="space-y-2">
                  <Link href="/guides/building-simulations" className="block text-primary hover:underline">
                    → Building Historical Simulations
                  </Link>
                  <Link href="/guides/critical-pedagogy" className="block text-primary hover:underline">
                    → Critical AI Pedagogy
                  </Link>
                  <Link href="/guides/prompt-engineering" className="block text-primary hover:underline">
                    → Prompt Engineering for Humanities
                  </Link>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Share Your Assignment Designs</h3>
                <p className="mb-4">
                  Developed an effective AI-enhanced assignment? We'd love to learn from your experience and potentially
                  feature it as a case study for other educators.
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href="mailto:bbreen@ucsc.edu">Get in touch</a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
