/** Escape HTML special characters to prevent XSS in email templates */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Simple in-memory rate limiter per IP */
const hits = new Map<string, { count: number; resetAt: number }>();
let lastCleanup = Date.now();

export function rateLimit(ip: string, maxRequests = 10, windowMs = 60_000): boolean {
  const now = Date.now();

  // Cleanup expired entries every 5 minutes
  if (now - lastCleanup > 300_000) {
    hits.forEach((entry, key) => {
      if (now > entry.resetAt) hits.delete(key);
    });
    lastCleanup = now;
  }

  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}
