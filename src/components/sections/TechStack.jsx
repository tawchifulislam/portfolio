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

// icons already styled by hand, matched by tool name
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

// every Simple Icons icon by slug, used for tools added from the dashboard
const iconBySlug = new Map(
  Object.values(simpleIcons)
    .filter(icon => icon && typeof icon === 'object' && icon.slug)
    .map(icon => [icon.slug, icon]),
);

// very dark brand colors would vanish on the dark background
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
    return <Icon size={15} aria-hidden="true" className={className} />;
  }

  const custom = iconBySlug.get(tech.icon);
  if (custom) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={15}
        height={15}
        fill="currentColor"
        aria-hidden="true"
        className={className}
      >
        <path d={custom.path} />
      </svg>
    );
  }

  return <Package size={15} aria-hidden="true" className={className} />;
}

const groups = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'core', label: 'Core' },
  { key: 'tools', label: 'Tools' },
];

export default async function TechStack() {
  const { techStack, sections } = await getSiteData();

  return (
    <section
      id="techstack"
      aria-labelledby="stack-heading"
      className="px-5 pb-8 pt-24 sm:px-8 lg:px-14"
    >
      <div className="mx-auto max-w-340">
        <SectionHeading
          id="stack-heading"
          eyebrow={sections.techStack.eyebrow}
          title={sections.techStack.title}
        />

        <div className="card px-5 py-2 sm:px-8">
          {groups.map(group => (
            <div
              key={group.key}
              className="grid grid-cols-1 gap-3 border-b border-line py-5 last:border-b-0 sm:grid-cols-[8.75rem_1fr] sm:items-center sm:gap-4"
            >
              <p className="eyebrow">{group.label}</p>
              <ul
                aria-label={`${group.label} technologies`}
                className="flex flex-wrap gap-2"
              >
                {techStack
                  .filter(tech => tech.category === group.key)
                  .map(tech => (
                    <li
                      key={tech.name}
                      style={{ '--brand': brandColor(tech) }}
                      className="group chip inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-3 hover:bg-panel-2"
                    >
                      <TechIcon tech={tech} />
                      {tech.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
