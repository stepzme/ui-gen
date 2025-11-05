import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId } from "@/lib/auth-util";

type Params = { params: Promise<{ id: string }> };

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
  const doc = await data.listDocumentsForUser(userId);
  const document = doc.find((d: any) => d.id === id);
  
  if (!document) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  
  // Get project to find workspace
  const project = await (data as any).prisma?.project.findUnique({
    where: { id: document.projectId },
    select: { workspaceId: true },
  });
  
  return NextResponse.json({
    ...document,
    workspaceId: project?.workspaceId,
  });
}

