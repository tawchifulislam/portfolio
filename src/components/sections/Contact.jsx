'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { variants } from '@/lib/constants';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import SectionTitle from '@/components/ui/SectionTitle';
import CornerMarks from '@/components/ui/CornerMarks';

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
];

const MESSAGE_MAX_LENGTH = 1000;

const statusLabels = {
  idle: 'Send Inquiry',
  sending: 'Sending...',
  sent: 'Message Sent',
  error: 'Error, Try Again',
  offline: 'No Connection',
  invalid: 'Check Details Below',
};

function validate({ name, email, message }) {
  const errors = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Enter your full name.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address.';
  }
  if (trimmedMessage.length < 10) {
    errors.message = 'Message is too short.';
  }

  return errors;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MESSAGE_MAX_LENGTH) return;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('invalid');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    if (!navigator.onLine) {
      setStatus('offline');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('sending');
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
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
          setStatus(navigator.onLine ? 'error' : 'offline');
          setTimeout(() => setStatus('idle'), 5000);
        },
      );
  };

  return (
    <section id="contact" className="relative px-4 sm:px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's build something exceptional together. I'm currently open for new opportunities."
        />

        <div className="sheet">
          <CornerMarks />

          <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-line">
            <motion.div
              variants={variants.slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-4 p-8 sm:p-10 flex flex-col gap-8"
            >
              <p className="font-mono text-[11px] tracking-wide text-faint">
                CONTACT
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

            <motion.div
              variants={variants.slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-8 p-8 sm:p-10"
            >
              {!isOnline && (
                <p className="mb-5 text-xs text-red-400 border border-red-400/30 bg-red-400/5 px-4 py-2.5">
                  You are currently offline. Reconnect to send a message.
                </p>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-6"
              >
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
                      className={`bg-transparent border-b py-2 text-sm text-paper outline-none transition-colors placeholder:text-faint ${
                        errors.name
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-line focus:border-brass'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400">{errors.name}</p>
                    )}
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
                      className={`bg-transparent border-b py-2 text-sm text-paper outline-none transition-colors placeholder:text-faint ${
                        errors.email
                          ? 'border-red-400 focus:border-red-400'
                          : 'border-line focus:border-brass'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <label className="font-mono text-[10px] text-faint">
                      MESSAGE
                    </label>
                    <span className="font-mono text-[10px] text-faint">
                      {formData.message.length}/{MESSAGE_MAX_LENGTH}
                    </span>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your vision..."
                    required
                    rows={5}
                    maxLength={MESSAGE_MAX_LENGTH}
                    className={`bg-transparent border-b py-2 text-sm text-paper outline-none transition-colors placeholder:text-faint resize-none ${
                      errors.message
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-line focus:border-brass'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending' || !isOnline}
                  className="self-start px-7 py-3 bg-brass text-ink text-xs font-medium tracking-wide hover:bg-paper transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {statusLabels[status]}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
