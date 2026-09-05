export const mdxComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 font-display text-h3 font-semibold text-paper border-b border-line pb-3 first:mt-0">
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="measure-lg text-sm sm:text-base leading-relaxed text-muted mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="flex flex-col gap-3 mb-8">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="relative pl-6 text-sm leading-relaxed text-muted">
      <span className="absolute left-0 top-2 w-2 h-2 border border-brass" />
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="text-paper font-medium">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="px-1.5 py-0.5 rounded-sm bg-panel-2 font-mono text-xs text-brass">
      {children}
    </code>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-paper underline decoration-line underline-offset-4 hover:decoration-brass transition-colors"
    >
      {children}
    </a>
  ),
};
