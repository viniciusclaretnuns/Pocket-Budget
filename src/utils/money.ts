export function amountToCents(amount: string): number {
  const cleaned = amount.trim().replace(/\./g, "").replace(",", ".");
  const value = Number(cleaned);
  if (Number.isNaN(value)) return 0;
  return Math.round(value * 100);
}

export function formatBRL(cents: number): string {
  const value = (cents / 100).toFixed(2).replace(".", ",");
  return `R$ ${value}`;
}
