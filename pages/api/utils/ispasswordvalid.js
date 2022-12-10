import { isPasswordMatch } from "../../../lib/api/sealpassword";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await isPasswordMatch(req.body.hash, req.body.password);
    return res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}