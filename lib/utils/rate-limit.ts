type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Simple in-memory rate limiter suitable for single-instance serverless warm starts.
 * Not a substitute for edge/WAF limits in high-traffic production.
 */
export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 60_000,
): { success: boolean; remaining: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0 };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { success: true, remaining: limit - existing.count };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}
