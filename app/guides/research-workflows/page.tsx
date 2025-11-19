import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Search, FileText, Languages, Database, AlertTriangle, CheckCircle2, Workflow } from 'lucide-react'

export default function ResearchWorkflowsGuide() {
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
              <Badge variant="outline">Research</Badge>
              <Badge variant="outline">Tools</Badge>
            </div>

            <h1 className="text-4xl font-serif font-bold mb-4">
              AI for Research Workflows
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Practical techniques for integrating LLMs into historical research, from transcription to analysis
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="flex items-center gap-2">
                <Workflow className="h-6 w-6" /> Why Use AI in Historical Research?
              </h2>
              <p>
                Large language models like Claude can accelerate many time-consuming research tasks while maintaining
                scholarly rigor. The key is understanding where AI excels and where human expertise is irreplaceable.
              </p>

              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg my-6">
                <p className="font-semibold mb-2">The Golden Rule of AI Research</p>
                <p className="text-sm">
                  AI should amplify your expertise, not replace it. Always verify AI outputs against primary sources,
                  and treat AI-generated insights as hypotheses to test, not conclusions to accept.
                </p>
              </div>

              <h3>What AI Does Well</h3>
              <ul>
                <li>Processing large volumes of text quickly</li>
                <li>Identifying patterns across documents</li>
                <li>Translating historical languages and dialects</li>
                <li>Generating research questions and hypotheses</li>
                <li>Summarizing lengthy documents</li>
                <li>Organizing and categorizing sources</li>
              </ul>

              <h3>What AI Does Poorly</h3>
              <ul>
                <li>Understanding nuanced historical context</li>
                <li>Making original historiographical arguments</li>
                <li>Evaluating source credibility and bias</li>
                <li>Handling specialized archival materials</li>
                <li>Providing reliable citations (prone to hallucination)</li>
              </ul>

              <h2 className="flex items-center gap-2">
                <FileText className="h-6 w-6" /> Research Task 1: Transcription and OCR Correction
              </h2>

              <h3>Use Case: Improving OCR Quality</h3>
              <p>
                Optical Character Recognition (OCR) on historical documents is often riddled with errors. AI can help
                clean up these transcriptions by understanding context.
              </p>

              <h4>Basic Workflow</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                <code>{`1. Run initial OCR on historical document (using tools like Tesseract)
2. Feed OCR output to Claude with this prompt:

"This is OCR output from an 1840s newspaper. Please correct obvious OCR
errors while preserving the original spelling, punctuation, and formatting.
Mark any sections where you're uncertain about the correction with [?].

[paste OCR text here]"

3. Review corrections, especially [?] marked sections
4. Cross-reference uncertain passages with original document images`}</code>
              </pre>

              <h4>Advanced: Contextual Transcription</h4>
              <p>For difficult-to-read handwritten documents, provide AI with context:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "I'm transcribing a letter from Sarah Grimké to her sister in 1837. The handwriting is difficult
                to read in places. Based on the context of their abolitionist work and the visible words, what do
                you think this passage says? [include image or partial transcription]
                <br/><br/>
                Provide your best guess with confidence levels: HIGH, MEDIUM, or LOW."
              </blockquote>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg my-6">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" /> Caution
                </p>
                <p className="text-sm">
                  Never trust AI transcriptions without verification against the original source. AI may introduce
                  plausible-sounding but historically inaccurate text.
                </p>
              </div>

              <h2 className="flex items-center gap-2">
                <Languages className="h-6 w-6" /> Research Task 2: Translation
              </h2>

              <h3>Use Case: Translating Primary Sources</h3>
              <p>
                AI translation has improved dramatically, but historical texts require special handling to preserve
                period-appropriate language and meaning.
              </p>

              <h4>Basic Translation Prompt</h4>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "Translate this 18th-century French document to English. Preserve:
                <br/>
                - Period-appropriate vocabulary (avoid modern slang)
                <br/>
                - Formal address and titles as they appear
                <br/>
                - Cultural context notes where terms don't translate directly
                <br/><br/>
                After the translation, provide a brief paragraph explaining any translation choices that required
                interpretation."
              </blockquote>

              <h4>Dialectical and Archaic Language</h4>
              <p>For regional dialects, Middle English, or archaic forms:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "This is a 17th-century Scottish legal document written in Scots dialect. Provide:
                <br/>
                1. A literal translation to modern English
                <br/>
                2. A note on any legal or cultural terms that need explanation
                <br/>
                3. The original text with difficult words glossed in brackets
                <br/><br/>
                Preserve the document structure and formatting."
              </blockquote>

              <h4>Workflow for Large Translation Projects</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                <code>{`1. Translate a sample page and verify accuracy with a human expert
2. Document any systematic errors or biases in AI translation
3. Create a style guide for the AI (preferred terms, handling of names, etc.)
4. Translate in batches, maintaining a translation memory for consistency
5. Flag uncertain translations for expert review
6. Cross-reference key passages with published translations if available`}</code>
              </pre>

              <h2 className="flex items-center gap-2">
                <Search className="h-6 w-6" /> Research Task 3: Thematic Analysis
              </h2>

              <h3>Use Case: Identifying Themes Across Multiple Documents</h3>
              <p>
                When working with large corpora of primary sources, AI can help identify recurring themes, changes over
                time, and patterns you might miss.
              </p>

              <h4>Example Workflow: Analyzing 50 Years of Diaries</h4>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "I'm analyzing 50 years of a farmer's diary entries (1820-1870) to understand changing attitudes
                toward technological innovation. For each decade:
                <br/><br/>
                1. Identify mentions of new technologies or methods
                <br/>
                2. Note the emotional tone (excitement, skepticism, anxiety)
                <br/>
                3. Track any changes in farming practices mentioned
                <br/>
                4. Flag entries that seem particularly significant
                <br/><br/>
                Here are the entries from the 1820s: [paste entries]"
              </blockquote>

              <h4>Comparative Analysis</h4>
              <p>Use AI to compare different perspectives on the same event:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "Compare how these three newspaper accounts describe the 1848 Seneca Falls Convention:
                <br/>
                [Source 1: Abolitionist newspaper]
                <br/>
                [Source 2: Mainstream conservative paper]
                <br/>
                [Source 3: Women's rights publication]
                <br/><br/>
                Analyze:
                <br/>
                - What facts do they agree on?
                <br/>
                - Where do their narratives diverge?
                <br/>
                - What does the language reveal about each paper's ideological stance?
                <br/>
                - What events or participants does each source emphasize or ignore?"
              </blockquote>

              <h2 className="flex items-center gap-2">
                <Database className="h-6 w-6" /> Research Task 4: Data Extraction and Structuring
              </h2>

              <h3>Use Case: Converting Unstructured Text to Databases</h3>
              <p>
                Historical documents often contain information that would be valuable in structured form (dates, names,
                places, quantities). AI can help extract and organize this data.
              </p>

              <h4>Example: Creating a Database of Historical Events</h4>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "Extract all events from this ship's log and format as a CSV with columns:
                <br/>
                Date, Location (if specified), Event Type, Description, People Mentioned
                <br/><br/>
                Event types should be categorized as: Weather, Navigation, Conflict, Trade, Medical, Other
                <br/><br/>
                Preserve exact quotes for significant events in the Description field.
                <br/><br/>
                [paste ship's log text]"
              </blockquote>

              <h4>Named Entity Recognition</h4>
              <p>Extract and categorize people, places, and organizations:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "From this collection of Civil War letters, create a list of:
                <br/>
                1. All people mentioned (with their apparent role/relationship to the author)
                <br/>
                2. All places mentioned (categorize as: battle sites, camps, towns, states)
                <br/>
                3. All military units mentioned
                <br/><br/>
                Format as JSON with confidence scores for ambiguous identifications."
              </blockquote>

              <h3>Data Verification Best Practices</h3>
              <ul>
                <li>Always spot-check AI-extracted data against source documents</li>
                <li>Look for systematic errors (e.g., date format confusion, name variants)</li>
                <li>Flag ambiguous or low-confidence extractions for manual review</li>
                <li>Keep links to original source pages/locations for all extracted data</li>
              </ul>

              <h2>Research Task 5: Literature Review and Synthesis</h2>

              <h3>Use Case: Mapping Historiographical Debates</h3>
              <p>
                AI can help you understand the landscape of scholarly debate on a topic, but cannot replace close
                reading of the actual scholarship.
              </p>

              <h4>Example Workflow</h4>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "I'm researching debates about the causes of the Great Depression. I'll provide abstracts from 10
                key articles. For each, identify:
                <br/><br/>
                1. The author's main argument about causation
                <br/>
                2. What evidence they emphasize
                <br/>
                3. Which other scholars they agree or disagree with
                <br/>
                4. Any methodological approaches mentioned
                <br/><br/>
                Then, create a conceptual map showing the main schools of thought and their relationships."
              </blockquote>

              <h4>Identifying Research Gaps</h4>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "Based on these 15 articles about women's labor during WWI, what topics or questions appear
                under-researched? What geographic areas, time periods, or demographics are receiving less attention?"
              </blockquote>

              <h2 className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6" /> Verification Workflows
              </h2>

              <p>
                Every AI-assisted research output should go through verification. Here's a systematic approach:
              </p>

              <h3>Three-Level Verification System</h3>

              <div className="bg-muted p-4 rounded-lg my-6 text-sm">
                <p className="font-semibold mb-3">Level 1: Automated Checks (for all outputs)</p>
                <ul className="mb-4">
                  <li>Run fact claims against known reference works</li>
                  <li>Check that dates, names, places are internally consistent</li>
                  <li>Verify that citations point to real sources (if AI provided them)</li>
                </ul>

                <p className="font-semibold mb-3">Level 2: Spot Verification (10-20% sample)</p>
                <ul className="mb-4">
                  <li>Randomly select portions of AI output</li>
                  <li>Compare against original sources word-for-word</li>
                  <li>Check for subtle changes in meaning or context</li>
                </ul>

                <p className="font-semibold mb-3">Level 3: Expert Review (critical findings)</p>
                <ul>
                  <li>Any surprising or significant claims should be verified by domain experts</li>
                  <li>Novel interpretations require confirmation with primary sources</li>
                  <li>Statistical or quantitative outputs need methodological review</li>
                </ul>
              </div>

              <h3>Red Flags in AI Research Outputs</h3>
              <ul>
                <li><strong>Too perfect:</strong> Suspiciously complete or well-organized data may indicate fabrication</li>
                <li><strong>Anachronistic language:</strong> Modern terms appearing in historical translations</li>
                <li><strong>Overly confident:</strong> AI expressing certainty about ambiguous historical questions</li>
                <li><strong>Lack of nuance:</strong> Complex debates reduced to simple narratives</li>
                <li><strong>Fictional sources:</strong> Citations to books or articles that don't exist</li>
              </ul>

              <h2>Building Reproducible Research Pipelines</h2>

              <h3>Documentation Standards</h3>
              <p>
                When using AI in your research, document your process so others can evaluate and reproduce your work:
              </p>

              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                <code>{`RESEARCH LOG TEMPLATE

Project: [Title]
Date: [Date]
Task: [What you're doing]

AI Tool: Claude 3.5 Sonnet (via Claude Code)
Input: [Description of sources provided to AI]
Prompt: [Exact prompt used]
Output: [Where AI output is stored]
Verification: [What checks were performed]
Confidence: [HIGH/MEDIUM/LOW]
Notes: [Any issues, surprises, or decisions made]

Human Review: [Who reviewed, what was changed]`}</code>
              </pre>

              <h3>Version Control for Research</h3>
              <p>
                Use git to track changes to AI-assisted research outputs:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                <code>{`git commit -m "Add AI transcription of 1842 letters (verified)"
git commit -m "Correct AI translation errors in legal doc 5"
git commit -m "Add thematic analysis of diaries 1830s (needs expert review)"`}</code>
              </pre>

              <h2>Real-World Research Examples</h2>

              <div className="grid gap-4 my-8">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    <Link href="/projects/historylens" className="text-primary hover:underline">
                      HistoryLens Research Framework →
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    A structured workflow for using AI to analyze primary sources, generate interpretive hypotheses,
                    and map them against historical evidence. Includes verification protocols.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Case Study: Mining 19th Century Newspapers</h4>
                  <p className="text-sm text-muted-foreground">
                    Used AI to extract 2,000+ references to "telegraph" from digitized newspapers (1840-1860),
                    categorize sentiment, and track changing perceptions of communication technology. Verified against
                    100 random samples with 94% accuracy.
                  </p>
                </div>
              </div>

              <h2>Common Research Pitfalls</h2>

              <h3>Pitfall 1: Treating AI Like a Search Engine</h3>
              <p>
                <strong>Problem:</strong> Asking AI to "tell me about X" and accepting the response as factual.
              </p>
              <p>
                <strong>Solution:</strong> Use AI to process sources you provide, not as a substitute for research.
                Frame prompts as "analyze this document" not "what happened in 1848?"
              </p>

              <h3>Pitfall 2: Hallucinated Citations</h3>
              <p>
                <strong>Problem:</strong> AI invents plausible-sounding but fake book titles and authors.
              </p>
              <p>
                <strong>Solution:</strong> Never use AI-generated citations without verification. Instead, ask AI to
                identify themes or keywords, then search library catalogs yourself.
              </p>

              <h3>Pitfall 3: Losing the Forest for the Trees</h3>
              <p>
                <strong>Problem:</strong> AI helps process so much data that you lose sight of your research question.
              </p>
              <p>
                <strong>Solution:</strong> Start with clear research questions. Use AI to help answer them, not to
                generate endless data.
              </p>

              <h3>Pitfall 4: Overconfidence in AI Interpretation</h3>
              <p>
                <strong>Problem:</strong> Accepting AI's analysis of historical meaning without critical evaluation.
              </p>
              <p>
                <strong>Solution:</strong> AI can identify patterns but cannot replace interpretive expertise. Treat
                AI analysis as a research assistant's notes, not final conclusions.
              </p>

              <h2>Ethical Considerations</h2>

              <h3>Transparency in Scholarly Work</h3>
              <p>
                If you use AI in research that will be published, disclose it:
              </p>
              <ul>
                <li>Specify which tasks AI assisted with</li>
                <li>Describe verification procedures</li>
                <li>Note any limitations or concerns</li>
                <li>Make clear that final interpretations are your own</li>
              </ul>

              <h3>Privacy and Sensitive Sources</h3>
              <p>
                Be cautious about uploading sensitive materials to AI services:
              </p>
              <ul>
                <li>Personal information from recent history (privacy concerns)</li>
                <li>Unpublished archival materials (copyright and access restrictions)</li>
                <li>Materials from Indigenous or marginalized communities (sovereignty issues)</li>
              </ul>

              <h2>Next Steps</h2>

              <div className="bg-muted p-6 rounded-lg space-y-4 not-prose my-8">
                <h3 className="text-lg font-semibold mb-3">Continue Learning</h3>
                <div className="space-y-2">
                  <Link href="/guides/prompt-engineering" className="block text-primary hover:underline">
                    → Prompt Engineering for Humanities
                  </Link>
                  <Link href="/guides/claude-code-basics" className="block text-primary hover:underline">
                    → Getting Started with Claude Code
                  </Link>
                  <Link href="/guides/critical-pedagogy" className="block text-primary hover:underline">
                    → Critical AI Pedagogy
                  </Link>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Share Your Research Workflows</h3>
                <p className="mb-4">
                  Developed effective AI-assisted research methods? We're building a repository of tested workflows
                  for humanities researchers. Your contributions help advance the field.
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href="mailto:bbreen@ucsc.edu">Contribute your workflow</a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
