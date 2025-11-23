"use client";

import { useTheme } from "@/hooks/use-theme";

/**
 * ThemeProvider инициализирует тему приложения
 * Просто вызывает useTheme для инициализации
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useTheme();
  return <>{children}</>;
}




