'use client';

import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-14">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-h1 font-semibold text-paper leading-[1.05] tracking-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="measure mt-3 text-sm sm:text-base text-muted leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
