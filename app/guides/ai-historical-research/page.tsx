'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { BackToTop } from '@/components/ui/back-to-top'
import { HeadingAnchor } from '@/components/ui/heading-anchor'
import { GuideBanner } from '@/components/ui/guide-banner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { ArrowLeft, Lightbulb, AlertCircle, CheckCircle, ExternalLink, BookOpen, FileText, Search } from 'lucide-react'

export default function AIHistoricalResearchGuide() {
  const [activeTab, setActiveTab] = useState('notebook')

  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'AI for Historical Research' }
      ]} />
      <Section className="pt-8 pb-16">
        <Container>
          <GuideBanner
            thumbnailPath="/thumbnails/ai-historical-research.png"
            guideTitle="AI for Historical Research"
            guideId="ai-historical-research"
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
                  <a href="#intro" className="block text-foreground/70 hover:text-primary transition-colors">
                    Introduction
                  </a>
                  <a href="#landscape" className="block text-foreground/70 hover:text-primary transition-colors">
                    The Current Landscape
                  </a>
                  <a href="#notebooklm" className="block text-foreground/70 hover:text-primary transition-colors">
                    Google NotebookLM
                  </a>
                  <a href="#research-tools" className="block text-foreground/70 hover:text-primary transition-colors">
                    Research Synthesis Tools
                  </a>
                  <a href="#document-analysis" className="block text-foreground/70 hover:text-primary transition-colors">
                    Document Analysis & OCR
                  </a>
                  <a href="#workflows" className="block text-foreground/70 hover:text-primary transition-colors">
                    Practical Workflows
                  </a>
                  <a href="#prompts" className="block text-foreground/70 hover:text-primary transition-colors">
                    Prompt Library
                  </a>
                  <a href="#limitations" className="block text-foreground/70 hover:text-primary transition-colors">
                    Limitations & Ethics
                  </a>
                  <a href="#future" className="block text-foreground/70 hover:text-primary transition-colors">
                    The Future
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-serif font-bold mb-4">
                  AI for Historical Research
                </h1>
                <p className="text-xl text-muted-foreground mb-12">
                  A comprehensive guide to using AI tools for document analysis, literature synthesis, translation, and historical research workflows
                </p>

                <div className="prose prose-xl max-w-none">
                  <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-amber-900 dark:text-amber-100">
                          What This Guide Covers
                        </h4>
                        <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-0">
                          This guide focuses on <strong>augmenting</strong> historical research with AI—not replacing the core scholarly work of interpretation and argument. We'll explore tools for literature review, document transcription, translation, data extraction, and synthesis. All approaches emphasize verification, transparency, and maintaining scholarly rigor.
                        </p>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="intro">Introduction: AI as Research Assistant</HeadingAnchor>

                  <p>
                    Artificial intelligence is transforming historical research workflows in 2024-2025. From transcribing 19th-century handwritten documents to synthesizing hundreds of scholarly articles, AI tools are making tasks that once took weeks or months achievable in hours or days. But these tools work best when historians understand both their capabilities and limitations.
                  </p>

                  <p>
                    This guide draws on work by Steven Johnson (co-creator of Google NotebookLM), recent advances in historical document recognition (including the{' '}
                    <a href="https://arxiv.org/html/2509.19768v1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      Churro project
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    ), and practical experience from historians using AI in 2024-2025. We'll examine specific tools, provide tested prompts, and outline workflows that maintain scholarly standards while leveraging AI capabilities.
                  </p>

                  <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
                          Key Principle: Augmentation, Not Automation
                        </h4>
                        <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
                          The best uses of AI in historical research enhance human capabilities rather than replacing human judgment. AI excels at mechanical tasks—transcription, translation, pattern identification, literature scanning—but the interpretive work of understanding historical significance, identifying bias, and constructing arguments remains fundamentally human.
                        </p>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="landscape">The Current Landscape (2024-2025)</HeadingAnchor>

                  <p>
                    The AI tools available to historians have matured dramatically in the past two years. Here's an overview of the major categories:
                  </p>

                  <div className="my-8 overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800">
                          <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Tool Category</th>
                          <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Primary Use</th>
                          <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Leading Tools</th>
                          <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Best For</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Research Synthesis</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Working with your own sources & notes</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">NotebookLM, Claude Projects</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Synthesizing archival materials, finding connections</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Literature Review</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Finding & analyzing academic papers</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Elicit, Consensus, Perplexity</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Mapping scholarly debates, identifying key studies</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Document Analysis</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">OCR, transcription, translation</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Claude 3.5, ChatGPT-4o, Churro</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Handwritten documents, non-English sources</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Map Analysis</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Extracting data from historical maps</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">MapReader (Alan Turing Institute)</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Geographic data extraction, spatial analysis</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Text Analysis</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Thematic coding, pattern detection</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">GPT-4, Claude 3.5, GUWEN-BERT</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Large corpora, computational text analysis</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <HeadingAnchor id="notebooklm">Google NotebookLM: Your AI Research Partner</HeadingAnchor>

                  <p>
                    <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      Google NotebookLM
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}represents perhaps the most significant development for historians in 2024. Unlike ChatGPT or Claude (which draw from massive pre-trained datasets), NotebookLM works exclusively with sources <em>you upload</em>—making it perfect for archival research, primary source analysis, and working with specialized historical materials.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">How NotebookLM Works</h3>

                  <p>
                    NotebookLM creates a personalized AI that knows only your uploaded sources. You can upload:
                  </p>

                  <ul>
                    <li>PDFs (up to 50 per notebook)</li>
                    <li>Google Docs</li>
                    <li>Text files</li>
                    <li>Copied text passages</li>
                    <li>Web URLs (YouTube transcripts, articles, etc.)</li>
                  </ul>

                  <p>
                    The AI then synthesizes information across these sources, maintaining citations back to the original materials. This is crucial for historical research—you can verify every claim.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Steven Johnson's Workflow</h3>

                  <p>
                    Steven Johnson, NotebookLM's Editorial Director and author of 14 books (including the Edgar-winning <em>The Infernal Machine</em>), uses NotebookLM extensively for historical research. His approach offers lessons for historians:
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Johnson's Research Process</h4>
                    <ol className="text-sm space-y-2 mb-0 pl-5">
                      <li><strong>Accumulation phase:</strong> Upload all relevant sources—primary documents, secondary literature, your own notes—into a notebook</li>
                      <li><strong>Exploration phase:</strong> Ask broad questions to find unexpected connections across sources</li>
                      <li><strong>Verification phase:</strong> Check every interesting claim against the cited sources</li>
                      <li><strong>Writing phase:</strong> Use NotebookLM to draft sections, always verifying and revising with human judgment</li>
                    </ol>
                  </div>

                  <p>
                    Johnson used NotebookLM while researching the California Gold Rush, maintaining a collection of over 7,000 quotes from 20+ years of research. He could instantly find specific facts or quotes with natural language queries—work that would otherwise require hours of manual searching.
                  </p>

                  <div className="my-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                          Key Advantage for Historians
                        </h4>
                        <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                          Because NotebookLM works only with your sources, you avoid the hallucination problem that plagues general-purpose AI. If NotebookLM says something is in a source, you can check. This makes it far more trustworthy for scholarly work than asking ChatGPT about historical topics it may misremember or confabulate.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Practical Use Cases</h3>

                  <div className="my-6 space-y-4">
                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">Use Case 1: Finding Thematic Patterns</h4>
                      <p className="text-sm mb-3">
                        <strong>Task:</strong> You've collected 30 Civil War diaries and want to identify common themes about soldiers' experiences.
                      </p>
                      <p className="text-sm text-muted-foreground mb-0">
                        <strong>Approach:</strong> Upload all diaries to NotebookLM. Ask: "What are the most common concerns or anxieties expressed across these diaries?" NotebookLM will synthesize patterns and cite specific diary entries, letting you verify whether the identified themes are well-supported.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">Use Case 2: Tracking Scholarly Debates</h4>
                      <p className="text-sm mb-3">
                        <strong>Task:</strong> Understanding how historians have interpreted the causes of the French Revolution over the past 50 years.
                      </p>
                      <p className="text-sm text-muted-foreground mb-0">
                        <strong>Approach:</strong> Upload 20-30 key articles and book chapters. Ask: "How have explanations for the French Revolution's causes changed over time? What are the major schools of thought?" NotebookLM can map the historiographical landscape with specific citations.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">Use Case 3: Comparative Analysis</h4>
                      <p className="text-sm mb-3">
                        <strong>Task:</strong> Comparing how two historical figures (e.g., Frederick Douglass and William Lloyd Garrison) discussed abolition.
                      </p>
                      <p className="text-sm text-muted-foreground mb-0">
                        <strong>Approach:</strong> Upload speeches and writings from both. Ask: "What are the key differences in how Douglass and Garrison justify abolition? Where do they disagree on tactics?" NotebookLM will pull specific quotes showing contrasts.
                      </p>
                    </div>
                  </div>

                  <HeadingAnchor id="research-tools">Literature Review & Research Synthesis Tools</HeadingAnchor>

                  <p>
                    Beyond NotebookLM, several specialized tools help historians navigate the vast scholarly literature. These tools search academic databases and extract structured information from published research.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Elicit: Structured Research Synthesis</h3>

                  <p>
                    <a href="https://elicit.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      Elicit
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}searches over 125 million academic papers and extracts structured data—methods, findings, sample sizes—into scannable tables. While designed primarily for scientific research, it works well for empirical historical studies.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">What Elicit Does Well</h4>
                    <ul className="text-sm space-y-2 mb-0 pl-5">
                      <li><strong>Systematic literature reviews:</strong> Finding all studies on a specific topic and extracting comparable data</li>
                      <li><strong>Research questions:</strong> Type a question ("How did literacy rates change in 19th-century Britain?") and get relevant papers with extracted findings</li>
                      <li><strong>Screening abstracts:</strong> Quickly determine which papers are worth reading in full</li>
                    </ul>
                  </div>

                  <p>
                    <strong>Limitations for historians:</strong> Elicit works best with quantitative studies that have clear methods/findings sections. Interpretive historical scholarship may not be well-represented in the extracted summaries. It's excellent for finding empirical studies (e.g., demographic history, economic history) but less useful for cultural or intellectual history.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Consensus: The Scholarly Consensus Meter</h3>

                  <p>
                    <a href="https://consensus.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      Consensus
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}searches 200 million papers and provides a "consensus meter" showing whether research supports, opposes, or is mixed on a claim.
                  </p>

                  <p>
                    This tool is most valuable when you need to quickly assess the state of scholarship on a factual question:
                  </p>

                  <ul>
                    <li>"Did climate change contribute to the fall of the Roman Empire?" → Shows distribution of scholarly opinion</li>
                    <li>"Was the Black Death caused by bubonic plague?" → Maps the debate with citations</li>
                  </ul>

                  <div className="my-8 p-6 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-orange-900 dark:text-orange-100">
                          Important Caveat
                        </h4>
                        <p className="text-sm text-orange-900/80 dark:text-orange-100/80 mb-0">
                          "Consensus" doesn't mean "truth"—it means scholarly agreement at a moment in time. Historical scholarship evolves, and minorit positions sometimes overturn established consensus. Use these tools to understand the field, not as arbiters of historical fact.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Perplexity: Conversational Research</h3>

                  <p>
                    <a href="https://perplexity.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      Perplexity AI
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}combines search with AI synthesis, providing cited answers to research questions. Unlike ChatGPT, Perplexity always provides sources for its claims, making verification possible.
                  </p>

                  <p>
                    <strong>Best for:</strong> Exploratory research, unfamiliar topics, or getting oriented in a new area. Ask broad questions and follow up based on the cited sources.
                  </p>

                  <HeadingAnchor id="document-analysis">Document Analysis & OCR: Reading Historical Sources</HeadingAnchor>

                  <p>
                    One of the most transformative applications of AI for historians is automated transcription and translation of historical documents. Recent advances in vision-language models have dramatically improved accuracy for handwritten and damaged materials.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Breakthrough: Churro and Historical Text Recognition</h3>

                  <p>
                    Research from 2024 (the{' '}
                    <a href="https://arxiv.org/html/2509.19768v1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      Churro project
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    ) demonstrated that specialized AI models trained on historical documents significantly outperform general-purpose tools. Churro, a 3-billion-parameter vision-language model, achieved 82.3% accuracy on printed historical documents and 70.1% on handwritten texts—surpassing commercial models like Gemini 2.5 Pro.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">What This Means for Historians</h4>
                    <p className="text-sm mb-3">
                      Domain-specific training on historical materials produces far better results than using ChatGPT or Claude with zero training. However, Churro isn't yet publicly available. Currently accessible tools include:
                    </p>
                    <ul className="text-sm space-y-1 mb-0 pl-5">
                      <li><strong>Claude 3.5 Sonnet:</strong> Best currently available commercial model for handwritten text (approaching 100% on clear handwriting)</li>
                      <li><strong>ChatGPT-4o:</strong> Good for document images with mixed text and diagrams</li>
                      <li><strong>Specialized tools:</strong> Transkribus for large-scale transcription projects, trained on specific scripts</li>
                    </ul>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Practical OCR Workflows</h3>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="my-8">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="handwritten">Handwritten Docs</TabsTrigger>
                      <TabsTrigger value="printed">Printed Docs</TabsTrigger>
                      <TabsTrigger value="translation">Translation</TabsTrigger>
                    </TabsList>

                    <TabsContent value="handwritten" className="mt-6">
                      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                        <h4 className="font-sans text-base font-semibold mb-4">Transcribing Handwritten Documents with Claude</h4>
                        <p className="text-sm mb-4">
                          <strong>Tool:</strong> Claude 3.5 Sonnet (via claude.ai or API)
                        </p>
                        <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto mb-4">
                          <pre className="text-xs"><code>{`Prompt:

Please transcribe this handwritten document. Follow these guidelines:

1. Preserve original spelling, capitalization, and punctuation exactly as written
2. If a word is illegible, mark it as [illegible] rather than guessing
3. If you're uncertain about a word, mark it as [uncertain: possible_word]
4. Preserve line breaks and paragraph structure
5. After the transcription, note any contextual observations (date, type of document, notable features)

[Upload image of handwritten document]`}</code></pre>
                        </div>
                        <p className="text-sm mb-3">
                          <strong>Sample Output:</strong>
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-xs">
                          <p className="mb-2">Dear Sir,</p>
                          <p className="mb-2">I write to inform you of the [uncertain: recent] developments concerning the cotton shipment. The cargo arrived on the 15th inst. but was found to contain [illegible] which necessitated inspection by the customs agent.</p>
                          <p className="mb-4">Yours faithfully,<br/>John Smith</p>
                          <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                            <strong>Observations:</strong> Business letter, appears to be mid-19th century based on handwriting style and terminology ("inst." for instant/current month). Formal mercantile correspondence.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="printed" className="mt-6">
                      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                        <h4 className="font-sans text-base font-semibold mb-4">OCR for Printed Historical Documents</h4>
                        <p className="text-sm mb-4">
                          <strong>Tool:</strong> Claude 3.5 or ChatGPT-4o
                        </p>
                        <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto mb-4">
                          <pre className="text-xs"><code>{`Prompt:

Please perform OCR on this printed historical document. Requirements:

1. Transcribe all text exactly as printed, including headers, footnotes, and marginalia
2. Preserve formatting (italics, bold, indentation) using markdown
3. If there are multiple columns, transcribe left to right, top to bottom
4. Mark damaged or illegible sections as [illegible]
5. Note any non-text elements: [IMAGE: description], [TABLE: description], etc.
6. Maintain original pagination if visible

[Upload image of printed document]`}</code></pre>
                        </div>
                        <p className="text-sm mb-3">
                          <strong>Sample Output:</strong>
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-xs">
                          <p className="font-bold mb-2">THE LONDON TIMES</p>
                          <p className="italic mb-2">Wednesday, March 15, 1848</p>
                          <p className="mb-4">**CONTINENTAL NEWS**</p>
                          <p className="mb-2">Reports from Paris indicate that the revolutionary sentiment has spread beyond the capital. Provincial cities including Lyon and Marseille have witnessed [illegible] demanding reforms to the electoral system.</p>
                          <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                            [TABLE: Commodity prices for cotton, wheat, and sugar - 3 columns, 10 rows]
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="translation" className="mt-6">
                      <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                        <h4 className="font-sans text-base font-semibold mb-4">Translating Historical Documents</h4>
                        <p className="text-sm mb-4">
                          <strong>Tool:</strong> Claude 3.5 or GPT-4 (LLMs translate better than Google Translate for historical texts)
                        </p>
                        <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto mb-4">
                          <pre className="text-xs"><code>{`Prompt:

Please translate this [LANGUAGE] historical document into English. Follow these guidelines:

1. Provide a literal translation that preserves the original's meaning and tone
2. After the translation, provide a "Notes" section explaining:
   - Archaic terms or idioms that don't translate directly
   - Historical context needed to understand references
   - Ambiguities in the original text
3. Mark uncertain translations with [?]
4. Preserve the document's structure and formatting

Context: This is a [TYPE OF DOCUMENT] from [DATE/PERIOD]

[Paste original text or upload image]`}</code></pre>
                        </div>
                        <p className="text-sm mb-3">
                          <strong>Sample Output:</strong>
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md text-xs">
                          <p className="mb-2"><strong>Translation:</strong></p>
                          <p className="mb-4">
                            To the Most Illustrious Council of the City:<br/><br/>
                            We the undersigned petition your wisdom concerning the matter of the grain levy, which has pressed heavily upon the common people this winter past...
                          </p>
                          <p className="mb-2"><strong>Notes:</strong></p>
                          <ul className="text-xs space-y-1 pl-4 list-disc">
                            <li>"Most Illustrious" (Illustrissimo) - formal honorific for city councils in 17th-century Italy</li>
                            <li>"grain levy" - refers to forced contributions during times of shortage, context: 1648 grain crisis</li>
                            <li>"common people" - literally "popolo minuto," term specifically for urban working poor</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
                          Pro Tip: Batch Processing
                        </h4>
                        <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
                          For large transcription projects (50+ documents), use Claude's API or ChatGPT API with scripting to automate the process. You can transcribe hundreds of pages overnight. Always spot-check outputs for accuracy—AI still makes mistakes, especially with damaged documents or unusual handwriting.
                        </p>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="workflows">Practical Workflows for Historians</HeadingAnchor>

                  <p>
                    Here are tested workflows combining multiple tools for common historical research tasks.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Workflow 1: Archival Research Project</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-4">Scenario: You have 200 handwritten letters from a 19th-century correspondence</h4>
                    <ol className="text-sm space-y-3 mb-0 pl-5">
                      <li>
                        <strong>Transcription (Week 1):</strong>
                        <ul className="mt-2 space-y-1 pl-4 list-disc">
                          <li>Photograph all letters (consistent lighting, high resolution)</li>
                          <li>Use Claude API to transcribe all letters with consistent prompting</li>
                          <li>Spot-check every 10th transcription for accuracy</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Organization (Week 2):</strong>
                        <ul className="mt-2 space-y-1 pl-4 list-disc">
                          <li>Upload transcriptions to NotebookLM</li>
                          <li>Create metadata file (date, sender, recipient, location)</li>
                          <li>Ask NotebookLM for chronological overview and major themes</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Analysis (Weeks 3-4):</strong>
                        <ul className="mt-2 space-y-1 pl-4 list-disc">
                          <li>Use NotebookLM to identify patterns: "How do references to slavery change over time?"</li>
                          <li>Extract all mentions of specific topics with citations</li>
                          <li>Create thematic groupings based on AI suggestions, verify manually</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Literature Review (Week 5):</strong>
                        <ul className="mt-2 space-y-1 pl-4 list-disc">
                          <li>Use Elicit/Consensus to find scholarship on similar correspondences</li>
                          <li>Upload key articles to NotebookLM alongside your sources</li>
                          <li>Ask: "How does my correspondence compare to other studies of [topic]?"</li>
                        </ul>
                      </li>
                    </ol>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Workflow 2: Dissertation Literature Review</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-4">Scenario: Mapping 50 years of scholarship on a topic</h4>
                    <ol className="text-sm space-y-3 mb-0 pl-5">
                      <li>
                        <strong>Initial Search:</strong> Use Perplexity to get oriented—"What are the major debates in the historiography of [topic]?"
                      </li>
                      <li>
                        <strong>Systematic Search:</strong> Use Elicit to find all relevant papers from major journals, extract key findings into a table
                      </li>
                      <li>
                        <strong>Close Reading:</strong> Download 30-40 most important articles, upload to NotebookLM
                      </li>
                      <li>
                        <strong>Analysis:</strong> Ask NotebookLM to map schools of thought, identify key disagreements, note methodological shifts over time
                      </li>
                      <li>
                        <strong>Writing:</strong> Use NotebookLM to draft literature review sections, always verifying claims against cited sources
                      </li>
                    </ol>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Workflow 3: Comparative Analysis Across Languages</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-4">Scenario: Comparing French and German sources on WWI</h4>
                    <ol className="text-sm space-y-3 mb-0 pl-5">
                      <li>
                        <strong>Translation:</strong> Use Claude to translate non-English sources with historical context preserved
                      </li>
                      <li>
                        <strong>Upload to NotebookLM:</strong> Include both original and translated versions when possible
                      </li>
                      <li>
                        <strong>Comparative Questions:</strong> "How do French sources describe the Battle of Verdun compared to German sources?" "What terms do each use for the enemy?"
                      </li>
                      <li>
                        <strong>Verification:</strong> Check AI translations against critical passages manually if you read the languages
                      </li>
                    </ol>
                  </div>

                  <HeadingAnchor id="prompts">Prompt Library for Historians</HeadingAnchor>

                  <p>
                    Here are tested prompts for common research tasks. Adapt these to your specific needs.
                  </p>

                  <div className="my-8 space-y-6">
                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">Identifying Bias in Primary Sources</h4>
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
                        <pre className="text-xs"><code>{`Analyze this primary source for bias and perspective. Consider:

1. Who authored this? What was their social position, interests, and potential motivations?
2. Who was the intended audience? How might that shape the content?
3. What information is emphasized? What is minimized or omitted?
4. What assumptions or values are implicit in the text?
5. How might a different observer (different class, gender, ethnicity) have described the same events?

Cite specific passages to support your analysis.

[Paste source text]`}</code></pre>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">Extracting Structured Data</h4>
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
                        <pre className="text-xs"><code>{`Extract the following information from this document and format as a table:

- Date (if mentioned)
- People mentioned (with roles/relationships)
- Locations mentioned
- Key events or actions described
- Economic transactions (amounts, goods, services)
- Any dates mentioned for future events

Format as CSV for easy import into spreadsheet.

[Paste document text]`}</code></pre>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">Mapping Historiographical Debates</h4>
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
                        <pre className="text-xs"><code>{`I've uploaded multiple scholarly articles on [topic]. Please:

1. Identify the 3-4 major interpretive schools or approaches
2. For each school, list key scholars and their main arguments (with citations to the uploaded articles)
3. Note where scholars explicitly disagree or critique each other
4. Identify any methodological shifts over time (e.g., cultural turn, quantitative methods)
5. Highlight gaps or questions that multiple scholars identify as needing further research

Present as a structured overview I can use for a literature review.`}</code></pre>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">Contextualizing Unfamiliar Terms</h4>
                      <div className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto">
                        <pre className="text-xs"><code>{`This historical document uses several terms I'm unfamiliar with: [list terms]

For each term, please:
1. Define it in the historical context of [time period/place]
2. Explain how it was used differently than modern usage (if applicable)
3. Note any social/cultural connotations it would have had
4. Cite where in the document it appears

[Paste document excerpt]`}</code></pre>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="limitations">Limitations & Ethical Considerations</HeadingAnchor>

                  <p>
                    AI tools for historical research have significant limitations that historians must understand and account for.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Known Limitations</h3>

                  <div className="my-6 space-y-4">
                    <div className="p-5 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3 text-orange-900 dark:text-orange-100">
                        1. Hallucinations and Fabrications
                      </h4>
                      <p className="text-sm text-orange-900/80 dark:text-orange-100/80 mb-0">
                        LLMs sometimes confidently state "facts" that are false. This is especially dangerous with historical questions, where AI might invent plausible-sounding but nonexistent sources, dates, or events. <strong>Always verify factual claims.</strong> NotebookLM reduces this risk by working only with your sources, but even then, check citations.
                      </p>
                    </div>

                    <div className="p-5 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3 text-orange-900 dark:text-orange-100">
                        2. Bias Amplification
                      </h4>
                      <p className="text-sm text-orange-900/80 dark:text-orange-100/80 mb-0">
                        AI models trained on historical texts may reproduce historical biases—racism, sexism, colonialism—embedded in those texts. Be especially careful when analyzing sources about marginalized groups. AI might perpetuate rather than critique oppressive perspectives.
                      </p>
                    </div>

                    <div className="p-5 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3 text-orange-900 dark:text-orange-100">
                        3. OCR Accuracy Varies Wildly
                      </h4>
                      <p className="text-sm text-orange-900/80 dark:text-orange-100/80 mb-0">
                        While Claude 3.5 approaches 100% accuracy on clear handwriting, performance drops significantly with damaged documents, unusual scripts, or poor image quality. Always spot-check transcriptions. For critical passages, verify against the original.
                      </p>
                    </div>

                    <div className="p-5 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3 text-orange-900 dark:text-orange-100">
                        4. Context Collapse
                      </h4>
                      <p className="text-sm text-orange-900/80 dark:text-orange-100/80 mb-0">
                        AI may miss subtle contextual cues that change a passage's meaning—irony, coded language, period-specific connotations. The interpretive work of historical reading remains human. Use AI to augment your reading, not replace close attention to sources.
                      </p>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Ethical Guidelines</h3>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <ol className="text-sm space-y-3 mb-0 pl-5">
                      <li><strong>Transparency:</strong> Disclose when AI tools assisted your research in acknowledgments or methods sections</li>
                      <li><strong>Verification:</strong> Never cite AI-generated information without checking original sources</li>
                      <li><strong>Human judgment:</strong> Use AI for mechanical tasks (transcription, translation, literature searching), not interpretive work</li>
                      <li><strong>Privacy:</strong> Don't upload unpublished archival materials or documents with privacy restrictions to commercial AI services</li>
                      <li><strong>Attribution:</strong> If AI transcription/translation was substantial, acknowledge it in your work</li>
                      <li><strong>Accessibility:</strong> Consider making AI-generated transcriptions available to other researchers when appropriate</li>
                    </ol>
                  </div>

                  <HeadingAnchor id="future">The Future: What's Coming</HeadingAnchor>

                  <p>
                    Based on 2024 developments, here's what historians can expect in the next 1-2 years:
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Emerging Tools & Capabilities</h3>

                  <ul>
                    <li><strong>Multimodal search:</strong> Tools that can search across text, images, maps, and charts simultaneously</li>
                    <li><strong>Domain-specific models:</strong> More tools like Churro trained specifically on historical materials from particular periods/languages</li>
                    <li><strong>Improved handwriting recognition:</strong> Continued advances in reading cursive, damaged documents, and unusual scripts</li>
                    <li><strong>Knowledge graphs:</strong> Tools that automatically build networks of people, places, and events from historical sources</li>
                    <li><strong>Collaborative research platforms:</strong> Shared AI notebooks where multiple historians can work together on source analysis</li>
                  </ul>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">What Won't Change</h3>

                  <p>
                    No matter how sophisticated AI becomes, certain aspects of historical scholarship remain irreducibly human:
                  </p>

                  <ul>
                    <li><strong>Asking good questions:</strong> AI can help answer questions, but historians must formulate the questions worth asking</li>
                    <li><strong>Historical imagination:</strong> Understanding what it was like to live in a different time requires empathy and contextual knowledge AI lacks</li>
                    <li><strong>Ethical judgment:</strong> Decisions about which stories to tell, whose perspectives to center, and how to represent the past involve values AI cannot adjudicate</li>
                    <li><strong>Archival discovery:</strong> Finding unexpected connections, recognizing significance in overlooked sources—serendipity and intuition remain human strengths</li>
                  </ul>

                  <div className="my-12 p-6 bg-muted rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Final Thoughts</h3>
                    <p className="mb-3">
                      AI tools are reshaping historical research, making previously impractical projects feasible and accelerating time-consuming tasks. But they work best as assistants, not replacements. The historians who will benefit most are those who learn these tools' strengths and limits, integrate them thoughtfully into workflows, and maintain the critical, interpretive work that defines historical scholarship.
                    </p>
                    <p className="mb-0">
                      Think of AI as a research assistant who can read quickly, spot patterns, and handle tedious tasks—but who needs constant supervision and whose insights always require verification. Used this way, AI can genuinely enhance historical research without diminishing its essential humanity.
                    </p>
                  </div>

                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Related Guides</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href="/guides/prompt-engineering" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <h4 className="font-semibold mb-1 text-sm">Prompt Engineering for Humanities</h4>
                        <p className="text-xs text-muted-foreground">Advanced prompting techniques for better AI outputs</p>
                      </Link>
                      <Link href="/guides/claude-code-basics" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <h4 className="font-semibold mb-1 text-sm">Getting Started with Claude Code</h4>
                        <p className="text-xs text-muted-foreground">Build custom AI tools for your research</p>
                      </Link>
                      <Link href="/resources" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <h4 className="font-semibold mb-1 text-sm">Historical Resources</h4>
                        <p className="text-xs text-muted-foreground">Primary sources and scholarly materials</p>
                      </Link>
                      <Link href="/guides/responsible-ai-classroom" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <h4 className="font-semibold mb-1 text-sm">Responsible AI Use</h4>
                        <p className="text-xs text-muted-foreground">Ethical frameworks and best practices</p>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong>Guide last updated:</strong> November 2025
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This guide synthesizes research from Google NotebookLM documentation, the 2024 Churro project on historical text recognition, current academic tools (Elicit, Consensus, Perplexity), and practical testing by historians. Tools and capabilities evolve rapidly—check tool websites for latest features. Feedback welcome at{' '}
                      <a href="mailto:bbreen@ucsc.edu" className="text-primary hover:underline">
                        bbreen@ucsc.edu
                      </a>
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
