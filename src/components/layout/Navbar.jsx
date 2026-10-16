'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { navLinks, navCta } from '@/lib/data';
import { SECTION_ID_LIST } from '@/lib/constants';
import { useActiveSection } from '@/hooks/useActiveSection';
import { scrollToSection } from '@/lib/utils';
import LogoMark from '@/components/ui/LogoMark';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [menuPath, setMenuPath] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = useRef(null);
  const isOpen = menuPath === pathname;
  const scrolledSection = useActiveSection(SECTION_ID_LIST);

  let activeSection = '';
  if (isHome) activeSection = scrolledSection;
  else if (pathname.startsWith('/projects')) activeSection = 'work';

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      setIsScrolled(window.scrollY > 24);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = event => {
      if (event.key === 'Escape') setMenuPath(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const hrefFor = href => (isHome ? href : `/${href}`);

  const handleNavClick = (event, href) => {
    setMenuPath(null);
    if (!isHome) return;
    event.preventDefault();
    scrollToSection(href.replace('#', ''));
    window.history.pushState(null, '', href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-colors duration-300 ${
          isScrolled || isOpen
            ? 'border-line bg-ink/85 backdrop-blur-md'
            : 'border-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-340 items-center justify-between px-5 sm:h-18 sm:px-8 lg:px-14"
        >
          <Link
            href={isHome ? '#home' : '/'}
            onClick={event => handleNavClick(event, '#home')}
            aria-label="Tawchiful Islam, home"
            className="flex items-center gap-2.5 text-paper"
          >
            <LogoMark className="h-7 w-7" />
            <span className="font-display text-xl font-bold">
              Tawchiful<span className="text-brass">.</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.name}>
                  <Link
                    href={hrefFor(link.href)}
                    onClick={event => handleNavClick(event, link.href)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative inline-block py-2 text-sm transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-brass after:transition-transform after:duration-300 ${
                      isActive
                        ? 'text-paper after:scale-x-100'
                        : 'text-soft after:scale-x-0 hover:text-paper'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={hrefFor(navCta.href)}
                onClick={event => handleNavClick(event, navCta.href)}
                className="link inline-block py-2 text-sm font-medium"
              >
                {navCta.name}
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setMenuPath(isOpen ? null : pathname)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-3 text-soft transition-colors hover:border-brass hover:text-paper md:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        <div
          ref={progressRef}
          aria-hidden="true"
          className={`h-px origin-left bg-brass transition-opacity duration-300 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'scaleX(0)' }}
        />

        {isOpen && (
          <div
            id="mobile-menu"
            className="drop-in border-t border-line px-5 pb-6 pt-3 sm:px-8 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map(link => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.name}>
                    <Link
                      href={hrefFor(link.href)}
                      onClick={event => handleNavClick(event, link.href)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`block border-b border-line py-4 text-lg ${
                        isActive ? 'text-paper' : 'text-soft'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={hrefFor(navCta.href)}
              onClick={event => handleNavClick(event, navCta.href)}
              className="btn btn-primary mt-5 w-full"
            >
              {navCta.name}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
