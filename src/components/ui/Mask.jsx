'use client';

import { motion, useReducedMotion } from 'motion/react';

export default function Mask({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, clipPath: 'inset(14% 10% 14% 10% round 28px)' }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
