'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import CornerMarks from '@/components/ui/CornerMarks';
import TitleBlock from '@/components/ui/TitleBlock';

export default function ProjectDetail({
  meta,
  content,
  index,
  total,
  nextProject,
}) {
  const imageRef = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  function handleMouseMove(e) {
    const bounds = imageRef.current.getBoundingClientRect();
    const px = (e.clientX - bounds.left) / bounds.width - 0.5;
    const py = (e.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(py * -6);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <main className="px-4 sm:px-6 pt-28 pb-20">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-muted hover:text-paper transition-colors duration-300 mb-10 group"
        >
          <ArrowLeft
            size={13}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          Back to Projects
        </Link>

        <div className="sheet">
          <CornerMarks />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x lg:divide-line">
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center gap-5">
              <div className="flex flex-wrap gap-3 font-mono text-[11px] text-faint">
                <span>
                  {String(index).padStart(2, '0')} /{' '}
                  {String(total).padStart(2, '0')}
                </span>
                {meta.featured && <span className="text-brass">Featured</span>}
              </div>

              <h1 className="font-display text-h1 font-semibold text-paper leading-[1.05]">
                {meta.title}
              </h1>

              <p className="text-sm text-muted leading-relaxed">
                {meta.summary}
              </p>

              <div className="flex flex-wrap gap-2 font-mono text-[10px] text-faint">
                {meta.tags?.map(tag => (
                  <span key={tag} className="border border-line px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-2">
                <a
                  href={meta.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-brass text-ink text-xs font-medium tracking-wide hover:bg-paper transition-colors duration-300"
                >
                  <ExternalLink size={13} /> Live Demo
                </a>
                <a
                  href={meta.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-line text-muted hover:text-paper hover:border-faint text-xs font-medium tracking-wide transition-colors duration-300"
                >
                  <FaGithub size={13} /> Source
                </a>
              </div>
            </div>

            <div
              className="lg:col-span-7 p-8 sm:p-10"
              style={{ perspective: 1200 }}
            >
              <motion.div
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                className="relative w-full aspect-video border border-line"
              >
                <Image
                  src={meta.image}
                  alt={meta.title}
                  fill
                  sizes="(min-width: 1024px) 550px, 100vw"
                  className="object-cover object-top"
                  priority
                />
              </motion.div>
            </div>
          </div>

          <div className="p-8 sm:p-10 border-t border-line">{content}</div>

          <TitleBlock
            index={String(index).padStart(2, '0')}
            total={String(total).padStart(2, '0')}
          />
        </div>

        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center justify-between mt-6 p-6 sheet hover:border-faint transition-colors duration-300"
          >
            <div>
              <p className="font-mono text-[10px] text-faint mb-1">
                NEXT PROJECT
              </p>
              <p className="font-display text-lg font-semibold text-muted group-hover:text-paper transition-colors duration-300">
                {nextProject.title}
              </p>
            </div>
            <ArrowRight
              size={16}
              className="text-faint group-hover:text-brass group-hover:translate-x-1.5 transition-all duration-300"
            />
          </Link>
        )}
      </div>
    </main>
  );
}
