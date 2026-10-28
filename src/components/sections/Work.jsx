import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getSiteData } from '@/lib/cms';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectSlider from '@/components/ui/ProjectSlider';

export default async function Work({ projects }) {
  const { capstones, personalInfo, sections } = await getSiteData();

  // featured projects go in the slider, the rest under "More projects"
  const featured = projects.filter(project => project.featured);
  const more = projects.filter(project => !project.featured);
  const slides = featured.length > 0 ? featured : projects;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="px-5 pb-8 pt-24 sm:px-8 lg:px-14"
    >
      <div className="mx-auto max-w-340">
        <SectionHeading
          id="work-heading"
          eyebrow={sections.work.eyebrow}
          title={sections.work.title}
          description={sections.work.description}
        />

        {slides.length > 0 && <ProjectSlider projects={slides} />}

        {featured.length > 0 && more.length > 0 && (
          <div className="mt-10">
            <p className="eyebrow mb-4">More projects</p>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,17.5rem),1fr))] gap-5">
              {more.map(project => (
                <li key={project.slug} className="card flex flex-col p-6">
                  <h3 className="font-display text-[1.125rem] leading-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">
                    {project.summary}
                  </p>
                  {project.tags.length > 0 && (
                    <p className="mt-3 text-[0.8125rem] text-subtle">
                      {project.tags.slice(0, 5).join(' · ')}
                    </p>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="link mt-auto inline-flex items-center gap-1 pt-4 text-[0.9375rem]"
                  >
                    Case study
                    <span className="sr-only"> for {project.title}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,17.5rem),1fr))] gap-5">
          {capstones.map(capstone => (
            <li key={capstone.id} className="card flex flex-col p-7">
              <p className="eyebrow">Internship capstone</p>
              <h3 className="mb-2 mt-2 font-display text-[1.375rem] leading-tight">
                {capstone.title}
              </h3>
              <p className="text-[0.9375rem] text-muted">{capstone.summary}</p>
              <p className="mt-3 text-[0.8125rem] leading-snug text-subtle">
                {capstone.note}
              </p>
              <a
                href={capstone.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${capstone.title} on GitHub`}
                className="link mt-auto inline-flex items-center gap-1 pt-4 text-[0.9375rem]"
              >
                GitHub <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`${personalInfo.social.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-6 inline-flex items-center gap-1 py-1.5 text-[0.9375rem]"
        >
          All repositories on GitHub{' '}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
