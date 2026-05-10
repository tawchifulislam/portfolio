'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import { personalInfo } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';

const socialLinks = [
  {
    icon: <FaGithub size={14} />,
    href: personalInfo.social.github,
    label: 'GitHub',
  },
  {
    icon: <FaLinkedin size={14} />,
    href: personalInfo.social.linkedin,
    label: 'LinkedIn',
  },
  {
    icon: <FaXTwitter size={14} />,
    href: personalInfo.social.twitter,
    label: 'Twitter',
  },
  {
    icon: <Mail size={14} />,
    href: `mailto:${personalInfo.email}`,
    label: 'Email',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-1 pb-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-4 rounded-2xl bg-white/6 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)]"
        >
          <motion.button
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.94 }}
            className="relative w-8 h-8 opacity-40 hover:opacity-100 transition-all duration-300"
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              fill
              className="object-contain brightness-0 invert"
            />
          </motion.button>

          <p className="text-[11px] text-white/20 tracking-widest uppercase font-medium text-center">
            © {currentYear} — Developed by Tawchiful Islam
          </p>

          <div className="flex items-center gap-1 bg-white/4 rounded-xl px-2 py-1.5 border border-white/6">
            {socialLinks.map(social => (
              <a
                key={social.label}
                href={social.href}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-white/20 hover:text-white/70 hover:bg-white/8 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
