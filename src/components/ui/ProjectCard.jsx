'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { variants } from '@/lib/constants';

export default function ProjectCard({ project }) {
  const { id, title, description, tags, liveUrl, githubUrl, featured, image } =
    project;

  return (
    <motion.div
      variants={variants.staggerItem}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col h-full rounded-4xl border border-white/8 bg-[#0a0a0c] hover:border-violet-500/40 overflow-hidden transition-all duration-700 shadow-2xl"
    >
      <div className="relative w-full aspect-16/10 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top group-hover:scale-110 transition-transform duration-1000"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-[#0a0a0c]/20 to-transparent" />

        {featured && (
          <span className="absolute top-5 right-5 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase bg-violet-600 text-white shadow-2xl">
            Featured
          </span>
        )}

        <Link
          href={`/projects/${id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[3px]"
        >
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black text-[10px] font-black tracking-[0.2em] uppercase shadow-2xl">
              Project Details
              <ArrowUpRight size={14} strokeWidth={3} />
            </span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-4 p-7 flex-1">
        <h3 className="text-xl font-bold font-[--font-syne] text-white tracking-tight">
          {title}
        </h3>

        <p className="text-white/40 text-sm leading-relaxed flex-1 line-clamp-3 font-medium">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg text-[10px] font-bold text-white/30 bg-white/3 border border-white/5 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-4">
          <Link
            href={`/projects/${id}`}
            className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-violet-400 hover:text-white transition-all duration-300"
          >
            Details
          </Link>

          <div className="flex items-center gap-5">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white transition-colors duration-300"
              title="Live Demo"
            >
              <ExternalLink size={18} />
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white transition-colors duration-300"
              title="Source Code"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
