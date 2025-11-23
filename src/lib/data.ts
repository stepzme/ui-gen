// Data access layer. Uses Prisma for database operations.
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export async function getWorkspaceRole(workspaceId: string, userId: string): Promise<'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'|null> {
  const m = await prisma.workspaceMember.findUnique({ where: { workspaceId_userId: { workspaceId, userId } } });
  return (m?.role as 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER') || null;
}

export async function getProjectRole(projectId: string, userId: string): Promise<'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'|null> {
  const m = await prisma.projectMember.findUnique({ where: { projectId_userId: { projectId, userId } } });
  if (m?.role) return m.role as 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER';
  const pr = await prisma.project.findUnique({ where: { id: projectId } });
  if (!pr) return null;
  const wr = await prisma.workspaceMember.findUnique({ where: { workspaceId_userId: { workspaceId: pr.workspaceId, userId } } });
  return (wr?.role as 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER') || null;
}

export async function getDocumentRole(documentId: string, userId: string): Promise<'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'|null> {
  const doc = await prisma.document.findUnique({ where: { id: documentId } });
  if (!doc) return null;
  const pr = await prisma.projectMember.findUnique({ where: { projectId_userId: { projectId: doc.projectId, userId } } });
  if (pr?.role) return pr.role as 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER';
  const proj = await prisma.project.findUnique({ where: { id: doc.projectId } });
  if (!proj) return null;
  const wr = await prisma.workspaceMember.findUnique({ where: { workspaceId_userId: { workspaceId: proj.workspaceId, userId } } });
  return (wr?.role as 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER') || null;
}

export async function listWorkspacesForUser(userId: string) {
  const memberships = await prisma.workspaceMember.findMany({ where: { userId: userId } });
  const ids = memberships.map((m) => m.workspaceId);
  const items = await prisma.workspace.findMany({ 
    where: { id: { in: ids } }, 
    orderBy: { createdAt: "asc" },
    include: {
      _count: { select: { projects: true } }
    }
  });
  return items.map((ws) => ({
    id: ws.id,
    name: ws.name,
    createdAt: ws.createdAt,
    updatedAt: ws.updatedAt,
    projectCount: ws._count.projects
  }));
}

export async function createWorkspace(name: string, ownerId: string) {
  const ws = await prisma.workspace.create({ data: { name } });
  await prisma.workspaceMember.create({ data: { workspaceId: ws.id, userId: ownerId, role: "OWNER" } });
  // Create personal project for the owner
  await getPersonalProject(ws.id, ownerId);
  return ws;
}

export async function listProjectsForUser(userId: string) {
  const pm = await prisma.projectMember.findMany({ where: { userId } });
  const ids = pm.map((m) => m.projectId);
  const items = await prisma.project.findMany({ 
    where: { 
      id: { in: ids },
      isPersonal: false // Exclude personal projects from regular list
    } 
  });
  return items;
}

// Get or create personal project for a user in a workspace
export async function getPersonalProject(workspaceId: string, userId: string) {
  // Check if user is a member of the workspace
  const workspaceMember = await prisma.workspaceMember.findUnique({
    where: { workspaceId_userId: { workspaceId, userId } }
  });
  if (!workspaceMember) {
    throw new Error("User is not a member of this workspace");
  }

  // Try to find existing personal project
  const existingPersonalProjects = await prisma.project.findMany({
    where: {
      workspaceId,
      isPersonal: true,
      members: {
        some: {
          userId,
          role: 'OWNER'
        }
      }
    }
  });

  if (existingPersonalProjects.length > 0) {
    return existingPersonalProjects[0];
  }

  // Create new personal project
  const personalProject = await prisma.project.create({
    data: {
      workspaceId,
      name: 'Drafts',
      isPersonal: true
    }
  });

  // Add user as OWNER
  await prisma.projectMember.create({
    data: {
      projectId: personalProject.id,
      userId,
      role: 'OWNER'
    }
  });

  return personalProject;
}

export async function createProject(workspaceId: string, name: string, ownerId: string) {
  const pr = await prisma.project.create({ data: { name, workspaceId } });
  await prisma.projectMember.create({ data: { projectId: pr.id, userId: ownerId, role: "OWNER" } });
  return pr;
}

export async function listDocumentsForUser(userId: string) {
  // Use membership via project membership for now (document membership optional)
  const pm = await prisma.projectMember.findMany({ where: { userId } });
  const projectIds = pm.map((m) => m.projectId);
  const items = await prisma.document.findMany({ where: { projectId: { in: projectIds } } });
  return items;
}

export async function createDocument(projectId: string, name: string, slug: string, ownerId: string) {
  const doc = await prisma.document.create({ data: { projectId, name, slug, data: {} } });
  // No dedicated document members table in schema; rely on project membership
  return doc;
}

export async function listPages(documentId: string) {
  const pages = await prisma.documentPage.findMany({ where: { documentId }, orderBy: { index: "asc" } });
  return pages.map((p) => ({ 
    id: p.id, 
    documentId: p.documentId, 
    name: p.name, 
    device: ((p.data as any)?.device || "desktop") as "mobile"|"desktop", 
    index: p.index, 
    elements: ((p.data as any)?.elements || []) as any[]
  }));
}

export async function createPage(documentId: string, name: string, device: "mobile"|"desktop") {
  const count = await prisma.documentPage.count({ where: { documentId } });
  const created = await prisma.documentPage.create({ 
    data: { 
      documentId, 
      name, 
      index: count, 
      data: { device, elements: [] } 
    } 
  });
  return { id: created.id, documentId, name, device, index: created.index, elements: [] };
}

export async function updatePage(pageId: string, patch: { name?: string; device?: "mobile"|"desktop"; index?: number; elements?: any[]; position?: { x: number; y: number } }) {
  const existing = await prisma.documentPage.findUnique({ where: { id: pageId } });
  if (!existing) return null;
  const existingData = (existing.data as any) || {};
  const nextData = { 
    ...existingData, 
    ...(patch.device ? { device: patch.device } : {}),
    ...(patch.elements !== undefined ? { elements: patch.elements } : {}),
    ...(patch.position ? { position: patch.position } : {})
  };
  const updated = await prisma.documentPage.update({ 
    where: { id: pageId }, 
    data: { 
      name: patch.name ?? existing.name, 
      index: typeof patch.index === 'number' ? patch.index : existing.index, 
      data: nextData 
    } 
  });
  return { 
    id: updated.id, 
    documentId: updated.documentId, 
    name: updated.name, 
    device: ((updated.data as any)?.device || 'desktop') as "mobile"|"desktop", 
    index: updated.index, 
    elements: ((updated.data as any)?.elements || []) as any[]
  };
}

export async function deletePage(pageId: string) {
  await prisma.documentPage.delete({ where: { id: pageId } });
  return true;
}

// Flow edges stored in document.data.flow.edges
export async function listFlow(documentId: string) {
  const doc = await prisma.document.findUnique({ where: { id: documentId } });
  if (!doc) return [];
  const data = (doc.data as any) || {};
  return (data.flow?.edges || []) as any[];
}

export async function addFlowEdge(documentId: string, edge: { source: { kind: 'page'|'element'; id: string }; targetPageId: string; label?: string }) {
  const doc = await prisma.document.findUnique({ where: { id: documentId } });
  if (!doc) throw new Error("Document not found");
  const data = (doc.data as any) || {};
  const flow = data.flow || { edges: [] };
  const newEdge = { id: crypto.randomUUID(), ...edge };
  flow.edges = [...(flow.edges || []), newEdge];
  await prisma.document.update({ where: { id: documentId }, data: { data: { ...data, flow } } });
  return newEdge;
}

export async function deleteFlowEdge(documentId: string, edgeId: string) {
  const doc = await prisma.document.findUnique({ where: { id: documentId } });
  if (!doc) return false;
  const data = (doc.data as any) || {};
  const flow = data.flow || { edges: [] };
  flow.edges = (flow.edges || []).filter((e: any) => e.id !== edgeId);
  await prisma.document.update({ where: { id: documentId }, data: { data: { ...data, flow } } });
  return true;
}

export async function acquireLock(body: { documentId: string; scope: 'DOCUMENT'|'ELEMENT'; elementId?: string; holderId: string; ttlSeconds?: number }) {
  const lock = await prisma.lock.create({ 
    data: { 
      documentId: body.documentId, 
      scope: body.scope, 
      elementId: body.elementId, 
      holderId: body.holderId, 
      ttlSeconds: body.ttlSeconds || 30 
    } 
  });
  return lock;
}

export async function refreshLock(lockId: string) {
  await prisma.lock.update({ where: { id: lockId }, data: { updatedAt: new Date() } });
  return true;
}

export async function releaseLock(lockId: string) {
  await prisma.lock.delete({ where: { id: lockId } });
  return true;
}

export async function listLocks(documentId: string) {
  return prisma.lock.findMany({ where: { documentId } });
}

// Members
export async function listWorkspaceMembers(workspaceId: string) {
  const items = await prisma.workspaceMember.findMany({ where: { workspaceId } });
  return items.map((m) => ({ userId: m.userId, role: m.role }));
}

export async function addWorkspaceMember(workspaceId: string, userId: string, role: 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER') {
  await prisma.workspaceMember.upsert({
    where: { workspaceId_userId: { workspaceId, userId } },
    create: { workspaceId, userId, role },
    update: { role },
  });
  return { ok: true };
}

export async function listProjectMembers(projectId: string) {
  const items = await prisma.projectMember.findMany({ where: { projectId } });
  return items.map((m) => ({ userId: m.userId, role: m.role }));
}

export async function addProjectMember(projectId: string, userId: string, role: 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER') {
  await prisma.projectMember.upsert({
    where: { projectId_userId: { projectId, userId } },
    create: { projectId, userId, role },
    update: { role },
  });
  return { ok: true };
}

export async function listDocumentMembers(documentId: string) {
  // No dedicated document members in schema; return empty for now or derive from project members
  return [];
}

export async function addDocumentMember(documentId: string, userId: string, role: 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER') {
  // Not implemented without a table; noop
  return { ok: true };
}

export async function addAudit(params: {
  actorId: string;
  entityType: 'WORKSPACE' | 'PROJECT' | 'DOCUMENT' | 'PAGE' | 'LOCK' | 'EXPORT';
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PERMISSION_CHANGE' | 'EXPORT' | 'AUTH_LOGIN' | 'AUTH_LOGOUT' | 'PERMISSIONS_CHANGED' | 'DOCUMENT_CREATED' | 'DOCUMENT_UPDATED' | 'DOCUMENT_TRASHED' | 'DOCUMENT_RESTORED' | 'LOCK_ACQUIRE' | 'LOCK_RELEASE' | 'EXPORT_REQUESTED' | 'EXPORT_COMPLETED';
  diff?: any;
}) {
  await prisma.auditLog.create({
    data: {
      actorId: params.actorId,
      entityType: params.entityType,
      entityId: params.entityId,
      action: params.action as any, // Type assertion needed due to enum mismatch
      diff: params.diff || {},
    },
  });
  return { ok: true };
}

export async function listAudit(filters?: { entityType?: string; entityId?: string }) {
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

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserOrCreateByEmail(email: string, password: string, name?: string) {
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email, password, name } });
  }
  return user;
}

