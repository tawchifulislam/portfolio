import { getSiteData } from '@/lib/cms';

const FLOW = /^(\d+)\s*(?:→|->)\s*(\d+)$/;

function Value({ value }) {
  const match = String(value).trim().match(FLOW);
  if (!match) return value;

  return (
    <span className="inline-flex items-center gap-[0.18em]">
      <span>{match[1]}</span>
      <svg
        viewBox="0 0 48 24"
        aria-hidden="true"
        className="h-[0.42em] w-[0.84em]"
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12h42M34 3l10 9-10 9" />
      </svg>
      <span>{match[2]}</span>
    </span>
  );
}

function Track({ stats, duplicate }) {
  return (
    <ul
      aria-hidden="true"
      className={`marquee-track items-center ${duplicate ? 'marquee-dup' : ''}`}
    >
      {stats.map((item, index) => (
        <li
          key={item.label}
          className="flex shrink-0 items-baseline gap-5 px-6 sm:px-10"
        >
          <span
            className={`font-display text-[clamp(3.5rem,2rem+7vw,8rem)] font-bold leading-none tracking-[-0.03em] ${
              index % 2
                ? 'text-transparent [-webkit-text-stroke:1.5px_var(--color-paper)]'
                : ''
            }`}
          >
            <Value value={item.value} />
          </span>
          <span className="max-w-44 font-mono text-xs uppercase leading-snug tracking-[0.06em] text-subtle">
            {item.label}
          </span>
          <span className="ml-5 h-2 w-2 shrink-0 self-center rounded-full bg-brass" />
        </li>
      ))}
    </ul>
  );
}

export default async function StatsStrip() {
  const { stats } = await getSiteData();
  if (stats.length === 0) return null;

  return (
    <section
      aria-label="At a glance"
      className="border-y border-line py-10 sm:py-14"
    >
      <ul className="sr-only">
        {stats.map(item => (
          <li key={item.label}>
            {item.value} {item.label}
          </li>
        ))}
      </ul>
      <div className="marquee">
        <Track stats={stats} />
        <Track stats={stats} duplicate />
      </div>
    </section>
  );
}
