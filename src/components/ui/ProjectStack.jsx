'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Mask from '@/components/ui/Mask';
import { pad } from '@/lib/copy';

function StackItem({ project, index, total, selfRef, nextRef }) {
  const reduce = useReducedMotion();
  const isLast = index === total - 1;
  const { scrollYProgress } = useScroll({
    target: nextRef ?? selfRef,
    offset: ['start 85%', 'start 96px'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : 0.5]);

  return (
    <motion.li
      ref={selfRef}
      className="relative origin-top lg:sticky lg:mb-[10vh] lg:last:mb-0 lg:transform-[scale(var(--card-scale,1))]"
      style={{
        top: `${6 + index * 1.1}rem`,
        ...(reduce ? {} : { '--card-scale': scale }),
      }}
    >
      <article className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-panel lg:grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="relative order-2 flex flex-col justify-between gap-10 overflow-hidden p-6 sm:p-8 lg:order-1 lg:p-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-5 top-[58%] hidden -translate-y-1/2 select-none font-display text-[10rem] font-bold leading-none text-transparent [-webkit-text-stroke:1px_var(--color-line-2)] lg:block"
          >
            {pad(index + 1)}
          </span>

          <div className="relative">
            <p className="font-mono text-xs text-brass">
              ({pad(index + 1)}) / ({pad(total)})
            </p>
            <h3 className="mt-4 font-display text-[clamp(2rem,1.2rem+2.6vw,3.5rem)] leading-[1.02] tracking-[-0.02em]">
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:z-0 after:content-['']"
              >
                {project.title}
                <span className="sr-only"> case study</span>
              </Link>
            </h3>
            <p className="mt-4 line-clamp-3 max-w-sm text-muted">
              {project.summary}
            </p>
            <p
              aria-hidden="true"
              className="mt-5 inline-flex items-center gap-2 text-sm text-brass transition-transform duration-300 group-hover:translate-x-1"
            >
              Case study <ArrowRight size={15} />
            </p>
          </div>

          <div className="relative">
            {project.tags?.length > 0 && (
              <ul
                className="flex flex-wrap gap-2"
                aria-label="Technologies"
              >
                {project.tags.slice(0, 5).map(tag => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <div className="relative z-10 mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary px-5 py-2.5 text-sm"
                >
                  Live site <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline px-5 py-2.5 text-sm"
                >
                  <FaGithub size={15} aria-hidden="true" />
                  {project.serverUrl ? 'Client' : 'Code'}
                </a>
              )}
              {project.serverUrl && (
                <a
                  href={project.serverUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline px-5 py-2.5 text-sm"
                >
                  <FaGithub size={15} aria-hidden="true" />
                  Server
                </a>
              )}
            </div>
          </div>
        </div>

        <Mask className="relative order-1 aspect-16/10 overflow-hidden bg-panel-2 lg:order-2 lg:m-3 lg:rounded-card">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45"
          >
            <ArrowUpRight size={22} />
          </span>
        </Mask>
      </article>

      {!reduce && !isLast && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden rounded-card bg-ink lg:block"
          style={{ opacity: dim }}
        />
      )}
    </motion.li>
  );
}

export default function ProjectStack({ projects }) {
  const [refs] = useState(() => projects.map(() => ({ current: null })));

  return (
    <ul className="flex flex-col gap-8 lg:block">
      {projects.map((project, index) => (
        <StackItem
          key={project.slug}
          project={project}
          index={index}
          total={projects.length}
          selfRef={refs[index]}
          nextRef={refs[index + 1]}
        />
      ))}
    </ul>
  );
}
