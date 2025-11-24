'use client'

import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { BackToTop } from '@/components/ui/back-to-top'
import { HeadingAnchor } from '@/components/ui/heading-anchor'
import { GuideBanner } from '@/components/ui/guide-banner'
import Link from 'next/link'
import { ArrowLeft, Lightbulb, AlertCircle, CheckCircle, Code } from 'lucide-react'

export default function PromptEngineeringGuide() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Prompt Engineering for Humanities' }
      ]} />
      <Section className="pt-8 pb-16">
        <Container>
          <GuideBanner
            thumbnailPath="/thumbnails/prompt-engineering.png"
            guideTitle="Prompt Engineering for Humanities"
            guideId="prompt-engineering"
          />

          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/#guides">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
              </Link>
            </Button>
          </div>

          {/* Table of Contents Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 bg-muted/30 rounded-lg p-6">
                <h3 className="font-sans text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
                  On This Page
                </h3>
                <nav className="space-y-2 text-sm">
                  <a href="#what-is-prompting" className="block text-foreground/70 hover:text-primary transition-colors">
                    What Is Prompt Engineering?
                  </a>
                  <a href="#boundaries" className="block text-foreground/70 hover:text-primary transition-colors">
                    Ethical Boundaries
                  </a>
                  <a href="#anatomy" className="block text-foreground/70 hover:text-primary transition-colors">
                    Anatomy of a Good Prompt
                  </a>
                  <a href="#building-tools" className="block text-foreground/70 hover:text-primary transition-colors">
                    Building Educational Tools
                  </a>
                  <a href="#augmentation" className="block text-foreground/70 hover:text-primary transition-colors">
                    Research Augmentation
                  </a>
                  <a href="#simulations" className="block text-foreground/70 hover:text-primary transition-colors">
                    Historical Simulations
                  </a>
                  <a href="#testing" className="block text-foreground/70 hover:text-primary transition-colors">
                    Testing & Iteration
                  </a>
                  <a href="#pitfalls" className="block text-foreground/70 hover:text-primary transition-colors">
                    Common Pitfalls
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-serif font-bold mb-4">
                  Prompt Engineering for Humanities
                </h1>
                <p className="text-xl text-muted-foreground mb-12">
                  How to communicate effectively with AI when building educational tools and augmenting research workflows
                </p>

                <div className="prose prose-lg max-w-none">
                  <p className="lead">
                    Prompt engineering is the art of communicating clearly with AI systems to get the results you want. This guide focuses on prompts for <strong>building educational tools</strong> and <strong>augmenting research workflows</strong>—not replacing the intellectual work that makes humanities scholarship valuable.
                  </p>

                  <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-amber-900 dark:text-amber-100">
                          The Core Principle
                        </h4>
                        <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-0">
                          Good prompts are specific, contextual, and constrained. Generic requests like "tell me about the Civil War" produce generic results. Think of prompts as detailed instructions for a capable but extremely literal assistant who knows nothing about your goals unless you explain them clearly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="what-is-prompting">What Is Prompt Engineering?</HeadingAnchor>

                  <p>
                    When you interact with AI—whether through ChatGPT, Claude Code, or custom tools you've built—you're writing prompts. A prompt is simply the instruction or question you give to the AI. Prompt engineering means crafting these instructions strategically to get reliable, useful results.
                  </p>

                  <p>
                    For humanities applications, this is particularly important because:
                  </p>

                  <ul>
                    <li><strong>Historical accuracy matters:</strong> AI can easily generate plausible-sounding but false information</li>
                    <li><strong>Anachronism is a constant danger:</strong> AI often imports modern concepts into historical contexts</li>
                    <li><strong>Nuance is essential:</strong> Simple right/wrong answers rarely capture historical complexity</li>
                    <li><strong>Verification is necessary:</strong> Claims need to be traceable to sources</li>
                  </ul>

                  <HeadingAnchor id="boundaries">Ethical Boundaries: Augmentation vs. Replacement</HeadingAnchor>

                  <p>
                    Before diving into techniques, we need to establish clear boundaries about what AI should and shouldn't do in humanities work.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Appropriate Uses (Augmentation)</h3>

                  <div className="my-6 p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3 flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      Good: Building Educational Tools
                    </h4>
                    <ul className="text-sm space-y-2 mb-0 text-emerald-900/80 dark:text-emerald-100/80">
                      <li>Creating interactive simulations where students engage with historical scenarios</li>
                      <li>Building timeline generators, citation formatters, or research organization tools</li>
                      <li>Generating practice exercises, discussion prompts, or quiz questions</li>
                      <li>Creating accessible interfaces for exploring primary source collections</li>
                    </ul>
                  </div>

                  <div className="my-6 p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3 flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      Good: Mechanical Research Tasks
                    </h4>
                    <ul className="text-sm space-y-2 mb-0 text-emerald-900/80 dark:text-emerald-100/80">
                      <li>Extracting dates, names, and events from documents to create datasets</li>
                      <li>Transcribing or translating texts (with verification)</li>
                      <li>Coding sources for thematic patterns you've defined</li>
                      <li>Organizing bibliographies or reformatting citations</li>
                      <li>Generating initial metadata for archival materials</li>
                    </ul>
                  </div>

                  <div className="my-6 p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3 flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      Good: Brainstorming and Prototyping
                    </h4>
                    <ul className="text-sm space-y-2 mb-0 text-emerald-900/80 dark:text-emerald-100/80">
                      <li>Generating multiple framings of a research question</li>
                      <li>Exploring "what if" scenarios to identify gaps in your thinking</li>
                      <li>Creating draft syllabi or assignment descriptions to refine</li>
                      <li>Testing pedagogical approaches before implementing them</li>
                    </ul>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Inappropriate Uses (Replacement)</h3>

                  <div className="my-6 p-5 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3 flex items-center gap-2 text-red-900 dark:text-red-100">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      Problematic: Delegating Scholarly Interpretation
                    </h4>
                    <ul className="text-sm space-y-2 mb-0 text-red-900/80 dark:text-red-100/80">
                      <li>Asking AI to "analyze" primary sources for your research</li>
                      <li>Using AI-generated interpretations in scholarship without independent verification</li>
                      <li>Treating AI summaries as substitutes for reading and understanding sources</li>
                      <li>Having AI write historical arguments or literature reviews for publication</li>
                    </ul>
                    <p className="text-sm text-red-900/80 dark:text-red-100/80 mt-3 mb-0">
                      <strong>Why this matters:</strong> Understanding primary sources—grasping their context, silences, biases, and significance—is the core intellectual work of humanities scholarship. This requires human judgment, expertise, and critical thinking that AI cannot replicate.
                    </p>
                  </div>

                  <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
                          A Useful Test
                        </h4>
                        <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
                          Ask yourself: "Am I using AI to <em>build something</em> that helps me or my students think better, or am I using it to <em>avoid thinking</em> about something I should engage with directly?" If it's the latter, reconsider your approach.
                        </p>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="anatomy">Anatomy of an Effective Prompt</HeadingAnchor>

                  <p>
                    Whether you're building a tool or automating a mechanical task, strong prompts typically include these elements:
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">1. Role and Context</h3>

                  <p>
                    Tell the AI what perspective or expertise to adopt and what it's working on. This helps constrain outputs and set expectations.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">❌ VAGUE:</p>
                        <div className="bg-red-50 dark:bg-red-950 p-3 rounded border-l-2 border-red-600">
                          <p className="text-sm mb-0">"Help me with my research on women's history."</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">✓ SPECIFIC:</p>
                        <div className="bg-emerald-50 dark:bg-emerald-950 p-3 rounded border-l-2 border-emerald-600">
                          <p className="text-sm mb-0">"You are helping me build an educational timeline tool about the women's suffrage movement in the United States (1848-1920). I need you to generate structured data entries that students can explore interactively."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">2. Task Description</h3>

                  <p>
                    State clearly and specifically what you want the AI to do. Break complex tasks into discrete steps.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">❌ VAGUE:</p>
                        <div className="bg-red-50 dark:bg-red-950 p-3 rounded border-l-2 border-red-600">
                          <p className="text-sm mb-0">"Create some data about Civil War battles."</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">✓ SPECIFIC:</p>
                        <div className="bg-emerald-50 dark:bg-emerald-950 p-3 rounded border-l-2 border-emerald-600">
                          <p className="text-sm mb-0">"Generate a JSON dataset of 15 major Civil War battles. For each battle, include: (1) name, (2) date, (3) location (state and specific place), (4) Union commander, (5) Confederate commander, (6) estimated casualties for each side, (7) outcome (Union victory/Confederate victory/inconclusive), and (8) significance in 2-3 sentences."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">3. Constraints and Boundaries</h3>

                  <p>
                    Explicitly state what the AI should <em>not</em> do, and set guardrails to prevent common problems like anachronism, fabrication, or inappropriate interpretation.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Example Constraints</h4>
                    <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded">
                      <pre className="text-xs mb-0 whitespace-pre-wrap font-mono">
{`Important constraints:
- Use only information that would have been available in [YEAR]
- Do not use modern terminology like "genocide," "capitalism,"
  or other anachronistic concepts
- If uncertain about a fact, say "[UNCERTAIN]" rather than guessing
- Do not invent sources or quotes—only use provided materials
- Maintain historical complexity—avoid simplistic narratives`}
                      </pre>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">4. Output Format</h3>

                  <p>
                    Specify exactly how you want the response structured. This is crucial when building tools, since you often need AI output in a specific format (like JSON, CSV, or HTML).
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Example Format Specification</h4>
                    <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded">
                      <pre className="text-xs mb-0 whitespace-pre-wrap font-mono">
{`Output format: JSON array with this structure:

{
  "events": [
    {
      "year": 1848,
      "title": "Seneca Falls Convention",
      "description": "First women's rights convention...",
      "category": "political",
      "significance": "high"
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">5. Examples (When Helpful)</h3>

                  <p>
                    For complex or nuanced tasks, showing the AI 2-3 examples of what you want (called "few-shot learning") dramatically improves results.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Example: Using Examples</h4>
                    <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded">
                      <pre className="text-xs mb-0 whitespace-pre-wrap">
{`Generate timeline entries following this style:

EXAMPLE 1:
Year: 1773
Title: Boston Tea Party
Description: Colonists dumped British tea into Boston Harbor to
protest taxation without representation.
Why it matters: Escalated tensions between colonies and Britain,
leading directly to punitive measures.

EXAMPLE 2:
Year: 1776
Title: Declaration of Independence
Description: Continental Congress formally declared independence
from Great Britain.
Why it matters: Established philosophical foundation for American
government based on natural rights.

Now generate 10 more entries for the period 1763-1783 following
this same format and style.`}
                      </pre>
                    </div>
                  </div>

                  <HeadingAnchor id="building-tools">Building Educational Tools</HeadingAnchor>

                  <p>
                    One of the best uses of prompt engineering is building custom educational tools for your courses. Here's how to approach this systematically.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pattern: Interactive Timeline Generator</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3 flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Full Prompt Example
                    </h4>
                    <div className="code-block-dark p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs mb-0 whitespace-pre-wrap">
{`I'm building an interactive timeline tool for my course on the
Scientific Revolution (1500-1700).

TASK: Generate 20 key events in JSON format that I can use to
populate the timeline.

For each event, include:
- year (number)
- title (short, under 60 characters)
- description (2-3 sentences, accessible to undergraduates)
- category (choose from: astronomy, physics, biology, medicine,
  mathematics, technology, philosophy)
- sources (list 2-3 primary or secondary sources students could
  consult)

CONSTRAINTS:
- Include diverse geographic locations (not just Western Europe)
- Include women and non-European scientists where documented
- Avoid whig history—don't describe everything as "progress"
- Use historically accurate terminology
- Acknowledge uncertainty where appropriate

FORMAT: Valid JSON that I can directly import into JavaScript

EXAMPLE ENTRY:
{
  "year": 1543,
  "title": "Vesalius publishes De humani corporis fabrica",
  "description": "Andreas Vesalius published detailed anatomical
    drawings based on human dissection, challenging Galenic
    tradition that relied on animal anatomy.",
  "category": "medicine",
  "sources": ["Vesalius, De humani corporis fabrica (1543)",
    "O'Malley, Andreas Vesalius of Brussels (1964)"]
}

Generate 20 events following this format.`}
                      </pre>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pattern: Discussion Question Generator</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <p className="text-sm mb-4">This prompt helps generate thoughtful discussion questions for course readings:</p>
                    <div className="code-block-dark p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs mb-0 whitespace-pre-wrap">
{`Generate 10 discussion questions for [READING TITLE] by [AUTHOR].

CONTEXT: This is for an upper-division undergraduate course on
[TOPIC]. Students have background in [RELEVANT CONTEXT].

QUESTION TYPES (generate 2-3 of each):
1. Comprehension: Check understanding of main arguments
2. Analysis: Push students to examine how arguments are constructed
3. Synthesis: Connect to other course readings or historical events
4. Evaluation: Assess strengths and limitations of the argument

REQUIREMENTS:
- Questions should be open-ended (no yes/no answers)
- Cite specific passages students should reference
- Avoid questions that rely on information outside the text
- Include at least 2 questions that generate productive disagreement
- Vary difficulty from accessible to challenging

FORMAT:
Q1: [Question]
   Passage reference: [Page or paragraph]
   Why this matters: [Brief note on pedagogical purpose]`}
                      </pre>
                    </div>
                  </div>

                  <HeadingAnchor id="augmentation">Research Augmentation</HeadingAnchor>

                  <p>
                    These prompts help with mechanical research tasks that augment but don't replace scholarly work.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pattern: Metadata Coding</h3>

                  <p>
                    This is one of the most valuable uses: having AI extract structured information from sources so you can analyze patterns. You define the categories; AI does the tedious extraction.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Example: Coding Historical Newspapers</h4>
                    <div className="code-block-dark p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs mb-0 whitespace-pre-wrap">
{`I'm analyzing 100 newspaper articles about labor strikes from
1870-1900. I need you to code each article for specific themes.

For each article, identify and code for:

1. ACTORS MENTIONED (mark all that apply):
   - workers
   - union leaders
   - company owners
   - police
   - government officials
   - public/bystanders

2. STRIKE CAUSES (mark all that apply):
   - wages
   - hours
   - working conditions
   - union recognition
   - other: [specify]

3. TONE TOWARD STRIKERS:
   - sympathetic
   - neutral
   - hostile
   - mixed

4. VIOLENCE REPORTED:
   - yes: [specify who initiated]
   - no
   - implied but not described

For each code, provide:
- The specific passage that supports your coding
- Confidence level (HIGH/MEDIUM/LOW)

If an article is ambiguous, mark it as [AMBIGUOUS] and explain why.

Here is article 1:
[PASTE TEXT]`}
                      </pre>
                    </div>
                  </div>

                  <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
                          Why This Works
                        </h4>
                        <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
                          You're still doing the intellectual work—you defined the analytical categories, selected the sources, and will interpret the patterns. AI is just doing the tedious mechanical work of reading and categorizing according to your framework. This is exactly the kind of "drudgery elimination" that frees you for higher-level thinking.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pattern: Bibliography Organization</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <p className="text-sm mb-4">Transform messy citation formats into organized, consistently formatted bibliographies:</p>
                    <div className="code-block-dark p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs mb-0 whitespace-pre-wrap">
{`I have a list of citations in mixed formats that I need converted
to Chicago Style (author-date) and organized alphabetically.

REQUIREMENTS:
- Convert all citations to consistent Chicago author-date format
- Alphabetize by author's last name
- Flag any citations with missing information as [INCOMPLETE]
- For books, include page counts if provided
- For articles, include DOI if available
- Double-check dates—flag any that seem suspicious

Here are the citations:
[PASTE YOUR MESSY CITATIONS]

Return the formatted bibliography, plus a separate list of any
citations you flagged as incomplete or suspicious.`}
                      </pre>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pattern: Date/Event Extraction</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <p className="text-sm mb-4">Extract chronological information from narrative sources to create datasets:</p>
                    <div className="code-block-dark p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs mb-0 whitespace-pre-wrap">
{`Extract all dates and events from this diary entry and create a
structured timeline.

For each event, provide:
- Date (in YYYY-MM-DD format, use "UNKNOWN" if only partial date)
- Event description (brief, 1 sentence)
- Location (if mentioned)
- People mentioned (list names)
- Original text (the relevant passage from the diary)

IMPORTANT:
- Only extract information explicitly stated in the text
- Do not infer or interpret
- If a date is unclear, mark it [UNCERTAIN] and explain why
- Preserve the author's original wording in the "original text" field

Output format: JSON array

Here is the diary entry:
[PASTE TEXT]`}
                      </pre>
                    </div>
                  </div>

                  <HeadingAnchor id="simulations">Historical Simulations (Pedagogical Use)</HeadingAnchor>

                  <p>
                    Historical simulations where students interact with AI-powered characters can be powerful pedagogical tools—but they require careful prompting to balance engagement with accuracy.
                  </p>

                  <div className="my-6 p-5 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-orange-900 dark:text-orange-100">
                          Important Caveat
                        </h4>
                        <p className="text-sm text-orange-900/80 dark:text-orange-100/80 mb-0">
                          Historical simulations are for <strong>pedagogy</strong>, not scholarship. They're tools for helping students think about historical perspective-taking, not substitutes for engaging with actual primary sources. Students should understand they're interacting with a simulation, not accessing authentic historical voices.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pattern: Historical Figure Simulation</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Full System Prompt Example</h4>
                    <div className="code-block-dark p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs mb-0 whitespace-pre-wrap">
{`You are roleplaying as Frederick Douglass in Rochester, New York,
in July 1852, shortly after delivering your "What to the Slave Is
the Fourth of July?" speech.

WHAT YOU KNOW AT THIS MOMENT:
- You escaped slavery in Maryland in 1838
- You published your autobiography in 1845
- You're now a prominent abolitionist speaker and newspaper editor
- The Fugitive Slave Act of 1850 has made your position precarious
- You recently gave a powerful July 4th speech that criticized
  American hypocrisy on slavery
- The Compromise of 1850 has failed to resolve sectional tensions

WHAT YOU DON'T KNOW (it hasn't happened yet):
- The Civil War (1861-1865)
- The Emancipation Proclamation
- The outcome of the abolitionist movement
- Modern civil rights terminology or frameworks

YOUR PERSONALITY AND VIEWS:
- Eloquent and passionate speaker
- Deeply committed to both abolition and women's rights
- Sharp critic of hypocrisy, especially Northern complicity
- Believe in moral suasion but increasingly skeptical it's enough
- Well-read in political philosophy and current affairs
- Sometimes impatient with gradualism

PRIMARY SOURCES TO DRAW FROM:
1. "What to the Slave Is the Fourth of July?" (1852)
2. Narrative of the Life of Frederick Douglass (1845)
3. Your editorials in The North Star newspaper

CONVERSATION GUIDELINES:
- Speak as you do in your speeches: eloquent but accessible
- Reference real people you know (Garrison, Stanton, etc.)
- Use period-appropriate language (avoid: "systemic racism,"
  "intersectionality," other modern terms)
- Express period-typical views, including ones we now recognize
  as limited
- When students ask what will happen, express uncertainty or hope
- Ask students questions to make them think critically
- If asked about sources, reference your actual writings
- Occasionally acknowledge the limits of your knowledge

CRITICAL: If a student makes claims about the future (Civil War,
etc.), respond with curiosity or skepticism—you can't know this yet.

Now begin the conversation by introducing yourself and asking what
the student wishes to discuss.`}
                      </pre>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pattern: Historical Scenario Simulation</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <p className="text-sm mb-4">For simulations of events or situations rather than specific people:</p>
                    <div className="code-block-dark p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs mb-0 whitespace-pre-wrap">
{`You are simulating a town meeting in Salem, Massachusetts in
March 1692, during the early Salem Witch Trials.

SETTING: Several young girls have accused local women of witchcraft.
The community is divided between those who believe the accusations
and those who are skeptical.

YOU WILL ROLEPLAY MULTIPLE CHARACTERS:
1. Rev. Samuel Parris (minister, father of one accuser)
2. Thomas Putnam (wealthy landowner, believes accusations)
3. Rebecca Nurse (respected elder, accused of witchcraft)
4. John Proctor (farmer, skeptical of accusations)

HISTORICAL CONTEXT TO REFLECT:
- Puritan beliefs about the devil and witchcraft
- Recent conflicts over property and church governance
- Fear following recent smallpox outbreaks and Indian attacks
- Legal procedures for witchcraft accusations in 1692
- Role of spectral evidence (dreams/visions)

CONSTRAINTS:
- Only reference events before March 1692
- Use period-appropriate theological language
- Reflect 17th-century New England worldview
- Show how economic and personal conflicts influenced accusations
- Do not use modern psychological or sociological terminology
- If students suggest anachronistic actions, have characters respond
  with confusion

PEDAGOGICAL GOALS:
- Help students understand how intelligent people could believe in
  witchcraft
- Reveal economic and social tensions beneath religious conflict
- Show complexity—not all Puritans agreed on these accusations
- Encourage critical thinking about evidence and testimony

Guide the conversation by having characters debate and ask each
other questions. Respond to student interventions in character.`}
                      </pre>
                    </div>
                  </div>

                  <HeadingAnchor id="testing">Testing and Iteration</HeadingAnchor>

                  <p>
                    Prompt engineering is iterative. Your first attempt will rarely be perfect. Here's a systematic approach to improvement.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">The Testing Workflow</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <ol className="text-sm space-y-3 mb-0 pl-5">
                      <li>
                        <strong>Write your initial prompt</strong> based on what you think you need
                      </li>
                      <li>
                        <strong>Test on 2-3 examples</strong> where you know what "good" output looks like
                      </li>
                      <li>
                        <strong>Evaluate systematically:</strong>
                        <ul className="mt-2 space-y-1">
                          <li>Is it accurate? (check facts against sources)</li>
                          <li>Is it appropriate? (no anachronisms, proper tone)</li>
                          <li>Is it consistent? (handles similar inputs similarly)</li>
                          <li>Is it complete? (includes all required information)</li>
                          <li>Is it usable? (formatted correctly, actionable)</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Identify patterns in problems:</strong> Is it always making the same type of error?
                      </li>
                      <li>
                        <strong>Revise your prompt</strong> to address specific issues with new constraints or examples
                      </li>
                      <li>
                        <strong>Re-test on the same examples</strong> to confirm improvement
                      </li>
                      <li>
                        <strong>Test on new examples</strong> to ensure the fix didn't break something else
                      </li>
                      <li>
                        <strong>Document your final prompt</strong> with notes on what works and what to watch out for
                      </li>
                    </ol>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Advanced Technique: Prompt Chaining</h3>

                  <p>
                    For complex tasks, break them into a sequence of simpler prompts rather than trying to do everything at once.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Example: Building a Historical Database</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Prompt 1:</strong> "Extract all personal names, dates, and locations from this document. Output as structured JSON."
                      </div>
                      <div>
                        <strong>Prompt 2:</strong> "Using the extracted data above, identify which individuals appear multiple times across documents and group them."
                      </div>
                      <div>
                        <strong>Prompt 3:</strong> "For each person who appears more than once, create a biographical entry combining information from all mentions."
                      </div>
                      <div>
                        <strong>Prompt 4:</strong> "Flag any inconsistencies or contradictions in the biographical entries (e.g., person appearing in two places on the same date)."
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 mb-0">
                      Each step is simple and verifiable. Together they accomplish a complex task.
                    </p>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Advanced Technique: Chain-of-Thought</h3>

                  <p>
                    For tasks requiring reasoning, ask the AI to "show its work" by thinking step-by-step before giving its final answer.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <div className="code-block-dark p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs mb-0 whitespace-pre-wrap">
{`Before generating your timeline entry, think through this step-by-step:

1. First, verify the date is correct by checking against known events
2. Then, identify the key actors involved
3. Next, consider what made this significant at the time (not just
   in retrospect)
4. Evaluate what sources students could consult to learn more
5. Finally, write your entry based on the above analysis

Show your reasoning at each step, then provide the final formatted
entry.`}
                      </pre>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 mb-0">
                      This often produces better results and makes it easier to spot where the AI went wrong.
                    </p>
                  </div>

                  <HeadingAnchor id="pitfalls">Common Pitfalls and How to Avoid Them</HeadingAnchor>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pitfall 1: The Vague Prompt</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">❌ BAD:</p>
                        <div className="bg-red-50 dark:bg-red-950 p-3 rounded border-l-2 border-red-600">
                          <p className="text-sm mb-0">"Tell me about the Industrial Revolution."</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 mb-0">Problem: Too broad, no clear task or output format.</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">✓ BETTER:</p>
                        <div className="bg-emerald-50 dark:bg-emerald-950 p-3 rounded border-l-2 border-emerald-600">
                          <p className="text-sm mb-0">"Generate 10 discussion questions about the social impacts of industrialization in Britain (1760-1840) for undergraduate students. Include questions about working conditions, urbanization, and family structure. Each question should cite a specific type of primary source students could use to answer it."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pitfall 2: Assuming AI Has Context You Haven't Provided</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">❌ BAD:</p>
                        <div className="bg-red-50 dark:bg-red-950 p-3 rounded border-l-2 border-red-600">
                          <p className="text-sm mb-0">"Translate this document." [pastes 17th-century Dutch text with no context]</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">✓ BETTER:</p>
                        <div className="bg-emerald-50 dark:bg-emerald-950 p-3 rounded border-l-2 border-emerald-600">
                          <p className="text-sm mb-0">"Translate this 17th-century Dutch merchant's letter into modern English. This is from Amsterdam, 1650, discussing trade with the East Indies. Please: (1) translate literally first, (2) then provide a more readable modern version, (3) note any terms that don't translate well in [brackets], (4) explain historical context for unfamiliar concepts."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pitfall 3: Over-Complicating</h3>

                  <div className="my-6 p-5 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-orange-900 dark:text-orange-100">
                          Keep It Simple
                        </h4>
                        <p className="text-sm text-orange-900/80 dark:text-orange-100/80 mb-0">
                          If your prompt is over 500 words or contains more than 10 different instructions, it's probably too complex. Break it into multiple sequential prompts (prompt chaining) instead. Each prompt should do one thing well rather than many things poorly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pitfall 4: Not Requesting Evidence/Citations</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <p className="text-sm mb-3">AI will confidently state "facts" that are false. Always require citation:</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2">❌ BAD:</p>
                        <div className="bg-red-50 dark:bg-red-950 p-3 rounded border-l-2 border-red-600">
                          <p className="text-sm mb-0">"What were the main causes of World War I?"</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">✓ BETTER:</p>
                        <div className="bg-emerald-50 dark:bg-emerald-950 p-3 rounded border-l-2 border-emerald-600">
                          <p className="text-sm mb-0">"Based solely on the three documents I'm providing below [list documents], what causes of WWI do these authors emphasize? For each cause mentioned, quote the specific passage and note which document it's from. If a cause is mentioned in multiple documents, note all instances."</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pitfall 5: Ignoring Edge Cases</h3>

                  <p>
                    Your prompt might work for typical cases but fail on unusual ones. Test edge cases and add explicit handling:
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Edge Case Handling</h4>
                    <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded">
                      <pre className="text-xs mb-0 whitespace-pre-wrap">
{`SPECIAL CASES:
- If a document is damaged/illegible in places, mark those sections
  [ILLEGIBLE] rather than guessing
- If dates are unclear or contradictory, mark [DATE UNCERTAIN] and
  explain why
- If the author's position is ambiguous, note that explicitly rather
  than forcing an interpretation
- If you encounter unfamiliar historical terms, mark them [VERIFY]
  for manual checking`}
                      </pre>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Pitfall 6: Expecting Perfection on First Try</h3>

                  <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
                          Iteration Is Normal
                        </h4>
                        <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
                          Professional prompt engineers rarely get it right the first time. Expect to refine your prompts through testing. Each iteration teaches you something about how the AI interprets instructions, making your future prompts better. Keep notes on what works and what doesn't for similar tasks.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="font-serif scroll-mt-24">Real-World Examples and Templates</h2>

                  <p>
                    For more detailed examples of prompts in action, see:
                  </p>

                  <ul>
                    <li>
                      <Link href="/projects/historylens" className="text-primary hover:underline">
                        HistoryLens Project
                      </Link>
                      {' '}— System prompts for historical simulations and primary source exploration
                    </li>
                    <li>
                      <Link href="/projects/young-darwin" className="text-primary hover:underline">
                        Young Darwin
                      </Link>
                      {' '}— Prompt design for a historically-accurate Darwin simulation
                    </li>
                    <li>
                      <Link href="/guides/building-simulations" className="text-primary hover:underline">
                        Building Simulations Guide
                      </Link>
                      {' '}— More detailed discussion of simulation prompts
                    </li>
                  </ul>

                  <h2 className="font-serif scroll-mt-24">Key Principles to Remember</h2>

                  <div className="my-8 p-6 bg-muted rounded-lg">
                    <ol className="space-y-3 mb-0">
                      <li><strong>Be specific:</strong> Vague prompts produce vague results. Define exactly what you want.</li>
                      <li><strong>Provide context:</strong> AI doesn't know what you know unless you tell it.</li>
                      <li><strong>Set constraints:</strong> Tell AI what <em>not</em> to do to prevent common problems.</li>
                      <li><strong>Require evidence:</strong> Always ask for citations or quotes to enable verification.</li>
                      <li><strong>Format matters:</strong> Specify exactly how you want output structured.</li>
                      <li><strong>Test systematically:</strong> Evaluate on known examples before using at scale.</li>
                      <li><strong>Iterate:</strong> Refine based on results—first attempts are rarely perfect.</li>
                      <li><strong>Stay human-centered:</strong> Use AI to augment your thinking, not replace it.</li>
                    </ol>
                  </div>

                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
                    <p className="mb-4">
                      Now that you understand prompt engineering principles, try applying them to your own projects:
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/guides/claude-code-basics" className="text-primary hover:underline">
                          Getting Started with Claude Code
                        </Link>
                        {' '}— Apply these prompting skills to build your own tools
                      </li>
                      <li>
                        <Link href="/guides/building-simulations" className="text-primary hover:underline">
                          Building Historical Simulations
                        </Link>
                        {' '}— Detailed guide to simulation design
                      </li>
                      <li>
                        <Link href="/guides/ai-assignments" className="text-primary hover:underline">
                          Designing AI Assignments
                        </Link>
                        {' '}— Use prompt engineering in pedagogical design
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 pt-8 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong>Guide last updated:</strong> November 2025
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This guide reflects ongoing experimentation with AI tools in humanities pedagogy and research. We welcome feedback and examples from your own work—please{' '}
                      <a href="mailto:bbreen@ucsc.edu" className="text-primary hover:underline">
                        get in touch
                      </a>
                      {' '}to share what you've learned.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <BackToTop />
    </>
  )
}
