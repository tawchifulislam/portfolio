'use client';

import { useState, useSyncExternalStore } from 'react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '@/lib/data';

const MESSAGE_MAX_LENGTH = 1000;

const socialLinks = [
  { label: 'GitHub', href: personalInfo.social.github },
  { label: 'LinkedIn', href: personalInfo.social.linkedin },
  { label: 'X', href: personalInfo.social.twitter },
];

const statusLabels = {
  idle: 'Send message',
  sending: 'Sending...',
  sent: 'Message sent',
  error: 'Something went wrong, try again',
  offline: 'No connection',
  invalid: 'Check the details above',
};

const liveMessages = {
  sent: 'Your message was sent.',
  error: 'Your message could not be sent. Please try again.',
  offline: 'You are offline. Reconnect to send your message.',
};

function validate({ name, email, message }) {
  const errors = {};

  if (name.trim().length < 2) {
    errors.name = 'Enter your full name.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (message.trim().length < 10) {
    errors.message = 'Message is too short.';
  }

  return errors;
}

function subscribeToConnection(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

const getOnline = () => navigator.onLine;
const getServerOnline = () => true;

const fieldClass = hasError =>
  `rounded-field border bg-ink px-3.5 py-3.5 text-[0.9375rem] text-paper transition-colors placeholder:text-faint focus-visible:border-brass ${
    hasError ? 'border-red-400' : 'border-line-2'
  }`;

function Field({ id, label, error, aside, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.8125rem] text-subtle">
          {label}
        </label>
        {aside}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const isOnline = useSyncExternalStore(
    subscribeToConnection,
    getOnline,
    getServerOnline,
  );

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'message' && value.length > MESSAGE_MAX_LENGTH) return;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

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
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-5 pb-16 pt-24 sm:px-8 lg:px-14 lg:pb-20"
    >
      <div className="mx-auto max-w-340">
        <div className="relative overflow-hidden rounded-card border border-line bg-raised p-6 sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 bg-[radial-gradient(closest-side,rgba(227,161,58,0.22),transparent)]"
          />
          <div
            aria-hidden="true"
            className="dot-grid pointer-events-none absolute inset-0 opacity-50"
          />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h2
                id="contact-heading"
                className="mb-4 mt-2.5 font-display text-h1 leading-[1.1]"
              >
                Let&apos;s build something good together.
              </h2>
              <p className="mb-6 max-w-136 text-soft">
                I&apos;m open to new opportunities. Tell me what you&apos;re
                working on and I&apos;ll reply personally.
              </p>

              <a
                href={`mailto:${personalInfo.email}`}
                className="wrap-break-word text-xl font-medium text-paper underline decoration-brass/60 decoration-2 underline-offset-[6px] transition-colors hover:decoration-brass sm:text-2xl"
              >
                {personalInfo.email}
              </a>
              <p className="mb-6 mt-1.5 text-subtle">{personalInfo.location}</p>

              <ul className="flex gap-5 text-sm">
                {socialLinks.map(social => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4.5"
            >
              {!isOnline && (
                <p className="rounded-field border border-red-400/30 bg-red-400/5 px-4 py-2.5 text-sm text-red-300">
                  You are currently offline. Reconnect to send a message.
                </p>
              )}

              <Field id="contact-name" label="Your name" error={errors.name}>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={fieldClass(errors.name)}
                />
              </Field>

              <Field id="contact-email" label="Email" error={errors.email}>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={fieldClass(errors.email)}
                />
              </Field>

              <Field
                id="contact-message"
                label="What's on your mind?"
                error={errors.message}
                aside={
                  <span className="font-mono text-xs text-subtle">
                    {formData.message.length}/{MESSAGE_MAX_LENGTH}
                  </span>
                }
              >
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  maxLength={MESSAGE_MAX_LENGTH}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'contact-message-error' : undefined
                  }
                  className={`${fieldClass(errors.message)} resize-none`}
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'sending' || !isOnline}
                className="btn btn-primary self-start disabled:cursor-not-allowed disabled:opacity-50"
              >
                {statusLabels[status]}
              </button>

              <p role="status" aria-live="polite" className="sr-only">
                {liveMessages[status] ?? ''}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}