'use client'

import { useState } from 'react'
import { GuideLayout, WikiLink, GuideSectionDivider } from '@/components/ui/guide-layout'
import { HeadingAnchor } from '@/components/ui/heading-anchor'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { Lightbulb, AlertCircle, CheckCircle, ExternalLink, BookOpen, FileText, Search, AlertTriangle, Eye } from 'lucide-react'
import { siteConfig } from '@/lib/config'

const tableOfContents = [
  { id: 'intro', title: 'Introduction' },
  { id: 'hype-reality', title: 'Hype vs. Reality' },
  { id: 'what-works', title: 'What Actually Works' },
  { id: 'transcription', title: 'Transcription & OCR', level: 2 },
  { id: 'translation', title: 'Translation', level: 2 },
  { id: 'bibliographic', title: 'Bibliographic Help', level: 2 },
  { id: 'what-doesnt', title: 'What Doesn\'t Work' },
  { id: 'case-studies', title: 'Case Studies' },
  { id: 'case-study-1', title: 'Urbano Monte\'s Map', level: 2 },
  { id: 'case-study-2', title: 'Mexican Medical MS', level: 2 },
  { id: 'case-study-3', title: 'Generating Interpretations', level: 2 },
  { id: 'prompts', title: 'Sophisticated Prompts' },
  { id: 'decision-framework', title: 'Decision Framework' },
  { id: 'ethics', title: 'Ethics & Labor' },
  { id: 'conclusion', title: 'The Bottom Line' },
]

