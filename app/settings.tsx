import { Pressable, Text, View } from "react-native";
import { useTheme } from "../src/theme/theme";

function Option({
  label,
  active,
  onPress,
  border,
  text,
  card,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  border: string;
  text: string;
  card: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: border,
        backgroundColor: active ? card : "transparent",
        opacity: active ? 1 : 0.75,
      }}
    >
      <Text style={{ color: text, fontWeight: "700", textAlign: "center" }}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function Settings() {
  const { mode, setMode, colors } = useTheme();

  return (
    <View style={{ flex: 1, padding: 16, gap: 12, backgroundColor: colors.bg }}>
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: "800" }}>
        Tema
      </Text>
      <Text style={{ color: colors.muted }}>
        Escolha como o app deve se comportar.
      </Text>

      <Option
        label="Sistema"
        active={mode === "system"}
        onPress={() => setMode("system")}
        border={colors.border}
        text={colors.text}
        card={colors.card}
      />
      <Option
        label="Claro"
        active={mode === "light"}
        onPress={() => setMode("light")}
        border={colors.border}
        text={colors.text}
        card={colors.card}
      />
      <Option
        label="Escuro"
        active={mode === "dark"}
        onPress={() => setMode("dark")}
        border={colors.border}
        text={colors.text}
        card={colors.card}
      />
    </View>
  );
}
