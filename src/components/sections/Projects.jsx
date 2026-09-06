import { FaGithub } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import { SHEET_NUMBERS, TOTAL_SHEETS } from '@/lib/constants';
import ProjectStack from '@/components/ui/ProjectCard';
import SectionTitle from '@/components/ui/SectionTitle';
import CornerMarks from '@/components/ui/CornerMarks';
import TitleBlock from '@/components/ui/TitleBlock';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="relative px-4 sm:px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Projects"
          subtitle="A selection of things I have built so far, as case studies rather than a showcase."
        />

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <ProjectStack projects={projects} />
          </div>
        </div>

        <div className="sheet mt-6">
          <CornerMarks />

          <a
            href="https://github.com/tawchifulislam?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-8 py-6 text-muted hover:text-paper transition-colors duration-300"
          >
            <FaGithub size={16} />
            <span className="text-xs font-medium tracking-wide">
              View All Repositories on GitHub
            </span>
            <ArrowUpRight
              size={14}
              className="text-faint group-hover:text-brass transition-colors duration-300"
            />
          </a>
          <TitleBlock
            sheetNumber={SHEET_NUMBERS.projects}
            total={TOTAL_SHEETS}
          />
        </div>
      </div>
    </section>
  );
}
