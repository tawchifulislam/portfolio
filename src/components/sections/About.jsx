import { getSiteData } from '@/lib/cms';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { pad, firstSentences } from '@/lib/copy';

export default async function About() {
  const { about } = await getSiteData();
  const { paragraphs, focuses } = about;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-5 pb-8 pt-28 sm:px-8 lg:px-14"
    >
      <div className="mx-auto max-w-340">
        <SectionHeading
          id="about-heading"
          index={2}
          eyebrow="About"
          title={about.heading}
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="max-w-xl text-lg text-soft">
              {firstSentences(paragraphs[0], 2)}
            </p>
            <div className="sr-only">
              {paragraphs.map(text => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </Reveal>

          <ul className="divide-y divide-line border-y border-line">
            {focuses.map((item, index) => (
              <li key={item.title}>
                <Reveal
                  delay={index * 0.06}
                  className="flex items-baseline gap-5 py-5"
                >
                  <span className="font-mono text-xs text-brass">
                    {pad(index + 1)}
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-snug">
                      {item.title}
                    </h3>
                    <p
                      className={
                        item.text.length <= 40
                          ? 'mt-1 text-sm text-muted'
                          : 'sr-only'
                      }
                    >
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
