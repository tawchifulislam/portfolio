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

const INK = '#0a0f2e';

const techIcons = {
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss, color: '#1572B6' },
  JavaScript: { icon: SiJavascript, color: '#C9B100' },
  'JavaScript (ES6+)': { icon: SiJavascript, color: '#C9B100' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  React: { icon: SiReact, color: '#0EA5C9' },
  'React.js': { icon: SiReact, color: '#0EA5C9' },
  'Next.js': { icon: SiNextdotjs, color: INK },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#0891B2' },
  'Framer Motion': { icon: SiFramer, color: '#7C3AED' },
  Shadcn: { icon: SiShadcnui, color: INK },
  'Node.js': { icon: SiNodedotjs, color: '#4D8C3F' },
  'Express.js': { icon: SiExpress, color: INK },
  MongoDB: { icon: SiMongodb, color: '#2E8B3E' },
  PostgreSQL: { icon: SiPostgresql, color: '#336791' },
  Prisma: { icon: SiPrisma, color: INK },
  JWT: { icon: SiJsonwebtokens, color: '#B515E0' },
  Git: { icon: SiGit, color: '#F05032' },
  GitHub: { icon: SiGithub, color: INK },
  'VS Code': { icon: VscVscode, color: '#007ACC' },
  Vercel: { icon: SiVercel, color: INK },
  Netlify: { icon: SiNetlify, color: '#00A99D' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  Render: { icon: SiRender, color: '#1AAE8B' },
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
  return luminance > 190 ? INK : `#${hex}`;
}

function TechIcon({ tech }) {
  const known = techIcons[tech.name];
  if (known) {
    const Icon = known.icon;
    return <Icon size={22} aria-hidden="true" color={known.color} />;
  }

  const custom = iconBySlug.get(tech.icon);
  if (custom) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={22}
        height={22}
        fill={readableColor(custom.hex)}
        aria-hidden="true"
      >
        <path d={custom.path} />
      </svg>
    );
  }

  return <Package size={22} aria-hidden="true" />;
}

function Track({ items, duplicate }) {
  return (
    <ul
      aria-hidden="true"
      className={`marquee-track ${duplicate ? 'marquee-dup' : ''}`}
    >
      {items.map(tech => (
        <li
          key={tech.name}
          className="inline-flex shrink-0 items-center gap-3 rounded-full bg-card px-6 py-4 text-lg font-semibold shadow-sm"
        >
          <TechIcon tech={tech} />
          {tech.name}
          {tech.level === 'learning' && (
            <span className="rounded-full bg-signal px-2.5 py-0.5 text-xs font-bold text-night">
              learning
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

const groups = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'tools', label: 'Tools' },
];

export default async function TechStack() {
  const { techStack, sections } = await getSiteData();
  const half = Math.ceil(techStack.length / 2);
  const rowOne = techStack.slice(0, half);
  const rowTwo = techStack.slice(half);

  return (
    <section
      id="techstack"
      aria-labelledby="stack-heading"
      className="theme-chalk sheet overflow-hidden"
    >
      <div className="px-5 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-340">
          <SectionHeading id="stack-heading" title={sections.techStack.title} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="marquee" style={{ '--marquee-speed': '55s' }}>
          <Track items={rowOne} />
          <Track items={rowOne} duplicate />
        </div>
        {rowTwo.length > 0 && (
          <div
            className="marquee marquee-reverse"
            style={{ '--marquee-speed': '65s' }}
          >
            <Track items={rowTwo} />
            <Track items={rowTwo} duplicate />
          </div>
        )}
      </div>

      <div className="sr-only">
        {groups.map(group => (
          <div key={group.key}>
            <h3>{group.label}</h3>
            <ul>
              {techStack
                .filter(tech => tech.category === group.key)
                .map(tech => (
                  <li key={tech.name}>
                    {tech.name}
                    {tech.level === 'learning' ? ' (learning)' : ''}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
