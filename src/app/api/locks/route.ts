import { NextRequest, NextResponse } from "next/server";
import { lockAcquireBody, lockRefreshBody, lockReleaseBody } from "@/src/types/document";
import { db } from "@/src/lib/mock-db";
import { requireSession } from "@/src/app/api/_util/auth";

export async function GET(request: NextRequest) {
  const documentId = request.nextUrl.searchParams.get("documentId");
  if (!documentId) return NextResponse.json({ items: [] });
  return NextResponse.json({ items: db.listLocks(documentId) });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // acquire
  const json = await request.json().catch(() => null);
  const parsed = lockAcquireBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const lock = db.acquireLock({ ...parsed.data, ttlSeconds: 30 });
  return NextResponse.json({ id: lock.id, ttlSeconds: 30 }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // refresh
  const json = await request.json().catch(() => null);
  const parsed = lockRefreshBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  db.refreshLock(parsed.data.lockId);
  return NextResponse.json({ id: parsed.data.lockId, refreshed: true });
}

export async function DELETE(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // release
  const json = await request.json().catch(() => null);
  const parsed = lockReleaseBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  db.releaseLock(parsed.data.lockId);
  return NextResponse.json({ id: parsed.data.lockId, released: true });
}


