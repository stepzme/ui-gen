import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId } from "@/lib/auth-util";
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

