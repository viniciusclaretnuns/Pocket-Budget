import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import { Transaction } from "../features/transactions/types";

function escapeCSV(value: string) {
  const v = value.replace(/"/g, '""');
  return `"${v}"`;
}

export function transactionsToCSV(list: Transaction[]) {
  const header = ["Data", "Tipo", "Categoria", "Descricao", "Valor (R$)"].join(
    ","
  );

  let income = 0;
  let expense = 0;

  const rows = list.map((t) => {
    if (t.type === "income") income += t.amountCents;
    else expense += t.amountCents;

    const valor = (t.amountCents / 100).toFixed(2).replace(".", ",");
    const tipo = t.type === "income" ? "Entrada" : "Saida";

    return [
      escapeCSV(t.dateISO),
      escapeCSV(tipo),
      escapeCSV(t.category),
      escapeCSV(t.description ?? ""),
      escapeCSV(valor),
    ].join(",");
  });

  const saldo = income - expense;
  const saldoStr = (saldo / 100).toFixed(2).replace(".", ",");

  const footer = ["", "", "", "SALDO FINAL", escapeCSV(saldoStr)].join(",");

  return [header, ...rows, footer].join("\n");
}




export async function shareCSV(filename: string, csvContent: string) {
  try {
    const base =
      (FileSystem as any).cacheDirectory ||
      (FileSystem as any).documentDirectory ||
      "file:///data/user/0/host.exp.exponent/cache/";

    const uri = `${base}${filename}`;

    await FileSystem.writeAsStringAsync(uri, csvContent);

    const info = await FileSystem.getInfoAsync(uri);
    if (!info.exists) {
      Alert.alert("Erro", "Não consegui criar o arquivo CSV.");
      return;
    }

    const canShare = await Sharing.isAvailableAsync();
    if (!canShare) {
      Alert.alert("Aviso", "Compartilhamento não disponível.");
      return;
    }

    await Sharing.shareAsync(uri, {
      mimeType: "text/csv",
      dialogTitle: "Exportar CSV",
      UTI: "public.comma-separated-values-text",
    });

    Alert.alert("Pronto!", "CSV gerado e aberto no compartilhamento.");

  } catch (e: any) {
    console.log("shareCSV error:", e);
    Alert.alert("Erro ao exportar CSV", String(e?.message ?? e));
  }
}

