import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const entityType = request.nextUrl.searchParams.get("entityType");
  const entityId = request.nextUrl.searchParams.get("entityId");
  // TODO: fetch audit entries by filters
  return NextResponse.json({ items: [], filter: { entityType, entityId } });
}


