import { getProfile } from '@/lib/cms';

export default async function Footer() {
  const { personalInfo } = await getProfile();
  const year = new Date().getFullYear();
  const links = [
    { label: 'GitHub', href: personalInfo.social.github },
    { label: 'LinkedIn', href: personalInfo.social.linkedin },
    { label: 'X', href: personalInfo.social.twitter },
  ].filter(item => item.href);

  return (
    <footer className="theme-ink sheet overflow-hidden px-5 sm:px-8 lg:px-14 [padding-bottom:0]">
      <div className="mx-auto max-w-340">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6 border-b border-line pb-10">
          <a
            href={`mailto:${personalInfo.email}`}
            className="link font-display text-[clamp(1.25rem,1rem+1.2vw,2rem)] font-bold break-all"
          >
            {personalInfo.email}
          </a>
          <ul className="flex flex-wrap gap-3">
            {links.map(item => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline px-5 py-2.5 text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-soft">
          <span>© {year} Tawchiful Islam</span>
          <span>Built with React and Next.js.</span>
        </div>

        <p
          aria-hidden="true"
          className="-mb-[0.1em] -ml-[0.03em] select-none whitespace-nowrap font-display text-[13vw] font-extrabold leading-[0.85] tracking-[-0.05em] text-fg"
        >
          Tawchiful
        </p>
      </div>
    </footer>
  );
}
