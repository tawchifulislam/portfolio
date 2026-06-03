'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { variants } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';

const socialLinks = [
  {
    icon: <FaGithub size={16} />,
    href: personalInfo.social.github,
    label: 'GitHub',
  },
  {
    icon: <FaLinkedin size={16} />,
    href: personalInfo.social.linkedin,
    label: 'LinkedIn',
  },
  {
    icon: <FaXTwitter size={16} />,
    href: personalInfo.social.twitter,
    label: 'Twitter',
  },
];

const contactItems = [
  {
    icon: <Mail size={18} />,
    label: 'Email Me',
    value: personalInfo.email,
    href: 'mailto:' + personalInfo.email,
  },
  {
    icon: <Phone size={18} />,
    label: 'Phone',
    value: personalInfo.phone,
    href: 'tel:' + personalInfo.phone,
  },
  {
    icon: <MapPin size={18} />,
    label: 'Location',
    value: personalInfo.location,
    href: null,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setStatus('sending');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus('sent');

          setFormData({
            name: '',
            email: '',
            message: '',
          });

          setTimeout(() => setStatus(null), 5000);
        },
        error => {
          console.error('EmailJS Error:', error);

          setStatus('error');

          setTimeout(() => setStatus(null), 5000);
        },
      );
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-violet-600/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's build something exceptional together. I'm currently open for new opportunities."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          <motion.div
            variants={variants.slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="p-6 rounded-3xl bg-white/2 border border-white/[0.07]">
              <h3 className="text-2xl font-bold font-[--font-syne] text-white mb-2">
                Contact <span className="text-violet-400">Information.</span>
              </h3>

              <p className="text-white/30 text-sm leading-relaxed">
                Feel free to reach out for collaborations, opportunities, or
                just a friendly hello.
              </p>
            </div>

            {/* Contact items */}
            <div className="flex flex-col gap-3 flex-1">
              {contactItems.map(item => (
                <div key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/6 hover:border-violet-500/25 transition-all duration-500 w-full"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300 shrink-0">
                        {item.icon}
                      </div>

                      <div>
                        <p className="text-[9px] font-black tracking-[0.2em] text-white/20 uppercase mb-0.5">
                          {item.label}
                        </p>

                        <p className="text-sm text-white/55 group-hover:text-white/80 transition-colors duration-300">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/6">
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/30 shrink-0">
                        {item.icon}
                      </div>

                      <div>
                        <p className="text-[9px] font-black tracking-[0.2em] text-white/20 uppercase mb-0.5">
                          {item.label}
                        </p>

                        <p className="text-sm text-white/55">{item.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-white/2 border border-white/6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black tracking-[0.2em] uppercase text-white/20">
                  Find me on
                </p>

                <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              </div>

              <div className="flex items-center gap-2">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/3 border border-white/6 text-white/25 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 text-xs font-medium"
                  >
                    {social.icon}

                    <span className="hidden sm:inline">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={variants.slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="h-full p-8 rounded-3xl bg-white/2 border border-white/8 backdrop-blur-xl flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black tracking-[0.2em] text-white/20 uppercase ml-1">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-white/3 border border-white/6 focus:border-violet-500/50 text-white/80 outline-none transition-all placeholder:text-white/10 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black tracking-[0.2em] text-white/20 uppercase ml-1">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-white/3 border border-white/6 focus:border-violet-500/50 text-white/80 outline-none transition-all placeholder:text-white/10 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-[9px] font-black tracking-[0.2em] text-white/20 uppercase ml-1">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your vision..."
                  required
                  className="w-full flex-1 min-h-45 px-5 py-4 rounded-2xl bg-white/3 border border-white/6 focus:border-violet-500/50 text-white/80 outline-none transition-all placeholder:text-white/10 resize-none text-sm"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(124,58,237,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending'
                  ? 'Sending...'
                  : status === 'sent'
                    ? 'Message Sent! ✓'
                    : status === 'error'
                      ? 'Error! Try Again'
                      : 'Send Inquiry'}

                <ArrowUpRight size={15} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
