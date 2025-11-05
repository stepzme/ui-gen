import { NextResponse } from "next/server";
import { createProjectBody } from "@/types/document";
import * as data from "@/lib/data";
import { canWriteFromSession, requireSession, getSessionUserId } from "@/lib/auth-util";
import { canEdit } from "@/lib/rbac";

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = getSessionUserId(session);
  const items = await data.listProjectsForUser(userId);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!canEdit((session as any).role || 'VIEWER')) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  const parsed = createProjectBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const userId = getSessionUserId(session);
  const pr = await data.createProject(parsed.data.workspaceId, parsed.data.name, userId);
  await data.addAudit({ actorId: userId, entityType: 'PROJECT', entityId: pr.id, action: 'CREATE' });
  return NextResponse.json(pr, { status: 201 });
}


