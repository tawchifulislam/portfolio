'use client';

import { motion } from 'framer-motion';
import { techStack } from '@/lib/data';
import { variants } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import CornerMarks from '@/components/ui/CornerMarks';
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

const techIcons = {
  HTML5: SiHtml5,
  CSS3: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Prisma: SiPrisma,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'Framer Motion': SiFramer,
  Shadcn: SiShadcnui,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  JWT: SiJsonwebtokens,
  Git: SiGit,
  GitHub: SiGithub,
  'VS Code': VscVscode,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  Docker: SiDocker,
  Render: SiRender,
};

const categories = [
  { key: 'core', code: 'CO', label: 'Core' },
  { key: 'frontend', code: 'FE', label: 'Frontend' },
  { key: 'backend', code: 'BE', label: 'Backend' },
  { key: 'tools', code: 'TL', label: 'Tools' },
];

export default function TechStack() {
  return (
    <section id="techstack" className="relative px-4 sm:px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Tech Stack"
          subtitle="Tools and technologies I use to bring ideas to life."
        />

        <div className="sheet">
          <CornerMarks />

          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="divide-y divide-line"
          >
            {categories.map(category => {
              const items = techStack.filter(t => t.category === category.key);

              return (
                <motion.div
                  key={category.key}
                  variants={variants.staggerItem}
                  className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 sm:gap-8 p-8 sm:p-10"
                >
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-1">
                    <span className="flex items-center justify-center w-8 h-8 border border-brass-dim font-mono text-xs text-brass shrink-0">
                      {category.code}
                    </span>
                    <span className="font-mono text-[11px] tracking-wide text-faint">
                      {category.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {items.map(tech => {
                      const Icon = techIcons[tech.name];
                      return (
                        <div
                          key={tech.name}
                          className="group flex items-center gap-2.5"
                        >
                          {Icon && (
                            <Icon
                              size={14}
                              aria-hidden="true"
                              className="text-faint group-hover:text-brass transition-colors duration-300"
                            />
                          )}
                          <span className="text-sm text-muted group-hover:text-paper transition-colors duration-300">
                            {tech.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
