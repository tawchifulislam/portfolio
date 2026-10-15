'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, navCta } from '@/lib/data';
import { SECTION_ID_LIST } from '@/lib/constants';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { scrollToSection } from '@/lib/utils';
import LogoMark from '@/components/ui/LogoMark';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [menuPath, setMenuPath] = useState(null);
  const isOpen = menuPath === pathname;
  const scrollProgress = useScrollProgress();
  const scrolledSection = useActiveSection(SECTION_ID_LIST);
  const isScrolled = scrollProgress > 2;

  let activeSection = '';
  if (isHome) activeSection = scrolledSection;
  else if (pathname.startsWith('/projects')) activeSection = 'work';

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
                    className={`relative inline-block py-2 text-sm transition-colors duration-200 ${
                      isActive ? 'text-paper' : 'text-soft hover:text-paper'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute inset-x-0 -bottom-0.5 h-px bg-brass"
                        transition={{
                          type: 'spring',
                          bounce: 0.2,
                          duration: 0.5,
                        }}
                      />
                    )}
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
          aria-hidden="true"
          className="h-px origin-left bg-brass"
          style={{
            transform: `scaleX(${scrollProgress / 100})`,
            opacity: isScrolled ? 1 : 0,
          }}
        />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="border-t border-line px-5 pb-6 pt-3 sm:px-8 md:hidden"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
