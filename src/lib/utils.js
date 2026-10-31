export const safeJsonLd = data => JSON.stringify(data).replace(/</g, '\\u003c');
