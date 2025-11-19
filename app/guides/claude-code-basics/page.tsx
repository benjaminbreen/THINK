import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Terminal, Code, Sparkles } from 'lucide-react'

export default function ClaudeCodeBasicsGuide() {
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
              <Badge variant="outline">Terminal</Badge>
            </div>

            <h1 className="text-4xl font-serif font-bold mb-4">
              Getting Started with Claude Code
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Learn how to use Claude Code in the terminal to build custom AI tools for teaching and research
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="flex items-center gap-2">
                <Terminal className="h-6 w-6" /> What is Claude Code?
              </h2>
              <p>
                Claude Code is a terminal-based tool that lets you collaborate with Claude to write code, build applications,
                and automate tasks directly from your command line. Unlike the web interface, Claude Code can read and write
                files, run commands, and help you build complete projects iteratively.
              </p>

              <h3>Why Use Claude Code for Humanities Projects?</h3>
              <p>
                For humanities educators and researchers, Claude Code offers unique advantages:
              </p>
              <ul>
                <li><strong>Rapid prototyping:</strong> Build custom simulations and tools in hours instead of weeks</li>
                <li><strong>No programming background required:</strong> Describe what you want in plain English</li>
                <li><strong>Full control:</strong> All code lives on your computer, not in a black box</li>
                <li><strong>Iterative refinement:</strong> Easily modify and extend tools as your needs evolve</li>
                <li><strong>Reproducible research:</strong> Share your tools as open-source code</li>
              </ul>

              <h2 className="flex items-center gap-2">
                <Code className="h-6 w-6" /> Installation
              </h2>

              <h3>Prerequisites</h3>
              <p>Before installing Claude Code, you'll need:</p>
              <ul>
                <li>A computer running macOS, Linux, or Windows</li>
                <li>A terminal/command line application</li>
                <li>An Anthropic API key (get one at <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a>)</li>
              </ul>

              <h3>Step 1: Install Claude Code</h3>
              <p>Open your terminal and run:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>npm install -g claude-code</code>
              </pre>
              <p className="text-sm text-muted-foreground">
                Don't have npm? Install Node.js from <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">nodejs.org</a> first.
              </p>

              <h3>Step 2: Configure Your API Key</h3>
              <p>Set up your Anthropic API key:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>export ANTHROPIC_API_KEY=your-api-key-here</code>
              </pre>
              <p className="text-sm text-muted-foreground">
                Add this to your <code>~/.bashrc</code> or <code>~/.zshrc</code> to make it permanent.
              </p>

              <h3>Step 3: Verify Installation</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>claude-code --version</code>
              </pre>

              <h2 className="flex items-center gap-2">
                <Sparkles className="h-6 w-6" /> Your First Project
              </h2>

              <h3>Example: Building a Primary Source Analyzer</h3>
              <p>
                Let's build a simple tool that analyzes historical documents. Create a new directory and start Claude Code:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{`mkdir source-analyzer
cd source-analyzer
claude-code`}</code>
              </pre>

              <h3>Step-by-Step Workflow</h3>

              <h4>1. Describe Your Goal</h4>
              <p>When Claude Code starts, describe what you want to build:</p>
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "I want to build a Python script that takes a historical document as input and provides:
                (1) a summary, (2) key themes, (3) historical context, and (4) important people/places mentioned.
                Save the analysis as a JSON file."
              </blockquote>

              <h4>2. Review and Refine</h4>
              <p>
                Claude will write the code and explain what it's doing. You can ask for changes:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "Can you also add sentiment analysis and detect the time period being discussed?"
              </blockquote>

              <h4>3. Test Your Tool</h4>
              <p>Run the script on a sample document:</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>python analyze.py --input letter.txt</code>
              </pre>

              <h4>4. Iterate and Improve</h4>
              <p>
                The beauty of Claude Code is rapid iteration. If the output isn't quite right, just describe what you want changed:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "The summaries are too short. Make them 2-3 paragraphs and include specific quotes from the source."
              </blockquote>

              <h2>Key Concepts for Effective Prompting</h2>

              <h3>Be Specific About Context</h3>
              <p>Help Claude understand your domain:</p>
              <ul>
                <li>"I'm a history professor teaching 19th century American history"</li>
                <li>"This tool is for undergraduate students with no programming experience"</li>
                <li>"I need this to run on students' laptops without internet access"</li>
              </ul>

              <h3>Describe Your Inputs and Outputs</h3>
              <p>Be clear about data formats:</p>
              <ul>
                <li>"Input: Plain text files, 1-10 pages each"</li>
                <li>"Output: A markdown report with sections for each analysis category"</li>
                <li>"Save results in a folder called 'analyses' with timestamps"</li>
              </ul>

              <h3>Ask for Explanations</h3>
              <p>Don't just get code—understand it:</p>
              <ul>
                <li>"Explain how this script works in simple terms"</li>
                <li>"Add comments to the code explaining each step"</li>
                <li>"What would I need to change if I wanted to analyze PDFs instead?"</li>
              </ul>

              <h2>Real-World Examples from THINK</h2>

              <h3>HistoryLens (Research Framework)</h3>
              <p>
                Built entirely with Claude Code over 3 days. Started with: "I want a tool that takes a historical
                research question and a set of primary sources, then helps me explore different interpretations and
                generate research hypotheses."
              </p>
              <p>
                <Link href="/projects/historylens" className="text-primary hover:underline">
                  View HistoryLens project →
                </Link>
              </p>

              <h3>Young Darwin (Interactive Simulation)</h3>
              <p>
                A conversation-based simulation where students talk to a young Charles Darwin. Key prompt:
                "Create a chatbot that roleplays as Darwin in 1835, during the Galápagos expedition. It should
                be historically accurate, cite real letters and specimens, and help students understand his
                thought process before developing evolutionary theory."
              </p>
              <p>
                <Link href="/projects/young-darwin" className="text-primary hover:underline">
                  View Young Darwin project →
                </Link>
              </p>

              <h2>Best Practices</h2>

              <h3>Start Small, Then Expand</h3>
              <p>
                Build a minimal version first, test it, then add features incrementally. This is faster and
                produces better results than trying to build everything at once.
              </p>

              <h3>Use Version Control</h3>
              <p>
                Initialize a git repository for your project:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>git init</code>
              </pre>
              <p>
                Claude Code can help you commit changes with descriptive messages.
              </p>

              <h3>Document As You Go</h3>
              <p>Ask Claude to:</p>
              <ul>
                <li>Create a README explaining how to use your tool</li>
                <li>Add a PEDAGOGY.md file describing classroom use cases</li>
                <li>Generate example input/output files for testing</li>
              </ul>

              <h3>Test with Real Students</h3>
              <p>
                Before deploying a tool in class, have a few students test it. Use their feedback to refine:
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "Students found the instructions confusing. Can you add a simple interactive menu at the start
                that guides them through the options?"
              </blockquote>

              <h2>Common Pitfalls to Avoid</h2>

              <h3>Over-Engineering</h3>
              <p>
                You don't need a fancy web interface for most classroom tools. A simple command-line script or
                Jupyter notebook is often more effective and easier to maintain.
              </p>

              <h3>Forgetting About Dependencies</h3>
              <p>
                Always ask Claude to create a <code>requirements.txt</code> or <code>package.json</code> file
                so others can recreate your environment.
              </p>

              <h3>Not Considering Privacy</h3>
              <p>
                If students will use your tool with sensitive data, make sure it processes everything locally
                and doesn't send data to external APIs without consent.
              </p>

              <h2>Next Steps</h2>

              <div className="bg-muted p-6 rounded-lg space-y-4 not-prose">
                <h3 className="text-lg font-semibold mb-3">Continue Learning</h3>
                <div className="space-y-2">
                  <Link href="/guides/building-simulations" className="block text-primary hover:underline">
                    → Building Historical Simulations
                  </Link>
                  <Link href="/guides/prompt-engineering" className="block text-primary hover:underline">
                    → Prompt Engineering for Humanities
                  </Link>
                  <Link href="/guides/ai-assignments" className="block text-primary hover:underline">
                    → Designing AI Assignments
                  </Link>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="mb-4">
                  Join our community of educators building AI tools for the humanities. Share your projects,
                  ask questions, and learn from others.
                </p>
                <div className="flex gap-3">
                  <Button asChild variant="outline" size="sm">
                    <a href="mailto:bbreen@ucsc.edu">Contact us</a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/projects">Browse projects</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
