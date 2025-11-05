// Data access layer. Currently proxies to in-memory db; can be swapped to Prisma later.
import { db } from "@/src/lib/mock-db";

export async function listWorkspacesForUser(userId: string) {
  return db.listWorkspaces().filter((w) => db.getWorkspaceRole(w.id, userId));
}

export async function createWorkspace(name: string, ownerId: string) {
  return db.createWorkspace(name, ownerId);
}

export async function listProjectsForUser(userId: string) {
  return db.listProjects().filter((p) => db.getProjectRole(p.id, userId));
}

export async function createProject(workspaceId: string, name: string, ownerId: string) {
  return db.createProject(workspaceId, name, ownerId);
}

export async function listDocumentsForUser(userId: string) {
  return db.listDocuments().filter((d) => db.getDocumentRole(d.id, userId));
}

export async function createDocument(projectId: string, name: string, slug: string, ownerId: string) {
  return db.createDocument(projectId, name, slug, ownerId);
}

export async function listPages(documentId: string) {
  return db.listPages(documentId);
}

export async function createPage(documentId: string, name: string, device: "mobile"|"desktop") {
  return db.createPage(documentId, name, device);
}

export async function updatePage(pageId: string, patch: any) {
  return db.updatePage(pageId, patch);
}

export async function deletePage(pageId: string) {
  return db.deletePage(pageId);
}

export async function listFlow(documentId: string) {
  return db.listFlow(documentId);
}

export async function addFlowEdge(documentId: string, edge: { source: { kind: 'page'|'element'; id: string }; targetPageId: string; label?: string }) {
  return db.addFlowEdge(documentId, edge);
}

export async function deleteFlowEdge(documentId: string, edgeId: string) {
  return db.deleteFlowEdge(documentId, edgeId);
}

export async function acquireLock(body: any) { return db.acquireLock(body); }
export async function refreshLock(lockId: string) { return db.refreshLock(lockId); }
export async function releaseLock(lockId: string) { return db.releaseLock(lockId); }
export async function listLocks(documentId: string) { return db.listLocks(documentId); }


