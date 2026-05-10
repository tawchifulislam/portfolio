'use client';

import { motion } from 'framer-motion';
import { techStack } from '@/lib/data';
import SectionTitle from '@/components/ui/SectionTitle';

const categories = [
  {
    key: 'core',
    label: 'Core',
    color: 'from-amber-500/10 to-transparent',
    border: 'hover:border-amber-500/30',
    text: 'text-amber-400/80',
    glow: 'group-hover:bg-amber-500/5',
  },
  {
    key: 'frontend',
    label: 'Frontend',
    color: 'from-violet-500/10 to-transparent',
    border: 'hover:border-violet-500/30',
    text: 'text-violet-400/80',
    glow: 'group-hover:bg-violet-500/5',
  },
  {
    key: 'backend',
    label: 'Backend',
    color: 'from-emerald-500/10 to-transparent',
    border: 'hover:border-emerald-500/30',
    text: 'text-emerald-400/80',
    glow: 'group-hover:bg-emerald-500/5',
  },
  {
    key: 'tools',
    label: 'Tools',
    color: 'from-sky-500/10 to-transparent',
    border: 'hover:border-sky-500/30',
    text: 'text-sky-400/80',
    glow: 'group-hover:bg-sky-500/5',
  },
];

export default function TechStack() {
  return (
    <section
      id="techstack"
      className="relative py-17 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-125 bg-violet-600/3 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Tech Stack"
          subtitle="A collection of tools and technologies I use to bring ideas to life."
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, ci) => {
            const filtered = techStack.filter(t => t.category === category.key);
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.6 }}
                className={`group relative p-8 rounded-4xl bg-white/2 border border-white/6 ${category.border} transition-all duration-500 overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div
                  className={`absolute -right-12 -top-12 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${category.glow}`}
                />

                <div className="relative flex justify-between items-center mb-8">
                  <span
                    className={`text-[10px] font-black tracking-[0.3em] uppercase ${category.text}`}
                  >
                    {category.label}
                  </span>
                  <div className="h-px flex-1 mx-6 bg-white/5" />
                  <span className="text-[10px] font-medium text-white/10 tabular-nums">
                    {filtered.length.toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="relative flex flex-wrap gap-2.5">
                  {filtered.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="px-4 py-2 rounded-xl bg-white/3 border border-white/5 hover:bg-white/8 hover:border-white/12 transition-all duration-300"
                    >
                      <span className="text-[12px] font-medium text-white/40 group-hover:text-white/80 transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
