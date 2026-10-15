export const mdxComponents = {
  h2: ({ children }) => (
    <h2 className="mb-4 mt-14 border-t border-line pt-8 font-display text-h2 leading-tight first:mt-0 first:border-t-0 first:pt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 font-display text-xl">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-4 text-soft">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-6 flex flex-col gap-3 [&>li]:relative [&>li]:pl-6 [&>li]:text-soft [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-brass [&>li]:before:content-['']">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 flex list-decimal flex-col gap-3 pl-6 text-soft marker:text-brass">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-6 border-l-2 border-brass pl-5 text-soft">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-line" />,
  strong: ({ children }) => (
    <strong className="font-medium text-paper">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded-md border border-line-2 bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-brass-hover">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-field border border-line bg-inset p-4 font-mono text-sm [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link underline decoration-brass/40 underline-offset-4 hover:decoration-brass"
    >
      {children}
    </a>
  ),
};
