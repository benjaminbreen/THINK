'use client'

import { GuideLayout, WikiLink, GuideSectionDivider } from '@/components/ui/guide-layout'
import { HeadingAnchor } from '@/components/ui/heading-anchor'
import Link from 'next/link'
import { Lightbulb, AlertCircle, BookOpen, ExternalLink } from 'lucide-react'

const tableOfContents = [
  { id: 'intro', title: 'Introduction' },
  { id: 'mechanist', title: 'Mechanist Philosophy' },
  { id: 'prehistory', title: 'Prehistory of AI' },
  { id: 'information-age', title: 'Information Theory' },
  { id: 'birth-ai', title: 'Birth of AI' },
  { id: 'critical-voices', title: 'Critical Voices' },
  { id: 'teaching', title: 'Teaching This History' },
]

export default function HistoryMachineIntelligenceGuide() {
  return (
    <GuideLayout
      title="A History of Machine Intelligence"
      subtitle="From 18th-century mechanist philosophy to contemporary AI—a humanities perspective on thinking machines"
      guideId="history-machine-intelligence"
      thumbnailPath="/thumbnails/history-machine-intelligence.png"
      author={{
        name: 'Benjamin Breen',
        role: 'Principal Investigator, THINK',
      }}
      lastUpdated="November 2025"
      readingTime="20 min read"
      tableOfContents={tableOfContents}
    >
      <div className="my-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 rounded-r-lg">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-amber-900 dark:text-amber-100">
              Why This Matters
            </h4>
            <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-0">
              Today's AI debates aren't new. Questions about machine intelligence, consciousness, and automation have preoccupied thinkers for centuries. Understanding this history helps us critically evaluate contemporary claims and recognize patterns in how societies respond to new technologies.
            </p>
          </div>
        </div>
      </div>

      <HeadingAnchor id="intro">Introduction: The Long History of "Thinking Machines"</HeadingAnchor>

      <p>
        When we talk about artificial intelligence in 2025, we often treat it as radically new. But the conceptual foundations stretch back centuries. Philosophers, mathematicians, and writers have long asked: Can machines think? What is intelligence? Where does the human end and the machine begin?
      </p>

      <p>
        This guide traces the intellectual history of machine intelligence from the <WikiLink term="Age of Enlightenment">Enlightenment</WikiLink> to the present, emphasizing recurring themes:
      </p>

      <ul>
        <li><strong>Mechanism vs. vitalism:</strong> Are humans fundamentally machines, or is consciousness irreducibly special?</li>
        <li><strong>Augmentation vs. automation:</strong> Should technology extend human capabilities or replace human labor?</li>
        <li><strong>Classification and power:</strong> Who builds these systems, and whose knowledge do they encode?</li>
      </ul>

      {/* Timeline */}
      <div className="my-12 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <h3 className="font-sans text-xl font-semibold mb-6 text-center">Key Moments in Machine Intelligence</h3>
        <div className="space-y-3 text-sm">
          <div className="flex gap-4"><span className="font-bold text-primary w-16">1747</span><span><WikiLink term="Julien Offray de La Mettrie">La Mettrie</WikiLink>: <em>Man a Machine</em></span></div>
          <div className="flex gap-4"><span className="font-bold text-primary w-16">1843</span><span><WikiLink term="Ada Lovelace">Ada Lovelace's</WikiLink> notes on Babbage's engine</span></div>
          <div className="flex gap-4"><span className="font-bold text-primary w-16">1879</span><span><WikiLink term="William James">William James</WikiLink>: "Are We Automata?"</span></div>
          <div className="flex gap-4"><span className="font-bold text-primary w-16">1909</span><span><WikiLink term="E. M. Forster">E.M. Forster</WikiLink>: "The Machine Stops"</span></div>
          <div className="flex gap-4"><span className="font-bold text-primary w-16">1935</span><span><WikiLink term="Walter Benjamin">Walter Benjamin</WikiLink>: Mechanical Reproduction</span></div>
          <div className="flex gap-4"><span className="font-bold text-primary w-16">1948</span><span><WikiLink term="Claude Shannon">Claude Shannon</WikiLink> & <WikiLink term="Norbert Wiener">Norbert Wiener</WikiLink>: Information theory & cybernetics</span></div>
          <div className="flex gap-4"><span className="font-bold text-primary w-16">1950</span><span><WikiLink term="Alan Turing">Alan Turing</WikiLink>: The Turing Test</span></div>
          <div className="flex gap-4"><span className="font-bold text-primary w-16">1956</span><span><WikiLink term="Dartmouth workshop">Dartmouth Conference</WikiLink>: "Artificial Intelligence" coined</span></div>
          <div className="flex gap-4"><span className="font-bold text-primary w-16">1976</span><span><WikiLink term="Joseph Weizenbaum">Weizenbaum</WikiLink>: <em>Computer Power and Human Reason</em></span></div>
          <div className="flex gap-4"><span className="font-bold text-primary w-16">1985</span><span><WikiLink term="Donna Haraway">Donna Haraway</WikiLink>: "A Cyborg Manifesto"</span></div>
          <div className="flex gap-4"><span className="font-bold text-primary w-16">2017</span><span><WikiLink term="Transformer (deep learning architecture)">Transformer architecture</WikiLink>: Foundation for modern LLMs</span></div>
        </div>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="mechanist">Early Mechanist Philosophy (1747-1879)</HeadingAnchor>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">La Mettrie's Radical Materialism</h3>

      <p>
        The modern conversation about machine intelligence begins with <WikiLink term="Julien Offray de La Mettrie">Julien Offray de La Mettrie's</WikiLink> scandalous treatise <em>Man a Machine</em> (1747). La Mettrie argued that humans are nothing more than complex machines—assemblages of matter governed entirely by mechanical principles.
      </p>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <blockquote className="text-sm italic border-l-4 border-primary pl-4 mb-0">
          "The human body is a machine which winds its own springs. It is the living image of perpetual motion... Let us then conclude boldly that man is a machine."
        </blockquote>
      </div>

      <p>
        This was radical in 1747—La Mettrie denied the existence of an immaterial soul. His work was condemned and burned, yet it anticipated debates about consciousness and artificial intelligence by nearly three centuries.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Ada Lovelace's Vision (1843)</h3>

      <p>
        <WikiLink term="Ada Lovelace">Ada Lovelace's</WikiLink> notes on <WikiLink term="Charles Babbage">Charles Babbage's</WikiLink> Analytical Engine contain what's often called the first computer algorithm. But Lovelace did more than describe calculations—she theorized about the machine's potential to manipulate symbols beyond mathematics:
      </p>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <blockquote className="text-sm italic border-l-4 border-primary pl-4 mb-3">
          "The engine might compose elaborate and scientific pieces of music of any degree of complexity or extent."
        </blockquote>
        <p className="text-sm text-muted-foreground mb-0">
          Yet Lovelace also set limits: the Analytical Engine "has no pretensions whatever to <em>originate</em> anything. It can do whatever we <em>know how to order it</em> to perform."
        </p>
      </div>

      <p>
        This raises questions still debated today: Can AI be truly creative? Or is all computation merely sophisticated recombination of programmed instructions?
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="prehistory">The Prehistory of AI (1879-1940)</HeadingAnchor>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">William James and the Automaton Debate</h3>

      <p>
        <WikiLink term="William James">William James</WikiLink>, founding figure of American psychology, confronted the question of human automatism in his 1879 essay "Are We Automata?" The "automaton theory" held that consciousness is an epiphenomenon—a byproduct of brain activity that plays no causal role, like a steam whistle that doesn't power the locomotive.
      </p>

      <p>
        James ultimately rejected this view, but the very fact that he took it seriously shows how powerful the brain-machine analogy had become. When we debate whether LLMs "understand" language or merely process patterns, we're echoing this 19th-century debate.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Quantifying Intelligence: The Dark Legacy</h3>

      <p>
        <WikiLink term="Francis Galton">Francis Galton</WikiLink> pioneered the statistical study of intelligence, developing tools like regression analysis and correlation coefficients—techniques still fundamental to machine learning today.
      </p>

      <div className="my-8 p-6 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-600 rounded-r-lg">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-orange-900 dark:text-orange-100">
              Critical Context: Eugenics
            </h4>
            <p className="text-sm text-orange-900/80 dark:text-orange-100/80 mb-0">
              Galton coined the term "<WikiLink term="Eugenics">eugenics</WikiLink>" and advocated using statistics to "improve" the human race through selective breeding. This pseudoscientific ideology led to forced sterilizations and inspired Nazi atrocities. The link between statistical thinking, intelligence measurement, and eugenic ideology is a crucial cautionary tale for contemporary AI, which also uses statistical methods to classify human abilities—often reproducing historical biases.
            </p>
          </div>
        </div>
      </div>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Literary Visions: "The Machine Stops"</h3>

      <p>
        <WikiLink term="E. M. Forster">E.M. Forster's</WikiLink> 1909 short story "The Machine Stops" imagined a future where humanity lives underground, entirely dependent on an omnipresent Machine. People communicate only through screens, never meeting face-to-face. When the Machine malfunctions, civilization collapses.
      </p>

      <p>
        This story is eerily prescient about digital isolation, algorithmic dependence, and technological fragility. It remains remarkably relevant for discussing AI infrastructure and platform dependence today.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="information-age">Information Theory & Cybernetics (1945-1950)</HeadingAnchor>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Shannon's Information Theory</h3>

      <p>
        <WikiLink term="Claude Shannon">Claude Shannon's</WikiLink> 1948 paper "A Mathematical Theory of Communication" fundamentally reconceived information. Rather than focusing on meaning, Shannon defined <strong>information</strong> mathematically as the reduction of uncertainty.
      </p>

      <p>
        This abstraction was powerful—but it also introduced a paradigm shift: treating information as separable from meaning. This has profound implications for how LLMs work today: they process statistical patterns in language, not semantic meaning.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Wiener's Warning</h3>

      <p>
        <WikiLink term="Norbert Wiener">Norbert Wiener</WikiLink> developed <WikiLink term="Cybernetics">cybernetics</WikiLink> as a theory of feedback and control applicable to both animals and machines. But Wiener was no techno-optimist. In <em>The Human Use of Human Beings</em> (1950), he warned:
      </p>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <blockquote className="text-sm italic border-l-4 border-primary pl-4 mb-0">
          "The automatic machine... is the precise economic equivalent of slave labor. Any labor which competes with slave labor must accept the economic conditions of slave labor."
        </blockquote>
      </div>

      <GuideSectionDivider />

      <HeadingAnchor id="birth-ai">The Birth of Artificial Intelligence (1950-1962)</HeadingAnchor>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Turing's Imitation Game</h3>

      <p>
        <WikiLink term="Alan Turing">Alan Turing's</WikiLink> "Computing Machinery and Intelligence" (1950) remains one of the most influential papers in AI history. Rather than asking "Can machines think?"—too vague—Turing proposed the <strong>imitation game</strong> (now the <WikiLink term="Turing test">Turing Test</WikiLink>): if a machine can converse indistinguishably from a human, should we attribute intelligence to it?
      </p>

      <div className="my-8 p-6 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-lg">
        <div className="flex gap-3">
          <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-base font-semibold mt-0 mb-2 text-blue-900 dark:text-blue-100">
              Discussion Question
            </h4>
            <p className="text-sm text-blue-900/80 dark:text-blue-100/80 mb-0">
              Modern LLMs can often pass the Turing Test in short conversations. Does this mean they're "intelligent"? Or does it reveal limitations in the test itself?
            </p>
          </div>
        </div>
      </div>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">The Dartmouth Conference (1956)</h3>

      <p>
        The term <strong>"artificial intelligence"</strong> was coined in a 1955 proposal for a summer workshop at <WikiLink term="Dartmouth College">Dartmouth College</WikiLink>. The proposal, by <WikiLink term="John McCarthy (computer scientist)">John McCarthy</WikiLink>, <WikiLink term="Marvin Minsky">Marvin Minsky</WikiLink>, and others, boldly predicted:
      </p>

      <div className="my-6 p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
        <blockquote className="text-sm italic border-l-4 border-primary pl-4 mb-0">
          "Every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it."
        </blockquote>
      </div>

      <p>
        This conjecture—that intelligence is entirely reducible to computational processes—remains hotly debated today.
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Engelbart's Alternative: Augmentation</h3>

      <p>
        Not everyone embraced automation. <WikiLink term="Douglas Engelbart">Douglas Engelbart's</WikiLink> "Augmenting Human Intellect" (1962) proposed computers as tools to <em>extend</em> human capabilities rather than replace workers. This <strong>augmentation vs. automation</strong> distinction remains crucial: Are LLMs tools that augment human writing, or systems that automate intellectual labor?
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="critical-voices">Critical Voices (1954-1985)</HeadingAnchor>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Heidegger on Technology</h3>

      <p>
        <WikiLink term="Martin Heidegger">Martin Heidegger's</WikiLink> "The Question Concerning Technology" (1954) argued that modern technology's essence is <strong>"enframing"</strong>—transforming everything into resources to be optimized. Under enframing, forests become "timber reserves," rivers become "power sources," and eventually humans become "human resources."
      </p>

      <p>
        This helps explain concerns about AI reducing human creativity and knowledge to "training data."
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Weizenbaum's Limits</h3>

      <p>
        <WikiLink term="Joseph Weizenbaum">Joseph Weizenbaum</WikiLink> created <WikiLink term="ELIZA">ELIZA</WikiLink>, an early chatbot that surprised users with seemingly empathetic responses. But in <em>Computer Power and Human Reason</em> (1976), Weizenbaum argued that computers should <em>never</em> make decisions requiring human wisdom, judgment, and compassion—no matter how sophisticated they become.
      </p>

      <p>
        He distinguished between <strong>deciding</strong> (which computers can do) and <strong>choosing</strong> (which requires ethical judgment computers lack).
      </p>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Haraway's Cyborg Politics</h3>

      <p>
        <WikiLink term="Donna Haraway">Donna Haraway's</WikiLink> "A Cyborg Manifesto" (1985) took a different approach. Rather than lamenting human/machine blurring, Haraway embraced the <WikiLink term="Cyborg">cyborg</WikiLink> as liberatory—one that transgresses dualisms (nature/culture, male/female, organism/machine) and enables new forms of identity and politics.
      </p>

      <GuideSectionDivider />

      <HeadingAnchor id="teaching">Teaching This History</HeadingAnchor>

      <p>
        Teaching the history of machine intelligence helps students:
      </p>

      <ul>
        <li><strong>Denaturalize current technologies:</strong> AI emerged from specific historical conditions and embodies particular assumptions</li>
        <li><strong>Recognize patterns:</strong> Many "new" debates recapitulate older controversies</li>
        <li><strong>Develop critical frameworks:</strong> Historical thinkers provide resources for evaluating contemporary claims</li>
        <li><strong>Appreciate humanities contributions:</strong> This isn't just an engineering story</li>
      </ul>

      <h3 className="font-sans text-xl font-semibold mt-8 mb-4">Suggested Assignments</h3>

      <div className="my-6 space-y-4">
        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-3">Dialogue Across Time</h4>
          <p className="text-sm mb-0">
            Have students write an imagined conversation between thinkers from different eras (La Mettrie and Weizenbaum, Turing and Haraway) discussing a contemporary AI issue.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-lg border">
          <h4 className="font-sans text-base font-semibold mt-0 mb-3">Primary Source Analysis</h4>
          <p className="text-sm mb-0">
            Choose one historical text and have students: (1) summarize its argument, (2) identify assumptions about intelligence/consciousness, (3) evaluate relevance to contemporary AI, (4) critique limitations.
          </p>
        </div>
      </div>

      <div className="my-12 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Key Takeaway</h3>
        <p className="mb-0">
          When tech companies claim their AI is "unprecedented," historical knowledge provides perspective. When debates rage about whether LLMs "truly understand," we can draw on centuries of philosophy. This history reminds us that technologies don't determine their own uses—they're shaped by human choices, political struggles, and cultural values.
        </p>
      </div>

      <div className="mt-8 pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Related Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/guides/prompt-engineering" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h4 className="font-semibold mb-1 text-sm">Prompt Engineering for Humanities</h4>
            <p className="text-xs text-muted-foreground">Apply historical understanding to building AI tools</p>
          </Link>
          <Link href="/resources" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <h4 className="font-semibold mb-1 text-sm">Historical Resources</h4>
            <p className="text-xs text-muted-foreground">Access all primary sources discussed in this guide</p>
          </Link>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          <strong>Guide last updated:</strong> November 2025. Questions or feedback?{' '}
          <a href="mailto:bbreen@ucsc.edu" className="text-primary hover:underline">Get in touch</a>
        </p>
      </div>
    </GuideLayout>
  )
}