export async function verifyUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) return null;
  return user;
}

// Recent documents
export async function trackDocumentView(userId: string, documentId: string) {
  await prisma.userDocumentView.upsert({
    where: { userId_documentId: { userId, documentId } },
    create: { userId, documentId, lastViewedAt: new Date(), lastEditedAt: new Date() },
    update: { lastViewedAt: new Date() },
  });
}

export async function trackDocumentEdit(userId: string, documentId: string) {
  await prisma.userDocumentView.upsert({
    where: { userId_documentId: { userId, documentId } },
    create: { userId, documentId, lastViewedAt: new Date(), lastEditedAt: new Date() },
    update: { lastEditedAt: new Date(), lastViewedAt: new Date() },
  });
}

export async function getRecentDocuments(userId: string, workspaceId: string, limit: number = 16, offset: number = 0) {
  // Get all documents in workspace first
  const workspaceDocuments = await prisma.document.findMany({
    where: {
      project: { workspaceId },
    },
    select: { id: true },
  });
  
  const documentIds = workspaceDocuments.map(d => d.id);
  
  if (documentIds.length === 0) {
    return [];
  }
  
  // Get recent views for these documents
  const views = await prisma.userDocumentView.findMany({
    where: {
      userId,
      documentId: { in: documentIds },
    },
    orderBy: { lastEditedAt: 'desc' },
    take: limit + offset,
    skip: offset,
    include: {
      document: {
        include: {
          project: {
            select: {
              id: true,
              name: true,
              workspaceId: true,
            },
          },
        },
      },
    },
  });
  
  // Map to response format
  return views.slice(0, limit).map(v => ({
    id: v.document.id,
    name: v.document.name,
    slug: v.document.slug,
    projectId: v.document.projectId,
    projectName: v.document.project.name,
    lastEditedAt: v.lastEditedAt,
    updatedAt: v.document.updatedAt,
  }));
}

