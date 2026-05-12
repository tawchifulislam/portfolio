'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Globe, Code2, Zap, BookOpen } from 'lucide-react';

import { personalInfo } from '@/lib/data';
import { variants } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import { scrollToSection } from '@/lib/utils';

const stats = [
  { label: 'Projects', value: '5+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Months', value: '5+' },
];

const codeLines = [
  { token: 'const', name: ' developer', color: 'text-violet-400' },
  { token: '=', name: ' {', color: 'text-white/40' },
  { token: '  name:', name: ' "Tawchiful"', color: 'text-emerald-400' },
  { token: '  role:', name: ' "Frontend Dev"', color: 'text-emerald-400' },
  {
    token: '  stack:',
    name: ' ["React", "Next.js"]',
    color: 'text-amber-400',
  },
  {
    token: '  status:',
    name: ' "Building 🚀"',
    color: 'text-sky-400',
  },
  { token: '}', name: '', color: 'text-white/40' },
];

const traits = [
  {
    icon: <Code2 size={15} />,
    title: 'Clean Code',
    desc: 'Writing readable, maintainable code is a priority.',
  },
  {
    icon: <Zap size={15} />,
    title: 'Modern Stack',
    desc: 'React, Next.js, Tailwind — always up to date.',
  },
  {
    icon: <BookOpen size={15} />,
    title: 'Always Learning',
    desc: 'Currently mastering Node.js, Express & MongoDB.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-18 px-4 sm:px-6">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-125 h-125 bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 5xl Standard Container */}
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionTitle
          title="About Me"
          subtitle="A little bit about who I am and what I do."
        />

        {/* Main Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 xl:gap-8 items-stretch">
          {/* LEFT SIDE */}
          <motion.div
            variants={variants.slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-5 h-full"
          >
            {/* Code Card */}
            <div className="p-6 sm:p-7 rounded-4xl bg-white/2.5 border border-white/[0.07] backdrop-blur-2xl shadow-[0_0_40px_rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />

                <span className="ml-3 text-[10px] text-white/20 tracking-[0.2em] uppercase font-mono">
                  about.js
                </span>
              </div>

              <div className="font-mono text-[12px] sm:text-[13px] space-y-2">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 overflow-x-auto"
                  >
                    <span className="text-white/10 text-[10px] w-5 text-right select-none tabular-nums shrink-0">
                      {i + 1}
                    </span>

                    <span className="text-violet-400/90 shrink-0">
                      {line.token}
                    </span>

                    <span className={`${line.color} break-all`}>
                      {line.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map(stat => (
                <div
                  key={stat.label}
                  className="p-4 sm:p-5 rounded-2xl bg-white/2.5 border border-white/[0.07] text-center hover:border-violet-500/20 transition-all duration-300"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-white font-[--font-syne]">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-white/20">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <MapPin size={14} />,
                  text: personalInfo.location,
                },
                {
                  icon: <Mail size={14} />,
                  text: personalInfo.email,
                },
                {
                  icon: <Globe size={14} />,
                  text: 'tawchif.vercel.app',
                },
              ].map(item => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 px-4 sm:px-5 py-4 rounded-2xl bg-white/2 border border-white/6 hover:border-violet-500/20 transition-all duration-300"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
                    {item.icon}
                  </span>

                  <span className="text-sm text-white/45 tracking-wide truncate">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_35px_rgba(124,58,237,0.25)]"
            >
              <Mail size={14} />
              Let&apos;s Talk
            </motion.button>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={variants.slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="h-full"
          >
            <div className="h-full p-6 sm:p-8 rounded-4xl bg-white/2.5 border border-white/[0.07] backdrop-blur-2xl flex flex-col justify-between">
              {/* Heading + Bio */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[--font-syne] text-white leading-tight">
                  Frontend Developer,
                  <span className="block mt-2 text-violet-400">
                    building toward Full Stack.
                  </span>
                </h3>

                {/* Bio */}
                <div className="mt-7 sm:mt-8 space-y-5 text-white/40 leading-relaxed text-sm sm:text-[15px]">
                  <p>
                    My formal programming journey began in 2025 — but the
                    curiosity and passion for it started long before. I had been
                    exploring, reading, and absorbing everything I could about
                    software development before writing my first line of code.
                  </p>

                  <p>
                    What drives me most is{' '}
                    <span className="text-white/75 font-medium">
                      problem solving
                    </span>{' '}
                    — that moment when a complex challenge finally clicks into
                    place. My goal is to use programming as a tool to solve
                    real-world problems that actually matter to people.
                  </p>

                  <p>
                    Outside of code, I enjoy reading books across a wide range
                    of genres, and I love playing football — it keeps me sharp,
                    both mentally and physically.
                  </p>
                </div>
              </div>

              {/* Traits */}
              <div className="mt-10 flex flex-col gap-3">
                {traits.map(item => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white/2 border border-white/6 hover:border-violet-500/20 transition-all duration-300 group"
                  >
                    <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-all duration-300 shrink-0">
                      {item.icon}
                    </span>

                    <div>
                      <p className="text-sm font-bold text-white/75 uppercase tracking-[0.15em]">
                        {item.title}
                      </p>

                      <p className="text-sm text-white/30 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
