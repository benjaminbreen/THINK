import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, Layers, TrendingUp, AlertCircle, Lightbulb, Edit3 } from 'lucide-react'

export default function PromptEngineeringGuide() {
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
              <Badge variant="outline">Beginner Friendly</Badge>
              <Badge variant="outline">Technical</Badge>
              <Badge variant="outline">Skills</Badge>
            </div>

            <h1 className="text-4xl font-serif font-bold mb-4">
              Prompt Engineering for Humanities
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Techniques for writing effective prompts that produce historically accurate, nuanced, and pedagogically useful AI outputs
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6" /> What Makes a Good Humanities Prompt?
              </h2>
              <p>
                Prompt engineering is the art of communicating with AI to get the results you want. For humanities
                applications, good prompts are:
              </p>
              <ul>
                <li><strong>Specific:</strong> Define exactly what you want, not vague requests</li>
                <li><strong>Contextual:</strong> Provide historical and disciplinary context</li>
                <li><strong>Constrained:</strong> Set boundaries to prevent anachronism and inaccuracy</li>
                <li><strong>Verifiable:</strong> Structure outputs so they can be fact-checked</li>
              </ul>

              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg my-6">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" /> Core Principle
                </p>
                <p className="text-sm">
                  Generic prompts produce generic results. The more specific and contextual your prompt, the more useful
                  the output. Think of prompts as assignment instructions for a very capable but literal-minded research assistant.
                </p>
              </div>

              <h2 className="flex items-center gap-2">
                <Layers className="h-6 w-6" /> The Anatomy of an Effective Prompt
              </h2>

              <p>Strong humanities prompts typically include these elements:</p>

              <h3>1. Role and Context</h3>
              <p>Tell the AI what perspective to take and what it's working on:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                <strong>Good:</strong> "You are a historian specializing in 19th-century American women's history.
                I'm researching the Seneca Falls Convention of 1848."
                <br/><br/>
                <strong>Better:</strong> "You are acting as a research assistant helping me analyze primary sources
                from the 1848 Seneca Falls Convention. Your responses should prioritize historical accuracy over
                comprehensive coverage, and cite specific sources when making factual claims."
              </blockquote>

              <h3>2. Task Description</h3>
              <p>Clearly state what you want the AI to do:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                <strong>Vague:</strong> "Tell me about this letter."
                <br/><br/>
                <strong>Specific:</strong> "Analyze this 1848 letter from Elizabeth Cady Stanton to identify:
                (1) her main arguments for women's suffrage, (2) what concerns or anxieties she expresses,
                (3) how she frames the issue rhetorically, and (4) any references to other reform movements."
              </blockquote>

              <h3>3. Constraints and Boundaries</h3>
              <p>Prevent common AI pitfalls by being explicit about limitations:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "When analyzing this document:
                <br/>
                - Only reference information that would have been available in 1848
                <br/>
                - Do not use modern terminology or concepts anachronistically
                <br/>
                - If you're uncertain about a historical fact, say so explicitly
                <br/>
                - Cite the specific passage from the letter for each claim you make"
              </blockquote>

              <h3>4. Output Format</h3>
              <p>Specify how you want the response structured:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "Provide your analysis in this format:
                <br/><br/>
                <strong>Summary:</strong> 2-3 sentence overview
                <br/>
                <strong>Key Arguments:</strong> Bulleted list with direct quotes
                <br/>
                <strong>Historical Context:</strong> One paragraph placing this in broader historical context
                <br/>
                <strong>Questions for Further Research:</strong> 3-5 questions this source raises"
              </blockquote>

              <h3>5. Examples (When Helpful)</h3>
              <p>For complex tasks, show the AI what you want:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "Analyze each document using this approach. For example, for a letter about abolition, you might note:
                <br/><br/>
                <strong>Argument:</strong> 'The author argues slavery is morally wrong based on Christian principles,
                citing Matthew 7:12.'
                <br/>
                <strong>Rhetoric:</strong> 'Uses religious language to appeal to Christian readers.'
                <br/>
                <strong>Context:</strong> 'Written during the Second Great Awakening when religious reform movements
                were influential.'"
              </blockquote>

              <h2>Prompt Patterns for Common Humanities Tasks</h2>

              <h3>Pattern 1: Primary Source Analysis</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm">
                <code>{`I'm analyzing a [TYPE] from [YEAR] written by [AUTHOR].

Context: [Brief historical context]

Please analyze this source for:
1. [Specific analytical lens 1]
2. [Specific analytical lens 2]
3. [Specific analytical lens 3]

Important constraints:
- Cite specific passages to support each point
- Note any assumptions or uncertainties
- Avoid interpreting through modern values

Here is the source:
[FULL TEXT OF SOURCE]`}</code>
              </pre>

              <h3>Pattern 2: Historical Comparison</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm">
                <code>{`Compare how [EVENT/TOPIC] is portrayed in these [NUMBER] sources
from [TIME PERIOD]:

Source 1: [Description and text]
Source 2: [Description and text]
Source 3: [Description and text]

For each source, identify:
- Main claims or arguments
- Evidence and examples used
- Intended audience (based on language and publication context)
- Notable omissions or silences

Then analyze:
- Where do sources agree?
- Where do they contradict?
- What do these differences reveal about [historical question]?`}</code>
              </pre>

              <h3>Pattern 3: Building Historical Simulations</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm">
                <code>{`I want to create a simulation where students converse with [HISTORICAL FIGURE]
in [SPECIFIC TIME/PLACE].

Background:
- [Key biographical facts for this period]
- [What they know vs. don't know yet]
- [Their current concerns and projects]

Primary sources to draw from:
- [List 3-5 key sources]

When responding as [FIGURE]:
- Use period-appropriate language and concepts
- Show their personality: [key traits]
- Express period-typical biases: [specific examples]
- Reference real events/people from their life
- If students ask about the future, respond as someone who doesn't know
- Occasionally ask students questions to encourage deeper thinking

Test by roleplaying this scenario: [specific scenario]`}</code>
              </pre>

              <h3>Pattern 4: Thematic Coding</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm">
                <code>{`I'm conducting thematic analysis on [NUMBER] [TYPE OF SOURCES] from [TIME PERIOD]
to understand [RESEARCH QUESTION].

For each source, code for the following themes:
1. [Theme 1]: [Definition]
2. [Theme 2]: [Definition]
3. [Theme 3]: [Definition]

For each identified theme, note:
- Direct quotation demonstrating the theme
- Page/location reference
- Confidence level (HIGH/MEDIUM/LOW)

Also flag:
- Unusual or contradictory passages
- Terms or concepts that seem important but don't fit existing themes

Here is source 1:
[TEXT]`}</code>
              </pre>

              <h2 className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" /> Advanced Techniques
              </h2>

              <h3>Chain-of-Thought Prompting</h3>
              <p>
                For complex analytical tasks, ask AI to "show its work" by thinking step-by-step:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "Before providing your final analysis, work through this step-by-step:
                <br/><br/>
                1. First, identify the document type, date, author, and audience
                <br/>
                2. Then, list the main factual claims the author makes
                <br/>
                3. Next, analyze the rhetorical strategies used
                <br/>
                4. Consider what historical context is necessary to understand this document
                <br/>
                5. Finally, synthesize your observations into an interpretation
                <br/><br/>
                Show your reasoning at each step before giving your final answer."
              </blockquote>

              <h3>Few-Shot Learning</h3>
              <p>
                Provide 2-3 examples of the kind of analysis you want, then ask AI to apply the same approach:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "Analyze each letter using this approach. Here are two examples:
                <br/><br/>
                <strong>Letter 1 (1842):</strong> Author expresses optimism about westward expansion, using metaphors
                of 'manifest destiny' and 'providential design.' Reveals assumption that Indigenous peoples will
                'naturally' give way to 'civilization.' Context: Written before Mexican-American War, during period
                of territorial expansionism.
                <br/><br/>
                <strong>Letter 2 (1857):</strong> Author expresses moral conflict about slavery despite economic
                dependence on cotton trade. Uses passive voice to avoid agency ('slaves are held' not 'I hold slaves').
                Reveals cognitive dissonance common among Northern merchants with Southern business ties.
                <br/><br/>
                Now apply this same analytical approach to these 10 additional letters: [...]"
              </blockquote>

              <h3>Iterative Refinement</h3>
              <p>
                Don't expect perfect results from your first prompt. Refine based on outputs:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                <strong>Initial prompt:</strong> "Analyze this Civil War diary for mentions of slavery."
                <br/><br/>
                <strong>After seeing output:</strong> "Your analysis was good but too focused on explicit mentions.
                Please re-analyze looking for both (1) direct references to slavery or enslaved people AND
                (2) indirect references like 'servants,' 'the institution,' 'our peculiar situation,' or discussions
                of labor and property that might imply slavery without naming it."
              </blockquote>

              <h3>Prompt Chaining</h3>
              <p>
                Break complex tasks into sequential prompts:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm">
                <code>{`Prompt 1: "Extract all dates and events from this ship's log."
Prompt 2: "Using the timeline from above, identify any unusual gaps or patterns."
Prompt 3: "For each gap you identified, what might explain it based on
           historical context of 18th-century Atlantic shipping?"
Prompt 4: "Generate 3 research questions based on the patterns we've found."`}</code>
              </pre>

              <h2 className="flex items-center gap-2">
                <Edit3 className="h-6 w-6" /> Testing and Iteration
              </h2>

              <h3>The Prompt Testing Workflow</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm">
                <code>{`1. Write initial prompt based on task requirements
2. Test on 2-3 example sources where you know the "right" answer
3. Evaluate outputs:
   - Are they historically accurate?
   - Do they match your analytical approach?
   - Are they appropriately nuanced?
   - Can they be verified?
4. Identify systematic problems (e.g., always uses modern terminology)
5. Revise prompt to address specific issues
6. Re-test on same examples to confirm improvement
7. Test on new examples to check generalization
8. Document final prompt with notes on what works/doesn't work`}</code>
              </pre>

              <h3>What to Look For When Testing</h3>
              <ul>
                <li><strong>Accuracy:</strong> Compare AI claims to known facts and sources</li>
                <li><strong>Consistency:</strong> Does it handle similar sources similarly?</li>
                <li><strong>Anachronism:</strong> Does it avoid modern concepts and language?</li>
                <li><strong>Nuance:</strong> Does it acknowledge complexity and uncertainty?</li>
                <li><strong>Citation:</strong> Can you trace claims back to source material?</li>
              </ul>

              <h2 className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6" /> Common Pitfalls
              </h2>

              <h3>Pitfall 1: The Vague Prompt</h3>
              <div className="bg-muted p-4 rounded-lg my-6">
                <p className="font-semibold mb-2 text-red-600 dark:text-red-400">Bad:</p>
                <p className="text-sm mb-3 italic">"Tell me about the French Revolution."</p>

                <p className="font-semibold mb-2 text-green-600 dark:text-green-400">Good:</p>
                <p className="text-sm italic">
                  "Analyze this letter from a Parisian shopkeeper written in June 1789. Identify: (1) what specific
                  grievances the author expresses, (2) what political changes they hope for, (3) how they describe
                  the social tensions in Paris, and (4) cite the specific passages where you find this information."
                </p>
              </div>

              <h3>Pitfall 2: Assuming AI Has Context</h3>
              <div className="bg-muted p-4 rounded-lg my-6">
                <p className="font-semibold mb-2 text-red-600 dark:text-red-400">Bad:</p>
                <p className="text-sm mb-3 italic">"What does this mean?" [pastes archaic text]</p>

                <p className="font-semibold mb-2 text-green-600 dark:text-green-400">Good:</p>
                <p className="text-sm italic">
                  "This is a passage from a 17th-century English court document using legal terminology. Please:
                  (1) translate it into modern English, (2) explain any legal terms in brackets, (3) note what
                  historical context is needed to understand it. The document concerns land disputes in colonial Virginia."
                </p>
              </div>

              <h3>Pitfall 3: Over-Prompting</h3>
              <p>
                <strong>Problem:</strong> Prompts so long and complex that AI gets confused or loses track.
              </p>
              <p>
                <strong>Solution:</strong> Break massive prompts into smaller, sequential tasks. If your prompt is over
                500 words, consider splitting it.
              </p>

              <h3>Pitfall 4: Not Requesting Citations</h3>
              <div className="bg-muted p-4 rounded-lg my-6">
                <p className="font-semibold mb-2 text-red-600 dark:text-red-400">Bad:</p>
                <p className="text-sm mb-3 italic">"What were the main causes of the Civil War?"</p>

                <p className="font-semibold mb-2 text-green-600 dark:text-green-400">Good:</p>
                <p className="text-sm italic">
                  "Based solely on these three primary sources I'm providing [list sources], what causes of the Civil
                  War do these authors mention? For each cause, quote the specific passage where it appears and note
                  which source it's from."
                </p>
              </div>

              <h3>Pitfall 5: Ignoring Edge Cases</h3>
              <p>
                <strong>Problem:</strong> Prompt works for typical cases but fails on unusual ones.
              </p>
              <p>
                <strong>Solution:</strong> Test your prompt on edge cases: damaged documents, unusual perspectives,
                contradictory sources. Add handling instructions:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "If the document is damaged or illegible in places, mark those sections with [ILLEGIBLE] rather than
                guessing. If the author's position is unclear or contradictory, note that explicitly rather than
                forcing an interpretation."
              </blockquote>

              <h2>Real-World Examples</h2>

              <div className="grid gap-4 my-8">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    <Link href="/projects/young-darwin" className="text-primary hover:underline">
                      Young Darwin Simulation →
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    See the system prompt that creates a historically accurate Darwin who only knows what he knew in 1835,
                    uses period vocabulary, and cites real specimens and observations from his voyage.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    <Link href="/projects/historylens" className="text-primary hover:underline">
                      HistoryLens Prompts →
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Examples of prompts for generating interpretive frameworks, analyzing primary sources, and testing
                    historical hypotheses against evidence.
                  </p>
                </div>
              </div>

              <h2>Prompt Templates Library</h2>

              <h3>Template: Historical Figure Simulation</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm">
                <code>{`You are roleplaying as [NAME] in [LOCATION] during [SPECIFIC TIME PERIOD].

WHAT YOU KNOW:
- [List key knowledge/experiences they would have at this point]
- [Recent events in their life]

WHAT YOU DON'T KNOW:
- [Events after this date]
- [Modern concepts that didn't exist yet]

YOUR PERSONALITY AND VIEWS:
- [Key character traits with examples]
- [Their positions on important issues of the time]
- [Period-typical biases or blind spots]

PRIMARY SOURCES TO DRAW FROM:
1. [Source 1 with citation]
2. [Source 2 with citation]
3. [Source 3 with citation]

CONVERSATION GUIDELINES:
- Speak conversationally, as you would in a letter to an educated peer
- Reference real people, places, and events from your life
- Use period-appropriate vocabulary (avoid: [modern terms])
- Occasionally ask the student questions to prompt deeper thinking
- If asked about the future, respond with curiosity or uncertainty
- Cite your sources when making factual claims [e.g., "As I noted in my letter to..."]

Begin the conversation by introducing yourself and asking what the student wishes to discuss.`}</code>
              </pre>

              <h3>Template: Source Analysis</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 text-sm">
                <code>{`Analyze this [TYPE OF SOURCE] from [DATE] as a professional historian would.

SOURCE CONTEXT:
- Author: [NAME/DESCRIPTION]
- Audience: [WHO WAS THIS FOR]
- Purpose: [WHY WAS THIS WRITTEN]
- Historical moment: [WHAT WAS HAPPENING]

ANALYTICAL FRAMEWORK:
1. CONTENT: What factual information does this source provide?
2. RHETORIC: What persuasive strategies does the author use?
3. SILENCES: What is notably absent or unmentioned?
4. BIAS: What assumptions or perspective does the author have?
5. SIGNIFICANCE: Why does this source matter for understanding [TOPIC]?

FORMAT YOUR RESPONSE:
- Use specific quotes with line/page numbers
- Distinguish between what the source explicitly states vs. what you infer
- Note any uncertainty or ambiguity
- Avoid presentism and anachronistic interpretation

SOURCE TEXT:
[PASTE SOURCE HERE]`}</code>
              </pre>

              <h2>Next Steps</h2>

              <div className="bg-muted p-6 rounded-lg space-y-4 not-prose my-8">
                <h3 className="text-lg font-semibold mb-3">Continue Learning</h3>
                <div className="space-y-2">
                  <Link href="/guides/building-simulations" className="block text-primary hover:underline">
                    → Building Historical Simulations
                  </Link>
                  <Link href="/guides/research-workflows" className="block text-primary hover:underline">
                    → AI for Research Workflows
                  </Link>
                  <Link href="/guides/claude-code-basics" className="block text-primary hover:underline">
                    → Getting Started with Claude Code
                  </Link>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Share Your Prompts</h3>
                <p className="mb-4">
                  Developed prompts that work particularly well for humanities tasks? We're building a community
                  library of tested prompts. Your contributions help other educators avoid reinventing the wheel.
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href="mailto:bbreen@ucsc.edu">Share your prompts</a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
