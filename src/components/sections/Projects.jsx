'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import { variants } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { FaGithub } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-18 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute top-1/3 right-0 w-100 h-100 bg-violet-600/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Projects"
          subtitle="A selection of things I have built so far."
        />

        <div className="mt-20">
          <div className="hidden md:flex items-start gap-6 pb-4 border-b border-white/6">
            <span className="w-1/3 text-[9px] font-black tracking-[0.3em] uppercase text-white/15">
              Project
            </span>
            <span className="flex-1 text-[9px] font-black tracking-[0.3em] uppercase text-white/15">
              Description
            </span>
            <span className="w-20 text-[9px] font-black tracking-[0.3em] uppercase text-white/15 text-right">
              Links
            </span>
          </div>

          <motion.div
            variants={variants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          <div className="border-b border-white/6" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/tawchifulislam"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/2 hover:bg-white/5 border border-white/[0.07] hover:border-violet-500/25 transition-all duration-500"
          >
            <FaGithub
              size={15}
              className="text-white/25 group-hover:text-white/60 transition-colors duration-300"
            />
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-white/25 group-hover:text-white/60 transition-colors duration-300">
              View All on GitHub
            </span>
            <ArrowUpRight
              size={13}
              className="text-white/15 group-hover:text-violet-400 transition-colors duration-300"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
