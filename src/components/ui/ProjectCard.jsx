'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { variants } from '@/lib/constants';

export default function ProjectCard({ project, index }) {
  const { title, description, tags, liveUrl, githubUrl, featured } = project;

  return (
    <motion.div variants={variants.staggerItem} className="group relative">
      <span className="absolute -top-4 left-0 text-[10px] font-black tracking-[0.3em] text-white/10 uppercase select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative flex flex-col md:flex-row items-start gap-6 py-8 border-t border-white/6 group-hover:border-violet-500/20 transition-colors duration-500">
        <div className="w-full md:w-1/3 flex flex-col gap-3 shrink-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-base font-(--font-syne) text-white/70 group-hover:text-white transition-colors duration-300">
              {title}
            </h3>
            {featured && (
              <span className="px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20">
                Featured
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium text-white/25 bg-white/3 border border-white/5 group-hover:border-white/10 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="flex-1 text-sm text-white/30 leading-relaxed group-hover:text-white/50 transition-colors duration-500">
          {description}
        </p>

        <div className="flex md:flex-col items-center gap-3 shrink-0 md:opacity-0 md:translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/4 hover:bg-violet-500/20 border border-white/8 hover:border-violet-500/30 text-white/30 hover:text-violet-400 transition-all duration-300"
            aria-label="Live Demo"
          >
            <ExternalLink size={14} />
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15 text-white/30 hover:text-white/70 transition-all duration-300"
            aria-label="Source Code"
          >
            <FaGithub size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
