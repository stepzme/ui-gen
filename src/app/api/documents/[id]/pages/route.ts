import { NextResponse } from "next/server";
import { createPageBody } from "@/src/types/document";
import * as data from "@/src/lib/data";
import { canWriteFromSession, getSessionUserId, requireSession } from "@/src/app/api/_util/auth";
import { canEdit } from "@/src/lib/rbac";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = getSessionUserId(session);
  if (!db.getDocumentRole(params.id, userId)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ documentId: params.id, items: await data.listPages(params.id) });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const userId = getSessionUserId(session);
  const docRole = db.getDocumentRole(params.id, userId);
  if (!docRole || docRole === 'VIEWER') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = params;
  const json = await request.json().catch(() => null);
  const parsed = createPageBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const created = await data.createPage(id, parsed.data.name, parsed.data.device);
  return NextResponse.json(created, { status: 201 });
}


