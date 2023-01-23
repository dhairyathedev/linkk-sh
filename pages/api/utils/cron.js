import moment from "moment-timezone";
import {
  fetchAllLinksExpireDate,
  scheduleLinkDelete,
} from "../../../lib/api/schedule";
import { checkDateInSupabase, getISODate } from "../../../lib/date";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await fetchAllLinksExpireDate();
  //   function checkDate(supabaseDate, userDate) {
  //     let supaDate = moment(supabaseDate);
  //     let user = moment(userDate,"DD-MM-YYYY");
  //     if (supaDate.isSame(user, 'date')) {
  //         return true;
  //     } else {
  //         return false;
  //     }
  // }
  let match = false;
  let expiryDate;
response.forEach(date => {
    // match = checkDate(date.expiresAt, "-01-2023") || match;
    match = checkDateInSupabase(date.expiresAt) || match;
    if(checkDateInSupabase(date.expiresAt)){
      expiryDate = date.expiresAt;
    }
});

if(match){
  console.log(expiryDate)
  const del = await scheduleLinkDelete(expiryDate)
}else{
  console.log("No matches found in supabase.")
}
    // if (response) {
    //   await scheduleLinkDelete();
    // }
    return res.status(200).json({
      response,
      date: new Date().toUTCString(),
      test: checkDateInSupabase("2023-01-21T18:30:00+00:00"),
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
