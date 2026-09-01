'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Globe, ArrowRight } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { variants } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';
import SectionTitle from '../ui/SectionTitle';

const stats = [
  { label: 'Projects', value: '5+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Hours of Coding', value: '1000+' },
];

const codeLines = [
  { token: 'const', name: ' developer', color: 'text-violet-400' },
  { token: '=', name: ' {', color: 'text-white/40' },
  { token: '  name:', name: ' "Tawchiful"', color: 'text-emerald-400' },
  {
    token: '  role:',
    name: ' "Full-Stack Developer"',
    color: 'text-emerald-400',
  },
  {
    token: '  stack:',
    name: ' ["React", "Next.js", "Node.js"]',
    color: 'text-amber-400',
  },
  { token: '  status:', name: ' "Open for Innovation"', color: 'text-sky-400' },
  { token: '}', name: '', color: 'text-white/40' },
];

const focuses = [
  {
    number: '01',
    title: 'Full Stack Architecture',
    desc: 'Building end-to-end systems - from React interfaces to Express APIs and MongoDB schemas - with clear separation of concerns.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'hover:border-violet-500/25',
  },
  {
    number: '02',
    title: 'Real-World Problem Solving',
    desc: "Every project I build solves a real problem - whether it's booking a doctor, managing a gym, or planning a trip.",
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'hover:border-emerald-500/25',
  },
  {
    number: '03',
    title: 'UI That Feels Right',
    desc: 'Clean, responsive interfaces built with Tailwind and Framer Motion - fast to load, intuitive to use.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'hover:border-amber-500/25',
  },
  {
    number: '04',
    title: 'Secure by Default',
    desc: 'JWT authentication, role-based access control, and protected routes - security is part of the design, not an afterthought.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'hover:border-sky-500/25',
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 px-4 sm:px-6">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          title="About Me"
          subtitle="A little bit about who I am and what I do."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left */}
          <motion.div
            variants={variants.slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-5"
          >
            {/* Code block */}
            <div className="p-6 rounded-3xl bg-white/2 border border-white/[0.07] backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-3 text-[10px] text-white/20 tracking-[0.2em] uppercase font-mono">
                  about.js
                </span>
              </div>
              <div className="font-mono text-[12px] space-y-2">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-white/10 text-[10px] w-5 text-right select-none tabular-nums shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-violet-400/90 shrink-0">
                      {line.token}
                    </span>
                    <span className={`${line.color} truncate`}>
                      {line.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-5 rounded-2xl bg-white/2 border border-white/[0.07] text-center hover:border-violet-500/20 transition-all duration-300"
                >
                  <p className="text-2xl font-bold text-white font-[--font-syne]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[9px] tracking-[0.18em] uppercase text-white/20">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Info items */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: <MapPin size={14} />, text: personalInfo.location },
                { icon: <Mail size={14} />, text: personalInfo.email },
                { icon: <Globe size={14} />, text: 'tawchif.vercel.app' },
              ].map(item => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-white/2 border border-white/6 hover:border-violet-500/15 transition-all duration-300"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
                    {item.icon}
                  </span>
                  <span className="text-sm text-white/40 tracking-wide truncate">
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
              className="relative overflow-hidden w-full flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.25)] before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-700"
            >
              <Mail size={14} />
              Let&apos;s Talk
            </motion.button>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={variants.slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Bio */}
            <div className="p-7 rounded-3xl bg-white/2 border border-white/[0.07] backdrop-blur-xl">
              <h3 className="text-2xl sm:text-3xl font-bold font-[--font-syne] text-white leading-tight mb-6">
                Full-Stack Developer,{' '}
                <span className="text-violet-400">
                  building toward Mastery.
                </span>
              </h3>
              <div className="space-y-4 text-white/40 text-sm leading-relaxed">
                <p>
                  My formal programming journey began in 2025 - but the
                  curiosity started long before. I had been exploring and
                  absorbing everything I could about software development before
                  writing my first line of code.
                </p>
                <p>
                  What drives me most is{' '}
                  <span className="text-white/75 font-medium">
                    problem solving
                  </span>{' '}
                  - that moment when a complex challenge finally clicks into
                  place. I build things that solve real problems for real
                  people.
                </p>
                <p>
                  Outside of code - books across all genres, and football keep
                  me sharp, both mentally and physically.
                </p>
              </div>
            </div>

            {/* Focus areas - 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {focuses.map((item, i) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`group p-5 rounded-2xl bg-white/2 border border-white/6 ${item.border} transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-[10px] font-black tabular-nums ${item.color}`}
                    >
                      {item.number}
                    </span>
                    <div
                      className={`w-6 h-px ${item.bg.replace('bg-', 'bg-').replace('/10', '/40')}`}
                    />
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider ${item.color}`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-white/30 leading-relaxed group-hover:text-white/50 transition-colors duration-300">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA - view projects */}
            <button
              onClick={() => scrollToSection('projects')}
              className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-violet-400 transition-colors duration-300 self-start"
            >
              View My Projects
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
