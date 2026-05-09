'use client';

import { motion } from 'framer-motion';
import { variants } from '@/lib/constants';

export default function TechBadge({ name, category }) {
  const categoryColors = {
    core: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    frontend: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    backend: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    tools: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  };

  return (
    <motion.span
      variants={variants.staggerItem}
      whileHover={{ scale: 1.05 }}
      className={`px-4 py-2 rounded-full text-sm font-medium border ${categoryColors[category]} cursor-default`}
    >
      {name}
    </motion.span>
  );
}
