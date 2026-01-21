import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../src/theme/theme";

function CardButton({ label }: { label: string }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
      }}
    >
      <Text style={{ fontSize: 16, color: colors.text }}>{label}</Text>
    </View>
  );
}

export default function Home() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, padding: 16, gap: 12, backgroundColor: colors.bg }}>
      <Text style={{ fontSize: 26, fontWeight: "700", color: colors.text }}>
        PocketBudget
      </Text>

      <Text style={{ color: colors.muted }}>
        Controle simples de gastos (offline)
      </Text>

      <Link href="/transactions" asChild>
        <Pressable>
          <CardButton label="Ver lançamentos" />
        </Pressable>
      </Link>

      <Link href="/transactions/new" asChild>
        <Pressable>
          <CardButton label="Novo lançamento" />
        </Pressable>
      </Link>

      <Link href="/settings" asChild>
        <Pressable>
          <CardButton label="Configurações" />
        </Pressable>
      </Link>
    </View>
  );
}
