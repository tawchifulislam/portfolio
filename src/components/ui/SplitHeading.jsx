'use client';

import { Fragment } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export default function SplitHeading({ id, text, className }) {
  const reduce = useReducedMotion();
  const words = String(text).split(' ');
  const item = {
    hidden: reduce ? { opacity: 0 } : { y: '115%' },
    show: reduce ? { opacity: 1 } : { y: 0 },
  };

  return (
    <motion.h2
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className="inline-block"
              variants={item}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </motion.h2>
  );
}
