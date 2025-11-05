// Data access layer. Uses Prisma if available, otherwise falls back to in-memory db.
import { db } from "@/src/lib/mock-db";
import type { PrismaClient } from "@/src/generated/prisma";
let prisma: PrismaClient | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient: PC } = require("@/src/generated/prisma");
  prisma = new PC();
} catch (_) {
  prisma = null;
}

export async function listWorkspacesForUser(userId: string) {
  if (prisma) {
    const memberships = await prisma.workspaceMember.findMany({ where: { userId: userId } });
    const ids = memberships.map((m) => m.workspaceId);
    const items = await prisma.workspace.findMany({ where: { id: { in: ids } }, orderBy: { createdAt: "asc" } });
    return items;
  }
  return db.listWorkspaces().filter((w) => db.getWorkspaceRole(w.id, userId));
}

export async function createWorkspace(name: string, ownerId: string) {
  if (prisma) {
    const ws = await prisma.workspace.create({ data: { name } });
    await prisma.workspaceMember.create({ data: { workspaceId: ws.id, userId: ownerId, role: "OWNER" } });
    return ws;
  }
  return db.createWorkspace(name, ownerId);
}

export async function listProjectsForUser(userId: string) {
  if (prisma) {
    const pm = await prisma.projectMember.findMany({ where: { userId } });
    const ids = pm.map((m) => m.projectId);
    const items = await prisma.project.findMany({ where: { id: { in: ids } } });
    return items;
  }
  return db.listProjects().filter((p) => db.getProjectRole(p.id, userId));
}

export async function createProject(workspaceId: string, name: string, ownerId: string) {
  if (prisma) {
    const pr = await prisma.project.create({ data: { name, workspaceId } });
    await prisma.projectMember.create({ data: { projectId: pr.id, userId: ownerId, role: "OWNER" } });
    return pr;
  }
  return db.createProject(workspaceId, name, ownerId);
}

export async function listDocumentsForUser(userId: string) {
  if (prisma) {
    // Use membership via project membership for now (document membership optional)
    const pm = await prisma.projectMember.findMany({ where: { userId } });
    const projectIds = pm.map((m) => m.projectId);
    const items = await prisma.document.findMany({ where: { projectId: { in: projectIds } } });
    return items;
  }
  return db.listDocuments().filter((d) => db.getDocumentRole(d.id, userId));
}

export async function createDocument(projectId: string, name: string, slug: string, ownerId: string) {
  if (prisma) {
    const doc = await prisma.document.create({ data: { projectId, name, slug, data: {} } });
    // No dedicated document members table in schema; rely on project membership
    return doc;
  }
  return db.createDocument(projectId, name, slug, ownerId);
}

export async function listPages(documentId: string) {
  if (prisma) {
    const pages = await prisma.documentPage.findMany({ where: { documentId }, orderBy: { index: "asc" } });
    return pages.map((p) => ({ id: p.id, documentId: p.documentId, name: p.name, device: "desktop" as const, index: p.index, elements: (p.data as any)?.elements || [] }));
  }
  return db.listPages(documentId);
}

export async function createPage(documentId: string, name: string, device: "mobile"|"desktop") {
  if (prisma) {
    const count = await prisma.documentPage.count({ where: { documentId } });
    const created = await prisma.documentPage.create({ data: { documentId, name, index: count, data: { device, elements: [] } } });
    return { id: created.id, documentId, name, device, index: created.index, elements: [] };
  }
  return db.createPage(documentId, name, device);
}

export async function updatePage(pageId: string, patch: any) {
  if (prisma) {
    const existing = await prisma.documentPage.findUnique({ where: { id: pageId } });
    if (!existing) return null;
    const nextData = { ...(existing.data as any), ...(patch.elements ? { elements: patch.elements } : {}) };
    const updated = await prisma.documentPage.update({ where: { id: pageId }, data: { name: patch.name ?? existing.name, index: typeof patch.index === 'number' ? patch.index : existing.index, data: nextData } });
    return { id: updated.id, documentId: updated.documentId, name: updated.name, device: (updated.data as any)?.device || 'desktop', index: updated.index, elements: (updated.data as any)?.elements || [] };
  }
  return db.updatePage(pageId, patch);
}

export async function deletePage(pageId: string) {
  if (prisma) { await prisma.documentPage.delete({ where: { id: pageId } }); return true; }
  return db.deletePage(pageId);
}

export async function listFlow(documentId: string) {
  // No Prisma model yet: fallback
  return db.listFlow(documentId);
}

export async function addFlowEdge(documentId: string, edge: { source: { kind: 'page'|'element'; id: string }; targetPageId: string; label?: string }) {
  return db.addFlowEdge(documentId, edge);
}

export async function deleteFlowEdge(documentId: string, edgeId: string) {
  return db.deleteFlowEdge(documentId, edgeId);
}

export async function acquireLock(body: any) {
  if (prisma) {
    const lock = await prisma.lock.create({ data: { documentId: body.documentId, scope: body.scope, elementId: body.elementId, holderId: body.holderId || 'unknown', ttlSeconds: body.ttlSeconds || 30 } });
    return lock as any;
  }
  return db.acquireLock(body);
}
export async function refreshLock(lockId: string) {
  if (prisma) { await prisma.lock.update({ where: { id: lockId }, data: { updatedAt: new Date() } }); return true; }
  return db.refreshLock(lockId);
}
export async function releaseLock(lockId: string) {
  if (prisma) { await prisma.lock.delete({ where: { id: lockId } }); return true; }
  return db.releaseLock(lockId);
}
export async function listLocks(documentId: string) {
  if (prisma) { return prisma.lock.findMany({ where: { documentId } }); }
  return db.listLocks(documentId);
}


