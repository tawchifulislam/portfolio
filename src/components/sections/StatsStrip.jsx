import { getSiteData } from '@/lib/cms';

export default async function StatsStrip() {
  const { stats } = await getSiteData();
  if (stats.length === 0) return null;

  return (
    <section aria-label="At a glance" className="px-5 sm:px-8 lg:px-14">
      <ul className="mx-auto grid max-w-340 grid-cols-2 border-y border-line lg:grid-cols-4">
        {stats.map(item => (
          <li key={item.label} className="px-2 py-7">
            <p className="font-display text-[2.5rem] font-bold leading-none">
              {item.value}
            </p>
            <p className="mt-2 text-sm text-subtle">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
