import { NextRequest, NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId } from "@/lib/auth/auth-util";

export async function GET(request: NextRequest) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const entityType = request.nextUrl.searchParams.get("entityType") || undefined;
  const entityId = request.nextUrl.searchParams.get("entityId") || undefined;
  const items = await data.listAudit({ entityType, entityId });
  return NextResponse.json({ items, filter: { entityType, entityId } });
}


