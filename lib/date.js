export function getISODate() {
  const date = new Date();
  return date.toISOString();
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
