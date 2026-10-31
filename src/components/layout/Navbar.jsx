'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { Menu, X } from 'lucide-react';
import { navLinks, navCta } from '@/lib/data';
import { SECTION_ID_LIST } from '@/lib/constants';
import { useActiveSection } from '@/hooks/useActiveSection';
import LogoMark from '@/components/ui/LogoMark';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const lenis = useLenis();
  const [menuPath, setMenuPath] = useState(null);
  const progressRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
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

    lenis?.stop();
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setMenuPath(null);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !menuRef.current) return;
      const nodes = [
        toggleRef.current,
        ...menuRef.current.querySelectorAll('a[href]'),
      ].filter(Boolean);
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    menuRef.current?.querySelector('a[href]')?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      html.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const hrefFor = href => (isHome ? href : `/${href}`);

  const handleNavClick = (event, href) => {
    setMenuPath(null);
    if (!isHome) return;
    event.preventDefault();
    const top = href === '#home';
    if (lenis) {
      lenis.scrollTo(top ? 0 : href, { offset: -88, force: true });
    } else {
      document.querySelector(top ? 'body' : href)?.scrollIntoView();
    }
    window.history.pushState(null, '', href);
  };

  return (
    <>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-60 h-0.75 origin-left bg-signal"
        style={{ transform: 'scaleX(0)' }}
      />

      <header className="fixed inset-x-0 top-4 z-50 px-4">
        {isOpen && (
          <div
            id="mobile-menu"
            ref={menuRef}
            data-lenis-prevent
            className="theme-cobalt drop-in fixed inset-0 z-0 overflow-y-auto px-5 pb-10 pt-28 sm:px-8 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map(link => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.name} className="border-b border-line">
                    <Link
                      href={hrefFor(link.href)}
                      onClick={event => handleNavClick(event, link.href)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`block py-5 font-display text-[clamp(1.75rem,1.2rem+2.5vw,2.5rem)] font-extrabold leading-none tracking-[-0.03em] ${
                        isActive ? 'text-accent' : 'text-fg'
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
              className="btn btn-primary mt-8 w-full"
            >
              {navCta.name}
            </Link>
          </div>
        )}

        <nav
          aria-label="Primary"
          className="relative z-10 mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full border border-white/10 bg-night/90 py-2 pl-4 pr-2 text-chalk backdrop-blur-md"
        >
          <Link
            href={isHome ? '#home' : '/'}
            onClick={event => handleNavClick(event, '#home')}
            aria-label="Tawchiful Islam, home"
            className="flex items-center gap-2.5"
          >
            <LogoMark className="h-8 w-8" />
            <span className="font-display text-lg font-extrabold tracking-[-0.03em]">
              Tawchiful<span className="text-signal">.</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.name}>
                  <Link
                    href={hrefFor(link.href)}
                    onClick={event => handleNavClick(event, link.href)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative inline-flex rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-chalk' : 'text-chalk/70 hover:text-chalk'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={hrefFor(navCta.href)}
            onClick={event => handleNavClick(event, navCta.href)}
            className="hidden rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-chalk md:inline-flex"
          >
            {navCta.name}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuPath(isOpen ? null : pathname)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-chalk transition-colors hover:bg-signal hover:text-night md:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>
    </>
  );
}
