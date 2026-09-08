'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';
import { personalInfo } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';
import { variants } from '@/lib/constants';
import CornerMarks from '@/components/ui/CornerMarks';
import TitleBlock from '@/components/ui/TitleBlock';

const socials = [
  {
    icon: <FaGithub size={16} />,
    href: personalInfo.social.github,
    label: 'GitHub',
  },
  {
    icon: <FaLinkedin size={16} />,
    href: personalInfo.social.linkedin,
    label: 'LinkedIn',
  },
  {
    icon: <FaXTwitter size={16} />,
    href: personalInfo.social.twitter,
    label: 'Twitter',
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-4 sm:px-8 lg:px-12 py-28"
    >
      <div className="sheet blueprint-grid w-full max-w-7xl mx-auto">
        <CornerMarks />

        <motion.div
          variants={variants.staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 p-8 sm:p-12 lg:p-16"
        >
          <div className="lg:col-span-7 flex flex-col justify-center gap-6">
            <motion.p
              variants={variants.staggerItem}
              className="font-mono text-xs tracking-wide text-brass"
            >
              {personalInfo.title} / {personalInfo.location}
            </motion.p>

            <motion.h1
              variants={variants.staggerItem}
              className="font-display text-display font-semibold text-paper leading-[0.95] tracking-tight"
            >
              {personalInfo.name}
            </motion.h1>

            <motion.p
              variants={variants.staggerItem}
              className="measure-lg text-sm sm:text-base text-muted leading-relaxed"
            >
              {personalInfo.bio}
            </motion.p>

            <motion.div
              variants={variants.staggerItem}
              className="flex flex-wrap items-center gap-4 mt-2"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="px-7 py-3 bg-brass text-ink text-xs font-medium tracking-wide hover:bg-paper transition-colors duration-300"
              >
                View Projects
              </button>

              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-7 py-3 border border-line text-muted text-xs font-medium tracking-wide hover:border-faint hover:text-paper transition-colors duration-300"
              >
                <FaEye size={13} /> Resume
              </a>
            </motion.div>

            <motion.div
              variants={variants.staggerItem}
              className="flex items-center gap-5 mt-4"
            >
              {socials.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted hover:text-paper transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={variants.staggerItem}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm aspect-3/4 border border-line">
              <Image
                src={personalInfo.image}
                alt={personalInfo.name}
                fill
                className="object-cover grayscale-[0.15]"
                priority
              />
              <span className="absolute top-3 left-3 w-3 h-3 bg-brass" />
              <span className="absolute bottom-3 right-3 w-3 h-3 bg-brass" />
            </div>
          </motion.div>
        </motion.div>

        <TitleBlock status="Available for work" />
      </div>
    </section>
  );
}
