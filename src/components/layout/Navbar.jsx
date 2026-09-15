'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { SECTION_ID_LIST } from '@/lib/constants';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { scrollToSection } from '@/lib/utils';
import LogoMark from '@/components/ui/LogoMark';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const activeSection = useActiveSection(SECTION_ID_LIST);
  const isScrolled = scrollProgress > 2;

  const handleNavClick = href => {
    const id = href.replace('#', '');
    scrollToSection(id);
    window.history.pushState(null, '', href);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 ${
          isScrolled
            ? 'bg-ink/90 backdrop-blur-md border-line'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          <button
            onClick={() => handleNavClick('#home')}
            aria-label="Go to home"
            className="text-paper hover:text-brass transition-colors duration-300"
          >
            <LogoMark className="w-6 h-6" />
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-300 ${
                      isActive ? 'text-paper' : 'text-muted hover:text-paper'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute left-4 right-4 -bottom-px h-px bg-brass"
                        transition={{
                          type: 'spring',
                          bounce: 0.2,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 flex items-center justify-center border border-line text-muted"
          >
            {isOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>

        <div
          className="h-px bg-brass transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-ink border-b border-line md:hidden"
          >
            <ul className="flex flex-col p-4 gap-1">
              {navLinks.map(link => {
                const id = link.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left px-4 py-3 text-xs font-medium tracking-wide border-l-2 transition-colors duration-300 ${
                        isActive
                          ? 'text-paper border-brass'
                          : 'text-muted border-line'
                      }`}
                    >
                      {link.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
