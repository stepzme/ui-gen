import { NextResponse } from "next/server";
import { updatePageBody } from "@/src/types/document";
import { db } from "@/src/lib/mock-db";
import { requireSession } from "@/src/app/api/_util/auth";
import { canWriteFromSession } from "@/src/app/api/_util/auth";
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
  const updated = db.updatePage(params.pageId, parsed.data);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  db.deletePage(params.pageId);
  return NextResponse.json({ id: params.pageId, documentId: params.id, deleted: true });
}


