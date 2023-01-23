import moment from "moment-timezone";
import { getUTCDate } from "../../lib/date";

export default async function handler(req, res) {
  // let date = "2023-01-23T07:09:24.189Z";
  // let timezone = moment.tz.guess();
  // console.log(timezone);

  const utcTime = getUTCDate()
  return res.status(200).json({
    date: utcTime
  })
}
