import { Fragment } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getSiteData } from '@/lib/cms';
import SectionHeading from '@/components/ui/SectionHeading';

function renderRich(text) {
  return text.split('**').map((part, index) =>
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
  const { experience } = await getSiteData();
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="px-5 pb-8 pt-24 sm:px-8 lg:px-14"
    >
      <div className="mx-auto max-w-340">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Hands-on work you can verify."
        />

        <div className="flex flex-col gap-5">
          {experience.map(item => (
            <article
              key={item.id}
              className="card grid grid-cols-1 overflow-hidden md:grid-cols-2"
            >
              <div className="border-b border-line p-7 sm:p-9 md:border-b-0 md:border-r">
                <p className="eyebrow text-subtle">{item.period}</p>
                <h3 className="mb-1.5 mt-2 font-display text-[clamp(1.5rem,1.3rem+0.8vw,1.75rem)] leading-tight">
                  {item.role}
                </h3>
                <p className="mb-5 text-brass">
                  {item.organization} · {item.mode}
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {item.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3.5 p-7 text-[0.9375rem] text-soft sm:p-9">
                {item.highlights.map(highlight => (
                  <p key={highlight}>{renderRich(highlight)}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
