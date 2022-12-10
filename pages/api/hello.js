
import { v4 as uuidv4 } from 'uuid'
import rateLimit from '../../lib/middleware/ratelimit'

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function handler(req, res) {
  try {
    await limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute
    res.status(200).json({ id: uuidv4() })
  } catch {
    res.status(429).json({ error: 'Rate limit exceeded' })
  }
}