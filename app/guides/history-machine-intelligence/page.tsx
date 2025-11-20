import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Lightbulb, BookOpen, ExternalLink, Calendar } from 'lucide-react'

export default function HistoryMachineIntelligenceGuide() {
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
                  <a href="#early-mechanist" className="block text-foreground/70 hover:text-primary transition-colors">
                    Early Mechanist Philosophy
                  </a>
                  <a href="#computing-pioneers" className="block text-foreground/70 hover:text-primary transition-colors">
                    Computing Pioneers
                  </a>
                  <a href="#information-theory" className="block text-foreground/70 hover:text-primary transition-colors">
                    Information Theory & Cybernetics
                  </a>
                  <a href="#birth-ai" className="block text-foreground/70 hover:text-primary transition-colors">
                    The Birth of AI
                  </a>
                  <a href="#critical-voices" className="block text-foreground/70 hover:text-primary transition-colors">
                    Critical Voices
                  </a>
                  <a href="#digital-humanities" className="block text-foreground/70 hover:text-primary transition-colors">
                    Digital Humanities Foundations
                  </a>
                  <a href="#contemporary-theory" className="block text-foreground/70 hover:text-primary transition-colors">
                    Contemporary Theory
                  </a>
                  <a href="#teaching" className="block text-foreground/70 hover:text-primary transition-colors">
                    Teaching This History
                  </a>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-serif font-bold mb-4">
                  A History of Machine Intelligence
                </h1>
                <p className="text-xl text-muted-foreground mb-12">
                  From 18th-century mechanist philosophy to contemporary AI—a humanities perspective on the long history of thinking machines
                </p>

                <div className="prose prose-lg max-w-none">
                  <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-amber-900 dark:text-amber-100">
                          Why This Matters
                        </h4>
                        <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-0">
                          Today's debates about AI didn't emerge from nowhere. Questions about machine intelligence, consciousness, automation, and the boundaries between human and machine have preoccupied thinkers for centuries. Understanding this longer history helps us critically evaluate contemporary claims and recognize patterns in how societies respond to new technologies.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 id="intro" className="font-serif scroll-mt-24">Introduction: The Long History of "Thinking Machines"</h2>

                  <p>
                    When we talk about artificial intelligence in 2025, we often treat it as radically new—a technology
                    that emerged fully formed in the 2010s with deep learning breakthroughs. But the conceptual foundations
                    of machine intelligence stretch back centuries. Philosophers, mathematicians, writers, and scientists
                    have long asked: Can machines think? What is intelligence? Where does the human end and the machine begin?
                  </p>

                  <p>
                    This guide traces the intellectual history of machine intelligence from the Enlightenment to the present,
                    highlighting key thinkers, texts, and debates. It's organized chronologically but emphasizes recurring themes:
                  </p>

                  <ul>
                    <li><strong>Mechanism vs. vitalism:</strong> Are humans fundamentally machines, or is there something irreducibly special about biological life and consciousness?</li>
                    <li><strong>Augmentation vs. automation:</strong> Should technology extend human capabilities or replace human labor and judgment?</li>
                    <li><strong>Classification and representation:</strong> How do we represent knowledge computationally, and what gets lost in translation?</li>
                    <li><strong>Power and control:</strong> Who builds these systems, whose knowledge they encode, and what social arrangements they reinforce or challenge?</li>
                  </ul>

                  {/* Timeline Graphic */}
                  <div className="my-12 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h3 className="font-sans text-xl font-semibold mb-6 text-center">Timeline: Key Moments in Machine Intelligence</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-20 text-right">
                          <span className="text-sm font-bold text-primary">1747</span>
                        </div>
                        <div className="flex-1 border-l-2 border-primary/30 pl-4 pb-4">
                          <p className="text-sm font-semibold mb-1">La Mettrie: <em>Man a Machine</em></p>
                          <p className="text-xs text-muted-foreground">Early mechanist materialism</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-20 text-right">
                          <span className="text-sm font-bold text-primary">1843</span>
                        </div>
                        <div className="flex-1 border-l-2 border-primary/30 pl-4 pb-4">
                          <p className="text-sm font-semibold mb-1">Ada Lovelace's notes on Babbage's Analytical Engine</p>
                          <p className="text-xs text-muted-foreground">First computer algorithm</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-20 text-right">
                          <span className="text-sm font-bold text-primary">1948</span>
                        </div>
                        <div className="flex-1 border-l-2 border-primary/30 pl-4 pb-4">
                          <p className="text-sm font-semibold mb-1">Shannon & Wiener publish foundations of information theory & cybernetics</p>
                          <p className="text-xs text-muted-foreground">Communication as information transfer</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-20 text-right">
                          <span className="text-sm font-bold text-primary">1950</span>
                        </div>
                        <div className="flex-1 border-l-2 border-primary/30 pl-4 pb-4">
                          <p className="text-sm font-semibold mb-1">Turing: "Computing Machinery and Intelligence"</p>
                          <p className="text-xs text-muted-foreground">The Turing Test</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-20 text-right">
                          <span className="text-sm font-bold text-primary">1956</span>
                        </div>
                        <div className="flex-1 border-l-2 border-primary/30 pl-4 pb-4">
                          <p className="text-sm font-semibold mb-1">Dartmouth Conference</p>
                          <p className="text-xs text-muted-foreground">"Artificial Intelligence" coined</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-20 text-right">
                          <span className="text-sm font-bold text-primary">1976</span>
                        </div>
                        <div className="flex-1 border-l-2 border-primary/30 pl-4 pb-4">
                          <p className="text-sm font-semibold mb-1">Weizenbaum: <em>Computer Power and Human Reason</em></p>
                          <p className="text-xs text-muted-foreground">Critique from ELIZA's creator</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-20 text-right">
                          <span className="text-sm font-bold text-primary">1985</span>
                        </div>
                        <div className="flex-1 border-l-2 border-primary/30 pl-4 pb-4">
                          <p className="text-sm font-semibold mb-1">Haraway: "A Cyborg Manifesto"</p>
                          <p className="text-xs text-muted-foreground">Feminist posthuman theory</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-20 text-right">
                          <span className="text-sm font-bold text-primary">2017</span>
                        </div>
                        <div className="flex-1 border-l-2 border-primary/30 pl-4 pb-4">
                          <p className="text-sm font-semibold mb-1">Transformer architecture introduced</p>
                          <p className="text-xs text-muted-foreground">Foundation for modern LLMs</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 id="early-mechanist" className="font-serif scroll-mt-24">Early Mechanist Philosophy (1747-1879)</h2>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">La Mettrie's Radical Materialism (1747)</h3>

                  <p>
                    The modern conversation about machine intelligence arguably begins with <strong>Julien Offray de La Mettrie's</strong> scandalous
                    treatise{' '}
                    <a href="https://www.earlymoderntexts.com/assets/pdfs/lamettrie1748.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      <em>Man a Machine</em> (1747)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    . La Mettrie, a French physician and philosopher, argued that humans are nothing more than complex machines—assemblages
                    of matter governed entirely by mechanical principles.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Key Quote from La Mettrie
                    </h4>
                    <blockquote className="text-sm italic border-l-4 border-primary pl-4 mb-0">
                      "The human body is a machine which winds its own springs. It is the living image of perpetual motion...
                      Let us then conclude boldly that man is a machine, and that in the whole universe there is but a single
                      substance differently modified."
                    </blockquote>
                  </div>

                  <p>
                    This was radical in 1747. La Mettrie denied the existence of an immaterial soul, arguing consciousness emerges
                    from material processes in the brain. His work was condemned, banned, and burned—yet it anticipated debates about
                    consciousness, determinism, and artificial intelligence by nearly three centuries.
                  </p>

                  <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
                          Teaching Opportunity
                        </h4>
                        <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
                          Ask students: If La Mettrie is right and humans are machines, does that mean machines can become human?
                          Or does it mean "human" and "machine" aren't meaningful categories? This helps students see how
                          conceptual frameworks shape technological debates.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">William James on Consciousness (1879)</h3>

                  <p>
                    More than a century later, philosopher and psychologist <strong>William James</strong> took up the question directly in{' '}
                    <a href="https://archive.org/details/jstor-2246397" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      "Are We Automata?" (1879)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    . James examined whether humans possess genuine consciousness and free will, or whether we're merely
                    sophisticated automata responding mechanically to stimuli.
                  </p>

                  <p>
                    James ultimately argued for the reality of consciousness as something irreducible to mechanics—but he took
                    the automaton theory seriously enough to engage with it philosophically. This debate continues today: Are large
                    language models "conscious" in any meaningful sense? Do they "understand" language, or merely process patterns?
                  </p>

                  <h2 id="computing-pioneers" className="font-serif scroll-mt-24">Computing Pioneers (1843-1909)</h2>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Ada Lovelace and the First Algorithm (1843)</h3>

                  <p>
                    <strong>Ada Lovelace's</strong>{' '}
                    <a href="https://www.computerhistory.org/babbage/adalovelace/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      notes on Charles Babbage's Analytical Engine (1843)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}are often cited as containing the first computer algorithm. But Lovelace did more than describe how to calculate
                    Bernoulli numbers—she theorized about the engine's potential to manipulate symbols beyond mathematics.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Lovelace's Vision</h4>
                    <p className="text-sm mb-3">
                      In Note G, Lovelace speculated that the Analytical Engine could compose music, produce graphics, and process
                      any content that could be expressed in symbolic relationships. She wrote:
                    </p>
                    <blockquote className="text-sm italic border-l-4 border-primary pl-4 mb-0">
                      "The engine might compose elaborate and scientific pieces of music of any degree of complexity or extent."
                    </blockquote>
                  </div>

                  <p>
                    Yet Lovelace also set limits. She famously stated that the Analytical Engine "has no pretensions whatever to
                    <em>originate</em> anything. It can do whatever we <em>know how to order it</em> to perform." This raises
                    questions still debated today: Can AI be truly creative? Or is all computation merely sophisticated recombination
                    of programmed instructions?
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Butler's Machine Evolution (1863)</h3>

                  <p>
                    In a remarkable satirical essay,{' '}
                    <a href="https://www.gutenberg.org/files/1906/1906-h/1906-h.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      "Darwin Among the Machines" (1863)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    , novelist <strong>Samuel Butler</strong> applied Darwinian evolution to technology. Butler speculated that machines
                    might evolve consciousness and eventually supplant humanity as the dominant form of life on Earth.
                  </p>

                  <p>
                    Writing just four years after Darwin's <em>Origin of Species</em>, Butler asked: If natural selection produces
                    intelligence in biological organisms, might artificial selection (technological development) produce intelligence
                    in machines? This proto-science-fiction vision presaged contemporary fears about superintelligent AI.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Forster's Dystopia (1909)</h3>

                  <p>
                    E.M. Forster's short story{' '}
                    <a href="https://www.cs.ucdavis.edu/~koehl/Teaching/ECS188/PDF_files/Machine_stops.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      "The Machine Stops" (1909)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}imagined a future where humanity lives underground, entirely dependent on an omnipresent Machine that provides
                    all needs. People communicate only through screens, never meeting face-to-face. Physical experience is considered crude
                    and primitive.
                  </p>

                  <p>
                    When the Machine begins to malfunction and eventually stops, civilization collapses. Forster's story is eerily prescient
                    about digital isolation, algorithmic dependence, and the fragility of complex technological systems. It remains
                    remarkably relevant for discussing contemporary AI infrastructure and platform dependence.
                  </p>

                  <h2 id="information-theory" className="font-serif scroll-mt-24">Information Theory & Cybernetics (1945-1950)</h2>

                  <p>
                    The period from 1945-1950 saw an explosion of foundational work that made modern computing—and eventually AI—possible.
                    These wartime and postwar innovations emerged from defense research but had profound philosophical implications.
                  </p>

                  <div className="my-8 overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800">
                          <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Year</th>
                          <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Author</th>
                          <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Work</th>
                          <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-sans text-sm font-semibold">Key Contribution</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">1945</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Vannevar Bush</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">
                            <a href="https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                              "As We May Think"
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Proposed memex, proto-hypertext system for knowledge management</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">1948</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Claude Shannon</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">
                            <a href="https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                              "A Mathematical Theory of Communication"
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Founded information theory; defined information as reduction of uncertainty</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">1948</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Norbert Wiener</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">
                            <a href="https://archive.org/details/cybernetics-or-communication-and-control-in-the-animal-and-the-machine-norbert-wiene-ocr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                              <em>Cybernetics</em>
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Developed theory of feedback and control systems across organisms and machines</td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">1950</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Norbert Wiener</td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">
                            <a href="https://monoskop.org/images/6/60/Wiener_Norbert_The_Human_Use_of_Human_Beings_1989.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                              <em>The Human Use of Human Beings</em>
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </td>
                          <td className="border border-slate-300 dark:border-slate-700 px-4 py-2">Accessible version warning about automation's impact on labor and dignity</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Shannon's Information Theory</h3>

                  <p>
                    <strong>Claude Shannon's</strong> 1948 paper fundamentally reconceived communication. Rather than focusing on meaning,
                    Shannon defined <strong>information</strong> mathematically as the reduction of uncertainty. A message conveys information
                    proportional to how much it narrows the range of possible states.
                  </p>

                  <p>
                    This abstraction was powerful—it allowed engineers to optimize communication channels without worrying about semantics.
                    But it also introduced a paradigm shift: treating information as separable from meaning. This has profound implications
                    for how LLMs work today: they process statistical patterns in language, not semantic meaning.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Wiener's Cybernetics and Its Critics</h3>

                  <p>
                    <strong>Norbert Wiener</strong> developed cybernetics as a unified theory of control and communication applicable to
                    both animals and machines. Cybernetics emphasized feedback loops: systems that self-regulate by monitoring their own
                    outputs and adjusting behavior accordingly.
                  </p>

                  <p>
                    But Wiener was no techno-optimist. In <em>The Human Use of Human Beings</em> (1950), he warned that automation could
                    devalue human labor and threaten human dignity. He wrote presciently about algorithmic control and the need to ensure
                    technology serves human flourishing rather than replacing human judgment.
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <h4 className="font-sans text-base font-semibold mt-0 mb-3">Wiener's Warning</h4>
                    <blockquote className="text-sm italic border-l-4 border-primary pl-4 mb-0">
                      "The automatic machine... is the precise economic equivalent of slave labor. Any labor which competes with
                      slave labor must accept the economic conditions of slave labor."
                    </blockquote>
                  </div>

                  <h2 id="birth-ai" className="font-serif scroll-mt-24">The Birth of Artificial Intelligence (1950-1962)</h2>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Turing's Imitation Game (1950)</h3>

                  <p>
                    Alan Turing's{' '}
                    <a href="https://academic.oup.com/mind/article-abstract/LIX/236/433/986238" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      "Computing Machinery and Intelligence" (1950)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}remains one of the most influential papers in AI history. Rather than asking "Can machines think?"—a question
                    he considered too vague—Turing proposed the <strong>imitation game</strong> (now called the Turing Test).
                  </p>

                  <p>
                    If a machine can converse indistinguishably from a human, should we attribute intelligence to it? Turing's pragmatic
                    approach sidestepped metaphysical questions about consciousness in favor of behavioral criteria. This move was brilliant
                    but controversial—it defined intelligence operationally rather than essentially.
                  </p>

                  <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
                          Discussion Question
                        </h4>
                        <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
                          Modern LLMs can often pass the Turing Test in short conversations. Does this mean they're "intelligent"?
                          Or does it reveal limitations in the test itself? What does this tell us about how we define and recognize
                          intelligence?
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">The Dartmouth Conference (1956)</h3>

                  <p>
                    The term <strong>"artificial intelligence"</strong> was coined in a{' '}
                    <a href="https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      1955 proposal
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}for a summer research project at Dartmouth College. The proposal, authored by John McCarthy, Marvin Minsky,
                    Nathaniel Rochester, and Claude Shannon, optimistically predicted:
                  </p>

                  <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                    <blockquote className="text-sm italic border-l-4 border-primary pl-4 mb-0">
                      "We propose that a 2 month, 10 man study of artificial intelligence be carried out during the summer of 1956 at
                      Dartmouth College... The study is to proceed on the basis of the conjecture that every aspect of learning or any
                      other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it."
                    </blockquote>
                  </div>

                  <p>
                    This bold conjecture—that intelligence is entirely reducible to computational processes—remains hotly debated. The
                    1956 Dartmouth workshop didn't achieve its lofty goals, but it launched AI as a distinct research field and shaped
                    the discipline's core assumptions.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Engelbart's Augmentation (1962)</h3>

                  <p>
                    Not everyone embraced the automation paradigm. Douglas Engelbart's{' '}
                    <a href="https://www.dougengelbart.org/content/view/138" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      "Augmenting Human Intellect" (1962)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}proposed a different vision: computers as tools to <em>extend</em> human capabilities rather than replace human
                    workers. Engelbart envisioned interactive systems where humans and computers work in tight feedback loops, each doing
                    what they do best.
                  </p>

                  <p>
                    This <strong>augmentation vs. automation</strong> distinction remains crucial today. Are LLMs tools that augment human
                    writing and thinking, or systems that automate intellectual labor? The answer shapes how we design and deploy them.
                  </p>

                  <h2 id="critical-voices" className="font-serif scroll-mt-24">Critical Voices (1954-1985)</h2>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Heidegger on Technology (1954)</h3>

                  <p>
                    Philosopher Martin Heidegger's{' '}
                    <a href="https://monoskop.org/images/4/44/Heidegger_Martin_The_Question_Concerning_Technology_and_Other_Essays.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      "The Question Concerning Technology" (1954)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}offered a profound critique. Heidegger argued that modern technology's essence is <strong>"enframing"</strong>
                    (Gestell)—a mode of revealing that transforms everything into "standing-reserve," resources to be optimized and exploited.
                  </p>

                  <p>
                    Under enframing, forests become "timber reserves," rivers become "hydroelectric power sources," and eventually humans
                    become "human resources." Technology isn't neutral; it shapes how we see and relate to the world. This perspective
                    helps explain concerns about AI reducing human creativity and knowledge to training data.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Weizenbaum's Limits (1976)</h3>

                  <p>
                    Joseph Weizenbaum created ELIZA, an early chatbot that surprised users with seemingly empathetic responses. But in{' '}
                    <a href="https://archive.org/details/computerpowerhum0000weiz_v0i3" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      <em>Computer Power and Human Reason</em> (1976)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    , Weizenbaum argued that computers should <em>never</em> make decisions requiring human wisdom, judgment, and compassion—no
                    matter how sophisticated they become.
                  </p>

                  <p>
                    Weizenbaum was disturbed that people formed emotional attachments to ELIZA, treating a simple pattern-matcher as if it
                    understood them. He warned against delegating moral decisions to machines, distinguishing between <strong>deciding</strong>
                    (which computers can do) and <strong>choosing</strong> (which requires ethical judgment computers lack).
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Haraway's Cyborg Politics (1985)</h3>

                  <p>
                    Donna Haraway's{' '}
                    <a href="https://theanarchistlibrary.org/library/donna-haraway-a-cyborg-manifesto" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      "A Cyborg Manifesto" (1985)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}took a radically different approach. Rather than lamenting the blurring of human/machine boundaries, Haraway
                    embraced the cyborg as a liberatory figure—one that transgresses dualisms (nature/culture, male/female, organism/machine)
                    and enables new forms of identity and politics.
                  </p>

                  <p>
                    Haraway's feminist posthumanism challenges essentialist notions of "human nature" and asks: What political possibilities
                    emerge when we acknowledge our entanglement with technology? This perspective remains influential in critical AI studies
                    and digital humanities.
                  </p>

                  <h2 id="digital-humanities" className="font-serif scroll-mt-24">Digital Humanities Foundations (1942-1991)</h2>

                  <p>
                    While AI researchers pursued intelligent machines, humanists began theorizing computational approaches to texts,
                    knowledge, and culture. These parallel developments are now converging in AI-enabled humanities research.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Borges on Classification (1942)</h3>

                  <p>
                    Jorge Luis Borges's{' '}
                    <a href="https://www.alamut.com/subj/artiface/language/johnWilkins.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      "The Analytical Language of John Wilkins" (1942)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}exposed the arbitrariness of classification systems through a fictional Chinese encyclopedia that supposedly divides
                    animals into categories like "belonging to the Emperor," "embalmed," "suckling pigs," and "having just broken the water pitcher."
                  </p>

                  <p>
                    This satire reveals a deep truth: all classification systems embed cultural assumptions and power structures. When we
                    build knowledge graphs or train AI models on categorized data, we inherit and amplify these arbitrary distinctions.
                    What seems like neutral information structure is actually laden with ideology.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Bush and Nelson on Hypertext</h3>

                  <p>
                    Vannevar Bush's memex (1945) and Ted Nelson's{' '}
                    <a href="https://www.eastgate.com/catalog/LiteraryMachines.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      <em>Literary Machines</em> (1981)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}envisioned non-linear, associative knowledge systems. These ideas influenced the World Wide Web but also anticipated
                    how LLMs traverse vast textual networks, making connections across documents.
                  </p>

                  <p>
                    However, Nelson's vision emphasized <strong>transclusion</strong>—maintaining connections to source materials—while LLMs
                    sever these connections, producing outputs divorced from their training data. This creates attribution and provenance problems
                    that hypertext pioneers tried to solve.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">McGann's Textual Networks (1991)</h3>

                  <p>
                    Jerome McGann's{' '}
                    <a href="https://press.princeton.edu/books/paperback/9780691015187/the-textual-condition" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      <em>The Textual Condition</em> (1991)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}argued that texts aren't stable objects but networks of linguistic and bibliographic codes. Meaning emerges from
                    relationships between versions, editions, and material forms.
                  </p>

                  <p>
                    This has implications for AI and textuality: When LLMs generate text, what's lost by detaching language from its
                    material and social conditions? Can computational models capture what McGann called "radial reading"—the movement
                    across textual networks that constitutes interpretation?
                  </p>

                  <h2 id="contemporary-theory" className="font-serif scroll-mt-24">Contemporary Critical Theory (1999-Present)</h2>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Classification and Power (1999)</h3>

                  <p>
                    Geoffrey Bowker and Susan Leigh Star's{' '}
                    <a href="https://direct.mit.edu/books/monograph/4738/Sorting-Things-OutClassification-and-Its" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      <em>Sorting Things Out</em> (1999)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}demonstrated how classification systems are never neutral. They examined medical diagnosis codes, racial
                    categories, and library systems, showing how classifications create administrative realities that shape lived experience.
                  </p>

                  <p>
                    This is crucial for understanding AI: Training datasets are massive classification exercises. What gets labeled as
                    "toxic," "professional," or "high-quality" reflects embedded values. These classifications then shape what AI systems
                    produce and reward.
                  </p>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Posthuman Information (1999)</h3>

                  <p>
                    N. Katherine Hayles's{' '}
                    <a href="https://press.uchicago.edu/ucp/books/book/chicago/H/bo3773810.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      <em>How We Became Posthuman</em> (1999)
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    {' '}traced how cybernetics constructed information as an entity independent of material embodiment. Shannon's information
                    theory, Wiener's cybernetics, and early AI all treated information as pattern divorced from substrate.
                  </p>

                  <p>
                    Hayles argued this construction of "disembodied information" enabled fantasies of uploading consciousness and transcending
                    the body—fantasies that erase the material conditions and embodied perspectives that make us human. Contemporary AI discourse
                    often repeats this erasure, treating intelligence as abstract computation.
                  </p>

                  <h2 id="teaching" className="font-serif scroll-mt-24">Teaching This History</h2>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Why Historical Context Matters</h3>

                  <p>
                    Teaching the history of machine intelligence helps students:
                  </p>

                  <ul>
                    <li><strong>Denaturalize current technologies:</strong> AI isn't inevitable or neutral—it emerged from specific historical
                    conditions and embodies particular assumptions about intelligence, labor, and humanity</li>
                    <li><strong>Recognize recurring patterns:</strong> Many "new" AI debates recapitulate older controversies about automation,
                    consciousness, and technological determinism</li>
                    <li><strong>Develop critical frameworks:</strong> Historical thinkers provide conceptual resources for evaluating contemporary
                    claims about AI capabilities and limitations</li>
                    <li><strong>Appreciate humanities contributions:</strong> Philosophers, literary critics, and historians have long shaped
                    how we think about technology—this isn't just an engineering story</li>
                  </ul>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Suggested Assignments</h3>

                  <div className="my-6 space-y-4">
                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">Assignment 1: Dialogue Across Time</h4>
                      <p className="text-sm mb-0">
                        Have students write an imagined conversation between two thinkers from different eras (e.g., La Mettrie and Weizenbaum,
                        Turing and Haraway) discussing a contemporary AI issue. This helps them understand how historical frameworks apply to
                        current debates.
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">Assignment 2: Annotated Timeline</h4>
                      <p className="text-sm mb-0">
                        Students create an annotated timeline connecting historical primary sources to contemporary AI developments. They identify
                        which historical debates are most relevant to understanding specific current controversies (e.g., AI art and Benjamin on
                        mechanical reproduction).
                      </p>
                    </div>

                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                      <h4 className="font-sans text-base font-semibold mt-0 mb-3">Assignment 3: Critical Source Analysis</h4>
                      <p className="text-sm mb-0">
                        Choose one historical primary source and have students: (1) summarize its main argument, (2) identify its assumptions about
                        intelligence/consciousness/automation, (3) evaluate its relevance to contemporary AI, and (4) critique its limitations or
                        blindspots.
                      </p>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Connecting to Primary Sources</h3>

                  <p>
                    All the texts discussed in this guide are available through our{' '}
                    <Link href="/resources" className="text-primary hover:underline">
                      Historical Resources page
                    </Link>
                    . Many are public domain and can be freely shared with students. We recommend:
                  </p>

                  <ul>
                    <li>Starting with accessible pieces like Forster's "The Machine Stops" (short story, very readable)</li>
                    <li>Pairing technical works (Shannon, Turing) with critical responses (Weizenbaum, Hayles)</li>
                    <li>Using brief excerpts rather than full books for most readings</li>
                    <li>Having students find contemporary parallels to historical arguments</li>
                  </ul>

                  <div className="my-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-600 rounded-r-lg">
                    <div className="flex gap-3">
                      <BookOpen className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-emerald-900 dark:text-emerald-100">
                          Further Reading
                        </h4>
                        <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80 mb-3">
                          For additional context and contemporary critical perspectives, explore our full{' '}
                          <Link href="/resources" className="underline">resources collection</Link>, which includes recent scholarship on:
                        </p>
                        <ul className="text-sm text-emerald-900/80 dark:text-emerald-100/80 space-y-1 mb-0 pl-5">
                          <li>AI ethics and bias</li>
                          <li>Data politics and labor</li>
                          <li>Environmental impacts of AI</li>
                          <li>Critical algorithm studies</li>
                          <li>Digital humanities methodology</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Conclusion: History as Critical Method</h3>

                  <p>
                    The history of machine intelligence isn't just background for understanding today's AI. It's a <strong>critical method</strong>—a
                    way of defamiliarizing current technologies by placing them in longer trajectories of thought.
                  </p>

                  <p>
                    When tech companies claim their AI is "revolutionary" or "unprecedented," historical knowledge provides perspective. When
                    debates rage about whether LLMs "truly understand" language, we can draw on centuries of philosophy about meaning, consciousness,
                    and mechanism. When concerns arise about AI replacing human workers, we can learn from earlier automation debates and their
                    outcomes.
                  </p>

                  <p>
                    This history reminds us that technologies don't determine their own uses. They're shaped by human choices, political struggles,
                    and cultural values. Understanding that history empowers us to make better choices about the AI systems we build and deploy today.
                  </p>

                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Related Guides</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href="/guides/prompt-engineering" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <h4 className="font-semibold mb-1 text-sm">Prompt Engineering for Humanities</h4>
                        <p className="text-xs text-muted-foreground">Apply historical understanding to building AI tools</p>
                      </Link>
                      <Link href="/guides/critical-pedagogy" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <h4 className="font-semibold mb-1 text-sm">Critical AI Pedagogy</h4>
                        <p className="text-xs text-muted-foreground">Teaching students to think critically about AI</p>
                      </Link>
                      <Link href="/resources" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <h4 className="font-semibold mb-1 text-sm">Historical Resources</h4>
                        <p className="text-xs text-muted-foreground">Access all primary sources discussed in this guide</p>
                      </Link>
                      <Link href="/guides/responsible-ai-classroom" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                        <h4 className="font-semibold mb-1 text-sm">Responsible AI Use</h4>
                        <p className="text-xs text-muted-foreground">Ethical frameworks for humanities classrooms</p>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong>Guide last updated:</strong> November 2025
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This guide draws on materials from THINK's{' '}
                      <Link href="/resources" className="text-primary hover:underline">
                        Historical Resources collection
                      </Link>
                      . All primary sources cited are freely available online. Suggestions for additional sources or corrections welcome—please{' '}
                      <a href="mailto:bbreen@ucsc.edu" className="text-primary hover:underline">
                        get in touch
                      </a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
