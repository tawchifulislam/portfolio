import { stats } from '@/lib/data';

export default function StatsStrip({ projectCount }) {
  const items = [
    { value: String(projectCount), label: 'projects shipped' },
    ...stats,
  ];

  return (
    <section aria-label="At a glance" className="px-5 sm:px-8 lg:px-14">
      <ul className="mx-auto grid max-w-340 grid-cols-2 border-y border-line lg:grid-cols-4">
        {items.map(item => (
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
