import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, canWriteFromSession, getSessionUserId } from "@/lib/auth/auth-util";
import { getProjectRole } from "@/lib/data";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const role = await getProjectRole(id, getSessionUserId(session));
  if (!role) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const items = await data.listProjectMembers(id);
  return NextResponse.json({ items });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const currentRole = await getProjectRole(id, getSessionUserId(session));
  if (!(currentRole === 'OWNER' || currentRole === 'ADMIN')) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  if (!json?.userId || !json?.role) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  await data.addProjectMember(id, json.userId, json.role);
  return NextResponse.json({ ok: true });
}


