import { mdxComponents } from '@/components/mdx/MDXComponents';

const {
  h2: H2,
  p: P,
  ul: Ul,
  strong: Strong,
  code: Code,
  a: A,
} = mdxComponents;

// supports **bold**, `code` and [text](url) only
function renderInline(text) {
  const parts = String(text || '').split(
    /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g,
  );

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <Strong key={i}>{part.slice(2, -2)}</Strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <Code key={i}>{part.slice(1, -1)}</Code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      // only safe link types
      if (/^(https?:|mailto:)/.test(link[2])) {
        return (
          <A key={i} href={link[2]}>
            {link[1]}
          </A>
        );
      }
      return link[1];
    }
    return part;
  });
}

function Paragraphs({ text }) {
  return String(text || '')
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((paragraph, i) => <P key={i}>{renderInline(paragraph)}</P>);
}

function List({ items }) {
  return (
    <Ul>
      {items.map((item, i) => (
        <li key={i}>{renderInline(item)}</li>
      ))}
    </Ul>
  );
}

export default function ProjectBody({ project }) {
  return (
    <>
      {project.problem && (
        <>
          <H2>Problem</H2>
          <Paragraphs text={project.problem} />
        </>
      )}
      {project.approach && (
        <>
          <H2>Approach</H2>
          <Paragraphs text={project.approach} />
        </>
      )}
      {project.keyDecisions.length > 0 && (
        <>
          <H2>Key Decisions</H2>
          <List items={project.keyDecisions} />
        </>
      )}
      {project.outcome && (
        <>
          <H2>Outcome</H2>
          <Paragraphs text={project.outcome} />
        </>
      )}
      {project.whatsNext.length > 0 && (
        <>
          <H2>What&apos;s Next</H2>
          <List items={project.whatsNext} />
        </>
      )}
    </>
  );
}
