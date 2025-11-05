// Simple in-memory store for local testing without a DB. Not for production use.

type ID = string;

export interface User { id: ID; email: string; password: string; name?: string; createdAt: number }
export interface Workspace { id: ID; name: string; ownerId: ID; createdAt: number }
export interface Project { id: ID; workspaceId: ID; name: string; ownerId: ID; createdAt: number }
export interface Document { id: ID; projectId: ID; name: string; slug: string; ownerId: ID; createdAt: number }
export interface FlowEdge { id: ID; source: { kind: 'page'|'element'; id: ID }; targetPageId: ID; label?: string }
export interface Page { id: ID; documentId: ID; name: string; device: "mobile" | "desktop"; index: number; elements: ElementNode[] }
export interface ElementNode { id: ID; type: string; props?: Record<string, any>; children?: ElementNode[] }
export interface Lock { id: ID; documentId: ID; scope: "DOCUMENT" | "ELEMENT"; elementId?: ID; holderId?: ID; ttlSeconds: number; updatedAt: number }
export interface Audit { id: ID; entityType: string; entityId: ID; action: string; createdAt: number }

function uid() { return crypto.randomUUID() }

class MockDB {
  users = new Map<ID, User>();
  usersByEmail = new Map<string, ID>(); // email -> userId
  workspaces = new Map<ID, Workspace>();
  projects = new Map<ID, Project>();
  documents = new Map<ID, Document>();
  pages = new Map<ID, Page>();
  flow = new Map<ID, FlowEdge[]>(); // key: documentId
  locks = new Map<ID, Lock>();
  audit = new Map<ID, Audit>();
  workspaceMembers = new Map<ID, Map<ID, 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'>>();
  projectMembers = new Map<ID, Map<ID, 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'>>();
  documentMembers = new Map<ID, Map<ID, 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'>>();

  getUserByEmail(email: string): User | null {
    const userId = this.usersByEmail.get(email);
    if (!userId) return null;
    return this.users.get(userId) || null;
  }

  getUserOrCreateByEmail(email: string, password: string, name?: string): User {
    let user = this.getUserByEmail(email);
    if (!user) {
      const id = uid();
      user = { id, email, password, name, createdAt: Date.now() };
      this.users.set(id, user);
      this.usersByEmail.set(email, id);
    }
    return user;
  }

  verifyUser(email: string, password: string): User | null {
    const user = this.getUserByEmail(email);
    if (!user || user.password !== password) return null;
    return user;
  }

  listWorkspaces() {
    return Array.from(this.workspaces.values()).sort((a,b)=>a.createdAt-b.createdAt);
  }
  createWorkspace(name: string, ownerId: ID) {
    const id = uid();
    const ws: Workspace = { id, name, ownerId, createdAt: Date.now() };
    this.workspaces.set(id, ws);
    this.workspaceMembers.set(id, new Map([[ownerId, 'OWNER']]));
    return ws;
  }

  listProjects() { return Array.from(this.projects.values()) }
  createProject(workspaceId: ID, name: string, ownerId: ID) {
    const id = uid();
    const pr: Project = { id, workspaceId, name, ownerId, createdAt: Date.now() };
    this.projects.set(id, pr);
    this.projectMembers.set(id, new Map([[ownerId, 'OWNER']]));
    return pr;
  }

  listDocuments() { return Array.from(this.documents.values()) }
  createDocument(projectId: ID, name: string, slug: string, ownerId: ID) {
    const id = uid();
    const doc: Document = { id, projectId, name, slug, ownerId, createdAt: Date.now() };
    this.documents.set(id, doc);
    this.documentMembers.set(id, new Map([[ownerId, 'OWNER']]));
    return doc;
  }

  listPages(documentId: ID) {
    return Array.from(this.pages.values()).filter(p=>p.documentId===documentId).sort((a,b)=>a.index-b.index);
  }
  createPage(documentId: ID, name: string, device: "mobile"|"desktop") {
    const nextIndex = this.listPages(documentId).length;
    const id = uid();
    const page: Page = { id, documentId, name, device, index: nextIndex, elements: [] };
    this.pages.set(id, page); return page;
  }
  updatePage(pageId: ID, patch: Partial<Pick<Page, "name"|"device"|"index"|"elements">>) {
    const page = this.pages.get(pageId); if (!page) return null;
    Object.assign(page, patch);
    this.pages.set(pageId, page);
    return page;
  }
  deletePage(pageId: ID) { return this.pages.delete(pageId) }

  listFlow(documentId: ID) { return this.flow.get(documentId) || [] }
  addFlowEdge(documentId: ID, edge: Omit<FlowEdge,'id'>) {
    const e = { id: uid(), ...edge } as FlowEdge;
    const list = this.listFlow(documentId);
    this.flow.set(documentId, [...list, e]);
    return e;
  }
  deleteFlowEdge(documentId: ID, edgeId: ID) {
    const list = this.listFlow(documentId);
    this.flow.set(documentId, list.filter(e=>e.id!==edgeId));
    return true;
  }

  acquireLock(body: Omit<Lock,"id"|"updatedAt">) {
    const id = uid();
    const lock: Lock = { id, ...body, updatedAt: Date.now() } as Lock;
    this.locks.set(id, lock); return lock;
  }
  refreshLock(lockId: ID) { const l = this.locks.get(lockId); if (!l) return null; l.updatedAt = Date.now(); this.locks.set(lockId,l); return l }
  releaseLock(lockId: ID) { return this.locks.delete(lockId) }
  listLocks(documentId: ID) {
    return Array.from(this.locks.values()).filter(l => l.documentId === documentId);
  }

  addAudit(a: Omit<Audit,"id"|"createdAt">) { const id=uid(); const rec:Audit={id,createdAt:Date.now(),...a}; this.audit.set(id,rec); return rec }
  listAudit(filter?: Partial<Pick<Audit,"entityType"|"entityId">>) {
    let items = Array.from(this.audit.values());
    if (filter?.entityType) items = items.filter(x=>x.entityType===filter.entityType);
    if (filter?.entityId) items = items.filter(x=>x.entityId===filter.entityId);
    return items.sort((a,b)=>a.createdAt-b.createdAt);
  }

  getWorkspaceRole(workspaceId: ID, userId: ID): 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'|null {
    const ws = this.workspaces.get(workspaceId);
    if (!ws) return null;
    if (ws.ownerId === userId) return 'OWNER';
    return this.workspaceMembers.get(workspaceId)?.get(userId) || null;
  }
  getProjectRole(projectId: ID, userId: ID): 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'|null {
    const pr = this.projects.get(projectId);
    if (!pr) return null;
    if (pr.ownerId === userId) return 'OWNER';
    return this.projectMembers.get(projectId)?.get(userId) || this.getWorkspaceRole(pr.workspaceId, userId);
  }
  getDocumentRole(documentId: ID, userId: ID): 'OWNER'|'ADMIN'|'EDITOR'|'VIEWER'|null {
    const doc = this.documents.get(documentId);
    if (!doc) return null;
    if (doc.ownerId === userId) return 'OWNER';
    return this.documentMembers.get(documentId)?.get(userId) || this.getProjectRole(doc.projectId, userId);
  }
}

export const db = new MockDB();


