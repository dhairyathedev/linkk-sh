import { verifySignature } from "@upstash/qstash/nextjs";

async function handler(req, res) {
  console.log("If this is printed, the signature has already been verified");
  const date = new Date().toLocaleDateString();
  console.log(date);
  // do stuff
  res.status(200).end();
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
