'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import CornerMarks from './CornerMarks';
import TitleBlock from './TitleBlock';

export default function ProjectStack({ projects }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((index, dir) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const prev = useCallback(
    () => go(current === 0 ? projects.length - 1 : current - 1, -1),
    [current, go, projects.length],
  );
  const next = useCallback(
    () => go(current === projects.length - 1 ? 0 : current + 1, 1),
    [current, go, projects.length],
  );

  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  const project = projects[current];

  const slideVariants = {
    enter: dir => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: dir => ({ x: dir * -60, opacity: 0 }),
  };

  return (
    <div className="relative">
      <div className="sheet overflow-hidden">
        <CornerMarks />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={project.slug}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full h-64 sm:h-80 md:h-96 border-b border-line">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/10 to-transparent" />
            </div>

            <div className="p-7 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-h2 font-semibold text-paper tracking-tight mb-3">
                    {project.title}
                  </h3>
                  <p className="measure text-sm text-muted leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 font-mono text-[11px] text-faint">
                    {project.tags.slice(0, 5).map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                    {project.tags.length > 5 && (
                      <span>+{project.tags.length - 5}</span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="px-5 py-2.5 border border-brass-dim text-brass text-xs font-medium tracking-wide hover:bg-brass hover:text-ink transition-colors duration-300"
                  >
                    Case Study
                  </Link>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Demo"
                      className="w-9 h-9 flex items-center justify-center border border-line text-muted hover:text-brass hover:border-brass-dim transition-colors duration-300"
                    >
                      <ExternalLink size={14} />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Source Code"
                      className="w-9 h-9 flex items-center justify-center border border-line text-muted hover:text-paper hover:border-faint transition-colors duration-300"
                    >
                      <FaGithub size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <TitleBlock
          sheetNumber={String(current + 1).padStart(2, '0')}
          total={String(projects.length).padStart(2, '0')}
          status={project.featured ? 'FEATURED' : null}
          action={
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous project"
                className="w-7 h-7 flex items-center justify-center border border-line text-muted hover:text-paper hover:border-faint transition-colors duration-300"
              >
                <ArrowLeft size={12} />
              </button>
              <button
                onClick={next}
                aria-label="Next project"
                className="w-7 h-7 flex items-center justify-center border border-line text-muted hover:text-paper hover:border-faint transition-colors duration-300"
              >
                <ArrowRight size={12} />
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
}
