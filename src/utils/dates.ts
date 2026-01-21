export function getMonthKey(dateISO: string) {
  // "2026-01-19" -> "2026-01"
  return dateISO.slice(0, 7);
}

export function monthLabel(monthKey: string) {
  // "2026-01" -> "01/2026"
  const [y, m] = monthKey.split("-");
  return `${m}/${y}`;
}
