import SplitHeading from '@/components/ui/SplitHeading';

export default function SectionHeading({ id, title, className = '' }) {
  return (
    <SplitHeading
      id={id}
      text={title}
      className={`mb-12 max-w-5xl font-display text-huge font-extrabold leading-[1.04] tracking-[-0.03em] lg:mb-16 ${className}`}
    />
  );
}
