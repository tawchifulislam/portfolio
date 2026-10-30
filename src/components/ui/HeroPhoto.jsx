'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

const CHIPS = [
  { label: 'Next.js', position: 'left-[-2%] top-[16%]', delay: 0 },
  { label: 'Node.js', position: 'right-[-3%] top-[40%]', delay: 0.9 },
  { label: 'MongoDB', position: 'bottom-[9%] left-[8%]', delay: 1.7 },
];

export default function HeroPhoto({ src, alt, ringText }) {
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const ringRotate = useTransform(scrollY, [0, 1400], [0, 220]);
  const imageY = useTransform(scrollY, [0, 800], [0, 56]);
  const imageScale = useTransform(scrollY, [0, 800], [1.02, 1.14]);

  return (
    <motion.div
      className="group relative mx-auto aspect-square w-full max-w-md"
      initial={{ opacity: 0, scale: reduce ? 1 : 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-12%] bg-[radial-gradient(closest-side,rgba(227,161,58,0.3),transparent)]"
      />

      <motion.svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
        style={reduce ? undefined : { rotate: ringRotate }}
      >
        <defs>
          <path
            id="hero-ring"
            d="M 100,100 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0"
          />
        </defs>
        <text
          className="fill-brass font-mono uppercase"
          fontSize="8.5"
          letterSpacing="2"
        >
          <textPath
            href="#hero-ring"
            textLength="550"
            lengthAdjust="spacing"
          >
            {ringText}
          </textPath>
        </text>
      </motion.svg>

      <div className="absolute inset-[11%] overflow-hidden rounded-full border border-brass/50 bg-panel-2">
        {failed || !src ? (
          <div className="flex h-full w-full items-center justify-center font-display text-7xl text-brass">
            TI
          </div>
        ) : (
          <motion.div
            className="relative h-full w-full"
            style={reduce ? undefined : { y: imageY, scale: imageScale }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 36vw, 90vw"
              onError={() => setFailed(true)}
              className="object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-brass mix-blend-multiply opacity-30 transition-opacity duration-700 group-hover:opacity-0"
            />
          </motion.div>
        )}
      </div>

      {CHIPS.map(chip => (
        <motion.span
          key={chip.label}
          aria-hidden="true"
          className={`chip absolute bg-ink/85 backdrop-blur-sm ${chip.position}`}
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{
            duration: 4.5,
            delay: chip.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {chip.label}
        </motion.span>
      ))}
    </motion.div>
  );
}
