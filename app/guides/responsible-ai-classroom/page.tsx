'use client'

import { GuideLayout, WikiLink, GuideSectionDivider } from '@/components/ui/guide-layout'
import { HeadingAnchor } from '@/components/ui/heading-anchor'
import Link from 'next/link'
import { Lightbulb, AlertCircle, CheckCircle, Users, BookOpen } from 'lucide-react'
import { siteConfig } from '@/lib/config'

const tableOfContents = [
  { id: 'landscape', title: 'The Current Landscape' },
  { id: 'concerns', title: 'Common Concerns' },
  { id: 'approaches', title: 'Range of Approaches' },
  { id: 'strategies', title: 'Practical Strategies' },
  { id: 'detection', title: 'What About Detection?' },
  { id: 'examples', title: 'Discipline Examples' },
  { id: 'resources', title: 'Institutional Resources' },
  { id: 'principles', title: 'Key Principles' },
]

export default function ResponsibleAIClassroomGuide() {
  return (
    <GuideLayout
      title="Responsible AI Use in the Classroom"
      subtitle="How humanities faculty are approaching AI integration in 2025"
      guideId="responsible-ai-classroom"
      thumbnailPath="/thumbnails/responsible-ai-classroom.webp"
      author={{
        name: 'Benjamin Breen',
        role: 'Principal Investigator, THINK',
      }}
      lastUpdated="November 2025"
      readingTime="15 min read"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        This guide summarizes current thinking among humanities professors about AI in the classroom, drawing on recent research, professional discussions, and institutional policies from 2024-2025.
      </p>

      <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-amber-900 dark:text-amber-100">
              No Single "Right" Answer
            </h4>
            <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-0">
              Faculty approaches to AI vary widely—from complete prohibition to full integration. There's no single "correct" position, but there is growing consensus that decisions should be transparent, pedagogically grounded, and tailored to specific course goals.
            </p>
          </div>
        </div>
      </div>

      <HeadingAnchor id="landscape">The Current Landscape</HeadingAnchor>

      <p>
        Faculty attitudes toward AI vary widely. A 2024 national survey found that 45% of humanities instructors disagree or strongly disagree that AI will have a positive impact on teaching, reflecting genuine concerns about its effects on <WikiLink term="Critical thinking">critical thinking</WikiLink> and writing skills. At the same time, many professors are experimenting with thoughtful integration strategies.
      </p>

      <p>
        The result is a spectrum of approaches—from complete prohibition to selective integration. There's no single "correct" position, but there is a growing consensus that decisions should be transparent, pedagogically grounded, and tailored to specific course goals.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="concerns">Common Concerns</HeadingAnchor>

      <p>
        Humanities faculty have raised several consistent concerns about AI in education:
      </p>

      <div className="my-6 space-y-4">
        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Impact on Foundational Skills</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            Will students develop critical thinking, analysis, and writing abilities if AI handles initial drafts or idea generation? The concern is that <WikiLink term="Cognitive offloading">cognitive offloading</WikiLink> may prevent deep learning.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Academic Integrity</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            How do we distinguish between legitimate use and over-reliance? When does "assistance" become "outsourcing"? Traditional definitions of <WikiLink term="Academic dishonesty">academic dishonesty</WikiLink> don't map cleanly onto AI use.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Equity and Access</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            Do all students have equal access to AI tools? Are we creating new divides between students who can afford premium AI subscriptions and those who cannot?
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Accuracy and Bias</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            AI systems produce plausible-sounding errors (<WikiLink term="Hallucination (artificial intelligence)">hallucinations</WikiLink>) and can reinforce existing biases in training data. Students may trust AI outputs without appropriate skepticism.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Privacy Concerns</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            What happens to student work entered into commercial AI systems? Are there <WikiLink term="FERPA">FERPA</WikiLink> implications when student data is processed by third-party AI?
          </p>
        </div>
      </div>

      <p>
        These concerns are legitimate. The question is how to address them constructively.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="approaches">Range of Approaches</HeadingAnchor>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Complete Prohibition</h3>

      <p>
        Some instructors prohibit AI use entirely, particularly in introductory courses focused on developing core skills. They've adapted assessments accordingly—converting take-home essays to in-class exams or oral presentations, for instance.
      </p>

      <p>
        This approach makes sense when the learning objective is to build specific capabilities that AI would bypass. However, it requires clear communication and modified assessment strategies.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Selective Integration</h3>

      <p>
        Many faculty allow AI for specific tasks while prohibiting it for others. Common frameworks include:
      </p>

      <ul>
        <li><strong>Process-based use:</strong> Permitting AI for brainstorming, outlining, or generating feedback, but requiring original analysis and writing</li>
        <li><strong>Staged assignments:</strong> Allowing AI in early research phases but requiring independent work for final submissions</li>
        <li><strong>Metacognitive applications:</strong> Using AI to simulate perspectives, then having students critique the outputs</li>
      </ul>

      <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
        <div className="flex gap-3">
          <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
              Example: Metacognitive AI Use
            </h4>
            <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
              Professor Alexa Alice Joubin at <WikiLink term="George Washington University">George Washington University</WikiLink> asks students to use AI to simulate how different communities might react to their ideas, treating it as a tool for developing metacognitive awareness rather than generating content.
            </p>
          </div>
        </div>
      </div>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Full Integration with Transparency</h3>

      <p>
        Some instructors permit broad AI use but require detailed documentation. Students might submit process notes explaining what AI tools they used, what prompts they employed, and how they evaluated and integrated the results.
      </p>

      <p>
        This approach treats AI literacy as a learning objective itself. The focus shifts from prohibiting AI to teaching responsible use—how to evaluate outputs, verify claims, and maintain intellectual ownership.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="strategies">Practical Strategies</HeadingAnchor>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Clear Syllabus Policies</h3>

      <p>
        Whatever your approach, articulate it clearly in your <WikiLink term="Syllabus">syllabus</WikiLink>. Many institutions now provide templates, but effective policies typically include:
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

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Transparency as a Two-Way Street</h3>

      <p>
        If you require students to disclose AI use, consider modeling that behavior yourself. Some faculty include syllabus statements like: "I used ChatGPT to generate initial quiz questions, which I then revised and validated" or "Course readings were selected without AI assistance."
      </p>

      <p>
        This modeling demonstrates the transparency you expect while acknowledging that AI is becoming a normal part of academic work.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Assessment Redesign</h3>

      <p>
        Consider whether your assessments actually measure what you want students to learn. If an AI can complete an assignment competently, does that assignment truly assess critical thinking, analysis, or synthesis?
      </p>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <h4 className="font-sans text-base font-semibold mt-0 mb-3">Assessment Adaptations Faculty Have Made</h4>
        <ul className="text-sm space-y-2 mb-0 pl-5">
          <li>Brief oral exams or presentations (15 minutes) instead of written essays</li>
          <li>Process <WikiLink term="Electronic portfolio">portfolios</WikiLink> showing drafts, notes, and revision stages</li>
          <li>In-class writing or timed assessments</li>
          <li>Assignments requiring engagement with specific course materials AI hasn't seen</li>
          <li>Reflection papers where students analyze AI outputs alongside other sources</li>
        </ul>
      </div>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Teaching Critical Evaluation</h3>

      <p>
        Several instructors have found success using AI outputs as teaching materials. Students might:
      </p>

      <ul>
        <li>Generate AI responses to historical questions, then identify errors and evaluate reasoning</li>
        <li>Compare AI-written analysis to published scholarship</li>
        <li>Explore how changing prompts affects outputs, learning about framing and bias</li>
        <li>Fact-check AI claims using <WikiLink term="Primary source">primary sources</WikiLink></li>
      </ul>

      <p>
        This treats AI as an object of study rather than just a tool, building <WikiLink term="Media literacy">media literacy</WikiLink> and critical thinking.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Focus on Process, Not Just Product</h3>

      <p>
        If learning happens through the process of research, analysis, and writing, make that process visible. Require:
      </p>

      <ul>
        <li><WikiLink term="Annotated bibliography">Annotated bibliographies</WikiLink> showing source engagement</li>
        <li>Research journals or logs</li>
        <li>Multiple drafts with reflections on changes</li>
        <li>In-class workshops where students discuss their developing arguments</li>
      </ul>

      <p>
        These scaffolds make it harder to outsource work while supporting genuine learning.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="detection">What About Detection?</HeadingAnchor>

      <div className="my-8 p-6 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-600 rounded-r-lg">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-orange-900 dark:text-orange-100">
              Detection Tools Are Unreliable
            </h4>
            <p className="text-sm text-orange-900/80 dark:text-orange-100/80 mb-0">
              A 2023 evaluation found that 14 AI detection tools all scored below 80% accuracy. False positives can wrongly accuse students, while false negatives miss actual AI use. Detection-based approaches create adversarial dynamics that undermine the learning environment.
            </p>
          </div>
        </div>
      </div>

      <p>
        Most faculty report better results from clear policies, transparent conversations, and assessment designs that make AI misuse less tempting or useful. Building a classroom culture of intellectual honesty tends to be more effective than surveillance.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="examples">Examples from Humanities Courses</HeadingAnchor>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">History</h3>

      <p>
        History instructors are using AI to teach core historical skills. One approach: have <WikiLink term="ChatGPT">ChatGPT</WikiLink> answer an inquiry question, then set up stations with <WikiLink term="Primary source">primary sources</WikiLink>, textbook excerpts, and other materials so students practice <WikiLink term="Corroboration">corroboration</WikiLink> and evidence-based reasoning.
      </p>

      <p>
        Others ask students to generate AI responses about historical events, then identify factual errors and <WikiLink term="Anachronism">anachronistic</WikiLink> reasoning—building fact-checking skills and historical thinking.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Writing and Composition</h3>

      <p>
        Writing instructors have experimented with having students evaluate and revise AI-generated prose, or use AI for brainstorming while reserving analysis and argumentation for human work.
      </p>

      <p>
        An <WikiLink term="Arizona State University">ASU</WikiLink> study through their Writing Programs (funded by the <WikiLink term="National Endowment for the Humanities">National Endowment for the Humanities</WikiLink>) examined voluntary AI use in composition classes, finding that clear frameworks and pedagogical purpose mattered more than the tools themselves.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Literature</h3>

      <p>
        Literature faculty have used AI to generate initial interpretations that students then critique, or to simulate reader responses from different theoretical perspectives (<WikiLink term="New Criticism">New Criticism</WikiLink>, <WikiLink term="Postcolonialism">postcolonial</WikiLink>, <WikiLink term="Feminist literary criticism">feminist</WikiLink>) as a way to introduce critical frameworks.
      </p>

      <p>
        <WikiLink term="University of California, Los Angeles">UCLA's</WikiLink> comparative literature department piloted an AI-assisted course on <WikiLink term="Medieval literature">medieval literature</WikiLink>, using AI to create accessible materials while maintaining focus on <WikiLink term="Close reading">close reading</WikiLink> and critical analysis as distinctly human skills.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="resources">Institutional and Professional Resources</HeadingAnchor>

      <p>
        You're not alone in navigating this. Several organizations have developed frameworks and resources:
      </p>

      <ul>
        <li>The <WikiLink term="Modern Language Association">Modern Language Association (MLA)</WikiLink> convened a joint task force with the Conference on College Composition and Communication (CCCC) to develop guidelines and professional standards</li>
        <li>The <WikiLink term="National Endowment for the Humanities">National Endowment for the Humanities</WikiLink> funded research on AI in humanities pedagogy</li>
        <li>Professional discussions at conferences like SXSW EDU 2025 and MLA 2025 provided forums for sharing approaches</li>
        <li>Many universities have created AI working groups producing white papers and institutional guidance</li>
      </ul>

      <p>
        Check whether your institution offers workshops, templates, or consultation services for faculty.
      </p>

      <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
        <div className="flex gap-3">
          <Users className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
              Student Perspectives Matter
            </h4>
            <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
              A 2025 survey found that 86% of students globally use AI in their studies, up from 53% the previous year. This doesn't mean we should accept unrestricted use, but it suggests that teaching responsible use may be more effective than assuming prohibition will work. Students need to understand not just the rules but the pedagogical reasoning.
            </p>
          </div>
        </div>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="principles">Key Principles</HeadingAnchor>

      <p>
        Across the range of approaches, several principles emerge:
      </p>

      <div className="my-6 space-y-4">
        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                1. Ground decisions in learning objectives
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                What do you want students to be able to do? Design your AI policy to support those goals, not as a blanket reaction.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                2. Be transparent
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                Explain your reasoning to students. Model the behavior you expect.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                3. Focus on process
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                If learning happens through struggle and iteration, make that process visible and assessable.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                4. Teach critical evaluation
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                AI outputs are not truth; they're text that requires verification, just like any other source.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                5. Maintain flexibility
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                What works for an introductory writing course may differ from an advanced seminar. Adjust as needed.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <div className="flex gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                6. Keep the human element central
              </h4>
              <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                AI can assist with information processing, but critical judgment, ethical reasoning, and meaningful interpretation remain human capacities worth developing.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Looking Ahead</h3>
        <p className="mb-3">
          This is a moment of genuine uncertainty. No one has definitive answers about how AI will reshape humanities education. That's uncomfortable but also an opportunity for thoughtful experimentation.
        </p>
        <p className="mb-0">
          The goal isn't to find a single "right way" but to make informed decisions grounded in pedagogical principles, disciplinary values, and transparent communication with students. As Professor Steven Lubar at <WikiLink term="Brown University">Brown University</WikiLink> notes, these tools will be part of students' future work—the question is whether we help them learn to use them thoughtfully.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Further Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/guides/prompt-engineering" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h4 className="font-semibold mb-1 text-sm">Prompt Engineering for Humanities</h4>
            <p className="text-xs text-muted-foreground">Advanced techniques for working with AI</p>
          </Link>
          <Link href="/guides/ai-historical-research" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h4 className="font-semibold mb-1 text-sm">AI for Historical Research</h4>
            <p className="text-xs text-muted-foreground">Practical workflows for scholars</p>
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
