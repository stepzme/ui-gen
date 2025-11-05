import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, canWriteFromSession, getSessionUserId } from "@/lib/auth-util";
import { canEdit } from "@/lib/rbac";
import { updatePageBody } from "@/types/document";

type Params = { params: Promise<{ id: string; pageId: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { pageId } = await params;
  let json;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!json || typeof json !== 'object') {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const parsed = updatePageBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const updated = await data.updatePage(pageId, parsed.data);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const userId = getSessionUserId(session);
  await data.addAudit({ actorId: userId, entityType: 'PAGE', entityId: pageId, action: 'UPDATE', diff: parsed.data });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id, pageId } = await params;
  await data.deletePage(pageId);
  const userId = getSessionUserId(session);
  await data.addAudit({ actorId: userId, entityType: 'PAGE', entityId: pageId, action: 'DELETE' });
  return NextResponse.json({ id: pageId, documentId: id, deleted: true });
}


