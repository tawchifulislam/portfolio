'use client';

import { motion } from 'framer-motion';
import { variants } from '@/lib/constants';

const categoryCodes = {
  core: 'CO',
  frontend: 'FE',
  backend: 'BE',
  tools: 'TL',
};

export default function TechBadge({ name, category }) {
  return (
    <motion.div
      variants={variants.staggerItem}
      className="group flex items-center gap-2.5 py-2 border-b border-line last:border-b-0"
    >
      <span className="flex items-center justify-center w-7 h-7 shrink-0 border border-line font-mono text-[10px] text-muted group-hover:border-brass group-hover:text-brass transition-colors duration-300">
        {categoryCodes[category]}
      </span>
      <span className="text-sm text-paper/80 group-hover:text-paper transition-colors duration-300">
        {name}
      </span>
    </motion.div>
  );
}
