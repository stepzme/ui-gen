import { NextResponse } from "next/server";
import { createDocumentBody } from "@/src/types/document";
import * as data from "@/src/lib/data";
import { canWriteFromSession, requireSession } from "@/src/lib/auth-util";
import { canEdit } from "@/src/lib/rbac";

export async function GET() {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session as any).user?.id || (session as any).user?.email || '';
  const items = await data.listDocumentsForUser(userId);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!canEdit((session as any).role || 'VIEWER')) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const json = await request.json().catch(() => null);
  const parsed = createDocumentBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const ownerId = (session as any).user?.id || (session as any).user?.email || 'admin';
  const doc = await data.createDocument(parsed.data.projectId, parsed.data.name, parsed.data.slug, ownerId);
  return NextResponse.json(doc, { status: 201 });
}


