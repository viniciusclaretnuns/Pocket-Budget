import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

type ThemeMode = "system" | "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  isDark: boolean;
  colors: {
    bg: string;
    card: string;
    text: string;
    muted: string;
    border: string;
  };
};

const KEY = "@pocketbudget/themeMode";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme(); // "light" | "dark" | null
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(KEY);
      if (saved === "light" || saved === "dark" || saved === "system") {
        setModeState(saved);
      }
      setLoaded(true);
    })();
  }, []);

  const setMode = async (m: ThemeMode) => {
    setModeState(m);
    await AsyncStorage.setItem(KEY, m);
  };

  const isDark = mode === "system" ? system === "dark" : mode === "dark";

  const colors = useMemo(() => {
    return isDark
      ? {
          bg: "#0B0F19",
          card: "#121A2A",
          text: "#E8EEF9",
          muted: "#A7B3C7",
          border: "#22304A",
        }
      : {
          bg: "#FFFFFF",
          card: "#F6F8FC",
          text: "#0B1220",
          muted: "#5B6B84",
          border: "#D6DEEB",
        };
  }, [isDark]);

  // evita “piscar” tema ao carregar
  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
