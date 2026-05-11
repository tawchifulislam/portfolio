'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import { variants } from '@/lib/constants';

export default function ProjectCard({ project }) {
  const { title, description, tags, liveUrl, githubUrl, featured, image } =
    project;

  return (
    <motion.div
      variants={variants.staggerItem}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col h-full rounded-2xl border border-white/8 bg-white/2 hover:bg-white/4 transition-all duration-500 overflow-hidden"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {featured && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase bg-violet-600 text-white shadow-lg">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="text-base font-bold text-white">{title}</h3>

        <p className="text-sm text-white/40 leading-relaxed flex-1 line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-1">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] font-medium text-white/30 bg-white/3 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-2">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
          >
            <FaGithub size={13} />
            Source
          </a>
        </div>
      </div>
    </motion.div>
  );
}
