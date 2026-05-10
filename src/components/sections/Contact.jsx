'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { variants } from '@/lib/constants';
import SectionTitle from '@/components/ui/SectionTitle';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';

const socialLinks = [
  {
    icon: <FaGithub size={18} />,
    href: personalInfo.social.github,
    label: 'GitHub',
  },
  {
    icon: <FaLinkedin size={18} />,
    href: personalInfo.social.linkedin,
    label: 'LinkedIn',
  },
  {
    icon: <FaXTwitter size={18} />,
    href: personalInfo.social.twitter,
    label: 'Twitter',
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          setFormData({ name: '', email: '', message: '' });
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
      className="relative py-17 px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-5xl h-100 bg-violet-600/2 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's build something exceptional together. I'm currently open for new opportunities."
        />

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div
            variants={variants.slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-10"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white">
                Contact <span className="text-violet-500">Information.</span>
              </h3>
              <p className="text-white/30 text-sm leading-relaxed max-w-xs">
                Feel free to reach out for collaborations or just a friendly
                hello.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-5 p-5 rounded-3xl bg-white/2 border border-white/5 hover:border-violet-500/30 transition-all duration-500"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase mb-1">
                    Email Me
                  </p>
                  <p className="text-sm text-white/60 font-medium">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-5 p-5 rounded-3xl bg-white/2 border border-white/5">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-white/40">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase mb-1">
                    Location
                  </p>
                  <p className="text-sm text-white/60 font-medium">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/3 border border-white/8 text-white/20 hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
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
              className="p-8 rounded-[2.5rem] bg-white/2 border border-white/8 backdrop-blur-3xl shadow-2xl space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase ml-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-white/3 border border-white/6 focus:border-violet-500/50 text-white outline-none transition-all placeholder:text-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-white/3 border border-white/6 focus:border-violet-500/50 text-white outline-none transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your vision..."
                  required
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl bg-white/3 border border-white/6 focus:border-violet-500/50 text-white outline-none transition-all placeholder:text-white/10 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-black tracking-[0.2em] uppercase transition-all shadow-xl shadow-violet-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending'
                  ? 'Sending...'
                  : status === 'sent'
                    ? 'Message Sent!'
                    : status === 'error'
                      ? 'Error! Try Again'
                      : 'Send Inquiry'}
                <ArrowUpRight size={16} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
