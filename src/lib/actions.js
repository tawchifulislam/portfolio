'use server';

import { getPayload } from 'payload';
import config from '@payload-config';

const MESSAGE_MAX_LENGTH = 1000;

export async function sendMessage({ name, email, message, website }) {
  // honeypot: real visitors never fill this hidden field
  if (website) return { ok: true };

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
    await payload.create({
      collection: 'messages',
      data: { name: cleanName, email: cleanEmail, message: cleanMessage },
    });
    return { ok: true };
  } catch (err) {
    console.error('Could not save message:', err);
    return { ok: false, error: 'Could not save message' };
  }
}
