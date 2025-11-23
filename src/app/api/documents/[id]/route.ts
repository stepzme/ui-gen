import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId } from "@/lib/auth/auth-util";
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
  
  const { id } = await params;
  const userId = getSessionUserId(session);
  
  const json = await request.json().catch(() => null);
  if (!json || typeof json.projectId !== 'string') {
    return NextResponse.json({ error: "Invalid body. Expected { projectId: string }" }, { status: 400 });
  }
  
  try {
    const updated = await data.moveDocument(id, json.projectId, userId);
    await data.addAudit({ 
      actorId: userId, 
      entityType: 'DOCUMENT', 
      entityId: id, 
      action: 'UPDATE',
      diff: { projectId: { from: updated.projectId, to: json.projectId } }
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    if (error.message === "Document not found") {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
    if (error.message === "Only project OWNER can move documents") {
      return NextResponse.json({ error: "Only project OWNER can move documents" }, { status: 403 });
    }
    if (error.message === "Target project not found" || error.message === "No access to target project") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