export default function AIHistoricalResearchGuide() {
  const [activeTab, setActiveTab] = useState('transcription')

  return (
    <GuideLayout
      title="AI for Historical Research"
      subtitle="A skeptical but practical guide: what works, what doesn't, and how to think critically about AI tools for scholarship"
      guideId="ai-historical-research"
      thumbnailPath="/thumbnails/ai-historical-research.webp"
      author={{
        name: 'Benjamin Breen',
        role: 'Principal Investigator, THINK',
      }}
      lastUpdated="November 2025"
      readingTime="30 min read"
      tableOfContents={tableOfContents}
    >
      <HeadingAnchor id="intro">Introduction: A Complicated Picture</HeadingAnchor>

      <p className="lead">
        The leading AI models are now good historians—in specific, narrow domains. But the hype vastly outpaces the reality. Most discourse about "AI for research" ignores what historians actually do: interpretive work with fragmentary, ambiguous sources that resist systematization. This guide is honest about what works, what doesn't, and what's snake oil.
      </p>

      <p>
        I began writing this guide with considerable dismay at how <WikiLink term="Large language model">LLMs</WikiLink> were being used by students in the classroom. Ask anyone in education: <WikiLink term="ChatGPT">ChatGPT</WikiLink> has been a disaster when it comes to facilitating student cheating and contributing to a general malaise among undergraduates. It's not just that students submit AI-written assignments—they're relying on AI-generated answers far more comprehensively in their daily lives. This has a flattening effect. LLMs, which are exquisitely well-tuned machines for finding the median viewpoint on any issue, are contributing to an increasing sameness in student responses.
      </p>

      <p>
        But that's not the whole story. The headaches LLMs have caused in the classroom are, I believe, more than counterbalanced by what they offer as tools for research and self-directed learning. I'm now cautiously optimistic about the long-term utility of AI tools for historical research—particularly for transcription, translation, and image analysis. With <WikiLink term="Google DeepMind">Google's</WikiLink> release of Gemini 3 in late 2025 and continued advances from <WikiLink term="Anthropic">Anthropic</WikiLink> and <WikiLink term="OpenAI">OpenAI</WikiLink>, the capabilities have genuinely improved.
      </p>

      <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-amber-900 dark:text-amber-100">
              The Core Tension
            </h4>
            <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-0">
              AI tools excel at mechanical tasks but struggle with the interpretive, contextual work that defines historical scholarship. The question isn't "can AI do history?" but rather "which specific tasks can AI assist with, and where does human judgment remain essential?" This guide tries to answer that honestly.
            </p>
          </div>
        </div>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="hype-reality">The Hype vs. Reality Gap</HeadingAnchor>

      <p>
        Much of the "AI for research" discourse is designed for STEM fields, where you might want to "summarize 100 papers" and extract findings into a table. This assumes papers have clear methods sections and extractable results—not how historical scholarship works. When you ask an AI to summarize <WikiLink term="E. P. Thompson">E.P. Thompson's</WikiLink> <em>The Making of the English Working Class</em>, what you get is... not useful. The value of that book lies in its texture, its voice, its argumentative structure over 800 pages. A summary misses the point entirely.
      </p>

      <p>
        Tools like <a href="https://elicit.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Elicit</a> and <a href="https://consensus.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Consensus</a> are genuinely useful for <WikiLink term="Economic history">economic history</WikiLink> or <WikiLink term="Demographic history">demographic studies</WikiLink> where scholarship has extractable quantitative findings. But for <WikiLink term="Cultural history">cultural history</WikiLink>, <WikiLink term="Intellectual history">intellectual history</WikiLink>, or any interpretive field? They're largely useless. I've tested them extensively on historiographical questions and gotten results that range from shallow to actively misleading.
      </p>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <h4 className="font-sans text-base font-semibold mt-0 mb-3">What the Marketing Doesn't Tell You</h4>
        <ul className="text-sm space-y-2 mb-0">
          <li><strong>"Find connections in your sources"</strong> — You already know your sources better than the AI. It will surface obvious patterns you've already noticed, or hallucinate non-existent ones.</li>
          <li><strong>"Synthesize hundreds of articles"</strong> — Works for extracting methods/findings from empirical papers. Fails for interpretive scholarship where the argument <em>is</em> the content.</li>
          <li><strong>"AI as research partner"</strong> — More like a well-read but unreliable research assistant who needs constant supervision and occasionally makes things up.</li>
        </ul>
      </div>

      <p>
        NotebookLM, a product from Google, seems like a promising though still early-stages research tool for humanistic scholarship. (Full disclosure: I need to test it out much more to have a real opinion). <WikiLink term="Steven Johnson (author)">Steven Johnson</WikiLink>, who helped create it, has legitimate use cases (searching 7,000 quotes from decades of research). The research workflows of writers and humanistic scholars tend to be so dissimilar and idiosyncratic, though, that the utility of tools like this very much depends upon the way *you* in particular like to work. 
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="what-works">What Actually Works (Narrow Use Cases)</HeadingAnchor>

      <p>
        That said, there are domains where current AI genuinely helps. Here's what I've found actually useful in my own research:
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="my-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transcription">Transcription</TabsTrigger>
          <TabsTrigger value="translation">Translation</TabsTrigger>
          <TabsTrigger value="bibliographic">Bibliography</TabsTrigger>
        </TabsList>

        <TabsContent value="transcription" className="mt-6">
          <div id="transcription" className="scroll-mt-24">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-sans text-lg font-semibold mb-4 text-emerald-900 dark:text-emerald-100">Transcription & OCR: The Clear Win</h4>
              <p className="text-sm mb-4">
                This is where AI genuinely shines. <WikiLink term="GPT-4">GPT-4o</WikiLink>, Claude 3.5 Sonnet, and Gemini 3 can now transcribe early modern handwriting with remarkable accuracy. I tested GPT-4o on blocks of 16th-century Italian cursive from <WikiLink term="Urbano Monte">Urbano Monte's</WikiLink> world map and got results that were basically perfect, with only minor errors (like "disegnato" instead of "dissegnata")—errors that don't change meaning.
              </p>
              <p className="text-sm mb-4">
                Even "easy" early modern <WikiLink term="Paleography">paleography</WikiLink> like Monte's legible handwriting requires days or weeks of training to master. AI collapses that barrier instantly.
              </p>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-md">
                <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">Caveats:</p>
                <ul className="text-sm text-emerald-800 dark:text-emerald-200 space-y-1">
                  <li>Always spot-check. AI will confidently transcribe illegible passages incorrectly.</li>
                  <li>Accuracy drops significantly with damaged documents or unusual scripts.</li>
                  <li>For critical passages, verify against the original.</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="translation" className="mt-6">
          <div id="translation" className="scroll-mt-24">
            <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-sans text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">Translation: Useful Starting Point</h4>
              <p className="text-sm mb-4">
                LLMs translate historical texts far better than <WikiLink term="Google Translate">Google Translate</WikiLink>. They handle archaic vocabulary, period-specific idioms, and unusual syntax with surprising sophistication. The Monte transcription produced a translation good enough to use for research—I could verify it against my own (limited) Italian.
              </p>
              <p className="text-sm mb-4">
                <WikiLink term="Neo-Latin">Neo-Latin</WikiLink> texts, early modern vernaculars, and even some manuscript hands that specialists would struggle with—AI handles these reasonably well now.
              </p>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-md">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Best Practices:</p>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>Treat AI translations as first drafts requiring expert review.</li>
                  <li>Ask for notes on archaic terms and ambiguities.</li>
                  <li>Provide context (document type, date, region) for better results.</li>
                  <li>If possible, have someone who reads the language validate critical passages.</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bibliographic" className="mt-6">
          <div id="bibliographic" className="scroll-mt-24">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border">
              <h4 className="font-sans text-lg font-semibold mb-4">Bibliographic Help: Surprisingly Improved</h4>
              <p className="text-sm mb-4">
                A year ago, when I requested further reading on a topic, ChatGPT would either invent fake sources or recommend terrible ones (like History Channel websites). That has changed dramatically. GPT-4o now recommends genuinely relevant scholarly sources—books I hadn't considered as relevant to my specific topic but which, on reflection, actually are.
              </p>
              <p className="text-sm mb-4">
                For my work on early modern cartography, it suggested <em>The Commerce of Cartography</em>—a newish book I should know about but didn't. It also recommended <WikiLink term="Peter Burke (historian)">Peter Burke's</WikiLink> work on the Renaissance sense of the past as relevant to understanding a 16th-century map, which is a genuinely useful connection.
              </p>
              <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-md">
                <p className="text-sm font-medium text-orange-900 dark:text-orange-100 mb-2">Still Problematic:</p>
                <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                  <li>AI still occasionally fabricates citations. Always verify before citing.</li>
                  <li>Recommendations skew toward well-known works; obscure but important sources get missed.</li>
                  <li>Can't replace actually reading the historiography yourself.</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Other Genuinely Useful Tasks</h3>

      <ul>
        <li><strong>Rubber duck debugging:</strong> Talking through ideas, not generating them. "Here's my argument about X—what are the obvious objections?"</li>
        <li><strong>Formatting drudgery:</strong> Converting footnotes between citation styles, reformatting bibliographies, generating metadata.</li>
        <li><strong>Preliminary coding:</strong> If you're doing <WikiLink term="Content analysis">content analysis</WikiLink> on a large corpus, AI can do a first-pass thematic coding that you then verify and refine.</li>
        <li><strong>Explaining unfamiliar terms:</strong> "What did 'popolo minuto' mean in 17th-century Florence?" produces better results than Wikipedia for period-specific terminology.</li>
      </ul>

      <GuideSectionDivider />

      <HeadingAnchor id="what-doesnt">What Doesn't Work (Or Works Poorly)</HeadingAnchor>

      <div className="my-6 space-y-4">
        <div className="p-5 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-red-900 dark:text-red-100">
            Literature Synthesis for Interpretive Scholarship
          </h4>
          <p className="text-sm text-red-900/80 dark:text-red-100/80 mb-0">
            The "summarize 100 papers" use case assumes extractable findings. Historical scholarship doesn't work that way. When I uploaded 30 articles on the <WikiLink term="French Revolution">French Revolution</WikiLink> to NotebookLM and asked for a historiographical overview, what I got was accurate but shallow—the kind of summary a bright undergraduate might produce after skimming abstracts. It missed the stakes of debates, the intellectual genealogies, the methodological tensions that actually matter.
          </p>
        </div>

        <div className="p-5 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-red-900 dark:text-red-100">
            "Finding Connections" in Your Sources
          </h4>
          <p className="text-sm text-red-900/80 dark:text-red-100/80 mb-0">
            You already know your archival sources better than any AI. The "unexpected connections" it surfaces are usually either obvious patterns you've already noticed or spurious correlations based on keyword matching. The serendipitous discoveries that make archival research exciting come from human intuition and domain expertise, not pattern-matching algorithms.
          </p>
        </div>

        <div className="p-5 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-red-900 dark:text-red-100">
            Anything Requiring Period-Specific Context
          </h4>
          <p className="text-sm text-red-900/80 dark:text-red-100/80 mb-0">
            When I tested an AI "apothecary simulation" set in the 1690s, it advised recommending <WikiLink term="Tai chi">tai chi</WikiLink> to a patient—a 20th-century practice. This is the "talking rat problem": outputs so anachronistic they undermine any educational value. AI lacks the temporal sensitivity that historical thinking requires. It doesn't understand that a word, practice, or concept meant something entirely different in 1690 than in 2025.
          </p>
        </div>

        <div className="p-5 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-red-900 dark:text-red-100">
            Generating Original Historical Arguments
          </h4>
          <p className="text-sm text-red-900/80 dark:text-red-100/80 mb-0">
            When prompted to produce "boundary-pushing" interpretations, AI generates ideas that sound sophisticated but converge on the median of what's already been said. The architecture of these models—trained on existing text, optimized for plausibility—makes genuine originality structurally impossible. What you get is very similar to what a first-year history PhD student might produce: well-informed but predictable.
          </p>
        </div>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="case-studies">Case Studies from Actual Research</HeadingAnchor>

      <p>
        Let me share three examples from my own testing that illustrate both the capabilities and limits of current AI for historical research.
      </p>

      <h3 id="case-study-1" className="font-sans text-xl font-semibold mt-8 mb-4 scroll-mt-24">Case Study 1: Transcribing Urbano Monte's Map</h3>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <p className="text-sm mb-4">
          <WikiLink term="Urbano Monte">Urbano Monte</WikiLink> created one of the largest world maps of the 16th century. I tested GPT-4o on a block of Italian cursive handwriting from the map—unusually legible by early modern standards, but still requiring paleographic training to read.
        </p>
        <p className="text-sm mb-4">
          <strong>Result:</strong> Basically perfect transcription with minor errors that didn't affect meaning (like "Gentill'homo" transcribed in the more modern spelling "Gentil-huomo"). The translation was good enough to use for research.
        </p>
        <p className="text-sm mb-4">
          <strong>What impressed me:</strong> When asked for historical context, GPT-4o recommended genuinely relevant academic sources—not just obvious choices, but books like <em>The Commerce of Cartography</em> that I hadn't considered but found useful.
        </p>
        <p className="text-sm mb-0 text-muted-foreground">
          <strong>Takeaway:</strong> For transcription and translation of reasonably legible early modern documents, current AI is genuinely useful. The verification burden is lower than the time saved.
        </p>
      </div>

      <h3 id="case-study-2" className="font-sans text-xl font-semibold mt-8 mb-4 scroll-mt-24">Case Study 2: An 18th-Century Mexican Medical Manuscript</h3>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <p className="text-sm mb-4">
          I tested OpenAI's o1 model on a page from a 1770s Mexican compendium of medical recipes (now at the <WikiLink term="Wellcome Collection">Wellcome Library</WikiLink>)—elaborate calligraphy with anthropomorphic suns, serpentine letters, and a whimsical figure beneath the scrollwork. No context provided, just a request to transcribe, translate, and analyze.
        </p>
        <p className="text-sm mb-4">
          <strong>Transcription:</strong> Mostly accurate, with some errors. It figured out that glyphs at the top spelled "Consulta" but missed that the doctor's full name was "Juan Bautista Procopio Couto." It rendered "explicación phisica" (physical explanation) as "poetic explanation"—a significant misreading.
        </p>
        <p className="text-sm mb-4">
          <strong>What surprised me:</strong> The iconographic analysis noticed details I had missed myself—a "heart or medallion" on the figure's chest that I hadn't registered. (I think it's actually a physician holding a portable medical chest and urine flask, but the AI drawing attention to the detail was valuable.)
        </p>
        <p className="text-sm mb-0 text-muted-foreground">
          <strong>Takeaway:</strong> AI provides another set of "eyes" on a problem. Even when wrong, an altered perspective can be helpful. But the errors mean you can't trust anything without verification.
        </p>
      </div>

      <h3 id="case-study-3" className="font-sans text-xl font-semibold mt-8 mb-4 scroll-mt-24">Case Study 3: Generating Historical Interpretations</h3>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <p className="text-sm mb-4">
          For my book project on <WikiLink term="Francis Galton">Francis Galton</WikiLink> and <WikiLink term="William James">William James</WikiLink>, I fed both o1 and Claude 3.5 Sonnet some direct quotes from James' letters and works relating to Galton, then asked for analysis emphasizing "novel research directions."
        </p>
        <p className="text-sm mb-4">
          <strong>o1's output:</strong> Genuinely sophisticated meta-reflection on the sources. When prompted for "boundary-pushing" ideas, it produced eight different frameworks for historical arguments. One proposed reading James as developing an "anti-panopticon of consciousness"—positioning his philosophy against Galton's proto-statistical surveillance. This is... good. Close to the level of analysis I'm currently at with my own book project, generated in 5 seconds.
        </p>
        <p className="text-sm mb-4">
          <strong>But here's the thing:</strong> The analysis was very similar to what a class of grad students would produce—high-level and well-informed, but predictable. References to <WikiLink term="Michel Foucault">Foucault</WikiLink> and <WikiLink term="Panopticism">panopticism</WikiLink> are exactly what you'd expect. The models converge on the median of existing scholarship. That's their architecture.
        </p>
        <p className="text-sm mb-0 text-muted-foreground">
          <strong>Takeaway:</strong> AI can be a useful interlocutor for thinking through research directions. But don't expect originality. What it produces is "PhD-level" in the sense of first-year competence, not genuine insight.
        </p>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="prompts">Sophisticated Prompts for Historical Research</HeadingAnchor>

      <p>
        Most prompting guides offer generic templates. Here are prompts designed for the specific challenges of historical research—developed through extensive testing and informed by what actually works.
      </p>

      <div className="my-8 space-y-6">
        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-3">The Anachronism Detector</h4>
          <p className="text-sm text-muted-foreground mb-3">Use this to catch AI (and your own) temporal slippage:</p>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-xs"><code>{`I'm writing about [TOPIC] in [TIME PERIOD]. Review this passage and identify:

1. Any concepts, terms, or frameworks that would have been unavailable or meant something different in that period
2. Implicit assumptions that reflect modern rather than period thinking
3. Technological, social, or intellectual anachronisms
4. Terms I'm using in their modern sense that had different connotations then

For each issue, explain what the period-appropriate alternative would be, or flag if the concept simply didn't exist.

[PASTE YOUR TEXT]`}</code></pre>
          </div>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-3">The Scholarly Genealogist</h4>
          <p className="text-sm text-muted-foreground mb-3">For tracing historiographical lineages—better than generic "summarize the debate" prompts:</p>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-xs"><code>{`I'm researching the historiography of [TOPIC]. For the scholars and works I mention below:

1. Identify their intellectual genealogies—who trained them, what methodological traditions they draw on
2. Map explicit disagreements and critiques between them
3. Note methodological tensions (quantitative vs. cultural approaches, national vs. transnational framing, etc.)
4. Identify what questions they share despite disagreements
5. Flag any scholars who have substantially changed their positions over time

Don't summarize arguments—I've read these. Focus on relationships and trajectories.

Scholars/works: [LIST]`}</code></pre>
          </div>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-3">The Source Interrogator</h4>
          <p className="text-sm text-muted-foreground mb-3">For pushing beyond surface readings of primary sources:</p>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-xs"><code>{`Analyze this [TYPE OF DOCUMENT] from [DATE/PLACE]. I want you to think like a skeptical historian:

1. What is this document trying to accomplish? What work is it doing for its author?
2. What does the author assume their audience already knows or believes?
3. What is conspicuously absent—what would we expect to see that isn't here?
4. What are the document's silences? Whose perspectives are excluded?
5. How might someone hostile to the author have described the same events?
6. What can we learn from the document's form, structure, and rhetoric—not just its content?

Be specific. Cite passages. Speculate where evidence permits, but flag speculation.

[PASTE SOURCE TEXT]`}</code></pre>
          </div>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-3">The Period Voice Calibrator</h4>
          <p className="text-sm text-muted-foreground mb-3">For translation that preserves historical register:</p>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-xs"><code>{`Translate this [LANGUAGE] text from [DATE]. I need:

1. A literal translation preserving the original's syntax and structure where possible
2. A fluent translation that a modern reader could understand
3. A "period voice" translation—what this might sound like in English of the same era (e.g., if 1650s French, then 1650s English)

For each version, note:
- Terms that have no direct equivalent and how you handled them
- Idioms or phrases whose meaning depends on cultural context
- Ambiguities in the original that any translation must resolve (and how you chose)
- Social register—is this formal, familiar, elevated, vulgar?

[PASTE SOURCE TEXT]`}</code></pre>
          </div>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-3">The Devil's Advocate</h4>
          <p className="text-sm text-muted-foreground mb-3">For stress-testing your own arguments:</p>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-xs"><code>{`Here is my argument about [TOPIC]:

[YOUR ARGUMENT]

Attack this argument as rigorously as possible:

1. What are the strongest counter-arguments from within the existing historiography?
2. What evidence would most directly contradict my claims?
3. What methodological objections could a skeptical reviewer raise?
4. Where am I making leaps that the evidence doesn't support?
5. What would a scholar from a different methodological tradition (e.g., if I'm doing cultural history, what would an economic historian say?) object to?
6. What am I probably wrong about?

Be harsh. I need this to be better.`}</code></pre>
          </div>
        </div>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="decision-framework">A Decision Framework: When to Use AI</HeadingAnchor>

      <p>
        Before using AI for any research task, ask yourself these questions:
      </p>

      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-left font-sans text-sm font-semibold">Question</th>
              <th className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-left font-sans text-sm font-semibold">If Yes...</th>
              <th className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-left font-sans text-sm font-semibold">If No...</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3">Would I trust a research assistant to do this unsupervised?</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-emerald-700 dark:text-emerald-400">AI might be appropriate</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-red-700 dark:text-red-400">Do it yourself</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3">Can I verify the output faster than doing it myself?</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-emerald-700 dark:text-emerald-400">Worth trying AI</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-red-700 dark:text-red-400">Probably not worth it</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3">Does this task require interpretive judgment?</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-red-700 dark:text-red-400">Human judgment essential</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-emerald-700 dark:text-emerald-400">AI can help</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3">Am I using AI because it's useful or because it's novel?</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-amber-700 dark:text-amber-400">Reconsider your motives</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-emerald-700 dark:text-emerald-400">Good reason to proceed</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3">Is the task mechanical (transcription, formatting, translation draft)?</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-emerald-700 dark:text-emerald-400">AI's sweet spot</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-3 text-amber-700 dark:text-amber-400">Consider carefully</td>
            </tr>
          </tbody>
        </table>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="ethics">Ethics, Labor, and Access</HeadingAnchor>

      <p>
        Discussions of "AI for research" often bracket uncomfortable questions about how these tools are made and who benefits from them.
      </p>

      <div className="my-6 space-y-4">
        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Who Trains These Models?</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            The "AI" that transcribes your 18th-century manuscript was trained partly through the labor of <WikiLink term="Ghost work">content moderators</WikiLink> in Kenya, the Philippines, and elsewhere—workers paid poverty wages to label data and filter traumatic content. The supply chain of AI involves exploitation that scholars should at least be aware of.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Environmental Costs</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            Training and running large language models requires enormous computational resources with significant <WikiLink term="Environmental impact of artificial intelligence">carbon footprints</WikiLink>. Every query has an environmental cost. This doesn't mean we shouldn't use these tools, but we should use them thoughtfully rather than frivolously.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Access Disparities</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            Many AI tools require paid subscriptions. Researchers at wealthy institutions have access that others don't. Are we creating new divides in who can do historical research efficiently? How do we ensure these tools don't exacerbate existing inequities in the academy?
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-2">Cognitive Offloading</h4>
          <p className="text-sm mb-0 text-muted-foreground">
            Are we outsourcing cognitive work we should be doing ourselves? <WikiLink term="Margaret Mead">Margaret Mead</WikiLink> wrote in 1963 that automation helps when it frees humans for creative thinking, but fails when we mistake drudgery-elimination for intellectual offloading. The line between transcription (drudgery) and interpretation (thinking) isn't always clear.
          </p>
        </div>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="conclusion">The Bottom Line</HeadingAnchor>

      <div className="my-8 p-6 bg-muted rounded-lg">
        <p className="mb-4">
          AI tools can genuinely help with specific, narrow tasks in historical research—particularly transcription, translation, and bibliographic assistance. For these mechanical tasks, the current generation of models (GPT-4o, Claude 3.5 Sonnet, Gemini 3) represents a real breakthrough.
        </p>
        <p className="mb-4">
          But the interpretive, contextual, imaginative work that defines historical scholarship remains fundamentally human. AI converges on the median—which is useful for some purposes but antithetical to original thinking. It lacks temporal sensitivity, missing the ways that words, concepts, and practices meant different things in different periods. It can't distinguish important silences from mere absences.
        </p>
        <p className="mb-4">
          The historians who will benefit most from these tools are those who understand their limits as clearly as their capabilities—who use AI for what it's good at while maintaining the critical, interpretive work that no algorithm can replace.
        </p>
        <p className="mb-0 font-medium">
          Consciousness really is an irreducible interior fortress that refuses to be pinned down by the numeric lens. Really, it is.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Further Reading</h3>
        <div className="space-y-2 text-sm">
          <p>
            <a href="https://resobscura.substack.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Res Obscura
            </a>
            {' '}— Ongoing discussions of AI and historical research
          </p>
          <p>
            <a href="https://generativehistory.substack.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Generative History
            </a>
            {' '}— Experiments in AI-assisted historical writing
          </p>
          <p>
            Rob Nelson's <em>AI Log</em> — Documentation of AI failures and limitations in scholarly contexts
          </p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Related Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/guides/prompt-engineering" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h4 className="font-semibold mb-1 text-sm">Prompt Engineering for Humanities</h4>
            <p className="text-xs text-muted-foreground">Advanced prompting techniques</p>
          </Link>
          <Link href="/guides/critical-pedagogy" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h4 className="font-semibold mb-1 text-sm">Critical AI Pedagogy</h4>
            <p className="text-xs text-muted-foreground">Teaching students to think critically about AI</p>
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
