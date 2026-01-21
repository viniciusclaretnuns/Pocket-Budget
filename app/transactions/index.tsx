import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import {
  useDeleteTransaction,
  useTransactions,
} from "../../src/features/transactions/queries";
import { useTheme } from "../../src/theme/theme";
import { shareCSV, transactionsToCSV } from "../../src/utils/csv";
import { getMonthKey, monthLabel } from "../../src/utils/dates";
import { formatBRL } from "../../src/utils/money";

export default function Transactions() {
  const { data, isLoading } = useTransactions();
  const del = useDeleteTransaction();

  const { colors } = useTheme();

  const months = useMemo(() => {
    const list = data ?? [];
    const unique = Array.from(new Set(list.map((t) => getMonthKey(t.dateISO))));
    return unique.sort((a, b) => (a < b ? 1 : -1)); // desc
  }, [data]);

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const list = data ?? [];
    if (!selectedMonth) return list;
    return list.filter((t) => getMonthKey(t.dateISO) === selectedMonth);
  }, [data, selectedMonth]);

  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;

    for (const t of filtered) {
      if (t.type === "income") income += t.amountCents;
      else expense += t.amountCents;
    }

    return { income, expense, balance: income - expense };
  }, [filtered]);

  const onExportCSV = async () => {
    const csv = transactionsToCSV(filtered);
    const name = `pocketbudget-${selectedMonth ?? "all"}-${Date.now()}.csv`;
    await shareCSV(name, csv);
  };

  const disabled = (filtered?.length ?? 0) === 0;

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 12,
        backgroundColor: colors.bg,
      }}
    >
      {/* Botão: Novo lançamento */}
      <Link href="/transactions/new" asChild>
        <Pressable
          style={{
            padding: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
          }}
        >
          <Text style={{ fontWeight: "600", color: colors.text }}>
            + Novo lançamento
          </Text>
        </Pressable>
      </Link>

      {/* Filtro de mês */}
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        <Pressable
          onPress={() => setSelectedMonth(null)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: selectedMonth === null ? colors.card : "transparent",
            opacity: selectedMonth === null ? 1 : 0.7,
          }}
        >
          <Text style={{ color: colors.text }}>Todos</Text>
        </Pressable>

        {months.map((m) => (
          <Pressable
            key={m}
            onPress={() => setSelectedMonth(m)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: selectedMonth === m ? colors.card : "transparent",
              opacity: selectedMonth === m ? 1 : 0.7,
            }}
          >
            <Text style={{ color: colors.text }}>{monthLabel(m)}</Text>
          </Pressable>
        ))}
      </View>

      {/* Resumo */}
      <View
        style={{
          padding: 14,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          gap: 6,
        }}
      >
        <Text style={{ fontWeight: "700", color: colors.text }}>
          Resumo {selectedMonth ? monthLabel(selectedMonth) : "geral"}
        </Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: colors.muted }}>Entradas</Text>
          <Text style={{ fontWeight: "700", color: colors.text }}>
            + {formatBRL(summary.income)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: colors.muted }}>Saídas</Text>
          <Text style={{ fontWeight: "700", color: colors.text }}>
            - {formatBRL(summary.expense)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: colors.muted }}>Saldo</Text>
          <Text style={{ fontWeight: "700", color: colors.text }}>
            {formatBRL(summary.balance)}
          </Text>
        </View>
      </View>

      {/* Exportar CSV */}
      <Pressable
        onPress={disabled ? undefined : onExportCSV}
        style={{
          padding: 14,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            color: colors.text,
          }}
        >
          Exportar CSV
        </Text>
      </Pressable>

      {isLoading ? (
        <Text style={{ color: colors.muted }}>Carregando...</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 14,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                gap: 6,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "700", color: colors.text }}>
                  {item.category}
                </Text>
                <Text style={{ fontWeight: "700", color: colors.text }}>
                  {item.type === "expense" ? "-" : "+"}{" "}
                  {formatBRL(item.amountCents)}
                </Text>
              </View>

              {!!item.description && (
                <Text style={{ color: colors.muted }}>{item.description}</Text>
              )}
              <Text style={{ color: colors.muted }}>{item.dateISO}</Text>

              <View style={{ flexDirection: "row", gap: 10, marginTop: 6 }}>
                <Link href={`/transactions/${item.id}`} asChild>
                  <Pressable
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: colors.border,
                      backgroundColor: "transparent",
                    }}
                  >
                    <Text style={{ color: colors.text }}>Editar</Text>
                  </Pressable>
                </Link>

                <Pressable
                  onPress={() => del.mutate(item.id)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: "transparent",
                  }}
                >
                  <Text style={{ color: colors.text }}>Excluir</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
