const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
const SAFE_URL = /^(https?:\/\/|mailto:|\/)/;

function renderInline(text) {
  return String(text || '')
    .split(TOKEN)
    .map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code
            key={index}
            className="rounded-md bg-fg/10 px-1.5 py-0.5 text-[0.9em]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link && SAFE_URL.test(link[2])) {
        return (
          <a
            key={index}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {link[1]}
          </a>
        );
      }
      return part;
    });
}

function Section({ title, children }) {
  return (
    <section className="border-t border-line py-10 first:border-t-0 first:pt-0">
      <h2 className="mb-5 font-display text-h2 font-bold leading-tight tracking-[-0.02em]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Paragraph({ text }) {
  if (!text) return null;
  return (
    <p className="max-w-2xl text-lg leading-relaxed text-soft">
      {renderInline(text)}
    </p>
  );
}

function List({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="flex max-w-2xl flex-col gap-5">
      {items.map(item => (
        <li
          key={item}
          className="border-l-2 border-accent pl-5 text-lg leading-relaxed text-soft"
        >
          {renderInline(item)}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectBody({ project }) {
  return (
    <div>
      <Section title="The problem">
        <Paragraph text={project.problem} />
      </Section>
      <Section title="The approach">
        <Paragraph text={project.approach} />
      </Section>
      {project.keyDecisions?.length > 0 && (
        <Section title="Key decisions">
          <List items={project.keyDecisions} />
        </Section>
      )}
      <Section title="The outcome">
        <Paragraph text={project.outcome} />
      </Section>
      {project.whatsNext?.length > 0 && (
        <Section title="What I would build next">
          <List items={project.whatsNext} />
        </Section>
      )}
    </div>
  );
}
