import { NextResponse } from "next/server";
import { db } from "@/src/lib/mock-db";
import { requireSession, canWriteFromSession } from "@/src/app/api/_util/auth";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const members = Array.from(db.workspaceMembers.get(params.id)?.entries() || []).map(([userId, role]) => ({ userId, role }));
  return NextResponse.json({ items: members });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  if (!json?.userId || !json?.role) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const map = db.workspaceMembers.get(params.id) || new Map();
  map.set(json.userId, json.role);
  db.workspaceMembers.set(params.id, map);
  return NextResponse.json({ ok: true });
}


