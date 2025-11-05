"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

async function jsonFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function useAcquireLock() {
  return useMutation({
    mutationFn: (body: { documentId: string; scope: "DOCUMENT" | "ELEMENT"; elementId?: string }) =>
      jsonFetch<{ id: string; ttlSeconds: number }>(`/api/locks`, { method: "POST", body: JSON.stringify(body) }),
  });
}

export function useRefreshLock() {
  return useMutation({
    mutationFn: (body: { lockId: string }) => jsonFetch(`/api/locks`, { method: "PATCH", body: JSON.stringify(body) }),
  });
}

export function useReleaseLock() {
  return useMutation({
    mutationFn: (body: { lockId: string }) => jsonFetch(`/api/locks`, { method: "DELETE", body: JSON.stringify(body) }),
  });
}

export function useLockHeartbeat(lockId: string | null, intervalMs = 10000) {
  const { mutate: refresh } = useRefreshLock();
  const idRef = useRef<string | null>(lockId);
  idRef.current = lockId;

  useEffect(() => {
    if (!idRef.current) return;
    const t = setInterval(() => {
      if (idRef.current) refresh({ lockId: idRef.current });
    }, intervalMs);
    return () => clearInterval(t);
  }, [intervalMs, refresh]);
}


