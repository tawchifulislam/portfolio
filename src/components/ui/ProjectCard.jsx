'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import {
  ExternalLink,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectStack({ projects }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const go = useCallback(
    (index, dir) => {
      if (isAnimating) return;
      setDirection(dir);
      setCurrent(index);
    },
    [isAnimating],
  );

  const prev = useCallback(
    () => go(current === 0 ? projects.length - 1 : current - 1, -1),
    [current, go, projects.length],
  );
  const next = useCallback(
    () => go(current === projects.length - 1 ? 0 : current + 1, 1),
    [current, go, projects.length],
  );

  // Keyboard navigation
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
    enter: dir => ({ x: dir * 80, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: dir => ({ x: dir * -80, opacity: 0, scale: 0.98 }),
  };

  return (
    <div className="relative w-full">
      {/* Main card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-[#0c0c0f]">
        <AnimatePresence
          mode="wait"
          custom={direction}
          onExitComplete={() => setIsAnimating(false)}
        >
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            {/* Image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top scale-[1.02] hover:scale-100 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0c0c0f] via-[#0c0c0f]/30 to-transparent" />

              {/* Top badges */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                {project.featured ? (
                  <span className="px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase bg-violet-600 text-white shadow-lg">
                    Featured
                  </span>
                ) : (
                  <span />
                )}
                <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-black text-white/50 tracking-widest">
                  {String(current + 1).padStart(2, '0')} /{' '}
                  {String(projects.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-7 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">
                {/* Left — title + desc */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl md:text-3xl font-bold font-[--font-syne] text-white tracking-tight mb-3">
                    {project.title}
                  </h3>
                  <p className="text-white/35 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.slice(0, 5).map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white/20 bg-white/4 border border-white/5 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 5 && (
                      <span className="px-2.5 py-1 text-[10px] font-bold text-white/15 uppercase tracking-wider">
                        +{project.tags.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right — actions */}
                <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                  <Link
                    href={`/projects/${project.id}`}
                    className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black tracking-[0.15em] uppercase transition-colors duration-300 before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-700"
                  >
                    Case Study
                    <ArrowUpRight size={12} strokeWidth={3} />
                  </Link>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/4 border border-white/[0.07] text-white/25 hover:text-violet-400 hover:border-violet-500/30 transition-all duration-300"
                      title="Live Demo"
                    >
                      <ExternalLink size={15} />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/4 border border-white/[0.07] text-white/25 hover:text-white hover:border-white/20 transition-all duration-300"
                      title="Source Code"
                    >
                      <FaGithub size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5 px-1">
        {/* Prev */}
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/3 border border-white/[0.07] text-white/30 hover:text-white hover:border-white/20 transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={14} />
          Prev
        </motion.button>

        {/* Progress line */}
        <div className="flex items-center gap-1.5 flex-1 mx-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              className="relative flex-1 h-px group"
            >
              <div className="absolute inset-0 bg-white/10 rounded-full" />
              <motion.div
                animate={{ scaleX: i === current ? 1 : 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0 bg-violet-500 rounded-full origin-left"
              />
            </button>
          ))}
        </div>

        {/* Next */}
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.05, x: 2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/3 border border-white/[0.07] text-white/30 hover:text-white hover:border-white/20 transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
        >
          Next
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </div>
  );
}
