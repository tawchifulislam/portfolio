'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
      className="relative py-24 overflow-hidden px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Projects"
          subtitle="A selection of things I have built so far."
        />

        <motion.div
          variants={variants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 w-full"
        >
          <Swiper
            modules={[Navigation, Pagination]}
            grabCursor={true}
            centeredSlides={false}
            slidesPerView="auto"
            spaceBetween={20}
            pagination={{ clickable: true }}
            navigation={true}
            className="projects-swiper pb-12!"
          >
            {projects.map(project => (
              <SwiperSlide
                key={project.id}
                className="w-[320px]! sm:w-100! md:w-120!"
              >
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://github.com/tawchifulislam?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-white/3 border border-white/8 hover:border-violet-500/30 transition-all duration-300"
          >
            <FaGithub
              size={18}
              className="text-white/40 group-hover:text-white"
            />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white">
              View All GitHub
            </span>
            <ArrowUpRight
              size={14}
              className="text-white/20 group-hover:text-violet-400"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
