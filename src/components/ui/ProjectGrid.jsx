import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Reveal from '@/components/ui/Reveal';

const pill =
  'inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-on-accent';

function Card({ project }) {
  const hasServer = Boolean(project.serverUrl);
  const caseStudy = `/projects/${project.slug}`;

  return (
    <article className="group relative flex flex-col rounded-[1.75rem] bg-card p-3 sm:p-4">
      <Link
        href={caseStudy}
        tabIndex={-1}
        aria-hidden="true"
        data-cursor="view"
        className="relative block aspect-16/10 overflow-hidden rounded-2xl bg-canvas"
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 92vw"
          className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-signal px-3 py-1 text-xs font-bold text-night">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 px-2 pb-2 pt-6 sm:px-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[clamp(1.5rem,1.1rem+1vw,2rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            <Link href={caseStudy}>{project.title}</Link>
          </h3>
          <Link
            href={caseStudy}
            aria-label={`Read the ${project.title} case study`}
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-300 hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>

        <p className="max-w-md text-soft">{project.summary}</p>

        {project.result && (
          <p className="max-w-md border-l-2 border-accent pl-4 text-[0.9375rem] font-medium leading-snug">
            {project.result}
          </p>
        )}

        {project.tags?.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.slice(0, 4).map(tag => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
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
    <ul className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
      {projects.map((project, index) => (
        <li key={project.slug} className={index % 2 === 1 ? 'lg:mt-20' : ''}>
          <Reveal y={56}>
            <Card project={project} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
