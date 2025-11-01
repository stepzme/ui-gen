"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Хук для работы с темой приложения
 * Управляет темной/светлой темой с сохранением в localStorage
 * и синхронизацией с системными настройками
 */
export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Инициализация темы при монтировании
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Приоритет: сохраненная настройка > системная настройка
    const shouldBeDark = stored ? stored === 'dark' : prefersDark;
    
    if (shouldBeDark) {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
    }
    
    setIsInitialized(true);
  }, []);

  // Переключение темы
  const toggleTheme = useCallback(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const nextDark = !root.classList.contains('dark');
    
    root.classList.toggle('dark', nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    setIsDark(nextDark);
  }, []);

  // Установка конкретной темы
  const setTheme = useCallback((theme: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const isDarkTheme = theme === 'dark';
    
    if (isDarkTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
    setIsDark(isDarkTheme);
  }, []);

  return {
    isDark,
    isInitialized,
    toggleTheme,
    setTheme,
  };
}

