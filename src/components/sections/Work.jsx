import { ArrowUpRight } from 'lucide-react';
import { getSiteData } from '@/lib/cms';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectStack from '@/components/ui/ProjectStack';
import Reveal from '@/components/ui/Reveal';
import { pad } from '@/lib/copy';

export default async function Work({ projects }) {
  const { capstones, personalInfo, sections } = await getSiteData();

  const stackProjects = projects.map(project => ({
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    image: project.image,
    tags: project.tags,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    serverUrl: project.serverUrl,
  }));

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="px-5 pb-8 pt-28 sm:px-8 lg:px-14"
    >
      <div className="mx-auto max-w-340">
        <SectionHeading
          id="work-heading"
          index={1}
          eyebrow={sections.work.eyebrow}
          title={sections.work.title}
        />

        <ProjectStack projects={stackProjects} />

        {capstones.length > 0 && (
          <>
            <p className="eyebrow mb-4 mt-28">Internship capstones</p>
            <ul className="divide-y divide-line border-y border-line">
              {capstones.map((capstone, index) => (
                <li key={capstone.id}>
                  <Reveal
                    y={40}
                    className="grid grid-cols-1 gap-x-8 gap-y-2 py-6 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-baseline"
                  >
                    <span className="font-mono text-xs text-brass">
                      {pad(index + 1)}
                    </span>
                    <h3 className="font-display text-xl leading-snug">
                      {capstone.title}
                    </h3>
                    <p className="text-sm text-muted">
                      <span className="line-clamp-2">{capstone.summary}</span>
                      <span className="mt-1 line-clamp-2 block text-[0.8125rem] text-subtle">
                        {capstone.note}
                      </span>
                    </p>
                    <a
                      href={capstone.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${capstone.title} on GitHub`}
                      className="link inline-flex items-center gap-1 py-1.5 text-sm"
                    >
                      GitHub <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>
          </>
        )}

        <a
          href={`${personalInfo.social.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-8 inline-flex items-center gap-1 py-1.5 text-[0.9375rem]"
        >
          All repositories on GitHub{' '}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
