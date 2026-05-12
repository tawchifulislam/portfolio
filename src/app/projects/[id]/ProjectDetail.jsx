'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  Zap,
  ArrowUpRight,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { variants } from '@/lib/constants';

export default function ProjectDetail({ project }) {
  if (!project) return null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-125 bg-violet-600/4 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-indigo-600/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
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

          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.05 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {project.featured && (
              <span className="px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20">
                Featured
              </span>
            )}

            {project.tags?.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10px] text-white/25 bg-white/3 border border-white/6"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={variants.fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-[--font-syne] text-white leading-tight mb-5"
          >
            {project.title}
          </motion.h1>

          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"
          >
            <p className="text-white/35 text-sm sm:text-base leading-relaxed max-w-xl">
              {project.description}
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] whitespace-nowrap"
              >
                <ExternalLink size={13} />
                Live Demo
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/9 border border-white/10 text-white/50 hover:text-white text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap"
              >
                <FaGithub size={13} />
                Source
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative w-full px-4 sm:px-6 mb-20"
      >
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/8 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              priority
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-32">
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

            <ul className="flex flex-col gap-4">
              {project.challenges?.map((item, i) => (
                <li key={i} className="flex gap-4 group/item">
                  <span className="text-[9px] font-black text-amber-400/40 mt-0.5 shrink-0 tabular-nums pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="h-px w-4 bg-amber-400/20 mt-2 shrink-0" />

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

            <ul className="flex flex-col gap-4">
              {project.improvements?.map((item, i) => (
                <li key={i} className="flex gap-4 group/item">
                  <span className="text-[9px] font-black text-violet-400/40 mt-0.5 shrink-0 tabular-nums pt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="h-px w-4 bg-violet-400/20 mt-2 shrink-0" />

                  <p className="text-xs text-white/30 leading-relaxed group-hover/item:text-white/50 transition-colors duration-300">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/#projects"
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/2 hover:bg-white/5 border border-white/[0.07] hover:border-violet-500/25 text-white/25 hover:text-white/60 text-[10px] font-black tracking-[0.25em] uppercase transition-all duration-500"
          >
            <ArrowLeft
              size={13}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to All Projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
