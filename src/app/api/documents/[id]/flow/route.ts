import { NextResponse } from "next/server";
import { db } from "@/src/lib/mock-db";
import { canWriteFromSession, getSessionUserId, requireSession } from "@/src/app/api/_util/auth";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = getSessionUserId(session);
  if (!db.getDocumentRole(params.id, userId)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ documentId: params.id, edges: db.listFlow(params.id) });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const userId = getSessionUserId(session);
  const role = db.getDocumentRole(params.id, userId);
  if (!role || role === 'VIEWER') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || !body.source || !body.targetPageId) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const created = db.addFlowEdge(params.id, { source: body.source, targetPageId: body.targetPageId, label: body.label });
  return NextResponse.json(created, { status: 201 });
}


