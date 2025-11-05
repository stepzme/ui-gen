import { NextResponse } from "next/server";
import { createWorkspaceBody } from "@/src/types/document";
import { db } from "@/src/lib/mock-db";
import { canEdit } from "@/src/lib/rbac";
import { canWriteFromSession, requireSession } from "@/src/app/api/_util/auth";

export async function GET() { return NextResponse.json({ items: db.listWorkspaces() }); }

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!canEdit((session as any).role || 'VIEWER')) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  const parsed = createWorkspaceBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const ws = db.createWorkspace(parsed.data.name, (session as any).user?.id || 'admin');
  return NextResponse.json(ws, { status: 201 });
}


