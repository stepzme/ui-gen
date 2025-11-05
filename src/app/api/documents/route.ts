import { NextResponse } from "next/server";
import { createDocumentBody } from "@/types/document";
import * as data from "@/lib/data";
import { canWriteFromSession, requireSession, getSessionUserId } from "@/lib/auth-util";
import { canEdit } from "@/lib/rbac";

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session as any).user?.id || (session as any).user?.email || '';
  const items = await data.listDocumentsForUser(userId);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!canEdit((session as any).role || 'VIEWER')) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  const parsed = createDocumentBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const userId = getSessionUserId(session);
  const doc = await data.createDocument(parsed.data.projectId, parsed.data.name, parsed.data.slug, userId);
  await data.addAudit({ actorId: userId, entityType: 'DOCUMENT', entityId: doc.id, action: 'CREATE' });
  return NextResponse.json(doc, { status: 201 });
}


