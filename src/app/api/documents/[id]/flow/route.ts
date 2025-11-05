import { NextResponse } from "next/server";
import * as data from "@/src/lib/data";
import { canWriteFromSession, getSessionUserId, requireSession } from "@/src/lib/auth-util";
import { getDocumentRole } from "@/src/lib/data";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = getSessionUserId(session);
  const role = await getDocumentRole(params.id, userId);
  if (!role) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ documentId: params.id, edges: await data.listFlow(params.id) });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const userId = getSessionUserId(session);
  const role = await getDocumentRole(params.id, userId);
  if (!role || role === 'VIEWER') return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || !body.source || !body.targetPageId) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const created = await data.addFlowEdge(params.id, { source: body.source, targetPageId: body.targetPageId, label: body.label });
  return NextResponse.json(created, { status: 201 });
}


