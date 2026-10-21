import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const pad = value => String(value).padStart(2, '0');

function getHost(url) {
  if (!url) return '';
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function ProjectDetail({
  meta,
  content,
  index,
  total,
  nextProject,
}) {
  const hasServer = Boolean(meta.serverUrl);

  return (
    <main className="px-5 pb-20 pt-28 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-300">
        <Link
          href="/#work"
          className="link inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft size={15} aria-hidden="true" /> All work
        </Link>

        <header className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-14">
          <div>
            <p className="eyebrow">
              Case study · {pad(index)} / {pad(total)}
            </p>
            <h1 className="mb-5 mt-3 font-display text-[clamp(2.25rem,1.6rem+3vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
              {meta.title}
            </h1>
            <p className="mb-8 max-w-xl text-lg text-muted">{meta.summary}</p>

            <div className="flex flex-wrap gap-3">
              <a
                href={meta.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Live site <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href={meta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <FaGithub size={16} aria-hidden="true" />
                {hasServer ? 'Client repo' : 'Source on GitHub'}
              </a>
              {hasServer && (
                <a
                  href={meta.serverUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FaGithub size={16} aria-hidden="true" /> Server repo
                </a>
              )}
            </div>
          </div>

          <a
            href={meta.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${meta.title} live site`}
            className="card block bg-inset p-2.5 transition-colors hover:border-brass/60"
          >
            <div className="rounded-lg border border-line-2 bg-panel p-2.5">
              <div
                className="mb-2.5 flex items-center gap-1.5"
                aria-hidden="true"
              >
                {[0, 1, 2].map(dot => (
                  <span key={dot} className="h-2 w-2 rounded-full bg-line-3" />
                ))}
                <span className="ml-2 truncate font-mono text-[0.6875rem] text-subtle">
                  {getHost(meta.liveUrl)}
                </span>
              </div>
              <div className="relative aspect-16/10 overflow-hidden rounded-md bg-panel-2">
                <Image
                  src={meta.image}
                  alt={`${meta.title} screenshot`}
                  fill
                  sizes="(min-width: 1024px) 416px, 92vw"
                  priority
                  quality={90}
                  className="object-cover object-top"
                />
              </div>
            </div>
          </a>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-3">Built with</p>
            <ul className="flex flex-wrap gap-2">
              {meta.tags?.map(tag => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0">
            <article className="max-w-2xl [counter-reset:section]">
              {content}
            </article>

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="card group mt-16 flex max-w-2xl items-center justify-between gap-4 p-6 transition-colors hover:border-brass/60"
              >
                <div>
                  <p className="eyebrow">Next case study</p>
                  <p className="mt-1 font-display text-xl">
                    {nextProject.title}
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  aria-hidden="true"
                  className="text-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brass"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
