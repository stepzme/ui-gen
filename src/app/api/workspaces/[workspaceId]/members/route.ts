import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, canWriteFromSession, getSessionUserId } from "@/lib/auth/auth-util";
import { getWorkspaceRole } from "@/lib/data";

type Params = { params: Promise<{ workspaceId: string }> };

export async function GET(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { workspaceId } = await params;
  const role = await getWorkspaceRole(workspaceId, getSessionUserId(session));
  if (!role) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const items = await data.listWorkspaceMembers(workspaceId);
  return NextResponse.json({ items });
}

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { workspaceId } = await params;
  const currentRole = await getWorkspaceRole(workspaceId, getSessionUserId(session));
  if (!(currentRole === 'OWNER' || currentRole === 'ADMIN')) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  if (!json?.userId || !json?.role) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  await data.addWorkspaceMember(workspaceId, json.userId, json.role);
  const userId = getSessionUserId(session);
  await data.addAudit({ actorId: userId, entityType: 'WORKSPACE', entityId: workspaceId, action: 'PERMISSION_CHANGE', diff: { userId: json.userId, role: json.role } });
  return NextResponse.json({ ok: true });
}


