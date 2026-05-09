'use client';

import { motion } from 'framer-motion';
import { variants } from '@/lib/constants';

export default function SectionTitle({ title = '', subtitle = '' }) {
  return (
    <motion.div
      variants={variants.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-lg max-w-xl mx-auto px-4">
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-violet-500" />
    </motion.div>
  );
}
