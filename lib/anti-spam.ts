const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Detects gibberish/random strings that bots typically generate.
 * Checks for: unusual character patterns, lack of vowels, excessive consonant clusters,
 * random case mixing, and absence of real word patterns.
 */
export function isGibberish(text: string): boolean {
  if (!text || text.length < 3) return false;

  const cleaned = text.replace(/\s+/g, '');
  if (cleaned.length < 4) return false;

  const vowels = (cleaned.match(/[aeiouAEIOU]/g) || []).length;
  const vowelRatio = vowels / cleaned.length;
  if (vowelRatio < 0.1 && cleaned.length > 6) return true;

  const consonantClusters = cleaned.match(/[bcdfghjklmnpqrstvwxyz]{5,}/gi);
  if (consonantClusters && consonantClusters.length > 0) return true;

  const upperCount = (cleaned.match(/[A-Z]/g) || []).length;
  const lowerCount = (cleaned.match(/[a-z]/g) || []).length;
  if (upperCount > 2 && lowerCount > 2) {
    const caseChanges = (cleaned.match(/[a-z][A-Z]|[A-Z][a-z]/g) || []).length;
    const changeRatio = caseChanges / cleaned.length;
    if (changeRatio > 0.3 && cleaned.length > 8) return true;
  }

  return false;
}

export function isSpamSubmission(fields: Record<string, string>): {
  isSpam: boolean;
  reason: string;
} {
  for (const [key, value] of Object.entries(fields)) {
    if (!value || typeof value !== 'string') continue;

    if (['name', 'subject', 'message'].includes(key) && isGibberish(value)) {
      return { isSpam: true, reason: `Invalid ${key} content` };
    }
  }

  const emailValue = fields.email;
  if (emailValue) {
    const localPart = emailValue.split('@')[0] || '';
    const dotCount = (localPart.match(/\./g) || []).length;
    if (dotCount >= 4 && localPart.replace(/\./g, '').length < 12) {
      return { isSpam: true, reason: 'Suspicious email format' };
    }
  }

  return { isSpam: false, reason: '' };
}

const MIN_SUBMISSION_TIME_MS = 3000;

export function isSubmittedTooFast(formLoadedAt: number): boolean {
  const elapsed = Date.now() - formLoadedAt;
  return elapsed < MIN_SUBMISSION_TIME_MS;
}

export function validateHoneypot(honeypotValue: string | undefined): boolean {
  return !honeypotValue || honeypotValue.trim() === '';
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
}
