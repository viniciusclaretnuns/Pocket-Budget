import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z
    .string()
    .min(1, "Informe um valor")
    .refine((v) => /^\d+([.,]\d{1,2})?$/.test(v.trim()), "Use formato 10,50"),
  category: z.string().min(2, "Informe a categoria"),
  description: z.string().max(60).optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
