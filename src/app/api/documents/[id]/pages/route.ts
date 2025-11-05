import { NextResponse } from "next/server";
import { createPageBody } from "@/types/document";
import * as data from "@/lib/data";
import { canWriteFromSession, getSessionUserId, requireSession } from "@/lib/auth-util";
import { getDocumentRole } from "@/lib/data";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const userId = getSessionUserId(session);
  const role = await getDocumentRole(id, userId);
  if (!role) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ documentId: id, items: await data.listPages(id) });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const userId = getSessionUserId(session);
  const docRole = await getDocumentRole(id, userId);
  if (!docRole || docRole === 'VIEWER') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  const parsed = createPageBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const created = await data.createPage(id, parsed.data.name, parsed.data.device);
  await data.addAudit({ actorId: userId, entityType: 'PAGE', entityId: created.id, action: 'CREATE', diff: { documentId: id, name: parsed.data.name } });
  return NextResponse.json(created, { status: 201 });
}


