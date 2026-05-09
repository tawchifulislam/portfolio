'use client';

import { motion } from 'framer-motion';
import { variants } from '@/lib/constants';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({ project }) {
  const { title, description, tags, liveUrl, githubUrl, featured } = project;

  return (
    <motion.div
      variants={variants.staggerItem}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-violet-500/40 hover:bg-white/10 transition-colors duration-300"
    >
      {featured && (
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-400 border border-violet-500/30">
          Featured
        </span>
      )}

      <h3 className="text-xl font-semibold text-white pr-20">{title}</h3>

      <p className="text-gray-400 text-sm leading-relaxed flex-1">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400 border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-2">
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
        >
          <ExternalLink size={16} />
          Live Demo
        </a>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors"
        >
          <Github size={16} />
          Source Code
        </a>
      </div>
    </motion.div>
  );
}
