import { createLink } from "../../../lib/api/links";
import { validURL } from "../../../lib/validations/is-url";
import rateLimit from "../../../lib/middleware/ratelimit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      if(validURL(req.body.url) && !!req.body.key){
        await limiter.check(res, 5, "CACHE_TOKEN");
        const response = await createLink(req.body);
        return res.status(200).json(response);
      }
      return res.status(200).json({
        isUrl: validURL(req.body.url),
        keyPresent: !!req.body.key,
        message: "Invalid URL or empty key"
      })
    } catch {
      res.status(429).json({ error: "Rate limit exceeded" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