export async function getWorkspaceProjects(workspaceId: string, userId: string) {
  // First, get all projects in the workspace (excluding personal projects)
  const workspaceProjects = await prisma.project.findMany({
    where: { 
      workspaceId,
      isPersonal: false // Exclude personal projects
    },
    include: {
      _count: { select: { documents: true } },
      members: {
        where: { role: 'OWNER' },
        include: { user: true },
        take: 1,
      },
    },
  });
  
  // Then check which ones the user is a member of
  const projectIds = workspaceProjects.map(p => p.id);
  const userMemberships = await prisma.projectMember.findMany({
    where: {
      userId,
      projectId: { in: projectIds },
    },
    select: { projectId: true },
  });
  
  const userProjectIds = new Set(userMemberships.map(m => m.projectId));
  
  // Filter and map projects
  return workspaceProjects
    .filter(p => userProjectIds.has(p.id))
    .map(p => ({
      id: p.id,
      name: p.name,
      workspaceId: p.workspaceId,
      documentCount: p._count.documents,
      owner: p.members[0]?.user?.name || 'Unknown',
      createdAt: p.createdAt,
    }));
}

// Move document to another project (only if user is OWNER of the document)
export async function moveDocument(documentId: string, targetProjectId: string, userId: string) {
  // Get document
  const document = await prisma.document.findUnique({
    where: { id: documentId }
  });

  if (!document) {
    throw new Error("Document not found");
  }

  // Check if user is OWNER of the document's project
  const userRole = await getProjectRole(document.projectId, userId);
  if (userRole !== 'OWNER') {
    throw new Error("Only project OWNER can move documents");
  }

  // Verify target project exists and user has access
  const targetProject = await prisma.project.findUnique({
    where: { id: targetProjectId },
    include: {
      members: {
        where: { userId }
      }
    }
  });

  if (!targetProject) {
    throw new Error("Target project not found");
  }

  // Check if user has access to target project (at least VIEWER)
  if (targetProject.members.length === 0) {
    // Check workspace membership
    const workspaceMember = await prisma.workspaceMember.findUnique({
      where: { workspaceId_userId: { workspaceId: targetProject.workspaceId, userId } }
    });
    if (!workspaceMember) {
      throw new Error("No access to target project");
    }
  }

  // Move document
  const updated = await prisma.document.update({
    where: { id: documentId },
    data: { projectId: targetProjectId }
  });

  return updated;
}
