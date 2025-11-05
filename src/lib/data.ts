// Data access layer. Uses Prisma if available, otherwise falls back to in-memory db.
import { db } from "@/lib/mock-db";
import type { PrismaClient } from "@/generated/prisma";
let prisma: PrismaClient | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient: PC } = require("@/generated/prisma");
  prisma = new PC();
} catch (_) {
  prisma = null;
}

export async function getWorkspaceRole(workspaceId: string, userId: string): Promise<'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'|null> {
  if (prisma) {
    const m = await prisma.workspaceMember.findUnique({ where: { workspaceId_userId: { workspaceId, userId } } });
    return (m?.role as any) || null;
  }
  const map = (db as any).workspaceMembers.get(workspaceId) as Map<string, any> | undefined;
  if (!map) return null;
  return (map.get(userId) as any) || null;
}

export async function getProjectRole(projectId: string, userId: string): Promise<'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'|null> {
  if (prisma) {
    const m = await prisma.projectMember.findUnique({ where: { projectId_userId: { projectId, userId } } });
    if (m?.role) return m.role as any;
    const pr = await prisma.project.findUnique({ where: { id: projectId } });
    if (!pr) return null;
    const wr = await prisma.workspaceMember.findUnique({ where: { workspaceId_userId: { workspaceId: pr.workspaceId, userId } } });
    return (wr?.role as any) || null;
  }
  return (db as any).getProjectRole(projectId, userId);
}

export async function getDocumentRole(documentId: string, userId: string): Promise<'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'|null> {
  if (prisma) {
    const doc = await prisma.document.findUnique({ where: { id: documentId } });
    if (!doc) return null;
    const pr = await prisma.projectMember.findUnique({ where: { projectId_userId: { projectId: doc.projectId, userId } } });
    if (pr?.role) return pr.role as any;
    const proj = await prisma.project.findUnique({ where: { id: doc.projectId } });
    if (!proj) return null;
    const wr = await prisma.workspaceMember.findUnique({ where: { workspaceId_userId: { workspaceId: proj.workspaceId, userId } } });
    return (wr?.role as any) || null;
  }
  return (db as any).getDocumentRole(documentId, userId);
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

// Members
export async function listWorkspaceMembers(workspaceId: string) {
  if (prisma) {
    const items = await prisma.workspaceMember.findMany({ where: { workspaceId } });
    return items.map((m) => ({ userId: m.userId, role: m.role }));
  }
  return Array.from((db as any).workspaceMembers.get(workspaceId)?.entries() || []).map(([userId, role]: any) => ({ userId, role }));
}
export async function addWorkspaceMember(workspaceId: string, userId: string, role: 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER') {
  if (prisma) {
    await prisma.workspaceMember.upsert({
      where: { workspaceId_userId: { workspaceId, userId } },
      create: { workspaceId, userId, role },
      update: { role },
    });
    return { ok: true };
  }
  const map = (db as any).workspaceMembers.get(workspaceId) || new Map();
  map.set(userId, role);
  (db as any).workspaceMembers.set(workspaceId, map);
  return { ok: true };
}

export async function listProjectMembers(projectId: string) {
  if (prisma) {
    const items = await prisma.projectMember.findMany({ where: { projectId } });
    return items.map((m) => ({ userId: m.userId, role: m.role }));
  }
  return Array.from((db as any).projectMembers.get(projectId)?.entries() || []).map(([userId, role]: any) => ({ userId, role }));
}
export async function addProjectMember(projectId: string, userId: string, role: 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER') {
  if (prisma) {
    await prisma.projectMember.upsert({
      where: { projectId_userId: { projectId, userId } },
      create: { projectId, userId, role },
      update: { role },
    });
    return { ok: true };
  }
  const map = (db as any).projectMembers.get(projectId) || new Map();
  map.set(userId, role);
  (db as any).projectMembers.set(projectId, map);
  return { ok: true };
}

export async function listDocumentMembers(documentId: string) {
  if (prisma) {
    // No dedicated document members in schema; return empty for now or derive from project members
    return [];
  }
  return Array.from((db as any).documentMembers.get(documentId)?.entries() || []).map(([userId, role]: any) => ({ userId, role }));
}
export async function addDocumentMember(documentId: string, userId: string, role: 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER') {
  if (prisma) {
    // Not implemented without a table; noop
    return { ok: true };
  }
  const map = (db as any).documentMembers.get(documentId) || new Map();
  map.set(userId, role);
  (db as any).documentMembers.set(documentId, map);
  return { ok: true };
}

export async function addAudit(params: {
  actorId: string;
  entityType: 'WORKSPACE' | 'PROJECT' | 'DOCUMENT' | 'PAGE' | 'LOCK' | 'EXPORT';
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PERMISSION_CHANGE' | 'EXPORT';
  diff?: any;
}) {
  if (prisma) {
    await prisma.auditLog.create({
      data: {
        actorId: params.actorId,
        entityType: params.entityType,
        entityId: params.entityId,
        action: params.action,
        diff: params.diff || {},
      },
    });
    return { ok: true };
  }
  const logs = (db as any).auditLogs || [];
  logs.push({
    id: crypto.randomUUID(),
    actorId: params.actorId,
    entityType: params.entityType,
    entityId: params.entityId,
    action: params.action,
    diff: params.diff || {},
    createdAt: new Date(),
  });
  (db as any).auditLogs = logs;
  return { ok: true };
}

export async function listAudit(filters?: { entityType?: string; entityId?: string }) {
  if (prisma) {
    const where: any = {};
    if (filters?.entityType) where.entityType = filters.entityType;
    if (filters?.entityId) where.entityId = filters.entityId;
    const items = await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return items;
  }
  let logs = (db as any).auditLogs || [];
  if (filters?.entityType) logs = logs.filter((l: any) => l.entityType === filters.entityType);
  if (filters?.entityId) logs = logs.filter((l: any) => l.entityId === filters.entityId);
  return logs.slice(0, 100).sort((a: any, b: any) => b.createdAt - a.createdAt);
}


