'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { variants, SHEET_NUMBERS, TOTAL_SHEETS } from '@/lib/constants';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import SectionTitle from '@/components/ui/SectionTitle';
import CornerMarks from '@/components/ui/CornerMarks';
import TitleBlock from '@/components/ui/TitleBlock';

const socialLinks = [
  { icon: <FaGithub size={14} />, href: personalInfo.social.github, label: 'GitHub' },
  { icon: <FaLinkedin size={14} />, href: personalInfo.social.linkedin, label: 'LinkedIn' },
  { icon: <FaXTwitter size={14} />, href: personalInfo.social.twitter, label: 'Twitter' },
];

const statusLabels = {
  idle: 'Send Inquiry',
  sending: 'Sending...',
  sent: 'Message Sent',
  error: 'Error, Try Again',
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStatus('sending');
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus('sent');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setStatus('idle'), 5000);
        },
        error => {
          console.error('EmailJS Error:', error);
          setStatus('error');
          setTimeout(() => setStatus('idle'), 5000);
        },
      );
  };

  return (
    <><section id="contact" className="relative px-4 sm:px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's build something exceptional together. I'm currently open for new opportunities." />

        <div className="sheet">
          <CornerMarks />

          <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-line">
            {/* Left: contact details */}
            <motion.div
              variants={variants.slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-4 p-8 sm:p-10 flex flex-col gap-8"
            >
              <p className="font-mono text-[11px] tracking-wide text-faint">
                REQUISITION FORM
              </p>

              <div className="flex flex-col gap-5">

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex items-center gap-3"
                >
                <span className="w-9 h-9 flex items-center justify-center border border-line text-brass group-hover:border-brass-dim transition-colors duration-300">
                  <Mail size={14} />
                </span>
                <div>
                  <p className="font-mono text-[10px] text-faint">EMAIL</p>
                  <p className="text-sm text-paper/80 group-hover:text-paper transition-colors duration-300">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <span className="w-9 h-9 flex items-center justify-center border border-line text-muted">
                  <MapPin size={14} />
                </span>
                <div>
                  <p className="font-mono text-[10px] text-faint">LOCATION</p>
                  <p className="text-sm text-paper/80">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
              </div>

              <div className="mt-auto flex items-center gap-2">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 flex items-center justify-center border border-line text-muted hover:text-brass hover:border-brass-dim transition-colors duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

      {/* Right: form */}
      <motion.div
        variants={variants.slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="lg:col-span-8 p-8 sm:p-10"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-faint">
                NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="bg-transparent border-b border-line focus:border-brass py-2 text-sm text-paper outline-none transition-colors placeholder:text-faint" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-faint">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                required
                className="bg-transparent border-b border-line focus:border-brass py-2 text-sm text-paper outline-none transition-colors placeholder:text-faint" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] text-faint">
              MESSAGE
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your vision..."
              required
              rows={5}
              className="bg-transparent border-b border-line focus:border-brass py-2 text-sm text-paper outline-none transition-colors placeholder:text-faint resize-none" />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="self-start px-7 py-3 bg-brass text-ink text-xs font-medium tracking-wide hover:bg-paper transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {statusLabels[status]}
          </button>
        </form>
      </motion.div>
          </div>
          <TitleBlock sheetNumber={SHEET_NUMBERS.contact} total={TOTAL_SHEETS} />
        </div>
      </div>
    </section>
    </>
  );
}