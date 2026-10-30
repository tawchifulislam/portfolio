import { Fragment } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getSiteData } from '@/lib/cms';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

function renderRich(text) {
  return String(text || '')
    .split('**')
    .map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="font-medium text-paper">
          {part}
        </strong>
      ) : (
        <Fragment key={index}>{part}</Fragment>
      ),
    );
}

export default async function Experience() {
  const { experience, sections } = await getSiteData();

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="px-5 pb-8 pt-28 sm:px-8 lg:px-14"
    >
      <div className="mx-auto max-w-340">
        <SectionHeading
          id="experience-heading"
          index={3}
          eyebrow={sections.experience.eyebrow}
          title={sections.experience.title}
        />

        <div className="flex flex-col">
          {experience.map(item => (
            <Reveal key={item.id}>
              <article className="grid grid-cols-1 gap-6 border-y border-line py-9 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-brass">
                  {item.period}
                </p>
                <div>
                  <h3 className="font-display text-h2 leading-tight">
                    {item.role}
                  </h3>
                  <p className="mt-1.5 text-subtle">
                    {item.organization} · {item.mode}
                  </p>
                  <p className="mt-5 max-w-xl text-soft">
                    {renderRich(item.highlights[0])}
                  </p>
                  <div className="sr-only">
                    {item.highlights.slice(1).map(highlight => (
                      <p key={highlight}>{renderRich(highlight)}</p>
                    ))}
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {item.links.map(link => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="chip inline-flex items-center gap-1.5 px-4 py-2 transition-colors hover:border-brass hover:text-brass-hover"
                        >
                          {link.label}
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
