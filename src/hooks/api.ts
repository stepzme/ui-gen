import { useQuery, useMutation, UseQueryOptions, useQueryClient } from "@tanstack/react-query";

async function jsonFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function useWorkspaces(options?: UseQueryOptions<{ items: any[] }>) {
  return useQuery({ queryKey: ["workspaces"], queryFn: () => jsonFetch("/api/workspaces"), ...(options || {}) });
}

export function useProjects(options?: UseQueryOptions<{ items: any[] }>) {
  return useQuery({ queryKey: ["projects"], queryFn: () => jsonFetch("/api/projects"), ...(options || {}) });
}

export function useDocuments(options?: UseQueryOptions<{ items: any[] }>) {
  return useQuery({ queryKey: ["documents"], queryFn: () => jsonFetch("/api/documents"), ...(options || {}) });
}

export function useDocumentPages(documentId: string | undefined, options?: UseQueryOptions<{ documentId: string; items: any[] }>) {
  return useQuery({ queryKey: ["document-pages", documentId], queryFn: () => jsonFetch(`/api/documents/${documentId}/pages`), enabled: !!documentId, ...(options || {}) });
}

export function useCreatePage(documentId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { name: string; device: "mobile" | "desktop" }) =>
      jsonFetch(`/api/documents/${documentId}/pages`, { method: "POST", body: JSON.stringify(body) }),
    onSuccess: (created) => {
      if (!documentId) return;
      qc.setQueryData<{ documentId: string; items: any[] }>(["document-pages", documentId], (prev) => {
        if (!prev) return { documentId, items: [created] } as any;
        return { ...prev, items: [...prev.items, created] } as any;
      });
    },
  });
}


