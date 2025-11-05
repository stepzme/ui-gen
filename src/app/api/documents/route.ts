import { NextResponse } from "next/server";
import { createDocumentBody } from "@/src/types/document";
import { db } from "@/src/lib/mock-db";
import { canWriteFromSession, requireSession } from "@/src/app/api/_util/auth";
import { canEdit } from "@/src/lib/rbac";

export async function GET() { return NextResponse.json({ items: db.listDocuments() }); }

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
  const doc = db.createDocument(parsed.data.projectId, parsed.data.name, parsed.data.slug, ownerId);
  return NextResponse.json(doc, { status: 201 });
}


