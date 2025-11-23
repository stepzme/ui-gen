"use client";

import { useEffect, useState } from "react";

/**
 * Простой хук для переключения темы (как в shadcn/ui)
 * Просто переключает класс `dark` на `html` элементе
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Проверяем сохраненную тему или системную настройку
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains('dark');
    
    if (isCurrentlyDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return { isDark, toggleTheme };
}

