'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ExternalLink,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectStack({ projects }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrent(i => (i === 0 ? projects.length - 1 : i - 1));
  };

  const next = () => {
    setDirection(1);
    setCurrent(i => (i === projects.length - 1 ? 0 : i + 1));
  };

  const getCardStyle = offset => {
    const absOffset = Math.abs(offset);
    if (absOffset > 2) return null;
    return {
      zIndex: 10 - absOffset,
      scale: 1 - absOffset * 0.05,
      y: offset * 14,
      rotateZ: offset * 2,
      opacity: absOffset === 2 ? 0.4 : absOffset === 1 ? 0.7 : 1,
    };
  };

  return (
    <div className="relative w-full">
      {/* Stack area */}
      <div className="relative h-130 sm:h-140 flex items-center justify-center">
        {/* Background cards - stack effect */}
        {[-2, -1, 1, 2].map(offset => {
          const idx = (current + offset + projects.length) % projects.length;
          const style = getCardStyle(offset);
          if (!style) return null;
          const project = projects[idx];

          return (
            <motion.div
              key={`bg-${idx}`}
              animate={{
                scale: style.scale,
                y: style.y,
                rotate: style.rotateZ,
                opacity: style.opacity,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute w-full max-w-2xl rounded-3xl border border-white/6 bg-[#0d0d10] overflow-hidden"
              style={{ zIndex: style.zIndex }}
            >
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top opacity-60"
                />
              </div>
              <div className="p-7 h-52" />
            </motion.div>
          );
        })}

        {/* Active card */}
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, x: direction * -60, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0d0d10] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            style={{ zIndex: 20 }}
          >
            {/* Image */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={projects[current].image}
                alt={projects[current].title}
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0d0d10] via-[#0d0d10]/20 to-transparent" />

              {/* Counter */}
              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                <span className="text-[10px] font-black text-white/60 tracking-widest">
                  {String(current + 1).padStart(2, '0')} /{' '}
                  {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              {projects[current].featured && (
                <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase bg-violet-600 text-white">
                  Featured
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-7">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-2xl font-bold font-[--font-syne] text-white tracking-tight">
                  {projects[current].title}
                </h3>
                <Link
                  href={`/projects/${projects[current].id}`}
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black tracking-[0.15em] uppercase transition-colors duration-300"
                >
                  Details
                  <ArrowUpRight size={12} strokeWidth={3} />
                </Link>
              </div>

              <p className="text-white/40 text-sm leading-relaxed line-clamp-2 mb-5">
                {projects[current].description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {projects[current].tags.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white/25 bg-white/4 border border-white/6 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                  {projects[current].tags.length > 4 && (
                    <span className="px-2.5 py-1 text-[10px] font-bold text-white/20 uppercase tracking-wider">
                      +{projects[current].tags.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <a
                    href={projects[current].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/25 hover:text-violet-400 transition-colors duration-300"
                    title="Live Demo"
                  >
                    <ExternalLink size={17} />
                  </a>

                  <a
                    href={projects[current].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/25 hover:text-white transition-colors duration-300"
                    title="Source Code"
                  >
                    <FaGithub size={17} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/4 border border-white/8 text-white/40 hover:text-white hover:border-violet-500/40 transition-all duration-300"
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-6 h-2 bg-violet-500'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <motion.button
          onClick={next}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/4 border border-white/8 text-white/40 hover:text-white hover:border-violet-500/40 transition-all duration-300"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
