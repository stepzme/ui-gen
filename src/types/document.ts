import { z } from "zod";

export const deviceModeSchema = z.union([z.literal("mobile"), z.literal("desktop")]);

export const elementNodeSchema: z.ZodType<any> = z.lazy(() => z.object({
  id: z.string().uuid(),
  type: z.string(),
  props: z.record(z.any()).default({}),
  children: z.array(elementNodeSchema).default([]),
  frame: z
    .object({ x: z.number(), y: z.number(), width: z.number(), height: z.number() })
    .partial()
    .default({}),
}));

export const pageSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  device: deviceModeSchema,
  elements: z.array(elementNodeSchema).default([]),
});

export const flowEdgeSchema = z.object({
  id: z.string().uuid(),
  source: z.union([
    z.object({ kind: z.literal("page"), id: z.string().uuid() }),
    z.object({ kind: z.literal("element"), id: z.string().uuid() }),
  ]),
  targetPageId: z.string().uuid(),
  label: z.string().optional(),
});

export const documentDataSchema = z.object({
  pages: z.array(pageSchema).default([]),
  flow: z
    .object({ edges: z.array(flowEdgeSchema).default([]) })
    .default({ edges: [] }),
});

export type DeviceMode = z.infer<typeof deviceModeSchema>;
export type ElementNode = z.infer<typeof elementNodeSchema>;
export type PageData = z.infer<typeof pageSchema>;
export type FlowEdge = z.infer<typeof flowEdgeSchema>;
export type DocumentData = z.infer<typeof documentDataSchema>;

// API payloads
export const createWorkspaceBody = z.object({ name: z.string().min(1) });
export const createProjectBody = z.object({ workspaceId: z.string().uuid(), name: z.string().min(1) });
export const createDocumentBody = z.object({
  projectId: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  data: documentDataSchema.optional(),
});
export const updateDocumentBody = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  data: documentDataSchema.optional(),
});

// Pages CRUD
export const createPageBody = z.object({
  name: z.string().min(1),
  device: deviceModeSchema,
});
export const updatePageBody = z.object({
  name: z.string().min(1).optional(),
  device: deviceModeSchema.optional(),
  index: z.number().int().nonnegative().optional(),
  elements: z.array(elementNodeSchema).optional(),
  position: z.object({ x: z.number(), y: z.number() }).optional(),
});

// Locks
export const lockAcquireBody = z.object({
  documentId: z.string().uuid(),
  scope: z.union([z.literal("DOCUMENT"), z.literal("ELEMENT")]),
  elementId: z.string().uuid().optional(),
});
export const lockRefreshBody = z.object({
  lockId: z.string().uuid(),
});
export const lockReleaseBody = z.object({
  lockId: z.string().uuid(),
});

export type CreateWorkspaceBody = z.infer<typeof createWorkspaceBody>;
export type CreateProjectBody = z.infer<typeof createProjectBody>;
export type CreateDocumentBody = z.infer<typeof createDocumentBody>;
export type UpdateDocumentBody = z.infer<typeof updateDocumentBody>;
export type CreatePageBody = z.infer<typeof createPageBody>;
export type UpdatePageBody = z.infer<typeof updatePageBody>;
export type LockAcquireBody = z.infer<typeof lockAcquireBody>;
export type LockRefreshBody = z.infer<typeof lockRefreshBody>;
export type LockReleaseBody = z.infer<typeof lockReleaseBody>;


