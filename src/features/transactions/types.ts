export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  type: TransactionType;
  amountCents: number;
  category: string;
  description?: string;
  dateISO: string;
  createdAtISO: string;
  updatedAtISO: string;
};
