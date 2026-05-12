'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { navLinks } from '@/lib/data';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { scrollToSection } from '@/lib/utils';
import { SECTION_IDS } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('home');
  const scrollProgress = useScrollProgress();
  const isScrolled = scrollProgress > 2;

  useEffect(() => {
    const handleUrlAndHighlight = () => {
      const sections = Object.values(SECTION_IDS);
      let current = 'home';

      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            current = id;
            break;
          }
        }
      }

      setActiveHash(current);
      const newHash =
        current === 'home' || current === 'hero'
          ? window.location.pathname
          : `#${current}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, '', newHash);
      }
    };

    window.addEventListener('scroll', handleUrlAndHighlight);
    return () => window.removeEventListener('scroll', handleUrlAndHighlight);
  }, []);

  const handleNavClick = href => {
    const id = href.replace('#', '');
    scrollToSection(id);
    setActiveHash(id);
    window.history.pushState(null, '', href);
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4"
      >
        <div
          className={`w-full max-w-5xl flex items-center justify-between px-5 h-14 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? 'bg-white/6 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)]'
              : 'bg-white/3 backdrop-blur-md border border-white/6'
          }`}
        >
          <motion.button
            onClick={() => handleNavClick('#home')}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative w-8 h-8"
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>

          <ul className="hidden md:flex items-center gap-1 bg-white/4 rounded-xl px-2 py-1.5 border border-white/6">
            {navLinks.map(link => {
              const id = link.href.replace('#', '');
              const isActive = activeHash === id;
              return (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-1.5 text-[11px] font-medium tracking-widest uppercase rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-white/30 hover:text-white/60'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pill"
                        className="absolute inset-0 rounded-lg bg-white/10 border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                        transition={{
                          type: 'spring',
                          bounce: 0.15,
                          duration: 0.5,
                        }}
                      />
                    )}
                    <span className="relative">{link.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/6 border border-white/8 text-white/40 hover:text-white transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="x"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <X size={16} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <Menu size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-linear-to-r from-transparent via-violet-400 to-transparent transition-all duration-300"
          style={{ width: `${scrollProgress}%`, opacity: isScrolled ? 1 : 0 }}
        />
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed top-20 right-6 z-50 w-48 rounded-2xl bg-[#0d0d12]/90 backdrop-blur-2xl border border-white/8 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] md:hidden overflow-hidden"
            >
              <ul className="flex flex-col p-2">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left px-4 py-3 text-[10px] font-semibold tracking-[0.2em] uppercase rounded-xl transition-all duration-200 ${
                        activeHash === link.href.replace('#', '')
                          ? 'text-white bg-white/10 border border-white/5'
                          : 'text-white/20 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
