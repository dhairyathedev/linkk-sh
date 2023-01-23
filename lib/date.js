import moment from "moment-timezone";

export function getISODate() {
  const date = new Date();
  return date.toISOString();
}

export function getDateTimeLocal(timestamp){
  const d = timestamp ? new Date(timestamp) : new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .split(":")
    .join(":");
}

export function getUTCDate(){
  const anyTime = moment.tz(new Date(), moment.tz.guess());
  const utcTime = anyTime.clone().tz("UTC");
  return utcTime;
}

export function checkDateInSupabase(date){
  let supabaseDate = date;
    let currentDate = new Date();
    let userDate =
      currentDate.getDate() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getFullYear();

    let supaDate = moment(supabaseDate);
    let user = moment(userDate, "DD-MM-YYYY");
    if (supaDate.isSame(user, "date")) {
      return true
    } else {
      return false
    }
}

export function timeAgo(t) {
  // Parse the ISO date string and create a new Date object for the current time in UTC
  const isoDate = new Date(t);
  const currentTime = new Date().toISOString();
  const currentDate = new Date(currentTime);

  // Calculate the difference between the two dates in milliseconds
  const timeDifference = currentDate.getTime() - isoDate.getTime();

  // Convert the time difference into a meaningful "time ago" format
  let timeAgo = "";
  if (timeDifference < 60000) {
    // Less than 1 minute
    timeAgo = "just now";
  } else if (timeDifference < 3600000) {
    // Less than 1 hour
    timeAgo = Math.round(timeDifference / 60000) + " minutes ago";
  } else if (timeDifference < 86400000) {
    // Less than 1 day
    timeAgo = Math.round(timeDifference / 3600000) + " hours ago";
  } else {
    timeAgo = Math.round(timeDifference / 86400000) + " days ago";
  }

    return timeAgo // Output: "10 hours ago"
}
