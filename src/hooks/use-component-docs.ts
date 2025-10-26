"use client";

import { useState, useEffect } from 'react';
import { ComponentDocsConfig } from '@/lib/component-docs/types';

interface UseComponentDocsReturn {
  docsConfig: ComponentDocsConfig;
  loading: boolean;
  error: string | null;
}

/**
 * Хук для работы с документацией компонентов
 * Генерирует документацию из docs.md файлов
 */
export function useComponentDocs(): UseComponentDocsReturn {
  const [docsConfig, setDocsConfig] = useState<ComponentDocsConfig>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
         async function loadComponentDocs() {
           try {
             setLoading(true);
             setError(null);

             // Загружаем документацию через объединенный API
             const response = await fetch('/api/components');
             if (!response.ok) {
               throw new Error('Failed to fetch component data');
             }

             const { docsConfig } = await response.json();
             setDocsConfig(docsConfig);
      } catch (err) {
        console.error('Error loading component docs:', err);
        setError(err instanceof Error ? err.message : 'Failed to load component documentation');
      } finally {
        setLoading(false);
      }
    }

    loadComponentDocs();
  }, []);

  return {
    docsConfig,
    loading,
    error
  };
}

