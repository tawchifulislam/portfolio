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
      className="px-5 pb-14 pt-28 sm:px-8 lg:px-14 lg:pb-20 lg:pt-32"
    >
      <motion.div
        variants={variants.staggerContainer}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        className="mx-auto grid max-w-340 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14"
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
            {personalInfo.headline}
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
          className="relative flex justify-center p-5"
        >
          <div
            aria-hidden="true"
            className="absolute right-4 top-0 aspect-square w-4/5 max-w-75 rounded-full bg-brass opacity-[0.16] sm:right-7.5"
          />

          <div className="relative aspect-34/43 w-full max-w-85 overflow-hidden rounded-t-[200px] rounded-b-[28px] border border-line-2 bg-panel-2">
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

          <aside className="card absolute bottom-0 left-0 max-w-62.5 px-5 py-4 shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
            <p className="eyebrow mb-1">Recently completed</p>
            <p className="text-sm leading-snug text-paper/80">
              {personalInfo.justFinished}
            </p>
          </aside>
        </motion.div>
      </motion.div>
    </section>
  );
}
