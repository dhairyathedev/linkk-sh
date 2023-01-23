import {
  fetchAllLinksExpireDate,
  scheduleLinkDelete,
} from "../../../lib/api/schedule";
import { checkDateInSupabase, getISODate } from "../../../lib/date";
import { verifySignature } from "@upstash/qstash/nextjs";

async function handler(req, res) {
  try{
    const response = await fetchAllLinksExpireDate();
    let match = false;
    let expiryDate;
    response.forEach((date) => {
      match = checkDateInSupabase(date.expiresAt) || match;
      if (checkDateInSupabase(date.expiresAt)) {
        expiryDate = date.expiresAt;
      }
    });

    if (match) {
      console.log(expiryDate);
      const del = await scheduleLinkDelete(expiryDate);
    } else {
      console.log("No matches found in supabase.");
    }
    // if (response) {
    //   await scheduleLinkDelete();
    // }
    return res.status(200).json({
      response,
      date: new Date().toUTCString(),
      test: checkDateInSupabase("2023-01-21T18:30:00+00:00"),
    });
  }catch(err){
    res.status(500).send(err)
  }finally{
    res.end()
  }
}

export default verifySignature(async() => await handler());

export const config = {
  api: {
    bodyParser: false,
  },
};