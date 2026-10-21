'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

const MESSAGE_MAX_LENGTH = 1000;

export async function sendMessage({ name, email, message, website }) {
  // honeypot: real visitors never fill this hidden field
  if (website) return { ok: true, spam: true };

  const cleanName = String(name || '')
    .trim()
    .slice(0, 100);
  const cleanEmail = String(email || '')
    .trim()
    .slice(0, 200);
  const cleanMessage = String(message || '')
    .trim()
    .slice(0, MESSAGE_MAX_LENGTH);

  if (cleanName.length < 2) return { ok: false, error: 'Invalid name' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return { ok: false, error: 'Invalid email' };
  }
  if (cleanMessage.length < 10)
    return { ok: false, error: 'Message too short' };

  try {
    const payload = await getPayload({ config });

    // at most 10 messages per 10 minutes
    const recent = await payload.count({
      collection: 'messages',
      where: {
        createdAt: {
          greater_than: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        },
      },
    });
    if (recent.totalDocs >= 10) {
      return { ok: false, error: 'Too many messages, try again later' };
    }

    await payload.create({
      collection: 'messages',
      data: { name: cleanName, email: cleanEmail, message: cleanMessage },
    });
    return { ok: true };
  } catch (err) {
    console.error('Could not save message:', err);
    // database problem: the form falls back to email
    return { ok: false, error: 'Could not save message', fallback: true };
  }
}
