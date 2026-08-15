import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-5 mt-10 text-display font-serif font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-9 text-title font-serif font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-7 text-headline font-serif font-semibold">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-5 leading-relaxed text-foreground/90">{children}</p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-primary underline-offset-2 hover:underline">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mb-5 ml-6 list-disc space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-5 ml-6 list-decimal space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em]">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="mb-5 overflow-x-auto rounded-xl bg-muted p-4">{children}</pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-primary/45 pl-6 italic text-foreground/85">
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr className="my-10 h-px border-0 bg-gradient-to-r from-transparent via-border to-transparent" />
    ),
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src as string} alt={alt as string} className="my-6 w-full rounded-xl" />
    ),
    ...components,
  }
}
