import { NextResponse } from "next/server";
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
  return NextResponse.json({ documentId: id, edges: await data.listFlow(id) });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const userId = getSessionUserId(session);
  const role = await getDocumentRole(id, userId);
  if (!role || role === 'VIEWER') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || !body.source || !body.targetPageId) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const created = await data.addFlowEdge(id, { source: body.source, targetPageId: body.targetPageId, label: body.label });
  return NextResponse.json(created, { status: 201 });
}


