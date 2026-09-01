'use client';

import { projects } from '@/lib/data';
import ProjectStack from '@/components/ui/ProjectCard';
import { FaGithub } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 overflow-hidden px-4 sm:px-6"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-100 bg-violet-600/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Projects"
          subtitle="A selection of things I have built so far."
        />

        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-2xl">
            <ProjectStack projects={projects} />
          </div>
        </div>

        {/* GitHub CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://github.com/tawchifulislam?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-white/3 border border-white/8 hover:border-violet-500/30 transition-all duration-300"
          >
            <FaGithub
              size={18}
              className="text-white/40 group-hover:text-white transition-colors duration-300"
            />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors duration-300">
              View All on GitHub
            </span>
            <ArrowUpRight
              size={14}
              className="text-white/20 group-hover:text-violet-400 transition-colors duration-300"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
