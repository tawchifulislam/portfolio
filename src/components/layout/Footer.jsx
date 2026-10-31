import { getProfile } from '@/lib/cms';
import { navLinks } from '@/lib/data';
import LogoMark from '@/components/ui/LogoMark';

const toHome = href => (href.startsWith('#') ? `/${href}` : href);

export default async function Footer() {
  const { personalInfo } = await getProfile();
  const year = new Date().getFullYear();
  const links = [...navLinks, { label: 'Contact', href: '#contact' }];

  return (
    <footer className="theme-ink sheet px-5 sm:px-8 lg:px-14">
      <div className="mx-auto flex max-w-340 flex-col gap-10 md:flex-row md:items-center md:justify-between">
        <a href="/" className="flex items-center gap-3" aria-label="Home">
          <LogoMark className="h-10 w-10" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-extrabold">
              {personalInfo.name}
            </span>
            <span className="text-sm text-soft">{personalInfo.title}</span>
          </span>
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {links.map(item => (
              <li key={item.label}>
                <a
                  href={toHome(item.href)}
                  className="py-1.5 text-[0.9375rem] font-medium text-soft transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-340 flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-sm text-soft">
        <span>© {year} {personalInfo.name}</span>
        <span>Built with React and Next.js.</span>
      </div>
    </footer>
  );
}
