'use client'

import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { BackToTop } from '@/components/ui/back-to-top'
import { GuideBanner } from '@/components/ui/guide-banner'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ResponsibleAIClassroomGuide() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Responsible AI Use in the Classroom' }
      ]} />
      <Section className="pt-8 pb-16">
        <Container>
          <GuideBanner
            thumbnailPath="/thumbnails/responsible-ai-classroom.png"
            guideTitle="Responsible AI Use in the Classroom"
            guideId="responsible-ai-classroom"
          />

          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/#guides">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
              </Link>
            </Button>
          </div>

          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Responsible AI Use in the Classroom
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              How humanities faculty are approaching AI integration in 2025
            </p>

            <div className="prose prose-xl max-w-none">
              <p className="lead">
                This guide summarizes current thinking among humanities professors about AI in the classroom, drawing on recent research, professional discussions, and institutional policies from 2024-2025.
              </p>

              <h2>The Current Landscape</h2>

              <p>
                Faculty attitudes toward AI vary widely. A national survey found that 45% of humanities instructors disagree or strongly disagree that AI will have a positive impact on teaching, reflecting genuine concerns about its effects on critical thinking and writing skills. At the same time, many professors are experimenting with thoughtful integration strategies.
              </p>

              <p>
                The result is a spectrum of approaches—from complete prohibition to selective integration. There's no single "correct" position, but there is a growing consensus that decisions should be transparent, pedagogically grounded, and tailored to specific course goals.
              </p>

              <h2>Common Concerns</h2>

              <p>
                Humanities faculty have raised several consistent concerns:
              </p>

              <ul>
                <li><strong>Impact on foundational skills:</strong> Will students develop critical thinking, analysis, and writing abilities if AI handles initial drafts or idea generation?</li>
                <li><strong>Academic integrity:</strong> How do we distinguish between legitimate use and over-reliance? When does "assistance" become "outsourcing"?</li>
                <li><strong>Equity:</strong> Do all students have equal access to AI tools? Are we creating new divides?</li>
                <li><strong>Accuracy and bias:</strong> AI systems produce plausible-sounding errors and can reinforce existing biases in training data.</li>
                <li><strong>Privacy:</strong> What happens to student work entered into commercial AI systems?</li>
              </ul>

              <p>
                These concerns are legitimate. The question is how to address them constructively.
              </p>

              <h2>Range of Approaches</h2>

              <h3>Complete Prohibition</h3>

              <p>
                Some instructors prohibit AI use entirely, particularly in introductory courses focused on developing core skills. They've adapted assessments accordingly—converting take-home essays to in-class exams or oral presentations, for instance.
              </p>

              <p>
                This approach makes sense when the learning objective is to build specific capabilities that AI would bypass. However, it requires clear communication and modified assessment strategies.
              </p>

              <h3>Selective Integration</h3>

              <p>
                Many faculty allow AI for specific tasks while prohibiting it for others. Common frameworks include:
              </p>

              <ul>
                <li><strong>Process-based use:</strong> Permitting AI for brainstorming, outlining, or generating feedback, but requiring original analysis and writing</li>
                <li><strong>Staged assignments:</strong> Allowing AI in early research phases but requiring independent work for final submissions</li>
                <li><strong>Metacognitive applications:</strong> Using AI to simulate perspectives, then having students critique the outputs</li>
              </ul>

              <p>
                Professor Alexa Alice Joubin at George Washington University, for example, asks students to use AI to simulate how different communities might react to their ideas, treating it as a tool for developing metacognitive awareness rather than generating content.
              </p>

              <h3>Full Integration with Transparency</h3>

              <p>
                Some instructors permit broad AI use but require detailed documentation. Students might submit process notes explaining what AI tools they used, what prompts they employed, and how they evaluated and integrated the results.
              </p>

              <p>
                This approach treats AI literacy as a learning objective itself. The focus shifts from prohibiting AI to teaching responsible use—how to evaluate outputs, verify claims, and maintain intellectual ownership.
              </p>

              <h2>Practical Strategies</h2>

              <h3>Clear Syllabus Policies</h3>

              <p>
                Whatever your approach, articulate it clearly in your syllabus. Many institutions now provide templates, but effective policies typically include:
              </p>

              <ul>
                <li>Which AI tools (if any) students may use</li>
                <li>For which assignments or portions of assignments</li>
                <li>What documentation or attribution is required</li>
                <li>What happens if policies are violated</li>
              </ul>

              <p>
                The syllabus has become "the new battleground" as universities provide principle-based frameworks but leave detailed guidance to individual instructors.
              </p>

              <h3>Transparency as a Two-Way Street</h3>

              <p>
                If you require students to disclose AI use, consider modeling that behavior yourself. Some faculty include syllabus statements like: "I used ChatGPT to generate initial quiz questions, which I then revised and validated" or "Course readings were selected without AI assistance."
              </p>

              <p>
                This modeling demonstrates the transparency you expect while acknowledging that AI is becoming a normal part of academic work.
              </p>

              <h3>Assessment Redesign</h3>

              <p>
                Consider whether your assessments actually measure what you want students to learn. If an AI can complete an assignment competently, does that assignment truly assess critical thinking, analysis, or synthesis?
              </p>

              <p>
                Adaptations faculty have made include:
              </p>

              <ul>
                <li>Brief oral exams or presentations (15 minutes) instead of written essays</li>
                <li>Process portfolios showing drafts, notes, and revision stages</li>
                <li>In-class writing or timed assessments</li>
                <li>Assignments requiring engagement with specific course materials AI hasn't seen</li>
                <li>Reflection papers where students analyze AI outputs alongside other sources</li>
              </ul>

              <h3>Teaching Critical Evaluation</h3>

              <p>
                Several instructors have found success using AI outputs as teaching materials. Students might:
              </p>

              <ul>
                <li>Generate AI responses to historical questions, then identify errors and evaluate reasoning</li>
                <li>Compare AI-written analysis to published scholarship</li>
                <li>Explore how changing prompts affects outputs, learning about framing and bias</li>
                <li>Fact-check AI claims using primary sources</li>
              </ul>

              <p>
                This treats AI as an object of study rather than just a tool, building media literacy and critical thinking.
              </p>

              <h3>Focus on Process, Not Just Product</h3>

              <p>
                If learning happens through the process of research, analysis, and writing, make that process visible. Require:
              </p>

              <ul>
                <li>Annotated bibliographies showing source engagement</li>
                <li>Research journals or logs</li>
                <li>Multiple drafts with reflections on changes</li>
                <li>In-class workshops where students discuss their developing arguments</li>
              </ul>

              <p>
                These scaffolds make it harder to outsource work while supporting genuine learning.
              </p>

              <h2>What About Detection?</h2>

              <p>
                AI detection tools are widely available but problematic. A 2023 evaluation found that 14 detection tools all scored below 80% accuracy. False positives can wrongly accuse students, while false negatives miss actual AI use.
              </p>

              <p>
                More importantly, detection-based approaches create adversarial dynamics. Most faculty report better results from clear policies, transparent conversations, and assessment designs that make AI misuse less tempting or useful.
              </p>

              <h2>Examples from Humanities Courses</h2>

              <h3>History</h3>

              <p>
                History instructors are using AI to teach core historical skills. One approach: have ChatGPT answer an inquiry question, then set up stations with primary sources, textbook excerpts, and other materials so students practice corroboration and evidence-based reasoning.
              </p>

              <p>
                Others ask students to generate AI responses about historical events, then identify factual errors and anachronistic reasoning—building fact-checking skills and historical thinking.
              </p>

              <h3>Writing and Composition</h3>

              <p>
                Writing instructors have experimented with having students evaluate and revise AI-generated prose, or use AI for brainstorming while reserving analysis and argumentation for human work.
              </p>

              <p>
                An ASU study through their Writing Programs (funded by the National Endowment for the Humanities) examined voluntary AI use in composition classes, finding that clear frameworks and pedagogical purpose mattered more than the tools themselves.
              </p>

              <h3>Literature</h3>

              <p>
                Literature faculty have used AI to generate initial interpretations that students then critique, or to simulate reader responses from different theoretical perspectives as a way to introduce critical frameworks.
              </p>

              <p>
                UCLA's comparative literature department piloted an AI-assisted course on medieval literature, using AI to create accessible materials while maintaining focus on close reading and critical analysis as distinctly human skills.
              </p>

              <h2>Institutional and Professional Resources</h2>

              <p>
                You're not alone in navigating this. Several organizations have developed frameworks and resources:
              </p>

              <ul>
                <li>The Modern Language Association (MLA) convened a joint task force with the Conference on College Composition and Communication (CCCC) to develop guidelines and professional standards</li>
                <li>The National Endowment for the Humanities funded research on AI in humanities pedagogy</li>
                <li>Professional discussions at conferences like SXSW EDU 2025 and MLA 2025 provided forums for sharing approaches</li>
                <li>Many universities have created AI working groups producing white papers and institutional guidance</li>
              </ul>

              <p>
                Check whether your institution offers workshops, templates, or consultation services for faculty.
              </p>

              <h2>Student Perspectives</h2>

              <p>
                It's worth noting that students are using AI whether we permit it or not. A 2025 survey found that 86% of students globally use AI in their studies, up from 53% the previous year.
              </p>

              <p>
                This doesn't mean we should simply accept unrestricted use. But it suggests that teaching responsible use may be more effective than assuming prohibition will work. Students need to understand not just the rules but the pedagogical reasoning—why we ask them to do their own thinking and writing.
              </p>

              <h2>Key Principles</h2>

              <p>
                Across the range of approaches, several principles emerge:
              </p>

              <ol>
                <li><strong>Ground decisions in learning objectives.</strong> What do you want students to be able to do? Design your AI policy to support those goals, not as a blanket reaction.</li>
                <li><strong>Be transparent.</strong> Explain your reasoning to students. Model the behavior you expect.</li>
                <li><strong>Focus on process.</strong> If learning happens through struggle and iteration, make that process visible and assessable.</li>
                <li><strong>Teach critical evaluation.</strong> AI outputs are not truth; they're text that requires verification, just like any other source.</li>
                <li><strong>Maintain flexibility.</strong> What works for an introductory writing course may differ from an advanced seminar. Adjust as needed.</li>
                <li><strong>Keep the human element central.</strong> AI can assist with information processing, but critical judgment, ethical reasoning, and meaningful interpretation remain human capacities worth developing.</li>
              </ol>

              <h2>Looking Ahead</h2>

              <p>
                This is a moment of genuine uncertainty. No one has definitive answers about how AI will reshape humanities education. That's uncomfortable but also an opportunity for thoughtful experimentation.
              </p>

              <p>
                The goal isn't to find a single "right way" but to make informed decisions grounded in pedagogical principles, disciplinary values, and transparent communication with students. As Professor Steven Lubar at Brown University notes, these tools will be part of students' future work—the question is whether we help them learn to use them thoughtfully.
              </p>

              <p>
                Whatever approach you choose, you're part of a broader conversation among humanities faculty about maintaining what's essential in our disciplines while adapting to technological change. That conversation is ongoing, and your insights matter.
              </p>

              <div className="mt-12 p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Further Resources</h3>
                <p className="text-sm mb-4">
                  For more on AI in humanities pedagogy, see:
                </p>
                <ul className="text-sm space-y-2">
                  <li>
                    <Link href="/blog" className="text-primary hover:underline">
                      Our blog
                    </Link>
                    {' '}for ongoing discussions
                  </li>
                  <li>
                    <Link href="/resources" className="text-primary hover:underline">
                      Historical perspectives
                    </Link>
                    {' '}on automation and education
                  </li>
                  <li>
                    <Link href="/pedagogy" className="text-primary hover:underline">
                      Other teaching guides
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <BackToTop />
    </>
  )
}
