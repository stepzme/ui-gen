"use client";

import { useState, useEffect, useRef } from 'react';
import { ComponentMetadata } from '@/hooks/use-component-metadata';
import { ComponentDocsConfig } from '@/lib/components/component-docs/types';

interface ComponentDataResponse {
  componentMetadata: ComponentMetadata[];
  docsConfig: ComponentDocsConfig;
}

interface UseComponentDataReturn {
  componentMetadata: ComponentMetadata[];
  docsConfig: ComponentDocsConfig;
  loading: boolean;
  error: string | null;
}

// Модульный уровень кэша для избежания дублирования запросов
let cachedData: ComponentDataResponse | null = null;
let loadingPromise: Promise<ComponentDataResponse> | null = null;
let subscribers: Set<() => void> = new Set();

/**
 * Общий хук для загрузки данных компонентов
 * Кэширует результат запроса и переиспользует его между компонентами
 */
export function useComponentData(): UseComponentDataReturn {
  const [data, setData] = useState<ComponentDataResponse | null>(cachedData);
  const [loading, setLoading] = useState<boolean>(!cachedData);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Если данные уже в кэше, используем их
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    // Если запрос уже выполняется, подписываемся на его результат
    if (loadingPromise) {
      loadingPromise
        .then((result) => {
          if (mountedRef.current) {
            setData(result);
            setLoading(false);
            setError(null);
          }
        })
        .catch((err) => {
          if (mountedRef.current) {
            setError(err instanceof Error ? err.message : 'Failed to load component data');
            setLoading(false);
          }
        });
      return;
    }

    // Запускаем новый запрос
    setLoading(true);
    setError(null);

    loadingPromise = fetch('/api')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch component data');
        }
        return response.json();
      })
      .then((result: ComponentDataResponse) => {
        cachedData = result;
        loadingPromise = null;
        
        // Уведомляем всех подписчиков
        subscribers.forEach((callback) => callback());
        
        return result;
      })
      .catch((err) => {
        loadingPromise = null;
        throw err;
      });

    loadingPromise
      .then((result) => {
        if (mountedRef.current) {
          setData(result);
          setLoading(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (mountedRef.current) {
          setError(err instanceof Error ? err.message : 'Failed to load component data');
          setLoading(false);
        }
      });

    // Функция подписки для обновления при изменении кэша
    const updateCallback = () => {
      if (mountedRef.current && cachedData) {
        setData(cachedData);
        setLoading(false);
        setError(null);
      }
    };

    subscribers.add(updateCallback);

    return () => {
      mountedRef.current = false;
      subscribers.delete(updateCallback);
    };
  }, []);

  return {
    componentMetadata: data?.componentMetadata ?? [],
    docsConfig: data?.docsConfig ?? {},
    loading,
    error,
  };
}

