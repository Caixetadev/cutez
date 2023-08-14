import { Ratelimit } from '@upstash/ratelimit'
import { redis } from '@/lib/redis'

export async function rateLimit(identifier: string) {
  const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    analytics: true,
    prefix: '@upstash/ratelimit',
  })

  return await rateLimit.limit(identifier)
}
