import { pad } from '@/lib/copy';

export default function SectionHeading({ id, index, eyebrow, title }) {
  return (
    <div className="mb-12 lg:mb-16">
      <div className="mb-8 flex items-baseline justify-between border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.08em] text-brass">
        <span>({pad(index)})</span>
        <span>({eyebrow})</span>
      </div>
      <h2
        id={id}
        className="max-w-4xl font-display text-huge leading-[1.02] tracking-[-0.02em] text-balance"
      >
        {title}
      </h2>
    </div>
  );
}
