import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { getSiteData } from '@/lib/cms';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Mask from '@/components/ui/Mask';
import Parallax from '@/components/ui/Parallax';
import { pad } from '@/lib/copy';

function ProjectCard({ project, index }) {
  return (
    <article className="group relative">
      <Mask className="relative aspect-4/3 overflow-hidden rounded-card border border-line bg-panel-2 sm:aspect-16/10">
        <Parallax distance={8}>
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        </Parallax>
        {project.featured && (
          <span className="chip absolute left-4 top-4 z-10 bg-ink/80 backdrop-blur-sm">
            Featured
          </span>
        )}
      </Mask>

      <Reveal delay={0.1} y={40}>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-xs text-brass">({pad(index + 1)})</p>
            <h3 className="mt-1 font-display text-h2 leading-tight">
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {project.title}
                <span className="sr-only"> case study</span>
              </Link>
            </h3>
            <p className="mt-2 line-clamp-2 max-w-md text-sm text-muted">
              {project.summary}
            </p>
          </div>

          <ul className="relative z-10 flex shrink-0 items-center gap-1">
            {project.liveUrl && (
              <li>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live site`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-3 text-soft transition-colors hover:border-brass hover:text-brass-hover"
                >
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            )}
            {project.githubUrl && (
              <li>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-3 text-soft transition-colors hover:border-brass hover:text-brass-hover"
                >
                  <FaGithub size={16} aria-hidden="true" />
                </a>
              </li>
            )}
          </ul>
        </div>

        {project.tags?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.slice(0, 4).map(tag => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </article>
  );
}

export default async function Work({ projects }) {
  const { capstones, personalInfo, sections } = await getSiteData();

  const ordered = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

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

        <ul className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {ordered.map((project, index) => (
            <li key={project.slug} className="md:even:mt-24">
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>

        {capstones.length > 0 && (
          <>
            <p className="eyebrow mb-4 mt-28 md:mt-40">Internship capstones</p>
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
