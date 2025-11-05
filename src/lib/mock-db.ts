// Simple in-memory store for local testing without a DB. Not for production use.
// Optionally persists to JSON file for development.

import { promises as fs } from "fs";
import { join } from "path";

type ID = string;

const DB_FILE = join(process.cwd(), ".data", "mock-db.json");

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
    this.locks.set(id, lock);
    scheduleSave();
    return lock;
  }
  refreshLock(lockId: ID) { const l = this.locks.get(lockId); if (!l) return null; l.updatedAt = Date.now(); this.locks.set(lockId,l); scheduleSave(); return l }
  releaseLock(lockId: ID) { const result = this.locks.delete(lockId); scheduleSave(); return result }
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

  // Persistence
  async save() {
    try {
      const data = {
        users: Array.from(this.users.entries()),
        usersByEmail: Array.from(this.usersByEmail.entries()),
        workspaces: Array.from(this.workspaces.entries()),
        projects: Array.from(this.projects.entries()),
        documents: Array.from(this.documents.entries()),
        pages: Array.from(this.pages.entries()),
        flow: Array.from(this.flow.entries()),
        locks: Array.from(this.locks.entries()),
        audit: Array.from(this.audit.entries()),
        workspaceMembers: Array.from(this.workspaceMembers.entries()).map(([k, v]) => [k, Array.from(v.entries())]),
        projectMembers: Array.from(this.projectMembers.entries()).map(([k, v]) => [k, Array.from(v.entries())]),
        documentMembers: Array.from(this.documentMembers.entries()).map(([k, v]) => [k, Array.from(v.entries())]),
      };
      await fs.mkdir(join(process.cwd(), ".data"), { recursive: true });
      await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.warn("Failed to save mock-db:", err);
    }
  }

  async load() {
    try {
      const content = await fs.readFile(DB_FILE, "utf-8");
      const data = JSON.parse(content);
      
      this.users = new Map(data.users || []);
      this.usersByEmail = new Map(data.usersByEmail || []);
      this.workspaces = new Map(data.workspaces || []);
      this.projects = new Map(data.projects || []);
      this.documents = new Map(data.documents || []);
      this.pages = new Map(data.pages || []);
      this.flow = new Map(data.flow || []);
      this.locks = new Map(data.locks || []);
      this.audit = new Map(data.audit || []);
      this.workspaceMembers = new Map((data.workspaceMembers || []).map(([k, v]: [string, [string, string][]]) => [k, new Map(v)]));
      this.projectMembers = new Map((data.projectMembers || []).map(([k, v]: [string, [string, string][]]) => [k, new Map(v)]));
      this.documentMembers = new Map((data.documentMembers || []).map(([k, v]: [string, [string, string][]]) => [k, new Map(v)]));
    } catch (err) {
      // File doesn't exist or invalid - start fresh
      if ((err as any)?.code !== 'ENOENT') {
        console.warn("Failed to load mock-db:", err);
      }
    }
  }
}

// Auto-save on mutations (debounced)
let saveTimeout: NodeJS.Timeout | null = null;
function scheduleSave() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    db.save().catch(console.error);
  }, 1000);
}

export const db = new MockDB();

// Override mutation methods to auto-save
const originalCreateWorkspace = db.createWorkspace.bind(db);
db.createWorkspace = function(...args) {
  const result = originalCreateWorkspace(...args);
  scheduleSave();
  return result;
};

const originalCreateProject = db.createProject.bind(db);
db.createProject = function(...args) {
  const result = originalCreateProject(...args);
  scheduleSave();
  return result;
};

const originalCreateDocument = db.createDocument.bind(db);
db.createDocument = function(...args) {
  const result = originalCreateDocument(...args);
  scheduleSave();
  return result;
};

const originalCreatePage = db.createPage.bind(db);
db.createPage = function(...args) {
  const result = originalCreatePage(...args);
  scheduleSave();
  return result;
};

const originalUpdatePage = db.updatePage.bind(db);
db.updatePage = function(...args) {
  const result = originalUpdatePage(...args);
  scheduleSave();
  return result;
};

const originalDeletePage = db.deletePage.bind(db);
db.deletePage = function(...args) {
  const result = originalDeletePage(...args);
  scheduleSave();
  return result;
};

const originalAddFlowEdge = db.addFlowEdge.bind(db);
db.addFlowEdge = function(...args) {
  const result = originalAddFlowEdge(...args);
  scheduleSave();
  return result;
};

const originalDeleteFlowEdge = db.deleteFlowEdge.bind(db);
db.deleteFlowEdge = function(...args) {
  const result = originalDeleteFlowEdge(...args);
  scheduleSave();
  return result;
};

// Load on init (only in Node.js runtime)
if (typeof window === 'undefined') {
  db.load().catch(console.error);
}


