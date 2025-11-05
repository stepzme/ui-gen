// Simple in-memory store for local testing without a DB. Not for production use.

type ID = string;

export interface Workspace { id: ID; name: string; createdAt: number }
export interface Project { id: ID; workspaceId: ID; name: string; createdAt: number }
export interface Document { id: ID; projectId: ID; name: string; slug: string; createdAt: number }
export interface Page { id: ID; documentId: ID; name: string; device: "mobile" | "desktop"; index: number; elements: ElementNode[] }
export interface ElementNode { id: ID; type: string; props?: Record<string, any>; children?: ElementNode[] }
export interface Lock { id: ID; documentId: ID; scope: "DOCUMENT" | "ELEMENT"; elementId?: ID; holderId?: ID; ttlSeconds: number; updatedAt: number }
export interface Audit { id: ID; entityType: string; entityId: ID; action: string; createdAt: number }

function uid() { return crypto.randomUUID() }

class MockDB {
  workspaces = new Map<ID, Workspace>();
  projects = new Map<ID, Project>();
  documents = new Map<ID, Document>();
  pages = new Map<ID, Page>();
  locks = new Map<ID, Lock>();
  audit = new Map<ID, Audit>();

  listWorkspaces() {
    return Array.from(this.workspaces.values()).sort((a,b)=>a.createdAt-b.createdAt);
  }
  createWorkspace(name: string) {
    const id = uid();
    const ws: Workspace = { id, name, createdAt: Date.now() };
    this.workspaces.set(id, ws);
    return ws;
  }

  listProjects() { return Array.from(this.projects.values()) }
  createProject(workspaceId: ID, name: string) {
    const id = uid();
    const pr: Project = { id, workspaceId, name, createdAt: Date.now() };
    this.projects.set(id, pr); return pr;
  }

  listDocuments() { return Array.from(this.documents.values()) }
  createDocument(projectId: ID, name: string, slug: string) {
    const id = uid();
    const doc: Document = { id, projectId, name, slug, createdAt: Date.now() };
    this.documents.set(id, doc);
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

  acquireLock(body: Omit<Lock,"id"|"updatedAt">) {
    const id = uid();
    const lock: Lock = { id, ...body, updatedAt: Date.now() } as Lock;
    this.locks.set(id, lock); return lock;
  }
  refreshLock(lockId: ID) { const l = this.locks.get(lockId); if (!l) return null; l.updatedAt = Date.now(); this.locks.set(lockId,l); return l }
  releaseLock(lockId: ID) { return this.locks.delete(lockId) }

  addAudit(a: Omit<Audit,"id"|"createdAt">) { const id=uid(); const rec:Audit={id,createdAt:Date.now(),...a}; this.audit.set(id,rec); return rec }
  listAudit(filter?: Partial<Pick<Audit,"entityType"|"entityId">>) {
    let items = Array.from(this.audit.values());
    if (filter?.entityType) items = items.filter(x=>x.entityType===filter.entityType);
    if (filter?.entityId) items = items.filter(x=>x.entityId===filter.entityId);
    return items.sort((a,b)=>a.createdAt-b.createdAt);
  }
}

export const db = new MockDB();


