"use client";

import { useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isInitialized } = useTheme();

  // Используем useEffect для применения стилей body после инициализации темы
  useEffect(() => {
    if (!isInitialized) return;
    
    // Применяем стили body на основе токенов
    document.body.style.backgroundColor = 'var(--colors-background0-primary)';
    document.body.style.color = 'var(--colors-text-primary)';
  }, [isInitialized]);

  return <>{children}</>;
}




