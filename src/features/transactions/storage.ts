import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "./types";

const KEY = "@pocketbudget/transactions";

export async function getAllTransactions(): Promise<Transaction[]> {
  const raw = await AsyncStorage.getItem(KEY);
  const list: Transaction[] = raw ? JSON.parse(raw) : [];
  return list.sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));
}

async function saveAll(list: Transaction[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function seedIfEmpty() {
  const list = await getAllTransactions();
  if (list.length > 0) return;

  const now = new Date().toISOString();
  const seed: Transaction[] = [
    {
      id: "1",
      type: "income",
      amountCents: 350000,
      category: "Salário",
      description: "Entrada",
      dateISO: now.slice(0, 10),
      createdAtISO: now,
      updatedAtISO: now,
    },
    {
      id: "2",
      type: "expense",
      amountCents: 4590,
      category: "Café",
      description: "Padaria",
      dateISO: now.slice(0, 10),
      createdAtISO: now,
      updatedAtISO: now,
    },
  ];

  await saveAll(seed);
}

export async function createTransaction(tx: Transaction) {
  const list = await getAllTransactions();
  await saveAll([tx, ...list]);
  return tx;
}

export async function deleteTransaction(id: string) {
  const list = await getAllTransactions();
  await saveAll(list.filter((t) => t.id !== id));
}

export async function getTransactionById(id: string) {
  const list = await getAllTransactions();
  return list.find((t) => t.id === id) ?? null;
}

export async function updateTransaction(id: string, patch: Partial<Transaction>) {
  const list = await getAllTransactions();
  const now = new Date().toISOString();

  const updated = list.map((t) =>
    t.id === id ? { ...t, ...patch, updatedAtISO: now } : t
  );

  await saveAll(updated);
  return updated.find((t) => t.id === id) ?? null;
}

