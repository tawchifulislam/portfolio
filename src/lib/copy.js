export function firstSentences(text, count = 1) {
  const value = String(text || '').trim();
  const parts = value.match(/[^.!?]+[.!?]+(\s|$)/g);
  if (!parts) return value;
  return parts.slice(0, count).join('').trim();
}

export function splitLead(text) {
  const value = String(text || '').trim();
  const match = value.match(/^(.+?[.!?])\s+(.+)$/);
  if (!match) return { lead: '', rest: value };
  return { lead: match[1], rest: match[2] };
}

export function findFlow(stats) {
  for (const item of stats ?? []) {
    const match = String(item.value)
      .trim()
      .match(/^(\d+)\s*(?:→|->)\s*(\d+)$/);
    if (match) {
      return {
        requests: Number(match[1]),
        winners: Number(match[2]),
        caption: `${match[1]} ${item.label}`,
      };
    }
  }
  return null;
}
