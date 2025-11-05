import { NextResponse } from "next/server";
import { updatePageBody } from "@/src/types/document";
import * as data from "@/src/lib/data";
import { requireSession, canWriteFromSession, getSessionUserId } from "@/src/lib/auth-util";
import { canEdit } from "@/src/lib/rbac";

type Params = { params: { id: string; pageId: string } };

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  const parsed = updatePageBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const updated = await data.updatePage(params.pageId, parsed.data);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const userId = getSessionUserId(session);
  await data.addAudit({ actorId: userId, entityType: 'PAGE', entityId: params.pageId, action: 'UPDATE', diff: parsed.data });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await data.deletePage(params.pageId);
  const userId = getSessionUserId(session);
  await data.addAudit({ actorId: userId, entityType: 'PAGE', entityId: params.pageId, action: 'DELETE' });
  return NextResponse.json({ id: params.pageId, documentId: params.id, deleted: true });
}


