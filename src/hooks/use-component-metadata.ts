"use client";

import { useComponentData } from './use-component-data';

export interface ComponentMetadata {
  id: string;
  name: string;
  category: string;
}

interface UseComponentMetadataReturn {
  componentMetadata: ComponentMetadata[];
  loading: boolean;
  error: string | null;
}

/**
 * Хук для получения метаданных компонентов с категориями
 * Использует общий кэш данных компонентов
 */
export function useComponentMetadata(): UseComponentMetadataReturn {
  const { componentMetadata, loading, error } = useComponentData();

  return {
    componentMetadata,
    loading,
    error
  };
}
