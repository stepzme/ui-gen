import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, canWriteFromSession, getSessionUserId } from "@/lib/auth/auth-util";
import { getProjectRole } from "@/lib/data";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
  const { id: projectId } = await params;
  const userId = getSessionUserId(session);
  
  // Check if user has permission to delete (must be OWNER)
  const role = await getProjectRole(projectId, userId);
  if (role !== 'OWNER') {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  await data.deleteProject(projectId);
  await data.addAudit({ actorId: userId, entityType: 'PROJECT', entityId: projectId, action: 'DELETE' });
  
  return NextResponse.json({ id: projectId, deleted: true });
}

