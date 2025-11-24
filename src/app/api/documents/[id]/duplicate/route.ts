import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, canWriteFromSession, getSessionUserId } from "@/lib/auth/auth-util";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
  const { id: documentId } = await params;
  const userId = getSessionUserId(session);
  
  // Check access
  const role = await data.getDocumentRole(documentId, userId);
  if (!role) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  const json = await request.json().catch(() => null);
  if (!json || !json.name || !json.slug) {
    return NextResponse.json({ error: "Invalid body. name and slug required" }, { status: 400 });
  }
  
  const duplicated = await data.duplicateDocument(documentId, json.name, json.slug);
  await data.addAudit({ actorId: userId, entityType: 'DOCUMENT', entityId: duplicated.id, action: 'CREATE' });
  
  return NextResponse.json(duplicated, { status: 201 });
}

