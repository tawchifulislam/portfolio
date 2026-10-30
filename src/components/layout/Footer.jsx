import { getSiteData } from '@/lib/cms';

export default async function Footer() {
  const { personalInfo } = await getSiteData();
  const year = new Date().getFullYear();
  const links = [
    { label: 'GitHub', href: personalInfo.social.github },
    { label: 'LinkedIn', href: personalInfo.social.linkedin },
    { label: 'X', href: personalInfo.social.twitter },
  ].filter(item => item.href);

  return (
    <footer className="border-t border-line px-5 sm:px-8 lg:px-14">
      <div className="mx-auto flex max-w-340 flex-wrap items-center justify-between gap-x-8 gap-y-3 py-7 text-[0.8125rem] text-subtle">
        <span>© {year} Tawchiful Islam</span>
        <ul className="flex gap-5">
          {links.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1.5 transition-colors hover:text-paper"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <span>Built with React and Next.js.</span>
      </div>
    </footer>
  );
}
