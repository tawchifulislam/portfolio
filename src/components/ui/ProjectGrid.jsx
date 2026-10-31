import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Reveal from '@/components/ui/Reveal';

const pill =
  'inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-on-accent';

function Card({ project }) {
  const hasServer = Boolean(project.serverUrl);

  return (
    <article className="group relative flex h-full flex-col rounded-[1.75rem] bg-card p-3 sm:p-4">
      <div className="overflow-hidden rounded-2xl bg-canvas">
        <div
          aria-hidden="true"
          className="flex h-8 items-center gap-1.5 border-b border-line px-4"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        </div>
        <div
          data-cursor="view"
          className="relative aspect-16/10 overflow-hidden bg-white"
        >
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-2 pb-2 pt-6 sm:px-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:z-0 after:rounded-[1.75rem] after:content-['']"
            >
              {project.title}
              <span className="sr-only"> case study</span>
            </Link>
          </h3>
          <span
            aria-hidden="true"
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          >
            <ArrowUpRight size={20} />
          </span>
        </div>

        <p className="max-w-md text-soft">{project.summary}</p>

        {project.tags?.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.slice(0, 4).map(tag => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        )}

        <ul className="relative z-10 mt-auto flex flex-wrap gap-2 pt-2">
          {project.liveUrl && (
            <li>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className={pill}
              >
                Live site
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </li>
          )}
          {project.githubUrl && (
            <li>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} ${hasServer ? 'client' : 'source'} code`}
                className={pill}
              >
                <FaGithub size={15} aria-hidden="true" />
                {hasServer ? 'Client' : 'Code'}
              </a>
            </li>
          )}
          {hasServer && (
            <li>
              <a
                href={project.serverUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} server code`}
                className={pill}
              >
                <FaGithub size={15} aria-hidden="true" />
                Server
              </a>
            </li>
          )}
        </ul>
      </div>
    </article>
  );
}

export default function ProjectGrid({ projects }) {
  return (
    <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      {projects.map((project, index) => (
        <li key={project.slug} className={index % 2 === 1 ? 'lg:mt-20' : ''}>
          <Reveal y={56} className="h-full">
            <Card project={project} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
