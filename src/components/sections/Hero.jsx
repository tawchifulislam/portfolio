import { ArrowUpRight } from 'lucide-react';
import { getSiteData } from '@/lib/cms';
import HeroPhoto from '@/components/ui/HeroPhoto';

export default async function Hero() {
  const { personalInfo } = await getSiteData();

  const links = [
    { label: 'GitHub', href: personalInfo.social.github },
    { label: 'LinkedIn', href: personalInfo.social.linkedin },
    { label: 'X', href: personalInfo.social.twitter },
    {
      label: 'Résumé',
      href: personalInfo.resume ? '/resume.pdf' : '',
      arrow: true,
    },
  ].filter(item => item.href);

  const highlightWords = (personalInfo.headline.highlight || '')
    .split(' ')
    .filter(Boolean);

  return (
    <section
      id="home"
      className="relative overflow-hidden px-5 pb-14 pt-28 sm:px-8 lg:px-14 lg:pb-20 lg:pt-32"
    >
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto grid max-w-340 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <span className="chip rise-in inline-flex items-center gap-2 border-brass/35 text-brass">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-brass"
            />
            {personalInfo.statusText}
          </span>

          <h1 className="slide-in mb-5 mt-6 font-display text-display leading-[1.04] tracking-[-0.02em]">
            {personalInfo.headline.start}{' '}
            <span className="text-brass">
              {highlightWords.map((word, i) => (
                <span key={i}>
                  {i > 0 && ' '}
                  <span
                    className="sketch-word"
                    style={
                      i > 0 ? { '--delay': `${0.7 + i * 0.25}s` } : undefined
                    }
                  >
                    {word}
                  </span>
                </span>
              ))}
            </span>
            {personalInfo.headline.end}
          </h1>

          <p
            className="slide-in mb-8 max-w-135 text-[1.0625rem] text-muted sm:text-lg"
            style={{ '--delay': '0.08s' }}
          >
            {personalInfo.bio}
          </p>

          <div
            className="rise-in mb-7 flex flex-wrap gap-3.5"
            style={{ '--delay': '0.2s' }}
          >
            <a href="#work" className="btn btn-primary">
              See what I&apos;ve built
            </a>
            <a href="#contact" className="btn btn-outline">
              Say hello
            </a>
          </div>

          <ul
            className="rise-in flex flex-wrap gap-x-6 gap-y-1 text-sm"
            style={{ '--delay': '0.3s' }}
          >
            {links.map(item => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex items-center gap-1 py-1.5"
                >
                  {item.label}
                  {item.arrow && <ArrowUpRight size={14} aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="slide-in flex justify-center p-5"
          style={{ '--delay': '0.15s' }}
        >
          <div className="relative w-full max-w-85">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 bg-[radial-gradient(closest-side,rgba(227,161,58,0.26),transparent)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -translate-y-4 translate-x-4 rounded-t-[200px] rounded-b-[28px] border border-brass/45"
            />
            <HeroPhoto src={personalInfo.image} alt={personalInfo.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
