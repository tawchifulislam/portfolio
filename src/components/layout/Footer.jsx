'use client';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { scrollToSection } from '@/lib/utils';
import LogoMark from '@/components/ui/LogoMark';

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
    <footer className="border-t border-line px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
        <button
          onClick={() => scrollToSection('home')}
          aria-label="Go to home"
          className="text-muted hover:text-paper transition-colors duration-300"
        >
          <LogoMark className="w-5 h-5" />
        </button>

        <p className="font-mono text-[11px] text-faint text-center">
          © {currentYear} Tawchiful Islam
        </p>

        <div className="flex items-center gap-1">
          {socialLinks.map(social => (
            <a
              key={social.label}
              href={social.href}
              target={social.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={social.label}
              className="w-8 h-8 flex items-center justify-center text-muted hover:text-brass transition-colors duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
