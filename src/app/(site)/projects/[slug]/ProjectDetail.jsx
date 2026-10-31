import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Reveal from '@/components/ui/Reveal';
import Mask from '@/components/ui/Mask';

export default function ProjectDetail({ meta, content, nextProject }) {
  const hasServer = Boolean(meta.serverUrl);

  return (
    <>
      <div className="theme-chalk px-5 pb-24 pt-32 sm:px-8 lg:px-14 lg:pt-40">
        <div className="mx-auto max-w-340">
          <Link
            href="/#work"
            className="link inline-flex items-center gap-2 py-1.5 font-medium"
          >
            <ArrowLeft size={16} aria-hidden="true" /> All work
          </Link>

          <header className="mt-8">
            <h1 className="mb-6 max-w-5xl font-display text-display font-extrabold leading-[1.0] tracking-[-0.04em]">
              {meta.title}
            </h1>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-xl text-xl text-soft">{meta.summary}</p>
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
                  {hasServer ? 'Client code' : 'Source code'}
                </a>
                {hasServer && (
                  <a
                    href={meta.serverUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <FaGithub size={16} aria-hidden="true" /> Server code
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
            data-cursor="view"
            data-cursor-label="Open"
            className="mt-12 block"
          >
            <Mask className="relative aspect-4/3 overflow-hidden bg-card sm:aspect-video lg:aspect-21/9">
              <Image
                src={meta.image}
                alt={`${meta.title} screenshot`}
                fill
                sizes="(min-width: 1360px) 1360px, 100vw"
                priority
                quality={90}
                className="object-cover object-top"
              />
            </Mask>
          </a>

          <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="mb-3 font-display text-lg font-bold">Built with</h2>
              <ul className="flex flex-wrap gap-2">
                {meta.tags?.map(tag => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="min-w-0">{content}</div>
          </div>
        </div>
      </div>

      {nextProject && (
        <div className="theme-ink sheet px-5 sm:px-8 lg:px-14">
          <Reveal y={40}>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group mx-auto flex max-w-340 flex-col gap-6"
            >
              <span className="text-lg font-medium text-soft">
                Next case study
              </span>
              <span className="font-display text-[clamp(2.5rem,1rem+6vw,7rem)] font-extrabold leading-[1.0] tracking-[-0.04em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4">
                {nextProject.title}
              </span>
            </Link>
          </Reveal>
        </div>
      )}
    </>
  );
}
