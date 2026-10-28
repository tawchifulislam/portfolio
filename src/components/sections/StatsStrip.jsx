import { getSiteData } from '@/lib/cms';
import ConvergeGraphic from '@/components/ui/ConvergeGraphic';

// values like "8 → 1" are drawn as lines merging into one point
const FLOW = /^(\d+)\s*(?:→|->)\s*(\d+)$/;

function StatValue({ value }) {
  const match = String(value).trim().match(FLOW);
  if (!match) return value;

  return (
    <span
      role="img"
      aria-label={`${match[1]} to ${match[2]}`}
      className="flex items-center gap-2 sm:gap-3"
    >
      <span>{match[1]}</span>
      <ConvergeGraphic from={Number(match[1])} />
      <span>{match[2]}</span>
    </span>
  );
}

export default async function StatsStrip() {
  const { stats } = await getSiteData();
  if (stats.length === 0) return null;

  return (
    <section aria-label="At a glance" className="px-5 sm:px-8 lg:px-14">
      <ul className="mx-auto grid max-w-340 grid-cols-2 border-y border-line lg:grid-cols-4">
        {stats.map(item => (
          <li key={item.label} className="px-2 py-7">
            <p className="font-display text-[2.5rem] font-bold leading-none">
              <StatValue value={item.value} />
            </p>
            <p className="mt-2 text-sm text-subtle">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
