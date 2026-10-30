import { getSiteData } from '@/lib/cms';
import RouteGraphic from '@/components/ui/RouteGraphic';
import CountUp from '@/components/ui/CountUp';
import Reveal from '@/components/ui/Reveal';

const FLOW = /^(\d+)\s*(?:→|->)\s*(\d+)$/;

function StatValue({ value }) {
  const text = String(value).trim();
  const match = text.match(FLOW);

  if (match) {
    return (
      <span
        role="img"
        aria-label={`${match[1]} to ${match[2]}`}
        className="flex items-center gap-2 sm:gap-3.5"
      >
        <span>{match[1]}</span>
        <RouteGraphic />
        <span>{match[2]}</span>
      </span>
    );
  }

  if (/^\d+$/.test(text)) return <CountUp value={text} />;
  return text;
}

export default async function StatsStrip() {
  const { stats } = await getSiteData();
  if (stats.length === 0) return null;

  return (
    <section aria-label="At a glance" className="px-5 sm:px-8 lg:px-14">
      <ul className="mx-auto grid max-w-340 grid-cols-2 border-y border-line lg:grid-cols-4">
        {stats.map((item, index) => (
          <li key={item.label} className="px-2 py-9">
            <Reveal delay={index * 0.08}>
              <p className="font-display text-[clamp(3rem,2rem+4vw,5rem)] font-bold leading-none tracking-[-0.02em]">
                <StatValue value={item.value} />
              </p>
              <p className="mt-3 text-sm text-subtle">{item.label}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
