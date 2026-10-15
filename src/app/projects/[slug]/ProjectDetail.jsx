import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const pad = value => String(value).padStart(2, '0');

export default function ProjectDetail({
  meta,
  content,
  index,
  total,
  nextProject,
}) {
  const repos = [
    {
      label: meta.serverUrl ? 'Client repo' : 'Source on GitHub',
      href: meta.githubUrl,
    },
    meta.serverUrl && { label: 'Server repo', href: meta.serverUrl },
  ].filter(Boolean);

  return (
    <main className="px-5 pb-20 pt-28 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-275">
        <Link
          href="/#work"
          className="link inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft size={15} aria-hidden="true" /> All work
        </Link>

        <header className="mt-8">
          <p className="eyebrow">
            Case study · {pad(index)} / {pad(total)}
          </p>
          <h1 className="mb-5 mt-3 font-display text-display leading-[1.04] tracking-[-0.02em]">
            {meta.title}
          </h1>
          <p className="max-w-160 text-lg text-muted">{meta.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {meta.tags?.map(tag => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href={meta.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Live site <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {repos.map(repo => (
              <a
                key={repo.label}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <FaGithub size={16} aria-hidden="true" /> {repo.label}
              </a>
            ))}
          </div>
        </header>

        <div className="card mt-12 bg-inset p-3 sm:p-5">
          <div className="rounded-xl border border-line-2 bg-panel p-3 sm:p-4">
            <div className="mb-3 flex gap-1.5" aria-hidden="true">
              {[0, 1, 2].map(dot => (
                <span key={dot} className="h-2 w-2 rounded-full bg-line-3" />
              ))}
            </div>
            <div className="relative aspect-16/10 overflow-hidden rounded-lg bg-panel-2">
              <Image
                src={meta.image}
                alt={`${meta.title} screenshot`}
                fill
                sizes="(min-width: 1100px) 1000px, 92vw"
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-176">{content}</div>

        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="card group mx-auto mt-16 flex max-w-176 items-center justify-between gap-4 p-6 transition-colors hover:border-brass/60"
          >
            <div>
              <p className="eyebrow">Next case study</p>
              <p className="mt-1 font-display text-xl">{nextProject.title}</p>
            </div>
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="text-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brass"
            />
          </Link>
        )}
      </div>
    </main>
  );
}
