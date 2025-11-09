"use client";

import { useState, useEffect } from 'react';
import { ComponentDefinition } from '@/types/page-builder';
import { getAllComponents } from '@/lib/components/component-registry';
import { useComponentMetadata, ComponentMetadata } from '@/hooks/use-component-metadata';

interface UseComponentDefinitionsReturn {
  componentDefinitions: ComponentDefinition[];
  loading: boolean;
  error: string | null;
}

/**
 * Хук для получения всех компонентов с правильными категориями из docs.md
 * Объединяет данные из API с компонентами из registry
 */
export function useComponentDefinitions(): UseComponentDefinitionsReturn {
  const { componentMetadata, loading: metadataLoading, error: metadataError } = useComponentMetadata();
  const [components, setComponents] = useState<ComponentDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!metadataLoading) {
      try {
        // Получаем компоненты с правильными категориями из API
        const componentsWithMetadata = getAllComponents(componentMetadata);
        setComponents(componentsWithMetadata);
        setError(null);
      } catch (err) {
        console.error('Error processing component definitions:', err);
        setError(err instanceof Error ? err.message : 'Failed to process component definitions');
      } finally {
        setLoading(false);
      }
    }
  }, [componentMetadata, metadataLoading]);

  // Если есть ошибка в метаданных, используем fallback
  useEffect(() => {
    if (metadataError && !loading) {
      console.warn('Using fallback categories due to metadata error:', metadataError);
      const fallbackComponents = getAllComponents(); // Без метаданных - использует fallback
      setComponents(fallbackComponents);
      setLoading(false);
    }
  }, [metadataError, loading]);

  return {
    componentDefinitions: components,
    loading: loading || metadataLoading,
    error: error || metadataError
  };
}