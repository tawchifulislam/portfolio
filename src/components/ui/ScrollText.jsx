'use client';

import { Fragment, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

export default function ScrollText({ text, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.6'],
  });
  const words = String(text).split(' ');

  if (reduce) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <Word
            progress={scrollYProgress}
            range={[index / words.length, (index + 1.5) / words.length]}
          >
            {word}
          </Word>{' '}
        </Fragment>
      ))}
    </p>
  );
}
