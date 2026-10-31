import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getSiteData } from '@/lib/cms';
import { firstSentences, splitLead, findFlow } from '@/lib/copy';

function Lanes({ requests, winners }) {
  const count = Math.min(Math.max(requests, 2), 12);
  const through = Math.min(Math.max(winners, 1), count - 1);
  const start = Math.floor((count - through) / 2);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 bottom-(--sheet) [container-type:size]"
    >
      {Array.from({ length: count }, (_, index) => {
        const isWinner = index >= start && index < start + through;
        return (
          <div
            key={index}
            className="absolute inset-y-0 w-px bg-white/10"
            style={{ left: `${((index + 1) / (count + 1)) * 100}%` }}
          >
            <span
              className={`lane-dot ${isWinner ? 'lane-win' : 'lane-lose'}`}
              style={{ '--i': index }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default async function Hero() {
  const { personalInfo, stats } = await getSiteData();
  const flow = findFlow(stats);

  const { lead, rest } = splitLead(personalInfo.headline.start);
  const statement = `${rest} ${personalInfo.headline.highlight || ''}${personalInfo.headline.end || ''}`
    .replace(/\s+/g, ' ')
    .trim();

  const statusParts = String(personalInfo.statusText || '')
    .split('·')
    .map(part => part.trim())
    .filter(Boolean);

  return (
    <section
      id="home"
      className="theme-cobalt relative flex overflow-hidden px-5 pb-[calc(var(--sheet)+3rem)] pt-28 sm:px-8 lg:min-h-svh lg:items-center lg:px-14 lg:pt-32"
    >
      {flow && <Lanes requests={flow.requests} winners={flow.winners} />}

      <div className="relative mx-auto grid w-full max-w-340 grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <div>
          <p className="rise-in inline-flex flex-wrap items-center gap-x-4 gap-y-1 rounded-full border border-line px-4 py-2 text-sm font-medium">
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full bg-accent"
            />
            {statusParts.map((part, index) => (
              <span key={part} className="inline-flex items-center gap-4">
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-3.5 w-px bg-current opacity-40"
                  />
                )}
                {part}
              </span>
            ))}
          </p>

          <h1 className="slide-in mt-7">
            {lead && (
              <span className="mb-3 block font-body text-xl font-medium tracking-normal text-soft sm:text-2xl">
                {lead}
              </span>
            )}
            <span className="block font-display text-display font-extrabold leading-[1.0] tracking-[-0.04em]">
              {statement}
            </span>
          </h1>

          <p
            className="slide-in mt-7 max-w-120 text-lg text-soft"
            style={{ '--delay': '0.08s' }}
          >
            {firstSentences(personalInfo.bio, 1)}
          </p>

          <div
            className="rise-in mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ '--delay': '0.2s' }}
          >
            {personalInfo.resume ? (
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Download résumé
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : (
              <a href="#contact" className="btn btn-primary">
                Say hello
              </a>
            )}
            <a href="#work" className="btn btn-outline">
              See my work
            </a>
            {personalInfo.resume && (
              <a
                href="#contact"
                className="link inline-flex items-center py-1.5 font-medium"
              >
                Say hello
              </a>
            )}
          </div>

          {flow && (
            <p
              className="rise-in mt-10 max-w-sm border-l-2 border-accent pl-4 text-sm font-medium text-soft"
              style={{ '--delay': '0.3s' }}
            >
              {flow.caption}
            </p>
          )}
        </div>

        <div
          className="rise-in relative mx-auto w-full max-w-sm sm:max-w-md"
          style={{ '--delay': '0.15s' }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 top-[14%] rounded-t-full rounded-b-4xl bg-signal"
          />
          {personalInfo.image ? (
            <Image
              src={personalInfo.image}
              alt={personalInfo.name}
              width={0}
              height={0}
              priority
              sizes="(min-width: 640px) 448px, 90vw"
              className="relative block h-auto w-full [clip-path:inset(-20%_0_0_0_round_0_0_2rem_2rem)]"
            />
          ) : (
            <div className="relative aspect-4/5" />
          )}
        </div>
      </div>
    </section>
  );
}
