'use client'

import { GuideLayout, WikiLink, GuideSectionDivider } from '@/components/ui/guide-layout'
import { HeadingAnchor } from '@/components/ui/heading-anchor'
import Link from 'next/link'
import { Lightbulb, AlertCircle, CheckCircle, Download, Sparkles, Terminal, Github, Globe, Code } from 'lucide-react'
import { siteConfig } from '@/lib/config'

const tableOfContents = [
  { id: 'what-is-vibe-coding', title: 'What Is Vibe Coding?' },
  { id: 'terminal-basics', title: 'The Terminal (Optional)' },
  { id: 'code-editor', title: 'Getting a Code Editor' },
  { id: 'installing-claude-code', title: 'Installing Claude Code' },
  { id: 'first-conversation', title: 'Your First Conversation' },
  { id: 'starter-projects', title: 'Starter Projects' },
  { id: 'project-1', title: 'Literary Text Analyzer', level: 2 },
  { id: 'project-2', title: 'Historical Timeline', level: 2 },
  { id: 'deployment', title: 'Sharing Your App Online' },
  { id: 'github-setup', title: 'GitHub Setup', level: 2 },
  { id: 'vercel-deploy', title: 'Vercel Deployment', level: 2 },
  { id: 'alternatives', title: 'Alternative Tools' },
  { id: 'next-steps', title: 'Next Steps' },
]

