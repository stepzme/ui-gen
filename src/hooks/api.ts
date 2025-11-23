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

export function useRecentDocuments(workspaceId: string | undefined, limit: number = 16, offset: number = 0) {
  return useQuery({
    queryKey: ["recent", workspaceId, limit, offset],
    queryFn: () => jsonFetch(`/api/workspaces/${workspaceId}/recent?limit=${limit}&offset=${offset}`),
    enabled: !!workspaceId,
  });
}

export function useWorkspaceProjects(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ["workspace-projects", workspaceId],
    queryFn: () => jsonFetch(`/api/workspaces/${workspaceId}/projects`),
    enabled: !!workspaceId,
  });
}

export function usePersonalProject(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ["personal-project", workspaceId],
    queryFn: () => jsonFetch(`/api/workspaces/${workspaceId}/personal-project`),
    enabled: !!workspaceId,
  });
}

export function useProjectDocuments(projectId: string | undefined) {
  return useQuery({
    queryKey: ["project-documents", projectId],
    queryFn: () => jsonFetch(`/api/projects/${projectId}/documents`),
    enabled: !!projectId,
  });
}

export function useCreateWorkspace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { name: string }) => {
      const res = await jsonFetch(`/api/workspaces`, { method: "POST", body: JSON.stringify(body) });
      return res;
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
}

export function useProjects(options?: UseQueryOptions<{ items: any[] }>) {
  return useQuery({ queryKey: ["projects"], queryFn: () => jsonFetch("/api/projects"), ...(options || {}) });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { workspaceId: string; name: string }) => {
      const res = await jsonFetch(`/api/projects`, { method: "POST", body: JSON.stringify(body) });
      return res;
    },
    onSuccess: async (data, variables) => {
      await qc.invalidateQueries({ queryKey: ["projects"] });
      await qc.invalidateQueries({ queryKey: ["workspaces"] });
      await qc.invalidateQueries({ queryKey: ["workspace-projects", variables.workspaceId] });
    },
  });
}

export function useDocuments(options?: UseQueryOptions<{ items: any[] }>) {
  return useQuery({ queryKey: ["documents"], queryFn: () => jsonFetch("/api/documents"), ...(options || {}) });
}

export function useDocument(documentId: string | undefined) {
  return useQuery({
    queryKey: ["document", documentId],
    queryFn: () => jsonFetch(`/api/documents/${documentId}`),
    enabled: !!documentId,
  });
}

export function useCreateDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { projectId: string; name: string; slug: string }) => {
      const res = await jsonFetch(`/api/documents`, { method: "POST", body: JSON.stringify(body) });
      return res;
    },
    onSuccess: async (data, variables) => {
      await qc.invalidateQueries({ queryKey: ["documents"] });
      await qc.invalidateQueries({ queryKey: ["projects"] });
      await qc.invalidateQueries({ queryKey: ["project-documents", variables.projectId] });
      await qc.invalidateQueries({ queryKey: ["recent"] });
      await qc.invalidateQueries({ queryKey: ["personal-project"] });
    },
  });
}

export function useMoveDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ documentId, projectId }: { documentId: string; projectId: string }) => {
      const res = await jsonFetch(`/api/documents/${documentId}`, { 
        method: "PATCH", 
        body: JSON.stringify({ projectId }) 
      });
      return res;
    },
    onSuccess: async (data, variables) => {
      await qc.invalidateQueries({ queryKey: ["documents"] });
      await qc.invalidateQueries({ queryKey: ["project-documents"] });
      await qc.invalidateQueries({ queryKey: ["recent"] });
      await qc.invalidateQueries({ queryKey: ["personal-project"] });
    },
  });
}

export function useSearch(workspaceId?: string, q?: string, options?: UseQueryOptions<{ projects: any[]; documents: any[] }>) {
  return useQuery({
    queryKey: ["search", workspaceId, q],
    queryFn: () => jsonFetch(`/api/search?${new URLSearchParams({ workspaceId: workspaceId || "", q: q || "" })}`),
    enabled: typeof q === "string" && q.length > 0,
    ...(options || {}),
  });
}

// Flow edges
export function useFlow(documentId: string | undefined, options?: UseQueryOptions<{ documentId: string; edges: any[] }>) {
  return useQuery({ queryKey: ["flow", documentId], queryFn: () => jsonFetch(`/api/documents/${documentId}/flow`), enabled: !!documentId, ...(options || {}) });
}

export function useAddFlowEdge(documentId: string | undefined) {
  return useMutation({
    mutationFn: (body: { source: { kind: "page"|"element"; id: string }; targetPageId: string; label?: string }) =>
      jsonFetch(`/api/documents/${documentId}/flow`, { method: "POST", body: JSON.stringify(body) }),
  });
}

export function useDeleteFlowEdge(documentId: string | undefined, edgeId: string | undefined) {
  return useMutation({
    mutationFn: async (id?: string) => {
      const targetId = id || edgeId;
      if (!targetId) throw new Error("Edge ID required");
      return jsonFetch(`/api/documents/${documentId}/flow/${targetId}`, { method: "DELETE" });
    },
  });
}

export function useLocks(documentId: string | undefined, options?: UseQueryOptions<{ items: any[] }>) {
  return useQuery({ queryKey: ["locks", documentId], queryFn: () => jsonFetch(`/api/locks?${new URLSearchParams({ documentId: documentId || "" })}`), enabled: !!documentId, ...(options || {}) });
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

export function useUpdatePage(documentId: string | undefined, pageId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { name?: string; device?: "mobile" | "desktop"; index?: number; elements?: any[]; position?: { x: number; y: number } }) =>
      jsonFetch(`/api/documents/${documentId}/pages/${pageId}`, { method: "PATCH", body: JSON.stringify(body) }),
    onSuccess: (updated) => {
      if (!documentId) return;
      qc.setQueryData<{ documentId: string; items: any[] }>(["document-pages", documentId], (prev) => {
        if (!prev) return prev;
        return { ...prev, items: prev.items.map((p) => (p.id === pageId ? { ...p, ...updated } : p)) } as any;
      });
    },
  });
}

export function useUpdatePagePosition(documentId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ pageId, position }: { pageId: string; position: { x: number; y: number } }) =>
      jsonFetch(`/api/documents/${documentId}/pages/${pageId}`, { method: "PATCH", body: JSON.stringify({ position }) }),
    onSuccess: (updated, variables) => {
      if (!documentId) return;
      qc.setQueryData<{ documentId: string; items: any[] }>(["document-pages", documentId], (prev) => {
        if (!prev) return prev;
        return { ...prev, items: prev.items.map((p) => (p.id === variables.pageId ? { ...p, data: { ...(p.data as any || {}), position: variables.position } } : p)) } as any;
      });
    },
  });
}

export function useDeletePage(documentId: string | undefined, pageId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => jsonFetch(`/api/documents/${documentId}/pages/${pageId}`, { method: "DELETE" }),
    onSuccess: () => {
      if (!documentId) return;
      qc.setQueryData<{ documentId: string; items: any[] }>(["document-pages", documentId], (prev) => {
        if (!prev) return prev;
        return { ...prev, items: prev.items.filter((p) => p.id !== pageId) } as any;
      });
    },
  });
}

