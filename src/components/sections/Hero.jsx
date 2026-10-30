import { ArrowUpRight } from 'lucide-react';
import { getSiteData } from '@/lib/cms';
import HeroPhoto from '@/components/ui/HeroPhoto';
import { firstSentences } from '@/lib/copy';

const FLOW = /^(\d+)\s*(?:→|->)\s*(\d+)$/;

export default async function Hero() {
  const { personalInfo, stats } = await getSiteData();

  const highlightWords = (personalInfo.headline.highlight || '')
    .split(' ')
    .filter(Boolean);

  const end = personalInfo.headline.end || '';
  const endHead = end.match(/^\S*/)[0];
  const endRest = end.slice(endHead.length);

  const flowStat = stats
    .map(item => String(item.value).trim().match(FLOW))
    .find(Boolean);
  const flow = flowStat
    ? { requests: Number(flowStat[1]), winners: Number(flowStat[2]) }
    : null;

  return (
    <section
      id="home"
      className="relative overflow-hidden px-5 pt-28 sm:px-8 lg:px-14 lg:pt-32"
    >
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto grid max-w-340 grid-cols-1 items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="lg:pb-24">
          <span className="chip rise-in inline-flex items-center gap-2 border-brass/35 text-brass">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass"
            />
            {personalInfo.statusText}
          </span>

          <h1 className="slide-in mb-6 mt-6 font-display text-display leading-[1.02] tracking-tight">
            {personalInfo.headline.start}{' '}
            {highlightWords.map((word, i) => {
              const isLast = i === highlightWords.length - 1;
              const piece = (
                <span className="text-brass">
                  <span
                    className="sketch-word"
                    style={
                      i > 0 ? { '--delay': `${0.7 + i * 0.25}s` } : undefined
                    }
                  >
                    {word}
                  </span>
                </span>
              );
              return (
                <span key={i}>
                  {i > 0 && ' '}
                  {isLast ? (
                    <span className="whitespace-nowrap">
                      {piece}
                      {endHead}
                    </span>
                  ) : (
                    piece
                  )}
                </span>
              );
            })}
            {endRest}
          </h1>

          <p
            className="slide-in mb-8 max-w-120 text-[1.0625rem] text-muted sm:text-lg"
            style={{ '--delay': '0.08s' }}
          >
            {firstSentences(personalInfo.bio, 1)}
          </p>

          <div
            className="rise-in flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ '--delay': '0.2s' }}
          >
            <a href="#work" className="btn btn-primary">
              See what I&apos;ve built
            </a>
            <a href="#contact" className="btn btn-outline">
              Say hello
            </a>
            {personalInfo.resume && (
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex items-center gap-1 py-1.5 text-sm"
              >
                Résumé
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <HeroPhoto
          src={personalInfo.image}
          alt={personalInfo.name}
          flow={flow}
        />
      </div>
    </section>
  );
}