export default function ClaudeCodeBasicsGuide() {
  return (
    <GuideLayout
      title="Getting Started with AI Coding Tools"
      subtitle="Build custom tools for teaching and research by describing what you want in plain English—no programming experience required"
      guideId="claude-code-basics"
      thumbnailPath="/thumbnails/claude-code-basics.webp"
      author={{
        name: 'Benjamin Breen',
        role: 'Principal Investigator, THINK',
      }}
      lastUpdated="November 2025"
      readingTime="20 min read"
      tableOfContents={tableOfContents}
    >
      <p className="lead">
        One of the most interesting (and unexpected) developments in the history of <WikiLink term="History of computing">computing</WikiLink> has happened in the past few years: human language, not computer code, is now the method of choice for developing many kinds of software. This creates a real opening for humanists. AI coding tools like Claude Code let you create websites, <WikiLink term="Data visualization">data visualizations</WikiLink>, interactive simulations, and research tools simply by describing what you want. This guide walks you through it, with no technical background expected. I recommend using an <WikiLink term="Large language model">LLM</WikiLink> of your choice to troubleshoot and ask follow-up questions as needed throughout this process.
      </p>

      <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-amber-900 dark:text-amber-100">
              The Key Insight
            </h4>
            <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-0">
              Building software used to require years of training. Now you can describe what you want in plain English—"create a timeline of the French Revolution" or "build a tool that analyzes word frequency in texts"—and AI writes the code for you. But a word of warning: asking an LLM to come up with an interesting idea is not going to get you far. What makes this process compelling and useful is that it can augment and make feasible an original <em>human</em> idea.
            </p>
          </div>
        </div>
      </div>

      <HeadingAnchor id="what-is-vibe-coding">What Is "Vibe Coding"?</HeadingAnchor>

      <p>
        "Vibe coding" is a term coined by <WikiLink term="Andrej Karpathy">Andrej Karpathy</WikiLink> to describe a new way of building software: you describe what you want in natural language, and AI creates it. 
      </p>

      <p>
        This is the basic process used by "<WikiLink term="Command-line interface">Command Line Interface</WikiLink>" (CLI) coding tools like <strong>Claude Code</strong>, <WikiLink term="ChatGPT">ChatGPT</WikiLink>'s Codex, and <strong>Gemini CLI</strong>. There is a bit of a learning curve in adapting to the terminal and command line interface, but I find it genuinely useful, even revelatory, to be able to input <WikiLink term="Natural language processing">natural language</WikiLink> text in such a simple format and produce tools like:
      </p>

      <ul>
        <li>Interactive timelines for course materials</li>
        <li>Text analysis tools for <WikiLink term="Digital humanities">digital humanities</WikiLink> research</li>
        <li>Historical simulations where students interact with AI-powered figures</li>
        <li>Data visualizations from archival research</li>
        <li>Websites to showcase intellectual projects (for instance, the one you are reading!)</li>
      </ul>

      <GuideSectionDivider />

      <HeadingAnchor id="terminal-basics">The Terminal: Optional but Useful</HeadingAnchor>

      <p>
        The <WikiLink term="Terminal (macOS)">terminal</WikiLink> is a text-based way to interact with your computer. While you don't <em>need</em> to use it for basic projects beyond installing and opening Claude Code or Codex, but knowing a few commands is helpful for installing Claude Code and managing your projects.
      </p>

      <div className="my-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="h-5 w-5 text-primary" />
          <h4 className="font-sans text-base font-semibold mt-0 mb-0">Finding Your Terminal</h4>
        </div>
        <ul className="text-sm space-y-2 mb-0 pl-5">
          <li>
            <strong>Mac:</strong> Open Spotlight (⌘ + Space), type "Terminal", press Enter
          </li>
          <li>
            <strong>Windows:</strong> Press Windows key, type "PowerShell", press Enter
          </li>
        </ul>
      </div>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">A Few Helpful Commands (Optional)</h3>

      <p>
        You won't need to memorize these, but here's a quick reference:
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300 dark:border-slate-700 text-sm">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans font-semibold">Command</th>
              <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans font-semibold">What It Does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2"><code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">pwd</code></td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Shows which folder you're currently in</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2"><code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">ls</code></td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Lists all files in the current folder</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2"><code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">cd foldername</code></td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Go into a folder</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2"><code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">cd ..</code></td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Go up one folder level</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2"><code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">mkdir newproject</code></td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Create a new folder called "newproject"</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-muted-foreground text-sm">
        Don't worry about memorizing these—once Claude Code is running, you can just ask it to navigate for you or explain any command.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="code-editor">Getting a Code Editor</HeadingAnchor>

      <p>
        A code editor is like Microsoft Word for code—it shows you your files with helpful features like syntax highlighting (color-coded text) and lets you browse your project folders. I recommend <WikiLink term="Visual Studio Code">Visual Studio Code</WikiLink> (VS Code) because it's free, well-supported, and widely used.
      </p>

      <div className="my-8 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-5 w-5 text-primary" />
          <h4 className="font-sans text-base font-semibold mt-0 mb-0">Installing VS Code</h4>
        </div>
        <ol className="text-sm space-y-3 mb-0 pl-5">
          <li>
            Go to{' '}
            <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              code.visualstudio.com
            </a>
          </li>
          <li>Click the large download button (it detects your operating system)</li>
          <li>Install by dragging to Applications (Mac) or running the installer (Windows)</li>
          <li>Open VS Code, then File → Open Folder to view any project</li>
        </ol>
      </div>

      <p>
        VS Code is optional—you can build projects entirely through Claude Code's terminal interface—but it's very helpful for browsing and understanding the files that get created.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="installing-claude-code">Installing Claude Code</HeadingAnchor>

      <p>
        Claude Code is <WikiLink term="Anthropic">Anthropic's</WikiLink> tool for building software through conversation. Here's how to get it running:
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Step 1: Create an Anthropic Account</h3>

      <ol>
        <li>
          Go to{' '}
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            claude.ai
          </a>
        </li>
        <li>Sign up with your email or Google account</li>
        <li>Choose your plan (free tier works to start, Pro gives more usage)</li>
      </ol>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Step 2: Install Claude Code</h3>

      <p>Open your terminal and paste the appropriate command:</p>

      <div className="my-6 p-5 bg-slate-900 text-slate-100 rounded-lg font-mono text-sm">
        <p className="text-slate-400 mb-2"># Mac/Linux</p>
        <code>curl -fsSL https://claude.ai/install.sh | bash</code>
      </div>

      <div className="my-6 p-5 bg-slate-900 text-slate-100 rounded-lg font-mono text-sm">
        <p className="text-slate-400 mb-2"># Windows PowerShell</p>
        <code>irm https://claude.ai/install.ps1 | iex</code>
      </div>

      <p>
        The installer will guide you through connecting your account. When it finishes, you'll be able to type <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm">claude</code> in any terminal to start a conversation.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Step 3: Create a Project Folder</h3>

      <p>
        In your terminal, navigate to where you want to work and create a new folder:
      </p>

      <div className="my-6 p-5 bg-slate-900 text-slate-100 rounded-lg font-mono text-sm overflow-x-auto">
        <p className="text-slate-400 mb-2"># Navigate to Desktop</p>
        <code>cd ~/Desktop</code>
        <br /><br />
        <p className="text-slate-400 mb-2"># Create a new project folder</p>
        <code>mkdir my-first-project</code>
        <br /><br />
        <p className="text-slate-400 mb-2"># Go into that folder</p>
        <code>cd my-first-project</code>
        <br /><br />
        <p className="text-slate-400 mb-2"># Start Claude Code</p>
        <code>claude</code>
      </div>

      <div className="my-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-600 rounded-r-lg">
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
              You're Ready!
            </h4>
            <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
              When you see the Claude prompt appear, you can start describing what you want to build in plain English. Claude will create files, write code, and explain what it's doing.
            </p>
          </div>
        </div>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="first-conversation">Your First Conversation with Claude Code</HeadingAnchor>

      <p>
        Once Claude Code is running, you interact with it by typing naturally. Here's what a typical first conversation looks like:
      </p>

      <div className="my-6 space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-2 border-blue-600">
          <p className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1 font-semibold">You</p>
          <p className="text-sm mb-0">
            Hi Claude! I want to create a simple website about the Scientific Revolution for my history course. Can you help me build it?
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border-l-2 border-slate-400">
          <p className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-1 font-semibold">Claude</p>
          <p className="text-sm mb-0">
            I'd be happy to help you create a website about the Scientific Revolution! I'll set up a simple, elegant site. Let me create the basic structure...
          </p>
          <p className="text-xs text-muted-foreground mt-2 mb-0 italic">[Claude creates index.html, styles.css, and other files]</p>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-2 border-blue-600">
          <p className="text-xs uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1 font-semibold">You</p>
          <p className="text-sm mb-0">
            Great! Can you add an interactive timeline showing key discoveries from 1543 to 1687?
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border-l-2 border-slate-400">
          <p className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-1 font-semibold">Claude</p>
          <p className="text-sm mb-0">
            I'll add an interactive timeline that lets visitors click on events to see more details. Let me update the page...
          </p>
        </div>
      </div>

      <p>
        To view your website, simply open the <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm">index.html</code> file in your browser (double-click it, or drag it onto Chrome/Safari/Firefox).
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Tips for Better Results</h3>

      <ul>
        <li><strong>Be specific:</strong> "A timeline with 10 events, blue color scheme, clean modern design" works better than "make a timeline"</li>
        <li><strong>Iterate:</strong> Ask for changes one at a time—"make the fonts larger," "add more events," "change the background color"</li>
        <li><strong>Ask questions:</strong> Claude can explain what any code does if you're curious</li>
        <li><strong>Say when something's wrong:</strong> "The timeline isn't displaying correctly" prompts Claude to debug</li>
      </ul>

      <GuideSectionDivider />

      <HeadingAnchor id="starter-projects">Starter Projects</HeadingAnchor>

      <p>
        Here are two complete starter projects you can build. Copy these prompts directly into Claude Code.
      </p>

      <h3 id="project-1" className="font-sans text-xl font-semibold mt-8 mb-4 scroll-mt-24">Project 1: Literary Text Analyzer</h3>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <p className="text-sm text-muted-foreground mb-3">Copy and paste this prompt:</p>
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border-l-2 border-blue-600">
          <p className="text-sm mb-0">
            "Create a web-based text analysis tool for literary studies. Features needed:
            <br /><br />
            1. A large text input area where I can paste passages from books
            <br />
            2. Analysis showing: word count, sentence count, average sentence length
            <br />
            3. A word frequency chart showing the 20 most common words (excluding common words like 'the', 'and', 'is')
            <br />
            4. A simple sentiment indicator (positive/negative/neutral tone)
            <br />
            5. Clean, academic-looking design with good typography
            <br /><br />
            Make it a single HTML file that works when opened in a browser."
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-4 mb-0">
          <strong>Good for:</strong> <WikiLink term="Digital humanities">Digital humanities</WikiLink> research, close reading exercises, <WikiLink term="Stylometry">stylometry</WikiLink> assignments
        </p>
      </div>

      <h3 id="project-2" className="font-sans text-xl font-semibold mt-8 mb-4 scroll-mt-24">Project 2: Interactive Historical Timeline</h3>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <p className="text-sm text-muted-foreground mb-3">Copy and paste this prompt:</p>
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border-l-2 border-blue-600">
          <p className="text-sm mb-0">
            "Build an interactive timeline of the <WikiLink term="French Revolution">French Revolution</WikiLink> (1789-1799). Include:
            <br /><br />
            1. At least 12 major events with dates
            <br />
            2. Click on any event to see a detailed description (2-3 sentences)
            <br />
            3. Color-code events by type: political (blue), social (green), military (red)
            <br />
            4. A filter to show only certain types of events
            <br />
            5. Elegant design that would work in a university course
            <br /><br />
            Use <WikiLink term="HTML">HTML</WikiLink>, <WikiLink term="CSS">CSS</WikiLink>, and vanilla <WikiLink term="JavaScript">JavaScript</WikiLink>. Make it responsive for mobile viewing."
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-4 mb-0">
          <strong>Good for:</strong> Course websites, student projects, visualizing historical periods
        </p>
      </div>

      <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-amber-900 dark:text-amber-100">
              Teaching Opportunity
            </h4>
            <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-0">
              These projects make excellent assignments! Students can build their own timelines on topics they're studying, or modify the text analyzer for specific literary analysis tasks. The process of describing what you want and refining it through conversation teaches valuable skills about clear communication and iterative design.
            </p>
          </div>
        </div>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="deployment">Sharing Your App Online: GitHub + Vercel</HeadingAnchor>

      <p>
        Once you've built something you're proud of, you'll probably want to share it with students or colleagues. The easiest (and free!) way to put your project online is using <WikiLink term="GitHub">GitHub</WikiLink> and <WikiLink term="Vercel">Vercel</WikiLink>.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">What Are GitHub and Vercel?</h3>

      <ul>
        <li><strong>GitHub</strong> is like <WikiLink term="Google Drive">Google Drive</WikiLink> for code—it stores your project online and tracks changes over time using <WikiLink term="Version control">version control</WikiLink>. It's free and used by virtually all software developers.</li>
        <li><strong>Vercel</strong> is a <WikiLink term="Web hosting service">web hosting</WikiLink> service that takes your code from GitHub and makes it into a live website. Also free for personal projects.</li>
      </ul>

      <h3 id="github-setup" className="font-sans text-xl font-semibold mt-8 mb-4 scroll-mt-24">Step 1: Create a GitHub Account</h3>

      <ol>
        <li>
          Go to{' '}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            github.com
          </a>
        </li>
        <li>Click "Sign up" and create an account with your email</li>
        <li>Verify your email address</li>
      </ol>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Step 2: Install Git</h3>

      <p>
        <WikiLink term="Git">Git</WikiLink> is the underlying <WikiLink term="Distributed version control">distributed version control</WikiLink> tool that GitHub uses. It was created by <WikiLink term="Linus Torvalds">Linus Torvalds</WikiLink> (creator of <WikiLink term="Linux">Linux</WikiLink>) in 2005. Check if you have it by typing <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm">git --version</code> in your terminal.
      </p>

      <p>If you don't have it:</p>

      <ul>
        <li><strong>Mac:</strong> Type <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm">xcode-select --install</code> in Terminal</li>
        <li>
          <strong>Windows:</strong> Download from{' '}
          <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            git-scm.com/downloads
          </a>
        </li>
      </ul>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Step 3: Push Your Project to GitHub</h3>

      <p>
        In your terminal, navigate to your project folder and run these commands. <strong>You can just tell Claude Code "push this project to GitHub" and it will guide you through each step!</strong>
      </p>

      <div className="my-6 p-5 bg-slate-900 text-slate-100 rounded-lg font-mono text-sm overflow-x-auto">
        <p className="text-slate-400 mb-2"># Initialize git in your project (only needed once)</p>
        <code>git init</code>
        <br /><br />
        <p className="text-slate-400 mb-2"># Stage all your files</p>
        <code>git add .</code>
        <br /><br />
        <p className="text-slate-400 mb-2"># Create a commit (a snapshot of your project)</p>
        <code>git commit -m "Initial commit"</code>
        <br /><br />
        <p className="text-slate-400 mb-2"># Create a new repository on GitHub (opens browser)</p>
        <code>gh repo create my-project --public --source=. --push</code>
      </div>

      <p className="text-sm text-muted-foreground">
        Note: The <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">gh</code> command requires the GitHub CLI. You can also create the repository manually on github.com and follow their instructions to push.
      </p>

      <h3 id="vercel-deploy" className="font-sans text-xl font-semibold mt-8 mb-4 scroll-mt-24">Step 4: Deploy with Vercel</h3>

      <ol>
        <li>
          Go to{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            vercel.com
          </a>
          {' '}and sign up with your GitHub account
        </li>
        <li>Click "Add New Project"</li>
        <li>Select the repository you just created</li>
        <li>Click "Deploy" (default settings usually work)</li>
        <li>Wait about 60 seconds for it to build</li>
      </ol>

      <div className="my-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-600 rounded-r-lg">
        <div className="flex gap-3">
          <Globe className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
              Your App Is Live!
            </h4>
            <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
              Vercel gives you a URL like <code>my-project.vercel.app</code> that you can share with anyone. Every time you push new changes to GitHub, Vercel automatically updates your live site.
            </p>
          </div>
        </div>
      </div>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Updating Your Live Site</h3>

      <p>Made changes to your project? Push them to GitHub and Vercel updates automatically:</p>

      <div className="my-6 p-5 bg-slate-900 text-slate-100 rounded-lg font-mono text-sm overflow-x-auto">
        <p className="text-slate-400 mb-2"># Stage your changes</p>
        <code>git add .</code>
        <br /><br />
        <p className="text-slate-400 mb-2"># Commit with a message describing what changed</p>
        <code>git commit -m "Added new timeline events"</code>
        <br /><br />
        <p className="text-slate-400 mb-2"># Push to GitHub (triggers automatic deploy)</p>
        <code>git push</code>
      </div>

      <div className="my-8 p-6 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-600 rounded-r-lg">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-orange-900 dark:text-orange-100">
              Let Claude Help You
            </h4>
            <p className="text-sm text-orange-900/80 dark:text-orange-100/80 mb-0">
              If any of these steps are confusing, just tell Claude Code: "Help me push this project to GitHub and deploy it on Vercel." It will walk you through each step and explain any errors that come up.
            </p>
          </div>
        </div>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="alternatives">Alternative Tools</HeadingAnchor>

      <p>
        Claude Code isn't the only option. Here's a comparison of the main AI coding tools:
      </p>

      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800">
              <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Tool</th>
              <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Best For</th>
              <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Cost</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2"><strong>Claude Code</strong></td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Most capable; best for complex projects</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Free tier available; Pro $20/mo</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2"><strong>ChatGPT + Canvas</strong></td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Easiest setup; works entirely in browser</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Requires ChatGPT Plus ($20/mo)</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2"><strong>Cursor</strong></td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Visual editor; see code as it's written</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Free tier; Pro $20/mo</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2"><strong>Windsurf</strong></td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Budget-friendly; beginner-focused</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Free tier; Pro $15/mo</td>
            </tr>
            <tr>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2"><strong>Google Jules</strong></td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Integrated with Google ecosystem</td>
              <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Free with Google account</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <strong>Our recommendation:</strong> Start with whichever tool you can access most easily. If you want the simplest path, use ChatGPT + Canvas in your browser. If you want the most powerful tool for complex projects, install Claude Code. The skills transfer between all these tools.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="next-steps">Next Steps</HeadingAnchor>

      <p>
        Once you've built and deployed your first project, explore these resources:
      </p>

      <ul>
        <li>
          <Link href="/guides/building-simulations" className="text-primary hover:underline">
            Building Historical Simulations
          </Link>
          {' '}— Create interactive experiences where students converse with historical figures
        </li>
        <li>
          <Link href="/guides/prompt-engineering" className="text-primary hover:underline">
            Prompt Engineering for Humanities
          </Link>
          {' '}— Learn advanced techniques for getting better results from AI
        </li>
        <li>
          <Link href="/projects" className="text-primary hover:underline">
            Project Gallery
          </Link>
          {' '}— See what other humanities faculty have built for inspiration
        </li>
      </ul>

      <div className="my-12 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-3">The Bottom Line</h3>
        <p className="mb-0">
          You don't need to become a programmer. You just need to describe what you want clearly and iterate through conversation. The AI handles the technical implementation. Your expertise in your subject matter—knowing what's pedagogically valuable, historically accurate, and intellectually interesting—is what makes the difference between a generic tool and something genuinely useful for your teaching and research.
        </p>
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
