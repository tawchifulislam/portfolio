'use client';

import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useDragControls,
  useReducedMotion,
} from 'framer-motion';
import { ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import CornerMarks from './CornerMarks';
import { EASE } from '@/lib/constants';

const MAX_VISIBLE = 3;
const SWIPE_DISTANCE = 120;
const SWIPE_VELOCITY = 500;
const FLY_DISTANCE = 640;

const pad = value => String(value).padStart(2, '0');

const sheetVariants = {
  exit: ({ mode, dir, reduce }) => {
    if (reduce || mode === 'jump') {
      return { opacity: 0, transition: { duration: 0.2 } };
    }
    if (mode === 'back') {
      return { opacity: 0, scale: 0.92, transition: { duration: 0.25 } };
    }
    return {
      x: dir * FLY_DISTANCE,
      opacity: 0,
      transition: { duration: 0.4, ease: EASE },
    };
  },
};

function getInitial(mode, depth) {
  if (!mode) return false;
  if (mode === 'back') return { opacity: 0, y: -40 };
  if (mode === 'flick') {
    return { opacity: 0, y: depth * 14 + 12, scale: 1 - depth * 0.045 - 0.03 };
  }
  return { opacity: 0 };
}

function SheetCard({
  project,
  index,
  total,
  depth,
  mode,
  reduce,
  exitCustom,
  onFlick,
}) {
  const isTop = depth === 0;
  const canDrag = isTop && !reduce;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 0, 240], [-10, 0, 10]);
  const controls = useDragControls();

  const handlePointerDown = event => {
    if (!canDrag || event.target.closest('a, button')) return;
    controls.start(event);
  };

  const handleDragEnd = (_, info) => {
    const farEnough = Math.abs(info.offset.x) > SWIPE_DISTANCE;
    const fastEnough = Math.abs(info.velocity.x) > SWIPE_VELOCITY;
    if (farEnough || fastEnough) {
      onFlick(Math.sign(info.offset.x || info.velocity.x) || -1);
    }
  };

  return (
    <motion.article
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      aria-hidden={!isTop}
      inert={!isTop}
      custom={exitCustom}
      variants={sheetVariants}
      initial={getInitial(mode, depth)}
      animate={{
        x: 0,
        y: depth * 14,
        scale: 1 - depth * 0.045,
        opacity: 1,
      }}
      exit="exit"
      transition={{ duration: 0.45, ease: EASE }}
      style={
        canDrag
          ? { x, rotate, zIndex: MAX_VISIBLE - depth }
          : { zIndex: MAX_VISIBLE - depth }
      }
      drag={canDrag ? 'x' : false}
      dragControls={controls}
      dragListener={false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onPointerDown={handlePointerDown}
      onDragEnd={handleDragEnd}
      className="sheet col-start-1 row-start-1 touch-pan-y select-none will-change-transform"
    >
      {isTop && <CornerMarks />}

      <div className="relative w-full h-56 sm:h-72 border-b border-line">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 672px, 100vw"
          draggable={false}
          priority={index === 0}
          className="object-cover object-top pointer-events-none"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/10 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[11px]">
          <span className="bg-ink/70 px-2 py-1 text-paper">
            {pad(index + 1)} / {pad(total)}
          </span>
          {project.featured && (
            <span className="stamp bg-ink/70">Featured</span>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-6">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-h2 font-semibold text-paper tracking-tight mb-3">
            {project.title}
          </h3>
          <p className="measure text-sm text-muted leading-relaxed">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 font-mono text-[11px] text-faint">
            {project.tags.slice(0, 5).map(tag => (
              <span key={tag}>{tag}</span>
            ))}
            {project.tags.length > 5 && <span>+{project.tags.length - 5}</span>}
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
          <Link
            href={`/projects/${project.slug}`}
            className="px-5 py-2.5 border border-brass-dim text-brass text-xs font-medium tracking-wide hover:bg-brass hover:text-ink transition-colors duration-300"
          >
            Case Study
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="w-9 h-9 flex items-center justify-center border border-line text-muted hover:text-brass hover:border-brass-dim transition-colors duration-300"
            >
              <ExternalLink size={14} />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
              className="w-9 h-9 flex items-center justify-center border border-line text-muted hover:text-paper hover:border-faint transition-colors duration-300"
            >
              <FaGithub size={14} />
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-ink transition-opacity duration-500 ${
          isTop ? 'opacity-0' : 'opacity-60'
        }`}
      />
    </motion.article>
  );
}

export default function ProjectDeck({ projects }) {
  const total = projects.length;
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [transition, setTransition] = useState({ mode: null, dir: -1 });

  if (total === 0) return null;

  const visible = Array.from(
    { length: Math.min(MAX_VISIBLE, total) },
    (_, depth) => {
      const index = (current + depth) % total;
      return { project: projects[index], index, depth };
    },
  );

  const flick = dir => {
    setTransition({ mode: 'flick', dir });
    setCurrent(value => (value + 1) % total);
  };

  const back = () => {
    setTransition({ mode: 'back', dir: 1 });
    setCurrent(value => (value - 1 + total) % total);
  };

  const goTo = index => {
    if (index === current) return;
    setTransition({ mode: 'jump', dir: -1 });
    setCurrent(index);
  };

  const handleKeyDown = event => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      flick(-1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      back();
    }
  };

  const exitCustom = { ...transition, reduce };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <p className="sr-only" aria-live="polite">
        {`Project ${current + 1} of ${total}: ${projects[current].title}`}
      </p>

      <div className="grid pb-8">
        <AnimatePresence custom={exitCustom}>
          {visible.map(({ project, index, depth }) => (
            <SheetCard
              key={project.slug}
              project={project}
              index={index}
              total={total}
              depth={depth}
              mode={transition.mode}
              reduce={reduce}
              exitCustom={exitCustom}
              onFlick={flick}
            />
          ))}
        </AnimatePresence>
      </div>

      {total > 1 && (
        <>
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={back}
              aria-label="Previous project"
              className="w-9 h-9 shrink-0 flex items-center justify-center border border-line text-muted hover:text-paper hover:border-faint transition-colors duration-300"
            >
              <ArrowLeft size={14} />
            </button>

            <div className="flex flex-1 items-center gap-1.5">
              {projects.map((project, i) => (
                <button
                  key={project.slug}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${project.title}`}
                  aria-current={i === current ? 'true' : undefined}
                  className="relative flex-1 h-6"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
                  <motion.span
                    animate={{ scaleX: i === current ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-x-0 top-1/2 h-px bg-brass origin-left"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => flick(-1)}
              aria-label="Next project"
              className="w-9 h-9 shrink-0 flex items-center justify-center border border-line text-muted hover:text-paper hover:border-faint transition-colors duration-300"
            >
              <ArrowRight size={14} />
            </button>
          </div>

          <p className="mt-3 text-center font-mono text-[10px] text-faint">
            Drag or flick the top sheet to browse
          </p>
        </>
      )}
    </div>
  );
}
