"use client";

import { useComponentData } from './use-component-data';
import { ComponentDocsConfig } from '@/lib/components/component-docs/types';

interface UseComponentDocsReturn {
  docsConfig: ComponentDocsConfig;
  loading: boolean;
  error: string | null;
}

/**
 * Хук для работы с документацией компонентов
 * Использует общий кэш данных компонентов
 */
export function useComponentDocs(): UseComponentDocsReturn {
  const { docsConfig, loading, error } = useComponentData();

  return {
    docsConfig,
    loading,
    error
  };
}
