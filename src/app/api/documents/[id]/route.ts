import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId, canWriteFromSession } from "@/lib/auth/auth-util";
import { PrismaClient } from "../../../../generated/prisma/client";

type Params = { params: Promise<{ id: string }> };

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { id } = await params;
  const userId = getSessionUserId(session);
  
  // Check access
  const role = await data.getDocumentRole(id, userId);
  if (!role) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  // Get document with project info
  const document = await prisma.document.findUnique({
    where: { id },
    include: {
      project: {
        select: {
          id: true,
          workspaceId: true,
          name: true,
        },
      },
    },
  });
  
  if (!document) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  
  return NextResponse.json({
    id: document.id,
    name: document.name,
    slug: document.slug,
    projectId: document.projectId,
    workspaceId: document.project.workspaceId,
    updatedAt: document.updatedAt,
  });
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
  const { id: documentId } = await params;
  const userId = getSessionUserId(session);
  
  // Check access
  const role = await data.getDocumentRole(documentId, userId);
  if (!role || role === 'VIEWER') {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  const json = await request.json().catch(() => null);
  if (!json) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  
  const updated = await data.updateDocument(documentId, {
    name: json.name,
    slug: json.slug,
    projectId: json.projectId,
  });
  
  await data.addAudit({ actorId: userId, entityType: 'DOCUMENT', entityId: documentId, action: 'UPDATE', diff: json });
  
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
  const { id: documentId } = await params;
  const userId = getSessionUserId(session);
  
  // Check access - only OWNER or ADMIN can delete
  const role = await data.getDocumentRole(documentId, userId);
  if (!role || (role !== 'OWNER' && role !== 'ADMIN')) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  await data.deleteDocument(documentId);
  await data.addAudit({ actorId: userId, entityType: 'DOCUMENT', entityId: documentId, action: 'DELETE' });
  
  return NextResponse.json({ id: documentId, deleted: true });
}

