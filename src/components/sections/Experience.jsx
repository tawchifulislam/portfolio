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
        <strong key={index} className="font-semibold text-accent">
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
      className="theme-cobalt sheet px-5 sm:px-8 lg:px-14"
    >
      <div className="mx-auto max-w-340">
        <SectionHeading
          id="experience-heading"
          title={sections.experience.title}
        />

        <div className="flex flex-col">
          {experience.map(item => (
            <Reveal key={item.id}>
              <article className="grid grid-cols-1 gap-8 border-t border-line py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
                <div>
                  <p className="mb-4 text-lg font-medium text-soft">
                    {item.period}
                  </p>
                  <h3 className="font-display text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]">
                    {item.role}
                  </h3>
                  <p className="mt-4 text-lg text-soft">
                    {item.organization}
                    {item.mode ? `, ${item.mode}` : ''}
                  </p>
                </div>

                <div>
                  <p className="max-w-xl text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-snug">
                    {renderRich(item.highlights?.[0])}
                  </p>
                  <div className="sr-only">
                    {(item.highlights ?? []).slice(1).map(highlight => (
                      <p key={highlight}>{renderRich(highlight)}</p>
                    ))}
                  </div>
                  <ul className="mt-8 flex flex-wrap gap-3">
                    {(item.links ?? []).map(link => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline px-5 py-2.5 text-sm"
                        >
                          {link.label}
                          <ArrowUpRight size={15} aria-hidden="true" />
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
