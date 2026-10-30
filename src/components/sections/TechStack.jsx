import { Package } from 'lucide-react';
import * as simpleIcons from 'simple-icons';
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
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRender,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { getSiteData } from '@/lib/cms';
import SectionHeading from '@/components/ui/SectionHeading';

const NEUTRAL = '#F1EBDD';
const BRASS = '#E3A13A';

const techIcons = {
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss, color: '#1572B6' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  React: { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: NEUTRAL },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#38BDF8' },
  'Framer Motion': { icon: SiFramer, color: '#9C6FFF' },
  Shadcn: { icon: SiShadcnui, color: NEUTRAL },
  'Node.js': { icon: SiNodedotjs, color: '#6DA55F' },
  'Express.js': { icon: SiExpress, color: NEUTRAL },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  Prisma: { icon: SiPrisma, color: NEUTRAL },
  JWT: { icon: SiJsonwebtokens, color: '#D63AFF' },
  Git: { icon: SiGit, color: '#F05032' },
  GitHub: { icon: SiGithub, color: NEUTRAL },
  'VS Code': { icon: VscVscode, color: '#007ACC' },
  Vercel: { icon: SiVercel, color: NEUTRAL },
  Netlify: { icon: SiNetlify, color: '#00C7B7' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  Render: { icon: SiRender, color: '#46E3B7' },
};

const iconBySlug = new Map(
  Object.values(simpleIcons)
    .filter(icon => icon && typeof icon === 'object' && icon.slug)
    .map(icon => [icon.slug, icon]),
);

function readableColor(hex) {
  const value = parseInt(hex, 16);
  const luminance =
    0.299 * ((value >> 16) & 255) +
    0.587 * ((value >> 8) & 255) +
    0.114 * (value & 255);
  return luminance < 70 ? NEUTRAL : `#${hex}`;
}

function brandColor(tech) {
  const known = techIcons[tech.name];
  if (known) return known.color;
  const custom = iconBySlug.get(tech.icon);
  return custom ? readableColor(custom.hex) : BRASS;
}

function TechIcon({ tech }) {
  const className =
    'text-subtle transition-colors duration-200 group-hover:text-(--brand)';
  const known = techIcons[tech.name];

  if (known) {
    const Icon = known.icon;
    return <Icon size={18} aria-hidden="true" className={className} />;
  }

  const custom = iconBySlug.get(tech.icon);
  if (custom) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        fill="currentColor"
        aria-hidden="true"
        className={className}
      >
        <path d={custom.path} />
      </svg>
    );
  }

  return <Package size={18} aria-hidden="true" className={className} />;
}

const groups = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'tools', label: 'Tools' },
];

function Track({ items, duplicate }) {
  return (
    <ul
      aria-hidden="true"
      className={`marquee-track ${duplicate ? 'marquee-dup' : ''}`}
    >
      {items.map(tech => (
        <li
          key={tech.name}
          style={{ '--brand': brandColor(tech) }}
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-line-2 px-5 py-3 text-sm text-soft transition-colors hover:border-line-3 hover:bg-panel-2"
        >
          <TechIcon tech={tech} />
          {tech.name}
        </li>
      ))}
    </ul>
  );
}

export default async function TechStack() {
  const { techStack, sections } = await getSiteData();

  return (
    <section
      id="techstack"
      aria-labelledby="stack-heading"
      className="pb-8 pt-28"
    >
      <div className="mx-auto max-w-340 px-5 sm:px-8 lg:px-14">
        <SectionHeading
          id="stack-heading"
          index={4}
          eyebrow={sections.techStack.eyebrow}
          title={sections.techStack.title}
        />
      </div>

      <div className="marquee">
        <Track items={techStack} />
        <Track items={techStack} duplicate />
      </div>

      <div className="sr-only">
        {groups.map(group => (
          <div key={group.key}>
            <h3>{group.label}</h3>
            <ul>
              {techStack
                .filter(tech => tech.category === group.key)
                .map(tech => (
                  <li key={tech.name}>{tech.name}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
