'use client';

import { motion } from 'framer-motion';
import {
  Download,
  MapPin,
  Mail,
  Code2,
  Braces,
  GitBranch,
  Globe,
} from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { variants } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import { scrollToSection } from '@/lib/utils';

const stats = [
  { label: 'Projects Built', value: '4+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Months Learning', value: '5+' },
];

const infoItems = [
  { icon: <MapPin size={13} />, text: personalInfo.location },
  { icon: <Mail size={13} />, text: personalInfo.email },
  { icon: <Globe size={13} />, text: 'tawchif.vercel.app' },
];

const codeLines = [
  { token: 'const', name: ' developer', color: 'text-violet-400' },
  { token: '=', name: ' {', color: 'text-white/40' },
  { token: '  name:', name: ' "Tawchiful"', color: 'text-emerald-400' },
  { token: '  role:', name: ' "Frontend Dev"', color: 'text-emerald-400' },
  { token: '  stack:', name: ' ["React", "Next.js"]', color: 'text-amber-400' },
  { token: '  status:', name: ' "Building 🚀"', color: 'text-sky-400' },
  { token: '}', name: '', color: 'text-white/40' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-12 md:py-16 -mt-20 overflow-hidden px-4 sm:px-6"
    >
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="About Me"
          subtitle="A little bit about who I am and what I do."
        />

        <div className="mt-16 flex flex-col md:flex-row items-start justify-between gap-12 lg:gap-20">
          <motion.div
            variants={variants.slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full md:w-[45%]"
          >
            <div className="relative p-6 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/[0.06]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="ml-3 text-[11px] text-white/20 tracking-widest uppercase">
                  about.js
                </span>
              </div>

              <div className="font-mono text-[13px] space-y-1 mb-8">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-white/10 text-[10px] w-4 text-right select-none">
                      {i + 1}
                    </span>
                    <span className="text-violet-400/80">{line.token}</span>
                    <span className={line.color}>{line.name}</span>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {stats.map(stat => (
                  <div
                    key={stat.label}
                    className="text-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
                  >
                    <p className="text-xl font-bold font-[var(--font-syne)] text-white">
                      {stat.value}
                    </p>
                    <p className="text-[9px] text-white/20 tracking-widest uppercase mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {infoItems.map(item => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                  >
                    <span className="text-violet-400/80">{item.icon}</span>
                    <span className="text-[11px] text-white/30 tracking-wide">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={variants.slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full md:w-[50%] flex flex-col gap-8 text-left"
          >
            <div className="space-y-5">
              <h3 className="text-2xl md:text-3xl font-bold font-[var(--font-syne)] text-white leading-tight">
                Frontend Developer,{' '}
                <span className="text-violet-400">
                  building toward Full Stack.
                </span>
              </h3>
              <p className="text-white/40 leading-relaxed text-sm md:text-base">
                {personalInfo.bio}
              </p>
            </div>

            <div className="w-full flex flex-col gap-3">
              {[
                {
                  icon: <Code2 size={14} />,
                  title: 'Clean Code',
                  desc: 'Writing readable, maintainable code is a priority.',
                },
                {
                  icon: <Code2 size={14} />,
                  title: 'Modern Stack',
                  desc: 'React, Next.js, Tailwind — always up to date.',
                },
                {
                  icon: <Code2 size={14} />,
                  title: 'Always Learning',
                  desc: 'Currently mastering Node.js, Express & MongoDB.',
                },
              ].map(item => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/20 transition-all duration-300"
                >
                  <span className="mt-1 p-2 rounded-lg bg-violet-500/10 text-violet-400">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white/80 font-[var(--font-syne)] uppercase tracking-wider">
                      {item.title}
                    </p>
                    <p className="text-xs text-white/20 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
