'use client'

import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { BackToTop } from '@/components/ui/back-to-top'
import { HeadingAnchor } from '@/components/ui/heading-anchor'
import { GuideBanner } from '@/components/ui/guide-banner'
import Link from 'next/link'
import { ArrowLeft, Terminal, Download, Key, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react'

export default function ClaudeCodeBasicsGuide() {
  return (
    <>
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Getting Started with Claude Code' }
      ]} />
      <Section className="pt-8 pb-16">
        <Container>
          <GuideBanner
            thumbnailPath="/thumbnails/claude-code-basics.png"
            guideTitle="Getting Started with Claude Code"
            guideId="claude-code-basics"
          />

          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/#guides">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
              </Link>
            </Button>
          </div>

          {/* Table of Contents Sidebar - Fixed on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* TOC */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 bg-muted/30 rounded-lg p-6">
                <h3 className="font-sans text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
                  On This Page
                </h3>
                <nav className="space-y-2 text-sm">
                  <a href="#what-is-terminal" className="block text-foreground/70 hover:text-primary transition-colors">
                    What is the Terminal?
                  </a>
                  <a href="#code-editor" className="block text-foreground/70 hover:text-primary transition-colors">
                    Getting a Code Editor
                  </a>
                  <a href="#install-claude" className="block text-foreground/70 hover:text-primary transition-colors">
                    Installing Claude Code
                  </a>
                  <a href="#first-steps" className="block text-foreground/70 hover:text-primary transition-colors">
                    Your First Steps
                  </a>
                  <a href="#starter-project-1" className="block text-foreground/70 hover:text-primary transition-colors">
                    Project 1: Text Analysis
                  </a>
                  <a href="#starter-project-2" className="block text-foreground/70 hover:text-primary transition-colors">
                    Project 2: Historical Timeline
                  </a>
                  <a href="#alternatives" className="block text-foreground/70 hover:text-primary transition-colors">
                    Alternative Tools
                  </a>
                  <a href="#next-steps" className="block text-foreground/70 hover:text-primary transition-colors">
                    What's Next?
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-serif font-bold mb-4">
                  Getting Started with Claude Code
                </h1>
                <p className="text-xl text-muted-foreground mb-12">
                  A complete beginner's guide to building AI tools for humanities teaching and research—no technical background required
                </p>

                <div className="prose prose-xl max-w-none">
                  <p className="lead">
                    This guide will walk you through everything you need to know to start building your own AI-powered tools for teaching and research. We'll start from the very beginning—explaining what the "terminal" even is—and take you all the way through creating your first interactive projects.
                  </p>

                  <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-amber-900 dark:text-amber-100">
                          Why This Matters
                        </h4>
                        <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-0">
                          Building your own AI tools gives you control over how AI is used in your teaching and research. Instead of relying on generic commercial products, you can create custom experiences tailored to your specific courses, materials, and pedagogical goals. This guide assumes zero programming experience—if you can write an email, you can follow along.
                        </p>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="what-is-terminal">What is the Terminal?</HeadingAnchor>

                  <p>
                    Before we can use Claude Code, we need to understand what the "terminal" is. If you've never encountered it before, the terminal (also called "command line" or "console") might seem intimidating—it's that black window with text that you see in movies when hackers are doing their thing. In reality, it's just another way to interact with your computer.
                  </p>

                  <p>
                    Think of it this way: normally, you use your mouse to click on folders and icons to open files and programs. The terminal lets you do the same things, but by typing commands instead of clicking. That's it. You type instructions, press Enter, and the computer follows them.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Finding Your Terminal</h3>

                  <p>
                    The terminal is already installed on your computer—you just need to find it:
                  </p>

                  <div className="my-6 space-y-4">
                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3 flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        On Mac
                      </h4>
                      <ol className="text-sm space-y-2 mb-0 pl-5">
                        <li>Open Spotlight Search by pressing <kbd className="px-2 py-1 bg-white dark:bg-slate-800 border rounded text-xs font-mono">⌘ Command + Space</kbd></li>
                        <li>Type "Terminal" and press Enter</li>
                        <li>A window will open with white or black text on a dark or light background</li>
                      </ol>
                      <p className="text-sm text-muted-foreground mt-3 mb-0">
                        <strong>Tip:</strong> Drag the Terminal icon to your Dock so you can find it easily next time.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3 flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        On Windows
                      </h4>
                      <ol className="text-sm space-y-2 mb-0 pl-5">
                        <li>Click the Start menu (Windows icon in bottom-left corner)</li>
                        <li>Type "PowerShell" or "Command Prompt"</li>
                        <li>Click on "Windows PowerShell" (the blue one is recommended)</li>
                      </ol>
                      <p className="text-sm text-muted-foreground mt-3 mb-0">
                        <strong>Tip:</strong> Right-click the PowerShell icon and select "Pin to taskbar" for easy access.
                      </p>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Basic Terminal Commands</h3>

                  <p>
                    You only need to know a handful of basic commands to get started. Here are the essential ones:
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-4">Essential Commands</h4>

                    <div className="space-y-4 text-sm">
                      <div>
                        <code className="text-sm bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded font-mono">pwd</code>
                        <span className="ml-3 text-muted-foreground">— Shows where you currently are on your computer (Print Working Directory)</span>
                      </div>

                      <div>
                        <code className="text-sm bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded font-mono">ls</code> <span className="text-muted-foreground text-xs">(Mac)</span> or <code className="text-sm bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded font-mono">dir</code> <span className="text-muted-foreground text-xs">(Windows)</span>
                        <span className="ml-3 text-muted-foreground">— Lists all files and folders in your current location</span>
                      </div>

                      <div>
                        <code className="text-sm bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded font-mono">cd foldername</code>
                        <span className="ml-3 text-muted-foreground">— Changes directory (moves into a folder called "foldername")</span>
                      </div>

                      <div>
                        <code className="text-sm bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded font-mono">cd ..</code>
                        <span className="ml-3 text-muted-foreground">— Moves up one folder level (goes back)</span>
                      </div>

                      <div>
                        <code className="text-sm bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded font-mono">mkdir projectname</code>
                        <span className="ml-3 text-muted-foreground">— Makes a new folder called "projectname"</span>
                      </div>
                    </div>
                  </div>

                  <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
                          Try It Now
                        </h4>
                        <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-3">
                          Open your terminal and try these commands one at a time:
                        </p>
                        <ol className="text-sm text-blue-900/80 dark:text-blue-100/80 space-y-1 mb-0 pl-5">
                          <li>Type <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded text-xs font-mono">pwd</code> and press Enter — you'll see your current location</li>
                          <li>Type <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded text-xs font-mono">ls</code> (or <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded text-xs font-mono">dir</code> on Windows) — you'll see your files</li>
                          <li>Type <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded text-xs font-mono">mkdir my-first-project</code> — you just created a folder!</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="code-editor">Getting a Code Editor</HeadingAnchor>

                  <p>
                    A code editor is like Microsoft Word, but designed for writing code instead of essays. You'll use it to view and edit the files that Claude Code creates for you. The good news: the best code editor is completely free.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Download Visual Studio Code (VS Code)</h3>

                  <p>
                    VS Code is the most popular code editor used by millions of developers. It's free, works on all computers, and is perfect for beginners.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-4 flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Installation Steps
                    </h4>
                    <ol className="text-sm space-y-3 mb-0 pl-5">
                      <li>
                        <strong>Go to the VS Code website:</strong> Visit{' '}
                        <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          code.visualstudio.com
                        </a>
                      </li>
                      <li>
                        <strong>Download the installer:</strong> Click the big "Download" button. The website automatically detects whether you're on Mac, Windows, or Linux and gives you the right version.
                      </li>
                      <li>
                        <strong>Install it:</strong> Open the downloaded file and follow the installation prompts (just keep clicking "Next" or "Continue"—the default settings are fine).
                      </li>
                      <li>
                        <strong>Open VS Code:</strong> Once installed, launch the application. You'll see a welcome screen with some tutorials—feel free to explore these, but you don't need them for now.
                      </li>
                    </ol>
                  </div>

                  <div className="my-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                          You're Doing Great!
                        </h4>
                        <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                          At this point, you have the two main tools you need: a terminal to run commands, and a code editor to view your files. That's 90% of the setup. Next, we'll install Claude Code itself.
                        </p>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="install-claude">Installing Claude Code</HeadingAnchor>

                  <p>
                    Claude Code is a tool that lets you use AI to build software by simply describing what you want in plain English. Instead of learning a programming language, you just talk to Claude naturally, and it writes the code for you.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Installation Process</h3>

                  <p>
                    Installing Claude Code takes just one command. Open your terminal and follow these steps:
                  </p>

                  <div className="my-6 space-y-4">
                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3 flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        For Mac or Linux
                      </h4>
                      <p className="text-sm mb-3">Copy and paste this command into your terminal, then press Enter:</p>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto mb-3">
                        <code className="text-sm font-mono">curl -fsSL https://claude.ai/install.sh | bash</code>
                      </pre>
                      <p className="text-sm text-muted-foreground mb-0">
                        This command downloads and runs the official Claude Code installer. You might be asked to enter your computer password—that's normal.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3 flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        For Windows (PowerShell)
                      </h4>
                      <p className="text-sm mb-3">Copy and paste this command into PowerShell, then press Enter:</p>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto mb-3">
                        <code className="text-sm font-mono">irm https://claude.ai/install.ps1 | iex</code>
                      </pre>
                      <p className="text-sm text-muted-foreground mb-0">
                        Windows might ask if you're sure you want to run this—click "Yes" or type "Y" and press Enter.
                      </p>
                    </div>
                  </div>

                  <div className="my-8 p-6 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-orange-900 dark:text-orange-100">
                          Troubleshooting
                        </h4>
                        <div className="text-sm text-orange-900/80 dark:text-orange-100/80 space-y-2">
                          <p className="mb-2">If the installation fails, try these solutions:</p>
                          <ul className="mb-0 pl-5 space-y-1">
                            <li><strong>On Mac:</strong> You might need to install Xcode Command Line Tools. Run: <code className="bg-orange-100 dark:bg-orange-900 px-1.5 py-0.5 rounded text-xs font-mono">xcode-select --install</code></li>
                            <li><strong>On Windows:</strong> Make sure you're using PowerShell, not Command Prompt</li>
                            <li><strong>Permission errors:</strong> You might need to run the terminal as administrator (right-click the terminal icon and select "Run as administrator")</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Setting Up Your Account</h3>

                  <p>
                    Once Claude Code is installed, you need to connect it to your Claude account. The great news is that you <strong>don't need an API key</strong> or any technical setup—just a free account.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-4 flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Account Setup
                    </h4>
                    <ol className="text-sm space-y-3 mb-0 pl-5">
                      <li>
                        <strong>Create a Claude account:</strong> Go to{' '}
                        <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          claude.ai
                        </a>
                        {' '}and sign up with your email (it's free).
                      </li>
                      <li>
                        <strong>Start Claude Code:</strong> In your terminal, type <code className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-xs">claude</code> and press Enter.
                      </li>
                      <li>
                        <strong>Authenticate:</strong> Claude Code will open a browser window asking you to log in. Use the same credentials you just created.
                      </li>
                      <li>
                        <strong>Grant permissions:</strong> Click "Allow" to let Claude Code access your account.
                      </li>
                      <li>
                        <strong>Return to terminal:</strong> Go back to your terminal window—you should now see Claude's welcome message!
                      </li>
                    </ol>
                  </div>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">What You'll See</h4>
                    <p className="text-sm mb-3">After authentication, your terminal should look something like this:</p>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto text-xs mb-0">
{`Welcome to Claude Code!

I'm Claude, an AI assistant from Anthropic. I can help you build
software, analyze data, create tools, and much more—all through
natural conversation.

How can I help you today?`}
                    </pre>
                  </div>

                  <HeadingAnchor id="first-steps">Your First Steps with Claude Code</HeadingAnchor>

                  <p>
                    Now for the exciting part: actually using Claude Code. The most important thing to understand is that <strong>you interact with Claude Code using plain English</strong>. You don't need to know any programming languages or special syntax.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">How It Works</h3>

                  <p>
                    When you run <code className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-sm">claude</code> in your terminal, you start a conversation with an AI assistant that can:
                  </p>

                  <ul>
                    <li>Create files and folders for you</li>
                    <li>Write code in any programming language</li>
                    <li>Edit existing files</li>
                    <li>Search for information on the web</li>
                    <li>Explain how things work</li>
                    <li>Debug errors and fix problems</li>
                    <li>Install software packages you need</li>
                  </ul>

                  <p>
                    You simply tell Claude what you want to do, and it handles the technical details. Let's try some examples.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Example Conversations</h3>

                  <div className="my-6 space-y-6">
                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-sm font-semibold mt-0 mb-3 text-muted-foreground uppercase tracking-wider">
                        Example 1: Simple Website
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">YOU TYPE:</p>
                          <p className="text-sm bg-blue-50 dark:bg-blue-950 p-3 rounded border-l-2 border-blue-600 mb-0">
                            "Create a simple website about the history of coffee. Include a title, some paragraphs about its origins in Ethiopia, and make it look nice with some basic styling."
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">CLAUDE DOES:</p>
                          <ul className="text-sm text-muted-foreground space-y-1 mb-0 pl-5">
                            <li>Creates an HTML file with your content</li>
                            <li>Adds CSS styling to make it visually appealing</li>
                            <li>Tells you how to open it in your browser</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-sm font-semibold mt-0 mb-3 text-muted-foreground uppercase tracking-wider">
                        Example 2: Data Analysis
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">YOU TYPE:</p>
                          <p className="text-sm bg-blue-50 dark:bg-blue-950 p-3 rounded border-l-2 border-blue-600 mb-0">
                            "I have a CSV file with word frequency data from 19th-century novels. Can you analyze it and create a chart showing the most common words?"
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">CLAUDE DOES:</p>
                          <ul className="text-sm text-muted-foreground space-y-1 mb-0 pl-5">
                            <li>Reads your CSV file</li>
                            <li>Writes code to analyze the data</li>
                            <li>Generates a visualization</li>
                            <li>Saves it as an image you can use in presentations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
                          The Magic of Natural Language
                        </h4>
                        <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
                          Notice that both examples above use regular English sentences. You don't need to learn special commands or syntax. Just describe what you want as if you were asking a knowledgeable colleague for help. Claude understands context, can ask clarifying questions, and will iterate on your project until it's exactly what you want.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Working with Files</h3>

                  <p>
                    When Claude creates or edits files, it's working in whatever folder (directory) your terminal is currently in. This is why understanding <code className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-sm">cd</code> and <code className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-mono text-sm">pwd</code> from earlier is important.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-4">Best Practice: Create Project Folders</h4>
                    <p className="text-sm mb-3">Before starting a new project, create a dedicated folder for it:</p>
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto text-sm mb-3">
{`# Create a folder for your project
mkdir coffee-history-site

# Move into that folder
cd coffee-history-site

# Now start Claude
claude`}
                    </pre>
                    <p className="text-sm text-muted-foreground mb-0">
                      This keeps your projects organized. All the files Claude creates will go into this folder, and you can easily find them later.
                    </p>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Opening Files in VS Code</h3>

                  <p>
                    To view and edit the files Claude creates, you can open them in VS Code:
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-4">Two Ways to Open Files</h4>

                    <div className="space-y-4 text-sm">
                      <div>
                        <strong className="block mb-1">Method 1: From the Terminal</strong>
                        <p className="text-muted-foreground mb-2">While in your project folder, type:</p>
                        <pre className="bg-slate-900 text-slate-100 p-3 rounded-md overflow-x-auto mb-0">
                          <code className="text-sm font-mono">code .</code>
                        </pre>
                        <p className="text-muted-foreground mt-2 mb-0">The dot (.) means "open the current folder." VS Code will launch and show all your project files.</p>
                      </div>

                      <div>
                        <strong className="block mb-1">Method 2: From VS Code</strong>
                        <p className="text-muted-foreground mb-0">Open VS Code, click File → Open Folder, then navigate to your project folder and click "Open."</p>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="starter-project-1">Starter Project 1: Literary Text Analyzer</HeadingAnchor>

                  <p>
                    Now let's build something useful: a tool that analyzes literary texts. This project will count words, find the most frequent terms, and identify interesting patterns—the kind of analysis that's useful for close reading or digital humanities research.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">What You'll Build</h3>

                  <p>
                    A simple web-based tool where you can:
                  </p>

                  <ul>
                    <li>Paste in a passage from a novel, poem, or historical document</li>
                    <li>See word frequency analysis</li>
                    <li>Identify the most common words (excluding common words like "the" and "a")</li>
                    <li>Get basic statistics (total words, unique words, average word length)</li>
                    <li>View results in a clean, readable format</li>
                  </ul>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Step-by-Step Instructions</h3>

                  <div className="my-6 space-y-6">
                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">
                        Step 1: Create Your Project Folder
                      </h4>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto mb-0">
{`mkdir text-analyzer
cd text-analyzer
claude`}
                      </pre>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">
                        Step 2: Tell Claude What You Want
                      </h4>
                      <p className="text-sm mb-3">When Claude starts, type this (or something similar in your own words):</p>
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border-l-2 border-blue-600">
                        <p className="text-sm mb-0">
                          "I want to create a literary text analyzer tool. It should be a simple web page where I can paste in text from a book or poem, and it will show me: 1) total word count, 2) number of unique words, 3) the 20 most frequently used words (excluding common words like 'the', 'a', 'an', etc.), and 4) average word length. Make it look clean and academic, like a tool you'd use for research. Use soft colors and a readable font."
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">
                        Step 3: Review What Claude Creates
                      </h4>
                      <p className="text-sm mb-3">Claude will create an HTML file with embedded JavaScript. It will explain what it created and how to use it. You can ask questions like:</p>
                      <ul className="text-sm space-y-1 pl-5 mb-0">
                        <li>"Can you make the text box bigger?"</li>
                        <li>"Can you also highlight words that appear more than 10 times?"</li>
                        <li>"Can you export the results as a CSV file?"</li>
                      </ul>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">
                        Step 4: Open and Test Your Tool
                      </h4>
                      <p className="text-sm mb-3">Claude will tell you how to open the file. Usually it's:</p>
                      <ul className="text-sm space-y-1 pl-5 mb-0">
                        <li>Find the HTML file in your project folder</li>
                        <li>Double-click it to open in your web browser</li>
                        <li>Try pasting in a passage from your favorite book</li>
                      </ul>
                    </div>
                  </div>

                  <div className="my-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                          Congratulations!
                        </h4>
                        <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-0">
                          You just built a working digital humanities tool without writing a single line of code yourself. This is the power of Claude Code: you focus on what you want the tool to do, and Claude handles the implementation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Ways to Extend This Project</h3>

                  <p>
                    Once you have the basic tool working, you can ask Claude to add more features:
                  </p>

                  <ul>
                    <li><strong>Sentiment analysis:</strong> "Can you add sentiment analysis to show whether the text is generally positive or negative?"</li>
                    <li><strong>Readability scores:</strong> "Can you calculate the Flesch-Kincaid readability level?"</li>
                    <li><strong>Compare texts:</strong> "Can I paste in two different texts and compare their word frequencies side by side?"</li>
                    <li><strong>Historical language:</strong> "Can you flag archaic or outdated words that might need footnotes for modern readers?"</li>
                    <li><strong>Save results:</strong> "Can I download the analysis as a PDF for my research notes?"</li>
                  </ul>

                  <HeadingAnchor id="starter-project-2">Starter Project 2: Interactive Historical Timeline</HeadingAnchor>

                  <p>
                    For the second project, let's create something more visual: an interactive timeline where you can add historical events, see them displayed chronologically, and click on events to read more details.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">What You'll Build</h3>

                  <p>
                    An interactive timeline that:
                  </p>

                  <ul>
                    <li>Displays events in chronological order</li>
                    <li>Lets you click on events to see detailed descriptions</li>
                    <li>Includes dates, titles, and descriptions for each event</li>
                    <li>Categorizes events by type (political, cultural, scientific, etc.)</li>
                    <li>Uses color-coding for different categories</li>
                    <li>Is easily customizable for different historical periods or topics</li>
                  </ul>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Step-by-Step Instructions</h3>

                  <div className="my-6 space-y-6">
                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">
                        Step 1: Set Up Your Project
                      </h4>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-md overflow-x-auto mb-0">
{`mkdir history-timeline
cd history-timeline
claude`}
                      </pre>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">
                        Step 2: Describe Your Timeline
                      </h4>
                      <p className="text-sm mb-3">Here's an example prompt (customize it for your own topic):</p>
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border-l-2 border-blue-600">
                        <p className="text-sm mb-0">
                          "Create an interactive timeline for the Scientific Revolution (1500-1700). I want to display major discoveries and publications. Each event should have: a year, a title, a brief description, and a category (astronomy, physics, biology, medicine, mathematics). Display events chronologically with color-coding by category. When I click an event, it should expand to show the full description. Make it visually appealing with a clean, academic design. Start with 10-15 key events like Copernicus's heliocentric model, Galileo's telescope observations, Newton's Principia, Harvey's circulation of blood, etc."
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">
                        Step 3: Customize the Content
                      </h4>
                      <p className="text-sm mb-3">After Claude creates the timeline, you can easily customize it:</p>
                      <ul className="text-sm space-y-2 mb-0 pl-5">
                        <li>"Add an event for Vesalius's anatomy book in 1543"</li>
                        <li>"Change the color scheme to use earth tones"</li>
                        <li>"Add images for each event" (Claude can help you find public domain images)</li>
                        <li>"Make it so I can filter events by category"</li>
                        <li>"Add a search box to find specific events"</li>
                      </ul>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">
                        Step 4: Make It Your Own
                      </h4>
                      <p className="text-sm mb-3">The beauty of this project is how easily you can adapt it to different topics:</p>
                      <ul className="text-sm space-y-1 mb-0 pl-5">
                        <li><strong>Literary history:</strong> Major publications in 19th-century American literature</li>
                        <li><strong>Women's history:</strong> Key events in the women's suffrage movement</li>
                        <li><strong>Art history:</strong> Important works and movements from the Renaissance</li>
                        <li><strong>Course timeline:</strong> Reading schedule for your seminar</li>
                        <li><strong>Research timeline:</strong> Track the development of ideas in your dissertation</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Advanced Customizations</h3>

                  <p>
                    Once you're comfortable with the basics, try asking Claude for more sophisticated features:
                  </p>

                  <ul>
                    <li><strong>Data-driven approach:</strong> "Can you make it so I can edit events in a simple JSON or CSV file instead of editing the HTML?"</li>
                    <li><strong>Connections between events:</strong> "Can you draw lines connecting related events, like showing how one discovery led to another?"</li>
                    <li><strong>Multiple timelines:</strong> "Can I compare two parallel timelines, like European and Chinese scientific developments?"</li>
                    <li><strong>Export for presentations:</strong> "Can you make it easy to export this as images for a PowerPoint slide?"</li>
                    <li><strong>Student submissions:</strong> "Can students add their own events to the timeline?"</li>
                  </ul>

                  <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
                          Teaching Opportunity
                        </h4>
                        <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
                          This timeline tool works great as a class assignment. Have students research events and add them to the timeline, teaching both historical research skills and basic technical literacy. Since it's all in a simple file format, students can email you their additions, and you can merge them into a collaborative class timeline.
                        </p>
                      </div>
                    </div>
                  </div>

                  <HeadingAnchor id="alternatives">Alternative AI Coding Tools</HeadingAnchor>

                  <p>
                    Claude Code is just one option in a rapidly growing ecosystem of AI coding assistants. Here are some alternatives worth knowing about, each with different strengths:
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Google Antigravity</h3>

                  <p>
                    Announced in November 2025 alongside Google's Gemini 3 model, Antigravity is Google's entry into AI-assisted development. It's built as an "agent-first" platform.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Key Features</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      <li><strong>Visual IDE:</strong> Unlike Claude Code's terminal interface, Antigravity is a full graphical application (based on VS Code)</li>
                      <li><strong>Manager View:</strong> Coordinate multiple AI agents working on different parts of your project simultaneously</li>
                      <li><strong>Multiple models:</strong> Supports Google's Gemini models plus Claude and OpenAI models</li>
                      <li><strong>Free tier:</strong> Generous free usage limits with Gemini 3 Pro</li>
                    </ul>
                    <p className="text-sm mb-2"><strong>Best for:</strong> Visual learners who prefer graphical interfaces, or projects that need multiple agents working in parallel.</p>
                    <p className="text-sm mb-0"><strong>Note:</strong> As of November 2025, Antigravity is still in preview with some early bugs reported by users.</p>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">OpenAI Codex</h3>

                  <p>
                    OpenAI's coding assistant, launched in May 2025, is integrated directly into ChatGPT and powered by specialized coding models.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Key Features</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      <li><strong>Integrated workflow:</strong> Works within ChatGPT's familiar interface</li>
                      <li><strong>Sandboxed environment:</strong> Runs code in a secure cloud environment</li>
                      <li><strong>GitHub integration:</strong> Can directly access and work with your GitHub repositories</li>
                      <li><strong>Testing automation:</strong> Automatically runs tests until they pass</li>
                    </ul>
                    <p className="text-sm mb-2"><strong>Best for:</strong> Users already comfortable with ChatGPT, or those who want cloud-based development without local setup.</p>
                    <p className="text-sm mb-0"><strong>Requires:</strong> ChatGPT Plus subscription ($20/month).</p>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Cursor</h3>

                  <p>
                    One of the most popular AI coding tools, Cursor is a full IDE (like VS Code) with AI deeply integrated.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Key Features</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      <li><strong>Visual editing:</strong> Point and click to edit code, with AI assistance built in</li>
                      <li><strong>Tab completion:</strong> AI suggests code as you type (like autocomplete for programming)</li>
                      <li><strong>Composer mode:</strong> Natural language interface similar to Claude Code</li>
                      <li><strong>Multi-model support:</strong> Works with Claude, GPT-4, and other models</li>
                    </ul>
                    <p className="text-sm mb-2"><strong>Best for:</strong> Users who want a graphical interface with inline AI suggestions.</p>
                    <p className="text-sm mb-0"><strong>Pricing:</strong> $20/month for Pro plan with 500 premium requests.</p>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Windsurf</h3>

                  <p>
                    A newer alternative (from the makers of Codeium) positioning itself as a beginner-friendly option.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Key Features</h4>
                    <ul className="text-sm space-y-2 mb-4">
                      <li><strong>Clean interface:</strong> Designed to be less overwhelming for beginners</li>
                      <li><strong>Cascade mode:</strong> AI can autonomously run commands and make changes</li>
                      <li><strong>Lower price:</strong> $15/month vs competitors' $20/month</li>
                      <li><strong>Unlimited AI assistance:</strong> No request limits on certain plans</li>
                    </ul>
                    <p className="text-sm mb-0"><strong>Best for:</strong> Budget-conscious users or those who find Cursor overwhelming.</p>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Which Should You Choose?</h3>

                  <div className="my-6 p-5 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-3 text-amber-900 dark:text-amber-100">
                          Recommendations for Humanities Faculty
                        </h4>
                        <ul className="text-sm text-amber-900/80 dark:text-amber-100/80 space-y-2 mb-0 pl-5">
                          <li><strong>Start with Claude Code</strong> if you're comfortable with basic terminal use and want the most capable AI for complex projects</li>
                          <li><strong>Try Google Antigravity</strong> if you prefer visual interfaces and want to experiment with the newest technology (accepting some bugs)</li>
                          <li><strong>Consider Cursor or Windsurf</strong> if you plan to work extensively with code files and want inline suggestions as you edit</li>
                          <li><strong>Use OpenAI Codex</strong> if you're already a ChatGPT Plus subscriber and want the simplest possible setup</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p>
                    The good news: you're not locked into one choice. Many developers use multiple tools for different tasks. You might use Claude Code for building new projects, then switch to Cursor when fine-tuning the code. Experiment and see what fits your workflow.
                  </p>

                  <HeadingAnchor id="next-steps">What's Next?</HeadingAnchor>

                  <p>
                    You now have the foundation to start building your own AI-powered tools for teaching and research. Here are some directions to explore:
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Expand Your Skills</h3>

                  <ul>
                    <li><strong>Learn basic HTML/CSS:</strong> Even a little knowledge helps you customize tools more precisely. Ask Claude, "Can you teach me the basics of HTML?" and it will create a tutorial for you.</li>
                    <li><strong>Explore data formats:</strong> Understanding JSON and CSV files opens up more possibilities for data-driven projects.</li>
                    <li><strong>Try version control:</strong> Learn Git to track changes and collaborate with others (Claude can teach you this too).</li>
                  </ul>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Build More Complex Projects</h3>

                  <p>
                    Here are some ideas for intermediate projects:
                  </p>

                  <ul>
                    <li><strong>Primary source annotator:</strong> Upload historical documents and add contextual annotations that appear on hover</li>
                    <li><strong>Citation formatter:</strong> A tool that converts citations between MLA, Chicago, and other formats</li>
                    <li><strong>Student research database:</strong> A simple interface for students to submit and browse research topics</li>
                    <li><strong>Interactive maps:</strong> Plot historical events or literary settings on an interactive map</li>
                    <li><strong>Reading tracker:</strong> Help students track their reading progress through a long text with notes and questions</li>
                  </ul>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Explore Other Guides</h3>

                  <p>
                    Check out the other guides on this site for more specific applications:
                  </p>

                  <ul>
                    <li>
                      <Link href="/guides/building-simulations" className="text-primary hover:underline">
                        Building Historical Simulations
                      </Link>
                      {' '}— Create interactive role-playing experiences for students
                    </li>
                    <li>
                      <Link href="/guides/ai-assignments" className="text-primary hover:underline">
                        Designing AI Assignments
                      </Link>
                      {' '}— Best practices for incorporating AI into coursework
                    </li>
                    <li>
                      <Link href="/guides/prompt-engineering" className="text-primary hover:underline">
                        Prompt Engineering for Humanities
                      </Link>
                      {' '}— Advanced techniques for getting better results from AI
                    </li>
                    <li>
                      <Link href="/guides/research-workflows" className="text-primary hover:underline">
                        AI for Research Workflows
                      </Link>
                      {' '}— Using AI for translation, data analysis, and more
                    </li>
                  </ul>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Join the Community</h3>

                  <p>
                    You're part of a growing community of humanities scholars experimenting with these tools:
                  </p>

                  <ul>
                    <li>
                      <Link href="/projects" className="text-primary hover:underline">
                        Browse the project gallery
                      </Link>
                      {' '}to see what others have built
                    </li>
                    <li>
                      <Link href="/blog" className="text-primary hover:underline">
                        Read the blog
                      </Link>
                      {' '}for ongoing discussions about AI in humanities education
                    </li>
                    <li>Share your own projects—<a href="mailto:bbreen@ucsc.edu" className="text-primary hover:underline">get in touch</a> if you build something interesting</li>
                  </ul>

                  <div className="my-12 p-6 bg-muted rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Remember</h3>
                    <p className="mb-0">
                      The goal isn't to become a professional software developer—it's to have enough technical capability to bring your pedagogical and scholarly ideas to life. Claude Code and similar tools make this possible without years of programming study. Start small, experiment freely, and don't be afraid to ask Claude for help when you get stuck. Every expert was once a beginner, and AI coding assistants are leveling the playing field in remarkable ways.
                    </p>
                  </div>

                  <div className="mt-12 pt-8 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong>Guide last updated:</strong> November 2025
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This guide is maintained as part of the THINK project at UC Santa Cruz, with support from the National Endowment for the Humanities. We welcome feedback and suggestions—please{' '}
                      <a href="mailto:bbreen@ucsc.edu" className="text-primary hover:underline">
                        get in touch
                      </a>
                      {' '}if you have ideas for improvements.
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
