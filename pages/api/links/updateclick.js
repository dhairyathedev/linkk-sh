
import { updateClicks } from "../../../lib/api/links";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await updateClicks(req.body.key, parseInt(req.body.clicks));
    return res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}