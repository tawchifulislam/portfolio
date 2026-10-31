'use client';

import { useState, useSyncExternalStore } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowUpRight } from 'lucide-react';
import { sendMessage } from '@/lib/actions';
import SplitHeading from '@/components/ui/SplitHeading';

const MESSAGE_MAX_LENGTH = 1000;

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
  `w-full rounded-xl border bg-transparent px-4 py-3.5 text-[0.9375rem] text-fg transition-colors placeholder:text-soft focus-visible:border-accent ${
    hasError ? 'border-red-400' : 'border-fg/20'
  }`;

function Field({ id, label, error, aside, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-soft">
          {label}
        </label>
        {aside}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact({ personalInfo }) {
  const [website, setWebsite] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const isOnline = useSyncExternalStore(
    subscribeToConnection,
    getOnline,
    getServerOnline,
  );

  const links = [
    { label: 'GitHub', href: personalInfo.social?.github },
    { label: 'LinkedIn', href: personalInfo.social?.linkedin },
    { label: 'X', href: personalInfo.social?.twitter },
  ].filter(item => item.href);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'message' && value.length > MESSAGE_MAX_LENGTH) return;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async event => {
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
    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    let result;
    try {
      result = await sendMessage({ ...trimmed, website });
    } catch (error) {
      console.error('Message error:', error);
      result = { ok: false, fallback: true };
    }

    if (result.spam) {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    if (!result.ok && !result.fallback) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    const mail = emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      trimmed,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    );

    if (result.ok) {
      mail.catch(error => console.error('EmailJS Error:', error));
    } else {
      try {
        await mail;
      } catch (error) {
        console.error('EmailJS Error:', error);
        setStatus(navigator.onLine ? 'error' : 'offline');
        setTimeout(() => setStatus('idle'), 5000);
        return;
      }
    }

    setStatus('sent');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="theme-signal sheet px-5 sm:px-8 lg:px-14"
    >
      <div className="mx-auto grid max-w-340 grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SplitHeading
            id="contact-heading"
            text="Let's build something good together."
            className="mb-10 font-display text-[clamp(2.25rem,0.8rem+5.2vw,5.5rem)] font-extrabold leading-[1.0] tracking-[-0.04em]"
          />

          <a
            href={`mailto:${personalInfo.email}`}
            className="link break-all font-display text-[clamp(1.25rem,0.9rem+1.6vw,2.25rem)] font-bold"
          >
            {personalInfo.email}
          </a>
          <p className="mt-3 text-lg text-soft">{personalInfo.location}</p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {links.map(item => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline px-5 py-2.5 text-sm"
                >
                  {item.label}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="theme-ink relative flex flex-col gap-5 rounded-[1.75rem] p-6 sm:p-8"
        >
          {!isOnline && (
            <p className="rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-2.5 text-sm text-red-300">
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
              aria-describedby={
                errors.email ? 'contact-email-error' : undefined
              }
              className={fieldClass(errors.email)}
            />
          </Field>

          <Field
            id="contact-message"
            label="What's on your mind?"
            error={errors.message}
            aside={
              <span className="text-sm text-soft">
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

          <input
            type="text"
            name="website"
            value={website}
            onChange={event => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

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
    </section>
  );
}
