import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { useCreateTransaction } from "../../src/features/transactions/queries";
import {
  TransactionFormData,
  transactionSchema,
} from "../../src/features/transactions/schema";
import { Transaction } from "../../src/features/transactions/types";
import { useTheme } from "../../src/theme/theme";
import { amountToCents } from "../../src/utils/money";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const { colors } = useTheme();

  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontWeight: "600", color: colors.text }}>{label}</Text>
      {children}
      {!!error && <Text style={{ color: "#ff6b6b" }}>{error}</Text>}
    </View>
  );
}

export default function NewTransaction() {
  const { colors } = useTheme();
  const create = useCreateTransaction();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      amount: "",
      category: "",
      description: "",
    },
  });

  const type = watch("type");

  const onSubmit = (data: TransactionFormData) => {
    const now = new Date();
    const tx: Transaction = {
      id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      type: data.type,
      amountCents: amountToCents(data.amount),
      category: data.category.trim(),
      description: data.description?.trim() || undefined,
      dateISO: now.toISOString().slice(0, 10),
      createdAtISO: now.toISOString(),
      updatedAtISO: now.toISOString(),
    };

    create.mutate(tx, {
      onSuccess: () => router.replace("/transactions"),
    });
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 14,
        backgroundColor: colors.bg,
      }}
    >
      {/* Tipo */}
      <Field label="Tipo" error={errors.type?.message}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            onPress={() => setValue("type", "expense")}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: type === "expense" ? colors.card : "transparent",
              opacity: type === "expense" ? 1 : 0.7,
            }}
          >
            <Text style={{ textAlign: "center", color: colors.text }}>
              Saída
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setValue("type", "income")}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: type === "income" ? colors.card : "transparent",
              opacity: type === "income" ? 1 : 0.7,
            }}
          >
            <Text style={{ textAlign: "center", color: colors.text }}>
              Entrada
            </Text>
          </Pressable>
        </View>
      </Field>

      {/* Valor */}
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <Field label="Valor (ex: 10,50)" error={errors.amount?.message}>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="0,00"
              placeholderTextColor={colors.muted}
              keyboardType="decimal-pad"
              style={{
                padding: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                color: colors.text,
              }}
            />
          </Field>
        )}
      />

      {/* Categoria */}
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <Field label="Categoria" error={errors.category?.message}>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Ex: Mercado"
              placeholderTextColor={colors.muted}
              style={{
                padding: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                color: colors.text,
              }}
            />
          </Field>
        )}
      />

      {/* Descrição */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <Field label="Descrição (opcional)" error={errors.description?.message}>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Ex: Compra da semana"
              placeholderTextColor={colors.muted}
              style={{
                padding: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                color: colors.text,
              }}
            />
          </Field>
        )}
      />

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={create.isPending}
        style={{
          marginTop: 8,
          padding: 14,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          opacity: create.isPending ? 0.6 : 1,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "700", color: colors.text }}>
          {create.isPending ? "Salvando..." : "Salvar"}
        </Text>
      </Pressable>
    </View>
  );
}
