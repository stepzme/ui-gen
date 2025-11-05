import { NextResponse } from "next/server";
import { lockAcquireBody, lockRefreshBody, lockReleaseBody } from "@/src/types/document";

export async function POST(request: Request) {
  // acquire
  const json = await request.json().catch(() => null);
  const parsed = lockAcquireBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  return NextResponse.json({ id: "temp-lock", ...parsed.data, ttlSeconds: 30 }, { status: 201 });
}

export async function PATCH(request: Request) {
  // refresh
  const json = await request.json().catch(() => null);
  const parsed = lockRefreshBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  return NextResponse.json({ id: parsed.data.lockId, refreshed: true });
}

export async function DELETE(request: Request) {
  // release
  const json = await request.json().catch(() => null);
  const parsed = lockReleaseBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  return NextResponse.json({ id: parsed.data.lockId, released: true });
}


