export function formatUpdatedAt(updatedAt) {
  if (!updatedAt) return "";

  const date = new Date(updatedAt);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const time = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase()
    .replace(" am", " a.m.")
    .replace(" pm", " p.m.");

  return `${year}-${month}-${day}, ${time}`;
}

export function returnTimeAgo(updatedAt) {
  if (!updatedAt) return "";

  const seconds = Math.floor(
    (Date.now() - new Date(updatedAt).getTime()) / 1000,
  );

  if (seconds < 5) {
    return "just now";
  }

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day${days === 1 ? "" : "s"} ago`;
}
