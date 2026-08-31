'use client';

import { motion } from 'framer-motion';

import { techStack } from '@/lib/data';
import SectionTitle from '../ui/SectionTitle';
import {
  SiCss,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPrisma,
  SiReact,
  SiRender,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const categories = [
  {
    key: 'core',
    label: 'Core',
    color: 'from-amber-500/10 to-transparent',
    border: 'hover:border-amber-500/30',
    dot: 'bg-amber-400',
    text: 'text-amber-400/80',
  },
  {
    key: 'frontend',
    label: 'Frontend',
    color: 'from-violet-500/10 to-transparent',
    border: 'hover:border-violet-500/30',
    dot: 'bg-violet-400',
    text: 'text-violet-400/80',
  },
  {
    key: 'backend',
    label: 'Backend',
    color: 'from-emerald-500/10 to-transparent',
    border: 'hover:border-emerald-500/30',
    dot: 'bg-emerald-400',
    text: 'text-emerald-400/80',
  },
  {
    key: 'tools',
    label: 'Tools',
    color: 'from-sky-500/10 to-transparent',
    border: 'hover:border-sky-500/30',
    dot: 'bg-sky-400',
    text: 'text-sky-400/80',
  },
];

const techIcons = {
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss, color: '#1572B6' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  Prisma: { icon: SiPrisma, color: '#2D3748' },
  React: { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#38BDF8' },
  'Framer Motion': { icon: SiFramer, color: '#9C6FFF' },
  Shadcn: { icon: SiShadcnui, color: '#FFFFFF' },
  'Node.js': { icon: SiNodedotjs, color: '#6DA55F' },
  'Express.js': { icon: SiExpress, color: '#FFFFFF' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  JWT: { icon: SiJsonwebtokens, color: '#D63AFF' },
  Git: { icon: SiGit, color: '#F05032' },
  GitHub: { icon: SiGithub, color: '#FFFFFF' },
  'VS Code': { icon: VscVscode, color: '#007ACC' },
  Vercel: { icon: SiVercel, color: '#FFFFFF' },
  Netlify: { icon: SiNetlify, color: '#00C7B7' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  Render: { icon: SiRender, color: '#46E3B7' },
};

export default function TechStack() {
  return (
    <section
      id="techstack"
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-violet-600/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Tech Stack"
          subtitle="A collection of tools and technologies I use to bring ideas to life."
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-5">
          {categories.map((category, ci) => {
            const filtered = techStack.filter(t => t.category === category.key);
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.6 }}
                className={`group relative p-7 rounded-3xl bg-white/2 border border-white/7 ${category.border} transition-all duration-500 overflow-hidden`}
              >
                {/* Gradient bg on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
                />

                {/* Header */}
                <div className="relative flex items-center gap-3 mb-7">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${category.dot}`}
                  />
                  <span
                    className={`text-[10px] font-black tracking-[0.3em] uppercase ${category.text}`}
                  >
                    {category.label}
                  </span>
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[10px] font-medium text-white/10 tabular-nums">
                    {String(filtered.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Tech badges */}
                <div className="relative flex flex-wrap gap-2.5">
                  {filtered.map(tech => {
                    const techData = techIcons[tech.name];
                    const Icon = techData?.icon;
                    const iconColor = techData?.color || '#FFFFFF';

                    return (
                      <motion.div
                        key={tech.name}
                        whileHover={{ y: -3, scale: 1.04 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 20,
                        }}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/4 border border-white/6 hover:bg-white/8 hover:border-white/12 transition-all duration-300 cursor-default"
                      >
                        {Icon && (
                          <Icon
                            size={13}
                            style={{ color: iconColor }}
                            className="shrink-0 opacity-80"
                          />
                        )}
                        <span className="text-[12px] font-medium text-white/50 group-hover:text-white/80 transition-colors duration-300 whitespace-nowrap">
                          {tech.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
