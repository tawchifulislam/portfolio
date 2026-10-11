'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { experience } from '@/lib/data';
import { variants } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import CornerMarks from '@/components/ui/CornerMarks';

function CapstoneCard({ project }) {
  return (
    <div className="px-8 sm:px-10 pt-6 pb-8 sm:pb-10 flex flex-col gap-4">
      <h4 className="font-display text-base font-semibold text-paper leading-snug">
        {project.title}
      </h4>

      <p className="text-sm text-muted leading-relaxed">
        {project.description}
      </p>

      <ul className="flex flex-col gap-2.5">
        {project.points.map(point => (
          <li key={point} className="flex gap-3">
            <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-brass" />
            <span className="text-sm text-muted leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>

      <p className="font-mono text-[11px] text-faint">
        {project.stack.join(' / ')}
      </p>
      <p className="text-xs text-muted leading-relaxed">{project.note}</p>

      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto pt-2 self-start inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-brass transition-colors duration-300"
      >
        <FaGithub size={13} /> Repository
      </a>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-4 sm:px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Experience"
          subtitle="Hands-on, verifiable work beyond my personal projects."
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
            {experience.map(item => (
              <motion.article key={item.id} variants={variants.staggerItem}>
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-line">
                  <div className="lg:col-span-4 p-8 sm:p-10 flex flex-col gap-6">
                    <div>
                      <p className="font-mono text-[11px] text-faint mb-2">
                        {item.period}
                      </p>
                      <h3 className="font-display text-h3 font-semibold text-paper leading-snug">
                        {item.role}
                      </h3>
                      <p className="text-sm text-brass mt-1">
                        {item.organization}
                      </p>
                    </div>

                    <dl className="flex flex-col">
                      {[
                        { label: 'Format', value: item.format },
                        { label: 'Track', value: item.track },
                      ].map(row => (
                        <div
                          key={row.label}
                          className="flex items-baseline justify-between gap-4 py-2.5 border-b border-line"
                        >
                          <dt className="font-mono text-[11px] text-faint">
                            {row.label}
                          </dt>
                          <dd className="text-sm text-paper text-right">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col gap-6">
                    <p className="measure-lg text-sm text-muted leading-relaxed">
                      {item.summary}
                    </p>

                    <ul className="flex flex-col gap-3">
                      {item.highlights.map(highlight => (
                        <li key={highlight} className="flex gap-3">
                          <span className="w-1.5 h-1.5 mt-2 shrink-0 bg-brass" />
                          <span className="measure-lg text-sm text-muted leading-relaxed">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
                      {item.links.map(link => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 pb-0.5 border-b border-line text-xs font-medium text-muted hover:text-paper hover:border-brass transition-colors duration-300"
                        >
                          {link.label} <ExternalLink size={12} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {item.projects?.length > 0 && (
                  <div className="border-t border-line">
                    <p className="px-8 sm:px-10 pt-8 font-mono text-[11px] tracking-wide text-faint">
                      APPROVED CAPSTONES
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 divide-y divide-line lg:divide-y-0 lg:divide-x">
                      {item.projects.map(project => (
                        <CapstoneCard key={project.title} project={project} />
                      ))}
                    </div>
                  </div>
                )}
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
