'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowDown, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { personalInfo } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';
import { variants } from '@/lib/constants';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 py-20 md:py-0">
        <div className="flex flex-col gap-6 order-2 md:order-1 items-center md:items-start text-center md:text-left">
          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="w-fit"
          >
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-violet-500/10 border border-violet-500/20 text-violet-400">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Available for work
            </span>
          </motion.div>

          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-[var(--font-syne)] text-white leading-tight tracking-tight">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Tawchiful
              </span>
            </h1>
            <h2 className="text-lg md:text-xl font-medium text-white/30 tracking-widest uppercase">
              {personalInfo.title}
            </h2>
          </motion.div>

          <motion.p
            variants={variants.fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="text-white/40 text-sm md:text-base leading-relaxed max-w-md"
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.3)]"
            >
              View Projects
            </motion.button>

            <motion.a
              href={personalInfo.resume}
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-300"
            >
              <Download size={14} />
              Resume
            </motion.a>
          </motion.div>

          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="flex items-center gap-5 pt-4"
          >
            {[
              {
                icon: <FaGithub size={18} />,
                href: personalInfo.social.github,
                label: 'GitHub',
              },
              {
                icon: <FaLinkedin size={18} />,
                href: personalInfo.social.linkedin,
                label: 'LinkedIn',
              },
              {
                icon: <FaXTwitter size={18} />,
                href: personalInfo.social.twitter,
                label: 'Twitter',
              },
            ].map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white/20 hover:text-white transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
            <div className="w-px h-4 bg-white/10" />
            <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase font-medium">
              {personalInfo.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          variants={variants.slideRight}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="relative flex justify-center items-center order-1 md:order-2"
        >
          <div className="absolute w-72 h-72 bg-violet-600/20 rounded-full blur-[100px]" />

          <div className="relative w-64 h-80 md:w-80 md:h-[420px] rounded-[3rem] overflow-hidden border border-white/[0.08] bg-white/[0.02] shadow-2xl">
            <Image
              src={personalInfo.image}
              alt={personalInfo.name}
              fill
              className="object-cover object-top scale-105 hover:scale-100 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-6 -left-6 px-5 py-4 rounded-3xl bg-[#0a0a0b]/80 backdrop-blur-2xl border border-white/8 shadow-2xl"
          >
            <p className="text-[9px] text-white/20 tracking-[0.3em] uppercase mb-1">
              Stack
            </p>
            <p className="text-sm font-bold text-white tracking-tight">
              Frontend Dev 🚀
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/10 hover:text-white/40 transition-all duration-300"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-bold">
          Scroll
        </span>
        <div className="p-2 rounded-full border border-white/5">
          <ArrowDown size={12} />
        </div>
      </motion.button>
    </section>
  );
}
