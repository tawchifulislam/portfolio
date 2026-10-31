'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Mask from '@/components/ui/Mask';

const iconButton =
  'flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:bg-accent hover:text-on-accent';

export default function ProjectList({ projects }) {
  const [active, setActive] = useState(-1);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 24 });
  const springY = useSpring(y, { stiffness: 180, damping: 24 });

  const handleMove = event => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  return (
    <>
      <ul
        onPointerMove={handleMove}
        onPointerLeave={() => setActive(-1)}
        className="border-b border-line [&:hover>li:not(:hover)]:opacity-40"
      >
        {projects.map((project, index) => (
          <li
            key={project.slug}
            data-cursor="view"
            onPointerEnter={() => setActive(index)}
            className="group relative border-t border-line py-8 transition-opacity duration-300 lg:py-10"
          >
            <Mask className="relative mb-6 aspect-16/10 overflow-hidden bg-card lg:hidden">
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(min-width: 640px) 90vw, 100vw"
                className="object-cover object-top"
              />
            </Mask>

            <div className="grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_auto] lg:items-center">
              <h3 className="font-display text-[clamp(2rem,1rem+3vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:group-hover:translate-x-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {project.title}
                  <span className="sr-only"> case study</span>
                </Link>
              </h3>

              <div>
                <p className="max-w-sm text-soft">{project.summary}</p>
                {project.tags?.length > 0 && (
                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label="Technologies"
                  >
                    {project.tags.slice(0, 4).map(tag => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <ul className="relative z-10 flex items-center gap-2">
                {project.liveUrl && (
                  <li>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                      className={iconButton}
                    >
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  </li>
                )}
                {project.githubUrl && (
                  <li>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} ${project.serverUrl ? 'client' : 'source'} code`}
                      className={iconButton}
                    >
                      <FaGithub size={17} aria-hidden="true" />
                    </a>
                  </li>
                )}
                {project.serverUrl && (
                  <li>
                    <a
                      href={project.serverUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} server code`}
                      className={iconButton}
                    >
                      <FaGithub size={17} aria-hidden="true" />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-30 hidden h-60 w-96 -translate-y-1/2 translate-x-10 overflow-hidden rounded-2xl bg-card shadow-2xl lg:block"
          style={{ x: springX, y: springY }}
          animate={{
            opacity: active >= 0 ? 1 : 0,
            scale: active >= 0 ? 1 : 0.85,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {projects.map((project, index) => (
            <Image
              key={project.slug}
              src={project.image}
              alt=""
              fill
              sizes="384px"
              className={`object-cover object-top transition-opacity duration-300 ${
                active === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </motion.div>
      )}
    </>
  );
}
