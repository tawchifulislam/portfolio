'use client';

import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

const pad = value => String(value).padStart(2, '0');

function ProjectSlide({ project, priority }) {
  return (
    <article className="card grid h-full grid-cols-1 overflow-hidden lg:grid-cols-2">
      <div className="flex items-center bg-inset p-6 sm:p-8">
        <div className="w-full rounded-xl border border-line-2 bg-panel p-3 sm:p-4">
          <div className="mb-3 flex gap-1.5" aria-hidden="true">
            {[0, 1, 2].map(dot => (
              <span key={dot} className="h-2 w-2 rounded-full bg-line-3" />
            ))}
          </div>
          <div className="relative aspect-16/10 overflow-hidden rounded-lg bg-panel-2">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              priority={priority}
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 sm:p-10">
        <p className="eyebrow">
          {project.featured ? 'Featured case study' : 'Case study'}
        </p>
        <h3 className="mb-3 mt-2 font-display text-h2 leading-tight">
          {project.title}
        </h3>
        <p className="mb-5 text-soft">{project.summary}</p>

        <ul className="mb-7 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags?.slice(0, 5).map(tag => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
          <Link
            href={`/projects/${project.slug}`}
            className="link inline-flex items-center gap-1"
          >
            Read the case study <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link inline-flex items-center gap-1"
          >
            Live site <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link inline-flex items-center gap-1"
          >
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ProjectSlider({ projects }) {
  const reduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    duration: reduceMotion ? 0 : 25,
  });
  const [selected, setSelected] = useState(0);
  const total = projects.length;

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const handleKeyDown = event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      emblaApi?.scrollPrev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      emblaApi?.scrollNext();
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Case studies"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="rounded-card"
    >
      <p className="sr-only" aria-live="polite">
        {`Case study ${selected + 1} of ${total}: ${projects[selected].title}`}
      </p>

      <div ref={emblaRef} className="overflow-hidden" data-cursor="drag">
        <div className="-ml-5 flex touch-pan-y touch-pinch-zoom">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
              inert={index !== selected}
              className="min-w-0 shrink-0 grow-0 basis-full pl-5"
            >
              <ProjectSlide project={project} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div
          className="flex items-center"
          role="group"
          aria-label="Choose a case study"
        >
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Show ${project.title}`}
              aria-current={index === selected ? 'true' : undefined}
              className="group flex h-8 items-center px-1"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  index === selected
                    ? 'w-7 bg-brass'
                    : 'w-2 bg-line-3 group-hover:bg-subtle'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-subtle">
            {pad(selected + 1)} / {pad(total)}
          </span>
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous case study"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-3 text-soft transition-colors hover:border-brass hover:text-brass-hover"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next case study"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-3 text-soft transition-colors hover:border-brass hover:text-brass-hover"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
