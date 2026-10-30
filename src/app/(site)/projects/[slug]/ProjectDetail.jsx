import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Reveal from '@/components/ui/Reveal';
import Mask from '@/components/ui/Mask';
import Parallax from '@/components/ui/Parallax';
import { pad } from '@/lib/copy';

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
      <div className="mx-auto max-w-340">
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
          <h1 className="mb-6 mt-4 max-w-5xl font-display text-display leading-[1.02] tracking-tight">
            {meta.title}
          </h1>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-lg text-muted">{meta.summary}</p>
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
        </header>

        <a
          href={meta.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${meta.title} live site`}
          className="mt-12 block"
        >
          <Mask className="relative aspect-4/3 overflow-hidden rounded-card border border-line bg-panel-2 sm:aspect-video lg:aspect-21/9">
            <Parallax distance={7}>
              <Image
                src={meta.image}
                alt={`${meta.title} screenshot`}
                fill
                sizes="(min-width: 1360px) 1360px, 100vw"
                priority
                quality={90}
                className="object-cover object-top"
              />
            </Parallax>
          </Mask>
        </a>

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
          </div>
        </div>

        {nextProject && (
          <Reveal y={48}>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group mt-24 flex items-end justify-between gap-6 border-t border-line pt-10"
            >
              <div>
                <p className="eyebrow">Next case study</p>
                <p className="mt-3 font-display text-huge leading-[1.02] tracking-[-0.02em] transition-colors group-hover:text-brass">
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight
                size={40}
                aria-hidden="true"
                className="shrink-0 text-soft transition-transform duration-300 group-hover:translate-x-2 group-hover:text-brass"
              />
            </Link>
          </Reveal>
        )}
      </div>
    </main>
  );
}
