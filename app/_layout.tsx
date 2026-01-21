import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";
import { ThemeProvider } from "../src/theme/theme";

export default function RootLayout() {
  const [client] = useState(() => new QueryClient());

  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <Stack screenOptions={{ headerTitleAlign: "center" }}>
          <Stack.Screen name="index" options={{ title: "PocketBudget" }} />
          <Stack.Screen name="transactions/index" options={{ title: "Lançamentos" }} />
          <Stack.Screen name="transactions/new" options={{ title: "Novo lançamento" }} />
          <Stack.Screen name="transactions/[id]" options={{ title: "Editar" }} />
          <Stack.Screen name="settings" options={{ title: "Configurações" }} />
        </Stack>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
