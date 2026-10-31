import { getSiteData } from '@/lib/cms';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollText from '@/components/ui/ScrollText';
import Reveal from '@/components/ui/Reveal';
import { firstSentences } from '@/lib/copy';

export default async function About() {
  const { about } = await getSiteData();
  const { paragraphs, focuses } = about;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="theme-chalk sheet px-5 sm:px-8 lg:px-14"
    >
      <div className="mx-auto max-w-340">
        <SectionHeading id="about-heading" title={about.heading} />

        <ScrollText
          text={firstSentences(paragraphs[0], 2)}
          className="max-w-4xl font-display text-[clamp(1.5rem,1rem+2vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.02em]"
        />
        <div className="sr-only">
          {paragraphs.map(text => (
            <p key={text}>{text}</p>
          ))}
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {focuses.map((item, index) => (
            <li key={item.title} className="border-t border-line">
              <Reveal delay={(index % 3) * 0.08} y={28} className="py-6">
                <h3 className="font-display text-xl font-bold leading-snug tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p
                  className={
                    item.text.length <= 40
                      ? 'mt-2 text-soft'
                      : 'sr-only'
                  }
                >
                  {item.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
