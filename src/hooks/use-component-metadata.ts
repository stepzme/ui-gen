"use client";

import { useState, useEffect } from 'react';

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
 * Использует данные из docs.md файлов через API
 */
export function useComponentMetadata(): UseComponentMetadataReturn {
  const [componentMetadata, setComponentMetadata] = useState<ComponentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadComponentMetadata() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/components');
        if (!response.ok) {
          throw new Error('Failed to fetch component metadata');
        }

        const { componentMetadata } = await response.json();
        setComponentMetadata(componentMetadata);
      } catch (err) {
        console.error('Error loading component metadata:', err);
        setError(err instanceof Error ? err.message : 'Failed to load component metadata');
      } finally {
        setLoading(false);
      }
    }

    loadComponentMetadata();
  }, []);

  return {
    componentMetadata,
    loading,
    error
  };
}
