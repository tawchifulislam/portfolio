'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { variants } from '@/lib/constants';

const links = [
  { label: 'GitHub', href: personalInfo.social.github },
  { label: 'LinkedIn', href: personalInfo.social.linkedin },
  { label: 'X', href: personalInfo.social.twitter },
  { label: 'Résumé', href: personalInfo.resume, arrow: true },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden px-5 pb-14 pt-28 sm:px-8 lg:px-14 lg:pb-20 lg:pt-32"
    >
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0"
      />

      <motion.div
        variants={variants.staggerContainer}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        className="relative mx-auto grid max-w-340 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14"
      >
        <div>
          <motion.span
            variants={variants.staggerItem}
            className="chip inline-flex items-center gap-2 border-brass/35 text-brass"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass"
            />
            Open for work · {personalInfo.location}
          </motion.span>

          <motion.h1
            variants={variants.staggerItem}
            className="mb-5 mt-6 font-display text-display leading-[1.04] tracking-[-0.02em]"
          >
            Hi, I&apos;m Tawchiful. I build{' '}
            <span className="sketch-underline text-brass">whole products</span>,
            front to back.
          </motion.h1>

          <motion.p
            variants={variants.staggerItem}
            className="mb-8 max-w-135 text-[1.0625rem] text-muted sm:text-lg"
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
            variants={variants.staggerItem}
            className="mb-7 flex flex-wrap gap-3.5"
          >
            <a href="#work" className="btn btn-primary">
              See what I&apos;ve built
            </a>
            <a href="#contact" className="btn btn-outline">
              Say hello
            </a>
          </motion.div>

          <motion.ul
            variants={variants.staggerItem}
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
          >
            {links.map(item => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1"
                >
                  {item.label}
                  {item.arrow && <ArrowUpRight size={14} aria-hidden="true" />}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={variants.staggerItem}
          className="flex justify-center p-5"
        >
          <div className="relative w-full max-w-85">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 bg-[radial-gradient(closest-side,rgba(227,161,58,0.26),transparent)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -translate-y-4 translate-x-4 rounded-t-[200px] rounded-b-[28px] border border-brass/45"
            />

            <div className="relative aspect-34/43 overflow-hidden rounded-t-[200px] rounded-b-[28px] border border-line-2 bg-panel-2">
              {photoFailed ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[6rem] font-bold text-brass">
                    TI
                  </span>
                </div>
              ) : (
                <Image
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  fill
                  sizes="(min-width: 400px) 340px, 90vw"
                  priority
                  onError={() => setPhotoFailed(true)}
                  className="object-cover object-top"
                />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
