import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { getSiteData, getProject } from '@/lib/cms';
import { firstSentences } from '@/lib/copy';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectGrid from '@/components/ui/ProjectGrid';
import Reveal from '@/components/ui/Reveal';

export default async function Work({ projects }) {
  const { capstones, personalInfo, sections } = await getSiteData();

  const details = await Promise.all(
    projects.map(project => getProject(project.slug).catch(() => null)),
  );

  const listProjects = projects.map((project, index) => ({
    result: details[index]?.outcome
      ? firstSentences(details[index].outcome, 1).replace(/\*\*|`/g, '')
      : '',
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
      className="theme-ink sheet px-5 sm:px-8 lg:px-14"
    >
      <div className="mx-auto max-w-340">
        <SectionHeading id="work-heading" title={sections.work.title} />

        <ProjectGrid projects={listProjects} />

        {capstones.length > 0 && (
          <div className="mt-24 lg:mt-36">
            <h3 className="mb-8 font-display text-h1 font-extrabold leading-tight">
              Internship capstones
            </h3>
            <ul className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
              {capstones.map(capstone => (
                <li key={capstone.id} className="bg-canvas">
                  <Reveal
                    y={32}
                    className="flex h-full min-h-72 flex-col justify-between gap-8 p-6 transition-colors hover:bg-card sm:p-8"
                  >
                    <div>
                      <h4 className="font-display text-xl font-bold leading-snug tracking-[-0.02em]">
                        {capstone.title}
                      </h4>
                      <p className="mt-3 text-soft">{capstone.summary}</p>
                    </div>
                    <div>
                      {capstone.note && (
                        <p className="mb-5 border-l-2 border-accent pl-3 text-sm text-soft">
                          {capstone.note}
                        </p>
                      )}
                      <a
                        href={capstone.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${capstone.title} on GitHub`}
                        className="link inline-flex items-center gap-2 py-1.5 font-medium"
                      >
                        <FaGithub size={16} aria-hidden="true" />
                        Source
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          href={`${personalInfo.social.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline mt-10"
        >
          All repositories on GitHub
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
