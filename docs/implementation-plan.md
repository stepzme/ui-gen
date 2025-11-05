## Rework Implementation Plan

### 1. Architecture and Specifications
- Domain model: `workspace -> project -> document -> pages`, `flow.edges`, `locks`, `audit`.
- RBAC with inheritance and precedence: Owner/Admin (workspace) > project > document; higher privilege dominates.
- DocumentData format: pages with stable element UUIDs; flow as centralized edges graph supporting page→page and element→page.
- REST API contracts with Zod validation and unified error model.
- Conventions: i18n (en), structured logging, API versioning when needed.

### 2. Database (PostgreSQL + Prisma)
- Tables:
  - workspaces, workspace_members (role)
  - projects, project_members (role)
  - documents (type=document, JSONB data, device presets, soft-delete via trash)
  - document_pages (per-document pages, ordering, meta)
  - locks (scope: element|document, holder, ttl, updatedAt)
  - audit_logs (actor, entity, action, diff)
- Migrations; seed with admin user.

### 3. Authentication and Sessions
- NextAuth with credentials (email/password), admin-seeded registration only.
- Sessions via httpOnly cookies, CSRF protection.

### 4. RBAC and Authorization
- Policy resolver with inheritance (workspace → project → document) and precedence.
- API guards and UI disablement based on effective permissions.

### 5. REST API (Next.js Route Handlers) + Zod
- Auth: login/logout/me.
- Workspaces: list/create/get/update/delete, members add/update.
- Projects: list/create/get/update/delete, members add/update.
- Documents: list/create/get/update/delete, move to trash/restore.
- Pages: list/create/update/delete, reorder.
- Locks: acquire/refresh/release, force-unlock.
- Audit: list by target.

### 6. Client Infrastructure
- React Query hooks for CRUD/mutations with schema-safe responses.
- Zustand editor store: selection, local undo/redo, deviceMode (mobile/desktop), activePageId, locks.
- Query invalidation and optimistic updates.

### 7. Routing and UI Shell
- Routes: `/:workspace/:project` and `/:workspace/:project/:document`.
- App chrome: left nav (workspaces/projects/documents), top bar (pages | flow, device toggle, export).
- Panels: Pages/Layers/Insert, Inspector, Canvas.

### 8. Pages Mode (Artboards)
- Render pages; toggle mobile/desktop.
- DnD of existing components, props inspector, inline text editing.
- CRUD pages; ordering; stable UUID assignment for elements.
- Persist changes in DocumentData.

### 9. Flow Mode (Visualization)
- React Flow graph from `document.flow.edges`.
- Nodes: pages; Edges: page→page and element→page (visually distinct).
- Validate links, highlight broken references; CRUD edges.

### 10. Realtime Locks
- Element-level locking: acquire/refresh (heartbeat 10s) with TTL 30s.
- Force unlock by Owner/Admin; UI indication; audit entries.

### 11. Workspace Search
- Search projects/documents by name within a workspace only.

### 12. Design System Refactor
- Remove shadcn/ui usage; unify variants/slots; use Tailwind tokens.
- Ensure a11y: roles/labels/keyboard/focus management.

### 13. Export TSX (Pages)
- On-demand generation of TSX for selected pages with correct imports of existing components.
- No component source export; support mobile/desktop layouts.
- Clipboard by default; zip only for bulk (multi-page) export.
- Stateless export; write audit entries only.

### 14. Audit Log
- Record: auth, permissions changes, document create/update/trash/restore, lock acquire/release, export requested/completed.
- Basic viewer for entity-scoped logs.

### 15. i18n and Accessibility
- i18next (en default) integration; wrap user-facing strings.
- Validate a11y conformance across core UI.

### 16. Tests and Quality
- Zod unit tests for schemas.
- API e2e smoke: create workspace/project/document/page.
- Editor basic interactions: create page, edit text, export to clipboard.
- Lint/ts/format checks in CI.

### 17. Performance and Observability
- Virtualize lists (projects/documents/pages); memoize canvas; lazy-load document/pages.
- Structured logs for API and client errors.

### 18. Documentation
- README: domain model, setup, roles, export usage.
- API reference and contracts.
- Component authoring guide (variants/slots) for the editor.

### 19. Incremental Delivery
- Branching: `rework` as base; feature branches per module.
- Milestones:
  - M1: Auth+RBAC+Workspaces/Projects
  - M2: Documents+Pages CRUD+Routing
  - M3: Pages Mode (base) + Export (clipboard)
  - M4: Flow Mode + Locks
  - M5: Audit+Search+i18n+a11y baseline
  - M6: DS Refactor + Perf + Tests

### MVP Readiness Criteria
- Routing works with correct permissions.
- Pages mode: CRUD, inline text, props/variants/slots.
- Flow mode: correct graph for page and element links.
- Export TSX: clipboard for single/multi pages, zip for bulk.
- Realtime locks with TTL/heartbeat/force unlock.
- Workspace search for projects/documents by name.
- Audit logging and basic viewer.
- i18n (en) and baseline a11y.
- Tests green (Zod, API smoke, editor basics).


