export const pad = value => String(value).padStart(2, '0');

export function firstSentences(text, count = 1) {
  const value = String(text || '').trim();
  const parts = value.match(/[^.!?]+[.!?]+(\s|$)/g);
  if (!parts) return value;
  return parts.slice(0, count).join('').trim();
}
