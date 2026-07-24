'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  Zap,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { variants } from '@/lib/constants';

export default function ProjectDetail({ project, index, total, nextProject }) {
  const imageRef = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  if (!project) return null;

  function handleMouseMove(e) {
    const bounds = imageRef.current.getBoundingClientRect();
    const px = (e.clientX - bounds.left) / bounds.width - 0.5;
    const py = (e.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Grain texture */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.025] pointer-events-none mix-blend-overlay z-0">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-violet-600/4 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-indigo-600/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full pt-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-14"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.25em] uppercase text-white/25 hover:text-white/60 transition-colors duration-300 group"
            >
              <ArrowLeft
                size={13}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              Back to Projects
            </Link>
          </motion.div>

          {/* Hero: two-column with layered index numeral */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 mb-20">
            <div className="lg:col-span-5 relative">
              {index && (
                <span
                  aria-hidden
                  className="absolute -top-10 -left-2 text-[7rem] sm:text-[9rem] font-black font-[--font-syne] text-white/[0.035] leading-none select-none pointer-events-none"
                >
                  {String(index).padStart(2, '0')}
                </span>
              )}

              <motion.div
                variants={variants.fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.05 }}
                className="relative flex flex-wrap gap-2 mb-5"
              >
                {project.featured && (
                  <span className="px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    Featured
                  </span>
                )}
                {total && (
                  <span className="px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase text-white/25 bg-white/3 border border-white/6">
                    {String(index).padStart(2, '0')} /{' '}
                    {String(total).padStart(2, '0')}
                  </span>
                )}
              </motion.div>

              <motion.h1
                variants={variants.fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="relative text-4xl sm:text-5xl font-bold font-[--font-syne] text-white leading-[1.05] mb-5"
              >
                {project.title}
              </motion.h1>

              <motion.p
                variants={variants.fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
                className="text-white/35 text-sm sm:text-base leading-relaxed mb-8"
              >
                {project.description}
              </motion.p>

              <motion.div
                variants={variants.fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-1.5 mb-8"
              >
                {project.tags?.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[10px] text-white/25 bg-white/3 border border-white/6 hover:border-violet-500/20 hover:text-white/45 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={variants.fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.25 }}
                className="flex items-center gap-3"
              >
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_32px_rgba(124,58,237,0.5)] whitespace-nowrap"
                >
                  <ExternalLink size={13} />
                  Live Demo
                </motion.a>

                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/9 border border-white/10 text-white/50 hover:text-white text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-300 whitespace-nowrap"
                >
                  <FaGithub size={13} />
                  Source
                </motion.a>
              </motion.div>
            </div>

            {/* Tilt image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-7"
              style={{ perspective: 1200 }}
            >
              <motion.div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/8 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-white/5" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          variants={variants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-white/6" />
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white/20">
              Overview
            </span>
            <div className="h-px flex-1 bg-white/6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-white/40 text-sm sm:text-base leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white/2 border border-white/6">
                <p className="text-[9px] font-black tracking-[0.2em] uppercase text-white/20 mb-2">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-lg text-[10px] text-violet-400/70 bg-violet-500/5 border border-violet-500/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/2 border border-white/6 hover:border-violet-500/25 transition-all duration-300"
              >
                <span className="text-[10px] font-bold text-white/30 group-hover:text-white/60 transition-colors duration-300">
                  Visit Live Site
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-white/20 group-hover:text-violet-400 transition-colors duration-300"
                />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            variants={variants.slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-white/2 border border-white/[0.07] hover:border-amber-500/15 transition-colors duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Zap size={14} />
              </span>
              <div>
                <h2 className="text-sm font-bold font-[--font-syne] uppercase tracking-wider text-white">
                  Challenges
                </h2>
                <p className="text-[9px] text-white/20 mt-0.5">
                  What made this project difficult
                </p>
              </div>
            </div>

            <ul className="relative flex flex-col gap-5 pl-1">
              <div className="absolute left-1.75 top-1 bottom-1 w-px bg-amber-400/15" />
              {project.challenges?.map((item, i) => (
                <li key={i} className="relative flex gap-4 group/item">
                  <span className="relative z-10 w-3.5 h-3.5 mt-0.5 rounded-full bg-[#0a0a0f] border border-amber-400/30 flex items-center justify-center shrink-0">
                    <span className="w-1 h-1 rounded-full bg-amber-400/60" />
                  </span>
                  <p className="text-xs text-white/30 leading-relaxed group-hover/item:text-white/50 transition-colors duration-300">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={variants.slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-white/2 border border-white/[0.07] hover:border-violet-500/15 transition-colors duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400">
                <Lightbulb size={14} />
              </span>
              <div>
                <h2 className="text-sm font-bold font-[--font-syne] uppercase tracking-wider text-white">
                  Future Plans
                </h2>
                <p className="text-[9px] text-white/20 mt-0.5">
                  What comes next for this project
                </p>
              </div>
            </div>

            <ul className="relative flex flex-col gap-5 pl-1">
              <div className="absolute left-1.75 top-1 bottom-1 w-px bg-violet-400/15" />
              {project.improvements?.map((item, i) => (
                <li key={i} className="relative flex gap-4 group/item">
                  <span className="relative z-10 w-3.5 h-3.5 mt-0.5 rounded-full bg-[#0a0a0f] border border-violet-400/30 flex items-center justify-center shrink-0">
                    <span className="w-1 h-1 rounded-full bg-violet-400/60" />
                  </span>
                  <p className="text-xs text-white/30 leading-relaxed group-hover/item:text-white/50 transition-colors duration-300">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {nextProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto px-4 sm:px-6 pb-28"
        >
          <Link
            href={`/projects/${nextProject.id}`}
            className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/2 hover:bg-white/4 border border-white/[0.07] hover:border-violet-500/25 transition-all duration-500"
          >
            <div>
              <p className="text-[9px] font-black tracking-[0.25em] uppercase text-white/20 mb-1">
                Next Project
              </p>
              <p className="text-base sm:text-lg font-bold font-[--font-syne] text-white/50 group-hover:text-white transition-colors duration-300">
                {nextProject.title}
              </p>
            </div>

            <ArrowRight
              size={16}
              className="text-white/20 group-hover:text-violet-400 group-hover:translate-x-1.5 transition-all duration-300"
            />
          </Link>
        </motion.div>
      )}
    </main>
  );
}
