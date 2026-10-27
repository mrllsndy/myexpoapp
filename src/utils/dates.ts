export function greeting(now: Date = new Date()): string {
  const h = now.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function formatToday(now: Date = new Date()): string {
  return now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/** Returns a new Date `days` days after `from` (default: today). */
export function addDays(days: number, from: Date = new Date()): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
}

/** e.g. "Oct 29" */
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
