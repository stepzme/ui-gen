import { NextResponse } from "next/server";
import * as data from "@/src/lib/data";
import { requireSession, canWriteFromSession } from "@/src/app/api/_util/auth";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const items = await data.listDocumentMembers(params.id);
  return NextResponse.json({ items });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  if (!json?.userId || !json?.role) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  await data.addDocumentMember(params.id, json.userId, json.role);
  return NextResponse.json({ ok: true });
}


