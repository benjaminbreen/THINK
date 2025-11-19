import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Users, BookOpen, AlertCircle } from 'lucide-react'

export default function BuildingSimulationsGuide() {
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
            </div>

            <h1 className="text-4xl font-serif font-bold mb-4">
              Building Historical Simulations
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Step-by-step guide to creating AI-powered historical simulations that engage students with the past
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="flex items-center gap-2">
                <Sparkles className="h-6 w-6" /> What Makes a Good Historical Simulation?
              </h2>
              <p>
                The best historical simulations balance historical accuracy with pedagogical goals. They're not just
                chatbots—they're carefully designed learning experiences that help students:
              </p>
              <ul>
                <li>Engage with primary sources and historical evidence</li>
                <li>Understand historical context and contingency</li>
                <li>Develop empathy for past perspectives while maintaining critical distance</li>
                <li>Practice historical thinking skills</li>
              </ul>

              <h2>Core Design Principles</h2>

              <h3>1. Ground Everything in Historical Evidence</h3>
              <p>
                Your simulation should be built on actual historical sources. This means:
              </p>
              <ul>
                <li>Using real letters, diaries, newspaper articles, official documents</li>
                <li>Citing specific sources when the AI makes factual claims</li>
                <li>Being transparent about what is known vs. plausible extrapolation</li>
                <li>Avoiding anachronistic language and concepts</li>
              </ul>

              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg my-6">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" /> Example: Young Darwin
                </p>
                <p className="text-sm">
                  The Young Darwin simulation only responds with information Darwin would have known in 1835.
                  When students ask about evolution, it responds based on his early notebooks and Galápagos
                  observations, not the later <em>Origin of Species</em>.
                </p>
              </div>

              <h3>2. Define Clear Learning Objectives</h3>
              <p>
                Before building, ask yourself:
              </p>
              <ul>
                <li>What specific historical thinking skill are students practicing?</li>
                <li>What common misconceptions does this address?</li>
                <li>How will students demonstrate their learning?</li>
              </ul>

              <h3>3. Build in Friction and Complexity</h3>
              <p>
                Don't make simulations too easy or too modern-feeling. Historical figures should:
              </p>
              <ul>
                <li>Have biases and blind spots of their era</li>
                <li>Use period-appropriate vocabulary and concepts</li>
                <li>Sometimes misunderstand or disagree with student questions</li>
                <li>Reflect the social hierarchies and power dynamics of their time</li>
              </ul>

              <h2>Step-by-Step: Building Your First Simulation</h2>

              <h3>Phase 1: Research and Planning (2-3 hours)</h3>

              <h4>Choose Your Subject</h4>
              <p>Start with a figure or scenario where you have:</p>
              <ul>
                <li>Rich primary source material (letters, diaries, speeches)</li>
                <li>Clear pedagogical value</li>
                <li>A specific historical moment or question to explore</li>
              </ul>

              <h4>Gather Your Sources</h4>
              <p>Collect:</p>
              <ul>
                <li>5-10 key primary sources (letters, diary entries, etc.)</li>
                <li>2-3 reliable secondary sources for context</li>
                <li>Biographical information for the specific time period</li>
              </ul>

              <h4>Define Boundaries</h4>
              <p>Write down:</p>
              <ul>
                <li>What time period exactly (e.g., "1776-1777" not just "Revolutionary War")</li>
                <li>What the figure knows vs. doesn't know yet</li>
                <li>What topics are in/out of scope</li>
                <li>What the assignment asks students to do</li>
              </ul>

              <h3>Phase 2: Prototype with Claude Code (1-2 hours)</h3>

              <p>Start a new project and give Claude detailed context:</p>

              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "I want to create a historical simulation where students can converse with Elizabeth Cady Stanton
                in July 1848, just before the Seneca Falls Convention. She should be:
                <br/><br/>
                - Historically accurate based on her letters and speeches from this period
                <br/>
                - Uncertain about how the convention will go
                <br/>
                - Passionate but also anxious about public reaction
                <br/>
                - Willing to discuss her ideas but also ask students questions
                <br/><br/>
                Include citations to real sources when possible. The conversation should help students understand
                the historical context and arguments of early women's rights activism."
              </blockquote>

              <h4>Refine the Personality</h4>
              <p>Test your prototype and refine:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "She sounds too formal. Use more of the conversational tone from her personal letters. Also,
                she should sometimes reference her family and daily life, not just abstract political theory."
              </blockquote>

              <h4>Add Guard Rails</h4>
              <p>Make sure the simulation handles edge cases:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "If students ask about events after 1848, she should politely note that she can't speak to
                the future. If they use modern terminology, she should ask for clarification in period-appropriate
                ways."
              </blockquote>

              <h3>Phase 3: Create the Assignment Scaffolding (30-60 minutes)</h3>

              <p>Students need structure. Add:</p>
              <ul>
                <li><strong>Introduction:</strong> Brief context about who they're talking to and why</li>
                <li><strong>Guiding questions:</strong> 3-5 starter questions to get them thinking</li>
                <li><strong>Learning goals:</strong> What should they learn from this conversation?</li>
                <li><strong>Deliverable:</strong> What do they submit? (transcript + reflection? key quotes? analytical essay?)</li>
              </ul>

              <h4>Example Assignment Structure</h4>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                <code>{`ASSIGNMENT: Conversation with Elizabeth Cady Stanton (1848)

Background: You will converse with Elizabeth Cady Stanton in July 1848,
just before the first women's rights convention in Seneca Falls.

Your Task:
1. Have a 15-20 minute conversation (aim for 10-15 exchanges)
2. Ask at least 3 questions about her motivations and goals
3. Explore how she thinks about her historical moment
4. Save your full transcript

Deliverable:
- Full conversation transcript
- 2-page reflection analyzing:
  a) What surprised you about her perspective?
  b) How does she understand women's rights differently than we do today?
  c) What historical evidence do you see in her responses?

Starter Questions:
- What inspired you to organize this convention?
- What do you hope to accomplish?
- How do you think people will react?`}</code>
              </pre>

              <h3>Phase 4: Test with Students (pilot with 3-5 students)</h3>

              <p>Before rolling out to a full class:</p>
              <ul>
                <li>Have a few students test the simulation</li>
                <li>Ask: What was confusing? What worked well? What felt inauthentic?</li>
                <li>Review their transcripts—are they engaging with the material meaningfully?</li>
                <li>Refine based on feedback</li>
              </ul>

              <h2>Advanced Techniques</h2>

              <h3>Multi-Character Simulations</h3>
              <p>
                Create simulations where students interact with multiple historical figures with different
                perspectives. Example: Debate between Thomas Jefferson and Alexander Hamilton over the National Bank.
              </p>

              <h3>Scenario-Based Simulations</h3>
              <p>
                Instead of a single character, create a historical scenario where students make decisions:
              </p>
              <ul>
                <li>"You are a colonial merchant in 1765 reacting to the Stamp Act"</li>
                <li>"You are a delegate to the Constitutional Convention voting on compromises"</li>
                <li>"You run an 18th-century apothecary shop" (see our Apothecary Simulator)</li>
              </ul>

              <h3>Source Analysis Integration</h3>
              <p>
                Have the AI present primary sources during conversation and ask students to analyze them:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "Here is a passage from my Declaration of Sentiments. What do you make of this language?
                Why do you think I chose to model it on the Declaration of Independence?"
              </blockquote>

              <h2 className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6" /> Common Pitfalls
              </h2>

              <h3>Pitfall #1: The Omniscient Historical Figure</h3>
              <p>
                <strong>Problem:</strong> Your simulation knows too much about the future or speaks with modern sensibilities.
              </p>
              <p>
                <strong>Solution:</strong> Be very specific about temporal boundaries. Remind Claude: "This is July 1848.
                She knows nothing about events after this date."
              </p>

              <h3>Pitfall #2: The Wikipedia Article</h3>
              <p>
                <strong>Problem:</strong> The AI just recites facts instead of having a real conversation.
              </p>
              <p>
                <strong>Solution:</strong> Emphasize personality, emotion, and dialogue. Add: "She should speak conversationally,
                ask students questions, express doubt and excitement, and relate ideas to her personal experience."
              </p>

              <h3>Pitfall #3: Surface-Level Engagement</h3>
              <p>
                <strong>Problem:</strong> Students treat it like a Q&A game instead of deep historical inquiry.
              </p>
              <p>
                <strong>Solution:</strong> Design your assignment to require synthesis and analysis, not just fact-gathering.
                Require a reflective component.
              </p>

              <h3>Pitfall #4: No Citations</h3>
              <p>
                <strong>Problem:</strong> Students can't verify historical accuracy.
              </p>
              <p>
                <strong>Solution:</strong> Ask Claude to cite sources: "When making factual claims, cite the specific letter,
                speech, or document you're drawing from."
              </p>

              <h2>Assessment Strategies</h2>

              <h3>What to Look For in Student Work</h3>
              <ul>
                <li><strong>Depth of questions:</strong> Are they asking historical thinking questions or just trivia?</li>
                <li><strong>Use of evidence:</strong> Do they reference specific things the figure said?</li>
                <li><strong>Critical analysis:</strong> Do they note anachronisms, biases, or tensions in the responses?</li>
                <li><strong>Synthesis:</strong> Can they connect the conversation to course themes and other sources?</li>
              </ul>

              <h3>Sample Rubric Categories</h3>
              <ul>
                <li>Quality and depth of historical questions asked</li>
                <li>Evidence of preparation and contextual knowledge</li>
                <li>Critical engagement with the simulation's limitations</li>
                <li>Analytical reflection on the experience</li>
              </ul>

              <h2>Example Projects</h2>

              <div className="grid gap-4 my-8">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    <Link href="/projects/young-darwin" className="text-primary hover:underline">
                      Young Darwin →
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Students converse with Darwin during the Galápagos expedition, exploring his early ideas about
                    natural history before the theory of evolution.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    <Link href="/projects/apothecary-simulator" className="text-primary hover:underline">
                      Apothecary Simulator →
                    </Link>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Scenario-based simulation where students run an 18th-century pharmacy, making decisions about
                    medical practices, social hierarchies, and business ethics.
                  </p>
                </div>
              </div>

              <h2>Next Steps</h2>

              <div className="bg-muted p-6 rounded-lg space-y-4 not-prose my-8">
                <h3 className="text-lg font-semibold mb-3">Continue Learning</h3>
                <div className="space-y-2">
                  <Link href="/guides/claude-code-basics" className="block text-primary hover:underline">
                    → Getting Started with Claude Code
                  </Link>
                  <Link href="/guides/ai-assignments" className="block text-primary hover:underline">
                    → Designing AI Assignments
                  </Link>
                  <Link href="/guides/critical-pedagogy" className="block text-primary hover:underline">
                    → Critical AI Pedagogy
                  </Link>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5" /> Share Your Simulation
                </h3>
                <p className="mb-4">
                  Built a historical simulation you're proud of? We'd love to feature it in our project gallery
                  and help other educators learn from your work.
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
