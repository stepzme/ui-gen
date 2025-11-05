import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, canWriteFromSession, getSessionUserId } from "@/lib/auth-util";
import { getDocumentRole } from "@/lib/data";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const role = await getDocumentRole(params.id, getSessionUserId(session));
  if (!role) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const items = await data.listDocumentMembers(params.id);
  return NextResponse.json({ items });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const currentRole = await getDocumentRole(params.id, getSessionUserId(session));
  if (!(currentRole === 'OWNER' || currentRole === 'ADMIN')) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  if (!json?.userId || !json?.role) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  await data.addDocumentMember(params.id, json.userId, json.role);
  return NextResponse.json({ ok: true });
}


