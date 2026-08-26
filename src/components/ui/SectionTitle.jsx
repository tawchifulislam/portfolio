'use client';

import { motion } from 'framer-motion';

function WordReveal({ text, className }) {
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariant = {
    hidden: {
      y: '110%',
      opacity: 0,
      rotateX: -20,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom mr-[0.3em] last:mr-0"
        >
          <motion.span variants={wordVariant} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}

export default function SectionTitle({ title = '', subtitle = '' }) {
  return (
    <div className="text-center mb-16">
      <WordReveal
        text={title}
        className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="text-gray-400 text-lg max-w-xl mx-auto px-4"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="mt-5 mx-auto w-16 h-0.5 rounded-full bg-linear-to-r from-violet-500 to-indigo-500 origin-left"
      />
    </div>
  );
}
