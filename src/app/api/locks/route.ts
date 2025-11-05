import { NextRequest, NextResponse } from "next/server";
import { lockAcquireBody, lockRefreshBody, lockReleaseBody } from "@/src/types/document";
import * as data from "@/src/lib/data";
import { canWriteFromSession, getSessionUserId, requireSession } from "@/src/app/api/_util/auth";
import { getDocumentRole } from "@/src/lib/data";

export async function GET(request: NextRequest) {
  const documentId = request.nextUrl.searchParams.get("documentId");
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!documentId) return NextResponse.json({ items: [] });
  const userId = getSessionUserId(session);
  const role = await getDocumentRole(documentId, userId);
  if (!role) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ items: await data.listLocks(documentId) });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // acquire
  const json = await request.json().catch(() => null);
  const parsed = lockAcquireBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const lock = await data.acquireLock({ ...parsed.data, ttlSeconds: 30 });
  return NextResponse.json({ id: lock.id, ttlSeconds: 30 }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // refresh
  const json = await request.json().catch(() => null);
  const parsed = lockRefreshBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  await data.refreshLock(parsed.data.lockId);
  return NextResponse.json({ id: parsed.data.lockId, refreshed: true });
}

export async function DELETE(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // release
  const json = await request.json().catch(() => null);
  const parsed = lockReleaseBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  await data.releaseLock(parsed.data.lockId);
  return NextResponse.json({ id: parsed.data.lockId, released: true });
}


