import { verifySignature } from "@upstash/qstash/nextjs";
import { checkDateInSupabase } from "../../../lib/date";

async function handler(req, res) {
  console.log("If this is printed, the signature has already been verified");
  const date = new Date().toISOString();
    const checkThis = checkDateInSupabase("2023-01-22 18:30:00+00")
    console.log("Date Status: ", checkThis)
    console.log("Current Date Time: ", date)
  // do stuff
  res.status(200).end();
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
