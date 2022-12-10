import { generateKey } from "../../../lib/api/links";
import rateLimit from "../../../lib/middleware/ratelimit";

const limiter = rateLimit({
  interval: 30 * 1000, // 30 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await limiter.check(res, 10, "CACHE_TOKEN");
      const response = await generateKey();
      return res.status(200).json(response);
    } catch {
      res.status(429).json({ error: "Rate limit exceeded" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
